/*
 * Level verification for Selenium Ruby Diner.
 * A level's `verify` can be a single spec, an array of specs, or a function.
 */
(function (global) {
  'use strict';

  function isElement(value, Ruby) {
    return Boolean(value && Ruby && value instanceof Ruby.Element);
  }

  function keyOf(element) {
    return element.getAttribute ? element.getAttribute('data-key') : null;
  }

  function labelFor(browser, key) {
    if (!key) return '(element without data-key)';
    const node = browser.container.querySelector(`[data-key="${String(key).replace(/"/g, '\\"')}"]`);
    if (!node) return key;
    return node.getAttribute('data-label') || node.textContent.trim() || key;
  }

  function keysOf(result, Ruby) {
    if (Array.isArray(result)) {
      return result.map((item) => (isElement(item, Ruby) ? keyOf(item) : null));
    }
    if (isElement(result, Ruby)) return [keyOf(result)];
    return null;
  }

  function sameKeys(expected, actual) {
    if (expected.length !== actual.length) return false;
    const left = expected.slice().sort();
    const right = actual.slice().sort();
    return left.every((value, index) => value === right[index]);
  }

  function deepEqual(a, b) {
    if (a === b) return true;
    if (a === null || b === null || a === undefined || b === undefined) return a === b;
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((item, index) => deepEqual(item, b[index]));
    }
    if (typeof a === 'object' && typeof b === 'object') {
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);
      if (aKeys.length !== bKeys.length) return false;
      return aKeys.every((key) => deepEqual(a[key], b[key]));
    }
    return false;
  }

  function stable(value) {
    if (typeof value === 'string') return JSON.stringify(value);
    if (Array.isArray(value)) return `[${value.map(stable).join(', ')}]`;
    if (value && typeof value === 'object') {
      if (value.node) return `#<Element ${keyOf(value)}>`;
      return JSON.stringify(value);
    }
    if (value === null || value === undefined) return 'nil';
    return String(value);
  }

  function resolveNode(browser, spec) {
    if (!spec) return null;
    if (spec.key) return browser.container.querySelector(`[data-key="${String(spec.key).replace(/"/g, '\\"')}"]`);
    if (spec.selector) return browser.container.querySelector(spec.selector);
    return null;
  }

  function checkState(browser, spec, stdout) {
    const failures = [];
    const checks = [];

    if (spec.cart !== undefined) checks.push(['cart', browser.cart, spec.cart]);
    if (spec.submitted !== undefined) checks.push(['submitted', browser.submitted, spec.submitted]);
    if (spec.url !== undefined) checks.push(['current URL', browser.currentUrl, spec.url]);
    if (spec.title !== undefined) checks.push(['page title', browser.currentTitle, spec.title]);
    if (spec.implicitWait !== undefined) checks.push(['implicit wait', browser.implicitWait, spec.implicitWait]);
    if (spec.signedIn !== undefined) checks.push(['signed in', browser.signedIn, spec.signedIn]);
    if (spec.sessionId !== undefined) checks.push(['session id', browser.sessionId, spec.sessionId]);
    if (spec.screenshotPath !== undefined) checks.push(['screenshot path', browser.screenshotPath, spec.screenshotPath]);
    if (spec.download !== undefined) checks.push(['download', browser.download, spec.download]);
    if (spec.uploadedFile !== undefined) checks.push(['uploaded file', browser.uploadedFile, spec.uploadedFile]);
    if (spec.alertAction !== undefined) checks.push(['alert action', browser.alertAction, spec.alertAction]);
    if (spec.windowCount !== undefined) checks.push(['window count', browser.windows.length, spec.windowCount]);
    if (spec.frameDepth !== undefined) checks.push(['frame depth', (browser.frameStack || []).length, spec.frameDepth]);
    if (spec.driverType !== undefined) checks.push(['driver type', browser.driverType, spec.driverType]);
    if (spec.headless !== undefined) checks.push(['headless', browser.headless, spec.headless]);
    if (spec.clock !== undefined) checks.push(['clock', browser.clock, spec.clock]);
    if (spec.quitFlag !== undefined) checks.push(['quit flag', browser.quitFlag, spec.quitFlag]);
    if (spec.file !== undefined) {
      const name = typeof spec.file === 'string' ? spec.file : spec.file.name;
      const exists = Object.prototype.hasOwnProperty.call(browser.files || {}, name);
      checks.push([`file ${name} exists`, exists, spec.file.exists === undefined ? true : spec.file.exists]);
      if (exists && spec.file.contains !== undefined) {
        const ok = String(browser.files[name]).includes(String(spec.file.contains));
        if (!ok) failures.push(`file ${name} should include ${stable(spec.file.contains)}`);
      }
    }
    if (spec.output !== undefined) {
      checks.push(['output', String(stdout || '').replace(/\n+$/, ''), Array.isArray(spec.output) ? spec.output.join('\n') : spec.output]);
    }
    if (spec.outputIncludes !== undefined) {
      const ok = String(stdout || '').includes(spec.outputIncludes);
      if (!ok) failures.push(`output should include ${stable(spec.outputIncludes)}`);
    }

    if (spec.value || spec.checked || spec.displayed || spec.text || spec.attribute || spec.classContains) {
      const node = resolveNode(browser, spec.value || spec.checked || spec.displayed || spec.text || spec.attribute || spec.classContains);
      if (!node) {
        failures.push(`could not find element ${stable(spec.value || spec.checked || spec.displayed || spec.text || spec.attribute || spec.classContains)}`);
      } else {
        if (spec.value) {
          const actual = 'value' in node ? node.value : node.getAttribute('value');
          checks.push(['value', actual, spec.value.equals]);
        }
        if (spec.checked) checks.push(['checked', Boolean(node.checked), spec.checked.equals]);
        if (spec.displayed) checks.push(['displayed', !node.hasAttribute('hidden'), spec.displayed.equals]);
        if (spec.text) checks.push(['text', node.textContent.replace(/\s+/g, ' ').trim(), spec.text.equals]);
        if (spec.attribute) checks.push([`attribute ${spec.attribute.name}`, node.getAttribute(spec.attribute.name), spec.attribute.equals]);
        if (spec.classContains) {
          const ok = (node.getAttribute('class') || '').split(/\s+/).includes(spec.classContains.value);
          if (!ok) failures.push(`element should have class ${stable(spec.classContains.value)}`);
        }
      }
    }

    if (spec.selected) {
      const node = resolveNode(browser, spec.selected);
      if (!node) {
        failures.push(`could not find select ${stable(spec.selected)}`);
      } else {
        const selected = node.options ? node.options[node.selectedIndex] : null;
        if (!selected) {
          failures.push('no option is selected');
        } else {
          if (spec.selected.value !== undefined) checks.push(['selected value', selected.value, spec.selected.value]);
          if (spec.selected.visibleText !== undefined) checks.push(['selected text', selected.textContent.trim(), spec.selected.visibleText]);
          if (spec.selected.index !== undefined) checks.push(['selected index', node.selectedIndex, spec.selected.index]);
        }
      }
    }

    if (spec.count) {
      const nodes = browser.container.querySelectorAll(spec.count.selector);
      checks.push(['element count', nodes.length, spec.count.equals]);
    }

    checks.forEach(([name, actual, expected]) => {
      if (!deepEqual(actual, expected)) {
        failures.push(`${name}: expected ${stable(expected)}, got ${stable(actual)}`);
      }
    });

    if (failures.length) return { ok: false, message: failures.join('; ') };
    return { ok: true, message: '' };
  }

  function verifySpec(level, spec, result, browser, stdout, Ruby) {
    if (!spec) return { ok: true, message: '' };

    if (spec.kind === 'select') {
      const mode = spec.mode || 'elements';
      const expected = spec.ids || [];
      const actual = keysOf(result, Ruby);

      if (actual === null) {
        return {
          ok: false,
          message: `Expected ${mode === 'element' ? 'a single element' : 'elements'}, but the expression returned ${stable(result)}.`
        };
      }
      if (mode === 'element') {
        if (Array.isArray(result)) return { ok: false, message: 'Expected find_element (a single Element), but got an Array.' };
        if (!(isElement(result, Ruby))) return { ok: false, message: 'Expected a Selenium Element, but got something else.' };
      }
      if (mode === 'elements' && !Array.isArray(result)) {
        return { ok: false, message: 'Expected find_elements (an Array), but got a single Element.' };
      }
      if (mode === 'any' && Array.isArray(result) && result.length !== 1) {
        return { ok: false, message: `Expected one element, but got ${result.length}.` };
      }
      if (!sameKeys(expected, actual)) {
        const expectedLabels = expected.map((key) => labelFor(browser, key));
        const actualLabels = actual.map((key) => labelFor(browser, key));
        return {
          ok: false,
          message: `Expected ${expected.length} element(s): ${expectedLabels.join(', ')}. Got: ${actualLabels.length ? actualLabels.join(', ') : 'nothing'}.`
        };
      }
      return { ok: true, message: '' };
    }

    if (spec.kind === 'value') {
      if (!deepEqual(result, spec.expected)) {
        return {
          ok: false,
          message: `Expected ${stable(spec.expected)}, but the expression returned ${stable(result)}.`
        };
      }
      return { ok: true, message: '' };
    }

    if (spec.kind === 'output') {
      const actual = String(stdout || '').replace(/\n+$/, '');
      const expected = Array.isArray(spec.expected) ? spec.expected.join('\n') : String(spec.expected);
      if (actual !== expected) {
        return {
          ok: false,
          message: `Expected output:\n${expected}\n\nGot output:\n${actual || '(nothing)'}`
        };
      }
      return { ok: true, message: '' };
    }

    if (spec.kind === 'state') return checkState(browser, spec.state || {}, stdout);
    if (spec.kind === 'truthy') {
      return result ? { ok: true, message: '' } : { ok: false, message: `Expected a truthy result, got ${stable(result)}.` };
    }
    if (spec.kind === 'nil') {
      return (result === null || result === undefined) ? { ok: true, message: '' } : { ok: false, message: `Expected nil, got ${stable(result)}.` };
    }
    if (spec.kind === 'includes') {
      const actual = Array.isArray(result) ? result.map(String) : String(result);
      if (Array.isArray(actual)) {
        return actual.includes(String(spec.value))
          ? { ok: true, message: '' }
          : { ok: false, message: `Expected the result to include ${stable(spec.value)}.` };
      }
      return actual.includes(String(spec.value))
        ? { ok: true, message: '' }
        : { ok: false, message: `Expected the result to include ${stable(spec.value)}.` };
    }

    return { ok: false, message: `Unknown verification kind: ${spec.kind}` };
  }

  function strategyOfElement(value, Ruby) {
    if (isElement(value, Ruby)) return value.locatorStrategy || null;
    if (Array.isArray(value) && value.length > 0 && value.every((item) => isElement(item, Ruby))) {
      const strategy = value[0].locatorStrategy || null;
      return value.every((item) => item.locatorStrategy === strategy) ? strategy : null;
    }
    return null;
  }

  function actualStrategy(result, browser, Ruby) {
    const fromResult = strategyOfElement(result, Ruby);
    if (fromResult) return fromResult;
    if (browser && browser.lastLocator) return browser.lastLocator.strategy || null;
    return null;
  }

  function verifyStrategy(level, result, browser, Ruby) {
    const required = level.requiredStrategy;
    if (!required) return { ok: true, message: '' };
    const actual = actualStrategy(result, browser, Ruby);
    if (actual === required) return { ok: true, message: '' };
    if (!actual) {
      return {
        ok: false,
        message: `This level asks for a :${required} locator, but your script did not use one.`
      };
    }
    return {
      ok: false,
      message: `This level asks for a :${required} locator. Your script used :${actual} instead.`
    };
  }

  function verifyLevel(level, result, browser, stdout, Ruby) {
    if (typeof level.verify === 'function') {
      const outcome = level.verify(result, browser, stdout);
      if (outcome && !outcome.ok) return outcome;
    } else {
      const specs = Array.isArray(level.verify) ? level.verify : [level.verify];
      for (const spec of specs) {
        const outcome = verifySpec(level, spec, result, browser, stdout, Ruby);
        if (!outcome.ok) return outcome;
      }
    }
    return verifyStrategy(level, result, browser, Ruby);
  }

  const api = { verifyLevel, keyOf, labelFor };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.SeleniumDinerVerify = api;
})(typeof window !== 'undefined' ? window : globalThis);
