(function (global) {
  'use strict';

  const Ruby = global.SeleniumRuby;

  if (!Ruby) {
    throw new Error('Java runner needs Selenium Ruby Diner to load first.');
  }

  const OPERATORS = ['+=', '==', '!=', '<=', '>=', '&&', '||', '++', '--', '->', '+', '-', '*', '/', '=', '<', '>', '!', '?', ':', ';', ',', '.', '(', ')', '{', '}', '[', ']'];
  const IDENT_START = /[A-Za-z_$]/;
  const IDENT_PART = /[A-Za-z0-9_$]/;

  class JavaError extends Error {
    constructor(message, line) {
      super(message);
      this.name = 'JavaError';
      this.line = line || null;
    }
  }

  class JavaSyntaxError extends JavaError {
    constructor(message, line) {
      super(message, line);
      this.name = 'JavaSyntaxError';
    }
  }

  function tokenize(source) {
    const text = String(source || '');
    const tokens = [];
    let index = 0;
    let line = 1;

    while (index < text.length) {
      const char = text[index];
      if (char === '\n') {
        line += 1;
        index += 1;
        continue;
      }
      if (/\s/.test(char)) {
        index += 1;
        continue;
      }
      if (char === '/' && text[index + 1] === '/') {
        while (index < text.length && text[index] !== '\n') index += 1;
        continue;
      }
      if (char === '"') {
        const startLine = line;
        let value = '';
        index += 1;
        let closed = false;
        while (index < text.length) {
          const current = text[index];
          if (current === '"') {
            index += 1;
            closed = true;
            break;
          }
          if (current === '\\') {
            const next = text[index + 1];
            if (next === undefined) break;
            const escapes = { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', '"': '"', "'": "'", '\\': '\\' };
            value += Object.prototype.hasOwnProperty.call(escapes, next) ? escapes[next] : next;
            index += 2;
            continue;
          }
          if (current === '\n') line += 1;
          value += current;
          index += 1;
        }
        if (!closed) throw new JavaSyntaxError('Unterminated string literal', startLine);
        tokens.push({ type: 'string', value, line: startLine });
        continue;
      }
      if (/[0-9]/.test(char)) {
        const start = index;
        while (index < text.length && /[0-9.]/.test(text[index])) index += 1;
        tokens.push({ type: 'number', value: text.slice(start, index), line });
        continue;
      }
      if (IDENT_START.test(char)) {
        const start = index;
        while (index < text.length && IDENT_PART.test(text[index])) index += 1;
        tokens.push({ type: 'identifier', value: text.slice(start, index), line });
        continue;
      }

      const operator = OPERATORS.find((candidate) => text.startsWith(candidate, index));
      if (!operator) throw new JavaSyntaxError(`Unexpected character ${char}`, line);
      tokens.push({ type: 'operator', value: operator, line });
      index += operator.length;
    }

    tokens.push({ type: 'eof', value: '', line });
    return tokens;
  }

  class Parser {
    constructor(tokens) {
      this.tokens = tokens;
      this.position = 0;
    }

    peek(offset) {
      return this.tokens[this.position + (offset || 0)];
    }

    at(value) {
      const token = this.peek();
      return token.value === value && token.type !== 'eof';
    }

    match(value) {
      if (!this.at(value)) return false;
      this.position += 1;
      return true;
    }

    expect(value) {
      if (!this.at(value)) {
        const token = this.peek();
        throw new JavaSyntaxError(`Expected '${value}' but found '${token.value || 'end of input'}'`, token.line);
      }
      return this.tokens[this.position++];
    }

    expectIdentifier() {
      const token = this.peek();
      if (token.type !== 'identifier') {
        throw new JavaSyntaxError(`Expected an identifier but found '${token.value || 'end of input'}'`, token.line);
      }
      this.position += 1;
      return token;
    }

    parseProgram() {
      const statements = [];
      while (this.peek().type !== 'eof') statements.push(this.parseStatement());
      return statements;
    }

    parseStatement() {
      const token = this.peek();
      if (this.match(';')) return { type: 'Empty', line: token.line };
      if (this.at('{')) return this.parseBlock();
      if (this.at('return')) {
        this.position += 1;
        const value = this.at(';') ? null : this.parseExpression();
        this.expect(';');
        return { type: 'Return', value, line: token.line };
      }
      if (this.at('for')) return this.parseFor();
      if (this.at('while')) return this.parseWhile();
      if (this.at('if')) return this.parseIf();
      if (this.looksLikeDeclaration()) {
        this.parseType();
        const name = this.expectIdentifier();
        this.expect('=');
        const value = this.parseExpression();
        this.expect(';');
        return { type: 'Var', name: name.value, value, line: token.line };
      }
      if (this.peek().type === 'identifier' && (this.peek(1).value === '=' || this.peek(1).value === '+=')) {
        const name = this.expectIdentifier();
        const operator = this.peek().value;
        this.position += 1;
        const value = this.parseExpression();
        this.expect(';');
        return { type: 'Assign', name: name.value, operator, value, line: token.line };
      }
      const expression = this.parseExpression();
      this.expect(';');
      return { type: 'Expression', expression, line: token.line };
    }

    looksLikeForEach() {
      if (this.peek().type !== 'identifier') return false;
      let offset = 1;
      while (this.atOffset(offset, '.')) offset += 2;
      if (this.atOffset(offset, '<')) {
        let depth = 0;
        while (this.peek(offset).type !== 'eof') {
          if (this.atOffset(offset, '<')) depth += 1;
          if (this.atOffset(offset, '>')) depth -= 1;
          offset += 1;
          if (depth === 0) break;
        }
      }
      return this.peek(offset).type === 'identifier' && this.atOffset(offset + 1, ':');
    }

    looksLikeDeclaration() {
      if (this.peek().type !== 'identifier') return false;
      let offset = 1;
      while (this.atOffset(offset, '.')) {
        offset += 1;
        if (this.peek(offset).type !== 'identifier') return false;
        offset += 1;
      }
      if (this.atOffset(offset, '<')) {
        let depth = 0;
        while (this.peek(offset).type !== 'eof') {
          if (this.atOffset(offset, '<')) depth += 1;
          if (this.atOffset(offset, '>')) depth -= 1;
          offset += 1;
          if (depth === 0) break;
        }
      }
      return this.peek(offset).type === 'identifier' && this.atOffset(offset + 1, '=');
    }

    atOffset(offset, value) {
      const token = this.peek(offset);
      return token.value === value && token.type !== 'eof';
    }

    parseType() {
      let name = this.expectIdentifier().value;
      while (this.match('.')) name += `.${this.expectIdentifier().value}`;
      if (this.match('<')) {
        let depth = 1;
        while (depth > 0 && this.peek().type !== 'eof') {
          if (this.match('<')) depth += 1;
          else if (this.match('>')) depth -= 1;
          else this.position += 1;
        }
      }
      return name;
    }

    parseBlock() {
      const token = this.expect('{');
      const body = [];
      while (!this.at('}') && this.peek().type !== 'eof') body.push(this.parseStatement());
      this.expect('}');
      return { type: 'Block', body, line: token.line };
    }

    parseFor() {
      const token = this.expect('for');
      this.expect('(');
      if (this.looksLikeForEach()) {
        this.parseType();
        const name = this.expectIdentifier();
        this.expect(':');
        const iterable = this.parseExpression();
        this.expect(')');
        const body = this.parseBlock();
        return { type: 'ForEach', name: name.value, iterable, body: body.body, line: token.line };
      }
      const init = this.parseStatement();
      const condition = this.parseExpression();
      this.expect(';');
      let update = null;
      if (!this.at(')')) {
        if (this.peek().type === 'identifier' && (this.peek(1).value === '+=' || this.peek(1).value === '=')) {
          const name = this.expectIdentifier();
          const operator = this.peek().value;
          this.position += 1;
          const value = this.parseExpression();
          update = { type: 'Assign', name: name.value, operator, value, line: token.line };
        } else if (this.peek().type === 'identifier' && this.peek(1).value === '++') {
          const name = this.expectIdentifier();
          this.position += 1;
          this.match('++');
          update = { type: 'Assign', name: name.value, operator: '+=', value: { type: 'Number', value: '1', line: token.line }, line: token.line };
        } else {
          update = { type: 'Expression', expression: this.parseExpression(), line: token.line };
        }
      }
      this.expect(')');
      const body = this.parseBlock();
      return { type: 'ForIndex', init, condition, update, body: body.body, line: token.line };
    }

    parseWhile() {
      const token = this.expect('while');
      this.expect('(');
      const condition = this.parseExpression();
      this.expect(')');
      const body = this.parseBlock();
      return { type: 'While', condition, body: body.body, line: token.line };
    }

    parseIf() {
      const token = this.expect('if');
      this.expect('(');
      const condition = this.parseExpression();
      this.expect(')');
      const body = this.parseBlock().body;
      let elseBody = [];
      if (this.match('else')) elseBody = this.parseBlock().body;
      return { type: 'If', condition, body, elseBody, line: token.line };
    }

    parseExpression() {
      return this.parseTernary();
    }

    parseTernary() {
      const condition = this.parseLogicalOr();
      if (!this.match('?')) return condition;
      const whenTrue = this.parseExpression();
      this.expect(':');
      const whenFalse = this.parseExpression();
      return { type: 'Ternary', condition, whenTrue, whenFalse, line: condition.line };
    }

    parseLogicalOr() {
      let left = this.parseLogicalAnd();
      while (this.match('||')) {
        const token = this.tokens[this.position - 1];
        const right = this.parseLogicalAnd();
        left = { type: 'Binary', operator: '||', left, right, line: token.line };
      }
      return left;
    }

    parseLogicalAnd() {
      let left = this.parseEquality();
      while (this.match('&&')) {
        const token = this.tokens[this.position - 1];
        const right = this.parseEquality();
        left = { type: 'Binary', operator: '&&', left, right, line: token.line };
      }
      return left;
    }

    parseEquality() {
      let left = this.parseRelational();
      while (this.at('==') || this.at('!=')) {
        const operator = this.peek().value;
        const token = this.tokens[this.position++];
        const right = this.parseRelational();
        left = { type: 'Binary', operator, left, right, line: token.line };
      }
      return left;
    }

    parseRelational() {
      let left = this.parseAdditive();
      while (this.at('<') || this.at('<=') || this.at('>') || this.at('>=')) {
        const operator = this.peek().value;
        const token = this.tokens[this.position++];
        const right = this.parseAdditive();
        left = { type: 'Binary', operator, left, right, line: token.line };
      }
      return left;
    }

    parseAdditive() {
      let left = this.parseMultiplicative();
      while (this.at('+') || this.at('-')) {
        const operator = this.peek().value;
        const token = this.tokens[this.position++];
        const right = this.parseMultiplicative();
        left = { type: 'Binary', operator, left, right, line: token.line };
      }
      return left;
    }

    parseMultiplicative() {
      let left = this.parseUnary();
      while (this.at('*') || this.at('/')) {
        const operator = this.peek().value;
        const token = this.tokens[this.position++];
        const right = this.parseUnary();
        left = { type: 'Binary', operator, left, right, line: token.line };
      }
      return left;
    }

    parseUnary() {
      if (this.at('!') || this.at('-')) {
        const token = this.tokens[this.position++];
        return { type: 'Unary', operator: token.value, value: this.parseUnary(), line: token.line };
      }
      return this.parsePostfix();
    }

    parsePostfix() {
      let node = this.parsePrimary();
      for (;;) {
        if (this.match('.')) {
          const name = this.expectIdentifier();
          if (this.match('(')) {
            const args = this.parseArguments();
            node = { type: 'Call', target: node, name: name.value, args, line: name.line };
          } else {
            node = { type: 'Property', target: node, name: name.value, line: name.line };
          }
          continue;
        }
        if (this.match('[')) {
          const index = this.parseExpression();
          this.expect(']');
          node = { type: 'Index', target: node, index, line: node.line };
          continue;
        }
        if (this.match('++')) {
          node = { type: 'Postfix', target: node, line: node.line };
          continue;
        }
        break;
      }
      return node;
    }

    parseArguments() {
      const args = [];
      if (!this.at(')')) {
        do {
          args.push(this.parseExpression());
        } while (this.match(','));
      }
      this.expect(')');
      return args;
    }

    parsePrimary() {
      const token = this.peek();
      if (token.type === 'number') {
        this.position += 1;
        return { type: 'Number', value: token.value, line: token.line };
      }
      if (token.type === 'string') {
        this.position += 1;
        return { type: 'String', value: token.value, line: token.line };
      }
      if (token.value === 'true' || token.value === 'false') {
        this.position += 1;
        return { type: 'Boolean', value: token.value === 'true', line: token.line };
      }
      if (token.value === 'null') {
        this.position += 1;
        return { type: 'Null', line: token.line };
      }
      if (this.match('new')) {
        const name = this.parseType();
        const args = this.match('(') ? this.parseArguments() : [];
        return { type: 'New', name, args, line: token.line };
      }
      if (this.match('(')) {
        const inner = this.parseExpression();
        this.expect(')');
        if (this.match('->')) {
          const params = inner.type === 'Var' ? [inner.name] : [];
          return this.finishLambda(params, token.line);
        }
        return inner;
      }
      if (token.type === 'identifier') {
        if (this.isLambdaStart()) {
          const params = [];
          do {
            params.push(this.expectIdentifier().value);
          } while (this.match(','));
          this.expect('->');
          return this.finishLambda(params, token.line);
        }
        this.position += 1;
        return { type: 'Var', name: token.value, line: token.line };
      }
      throw new JavaSyntaxError(`Unexpected token '${token.value || 'end of input'}'`, token.line);
    }

    isLambdaStart() {
      return this.peek().type === 'identifier' && this.atOffset(1, '->');
    }

    finishLambda(params, line) {
      if (this.at('{')) {
        const body = this.parseBlock().body;
        return { type: 'Lambda', params, body, line };
      }
      const expression = this.parseExpression();
      return { type: 'Lambda', params, body: [{ type: 'Return', value: expression, line: expression.line }], line };
    }
  }

  function rubyString(value) {
    return JSON.stringify(String(value))
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029');
  }

  function rubyRegex(value) {
    return String(value).replace(/\//g, '\\/');
  }

  const BY_METHODS = {
    id: 'id',
    name: 'name',
    className: 'class_name',
    class: 'class_name',
    tagName: 'tag_name',
    cssSelector: 'css',
    xpath: 'xpath',
    linkText: 'link_text',
    partialLinkText: 'partial_link_text'
  };

  const METHOD_NAMES = {
    findElement: 'find_element',
    findElements: 'find_elements',
    getText: 'text',
    getAttribute: 'attribute',
    isDisplayed: 'displayed?',
    isEnabled: 'enabled?',
    isSelected: 'selected?',
    sendKeys: 'send_keys',
    getTitle: 'title',
    getCurrentUrl: 'current_url',
    getPageSource: 'page_source',
    selectByVisibleText: 'select_by_visible_text',
    selectByValue: 'select_by_value',
    selectByIndex: 'select_by_index',
    navigate: 'navigate',
    manage: 'manage',
    timeouts: 'timeouts',
    back: 'back',
    forward: 'forward',
    refresh: 'refresh'
  };

  function byLocator(node) {
    if (!node || node.type !== 'Call' || node.name !== 'id' && node.name !== 'name' && node.name !== 'className' && node.name !== 'class' && node.name !== 'tagName' && node.name !== 'cssSelector' && node.name !== 'xpath' && node.name !== 'linkText' && node.name !== 'partialLinkText') return null;
    if (!node.target || node.target.type !== 'Var' || node.target.name !== 'By') return null;
    const strategy = BY_METHODS[node.name];
    if (!strategy || !node.args.length) return null;
    return { strategy, value: node.args[0] };
  }

  class Emitter {
    constructor() {
      this.lines = [];
      this.lineMap = {};
    }

    push(code, line) {
      this.lineMap[this.lines.length + 1] = line || null;
      this.lines.push(code);
    }

    source() {
      return `${this.lines.join('\n')}\n`;
    }
  }

  function emitProgram(statements) {
    const emitter = new Emitter();
    emitStatements(statements, emitter, '');
    return { source: emitter.source(), lineMap: emitter.lineMap };
  }

  function emitStatements(statements, emitter, indent) {
    statements.forEach((statement) => emitStatement(statement, emitter, indent));
  }

  function emitStatement(statement, emitter, indent) {
    if (statement.type === 'Empty') {
      emitter.push('', statement.line);
      return;
    }
    if (statement.type === 'Block') {
      emitStatements(statement.body, emitter, indent);
      return;
    }
    if (statement.type === 'Return') {
      emitter.push(`${indent}return ${statement.value ? emitExpression(statement.value) : 'nil'}`, statement.line);
      return;
    }
    if (statement.type === 'Var') {
      emitter.push(`${indent}${statement.name} = ${emitExpression(statement.value)}`, statement.line);
      return;
    }
    if (statement.type === 'Assign') {
      const operator = statement.operator === '+=' ? '+=' : '=';
      emitter.push(`${indent}${statement.name} ${operator} ${emitExpression(statement.value)}`, statement.line);
      return;
    }
    if (statement.type === 'Expression') {
      const expression = statement.expression;
      if (isImplicitWaitCall(expression)) {
        emitter.push(`${indent}driver.manage.timeouts.implicit_wait = ${emitExpression(expression.args[0].args[0])}`, statement.line);
        return;
      }
      emitter.push(`${indent}${emitExpression(expression)}`, statement.line);
      return;
    }
    if (statement.type === 'ForEach') {
      emitter.push(`${indent}${emitExpression(statement.iterable)}.each do |${statement.name}|`, statement.line);
      emitStatements(statement.body, emitter, `${indent}  `);
      emitter.push(`${indent}end`, statement.line);
      return;
    }
    if (statement.type === 'ForIndex') {
      emitStatement(statement.init, emitter, indent);
      emitter.push(`${indent}while ${emitExpression(statement.condition)}`, statement.line);
      emitStatements(statement.body, emitter, `${indent}  `);
      if (statement.update) emitStatement(statement.update, emitter, `${indent}  `);
      emitter.push(`${indent}end`, statement.line);
      return;
    }
    if (statement.type === 'While') {
      emitter.push(`${indent}while ${emitExpression(statement.condition)}`, statement.line);
      emitStatements(statement.body, emitter, `${indent}  `);
      emitter.push(`${indent}end`, statement.line);
      return;
    }
    if (statement.type === 'If') {
      emitter.push(`${indent}if ${emitExpression(statement.condition)}`, statement.line);
      emitStatements(statement.body, emitter, `${indent}  `);
      if (statement.elseBody.length) {
        emitter.push(`${indent}else`, statement.line);
        emitStatements(statement.elseBody, emitter, `${indent}  `);
      }
      emitter.push(`${indent}end`, statement.line);
      return;
    }
    throw new JavaSyntaxError(`Unsupported statement`, statement.line);
  }

  function isImplicitWaitCall(node) {
    if (!node || node.type !== 'Call' || node.name !== 'implicitlyWait' || !node.args.length) return false;
    const target = node.target;
    if (!target || target.type !== 'Call' || target.name !== 'timeouts') return false;
    const manage = target.target;
    return Boolean(manage && manage.type === 'Call' && manage.name === 'manage');
  }

  function emitExpression(node) {
    if (!node) return 'nil';
    switch (node.type) {
      case 'Number':
        return node.value;
      case 'String':
        return rubyString(node.value);
      case 'Boolean':
        return node.value ? 'true' : 'false';
      case 'Null':
        return 'nil';
      case 'Var':
        return node.name;
      case 'Binary': {
        const operator = node.operator === '==' ? '==' : node.operator;
        return `${emitExpression(node.left)} ${operator} ${emitExpression(node.right)}`;
      }
      case 'Unary':
        return `${node.operator}${emitExpression(node.value)}`;
      case 'Ternary':
        return `${emitExpression(node.condition)} ? ${emitExpression(node.whenTrue)} : ${emitExpression(node.whenFalse)}`;
      case 'Index':
        return `${emitExpression(node.target)}[${emitExpression(node.index)}]`;
      case 'Postfix':
        return `${emitExpression(node.target)} += 1`;
      case 'Property':
        if (isSystemOut(node)) return 'STDOUT';
        return `${emitExpression(node.target)}.${node.name}`;
      case 'New':
        return emitNew(node);
      case 'Call':
        return emitCall(node);
      case 'Lambda':
        return emitLambda(node);
      default:
        throw new JavaSyntaxError(`Unsupported expression: ${node.type}`, node.line);
    }
  }

  function isSystemOut(node) {
    return node.name === 'out' && node.target && node.target.type === 'Var' && node.target.name === 'System';
  }

  function emitNew(node) {
    if (node.name === 'Select') {
      if (!node.args.length) throw new JavaSyntaxError('new Select needs an element', node.line);
      return `Select.new(${emitExpression(node.args[0])})`;
    }
    if (node.name === 'WebDriverWait') {
      const seconds = node.args[1] ? emitExpression(node.args[1]) : '5';
      return `Selenium::WebDriver::Wait.new(timeout: ${seconds})`;
    }
    throw new JavaSyntaxError(`Unsupported constructor: ${node.name}`, node.line);
  }

  function emitCall(node) {
    const target = node.target;
    const args = node.args || [];

    if (target && target.type === 'Var' && target.name === 'Diner') return emitDinerCall(node.name, args, node.line);
    if (target && target.type === 'Var' && target.name === 'By') {
      const locator = byLocator(node);
      if (!locator) throw new JavaSyntaxError(`Unknown By locator: ${node.name}`, node.line);
      return `${rubyString(locator.strategy)}: ${emitExpression(locator.value)}`;
    }
    if (target && target.type === 'Var' && target.name === 'Thread' && node.name === 'sleep') {
      const millis = Number(args[0] && args[0].value);
      const seconds = Number.isFinite(millis) ? millis / 1000 : `(${emitExpression(args[0])}) / 1000.0`;
      return `sleep ${seconds}`;
    }
    if (target && target.type === 'Property' && isSystemOut(target) && node.name === 'println') {
      return `puts ${emitExpression(args[0])}`;
    }
    if (target && target.type === 'Property' && target.target && target.target.type === 'Var' && target.target.name === 'java' && node.name === 'ofSeconds') {
      return emitExpression(args[0]);
    }

    if (node.name === 'findElement' || node.name === 'findElements') {
      const locator = byLocator(args[0]);
      if (!locator) throw new JavaSyntaxError(`${node.name} expects a By locator`, node.line);
      const method = node.name === 'findElement' ? 'find_element' : 'find_elements';
      const prefix = target ? `${emitExpression(target)}.` : '';
      return `${prefix}${method}(${emitLocator(locator)})`;
    }

    if (node.name === 'equals') {
      return `${emitExpression(target)} == ${emitExpression(args[0])}`;
    }

    if (node.name === 'get' && !(target && target.type === 'Var' && target.name === 'driver')) {
      return `${emitExpression(target)}[${emitExpression(args[0])}]`;
    }

    if (node.name === 'group') {
      return `${emitExpression(target)}[${emitExpression(args[0])}]`;
    }

    if (node.name === 'until') {
      const block = args[0];
      if (!block || block.type !== 'Lambda') throw new JavaSyntaxError('until expects a lambda', node.line);
      return `${emitExpression(target)}.until do |${block.params.join(', ')}|\n  ${emitLambdaBody(block, node.line)}\nend`;
    }

    if (node.name === 'size' || node.name === 'length') return `${emitExpression(target)}.length`;
    if (node.name === 'isEmpty') return `${emitExpression(target)}.empty?`;
    if (node.name === 'contains') return `${emitExpression(target)}.include?(${emitExpression(args[0])})`;
    if (node.name === 'replace') return `${emitExpression(target)}.gsub(${args.map(emitExpression).join(', ')})`;
    if (node.name === 'implicitlyWait') return `${emitExpression(target)}.implicit_wait = ${emitExpression(args[0])}`;

    const name = METHOD_NAMES[node.name] || node.name;
    const prefix = target ? `${emitExpression(target)}.` : '';
    const renderedArgs = args.map(emitExpression).join(', ');
    return `${prefix}${name}${args.length ? `(${renderedArgs})` : ''}`;
  }

  function emitStatementsToSource(statements, line) {
    const emitter = new Emitter();
    emitStatements(statements, emitter, '  ');
    return emitter.lines.join('\n');
  }

  function emitLambdaBody(lambda, line) {
    if (lambda.body.length === 1 && lambda.body[0].type === 'Return') {
      return emitExpression(lambda.body[0].value);
    }
    return emitStatementsToSource(lambda.body, line).trim();
  }

  function emitLocator(locator) {
    const value = locator.value.type === 'String' ? rubyString(locator.value.value) : emitExpression(locator.value);
    return `:${locator.strategy}, ${value}`;
  }

  function emitLambda(node) {
    throw new JavaSyntaxError('Lambdas are only supported as arguments', node.line);
  }

  function emitDinerCall(name, args, line) {
    const first = args[0];
    const firstCode = emitExpression(first);
    if (name === 'first') return `${firstCode}.first`;
    if (name === 'last') return `${firstCode}.last`;
    if (name === 'toInt') return `(${firstCode}).to_i`;
    if (name === 'sum') return `${firstCode}.sum`;
    if (name === 'unique') return `${firstCode}.uniq`;
    if (name === 'str') return `(${firstCode}).to_s`;
    if (name === 'countWords') return `${firstCode}.scan(/\\w+/).length`;
    if (name === 'texts') return `${firstCode}.map { |el| el.text }`;
    if (name === 'match' || name === 'countMatches') {
      const pattern = args[1] && args[1].type === 'String' ? rubyRegex(args[1].value) : '';
      if (name === 'match') return `${firstCode}.match(/${pattern}/)`;
      return `${firstCode}.scan(/${pattern}/).length`;
    }
    if (name === 'toInts') {
      const removal = args[1] ? emitExpression(args[1]) : '""';
      return `${firstCode}.map { |s| s.delete(${removal}).to_i }`;
    }
    if (['map', 'filter', 'reject', 'find'].includes(name)) {
      const lambda = args[1];
      if (!lambda || lambda.type !== 'Lambda') throw new JavaSyntaxError(`Diner.${name} expects a lambda`, line);
      const rubyMethod = { map: 'map', filter: 'select', reject: 'reject', find: 'find' }[name];
      const param = lambda.params[0] || 'el';
      return `${firstCode}.${rubyMethod} { |${param}| ${emitLambdaBody(lambda, line)} }`;
    }
    throw new JavaSyntaxError(`Unknown Diner helper: ${name}`, line);
  }

  function normalizeError(err, lineMap) {
    const line = lineMap[err.line] || err.line || null;
    const names = {
      NoSuchElementError: 'NoSuchElementException',
      TimeoutError: 'TimeoutException',
      StaleElementReferenceError: 'StaleElementReferenceException',
      RubyError: 'JavaError'
    };
    const error = new JavaError(err.message || String(err), line);
    error.name = names[err.name] || err.name || 'JavaError';
    return error;
  }

  function compile(source) {
    const statements = new Parser(tokenize(source)).parseProgram();
    return emitProgram(statements);
  }

  function run(source, options) {
    const compiled = compile(source);
    try {
      return Ruby.run(compiled.source, options || {});
    } catch (err) {
      throw normalizeError(err, compiled.lineMap);
    }
  }

  function inspect(value) {
    if (value instanceof Ruby.Element) {
      const key = value.node && value.node.getAttribute ? value.node.getAttribute('data-key') : null;
      return key ? `WebElement[data-key=${key}]` : 'WebElement';
    }
    if (Array.isArray(value)) return `[${value.map(inspect).join(', ')}]`;
    if (value === null || value === undefined) return 'null';
    if (typeof value === 'string') return JSON.stringify(value);
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    try {
      return Ruby.inspect(value);
    } catch (err) {
      return String(value);
    }
  }

  function starterFor(level) {
    const kinds = Array.isArray(level.verify) ? level.verify.map((spec) => spec.kind) : [level.verify && level.verify.kind];
    if (kinds.includes('output')) return '// Print the requested lines\n';
    if (kinds.includes('state')) return '// Perform the requested action\n';
    if (kinds.includes('select')) return '// Return the target element or elements\n';
    return '// Return the requested value\n';
  }

  function javaString(value) {
    return String(value === undefined || value === null ? '' : value)
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\r/g, '\\r')
      .replace(/\n/g, '\\n');
  }

  function fullSource(source, options) {
    const opts = options || {};
    const id = Math.max(1, Number(opts.levelId) || 1);
    const className = `Level${String(id).padStart(3, '0')}`;
    const url = javaString(opts.url || 'https://diners.example/');
    const body = String(source === undefined || source === null ? '' : source).replace(/\s+$/, '');
    const bodyLines = body ? body.split('\n') : [];
    const hasTrailingReturn = /(?:^|\n)\s*return\b[^;]*;\s*$/.test(body);
    const lines = [
      'import org.openqa.selenium.By;',
      'import org.openqa.selenium.WebDriver;',
      'import org.openqa.selenium.WebElement;',
      'import org.openqa.selenium.chrome.ChromeDriver;',
      'import org.openqa.selenium.support.ui.Select;',
      'import org.openqa.selenium.support.ui.WebDriverWait;',
      'import java.util.List;',
      'import java.util.regex.Matcher;',
      '',
      `public class ${className} {`,
      '    public static void main(String[] args) throws Exception {',
      '        WebDriver driver = new ChromeDriver();',
      `        driver.get("${url}");`,
      '        try {',
      '            Object result = solve(driver);',
      '            System.out.println(result);',
      '        } finally {',
      '            driver.quit();',
      '        }',
      '    }',
      '',
      '    private static Object solve(WebDriver driver) throws Exception {'
    ];
    bodyLines.forEach((line) => {
      lines.push(line ? `        ${line}` : '');
    });
    if (!hasTrailingReturn) lines.push('        return null;');
    lines.push('    }', '}');
    return lines.join('\n');
  }

  function buildLevels(levels, chapterIndices, content) {
    const chapters = new Set(chapterIndices || []);
    const saved = content || {};
    return levels
      .filter((level) => chapters.has(level.chapterIndex))
      .map((level) => {
        const java = saved[String(level.id)] || {};
        return Object.assign({}, level, {
          starter: java.starter === undefined ? starterFor(level) : java.starter,
          task: java.task === undefined ? level.task : java.task,
          hint: java.hint === undefined ? level.hint : java.hint,
          reference: java.reference === undefined ? '' : java.reference,
          solution: java.solution === undefined ? '' : java.solution,
          key: `java:${level.key}`
        });
      });
  }

  const api = {
    run,
    compile,
    inspect,
    fullSource,
    buildLevels,
    Browser: Ruby.Browser,
    Element: Ruby.Element,
    Select: Ruby.Select,
    RubyError: JavaError,
    NoSuchElementError: JavaError,
    TimeoutError: JavaError,
    StaleElementReferenceError: JavaError
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.SeleniumJava = api;
})(typeof window !== 'undefined' ? window : globalThis);
