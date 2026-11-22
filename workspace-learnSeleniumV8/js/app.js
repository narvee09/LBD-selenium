(function () {
  'use strict';

  const API = window.SeleniumDinerLevels;
  const Ruby = window.SeleniumRuby;
  const Java = window.SeleniumJava;
  const JavaLevels = window.SeleniumJavaLevels;
  const Verify = window.SeleniumDinerVerify;

  if (!API || !Ruby || !Java || !JavaLevels || !Verify) {
    throw new Error('Selenium Diner failed to load its scripts.');
  }

  const CHAPTERS = API.CHAPTERS;
  const CHAPTER_BLURBS = API.CHAPTER_BLURBS;
  const PARTS = API.PARTS;
  const RUBY_LEVELS = API.LEVELS;
  const JAVA_LEVELS = Java.buildLevels(RUBY_LEVELS, PARTS[0].chapters, JavaLevels.CONTENT);

  const RUBY_STORAGE_KEY = 'selenium-ruby-diner:v2';
  const LEGACY_STORAGE_KEY = 'selenium-ruby-diner:v1';
  const JAVA_STORAGE_KEY = 'selenium-java-diner:v1';
  const LANGUAGE_STORAGE_KEY = 'selenium-diner:language:v1';

  const LANGUAGES = {
    ruby: {
      id: 'ruby',
      mark: 'SR',
      label: 'Ruby',
      kicker: 'Selenium WebDriver · Ruby',
      title: 'Selenium Ruby Diner',
      editorHeading: 'Ruby script',
      blurb: 'All 1000 levels',
      levels: RUBY_LEVELS,
      parts: PARTS,
      runner: Ruby,
      storageKey: RUBY_STORAGE_KEY,
      cheatSheet: [
        'driver.find_element(:css, ".plate")',
        'driver.find_elements(id: "coffee")',
        'driver.find_element(:xpath, "//div[@id=\'coffee\']")',
        'element.text',
        'element.attribute("data-price")',
        'element.click',
        'element.send_keys("Ada")',
        'Select.new(element).select_by(:value, "large")',
        'wait = Selenium::WebDriver::Wait.new(timeout: 3)'
      ]
    },
    java: {
      id: 'java',
      mark: 'SJ',
      label: 'Java',
      kicker: 'Selenium WebDriver · Java',
      title: 'Selenium Java Diner',
      editorHeading: 'Java code',
      blurb: 'Part 1 · Foundations',
      levels: JAVA_LEVELS,
      parts: [PARTS[0]],
      runner: Java,
      storageKey: JAVA_STORAGE_KEY,
      cheatSheet: [
        'driver.findElement(By.cssSelector(".plate"));',
        'driver.findElements(By.id("coffee"));',
        'driver.findElement(By.xpath("//div[@id=\'coffee\']"));',
        'element.getText();',
        'element.getAttribute("data-price");',
        'element.click();',
        'element.sendKeys("Ada");',
        'new Select(element).selectByValue("large");',
        'WebDriverWait wait = new WebDriverWait(driver, 3);',
        'Diner.texts(driver.findElements(By.cssSelector(".food")));'
      ]
    }
  };

  const LANGUAGE_ORDER = Object.keys(LANGUAGES);
  const LEVEL_MAPS = {
    ruby: new Map(RUBY_LEVELS.map((level) => [level.key, level])),
    java: new Map(JAVA_LEVELS.map((level) => [level.key, level]))
  };
  const LEGACY_IDS_BY_LEVEL = API.LEVELS_BY_LEGACY_ID || {};
  const stateByLanguage = {
    ruby: { completed: new Set(), drafts: {} },
    java: { completed: new Set(), drafts: {} }
  };

  const els = {
    languagePicker: document.getElementById('language-picker'),
    languageToggle: document.getElementById('language-toggle'),
    languageMenu: document.getElementById('language-menu'),
    brandKicker: document.getElementById('brand-kicker'),
    brandTitle: document.getElementById('brand-title'),
    topCompleted: document.getElementById('top-completed'),
    topTotal: document.getElementById('top-total'),
    sidebar: document.getElementById('sidebar'),
    sidebarOpen: document.getElementById('sidebar-open'),
    sidebarClose: document.getElementById('sidebar-close'),
    chapterNav: document.getElementById('chapter-nav'),
    overallLabel: document.getElementById('overall-progress-label'),
    overallBar: document.getElementById('overall-progress-bar'),
    overallFill: document.getElementById('overall-progress-fill'),
    resetProgress: document.getElementById('reset-progress'),
    chapterLabel: document.getElementById('chapter-label'),
    levelTitle: document.getElementById('level-title'),
    levelTask: document.getElementById('level-task'),
    levelCounter: document.getElementById('level-counter'),
    completionPill: document.getElementById('completion-pill'),
    hintContent: document.getElementById('hint-content'),
    referenceContent: document.getElementById('reference-content'),
    cheatSheet: document.getElementById('cheat-sheet'),
    editorHeading: document.getElementById('editor-heading'),
    editor: document.getElementById('editor'),
    lineNumbers: document.getElementById('line-numbers'),
    resetCode: document.getElementById('reset-code'),
    runCode: document.getElementById('run-code'),
    feedback: document.getElementById('feedback'),
    sceneRoot: document.getElementById('scene-root'),
    resetScene: document.getElementById('reset-scene'),
    browserUrl: document.getElementById('browser-url'),
    browserTitle: document.getElementById('browser-title'),
    inspector: document.getElementById('inspector'),
    inspectorLabel: document.getElementById('inspector-label'),
    inspectorCode: document.getElementById('inspector-code'),
    consoleOutput: document.getElementById('console-output'),
    consoleStatus: document.getElementById('console-status'),
    javaRealismToggle: document.getElementById('java-realism-toggle'),
    resultLine: document.getElementById('result-line')
  };

  let languageId = 'ruby';
  let language = LANGUAGES.ruby;
  let levels = RUBY_LEVELS;
  let parts = PARTS;
  let runner = Ruby;
  let total = levels.length;
  let completed = stateByLanguage.ruby.completed;
  let drafts = stateByLanguage.ruby.drafts;
  let currentLevel = null;
  let browser = null;
  let displayNode = null;
  let pinnedNode = null;
  let draftTimer = null;
  let liveTimer = null;
  let liveRoot = null;
  let liveNodes = [];
  let realismEnabled = false;
  let lastConsole = {
    status: 'waiting',
    text: 'Run a script to see output and the return value.',
    isError: false
  };
  let lastResult = null;

  function legacyLevel(id) {
    const level = LEGACY_IDS_BY_LEVEL[String(id)];
    return level || null;
  }

  function persistState(id) {
    const state = stateByLanguage[id];
    try {
      window.localStorage.setItem(LANGUAGES[id].storageKey, JSON.stringify({
        completed: Array.from(state.completed).sort(),
        drafts: state.drafts
      }));
    } catch (err) {
      return undefined;
    }
  }

  function persist() {
    persistState(languageId);
  }

  function loadState(id) {
    const state = stateByLanguage[id];
    const byKey = LEVEL_MAPS[id];
    state.completed = new Set();
    state.drafts = {};

    try {
      const raw = window.localStorage.getItem(LANGUAGES[id].storageKey);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved && typeof saved === 'object') {
          if (Array.isArray(saved.completed)) {
            saved.completed.forEach((key) => {
              if (byKey.has(key)) state.completed.add(key);
            });
          }
          if (saved.drafts && typeof saved.drafts === 'object') {
            Object.keys(saved.drafts).forEach((key) => {
              if (byKey.has(key) && typeof saved.drafts[key] === 'string') state.drafts[key] = saved.drafts[key];
            });
          }
          persistState(id);
          return false;
        }
      }
    } catch (err) {
      state.completed = new Set();
      state.drafts = {};
    }

    if (id !== 'ruby') return false;

    try {
      const raw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
      if (!raw) return false;
      const saved = JSON.parse(raw);
      if (!saved || typeof saved !== 'object') return false;
      if (Array.isArray(saved.completed)) {
        saved.completed.forEach((key) => {
          const level = legacyLevel(key);
          if (level) state.completed.add(level.key);
        });
      }
      if (saved.drafts && typeof saved.drafts === 'object') {
        Object.keys(saved.drafts).forEach((key) => {
          const level = legacyLevel(key);
          if (level && typeof saved.drafts[key] === 'string') state.drafts[level.key] = saved.drafts[key];
        });
      }
      persistState(id);
      return true;
    } catch (err) {
      state.completed = new Set();
      state.drafts = {};
      return false;
    }
  }

  function loadLanguageChoice() {
    try {
      const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (LANGUAGES[saved]) return saved;
    } catch (err) {
      return 'ruby';
    }
    return 'ruby';
  }

  function setLanguageData(id) {
    languageId = id;
    language = LANGUAGES[id];
    levels = language.levels;
    parts = language.parts;
    runner = language.runner;
    total = levels.length;
    completed = stateByLanguage[id].completed;
    drafts = stateByLanguage[id].drafts;
  }

  function levelFromHash(useLegacyIds) {
    const match = /^#level-(\d+)$/.exec(window.location.hash || '');
    if (!match) return null;
    const id = Number(match[1]);
    if (useLegacyIds && languageId === 'ruby') {
      const level = legacyLevel(id);
      return level ? level.id : null;
    }
    return id >= 1 && id <= total ? id : null;
  }

  function setHash(id) {
    const hash = `#level-${id}`;
    if (window.location.hash === hash) return;
    try {
      window.history.replaceState(null, '', hash);
    } catch (err) {
      window.location.hash = hash;
    }
  }

  function draftFor(level) {
    const saved = drafts[level.key];
    return typeof saved === 'string' ? saved : level.starter;
  }

  function storeDraft() {
    if (!currentLevel) return;
    const key = currentLevel.key;
    if (els.editor.value === currentLevel.starter) {
      delete drafts[key];
    } else {
      drafts[key] = els.editor.value;
    }
    persist();
  }

  function updateLineNumbers() {
    const lines = els.editor.value.split('\n').length;
    const numbers = [];
    for (let i = 1; i <= lines; i += 1) numbers.push(i);
    els.lineNumbers.textContent = numbers.join('\n');
    els.lineNumbers.scrollTop = els.editor.scrollTop;
  }

  function setFeedback(kind, title, message, nextLabel) {
    els.feedback.className = 'feedback';
    if (kind) els.feedback.classList.add(`is-${kind}`);
    els.feedback.replaceChildren();

    const copy = document.createElement('div');
    copy.className = 'feedback-copy';
    const heading = document.createElement('strong');
    heading.textContent = title;
    const body = document.createElement('span');
    body.textContent = message || '';
    copy.append(heading);
    if (message) copy.append(body);
    els.feedback.append(copy);

    if (nextLabel) {
      const next = document.createElement('button');
      next.type = 'button';
      next.className = 'btn primary';
      next.textContent = nextLabel;
      next.addEventListener('click', () => {
        if (currentLevel.id < total) {
          selectLevel(currentLevel.id + 1);
        } else {
          selectLevel(1);
        }
      });
      els.feedback.append(next);
    }
  }

  function setConsole(status, text, isError) {
    if (status !== 'source') {
      lastConsole = { status, text, isError: Boolean(isError) };
    }
    els.consoleStatus.textContent = status;
    els.consoleStatus.className = 'console-status';
    if (status === 'success') els.consoleStatus.classList.add('success');
    if (status === 'error') els.consoleStatus.classList.add('error');
    if (status === 'source') els.consoleStatus.classList.add('source');
    els.consoleOutput.textContent = text;
    els.consoleOutput.classList.toggle('is-error', Boolean(isError));
    els.consoleOutput.classList.toggle('is-source', status === 'source');
  }

  function showResult(result) {
    lastResult = result;
    els.resultLine.replaceChildren();
    const label = document.createElement('strong');
    label.textContent = 'Return value: ';
    const value = document.createElement('span');
    let rendered;
    try {
      rendered = runner.inspect(result);
    } catch (err) {
      rendered = String(result);
    }
    value.textContent = rendered;
    els.resultLine.append(label, value);
  }

  function showError(err) {
    lastResult = null;
    const name = err && err.name ? err.name : 'Error';
    const line = err && err.line ? ` (line ${err.line})` : '';
    const message = err && err.message ? err.message : String(err);
    setFeedback('error', `${name}${line}`, message);
    setConsole('error', `${name}${line}: ${message}`, true);
    els.resultLine.replaceChildren();
    refreshBrowserChrome();
    renderRealismView();
  }

  function renderRealismToggle() {
    const active = realismEnabled && language.id === 'java';
    els.javaRealismToggle.hidden = language.id !== 'java';
    els.javaRealismToggle.setAttribute('aria-pressed', String(active));
    els.javaRealismToggle.textContent = active ? 'Full Java: on' : 'Full Java';
  }

  function renderRealismView() {
    if (!realismEnabled || language.id !== 'java' || !currentLevel) return;
    const source = Java.fullSource(els.editor.value, {
      levelId: currentLevel.id,
      url: browser && browser.currentUrl
    });
    setConsole('source', source, false);
    els.resultLine.replaceChildren();
    const note = document.createElement('span');
    note.className = 'source-note';
    note.textContent = 'Illustrative wrapper · the runner still executes the snippet body.';
    els.resultLine.append(note);
  }

  function restoreConsole() {
    setConsole(lastConsole.status, lastConsole.text, lastConsole.isError);
    els.resultLine.replaceChildren();
    if (lastResult !== null) showResult(lastResult);
  }

  function toggleRealism() {
    realismEnabled = !realismEnabled;
    renderRealismToggle();
    if (realismEnabled) renderRealismView();
    else restoreConsole();
  }

  function browserOptions(level) {
    const options = {};
    if (level.routes) options.routes = level.routes;
    if (level.startUrl) {
      options.startUrl = level.startUrl;
    } else if (level.scene && !level.routes) {
      options.startUrl = level.scene.url;
    }
    if (level.scene) options.scene = level.scene;
    if (level.api) options.api = level.api;
    if (level.env) options.env = level.env;
    if (level.files) options.files = level.files;
    return options;
  }

  function createBrowser(level) {
    clearTimeout(liveTimer);
    clearLiveMatches();
    browser = new runner.Browser(document, els.sceneRoot, browserOptions(level));
    clearInspector();
    refreshBrowserChrome();
    return browser;
  }

  function refreshBrowserChrome() {
    els.browserUrl.textContent = browser && browser.currentUrl ? browser.currentUrl : 'https://diners.example/';
    els.browserTitle.textContent = browser && browser.currentTitle ? browser.currentTitle : 'Diner';
  }

  function clearInspector() {
    pinnedNode = null;
    setInspector(null, false);
  }

  function ensureLiveRoot() {
    if (liveRoot) return liveRoot;
    liveRoot = document.createElement('div');
    liveRoot.id = 'live-eval-root';
    liveRoot.setAttribute('aria-hidden', 'true');
    liveRoot.style.cssText = 'position:absolute;left:-10000px;top:0;width:1px;height:1px;overflow:hidden;pointer-events:none;';
    document.body.appendChild(liveRoot);
    return liveRoot;
  }

  function clearLiveMatches() {
    liveNodes.forEach((node) => node.classList.remove('live-match'));
    liveNodes = [];
  }

  function liveKeysFromResult(value) {
    if (value && value.node && value.node.nodeType === 1) {
      const key = value.node.getAttribute('data-key');
      return key ? [key] : [];
    }
    if (Array.isArray(value) && value.length && value.every((item) => item && item.node)) {
      return value.map((item) => item.node.getAttribute('data-key')).filter(Boolean);
    }
    return null;
  }

  function highlightLiveKeys(keys) {
    clearLiveMatches();
    if (!keys || !keys.length) return;
    const wanted = new Set(keys.map(String));
    els.sceneRoot.querySelectorAll('[data-key]').forEach((node) => {
      if (!wanted.has(node.getAttribute('data-key'))) return;
      node.classList.add('live-match');
      liveNodes.push(node);
    });
  }

  function previewLiveTarget() {
    if (!currentLevel) return;
    const code = els.editor.value;
    if (!code.trim()) {
      clearLiveMatches();
      return;
    }

    try {
      const previewBrowser = new runner.Browser(document, ensureLiveRoot(), browserOptions(currentLevel));
      const result = runner.run(code, { browser: previewBrowser });
      let keys = liveKeysFromResult(result.value);
      if (!keys) {
        for (let index = previewBrowser.locatorLog.length - 1; index >= 0; index -= 1) {
          const entry = previewBrowser.locatorLog[index];
          if (entry.keys.length) {
            keys = entry.keys;
            break;
          }
        }
      }
      highlightLiveKeys(keys || []);
    } catch (err) {
      clearLiveMatches();
    }
  }

  function scheduleLivePreview() {
    clearTimeout(liveTimer);
    liveTimer = window.setTimeout(previewLiveTarget, 180);
  }

  function targetFor(node) {
    if (!node || !node.closest) return null;
    const target = node.closest('[data-key]');
    return target && els.sceneRoot.contains(target) ? target : null;
  }

  function describeNode(node) {
    const tag = node.tagName.toLowerCase();
    const attributes = Array.prototype.map.call(node.attributes, (attribute) => {
      let value = attribute.value;
      if (attribute.name === 'class') {
        value = value.split(/\s+/)
          .filter((name) => name && name !== 'inspect-target' && name !== 'live-match')
          .join(' ');
      }
      return ` ${attribute.name}="${value.replace(/"/g, '&quot;')}"`;
    }).join('');
    const text = node.textContent.replace(/\s+/g, ' ').trim();
    return `<${tag}${attributes}>${text}</${tag}>`;
  }

  function setInspector(node, pinned) {
    if (displayNode && displayNode !== node) displayNode.classList.remove('inspect-target');
    displayNode = node;
    els.inspectorLabel.classList.toggle('pinned', Boolean(pinned));
    els.inspector.classList.toggle('has-target', Boolean(node));

    if (!node) {
      els.inspectorLabel.textContent = 'Inspector';
      els.inspectorCode.textContent = 'Hover over the page to inspect markup. Click to pin it.';
      return;
    }

    node.classList.add('inspect-target');
    els.inspectorLabel.textContent = pinned ? 'Pinned' : 'Inspector';
    els.inspectorCode.textContent = describeNode(node);
  }

  function inspectAt(node) {
    if (pinnedNode) return;
    const target = targetFor(node);
    if (target === displayNode) return;
    setInspector(target, false);
  }

  function pinAt(node) {
    const target = targetFor(node);
    if (!target) return;
    pinnedNode = target;
    setInspector(target, true);
  }

  function updateProgressUI() {
    const count = completed.size;
    const percent = Math.round((count / total) * 100);
    els.topCompleted.textContent = String(count);
    els.topTotal.textContent = String(total);
    els.overallLabel.textContent = `${percent}%`;
    els.overallFill.style.width = `${percent}%`;
    els.overallBar.setAttribute('aria-valuenow', String(percent));
  }

  function updateCompletionPill() {
    const done = completed.has(currentLevel.key);
    els.completionPill.textContent = done ? 'Completed' : 'In progress';
    els.completionPill.classList.toggle('complete', done);
  }

  function renderSidebar() {
    const openParts = new Set();
    const openChapters = new Set();
    els.chapterNav.querySelectorAll('details[data-part]').forEach((node) => {
      if (node.open) openParts.add(Number(node.dataset.part));
    });
    els.chapterNav.querySelectorAll('details[data-chapter]').forEach((node) => {
      if (node.open) openChapters.add(Number(node.dataset.chapter));
    });
    openChapters.add(currentLevel.chapterIndex);
    const activePart = parts.findIndex((part) => part.chapters.includes(currentLevel.chapterIndex));
    if (activePart >= 0) openParts.add(activePart);

    const fragment = document.createDocumentFragment();
    parts.forEach((part, partIndex) => {
      const partLevels = levels.filter((level) => part.chapters.includes(level.chapterIndex));
      const partDone = partLevels.filter((level) => completed.has(level.key)).length;

      const partGroup = document.createElement('details');
      partGroup.className = 'part-group';
      partGroup.dataset.part = String(partIndex);
      partGroup.open = openParts.has(partIndex);

      const partSummary = document.createElement('summary');
      partSummary.title = part.blurb || part.name;
      const partTitle = document.createElement('span');
      partTitle.className = 'part-title';
      partTitle.textContent = part.name;
      const partCount = document.createElement('span');
      partCount.className = 'part-count';
      partCount.textContent = `${partDone}/${partLevels.length}`;
      partSummary.append(partTitle, partCount);

      const partBody = document.createElement('div');
      partBody.className = 'part-body';

      part.chapters.forEach((chapterIndex) => {
        const name = CHAPTERS[chapterIndex];
        if (!name) return;
        const chapterLevels = levels.filter((level) => level.chapterIndex === chapterIndex);
        const done = chapterLevels.filter((level) => completed.has(level.key)).length;

        const group = document.createElement('details');
        group.className = 'chapter-group';
        group.dataset.chapter = String(chapterIndex);
        group.open = openChapters.has(chapterIndex);

        const summary = document.createElement('summary');
        summary.title = CHAPTER_BLURBS[name] || name;
        const title = document.createElement('span');
        title.className = 'chapter-title';
        title.textContent = `${chapterIndex + 1}. ${name}`;
        const count = document.createElement('span');
        count.className = 'chapter-count';
        count.textContent = `${done}/${chapterLevels.length}`;
        summary.append(title, count);

        const grid = document.createElement('div');
        grid.className = 'level-grid';
        chapterLevels.forEach((level) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'level-btn';
          button.dataset.level = String(level.id);
          button.textContent = String(level.id);
          button.title = `Level ${level.id}: ${level.title}`;
          if (completed.has(level.key)) button.classList.add('completed');
          if (currentLevel && level.id === currentLevel.id) button.classList.add('current');
          button.addEventListener('click', () => {
            selectLevel(level.id);
            closeSidebar();
          });
          grid.append(button);
        });

        group.append(summary, grid);
        partBody.append(group);
      });

      partGroup.append(partSummary, partBody);
      fragment.append(partGroup);
    });

    els.chapterNav.replaceChildren(fragment);
    updateProgressUI();
  }

  function renderLevelChrome(level) {
    document.title = `${level.title} · ${language.title}`;
    els.chapterLabel.textContent = `Chapter ${level.chapterIndex + 1} · ${level.chapter}`;
    els.levelTitle.textContent = level.title;
    els.levelTask.textContent = level.task;
    els.levelCounter.textContent = `Level ${level.id} of ${total}`;
    updateCompletionPill();

    els.hintContent.textContent = level.hint || 'No hint for this one. Read the task closely and inspect the scene.';
    els.referenceContent.replaceChildren();
    if (level.reference) {
      const code = document.createElement('code');
      code.textContent = level.reference;
      els.referenceContent.append(code);
    } else {
      els.referenceContent.textContent = 'No reference snippet for this level.';
    }
  }

  function renderCheatSheet() {
    const fragment = document.createDocumentFragment();
    language.cheatSheet.forEach((snippet) => {
      const code = document.createElement('code');
      code.textContent = snippet;
      fragment.append(code);
    });
    els.cheatSheet.replaceChildren(fragment);
  }

  function renderLanguageMenu() {
    const fragment = document.createDocumentFragment();
    LANGUAGE_ORDER.forEach((id) => {
      const item = LANGUAGES[id];
      const option = document.createElement('button');
      option.type = 'button';
      option.className = 'language-option';
      option.dataset.language = id;
      option.setAttribute('role', 'menuitemradio');
      option.setAttribute('aria-checked', String(id === languageId));

      const mark = document.createElement('span');
      mark.className = 'language-code';
      mark.textContent = item.mark;

      const copy = document.createElement('span');
      copy.className = 'language-copy';
      const name = document.createElement('strong');
      name.textContent = item.label;
      const detail = document.createElement('small');
      detail.textContent = item.blurb;
      copy.append(name, detail);

      option.append(mark, copy);
      fragment.append(option);
    });
    els.languageMenu.replaceChildren(fragment);
  }

  function openLanguageMenu() {
    els.languageMenu.hidden = false;
    els.languageToggle.setAttribute('aria-expanded', 'true');
    const first = els.languageMenu.querySelector('.language-option');
    if (first) first.focus();
  }

  function closeLanguageMenu() {
    els.languageMenu.hidden = true;
    els.languageToggle.setAttribute('aria-expanded', 'false');
  }

  function renderLanguageUI() {
    els.languageToggle.textContent = language.mark;
    els.languageToggle.title = `Choose a language · current: ${language.label}`;
    els.languageToggle.setAttribute('aria-label', `Choose a language · current: ${language.label}`);
    els.brandKicker.textContent = language.kicker;
    els.brandTitle.textContent = language.title;
    els.topTotal.textContent = String(total);
    els.editorHeading.textContent = language.editorHeading;
    els.editor.setAttribute('aria-label', `${language.label} code editor`);
    if (language.id !== 'java' && realismEnabled) {
      realismEnabled = false;
      restoreConsole();
    }
    renderRealismToggle();
    renderCheatSheet();
    renderLanguageMenu();
    closeLanguageMenu();
  }

  function switchLanguage(id) {
    if (!LANGUAGES[id]) return;
    if (id === languageId) {
      closeLanguageMenu();
      return;
    }

    const nextId = currentLevel ? Math.min(currentLevel.id, LANGUAGES[id].levels.length) : null;
    storeDraft();
    setLanguageData(id);
    currentLevel = null;
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, id);
    } catch (err) {}
    renderLanguageUI();
    selectLevel(nextId || firstIncomplete());
  }

  function selectLevel(id) {
    if (currentLevel) storeDraft();
    const safeId = Math.max(1, Math.min(total, Number(id) || 1));
    const level = levels[safeId - 1];
    currentLevel = level;
    setHash(level.id);

    els.editor.value = draftFor(level);
    updateLineNumbers();
    renderLevelChrome(level);

    try {
      createBrowser(level);
      setFeedback(null, 'Ready when you are.', 'Run your code to check the order.');
      setConsole('waiting', 'Run a script to see output and the return value.', false);
      els.resultLine.replaceChildren();
      lastResult = null;
      renderRealismView();
    } catch (err) {
      showError(err);
    }

    renderSidebar();
    els.editor.focus();
    els.editor.setSelectionRange(els.editor.value.length, els.editor.value.length);
    scheduleLivePreview();
  }

  function markComplete(level) {
    if (!completed.has(level.key)) {
      completed.add(level.key);
      persist();
    }
    updateCompletionPill();
    renderSidebar();
  }

  function runCode() {
    if (!currentLevel) return;
    clearTimeout(draftTimer);
    storeDraft();
    setFeedback('running', 'Placing your order…', 'Running the script against a fresh page.');
    setConsole('waiting', 'Running…', false);
    els.resultLine.replaceChildren();
    lastResult = null;

    let result;
    try {
      createBrowser(currentLevel);
      result = runner.run(els.editor.value, { browser });
    } catch (err) {
      showError(err);
      return;
    }

    refreshBrowserChrome();
    const output = result.output || '';
    const outputText = output || '(no output)';
    const renderedValue = (() => {
      try {
        return runner.inspect(result.value);
      } catch (err) {
        return String(result.value);
      }
    })();

    let outcome;
    try {
      outcome = Verify.verifyLevel(currentLevel, result.value, browser, result.output, runner);
    } catch (err) {
      setConsole('error', `${outputText}\n\nVerifier error: ${err.message}`, true);
      showError(err);
      return;
    }

    if (outcome.ok) {
      setConsole('success', outputText, false);
      showResult(result.value);
      markComplete(currentLevel);
      const message = currentLevel.explanation || `Order up! ${renderedValue} is exactly what the kitchen asked for.`;
      const nextLabel = currentLevel.id < total ? 'Next level' : 'Back to level 1';
      setFeedback('success', 'Level complete!', message, nextLabel);
    } else {
      setConsole('error', outputText, true);
      showResult(result.value);
      setFeedback('error', 'Not quite yet.', outcome.message);
    }
    renderRealismView();
  }

  function resetCode() {
    if (!currentLevel) return;
    clearTimeout(liveTimer);
    clearLiveMatches();
    els.editor.value = currentLevel.starter;
    delete drafts[currentLevel.key];
    persist();
    updateLineNumbers();
    setFeedback(null, 'Starter restored.', 'The scene is unchanged. Run when ready.');
    renderRealismView();
    els.editor.focus();
  }

  function resetScene() {
    if (!currentLevel) return;
    try {
      createBrowser(currentLevel);
      scheduleLivePreview();
      setFeedback(null, 'Scene reset.', 'The browser preview is back to its starting state.');
      setConsole('waiting', 'Run a script to see output and the return value.', false);
      els.resultLine.replaceChildren();
      lastResult = null;
      renderRealismView();
    } catch (err) {
      showError(err);
    }
  }

  function openSidebar() {
    els.sidebar.classList.add('is-open');
  }

  function closeSidebar() {
    els.sidebar.classList.remove('is-open');
  }

  function wireEvents() {
    els.runCode.addEventListener('click', runCode);
    els.resetCode.addEventListener('click', resetCode);
    els.resetScene.addEventListener('click', resetScene);
    els.javaRealismToggle.addEventListener('click', toggleRealism);
    els.sidebarOpen.addEventListener('click', openSidebar);
    els.sidebarClose.addEventListener('click', closeSidebar);

    els.languageToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      if (els.languageMenu.hidden) openLanguageMenu();
      else closeLanguageMenu();
    });

    els.languageMenu.addEventListener('click', (event) => {
      const option = event.target.closest('[data-language]');
      if (option) switchLanguage(option.dataset.language);
    });

    els.languageMenu.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      const options = Array.from(els.languageMenu.querySelectorAll('.language-option'));
      const index = options.indexOf(document.activeElement);
      if (index < 0) return;
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      options[(index + step + options.length) % options.length].focus();
    });

    document.addEventListener('click', (event) => {
      if (!els.languagePicker.contains(event.target)) closeLanguageMenu();
    });

    els.resetProgress.addEventListener('click', () => {
      const yes = window.confirm(`Reset every completed level and discard all saved ${language.label} drafts?`);
      if (!yes) return;
      completed = new Set();
      drafts = {};
      stateByLanguage[languageId].completed = completed;
      stateByLanguage[languageId].drafts = drafts;
      persist();
      if (currentLevel) {
        clearTimeout(liveTimer);
        clearLiveMatches();
        els.editor.value = currentLevel.starter;
        updateLineNumbers();
      }
      updateCompletionPill();
      renderSidebar();
      setFeedback(null, 'Progress reset.', 'All levels and drafts are back to the starter.');
    });

    els.editor.addEventListener('input', () => {
      updateLineNumbers();
      clearTimeout(draftTimer);
      draftTimer = window.setTimeout(storeDraft, 250);
      scheduleLivePreview();
      renderRealismView();
    });

    els.editor.addEventListener('scroll', () => {
      els.lineNumbers.scrollTop = els.editor.scrollTop;
    });

    els.editor.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        runCode();
        return;
      }
      if (event.key === 'Tab') {
        event.preventDefault();
        const start = els.editor.selectionStart;
        const end = els.editor.selectionEnd;
        els.editor.setRangeText('  ', start, end, 'end');
        updateLineNumbers();
        clearTimeout(draftTimer);
        draftTimer = window.setTimeout(storeDraft, 250);
        scheduleLivePreview();
        renderRealismView();
      }
    });

    els.sceneRoot.addEventListener('mouseover', (event) => inspectAt(event.target));
    els.sceneRoot.addEventListener('mouseleave', () => {
      if (!pinnedNode) setInspector(null, false);
    });
    els.sceneRoot.addEventListener('submit', (event) => event.preventDefault());
    els.sceneRoot.addEventListener('click', (event) => {
      pinAt(event.target);
      const link = event.target.closest('a');
      const submit = event.target.closest('button[type="submit"]');
      if (link || submit) event.preventDefault();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeLanguageMenu();
        closeSidebar();
      }
    });

    window.addEventListener('hashchange', () => {
      const id = levelFromHash();
      if (id && (!currentLevel || id !== currentLevel.id)) selectLevel(id);
    });

    window.addEventListener('beforeunload', () => {
      clearTimeout(draftTimer);
      storeDraft();
    });
  }

  function firstIncomplete() {
    for (let index = 0; index < levels.length; index += 1) {
      if (!completed.has(levels[index].key)) return levels[index].id;
    }
    return total;
  }

  function init() {
    const legacyHash = {
      ruby: loadState('ruby'),
      java: loadState('java')
    };
    setLanguageData(loadLanguageChoice());
    wireEvents();
    renderLanguageUI();
    const initialId = levelFromHash(legacyHash[languageId]) || firstIncomplete();
    selectLevel(initialId);
  }

  init();
})();
