(function () {
  'use strict';

  const API = window.SeleniumDinerLevels;
  const Ruby = window.SeleniumRuby;
  const Verify = window.SeleniumDinerVerify;

  if (!API || !Ruby || !Verify) {
    throw new Error('Selenium Ruby Diner failed to load its scripts.');
  }

  const LEVELS = API.LEVELS;
  const CHAPTERS = API.CHAPTERS;
  const CHAPTER_BLURBS = API.CHAPTER_BLURBS;
  const PARTS = API.PARTS;
  const STORAGE_KEY = 'selenium-ruby-diner:v1';
  const TOTAL = LEVELS.length;

  const els = {
    topCompleted: document.getElementById('top-completed'),
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
    resultLine: document.getElementById('result-line')
  };

  let completed = new Set();
  let drafts = {};
  let currentLevel = null;
  let browser = null;
  let displayNode = null;
  let pinnedNode = null;
  let draftTimer = null;
  let liveTimer = null;
  let liveRoot = null;
  let liveNodes = [];

  function loadState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!saved || typeof saved !== 'object') return;
      if (Array.isArray(saved.completed)) {
        saved.completed.forEach((id) => {
          const value = Number(id);
          if (Number.isInteger(value) && value >= 1 && value <= TOTAL) completed.add(value);
        });
      }
      if (saved.drafts && typeof saved.drafts === 'object') drafts = saved.drafts;
    } catch (err) {
      completed = new Set();
      drafts = {};
    }
  }

  function persist() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        completed: Array.from(completed).sort((a, b) => a - b),
        drafts
      }));
    } catch (err) {
      return undefined;
    }
  }

  function levelFromHash() {
    const match = /^#level-(\d+)$/.exec(window.location.hash || '');
    if (!match) return null;
    const id = Number(match[1]);
    return id >= 1 && id <= TOTAL ? id : null;
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
    const saved = drafts[String(level.id)];
    return typeof saved === 'string' ? saved : level.starter;
  }

  function storeDraft() {
    if (!currentLevel) return;
    const key = String(currentLevel.id);
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
        if (currentLevel.id < TOTAL) {
          selectLevel(currentLevel.id + 1);
        } else {
          selectLevel(1);
        }
      });
      els.feedback.append(next);
    }
  }

  function setConsole(status, text, isError) {
    els.consoleStatus.textContent = status;
    els.consoleStatus.className = 'console-status';
    if (status === 'success') els.consoleStatus.classList.add('success');
    if (status === 'error') els.consoleStatus.classList.add('error');
    els.consoleOutput.textContent = text;
    els.consoleOutput.classList.toggle('is-error', Boolean(isError));
  }

  function showResult(result) {
    els.resultLine.replaceChildren();
    const label = document.createElement('strong');
    label.textContent = 'Return value: ';
    const value = document.createElement('span');
    let rendered;
    try {
      rendered = Ruby.inspect(result);
    } catch (err) {
      rendered = String(result);
    }
    value.textContent = rendered;
    els.resultLine.append(label, value);
  }

  function showError(err) {
    const name = err && err.name ? err.name : 'Error';
    const line = err && err.line ? ` (line ${err.line})` : '';
    const message = err && err.message ? err.message : String(err);
    setFeedback('error', `${name}${line}`, message);
    setConsole('error', `${name}${line}: ${message}`, true);
    els.resultLine.replaceChildren();
    refreshBrowserChrome();
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
    browser = new Ruby.Browser(document, els.sceneRoot, browserOptions(level));
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
      const previewBrowser = new Ruby.Browser(document, ensureLiveRoot(), browserOptions(currentLevel));
      const result = Ruby.run(code, { browser: previewBrowser });
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
    const percent = Math.round((count / TOTAL) * 100);
    els.topCompleted.textContent = String(count);
    els.overallLabel.textContent = `${percent}%`;
    els.overallFill.style.width = `${percent}%`;
    els.overallBar.setAttribute('aria-valuenow', String(percent));
  }

  function updateCompletionPill() {
    const done = completed.has(currentLevel.id);
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
    const activePart = PARTS.findIndex((part) => part.chapters.includes(currentLevel.chapterIndex));
    if (activePart >= 0) openParts.add(activePart);

    const fragment = document.createDocumentFragment();
    PARTS.forEach((part, partIndex) => {
      const partLevels = LEVELS.filter((level) => part.chapters.includes(level.chapterIndex));
      const partDone = partLevels.filter((level) => completed.has(level.id)).length;

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
        const chapterLevels = LEVELS.filter((level) => level.chapterIndex === chapterIndex);
        const done = chapterLevels.filter((level) => completed.has(level.id)).length;

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
          if (completed.has(level.id)) button.classList.add('completed');
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
    document.title = `${level.title} · Selenium Ruby Diner`;
    els.chapterLabel.textContent = `Chapter ${level.chapterIndex + 1} · ${level.chapter}`;
    els.levelTitle.textContent = level.title;
    els.levelTask.textContent = level.task;
    els.levelCounter.textContent = `Level ${level.id} of ${TOTAL}`;
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

  function selectLevel(id) {
    if (currentLevel) storeDraft();
    const safeId = Math.max(1, Math.min(TOTAL, Number(id) || 1));
    const level = LEVELS[safeId - 1];
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
    } catch (err) {
      showError(err);
    }

    renderSidebar();
    els.editor.focus();
    els.editor.setSelectionRange(els.editor.value.length, els.editor.value.length);
    scheduleLivePreview();
  }

  function markComplete(level) {
    if (!completed.has(level.id)) {
      completed.add(level.id);
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

    let result;
    try {
      createBrowser(currentLevel);
      result = Ruby.run(els.editor.value, { browser });
    } catch (err) {
      showError(err);
      return;
    }

    refreshBrowserChrome();
    const output = result.output || '';
    const outputText = output || '(no output)';
    const renderedValue = (() => {
      try {
        return Ruby.inspect(result.value);
      } catch (err) {
        return String(result.value);
      }
    })();

    let outcome;
    try {
      outcome = Verify.verifyLevel(currentLevel, result.value, browser, result.output, Ruby);
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
      const nextLabel = currentLevel.id < TOTAL ? 'Next level' : 'Back to level 1';
      setFeedback('success', 'Level complete!', message, nextLabel);
    } else {
      setConsole('error', outputText, true);
      showResult(result.value);
      setFeedback('error', 'Not quite yet.', outcome.message);
    }
  }

  function resetCode() {
    if (!currentLevel) return;
    clearTimeout(liveTimer);
    clearLiveMatches();
    els.editor.value = currentLevel.starter;
    delete drafts[String(currentLevel.id)];
    persist();
    updateLineNumbers();
    setFeedback(null, 'Starter restored.', 'The scene is unchanged. Run when ready.');
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
    els.sidebarOpen.addEventListener('click', openSidebar);
    els.sidebarClose.addEventListener('click', closeSidebar);

    els.resetProgress.addEventListener('click', () => {
      const yes = window.confirm('Reset every completed level and discard all saved drafts?');
      if (!yes) return;
      completed = new Set();
      drafts = {};
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
      if (event.key === 'Escape') closeSidebar();
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
    for (let id = 1; id <= TOTAL; id += 1) {
      if (!completed.has(id)) return id;
    }
    return TOTAL;
  }

  function init() {
    loadState();
    wireEvents();
    const initialId = levelFromHash() || firstIncomplete();
    selectLevel(initialId);
  }

  init();
})();
