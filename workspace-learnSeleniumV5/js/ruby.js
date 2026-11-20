/*
 * Selenium Ruby Diner - a tiny Ruby/Selenium interpreter for the browser.
 *
 * It understands the subset of Ruby needed to practise Selenium WebDriver
 * element targeting and light scraping:
 *
 *   driver.find_element(:css, ".plate")
 *   driver.find_elements(css: ".plate").map { |el| el.text }
 *   driver.find_element(:id, "name").send_keys("Ada")
 *   wait = Selenium::WebDriver::Wait.new(timeout: 3)
 *   wait.until { driver.find_element(:id, "ticket").displayed? }
 *
 * It is intentionally not a complete Ruby implementation.
 */
(function (global) {
  'use strict';

  // -------------------------------------------------------------------------
  // Errors
  // -------------------------------------------------------------------------
  class RubyError extends Error {
    constructor(message, line) {
      super(message);
      this.name = 'RubyError';
      this.line = line || null;
    }
  }

  class NoSuchElementError extends RubyError {
    constructor(message, line) {
      super(message, line);
      this.name = 'NoSuchElementError';
    }
  }

  class TimeoutError extends RubyError {
    constructor(message, line) {
      super(message, line);
      this.name = 'TimeoutError';
    }
  }

  class StaleElementReferenceError extends RubyError {
    constructor(message, line) {
      super(message, line);
      this.name = 'StaleElementReferenceError';
    }
  }

  // -------------------------------------------------------------------------
  // Tokens
  // -------------------------------------------------------------------------
  const KEYWORDS = new Set([
    'do', 'end', 'if', 'unless', 'else', 'elsif', 'then', 'true', 'false',
    'nil', 'and', 'or', 'not', 'while', 'until', 'return', 'next', 'break'
  ]);
  const COMMANDS = new Set(['puts', 'print', 'p', 'sleep', 'raise']);
  const REGEX_PREFIXES = new Set([
    '(', ',', '=', '=~', '!~', '[', '{', '!', '&&', '||', '|', '?', ':',
    ';', '=>', '+', '-', '*', '/', '%', '<', '>', '<=', '>=', '==', '!='
  ]);
  const BINARY_OPERATORS = new Set([
    '.', '&&', '||', '+', '-', '*', '/', '%', '==', '!=', '=~', '!~',
    '<', '>', '<=', '>=', '<<', '>>', 'and', 'or'
  ]);

  function tokenize(source) {
    const tokens = [];
    let i = 0;
    let line = 1;
    let col = 1;
    const len = source.length;

    function push(type, value, startLine, startCol) {
      tokens.push({ type, value, line: startLine, col: startCol });
    }

    function lastSignificant() {
      for (let j = tokens.length - 1; j >= 0; j -= 1) {
        if (tokens[j].type !== 'NEWLINE') return tokens[j];
      }
      return null;
    }

    function regexAllowed() {
      const prev = lastSignificant();
      if (!prev) return true;
      if (prev.type === 'NEWLINE') return true;
      if (prev.type === 'OP') return REGEX_PREFIXES.has(prev.value);
      if (prev.type === 'KEYWORD') {
        return ['return', 'when', 'if', 'unless', 'and', 'or', 'not', 'then', 'do'].includes(prev.value);
      }
      return false;
    }

    while (i < len) {
      const c = source[i];

      if (c === '\n') {
        push('NEWLINE', '\n', line, col);
        i += 1;
        line += 1;
        col = 1;
        continue;
      }

      if (c === ' ' || c === '\t' || c === '\r') {
        i += 1;
        col += 1;
        continue;
      }

      if (c === '#') {
        while (i < len && source[i] !== '\n') {
          i += 1;
          col += 1;
        }
        continue;
      }

      if (c === '"' || c === "'") {
        const quote = c;
        const startLine = line;
        const startCol = col;
        i += 1;
        col += 1;
        let value = '';
        let closed = false;
        while (i < len) {
          const ch = source[i];
          if (ch === '\\') {
            const next = source[i + 1];
            const escapes = {
              n: '\n', t: '\t', r: '\r', '\\': '\\', '"': '"', "'": "'", '0': '\0'
            };
            if (next === '\n') {
              i += 2;
              line += 1;
              col = 1;
              continue;
            }
            if (Object.prototype.hasOwnProperty.call(escapes, next)) {
              value += escapes[next];
              i += 2;
              col += 2;
              continue;
            }
            value += next === undefined ? '' : next;
            i += 2;
            col += 2;
            continue;
          }
          if (ch === quote) {
            i += 1;
            col += 1;
            closed = true;
            break;
          }
          if (ch === '\n') {
            line += 1;
            col = 1;
          } else {
            col += 1;
          }
          value += ch;
          i += 1;
        }
        if (!closed) throw new RubyError('unterminated string literal', startLine);
        push('STRING', value, startLine, startCol);
        continue;
      }

      if (c === ':' && source[i + 1] !== ':') {
        if (source[i + 1] === '"' || source[i + 1] === "'") {
          const quote = source[i + 1];
          const startLine = line;
          const startCol = col;
          i += 2;
          col += 2;
          let value = '';
          while (i < len && source[i] !== quote) {
            value += source[i];
            i += 1;
            col += 1;
          }
          if (source[i] !== quote) throw new RubyError('unterminated symbol literal', startLine);
          i += 1;
          col += 1;
          push('SYMBOL', value, startLine, startCol);
          continue;
        }
        if (/[A-Za-z_]/.test(source[i + 1] || '')) {
          const startLine = line;
          const startCol = col;
          i += 1;
          col += 1;
          let value = '';
          while (i < len && /[A-Za-z0-9_?!]/.test(source[i])) {
            value += source[i];
            i += 1;
            col += 1;
          }
          push('SYMBOL', value, startLine, startCol);
          continue;
        }
      }

      if (c === '/') {
        if (regexAllowed()) {
          const startLine = line;
          const startCol = col;
          i += 1;
          col += 1;
          let pattern = '';
          let inClass = false;
          let closed = false;
          while (i < len) {
            const ch = source[i];
            if (ch === '\\') {
              pattern += ch;
              if (i + 1 < len) pattern += source[i + 1];
              i += 2;
              col += 2;
              continue;
            }
            if (ch === '[') inClass = true;
            if (ch === ']') inClass = false;
            if (ch === '/' && !inClass) {
              i += 1;
              col += 1;
              closed = true;
              break;
            }
            if (ch === '\n') {
              line += 1;
              col = 1;
            } else {
              col += 1;
            }
            pattern += ch;
            i += 1;
          }
          if (!closed) throw new RubyError('unterminated regular expression', startLine);
          let flags = '';
          while (i < len && /[imx]/.test(source[i])) {
            flags += source[i];
            i += 1;
            col += 1;
          }
          push('REGEX', { pattern, flags }, startLine, startCol);
          continue;
        }
      }

      if (/[0-9]/.test(c)) {
        const startLine = line;
        const startCol = col;
        let value = '';
        while (i < len && /[0-9_]/.test(source[i])) {
          if (source[i] !== '_') value += source[i];
          i += 1;
          col += 1;
        }
        if (source[i] === '.' && /[0-9]/.test(source[i + 1] || '')) {
          value += '.';
          i += 1;
          col += 1;
          while (i < len && /[0-9_]/.test(source[i])) {
            if (source[i] !== '_') value += source[i];
            i += 1;
            col += 1;
          }
        }
        push('NUMBER', Number(value), startLine, startCol);
        continue;
      }

      if (/[A-Za-z_]/.test(c)) {
        const startLine = line;
        const startCol = col;
        let value = '';
        while (i < len && /[A-Za-z0-9_]/.test(source[i])) {
          value += source[i];
          i += 1;
          col += 1;
        }
        if (source[i] === '?' || source[i] === '!') {
          value += source[i];
          i += 1;
          col += 1;
        }
        if (KEYWORDS.has(value)) {
          push('KEYWORD', value, startLine, startCol);
        } else if (/^[A-Z]/.test(value)) {
          push('CONST', value, startLine, startCol);
        } else {
          push('IDENT', value, startLine, startCol);
        }
        continue;
      }

      const multi = ['<=>', '===', '!==', '==', '!=', '=~', '!~', '<=', '>=',
        '&&', '||', '<<', '>>', '+=', '-=', '*=', '/=', '||=', '&&=', '::', '=>', '..', '**'];
      let matched = null;
      for (const op of multi) {
        if (source.startsWith(op, i)) {
          matched = op;
          break;
        }
      }
      if (matched) {
        push('OP', matched, line, col);
        i += matched.length;
        col += matched.length;
        continue;
      }

      if ('+-*/%=<>!&|.,()[]{};?:'.includes(c)) {
        push('OP', c, line, col);
        i += 1;
        col += 1;
        continue;
      }

      throw new RubyError(`unexpected character '${c}'`, line);
    }

    push('EOF', null, line, col);
    return preprocessNewlines(tokens);
  }

  function preprocessNewlines(tokens) {
    const out = [];
    let depth = 0;
    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i];
      if (token.type === 'NEWLINE') {
        let prev = null;
        for (let j = out.length - 1; j >= 0; j -= 1) {
          if (out[j].type !== 'NEWLINE') {
            prev = out[j];
            break;
          }
        }
        let next = null;
        for (let j = i + 1; j < tokens.length; j += 1) {
          if (tokens[j].type !== 'NEWLINE') {
            next = tokens[j];
            break;
          }
        }
        const drop = depth > 0
          || (prev && prev.type === 'OP' && ![')', ']', '}'].includes(prev.value))
          || (next && next.type === 'OP' && BINARY_OPERATORS.has(next.value));
        if (drop) continue;
        if (out.length && out[out.length - 1].type === 'NEWLINE') continue;
        out.push(token);
        continue;
      }
      if (token.type === 'OP') {
        if (token.value === '(' || token.value === '[') depth += 1;
        if (token.value === ')' || token.value === ']') depth = Math.max(0, depth - 1);
      }
      out.push(token);
    }
    return out;
  }

  // -------------------------------------------------------------------------
  // Parser
  // -------------------------------------------------------------------------
  class Parser {
    constructor(tokens) {
      this.tokens = tokens;
      this.pos = 0;
    }

    peek(offset) {
      const idx = this.pos + (offset || 0);
      return this.tokens[idx] || this.tokens[this.tokens.length - 1];
    }

    next() {
      const token = this.tokens[this.pos] || this.tokens[this.tokens.length - 1];
      this.pos += 1;
      return token;
    }

    check(type, value) {
      const t = this.peek();
      if (t.type !== type) return false;
      return value === undefined || t.value === value;
    }

    checkOp(value) {
      return this.check('OP', value);
    }

    checkKeyword(value) {
      return this.check('KEYWORD', value);
    }

    matchOp(value) {
      if (this.checkOp(value)) {
        this.next();
        return true;
      }
      return false;
    }

    matchKeyword(value) {
      if (this.checkKeyword(value)) {
        this.next();
        return true;
      }
      return false;
    }

    expectOp(value) {
      if (!this.checkOp(value)) {
        const t = this.peek();
        throw new RubyError(`expected '${value}' but found '${tokenLabel(t)}'`, t.line);
      }
      return this.next();
    }

    expectKeyword(value) {
      if (!this.checkKeyword(value)) {
        const t = this.peek();
        throw new RubyError(`expected '${value}' but found '${tokenLabel(t)}'`, t.line);
      }
      return this.next();
    }

    expectName() {
      const t = this.peek();
      if (t.type !== 'IDENT' && t.type !== 'CONST') {
        throw new RubyError(`expected a name but found '${tokenLabel(t)}'`, t.line);
      }
      return this.next();
    }

    expectMethodName() {
      const t = this.peek();
      if (t.type !== 'IDENT' && t.type !== 'CONST' && t.type !== 'KEYWORD') {
        throw new RubyError(`expected a method name but found '${tokenLabel(t)}'`, t.line);
      }
      return this.next();
    }

    skipSeparators() {
      while (this.check('NEWLINE') || this.checkOp(';')) this.next();
    }

    isStatementEnd() {
      const t = this.peek();
      if (t.type === 'NEWLINE' || t.type === 'EOF') return true;
      if (t.type === 'OP' && (t.value === ';' || t.value === '}')) return true;
      if (t.type === 'KEYWORD' && ['end', 'else', 'elsif'].includes(t.value)) return true;
      return false;
    }

    parseProgram() {
      const body = this.parseStatements();
      if (!this.check('EOF')) {
        const t = this.peek();
        throw new RubyError(`unexpected '${tokenLabel(t)}'`, t.line);
      }
      return { type: 'Program', body, line: 1 };
    }

    parseStatements(stopKeywords) {
      const stops = stopKeywords || new Set();
      const body = [];
      this.skipSeparators();
      while (!this.check('EOF')
        && !this.checkOp('}')
        && !(this.peek().type === 'KEYWORD' && stops.has(this.peek().value))) {
        body.push(this.parseStatement());
        this.skipSeparators();
      }
      return body;
    }

    parseStatement() {
      this.skipSeparators();
      const t = this.peek();
      if (t.type === 'KEYWORD') {
        if (t.value === 'if' || t.value === 'unless') return this.parseIf(t.value === 'unless');
        if (t.value === 'while' || t.value === 'until') return this.parseWhile(t.value === 'until');
        if (t.value === 'return') {
          this.next();
          const value = this.isStatementEnd() ? { type: 'Nil', line: t.line } : this.parseExpression();
          return { type: 'Return', value, line: t.line };
        }
        if (t.value === 'break' || t.value === 'next') {
          this.next();
          const loopNode = { type: t.value === 'break' ? 'Break' : 'Next', line: t.line };
          const modifierIf = this.matchKeyword('if');
          const modifierUnless = modifierIf ? false : this.matchKeyword('unless');
          if (modifierIf || modifierUnless) {
            let cond = this.parseExpression();
            if (modifierUnless) cond = { type: 'Unary', op: '!', argument: cond, line: t.line };
            return {
              type: 'If',
              branches: [{ cond, body: [loopNode] }],
              elseBody: null,
              line: t.line
            };
          }
          return loopNode;
        }
      }
      return this.parseExpression();
    }

    parseIf(negateFirst) {
      const start = this.next();
      let cond = this.parseExpression();
      if (negateFirst) cond = { type: 'Unary', op: '!', argument: cond, line: start.line };
      this.matchKeyword('then');
      this.skipSeparators();
      const branches = [{ cond, body: this.parseStatements(new Set(['elsif', 'else', 'end'])) }];
      while (this.matchKeyword('elsif')) {
        const condition = this.parseExpression();
        this.matchKeyword('then');
        this.skipSeparators();
        branches.push({ cond: condition, body: this.parseStatements(new Set(['elsif', 'else', 'end'])) });
      }
      let elseBody = null;
      if (this.matchKeyword('else')) {
        this.skipSeparators();
        elseBody = this.parseStatements(new Set(['end']));
      }
      this.expectKeyword('end');
      return { type: 'If', branches, elseBody, line: start.line };
    }

    parseWhile(isUntil) {
      const start = this.next();
      let cond = this.parseExpression();
      if (isUntil) cond = { type: 'Unary', op: '!', argument: cond, line: start.line };
      this.skipSeparators();
      const body = this.parseStatements(new Set(['end']));
      this.expectKeyword('end');
      return { type: 'While', cond, body, line: start.line };
    }

    parseExpression() {
      return this.parseAssignment();
    }

    parseAssignment() {
      const left = this.parseTernary();
      const t = this.peek();
      if (t.type === 'OP' && ['=', '+=', '-=', '*=', '/=', '||=', '&&='].includes(t.value)) {
        this.next();
        const right = this.parseAssignment();
        return { type: 'Assign', op: t.value, target: left, value: right, line: t.line };
      }
      return left;
    }

    parseTernary() {
      const cond = this.parseOr();
      if (this.matchOp('?')) {
        const a = this.parseExpression();
        this.expectOp(':');
        const b = this.parseExpression();
        return { type: 'Ternary', cond, a, b, line: cond.line };
      }
      return cond;
    }

    parseBinary(nextFn, operators) {
      let left = nextFn.call(this);
      for (;;) {
        const t = this.peek();
        const isKeyword = t.type === 'KEYWORD' && operators.includes(t.value);
        const isOp = t.type === 'OP' && operators.includes(t.value);
        if (!isKeyword && !isOp) break;
        this.next();
        const right = nextFn.call(this);
        left = { type: 'Binary', op: t.value, left, right, line: t.line };
      }
      return left;
    }

    parseOr() {
      return this.parseBinary(this.parseAnd, ['||', 'or']);
    }

    parseAnd() {
      return this.parseBinary(this.parseEquality, ['&&', 'and']);
    }

    parseEquality() {
      return this.parseBinary(this.parseComparison, ['==', '!=', '=~', '!~']);
    }

    parseComparison() {
      return this.parseBinary(this.parseAdd, ['<', '>', '<=', '>=']);
    }

    parseAdd() {
      return this.parseBinary(this.parseMul, ['+', '-', '<<', '>>']);
    }

    parseMul() {
      return this.parseBinary(this.parseUnary, ['*', '/', '%']);
    }

    parseUnary() {
      const t = this.peek();
      if (t.type === 'OP' && ['!', '-', '+', '&'].includes(t.value)) {
        this.next();
        const argument = this.parseUnary();
        if (t.value === '&') {
          if (argument.type !== 'Symbol') {
            throw new RubyError('the & operator is only supported for symbols here', t.line);
          }
          return { type: 'SymbolProc', name: argument.name, line: t.line };
        }
        return { type: 'Unary', op: t.value, argument, line: t.line };
      }
      if (t.type === 'KEYWORD' && t.value === 'not') {
        this.next();
        return { type: 'Unary', op: '!', argument: this.parseUnary(), line: t.line };
      }
      return this.parsePostfix(this.parsePrimary());
    }

    parsePrimary() {
      const t = this.peek();

      if (t.type === 'NUMBER') {
        this.next();
        return { type: 'Number', value: t.value, line: t.line };
      }
      if (t.type === 'STRING') {
        this.next();
        return { type: 'String', value: t.value, line: t.line };
      }
      if (t.type === 'SYMBOL') {
        this.next();
        return { type: 'Symbol', name: t.value, line: t.line };
      }
      if (t.type === 'REGEX') {
        this.next();
        return { type: 'Regex', pattern: t.value.pattern, flags: t.value.flags, line: t.line };
      }
      if (t.type === 'KEYWORD' && ['true', 'false', 'nil'].includes(t.value)) {
        this.next();
        return { type: 'Literal', value: t.value === 'nil' ? null : t.value === 'true', line: t.line };
      }
      if (t.type === 'CONST') {
        this.next();
        const path = [t.value];
        while (this.matchOp('::')) path.push(this.expectName().value);
        return this.parsePostfix({ type: 'Const', path, line: t.line });
      }
      if (t.type === 'IDENT') {
        this.next();
        if (COMMANDS.has(t.value)) return this.parseCommandCall(t);
        return this.parsePostfix({ type: 'Var', name: t.value, line: t.line });
      }
      if (this.checkOp('{')) {
        return this.parsePostfix(this.parseHashLiteral());
      }
      if (this.checkOp('(')) {
        this.next();
        const expression = this.parseExpression();
        this.expectOp(')');
        return this.parsePostfix(expression);
      }
      if (this.checkOp('[')) {
        this.next();
        const elements = [];
        while (!this.checkOp(']')) {
          elements.push(this.parseExpression());
          if (this.matchOp(',')) {
            if (this.checkOp(']')) break;
            continue;
          }
          break;
        }
        this.expectOp(']');
        return this.parsePostfix({ type: 'Array', elements, line: t.line });
      }
      throw new RubyError(`unexpected '${tokenLabel(t)}'`, t.line);
    }

    parseHashLiteral() {
      const start = this.expectOp('{');
      const pairs = [];
      this.skipSeparators();
      while (!this.checkOp('}')) {
        let key;
        if (this.peek().type === 'IDENT' && this.peek(1).type === 'OP' && this.peek(1).value === ':') {
          const token = this.next();
          this.next();
          key = { type: 'String', value: token.value, line: token.line };
        } else if (this.peek().type === 'STRING' && this.peek(1).type === 'OP' && this.peek(1).value === ':') {
          const token = this.next();
          this.next();
          key = { type: 'String', value: token.value, line: token.line };
        } else {
          key = this.parseExpression();
          if (!this.matchOp('=>')) this.expectOp(':');
        }
        const value = this.parseExpression();
        pairs.push({ key, value });
        if (this.matchOp(',')) {
          this.skipSeparators();
          continue;
        }
        break;
      }
      this.expectOp('}');
      return { type: 'Hash', pairs, line: start.line };
    }

    parseCommandCall(nameToken) {
      const args = [];
      let kwargs = null;
      const openParen = this.peek();
      const adjacentParen = this.checkOp('(')
        && openParen.line === nameToken.line
        && openParen.col === nameToken.col + nameToken.value.length;
      if (adjacentParen) {
        const parsed = this.parseArgumentList();
        return { type: 'Command', name: nameToken.value, args: parsed.args, kwargs: parsed.kwargs, line: nameToken.line };
      }
      while (!this.isStatementEnd()) {
        args.push(this.parseExpression());
        if (this.matchOp(',')) continue;
        break;
      }
      return { type: 'Command', name: nameToken.value, args, kwargs, line: nameToken.line };
    }

    parseArgumentList() {
      this.expectOp('(');
      const args = [];
      let kwargs = null;
      while (!this.checkOp(')')) {
        if (this.checkOp('&')) {
          this.next();
          const symbol = this.parseUnary();
          if (symbol.type !== 'Symbol') {
            throw new RubyError('expected a symbol after &', symbol.line);
          }
          args.push({ type: 'SymbolProc', name: symbol.name, line: symbol.line });
        } else if (this.peek().type === 'IDENT' && this.peek(1).type === 'OP' && this.peek(1).value === ':') {
          const key = this.next().value;
          this.next();
          if (!kwargs) kwargs = {};
          kwargs[key] = this.parseExpression();
        } else {
          args.push(this.parseExpression());
        }
        if (this.matchOp(',')) continue;
        break;
      }
      this.expectOp(')');
      return { args, kwargs };
    }

    parsePostfix(startNode) {
      let node = startNode;
      if (node.type === 'Command') return node;
      for (;;) {
        if (this.checkOp('.')) {
          this.next();
          const nameToken = this.expectMethodName();
          let args = [];
          let kwargs = null;
          if (this.checkOp('(')) {
            const parsed = this.parseArgumentList();
            args = parsed.args;
            kwargs = parsed.kwargs;
          }
          let block = null;
          if (this.checkKeyword('do')) {
            block = this.parseDoBlock();
          } else if (this.checkOp('{')) {
            block = this.parseBraceBlock();
          }
          node = {
            type: 'Call',
            receiver: node,
            name: nameToken.value,
            args,
            kwargs,
            block,
            line: nameToken.line
          };
          continue;
        }
        if (this.checkOp('[')) {
          this.next();
          const index = this.parseExpression();
          this.expectOp(']');
          node = { type: 'Index', object: node, index, line: node.line };
          continue;
        }
        break;
      }
      return node;
    }

    parseDoBlock() {
      const start = this.next();
      const params = [];
      if (this.matchOp('|')) {
        while (!this.checkOp('|')) {
          params.push(this.expectName().value);
          if (!this.matchOp(',')) break;
        }
        this.expectOp('|');
      }
      this.skipSeparators();
      const body = this.parseStatements(new Set(['end']));
      this.expectKeyword('end');
      return { type: 'Block', params, body, line: start.line };
    }

    parseBraceBlock() {
      const start = this.expectOp('{');
      const params = [];
      if (this.matchOp('|')) {
        while (!this.checkOp('|')) {
          params.push(this.expectName().value);
          if (!this.matchOp(',')) break;
        }
        this.expectOp('|');
      }
      this.skipSeparators();
      const body = this.parseStatements();
      this.expectOp('}');
      return { type: 'Block', params, body, line: start.line };
    }
  }

  function tokenLabel(token) {
    if (!token) return 'end of input';
    if (token.type === 'NEWLINE') return 'newline';
    if (token.type === 'EOF') return 'end of input';
    if (token.type === 'SYMBOL') return `:${token.value}`;
    if (token.type === 'REGEX') return 'regular expression';
    return String(token.value);
  }

  function parse(source) {
    return new Parser(tokenize(source)).parseProgram();
  }

  // -------------------------------------------------------------------------
  // Runtime values
  // -------------------------------------------------------------------------
  class Scope {
    constructor(parent) {
      this.parent = parent || null;
      this.vars = new Map();
    }

    has(name) {
      return this.vars.has(name) || Boolean(this.parent && this.parent.has(name));
    }

    get(name) {
      if (this.vars.has(name)) return this.vars.get(name);
      if (this.parent) return this.parent.get(name);
      return undefined;
    }

    set(name, value) {
      if (this.vars.has(name)) {
        this.vars.set(name, value);
        return value;
      }
      if (this.parent && this.parent.has(name)) return this.parent.set(name, value);
      this.vars.set(name, value);
      return value;
    }

    define(name, value) {
      this.vars.set(name, value);
      return value;
    }
  }

  class SymbolValue {
    constructor(name) {
      this.name = name;
    }
  }

  class MatchData {
    constructor(match, source) {
      this.match = match;
      this.source = source;
    }

    get(index) {
      let i = Number(index);
      if (Number.isNaN(i)) i = 0;
      return this.match[i] === undefined ? null : this.match[i];
    }
  }

  class ReturnSignal {
    constructor(value) { this.value = value; }
  }
  class BreakSignal {
    constructor(value) { this.value = value === undefined ? null : value; }
  }
  class NextSignal {
    constructor(value) { this.value = value === undefined ? null : value; }
  }

  function truthy(value) {
    return value !== false && value !== null && value !== undefined;
  }

  function rubyEqual(a, b) {
    if (a === b) return true;
    if (a === null || b === null || a === undefined || b === undefined) return a === b;
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i += 1) {
        if (!rubyEqual(a[i], b[i])) return false;
      }
      return true;
    }
    if (a instanceof Element && b instanceof Element) return a.node === b.node;
    if (a instanceof Regex && b instanceof Regex) {
      return a.pattern === b.pattern && a.flags === b.flags;
    }
    return false;
  }

  function toS(value) {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (value instanceof SymbolValue) return value.name;
    if (value instanceof Element) return inspect(value);
    if (Array.isArray(value)) return value.map(toS).join('');
    return inspect(value);
  }

  function inspect(value, depth) {
    const d = depth || 0;
    if (value === null || value === undefined) return 'nil';
    if (typeof value === 'string') return JSON.stringify(value);
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (value instanceof SymbolValue) return `:${value.name}`;
    if (value instanceof Element) {
      const key = value.getAttribute('data-key');
      return `#<Selenium::WebDriver::Element${key ? ` data-key="${key}"` : ''}>`;
    }
    if (value instanceof MatchData) return `#<MatchData ${JSON.stringify(value.match[0])}>`;
    if (value instanceof Regex) return `/${value.pattern}/${value.flags}`;
    if (Array.isArray(value)) {
      if (d > 3) return '[...]';
      return `[${value.map((item) => inspect(item, d + 1)).join(', ')}]`;
    }
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value);
      } catch (err) {
        return String(value);
      }
    }
    return String(value);
  }

  // -------------------------------------------------------------------------
  // Browser / DOM simulation
  // -------------------------------------------------------------------------
  const ORIGIN = 'https://diners.example';

  const LOCATOR_ALIASES = {
    class: 'class_name',
    tag: 'tag_name',
    link: 'link_text',
    partial_link: 'partial_link_text',
    css_selector: 'css'
  };

  function canonicalLocatorStrategy(name) {
    const value = String(name || '').toLowerCase().replace(/\s+/g, '_');
    return LOCATOR_ALIASES[value] || value;
  }

  class Browser {
    constructor(document, container, options) {
      this.document = document;
      this.container = container;
      this.options = options || {};
      this.routes = this.options.routes || null;
      this.clock = 0;
      this.implicitWait = 0;
      this.cart = 0;
      this.submitted = false;
      this.quitFlag = false;
      this.history = [];
      this.historyIndex = -1;
      this.currentScene = null;
      this.currentUrl = null;
      this.currentTitle = '';
      this.locatorLog = [];
      this.lastLocator = null;
      this.apiRoutes = this.options.api || {};
      this.env = this.options.env || {};
      this.files = Object.assign({}, this.options.files || {});
      this.signedIn = Boolean(this.options.signedIn);
      this.sessionId = this.signedIn ? 'session-existing' : null;
      this.frameRoot = null;
      this.frameStack = [];
      this.alert = null;
      this.alertAction = null;
      this.screenshotPath = null;
      this.download = null;
      this.uploadedFile = null;
      this.driverType = null;
      this.headless = false;
      this.windows = [];
      this.currentWindowHandle = null;
      this.windowCounter = 0;
      this.authRedirect = false;

      const startUrl = this.options.startUrl || this.options.url || (this.options.scene && this.options.scene.url) || ORIGIN + '/';
      if (this.routes) {
        this.navigateTo(startUrl, 'init');
      } else {
        this.loadScene(this.options.scene || { url: startUrl, title: 'Diner', html: '' }, startUrl, 'init');
      }
    }

    normalizeUrl(url) {
      let value = String(url);
      if (value.startsWith('/')) value = ORIGIN + value;
      if (!/^https?:\/\//.test(value)) value = ORIGIN + '/' + value.replace(/^\.?\//, '');
      value = value.replace(/\/+$/, '');
      return value || ORIGIN;
    }

    resolveScene(url) {
      if (!this.routes) return null;
      const normalized = this.normalizeUrl(url);
      if (Object.prototype.hasOwnProperty.call(this.routes, normalized)) return this.routes[normalized];
      const withoutHash = normalized.split('#')[0];
      if (Object.prototype.hasOwnProperty.call(this.routes, withoutHash)) return this.routes[withoutHash];
      return null;
    }

    navigateTo(url, mode) {
      const normalized = this.normalizeUrl(url);
      const scene = this.resolveScene(normalized);
      if (!scene) throw new RubyError(`unknown page: ${url}`);
      if (scene.requiresAuth && !this.signedIn) {
        const login = this.resolveScene(ORIGIN + '/login');
        if (!login) throw new RubyError('login required');
        this.authRedirect = true;
        this.loadScene(login, login.url || ORIGIN + '/login', mode === undefined ? true : mode);
        return;
      }
      this.loadScene(scene, normalized, mode === undefined ? true : mode);
    }

    currentRoot() {
      return this.frameRoot || this.container;
    }

    openWindow(url, title) {
      const normalized = this.normalizeUrl(url);
      const scene = this.resolveScene(normalized);
      if (!scene) throw new RubyError(`unknown page: ${url}`);
      this.windowCounter += 1;
      const handle = `window-${this.windowCounter}`;
      this.windows.push({
        handle,
        scene,
        url: normalized,
        title: title || scene.title || ''
      });
      return handle;
    }

    switchWindow(handle) {
      const wanted = String(handle);
      const entry = this.windows.find((window) => window.handle === wanted);
      if (!entry) throw new RubyError(`no such window: ${handle}`);
      this.currentWindowHandle = entry.handle;
      this.loadScene(entry.scene, entry.url, false);
      return null;
    }

    loadScene(scene, url, recordHistory) {
      this.currentScene = scene;
      this.currentUrl = url || scene.url || ORIGIN + '/';
      this.currentTitle = scene.title || '';
      this.frameRoot = null;
      this.frameStack = [];
      this.container.innerHTML = scene.html || '';

      if (!this.currentWindowHandle) {
        this.windowCounter += 1;
        this.currentWindowHandle = `window-${this.windowCounter}`;
        this.windows = [{ handle: this.currentWindowHandle, scene, url: this.currentUrl, title: this.currentTitle }];
      } else {
        const current = this.windows.find((window) => window.handle === this.currentWindowHandle);
        if (current) {
          current.scene = scene;
          current.url = this.currentUrl;
          current.title = this.currentTitle;
        }
      }

      this.container.querySelectorAll('iframe[data-frame-html]').forEach((frame) => {
        try {
          const frameDoc = frame.contentDocument;
          frameDoc.open();
          frameDoc.write(decodeURIComponent(frame.getAttribute('data-frame-html') || ''));
          frameDoc.close();
        } catch (err) {
          // Ignore iframe loading issues in constrained DOM implementations.
        }
      });

      this.container.querySelectorAll('[data-shadow-host]').forEach((host) => {
        const template = host.querySelector('template');
        if (!template) return;
        const root = host.shadowRoot || host.attachShadow({ mode: 'open' });
        root.innerHTML = template.innerHTML;
        template.remove();
      });

      if (recordHistory === 'init') {
        this.history = [{ scene, url: this.currentUrl }];
        this.historyIndex = 0;
      } else if (recordHistory !== false) {
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push({ scene, url: this.currentUrl });
        this.historyIndex = this.history.length - 1;
      }
      this.updateDelayed();
      this.updateCart();
    }

    sleep(seconds) {
      const amount = Number(seconds);
      if (!Number.isFinite(amount) || amount < 0) {
        throw new RubyError('sleep length must be a non-negative number');
      }
      this.clock += Math.round(amount * 1000);
      this.updateDelayed();
    }

    updateDelayed() {
      if (!this.container) return;
      const nodes = this.container.querySelectorAll('[data-appears-at]');
      nodes.forEach((node) => {
        const appearsAt = Number(node.getAttribute('data-appears-at') || 0);
        if (this.clock >= appearsAt) {
          node.removeAttribute('hidden');
          node.setAttribute('data-ready', 'true');
        } else {
          node.setAttribute('hidden', '');
          node.removeAttribute('data-ready');
        }
      });
    }

    updateCart() {
      if (!this.container) return;
      const nodes = this.container.querySelectorAll('[data-cart-count]');
      nodes.forEach((node) => {
        node.textContent = String(this.cart);
      });
    }

    root() {
      return this.container;
    }

    find(strategy, value, scope, line) {
      const results = this.findAll(strategy, value, scope || this.currentRoot(), line);
      return results;
    }

    findAll(strategy, value, scope, line) {
      const root = scope || this.currentRoot();
      const doc = this.document;
      const rawStrategy = typeof strategy === 'string' ? strategy : toS(strategy);
      const strategyName = rawStrategy.toLowerCase().replace(/\s+/g, '_').replace('class_name', 'class_name');
      const selectorValue = value === null || value === undefined ? '' : String(value);
      let nodes = [];

      const all = (nodeList) => Array.prototype.slice.call(nodeList);

      switch (strategyName) {
        case 'id':
          nodes = all(root.querySelectorAll('[id]')).filter((node) => node.getAttribute('id') === selectorValue);
          break;
        case 'name':
          nodes = all(root.querySelectorAll('[name]')).filter((node) => node.getAttribute('name') === selectorValue);
          break;
        case 'class':
        case 'class_name':
          nodes = all(root.querySelectorAll('[class]')).filter((node) => {
            return (node.getAttribute('class') || '').split(/\s+/).includes(selectorValue);
          });
          break;
        case 'tag':
        case 'tag_name':
          nodes = all(root.getElementsByTagName(selectorValue));
          break;
        case 'link':
        case 'link_text':
          nodes = all(root.querySelectorAll('a')).filter((node) => collapse(node.textContent) === collapse(selectorValue));
          break;
        case 'partial_link':
        case 'partial_link_text':
          nodes = all(root.querySelectorAll('a')).filter((node) => collapse(node.textContent).includes(collapse(selectorValue)));
          break;
        case 'css':
        case 'css_selector':
          try {
            nodes = all(root.querySelectorAll(selectorValue));
          } catch (err) {
            throw new RubyError(`invalid CSS selector: ${selectorValue}`, line);
          }
          break;
        case 'xpath':
          try {
            const result = doc.evaluate(selectorValue, root, null, 7, null);
            for (let i = 0; i < result.snapshotLength; i += 1) {
              const node = result.snapshotItem(i);
              if (node && node.nodeType === 1) nodes.push(node);
            }
          } catch (err) {
            throw new RubyError(`invalid XPath: ${selectorValue}`, line);
          }
          break;
        default:
          throw new RubyError(`invalid locator strategy: ${rawStrategy}`, line);
      }

      if (root.nodeType === 1) {
        nodes = nodes.filter((node) => node !== root && (root.contains(node) || node === root));
      }

      const canonicalStrategy = canonicalLocatorStrategy(strategyName);
      const elements = nodes.map((node) => {
        const element = new Element(node, this);
        element.locatorStrategy = canonicalStrategy;
        element.locatorValue = selectorValue;
        return element;
      });
      const entry = {
        strategy: canonicalStrategy,
        value: selectorValue,
        keys: elements.map((element) => element.key()).filter(Boolean),
        count: elements.length
      };
      this.locatorLog.push(entry);
      this.lastLocator = entry;
      return elements;
    }

    findWithWait(strategy, value, scope, multiple, line) {
      let elements = this.findAll(strategy, value, scope, line);
      if (elements.length === 0 && this.implicitWait > 0) {
        this.clock += Math.round(this.implicitWait * 1000);
        this.updateDelayed();
        elements = this.findAll(strategy, value, scope, line);
      }
      if (multiple) return elements;
      if (elements.length === 0) {
        throw new NoSuchElementError(
          `no such element: Unable to locate element: {"method":"${strategy}","selector":"${value}"}`,
          line
        );
      }
      return elements[0];
    }

    method(name, args, kwargs, block, ctx) {
      switch (name) {
        case 'find_element':
        case 'find_elements': {
          const locator = normalizeLocator(args, kwargs);
          return this.findWithWait(
            locator.strategy,
            locator.value,
            this.currentRoot(),
            name === 'find_elements',
            ctx.currentLine
          );
        }
        case 'get':
          if (args.length < 1) throw new RubyError('driver.get expects a URL', ctx.currentLine);
          this.navigateTo(toS(args[0]), true);
          return null;
        case 'title':
          return this.currentTitle;
        case 'current_url':
          return this.currentUrl;
        case 'page_source':
        case 'source':
          return this.container.innerHTML;
        case 'navigate':
          return new Navigator(this);
        case 'manage':
          return new Manage(this);
        case 'switch_to':
          return new SwitchTo(this);
        case 'window_handles':
          return this.windows.map((window) => window.handle);
        case 'current_window_handle':
          return this.currentWindowHandle;
        case 'sleep':
          if (args.length < 1) throw new RubyError('sleep expects a number of seconds', ctx.currentLine);
          this.sleep(args[0]);
          return null;
        case 'save_screenshot':
          if (args.length < 1) throw new RubyError('save_screenshot expects a path', ctx.currentLine);
          this.screenshotPath = toS(args[0]);
          return true;
        case 'quit':
        case 'close':
          this.quitFlag = true;
          return null;
        case 'execute_script':
          return null;
        default:
          throw new RubyError(`undefined method '${name}' for driver`, ctx.currentLine);
      }
    }
  }

  class Navigator {
    constructor(browser) { this.browser = browser; }
    method(name, args, kwargs, block, ctx) {
      switch (name) {
        case 'to':
          if (args.length < 1) throw new RubyError('navigate.to expects a URL', ctx.currentLine);
          this.browser.navigateTo(toS(args[0]), true);
          return null;
        case 'back':
          if (this.browser.historyIndex > 0) {
            this.browser.historyIndex -= 1;
            const entry = this.browser.history[this.browser.historyIndex];
            this.browser.loadScene(entry.scene, entry.url, false);
            this.browser.historyIndex = this.browser.historyIndex;
          }
          return null;
        case 'forward':
          if (this.browser.historyIndex < this.browser.history.length - 1) {
            this.browser.historyIndex += 1;
            const entry = this.browser.history[this.browser.historyIndex];
            this.browser.loadScene(entry.scene, entry.url, false);
            this.browser.historyIndex = this.browser.historyIndex;
          }
          return null;
        case 'refresh':
          this.browser.loadScene(this.browser.currentScene, this.browser.currentUrl, false);
          return null;
        default:
          throw new RubyError(`undefined method '${name}' for navigate`, ctx.currentLine);
      }
    }
  }

  class Manage {
    constructor(browser) { this.browser = browser; }
    method(name, args, kwargs, block, ctx) {
      if (name === 'timeouts') return new Timeouts(this.browser);
      throw new RubyError(`undefined method '${name}' for manage`, ctx.currentLine);
    }
  }

  class Timeouts {
    constructor(browser) { this.browser = browser; }
    method(name, args, kwargs, block, ctx) {
      if (name === 'implicit_wait') return this.browser.implicitWait;
      if (name === 'set_implicit_wait') {
        this.browser.implicitWait = Number(args[0] || 0);
        return null;
      }
      throw new RubyError(`undefined method '${name}' for timeouts`, ctx.currentLine);
    }
  }

  class SwitchTo {
    constructor(browser) {
      this.browser = browser;
    }

    findFrame(target) {
      const root = this.browser.currentRoot();
      if (target instanceof Element) return target.node;
      const frames = Array.prototype.slice.call(root.querySelectorAll('iframe'));
      if (typeof target === 'number') {
        if (!frames[target]) throw new RubyError(`no frame found at index ${target}`);
        return frames[target];
      }
      const value = toS(target);
      const byId = frames.find((frame) => frame.getAttribute('id') === value);
      if (byId) return byId;
      const byName = frames.find((frame) => frame.getAttribute('name') === value);
      if (byName) return byName;
      throw new RubyError(`no frame found: ${value}`);
    }

    method(name, args, kwargs, block, ctx) {
      switch (name) {
        case 'frame': {
          const frame = this.findFrame(args[0]);
          const frameDoc = frame.contentDocument || frame.contentWindow.document;
          if (!frameDoc) throw new RubyError('frame is not available', ctx.currentLine);
          this.browser.frameStack.push(this.browser.currentRoot());
          this.browser.frameRoot = frameDoc;
          return null;
        }
        case 'parent_frame':
          this.browser.frameRoot = this.browser.frameStack.pop() || null;
          return null;
        case 'default_content':
          this.browser.frameRoot = null;
          this.browser.frameStack = [];
          return null;
        case 'window':
          if (args.length < 1) throw new RubyError('switch_to.window expects a handle', ctx.currentLine);
          return this.browser.switchWindow(toS(args[0]));
        case 'alert':
          if (!this.browser.alert) throw new RubyError('no such alert', ctx.currentLine);
          return new Alert(this.browser);
        default:
          throw new RubyError(`undefined method '${name}' for switch_to`, ctx.currentLine);
      }
    }
  }

  class Alert {
    constructor(browser) {
      this.browser = browser;
    }

    method(name, args, kwargs, block, ctx) {
      switch (name) {
        case 'text':
          return this.browser.alert ? this.browser.alert.text : '';
        case 'accept':
          this.browser.alertAction = 'accepted';
          this.browser.alert = null;
          return null;
        case 'dismiss':
          this.browser.alertAction = 'dismissed';
          this.browser.alert = null;
          return null;
        case 'send_keys':
          return null;
        default:
          throw new RubyError(`undefined method '${name}' for alert`, ctx.currentLine);
      }
    }
  }

  class ShadowRoot {
    constructor(root, browser) {
      this.root = root;
      this.browser = browser;
    }

    method(name, args, kwargs, block, ctx) {
      if (name === 'find_element' || name === 'find_elements') {
        const locator = normalizeLocator(args, kwargs);
        return this.browser.findWithWait(
          locator.strategy,
          locator.value,
          this.root,
          name === 'find_elements',
          ctx.currentLine
        );
      }
      throw new RubyError(`undefined method '${name}' for shadow root`, ctx.currentLine);
    }
  }

  class Element {
    constructor(node, browser) {
      this.node = node;
      this.browser = browser;
    }

    get(key) {
      return this.node.getAttribute(key);
    }

    getAttribute(key) {
      return this.node.getAttribute(key);
    }

    key() {
      return this.node.getAttribute('data-key');
    }

    label() {
      return this.node.getAttribute('data-label') || this.text || this.key() || this.node.tagName.toLowerCase();
    }

    get text() {
      if (isHidden(this.node, this.browser)) return '';
      return collapse(this.node.textContent || '');
    }

    isHidden() {
      return isHidden(this.node, this.browser);
    }

    method(name, args, kwargs, block, ctx) {
      switch (name) {
        case 'find_element':
        case 'find_elements': {
          this.ensureAttached(ctx.currentLine);
          const locator = normalizeLocator(args, kwargs);
          return this.browser.findWithWait(
            locator.strategy,
            locator.value,
            this.node,
            name === 'find_elements',
            ctx.currentLine
          );
        }
        case 'shadow_root': {
          const root = this.node.shadowRoot;
          if (!root) throw new RubyError('element has no shadow root', ctx.currentLine);
          return new ShadowRoot(root, this.browser);
        }
        case 'text':
          return this.text;
        case 'tag_name':
          return this.node.tagName.toLowerCase();
        case 'attribute':
        case 'get_attribute': {
          if (args.length < 1) throw new RubyError('attribute expects a name', ctx.currentLine);
          const attributeName = String(args[0]);
          if (attributeName === 'value' && 'value' in this.node) return this.node.value;
          if (attributeName === 'checked' && 'checked' in this.node) return this.node.checked;
          if (attributeName === 'selected' && 'selected' in this.node) return this.node.selected;
          return this.node.getAttribute(attributeName);
        }
        case 'property':
          if (args.length < 1) throw new RubyError('property expects a name', ctx.currentLine);
          return this.node[String(args[0])];
        case 'css_value':
          if (args.length < 1) throw new RubyError('css_value expects a property name', ctx.currentLine);
          return this.browser.document.defaultView.getComputedStyle(this.node).getPropertyValue(String(args[0]));
        case 'displayed?':
          return !this.isHidden();
        case 'enabled?':
          return !this.node.hasAttribute('disabled');
        case 'selected?':
          return Boolean(this.node.checked || this.node.selected);
        case 'click':
          this.ensureAttached(ctx.currentLine);
          clickElement(this.node, this.browser);
          return null;
        case 'send_keys':
          this.ensureAttached(ctx.currentLine);
          sendKeys(this.node, args.map(toS).join(''), this.browser);
          return null;
        case 'clear':
          this.ensureAttached(ctx.currentLine);
          if ('value' in this.node) this.node.value = '';
          else this.node.textContent = '';
          dispatch(this.node, 'input');
          dispatch(this.node, 'change');
          return null;
        case 'submit':
          this.ensureAttached(ctx.currentLine);
          this.browser.submitted = true;
          return null;
        case 'location':
          return { x: 0, y: 0 };
        case 'size':
          return { width: 0, height: 0 };
        case 'rect':
          return { x: 0, y: 0, width: 0, height: 0 };
        default:
          throw new RubyError(`undefined method '${name}' for element`, ctx.currentLine);
      }
    }

    ensureAttached(line) {
      if (!this.node.isConnected) {
        throw new StaleElementReferenceError('stale element reference: element is not attached to the page document', line);
      }
    }
  }

  function normalizeLocator(args, kwargs) {
    if (kwargs && Object.keys(kwargs).length > 0) {
      const key = Object.keys(kwargs)[0];
      return { strategy: key, value: kwargs[key] };
    }
    if (args.length >= 2) return { strategy: toS(args[0]), value: toS(args[1]) };
    if (args.length === 1 && args[0] && typeof args[0] === 'object' && !(args[0] instanceof SymbolValue)) {
      const key = Object.keys(args[0])[0];
      if (key) return { strategy: key, value: args[0][key] };
    }
    throw new RubyError('find_element expects a locator strategy and value');
  }

  function collapse(text) {
    return String(text || '').replace(/\s+/g, ' ').trim();
  }

  function isHidden(node, browser) {
    if (!node || !node.isConnected) return true;
    let current = node;
    while (current && current.nodeType === 1) {
      if (current.hasAttribute('hidden')) return true;
      const inline = (current.getAttribute('style') || '').replace(/\s/g, '');
      if (/display:none/i.test(inline) || /visibility:hidden/i.test(inline)) return true;
      if (current.hasAttribute('data-appears-at')) {
        const appearsAt = Number(current.getAttribute('data-appears-at'));
        if (browser.clock < appearsAt) return true;
      }
      if (current === browser.container) break;
      current = current.parentNode;
    }
    return false;
  }

  function dispatch(node, type) {
    const doc = node.ownerDocument;
    try {
      const event = new doc.defaultView.Event(type, { bubbles: true });
      node.dispatchEvent(event);
    } catch (err) {
      // Ignore event dispatch issues in constrained DOM implementations.
    }
  }

  function updateCartDisplays(browser) {
    browser.updateCart();
  }

  function clickElement(node, browser) {
    if (node.hasAttribute('disabled')) return;
    node.setAttribute('data-clicked', 'true');

    if (node.matches('input[type="checkbox"]') || node.matches('input[type="radio"]')) {
      node.checked = !node.checked;
      dispatch(node, 'change');
    }

    const action = node.getAttribute('data-click');
    if (action === 'login') {
      const user = node.getAttribute('data-user') || '';
      const password = node.getAttribute('data-password') || '';
      const userInput = browser.container.querySelector('#login-username');
      const passInput = browser.container.querySelector('#login-password');
      const enteredUser = userInput ? userInput.value : '';
      const enteredPassword = passInput ? passInput.value : '';
      if ((enteredUser || user) === user && (enteredPassword || password) === password) {
        browser.signedIn = true;
        browser.sessionId = `session-${browser.clock}`;
        const targetUrl = node.getAttribute('data-href');
        if (targetUrl) browser.navigateTo(targetUrl, true);
      } else {
        node.setAttribute('data-error', 'true');
      }
    } else if (action === 'logout') {
      browser.signedIn = false;
      browser.sessionId = null;
      const targetUrl = node.getAttribute('data-href');
      if (targetUrl) browser.navigateTo(targetUrl, true);
    } else if (action === 'window') {
      const targetUrl = node.getAttribute('data-href');
      if (targetUrl) {
        const handle = browser.openWindow(targetUrl, node.getAttribute('data-window-title'));
        browser.lastOpenedWindow = handle;
      }
    } else if (action === 'alert') {
      browser.alert = { text: node.getAttribute('data-alert-text') || '' };
      browser.alertAction = 'shown';
    } else if (action === 'download') {
      browser.download = node.getAttribute('data-file') || 'download.bin';
      node.setAttribute('data-downloaded', 'true');
    } else if (action === 'add') {
      const value = Number(node.getAttribute('data-value') || 1);
      browser.cart += value;
      updateCartDisplays(browser);
    } else if (action === 'toggle') {
      const on = node.getAttribute('data-on') === 'true';
      node.setAttribute('data-on', on ? 'false' : 'true');
      node.setAttribute('aria-pressed', on ? 'false' : 'true');
    } else if (action === 'reveal') {
      const target = node.getAttribute('data-target');
      if (target) {
        browser.container.querySelectorAll(target).forEach((targetNode) => {
          targetNode.removeAttribute('hidden');
          targetNode.setAttribute('data-appears-at', '0');
        });
      }
    } else if (action === 'submit') {
      browser.submitted = true;
    } else if (action === 'nav') {
      const targetUrl = node.getAttribute('data-href') || node.getAttribute('href');
      if (targetUrl) {
        try {
          browser.navigateTo(targetUrl, true);
        } catch (err) {
          // Ignore unknown navigation targets in the simulator.
        }
      }
    }

    if (!node.matches('a')) dispatch(node, 'click');
  }

  function sendKeys(node, value, browser) {
    if (node.matches('select')) return;
    if (node.matches('input[type="file"]')) {
      browser.uploadedFile = value;
      node.setAttribute('data-uploaded', value);
      dispatch(node, 'input');
      dispatch(node, 'change');
      return;
    }
    if ('value' in node) {
      node.value = String(node.value || '') + value;
    } else if (node.getAttribute('contenteditable') === 'true') {
      node.textContent = (node.textContent || '') + value;
    }
    dispatch(node, 'input');
    dispatch(node, 'change');
  }

  class Select {
    constructor(element) {
      if (!(element instanceof Element)) throw new RubyError('Select.new expects an element');
      if (element.node.tagName.toLowerCase() !== 'select') {
        throw new RubyError('Select only works on <select> elements');
      }
      this.element = element;
      this.node = element.node;
      this.browser = element.browser;
    }

    options() {
      return Array.prototype.slice.call(this.node.querySelectorAll('option')).map((node) => new Element(node, this.browser));
    }

    selectedOptions() {
      return this.options().filter((option) => option.node.selected);
    }

    firstSelectedOption() {
      const selected = this.selectedOptions();
      return selected.length ? selected[0] : null;
    }

    method(name, args, kwargs, block, ctx) {
      switch (name) {
        case 'options':
          return this.options();
        case 'selected_options':
          return this.selectedOptions();
        case 'first_selected_option':
          return this.firstSelectedOption();
        case 'multiple?':
          return this.node.hasAttribute('multiple');
        case 'select_by_value': {
          const value = toS(args[0]);
          const option = this.options().find((opt) => opt.node.value === value);
          if (!option) throw new NoSuchElementError(`Cannot locate option with value: ${value}`, ctx.currentLine);
          this.setSelected(option);
          return null;
        }
        case 'select_by_index': {
          const index = Number(args[0]);
          const options = this.options();
          if (!options[index]) throw new NoSuchElementError(`Cannot locate option with index: ${index}`, ctx.currentLine);
          this.setSelected(options[index]);
          return null;
        }
        case 'select_by_visible_text': {
          const text = collapse(toS(args[0]));
          const option = this.options().find((opt) => collapse(opt.node.textContent) === text);
          if (!option) throw new NoSuchElementError(`Cannot locate option with text: ${text}`, ctx.currentLine);
          this.setSelected(option);
          return null;
        }
        case 'deselect_by_value':
        case 'deselect_by_index':
        case 'deselect_by_visible_text':
        case 'deselect_all':
          return null;
        default:
          throw new RubyError(`undefined method '${name}' for Select`, ctx.currentLine);
      }
    }

    setSelected(option) {
      if (!this.node.hasAttribute('multiple')) {
        this.options().forEach((opt) => { opt.node.selected = false; });
      }
      option.node.selected = true;
      dispatch(this.node, 'change');
    }
  }

  class Wait {
    constructor(options) {
      const opts = options || {};
      this.timeout = opts.timeout === undefined ? 5 : Number(opts.timeout);
      this.interval = opts.interval === undefined ? 0.1 : Number(opts.interval);
      this.browser = opts.browser || null;
    }

    method(name, args, kwargs, block, ctx) {
      if (name !== 'until') throw new RubyError(`undefined method '${name}' for Wait`, ctx.currentLine);
      if (!block) throw new RubyError('Wait#until needs a block', ctx.currentLine);
      if (!this.browser) throw new RubyError('Wait is not attached to a browser', ctx.currentLine);
      const deadline = this.browser.clock + this.timeout * 1000;
      let lastError = null;
      for (;;) {
        try {
          const value = block();
          if (truthy(value)) return value;
        } catch (err) {
          if (err instanceof NoSuchElementError || err instanceof StaleElementReferenceError) {
            lastError = err;
          } else {
            throw err;
          }
        }
        if (this.browser.clock >= deadline) {
          throw new TimeoutError(
            lastError ? `timed out after ${this.timeout} seconds: ${lastError.message}` : `timed out after ${this.timeout} seconds`,
            ctx.currentLine
          );
        }
        this.browser.sleep(this.interval);
      }
    }
  }

  class Regex {
    constructor(pattern, flags) {
      this.pattern = pattern;
      this.flags = flags || '';
      this.regex = new RegExp(pattern, flags);
    }

    method(name, args, kwargs, block, ctx) {
      switch (name) {
        case 'match':
          return matchData(this.regex, toS(args[0]));
        case 'match?':
          return this.regex.test(toS(args[0]));
        case 'source':
          return this.pattern;
        case 'to_s':
          return `/${this.pattern}/${this.flags}`;
        default:
          throw new RubyError(`undefined method '${name}' for Regexp`, ctx.currentLine);
      }
    }
  }

  function matchData(regex, source) {
    const match = String(source).match(regex);
    return match ? new MatchData(match, String(source)) : null;
  }

  class SelectClass {
    construct(args, kwargs, block, ctx) {
      return new Select(args[0]);
    }
  }

  class WaitClass {
    construct(args, kwargs, block, ctx) {
      const options = {};
      if (kwargs) {
        Object.keys(kwargs).forEach((key) => { options[key] = kwargs[key]; });
      }
      if (args[0] && typeof args[0] === 'object' && !(args[0] instanceof Element)) {
        Object.keys(args[0]).forEach((key) => { options[key] = args[0][key]; });
      }
      options.browser = ctx.browser;
      return new Wait(options);
    }
  }

  class RegexpClass {
    construct(args, kwargs, block, ctx) {
      return new Regex(toS(args[0] || ''), toS(args[1] || ''));
    }
  }

  class JSONModule {
    method(name, args, kwargs, block, ctx) {
      if (name === 'generate' || name === 'dump' || name === 'pretty_generate') {
        const value = args[0];
        return JSON.stringify(value, null, name === 'pretty_generate' ? 2 : 0);
      }
      if (name === 'parse') {
        try {
          return JSON.parse(toS(args[0]));
        } catch (err) {
          throw new RubyError(`unexpected token in JSON`, ctx.currentLine);
        }
      }
      throw new RubyError(`undefined method '${name}' for JSON`, ctx.currentLine);
    }
  }

  class URIValue {
    constructor(url) {
      this.url = String(url);
    }

    method(name, args, kwargs, block, ctx) {
      if (name === 'to_s') return this.url;
      if (name === 'host') return this.url.replace(/^https?:\/\//, '').split('/')[0].split(':')[0];
      if (name === 'path') {
        const withoutProtocol = this.url.replace(/^https?:\/\/[^/]+/, '');
        return withoutProtocol.split('?')[0] || '/';
      }
      if (name === 'scheme') return (this.url.match(/^([a-z]+):/) || [])[1] || '';
      throw new RubyError(`undefined method '${name}' for URI`, ctx.currentLine);
    }
  }

  class URIModule {
    method(name, args, kwargs, block, ctx) {
      if (name === 'parse') return new URIValue(toS(args[0]));
      if (name === 'encode_www_form_component') return encodeURIComponent(toS(args[0]));
      if (name === 'encode_www_form') {
        const hash = args[0] || {};
        return Object.keys(hash)
          .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(toS(hash[key]))}`)
          .join('&');
      }
      throw new RubyError(`undefined method '${name}' for URI`, ctx.currentLine);
    }
  }

  class HTTPResponse {
    constructor(status, body, message) {
      this.status = Number(status);
      this.body = String(body == null ? '' : body);
      this.message = message || '';
    }

    method(name, args, kwargs, block, ctx) {
      if (name === 'code') return String(this.status);
      if (name === 'to_i') return this.status;
      if (name === 'body') return this.body;
      if (name === 'message') return this.message;
      if (name === '[]') {
        const header = toS(args[0]).toLowerCase();
        if (header === 'content-type') return 'application/json';
        return null;
      }
      if (name === 'value') {
        if (this.status >= 400) throw new RubyError(`HTTP ${this.status}`, ctx.currentLine);
        return this;
      }
      throw new RubyError(`undefined method '${name}' for HTTP response`, ctx.currentLine);
    }
  }

  class HTTPModule {
    method(name, args, kwargs, block, ctx) {
      if (name === 'get_response' || name === 'get') {
        const target = args[0];
        const url = target instanceof URIValue ? target.url : toS(target);
        const browser = ctx.browser;
        const key = String(url).replace(/\/+$/, '');
        const route = browser.apiRoutes[key] || browser.apiRoutes[String(url)];
        if (!route) return new HTTPResponse(404, JSON.stringify({ error: 'not found' }), 'Not Found');
        return new HTTPResponse(route.status || 200, route.body || '', route.status === 404 ? 'Not Found' : 'OK');
      }
      throw new RubyError(`undefined method '${name}' for Net::HTTP`, ctx.currentLine);
    }
  }

  class FileModule {
    method(name, args, kwargs, block, ctx) {
      const browser = ctx.browser;
      if (name === 'read') {
        const path = toS(args[0]);
        if (Object.prototype.hasOwnProperty.call(browser.files, path)) return browser.files[path];
        throw new RubyError(`No such file or directory @ rb_sysopen - ${path}`, ctx.currentLine);
      }
      if (name === 'write') {
        const path = toS(args[0]);
        browser.files[path] = toS(args[1]);
        return String(browser.files[path]).length;
      }
      if (name === 'exist?') return Object.prototype.hasOwnProperty.call(browser.files, toS(args[0]));
      if (name === 'delete') {
        delete browser.files[toS(args[0])];
        return 0;
      }
      if (name === 'join') return args.map(toS).join('/').replace(/\/+/g, '/');
      if (name === 'basename') return toS(args[0]).split('/').pop();
      throw new RubyError(`undefined method '${name}' for File`, ctx.currentLine);
    }
  }

  // -------------------------------------------------------------------------
  // Interpreter
  // -------------------------------------------------------------------------
  class Interpreter {
    constructor(options) {
      this.options = options || {};
      this.browser = this.options.browser || null;
      this.output = '';
      this.currentLine = null;
      this.globals = new Scope();
      this.globals.define('driver', this.browser);
      this.globals.define('browser', this.browser);
      this.constants = {
        Select: new SelectClass(),
        Selenium: {
          WebDriver: {
            for(...params) {
              const ctx = params[params.length - 1];
              const args = params.slice(0, -1);
              const browser = ctx.interpreter.browser;
              const type = args[0] ? toS(args[0]) : 'chrome';
              const options = args[1] && typeof args[1] === 'object' ? args[1] : {};
              browser.driverType = type;
              browser.headless = Boolean(options.headless);
              return browser;
            },
            Wait: new WaitClass(),
            Select: new SelectClass()
          }
        },
        Regexp: new RegexpClass(),
        JSON: new JSONModule(),
        URI: new URIModule(),
        Net: { HTTP: new HTTPModule() },
        File: new FileModule()
      };
      this.constants.ENV = this.browser ? this.browser.env || {} : {};
    }

    run(program) {
      try {
        const value = this.evalStatements(program.body, this.globals);
        return { value, output: this.output };
      } catch (err) {
        if (err instanceof ReturnSignal) return { value: err.value, output: this.output };
        throw err;
      }
    }

    evalStatements(statements, scope) {
      let value = null;
      for (const statement of statements) {
        value = this.eval(statement, scope);
      }
      return value;
    }

    eval(node, scope) {
      if (!node) return null;
      if (node.line) this.currentLine = node.line;

      switch (node.type) {
        case 'Program':
          return this.evalStatements(node.body, scope);
        case 'Number':
        case 'String':
          return node.value;
        case 'Literal':
          return node.value;
        case 'Nil':
          return null;
        case 'Symbol':
          return new SymbolValue(node.name);
        case 'Regex':
          return new Regex(node.pattern, node.flags);
        case 'Array':
          return node.elements.map((element) => this.eval(element, scope));
        case 'Hash': {
          const hash = {};
          node.pairs.forEach((pair) => {
            hash[toS(this.eval(pair.key, scope))] = this.eval(pair.value, scope);
          });
          return hash;
        }
        case 'Var': {
          const value = scope.get(node.name);
          if (value === undefined) throw new RubyError(`undefined local variable or method '${node.name}'`, node.line);
          return value;
        }
        case 'Const':
          return this.resolveConstant(node.path, node.line);
        case 'Unary': {
          const value = this.eval(node.argument, scope);
          if (node.op === '!') return !truthy(value);
          if (node.op === '-') return -Number(value);
          if (node.op === '+') return Number(value);
          throw new RubyError(`unsupported unary operator ${node.op}`, node.line);
        }
        case 'SymbolProc':
          return { __symbolProc: node.name };
        case 'Binary':
          return this.evalBinary(node, scope);
        case 'Assign':
          return this.evalAssign(node, scope);
        case 'Ternary':
          return truthy(this.eval(node.cond, scope)) ? this.eval(node.a, scope) : this.eval(node.b, scope);
        case 'Index':
          return this.index(this.eval(node.object, scope), this.eval(node.index, scope), node.line);
        case 'If': {
          for (const branch of node.branches) {
            if (truthy(this.eval(branch.cond, scope))) return this.evalStatements(branch.body, scope);
          }
          if (node.elseBody) return this.evalStatements(node.elseBody, scope);
          return null;
        }
        case 'While': {
          let result = null;
          let guard = 0;
          while (truthy(this.eval(node.cond, scope))) {
            guard += 1;
            if (guard > 10000) throw new RubyError('loop limit exceeded', node.line);
            try {
              result = this.evalStatements(node.body, scope);
            } catch (err) {
              if (err instanceof BreakSignal) return err.value;
              if (err instanceof NextSignal) continue;
              throw err;
            }
          }
          return result;
        }
        case 'Return':
          throw new ReturnSignal(this.eval(node.value, scope));
        case 'Break':
          throw new BreakSignal(null);
        case 'Next':
          throw new NextSignal(null);
        case 'Command':
          return this.evalCommand(node, scope);
        case 'Call':
          return this.evalCall(node, scope);
        case 'Block':
          throw new RubyError('unexpected block', node.line);
        default:
          throw new RubyError(`unknown expression type ${node.type}`, node.line);
      }
    }

    resolveConstant(path, line) {
      let value = this.constants;
      for (const part of path) {
        if (!value || !Object.prototype.hasOwnProperty.call(value, part)) {
          throw new RubyError(`uninitialized constant ${path.join('::')}`, line);
        }
        value = value[part];
      }
      return value;
    }

    evalBinary(node, scope) {
      const op = node.op;
      if (op === '&&' || op === 'and') {
        const left = this.eval(node.left, scope);
        return truthy(left) ? this.eval(node.right, scope) : left;
      }
      if (op === '||' || op === 'or') {
        const left = this.eval(node.left, scope);
        return truthy(left) ? left : this.eval(node.right, scope);
      }

      const left = this.eval(node.left, scope);
      const right = this.eval(node.right, scope);

      switch (op) {
        case '+':
          if (typeof left === 'string' && typeof right === 'string') return left + right;
          if (Array.isArray(left) && Array.isArray(right)) return left.concat(right);
          return Number(left) + Number(right);
        case '-':
          return Number(left) - Number(right);
        case '*':
          if (typeof left === 'string' && typeof right === 'number') return left.repeat(right);
          if (Array.isArray(left) && typeof right === 'number') {
            const repeated = [];
            for (let i = 0; i < right; i += 1) repeated.push.apply(repeated, left);
            return repeated;
          }
          return Number(left) * Number(right);
        case '/': {
          if (Number.isInteger(left) && Number.isInteger(right)) return Math.trunc(left / right);
          return Number(left) / Number(right);
        }
        case '%':
          return Number(left) % Number(right);
        case '==':
          return rubyEqual(left, right);
        case '!=':
          return !rubyEqual(left, right);
        case '=~': {
          if (left instanceof Regex) return matchIndex(left.regex, toS(right));
          if (right instanceof Regex) return matchIndex(right.regex, toS(left));
          return null;
        }
        case '!~': {
          if (left instanceof Regex) return matchIndex(left.regex, toS(right)) === null;
          if (right instanceof Regex) return matchIndex(right.regex, toS(left)) === null;
          return true;
        }
        case '<':
          return Number(left) < Number(right);
        case '>':
          return Number(left) > Number(right);
        case '<=':
          return Number(left) <= Number(right);
        case '>=':
          return Number(left) >= Number(right);
        case '<<':
          if (Array.isArray(left)) {
            left.push(right);
            return left;
          }
          if (typeof left === 'string') return left + toS(right);
          throw new RubyError(`undefined method '<<' for ${inspect(left)}`, node.line);
        case '>>':
          return Number(left) >> Number(right);
        default:
          throw new RubyError(`unsupported operator ${op}`, node.line);
      }
    }

    evalAssign(node, scope) {
      let value;
      if (node.op === '=') {
        value = this.eval(node.value, scope);
      } else {
        const current = this.readAssignable(node.target, scope);
        const right = this.eval(node.value, scope);
        if (node.op === '+=') value = current + right;
        else if (node.op === '-=') value = Number(current) - Number(right);
        else if (node.op === '*=') value = Number(current) * Number(right);
        else if (node.op === '/=') value = Number(current) / Number(right);
        else if (node.op === '||=') value = truthy(current) ? current : right;
        else if (node.op === '&&=') value = truthy(current) ? right : current;
      }
      this.writeAssignable(node.target, value, scope);
      return value;
    }

    readAssignable(target, scope) {
      if (target.type === 'Var') return this.eval(target, scope);
      if (target.type === 'Call' && target.receiver) {
        const receiver = this.eval(target.receiver, scope);
        return this.callMethod(receiver, target.name, [], {}, null, target.line);
      }
      if (target.type === 'Index') {
        return this.index(this.eval(target.object, scope), this.eval(target.index, scope), target.line);
      }
      throw new RubyError('invalid assignment target', target.line);
    }

    writeAssignable(target, value, scope) {
      if (target.type === 'Var') {
        scope.set(target.name, value);
        return;
      }
      if (target.type === 'Call' && target.receiver) {
        const receiver = this.eval(target.receiver, scope);
        this.setMember(receiver, target.name, value, target.line);
        return;
      }
      if (target.type === 'Index') {
        const object = this.eval(target.object, scope);
        const index = this.eval(target.index, scope);
        if (Array.isArray(object) || typeof object === 'string') {
          let i = Number(index);
          if (i < 0) i += object.length;
          if (Array.isArray(object)) object[i] = value;
          return;
        }
        throw new RubyError('invalid index assignment', target.line);
      }
      throw new RubyError('invalid assignment target', target.line);
    }

    evalArgs(args, scope) {
      return (args || []).map((arg) => {
        if (arg.type === 'SymbolProc') return { __symbolProc: arg.name };
        return this.eval(arg, scope);
      });
    }

    evalKwargs(kwargs, scope) {
      if (!kwargs) return {};
      const result = {};
      Object.keys(kwargs).forEach((key) => {
        result[key] = this.eval(kwargs[key], scope);
      });
      return result;
    }

    makeBlock(blockNode, scope) {
      const self = this;
      return function block(...args) {
        const blockScope = new Scope(scope);
        blockNode.params.forEach((param, index) => {
          blockScope.define(param, args[index] === undefined ? null : args[index]);
        });
        try {
          return self.evalStatements(blockNode.body, blockScope);
        } catch (err) {
          if (err instanceof NextSignal) return err.value;
          throw err;
        }
      };
    }

    evalCommand(node, scope) {
      const args = this.evalArgs(node.args, scope);
      const kwargs = this.evalKwargs(node.kwargs, scope);
      return this.callGlobal(node.name, args, kwargs, null, node.line);
    }

    evalCall(node, scope) {
      const receiver = this.eval(node.receiver, scope);
      const args = this.evalArgs(node.args, scope);
      const kwargs = this.evalKwargs(node.kwargs, scope);
      let block = node.block ? this.makeBlock(node.block, scope) : null;
      if (!block && args.length && args[args.length - 1] && args[args.length - 1].__symbolProc) {
        block = args.pop();
      }
      return this.callMethod(receiver, node.name, args, kwargs, block, node.line);
    }

    callGlobal(name, args, kwargs, block, line) {
      switch (name) {
        case 'puts': {
          if (args.length === 0) this.output += '\n';
          const emit = (value) => {
            if (Array.isArray(value)) value.forEach(emit);
            else this.output += toS(value) + '\n';
          };
          args.forEach(emit);
          return null;
        }
        case 'print':
          args.forEach((value) => {
            if (Array.isArray(value)) this.output += inspect(value);
            else this.output += toS(value);
          });
          return null;
        case 'p':
          args.forEach((value) => { this.output += inspect(value) + '\n'; });
          return null;
        case 'sleep':
          this.browser.sleep(Number(args[0] || 0));
          return null;
        case 'raise':
          throw new RubyError(args.map(toS).join(' ') || 'Runtime error', line);
        default:
          throw new RubyError(`undefined method '${name}'`, line);
      }
    }

    callBlock(block, args) {
      if (!block) return null;
      if (block.__symbolProc) {
        return this.callMethod(args[0], block.__symbolProc, [], {}, null, this.currentLine);
      }
      return block.apply(null, args);
    }

    callMethod(object, name, args, kwargs, block, line) {
      if (object === null || object === undefined) {
        if (name === 'nil?') return true;
        if (name === 'to_s' || name === 'to_str') return '';
        if (name === 'inspect') return 'nil';
        throw new RubyError(`undefined method '${name}' for nil`, line);
      }

      if (object instanceof Browser) return object.method(name, args, kwargs, block, this);
      if (object instanceof Element) return object.method(name, args, kwargs, block, this);
      if (object instanceof Select) return object.method(name, args, kwargs, block, this);
      if (object instanceof Wait) return object.method(name, args, kwargs, block, this);
      if (object instanceof Navigator) return object.method(name, args, kwargs, block, this);
      if (object instanceof Manage) return object.method(name, args, kwargs, block, this);
      if (object instanceof Timeouts) return object.method(name, args, kwargs, block, this);
      if (object instanceof SwitchTo || object instanceof Alert || object instanceof ShadowRoot) {
        return object.method(name, args, kwargs, block, this);
      }
      if (object instanceof JSONModule || object instanceof URIModule || object instanceof HTTPModule || object instanceof FileModule) {
        return object.method(name, args, kwargs, block, this);
      }
      if (object instanceof URIValue || object instanceof HTTPResponse) {
        return object.method(name, args, kwargs, block, this);
      }
      if (object instanceof Regex) return object.method(name, args, kwargs, block, this);
      if (object instanceof MatchData) return this.callMatchData(object, name, args, block, line);
      if (object instanceof SymbolValue) return this.callSymbol(object, name, args, line);
      if (object instanceof SelectClass || object instanceof WaitClass || object instanceof RegexpClass) {
        if (name === 'new') return object.construct(args, kwargs, block, this);
        throw new RubyError(`undefined method '${name}' for class`, line);
      }
      if (Array.isArray(object)) return this.callArray(object, name, args, kwargs, block, line);
      if (typeof object === 'string') return this.callString(object, name, args, kwargs, block, line);
      if (typeof object === 'number') return this.callNumber(object, name, args, kwargs, block, line);
      if (typeof object === 'boolean') {
        if (name === 'to_s') return String(object);
        if (name === '!') return !object;
        throw new RubyError(`undefined method '${name}' for ${object}`, line);
      }
      if (typeof object === 'object') return this.callHash(object, name, args, kwargs, block, line);
      throw new RubyError(`undefined method '${name}' for ${inspect(object)}`, line);
    }

    callArray(array, name, args, kwargs, block, line) {
      const each = (fn) => {
        for (let i = 0; i < array.length; i += 1) {
          try {
            fn(array[i], i);
          } catch (err) {
            if (err instanceof BreakSignal) return { broken: true, value: err.value };
            if (err instanceof NextSignal) continue;
            throw err;
          }
        }
        return { broken: false };
      };

      switch (name) {
        case 'each':
          each((item) => this.callBlock(block, [item]));
          return array;
        case 'each_with_index':
          each((item, i) => this.callBlock(block, [item, i]));
          return array;
        case 'map':
        case 'collect': {
          const result = [];
          const outcome = each((item, i) => result.push(this.callBlock(block, [item, i])));
          return outcome.broken ? outcome.value : result;
        }
        case 'select':
        case 'filter': {
          const result = [];
          each((item, i) => { if (truthy(this.callBlock(block, [item, i]))) result.push(item); });
          return result;
        }
        case 'reject': {
          const result = [];
          each((item, i) => { if (!truthy(this.callBlock(block, [item, i]))) result.push(item); });
          return result;
        }
        case 'find':
        case 'detect': {
          let found = null;
          const outcome = each((item, i) => {
            if (truthy(this.callBlock(block, [item, i]))) {
              found = item;
              throw new BreakSignal(item);
            }
          });
          return outcome.broken ? outcome.value : found;
        }
        case 'any?': {
          if (!block) return array.length > 0;
          let result = false;
          each((item, i) => { if (truthy(this.callBlock(block, [item, i]))) { result = true; throw new BreakSignal(true); } });
          return result;
        }
        case 'all?': {
          if (!block) return true;
          let result = true;
          each((item, i) => { if (!truthy(this.callBlock(block, [item, i]))) { result = false; throw new BreakSignal(false); } });
          return result;
        }
        case 'none?':
          if (!block) return array.length === 0;
          return !this.callArray(array, 'any?', args, kwargs, block, line);
        case 'count':
        case 'size':
        case 'length':
          if (name === 'count' && args.length) return array.filter((item) => rubyEqual(item, args[0])).length;
          if (name === 'count' && block) {
            let count = 0;
            each((item, i) => { if (truthy(this.callBlock(block, [item, i]))) count += 1; });
            return count;
          }
          return array.length;
        case 'empty?':
          return array.length === 0;
        case 'first':
          if (args.length) return array.slice(0, Number(args[0]));
          return array.length ? array[0] : null;
        case 'last':
          if (args.length) return array.slice(-Number(args[0]));
          return array.length ? array[array.length - 1] : null;
        case 'join':
          return array.map(toS).join(args.length ? toS(args[0]) : '');
        case 'include?':
          return array.some((item) => rubyEqual(item, args[0]));
        case 'index':
          for (let i = 0; i < array.length; i += 1) if (rubyEqual(array[i], args[0])) return i;
          return null;
        case 'push':
          array.push.apply(array, args);
          return array;
        case 'pop':
          return array.length ? array.pop() : null;
        case 'shift':
          return array.length ? array.shift() : null;
        case 'unshift':
          array.unshift.apply(array, args);
          return array;
        case 'sum': {
          let total = 0;
          each((item, i) => {
            const value = block ? this.callBlock(block, [item, i]) : item;
            total += Number(value);
          });
          return total;
        }
        case 'min':
          return array.length ? array.reduce((a, b) => (Number(a) <= Number(b) ? a : b)) : null;
        case 'max':
          return array.length ? array.reduce((a, b) => (Number(a) >= Number(b) ? a : b)) : null;
        case 'sort':
          return array.slice().sort((a, b) => {
            if (block) return Number(this.callBlock(block, [a, b]));
            return toS(a).localeCompare(toS(b));
          });
        case 'sort_by':
          return array.slice().sort((a, b) => {
            const av = this.callBlock(block, [a]);
            const bv = this.callBlock(block, [b]);
            if (typeof av === 'number' && typeof bv === 'number') return av - bv;
            return toS(av).localeCompare(toS(bv));
          });
        case 'reverse':
          return array.slice().reverse();
        case 'uniq':
          return array.filter((item, index) => array.findIndex((other) => rubyEqual(other, item)) === index);
        case 'compact':
          return array.filter((item) => item !== null && item !== undefined);
        case 'flatten': {
          const result = [];
          const walk = (value) => {
            if (Array.isArray(value)) value.forEach(walk);
            else result.push(value);
          };
          walk(array);
          return result;
        }
        case 'delete':
          for (let i = array.length - 1; i >= 0; i -= 1) {
            if (rubyEqual(array[i], args[0])) array.splice(i, 1);
          }
          return args[0];
        case 'to_a':
          return array;
        case 'tally': {
          const result = {};
          array.forEach((item) => {
            const key = toS(item);
            result[key] = (result[key] || 0) + 1;
          });
          return result;
        }
        default:
          throw new RubyError(`undefined method '${name}' for Array`, line);
      }
    }

    callString(string, name, args, kwargs, block, line) {
      const first = args[0];
      switch (name) {
        case 'strip': return string.trim();
        case 'lstrip': return string.replace(/^\s+/, '');
        case 'rstrip': return string.replace(/\s+$/, '');
        case 'chomp': return string.replace(/\r?\n$/, '');
        case 'downcase': return string.toLowerCase();
        case 'upcase': return string.toUpperCase();
        case 'capitalize': return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        case 'length':
        case 'size':
          return string.length;
        case 'empty?':
          return string.length === 0;
        case 'include?':
          return string.includes(toS(first));
        case 'start_with?':
          return string.startsWith(toS(first));
        case 'end_with?':
          return string.endsWith(toS(first));
        case 'split': {
          if (first instanceof Regex) return string.split(first.regex);
          if (first === undefined || first === null) return string.trim().split(/\s+/).filter((part) => part.length);
          return string.split(toS(first));
        }
        case 'to_i': return parseInt(string, 10) || 0;
        case 'to_f': return parseFloat(string) || 0;
        case 'to_s':
        case 'to_str':
          return string;
        case 'chars':
          return string.split('');
        case 'lines':
          return string.split(/\n/).map((lineValue, index, all) => (index < all.length - 1 ? lineValue + '\n' : lineValue)).filter((x) => x.length);
        case 'delete':
          return first instanceof Regex ? string.replace(new RegExp(first.regex.source, 'g'), '') : string.split(toS(first)).join('');
        case 'gsub':
        case 'sub': {
          const pattern = first instanceof Regex ? first.regex : escapeRegExp(toS(first));
          const regex = pattern instanceof RegExp ? new RegExp(pattern.source, name === 'gsub' && !pattern.global ? pattern.flags + 'g' : pattern.flags) : new RegExp(pattern, name === 'gsub' ? 'g' : '');
          const replacement = rubyReplacement(toS(args[1] === undefined ? '' : args[1]));
          return string.replace(regex, replacement);
        }
        case 'match': {
          if (first instanceof Regex) return matchData(first.regex, string);
          return matchData(new RegExp(escapeRegExp(toS(first))), string);
        }
        case 'match?': {
          if (first instanceof Regex) return first.regex.test(string);
          return string.includes(toS(first));
        }
        case 'scan': {
          const regex = first instanceof Regex ? new RegExp(first.regex.source, first.regex.flags.includes('g') ? first.regex.flags : first.regex.flags + 'g') : new RegExp(escapeRegExp(toS(first)), 'g');
          const matches = [];
          let match;
          while ((match = regex.exec(string)) !== null) {
            if (match.length > 1) matches.push(match.slice(1));
            else matches.push(match[0]);
            if (match[0] === '') regex.lastIndex += 1;
          }
          return matches;
        }
        case 'to_sym':
          return new SymbolValue(string);
        default:
          throw new RubyError(`undefined method '${name}' for String`, line);
      }
    }

    callNumber(number, name, args, kwargs, block, line) {
      switch (name) {
        case 'to_s': return String(number);
        case 'to_i': return Math.trunc(number);
        case 'to_f': return Number(number);
        case 'round': return Math.round(number);
        case 'ceil': return Math.ceil(number);
        case 'floor': return Math.floor(number);
        case 'abs': return Math.abs(number);
        case 'zero?': return number === 0;
        case 'positive?': return number > 0;
        case 'negative?': return number < 0;
        case 'even?': return number % 2 === 0;
        case 'odd?': return Math.abs(number % 2) === 1;
        case 'times': {
          let last = null;
          for (let i = 0; i < number; i += 1) {
            try {
              last = this.callBlock(block, [i]);
            } catch (err) {
              if (err instanceof BreakSignal) return err.value;
              if (err instanceof NextSignal) continue;
              throw err;
            }
          }
          return number;
        }
        default:
          throw new RubyError(`undefined method '${name}' for Integer`, line);
      }
    }

    callMatchData(match, name, args, block, line) {
      switch (name) {
        case 'to_s': return match.match[0];
        case 'captures': return match.match.slice(1).map((value) => (value === undefined ? null : value));
        case 'to_a': return match.match.slice();
        case 'pre_match': return match.source.slice(0, match.match.index);
        case 'post_match': return match.source.slice(match.match.index + match.match[0].length);
        case 'begin':
          return match.match.index + (Number(args[0] || 0) === 0 ? 0 : 0);
        case 'end': {
          const index = Number(args[0] || 0);
          const value = match.match[index];
          if (index === 0) return match.match.index + match.match[0].length;
          return value === undefined ? null : match.match.index + match.match[0].indexOf(value) + value.length;
        }
        case 'nil?':
          return false;
        default:
          throw new RubyError(`undefined method '${name}' for MatchData`, line);
      }
    }

    callSymbol(symbol, name, args, line) {
      switch (name) {
        case 'to_s': return symbol.name;
        case 'to_sym': return symbol;
        default:
          throw new RubyError(`undefined method '${name}' for Symbol`, line);
      }
    }

    callHash(object, name, args, kwargs, block, line) {
      if (typeof object[name] === 'function') {
        return object[name].apply(object, args.concat([{ interpreter: this, line }]));
      }
      if (name === '[]') return object[toS(args[0])] === undefined ? null : object[toS(args[0])];
      if (name === 'keys') return Object.keys(object);
      if (name === 'values') return Object.keys(object).map((key) => object[key]);
      if (name === 'size' || name === 'length') return Object.keys(object).length;
      if (name === 'empty?') return Object.keys(object).length === 0;
      if (name === 'to_s' || name === 'inspect') return inspect(object);
      throw new RubyError(`undefined method '${name}' for Hash`, line);
    }

    index(object, index, line) {
      if (Array.isArray(object)) {
        let i = Number(index);
        if (i < 0) i += object.length;
        const value = object[i];
        return value === undefined ? null : value;
      }
      if (typeof object === 'string') {
        if (index instanceof Regex) {
          const match = object.match(index.regex);
          return match ? new MatchData(match, object) : null;
        }
        let i = Number(index);
        if (i < 0) i += object.length;
        return object.charAt(i) || null;
      }
      if (object instanceof MatchData) {
        return object.get(index);
      }
      if (object instanceof Element) {
        return object.getAttribute(String(index));
      }
      if (object && typeof object === 'object') {
        const key = toS(index);
        return object[key] === undefined ? null : object[key];
      }
      throw new RubyError(`cannot index ${inspect(object)}`, line);
    }

    setMember(object, name, value, line) {
      if (object instanceof Timeouts && name === 'implicit_wait') {
        object.browser.implicitWait = Number(value);
        return value;
      }
      if (object instanceof Timeouts && name === 'page_load') {
        return value;
      }
      if (object instanceof Element && name === 'value') {
        object.node.value = String(value);
        return value;
      }
      if (object && typeof object === 'object') {
        object[name] = value;
        return value;
      }
      throw new RubyError(`cannot set ${name} on ${inspect(object)}`, line);
    }
  }

  function matchIndex(regex, string) {
    const match = string.match(regex);
    return match ? match.index : null;
  }

  function rubyReplacement(replacement) {
    return replacement.replace(/\\(\d)/g, '$$$1');
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------
  function run(source, options) {
    const program = parse(source);
    const interpreter = new Interpreter(options || {});
    return interpreter.run(program);
  }

  const api = {
    run,
    parse,
    tokenize,
    inspect,
    toS,
    rubyEqual,
    truthy,
    Browser,
    Element,
    Select,
    Wait,
    RubyError,
    NoSuchElementError,
    TimeoutError,
    StaleElementReferenceError,
    ORIGIN
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.SeleniumRuby = api;
})(typeof window !== 'undefined' ? window : globalThis);
