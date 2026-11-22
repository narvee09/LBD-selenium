/*
 * Selenium Ruby Diner - 1000 levels across five parts.
 */
(function (global) {
  'use strict';

  const S = global.Scenes;
  const LEVELS = [];

  const CHAPTERS = [
    'Locator Basics',
    'CSS Fundamentals',
    'CSS Advanced',
    'XPath Fundamentals',
    'XPath Advanced & Axes',
    'Collections & Scoped Finds',
    'Extraction & Scraping',
    'Actions, Waits & Navigation',
    'Driver Setup & Lifecycle',
    'Secrets & Configuration',
    'Login & Sessions',
    'Frames, Windows & Dialogs',
    'Screenshots, Uploads & Downloads',
    'Ruby Variables & Collections',
    'Blocks, Iteration & Conditions',
    'Algorithms for Scrapers',
    'Dynamic Pages & Robustness',
    'Pagination & Crawling',
    'Shadow DOM & Advanced DOM',
    'Page Objects & Reusable Scrapers',
    'Diagnostics',
    'Loop Safety & Batching',
    'Error Signals & Missing Data',
    'Reliable Scraping Workflows',
    'Structured Extraction & Export',
    'Network/API Scraping & Errors',
    'Data Normalization',
    'Dates, Numbers & Units',
    'Deduplication & Merging',
    'JSON & Schema Validation',
    'CSV & Tabular Data',
    'Reporting & Summaries',
    'Persistence & Resume',
    'Scheduling & Scale',
    'Compliance Capstone',
    'Rate Limiting & Politeness',
    'Error Monitoring & Logs',
    'Environment Configuration',
    'Deployment & Maintenance',
    'Responsible Scraping Capstone'
  ];

  const CHAPTER_BLURBS = {
    'Locator Basics': 'Every element has a locator. Start with Selenium\'s built-in strategies.',
    'CSS Fundamentals': 'CSS selectors are compact, fast, and perfect for scraping.',
    'CSS Advanced': 'Attribute selectors, pseudo-classes, and precise combinations.',
    'XPath Fundamentals': 'XPath can match structure, text, attributes, and position.',
    'XPath Advanced & Axes': 'Walk the document: parents, ancestors, and siblings.',
    'Collections & Scoped Finds': 'find_elements, chaining, and searching inside elements.',
    'Extraction & Scraping': 'Return text, attributes, lists, and formatted output.',
    'Actions, Waits & Navigation': 'Click, type, select, wait, and move between pages.',
    'Driver Setup & Lifecycle': 'Create a session, configure it, and clean it up.',
    'Secrets & Configuration': 'Keep URLs and credentials in environment variables.',
    'Login & Sessions': 'Authenticate once, then scrape protected pages.',
    'Frames, Windows & Dialogs': 'Switch contexts for iframes, new windows, and alerts.',
    'Screenshots, Uploads & Downloads': 'Capture evidence and handle file controls.',
    'Ruby Variables & Collections': 'Name values, store lists, and look things up in hashes.',
    'Blocks, Iteration & Conditions': 'Use blocks, filters, loops, and branches to shape data.',
    'Algorithms for Scrapers': 'Collect, transform, filter, aggregate, and report in the right order.',
    'Dynamic Pages & Robustness': 'Wait for content and recover from timing races.',
    'Pagination & Crawling': 'Follow next links, loop safely, and deduplicate.',
    'Shadow DOM & Advanced DOM': 'Pierce shadow roots and avoid light-DOM decoys.',
    'Page Objects & Reusable Scrapers': 'Keep locator maps and selectors maintainable.',
    'Diagnostics': 'Log, inspect source, and save failure evidence.',
    'Loop Safety & Batching': 'Keep loops bounded and batch work without losing state.',
    'Error Signals & Missing Data': 'Notice empty results, 404s, and nil values before they break a run.',
    'Reliable Scraping Workflows': 'Combine navigation, extraction, and evidence in dependable scripts.',
    'Structured Extraction & Export': 'Turn pages into CSV and JSON records.',
    'Network/API Scraping & Errors': 'Read JSON endpoints and handle HTTP status codes.',
    'Data Normalization': 'Clean names, prices, dates, and duplicates.',
    'Dates, Numbers & Units': 'Convert raw strings into trustworthy numbers and dates.',
    'Deduplication & Merging': 'Combine collections and remove repeated records.',
    'JSON & Schema Validation': 'Parse JSON and check that the shape matches expectations.',
    'CSV & Tabular Data': 'Turn rows and columns into portable delimited output.',
    'Reporting & Summaries': 'Aggregate records into useful counts, totals, and reports.',
    'Persistence & Resume': 'Checkpoint progress and continue safely later.',
    'Scheduling & Scale': 'Batch work, retry failures, and pace requests.',
    'Compliance Capstone': 'Respect robots rules, terms, privacy, and crawl limits.',
    'Rate Limiting & Politeness': 'Pace requests and avoid overwhelming a site.',
    'Error Monitoring & Logs': 'Record failures and keep diagnostic evidence.',
    'Environment Configuration': 'Separate secrets and environment-specific settings.',
    'Deployment & Maintenance': 'Shut down cleanly and keep scheduled jobs maintainable.',
    'Responsible Scraping Capstone': 'Combine safety, evidence, and compliance in production-like runs.'
  };

  const PARTS = [
    {
      name: 'Part 1 · Foundations',
      blurb: 'Locators, selectors, collections, extraction, and browser actions.',
      chapters: [0, 1, 2, 3, 4, 5, 6, 7]
    },
    {
      name: 'Part 2 · Browser Workflows',
      blurb: 'Setup, configuration, authentication, context switching, files, and Ruby logic.',
      chapters: [8, 9, 10, 11, 12, 13, 14, 15]
    },
    {
      name: 'Part 3 · Resilient Scraping',
      blurb: 'Dynamic pages, crawling, shadow DOM, loop safety, errors, and reliable workflows.',
      chapters: [16, 17, 18, 19, 20, 21, 22, 23]
    },
    {
      name: 'Part 4 · Data & APIs',
      blurb: 'Exports, APIs, normalization, dates, deduplication, JSON, CSV, and reporting.',
      chapters: [24, 25, 26, 27, 28, 29, 30, 31]
    },
    {
      name: 'Part 5 · Production & Compliance',
      blurb: 'Persistence, scheduling, compliance, rate limits, logs, configuration, and maintenance.',
      chapters: [32, 33, 34, 35, 36, 37, 38, 39]
    }
  ];

  const B = S.breakfast;
  const L = S.lunch;
  const D = S.dinner;
  const T = S.dessert;
  const X = S.specials;
  const LINKS = S.links;
  const MENU = S.menu;
  const ORDERS = S.orders;
  const FORM = S.form;
  const ACTION = S.action;
  const DELAYED = S.delayed;
  const RECORDS = S.records;
  const BROKEN = S.broken;
  const BATCH = S.batch;
  const RATE = S.rate;
  const API = S.apiRoutes;

  const ROUTES = {
    'https://diners.example': S.home,
    'https://diners.example/menu': S.menu,
    'https://diners.example/specials': S.specials,
    'https://diners.example/about': S.about,
    'https://diners.example/order': S.form,
    'https://diners.example/orders': S.orders,
    'https://diners.example/links': S.links,
    'https://diners.example/login': S.login,
    'https://diners.example/account': S.account,
    'https://diners.example/contexts': S.contexts,
    'https://diners.example/files': S.files,
    'https://diners.example/shadow': S.shadow,
    'https://diners.example/messy': S.messy,
    'https://diners.example/compliance': S.compliance,
    'https://diners.example/menu/page/1': S.page1,
    'https://diners.example/menu/page/2': S.page2,
    'https://diners.example/menu/page/3': S.page3
  };

  const CURRICULUM_ROUTES = Object.assign({}, ROUTES, {
    'https://diners.example/records': RECORDS,
    'https://diners.example/broken': BROKEN,
    'https://diners.example/batch': BATCH,
    'https://diners.example/rate': RATE,
    'https://diners.example/missing': {
      url: 'https://diners.example/missing',
      title: 'Page Not Found',
      html: '<div class="scene scene-missing"><h1 class="scene-title" data-key="missing-title" data-label="Missing page heading">Page Not Found</h1><p data-key="missing-copy" data-label="Missing page copy">The requested page is not available.</p></div>'
    }
  });

  const STRATEGY_ALIASES = {
    class: 'class_name',
    tag: 'tag_name',
    link: 'link_text',
    partial_link: 'partial_link_text',
    css_selector: 'css'
  };

  function canonicalStrategy(name) {
    const value = String(name || '').toLowerCase().replace(/\s+/g, '_');
    return STRATEGY_ALIASES[value] || value;
  }

  function inferRequiredStrategy(solution) {
    const pattern = /\bfind_elements?\s*\(\s*\{?\s*(?::([a-z_]+)|([a-z_]+)\s*:)/gi;
    let match;
    let strategy = null;
    while ((match = pattern.exec(String(solution || '')))) {
      strategy = canonicalStrategy(match[1] || match[2]);
    }
    return strategy;
  }

  function stableKey(level) {
    return JSON.stringify([level.chapterIndex, level.title, level.task]);
  }

  function add(level) {
    level._sequence = LEVELS.length;
    level.legacyId = LEVELS.length + 1;
    level.id = level.legacyId;
    level.chapterIndex = CHAPTERS.indexOf(level.chapter);
    if (!Object.prototype.hasOwnProperty.call(level, 'requiredStrategy')) {
      level.requiredStrategy = inferRequiredStrategy(level.solution);
    }
    level.key = level.key || stableKey(level);
    LEVELS.push(level);
    return level;
  }

  function selectLevel(options) {
    return add({
      chapter: options.chapter,
      title: options.title,
      task: options.task,
      scene: options.scene,
      routes: options.routes,
      startUrl: options.startUrl,
      api: options.api,
      env: options.env,
      files: options.files,
      verify: options.verify || { kind: 'select', ids: options.ids, mode: options.mode || 'elements' },
      solution: options.solution,
      hint: options.hint || '',
      reference: options.reference || '',
      explanation: options.explanation || '',
      starter: options.starter || '# Return the target element or elements\n'
    });
  }

  function valueLevel(options) {
    return add({
      chapter: options.chapter,
      title: options.title,
      task: options.task,
      scene: options.scene,
      routes: options.routes,
      startUrl: options.startUrl,
      api: options.api,
      env: options.env,
      files: options.files,
      verify: options.verify || { kind: 'value', expected: options.expected },
      solution: options.solution,
      hint: options.hint || '',
      reference: options.reference || '',
      explanation: options.explanation || '',
      starter: options.starter || '# Return the requested value\n'
    });
  }

  function outputLevel(options) {
    return add({
      chapter: options.chapter,
      title: options.title,
      task: options.task,
      scene: options.scene,
      routes: options.routes,
      startUrl: options.startUrl,
      api: options.api,
      env: options.env,
      files: options.files,
      verify: options.verify || { kind: 'output', expected: options.expected },
      solution: options.solution,
      hint: options.hint || '',
      reference: options.reference || '',
      explanation: options.explanation || '',
      starter: options.starter || '# puts the requested lines\n'
    });
  }

  function stateLevel(options) {
    return add({
      chapter: options.chapter,
      title: options.title,
      task: options.task,
      scene: options.scene,
      routes: options.routes,
      startUrl: options.startUrl,
      api: options.api,
      env: options.env,
      files: options.files,
      verify: Array.isArray(options.state)
        ? options.state.map((state) => ({ kind: 'state', state }))
        : { kind: 'state', state: options.state },
      solution: options.solution,
      hint: options.hint || '',
      reference: options.reference || '',
      explanation: options.explanation || '',
      starter: options.starter || '# Perform the requested action\n'
    });
  }

  // =========================================================================
  // Chapter 1 - Locator Basics (20)
  // =========================================================================
  selectLevel({
    chapter: 'Locator Basics',
    title: 'Find by id',
    task: 'Select the Waffles plate using its id.',
    scene: B,
    ids: ['b2'],
    mode: 'element',
    solution: 'driver.find_element(:id, "waffles")',
    hint: 'The id is "waffles". Pass it with the :id strategy.',
    reference: 'driver.find_element(:id, "waffles")'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'Find coffee by id',
    task: 'Select the Coffee plate using find_element and :id.',
    scene: B,
    ids: ['b10'],
    mode: 'element',
    solution: 'driver.find_element(:id, "coffee")',
    hint: 'The Coffee plate has the id "coffee".'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'Find by name',
    task: 'Select the Name input using the :name strategy.',
    scene: FORM,
    ids: ['f-name'],
    mode: 'element',
    solution: 'driver.find_element(:name, "customer_name")',
    hint: 'The name attribute is customer_name, not the element id.',
    reference: 'driver.find_element(:name, "customer_name")'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'Find a checkbox by name',
    task: 'Select the Vegan checkbox by its name attribute.',
    scene: FORM,
    ids: ['f-vegan'],
    mode: 'element',
    solution: 'driver.find_element(:name, "vegan")',
    hint: 'Checkbox inputs can have a name too.'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'Find by class_name',
    task: 'Select the first hot plate using :class_name. (Selenium returns the first match.)',
    scene: B,
    ids: ['b1'],
    mode: 'element',
    solution: 'driver.find_element(:class_name, "hot")',
    hint: 'Pancakes is the first plate with the hot class.',
    reference: 'driver.find_element(:class_name, "hot")'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'The :class alias',
    task: 'Select the first vegan plate using the :class locator alias.',
    scene: B,
    ids: ['b5'],
    mode: 'element',
    solution: 'driver.find_element(:class, "vegan")',
    hint: 'Selenium Ruby accepts both :class_name and :class.'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'Find by tag_name',
    task: 'Select the scene heading using its tag name.',
    scene: B,
    ids: ['scene-title'],
    mode: 'element',
    solution: 'driver.find_element(:tag_name, "h1")',
    hint: 'There is only one h1 in the scene.',
    reference: 'driver.find_element(:tag_name, "h1")'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'Find a button by tag_name',
    task: 'Select the first button in the form using :tag_name.',
    scene: FORM,
    ids: ['f-submit'],
    mode: 'element',
    solution: 'driver.find_element(:tag_name, "button")',
    hint: 'The Place order button is the first button in document order.'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'Find all inputs',
    task: 'Return every input element in the form with find_elements and :tag_name.',
    scene: FORM,
    ids: ['f-name', 'f-email', 'f-phone', 'f-quantity', 'f-cheese', 'f-vegan'],
    solution: 'driver.find_elements(:tag_name, "input")',
    hint: 'Use find_elements (plural) to get an Array.',
    reference: 'driver.find_elements(:tag_name, "input")'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'Find all vegetarians',
    task: 'Return every plate with the vegetarian class.',
    scene: B,
    ids: ['b1', 'b2', 'b4', 'b5', 'b7', 'b8', 'b9', 'b10'],
    solution: 'driver.find_elements(:class_name, "vegetarian")',
    hint: 'Use find_elements with :class_name.'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'find_element vs find_elements',
    task: 'Return both drinks. Use find_elements so neither is lost.',
    scene: B,
    ids: ['b9', 'b10'],
    solution: 'driver.find_elements(:class_name, "drink")',
    hint: 'find_element would only return the first drink.'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'A first CSS selector',
    task: 'Select the Bacon & Eggs plate with a CSS id selector.',
    scene: B,
    ids: ['b3'],
    mode: 'element',
    solution: 'driver.find_element(:css, "#bacon-eggs")',
    hint: 'A CSS id selector starts with #.',
    reference: 'driver.find_element(:css, "#bacon-eggs")'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'A first XPath',
    task: 'Select the Coffee plate with an XPath that checks its id.',
    scene: B,
    ids: ['b10'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@id=\'coffee\']")',
    hint: 'Use //div[@id=\'coffee\'].',
    reference: 'driver.find_element(:xpath, "//div[@id=\'coffee\']")'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'Find a link by its text',
    task: 'Select the Contact Us link with :link_text.',
    scene: LINKS,
    ids: ['l5'],
    mode: 'element',
    solution: 'driver.find_element(:link_text, "Contact Us")',
    hint: 'link_text matches the complete visible link label.',
    reference: 'driver.find_element(:link_text, "Contact Us")'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'Find a link by part of its text',
    task: 'Select the PDF link using :partial_link_text. Match the word "Download".',
    scene: LINKS,
    ids: ['l8'],
    mode: 'element',
    solution: 'driver.find_element(:partial_link_text, "Download")',
    hint: 'partial_link_text matches a substring of the link label.'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'Find every View Menu link',
    task: 'Return both links whose complete text is "View Menu".',
    scene: LINKS,
    ids: ['l9', 'l10'],
    solution: 'driver.find_elements(:link_text, "View Menu")',
    hint: 'Use find_elements with :link_text.'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'Keyword-style locator',
    task: 'Select the Waffles plate using keyword arguments: find_element(id: "...").',
    scene: B,
    ids: ['b2'],
    mode: 'element',
    solution: 'driver.find_element(id: "waffles")',
    hint: 'Selenium Ruby also accepts a hash-style locator.',
    reference: 'driver.find_element(id: "waffles")'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'Keyword-style CSS',
    task: 'Select the first vegan plate with find_element(css: "...").',
    scene: B,
    ids: ['b5'],
    mode: 'element',
    solution: 'driver.find_element(css: ".vegan")',
    hint: 'The first element with class vegan is the Fruit Bowl.'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'Keyword-style XPath',
    task: 'Select the first savory plate with find_element(xpath: "...").',
    scene: B,
    ids: ['b3'],
    mode: 'element',
    solution: 'driver.find_element(xpath: "//div[@data-category=\'savory\']")',
    hint: 'The first savory plate is Bacon & Eggs.'
  });

  selectLevel({
    chapter: 'Locator Basics',
    title: 'Find all links',
    task: 'Return every anchor element on the links page using find_elements with tag_name: "a".',
    scene: LINKS,
    ids: ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10'],
    solution: 'driver.find_elements(tag_name: "a")',
    hint: 'The plural method returns an Array of anchors.'
  });

  // =========================================================================
  // Chapter 2 - CSS Fundamentals (30)
  // =========================================================================
  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Class selector',
    task: 'Select every hot plate.',
    scene: B,
    ids: ['b1', 'b2', 'b3', 'b6', 'b8', 'b10'],
    solution: 'driver.find_elements(:css, ".hot")',
    hint: 'A class selector starts with a dot.',
    reference: 'driver.find_elements(:css, ".hot")'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Select all vegan plates',
    task: 'Select every plate with the vegan class.',
    scene: B,
    ids: ['b5', 'b9', 'b10'],
    solution: 'driver.find_elements(:css, ".vegan")'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'ID selector',
    task: 'Select the Pancakes plate by CSS id.',
    scene: B,
    ids: ['b1'],
    mode: 'element',
    solution: 'driver.find_element(:css, "#pancakes")'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Another ID selector',
    task: 'Select the Waffles plate by CSS id.',
    scene: B,
    ids: ['b2'],
    mode: 'element',
    solution: 'driver.find_element(:css, "#waffles")'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Type and class',
    task: 'Select every div with the plate class.',
    scene: B,
    ids: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10'],
    solution: 'driver.find_elements(:css, "div.plate")'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'The plate class',
    task: 'Select every plate.',
    scene: B,
    ids: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10'],
    solution: 'driver.find_elements(:css, ".plate")'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Two classes at once',
    task: 'Select plates that are both hot and sweet.',
    scene: B,
    ids: ['b1', 'b2'],
    solution: 'driver.find_elements(:css, ".hot.sweet")',
    hint: 'Chain class selectors with no space.'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Breakfast vegetarians',
    task: 'Select plates that have both the breakfast and vegetarian classes.',
    scene: B,
    ids: ['b1', 'b2', 'b4', 'b5', 'b7', 'b8', 'b9', 'b10'],
    solution: 'driver.find_elements(:css, ".breakfast.vegetarian")'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Descendant selector',
    task: 'Select every plate inside the .table container using a descendant selector.',
    scene: B,
    ids: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10'],
    solution: 'driver.find_elements(:css, ".table .plate")',
    reference: '.table .plate  # space means descendant'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Child selector',
    task: 'Select the direct plate children of .table.',
    scene: B,
    ids: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10'],
    solution: 'driver.find_elements(:css, ".table > .plate")',
    reference: '.table > .plate  # > means direct child'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Child price',
    task: 'Select every price span that is a direct child of a plate.',
    scene: B,
    ids: ['b1-price', 'b2-price', 'b3-price', 'b4-price', 'b5-price', 'b6-price', 'b7-price', 'b8-price', 'b9-price', 'b10-price'],
    solution: 'driver.find_elements(:css, ".plate > .price")'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Adjacent sibling',
    task: 'Select every plate immediately after a hot plate.',
    scene: B,
    ids: ['b2', 'b3', 'b4', 'b7', 'b9'],
    solution: 'driver.find_elements(:css, ".hot + .plate")',
    hint: 'The + combinator selects the next sibling only.',
    reference: '.hot + .plate'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'General sibling',
    task: 'Select every plate that follows a hot plate (not only the next one).',
    scene: B,
    ids: ['b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10'],
    solution: 'driver.find_elements(:css, ".hot ~ .plate")',
    reference: '.hot ~ .plate'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Grouped selectors',
    task: 'Select every vegan plate or sweet plate using a selector group.',
    scene: B,
    ids: ['b1', 'b2', 'b5', 'b9', 'b10'],
    solution: 'driver.find_elements(:css, ".vegan, .sweet")',
    reference: '.vegan, .sweet  # comma means OR'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Universal selector',
    task: 'Select every descendant of the Pancakes plate.',
    scene: B,
    ids: ['b1-food', 'b1-price', 'b1-tag-1', 'b1-tag-2'],
    solution: 'driver.find_elements(:css, "#pancakes *")',
    hint: '* matches any element.'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Attribute equals',
    task: 'Select plates whose data-category is exactly "sweet".',
    scene: B,
    ids: ['b1', 'b2'],
    solution: 'driver.find_elements(:css, "[data-category=\'sweet\']")',
    reference: '[data-category="sweet"]'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Attribute equals drink',
    task: 'Select plates whose data-category is "drink".',
    scene: B,
    ids: ['b9', 'b10'],
    solution: 'driver.find_elements(:css, "[data-category=\'drink\']")'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Attribute starts with',
    task: 'Select plates whose data-category starts with the letter s.',
    scene: B,
    ids: ['b1', 'b2', 'b3', 'b6', 'b7', 'b8'],
    solution: 'driver.find_elements(:css, "[data-category^=\'s\']")',
    reference: '[attr^="value"]  # starts with'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Attribute ends with',
    task: 'Select plates whose data-category ends with y.',
    scene: B,
    ids: ['b3', 'b4', 'b5', 'b6'],
    solution: 'driver.find_elements(:css, "[data-category$=\'y\']")',
    reference: '[attr$="value"]  # ends with'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Attribute contains',
    task: 'Select plates whose data-category contains the letter e.',
    scene: B,
    ids: ['b1', 'b2', 'b4', 'b5', 'b7', 'b8'],
    solution: 'driver.find_elements(:css, "[data-category*=\'e\']")',
    reference: '[attr*="value"]  # contains'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Class attribute word',
    task: 'Select vegan plates using the attribute word selector on class.',
    scene: B,
    ids: ['b5', 'b9', 'b10'],
    solution: 'driver.find_elements(:css, "[class~=\'vegan\']")',
    reference: '[class~="vegan"]'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Hyphen attribute match',
    task: 'Select plates whose data-chef is alice using the |= attribute selector.',
    scene: B,
    ids: ['b1', 'b3', 'b6', 'b10'],
    solution: 'driver.find_elements(:css, "[data-chef|=\'alice\']")',
    hint: '|= matches the exact value or the value followed by a hyphen.',
    reference: '[data-chef|="alice"]'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'First child',
    task: 'Select the first plate child of the table.',
    scene: B,
    ids: ['b1'],
    mode: 'element',
    solution: 'driver.find_element(:css, ".plate:first-child")'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Last child',
    task: 'Select the last plate child of the table.',
    scene: B,
    ids: ['b10'],
    mode: 'element',
    solution: 'driver.find_element(:css, ".plate:last-child")'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'nth-child',
    task: 'Select the third plate with :nth-child.',
    scene: B,
    ids: ['b3'],
    mode: 'element',
    solution: 'driver.find_element(:css, ".plate:nth-child(3)")'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Even plates',
    task: 'Select every even-numbered plate.',
    scene: B,
    ids: ['b2', 'b4', 'b6', 'b8', 'b10'],
    solution: 'driver.find_elements(:css, ".plate:nth-child(even)")'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'nth-child formula',
    task: 'Select plates at positions 1, 4, 7, and 10 using 3n+1.',
    scene: B,
    ids: ['b1', 'b4', 'b7', 'b10'],
    solution: 'driver.find_elements(:css, ".plate:nth-child(3n+1)")',
    reference: '.plate:nth-child(3n+1)'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Not hot',
    task: 'Select every plate that does not have the hot class.',
    scene: B,
    ids: ['b4', 'b5', 'b7', 'b9'],
    solution: 'driver.find_elements(:css, ".plate:not(.hot)")',
    reference: ':not(.hot)'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'Hot but not sweet',
    task: 'Select plates that are hot but not sweet.',
    scene: B,
    ids: ['b3', 'b6', 'b8', 'b10'],
    solution: 'driver.find_elements(:css, ".hot:not(.sweet)")'
  });

  selectLevel({
    chapter: 'CSS Fundamentals',
    title: 'nth-of-type',
    task: 'Select the second div child of the table with :nth-of-type.',
    scene: B,
    ids: ['b2'],
    mode: 'element',
    solution: 'driver.find_element(:css, ".table > div:nth-of-type(2)")'
  });

  // =========================================================================
  // Chapter 3 - CSS Advanced (20)
  // =========================================================================
  selectLevel({
    chapter: 'CSS Advanced',
    title: 'Class and attribute',
    task: 'Select vegan drink plates.',
    scene: B,
    ids: ['b9', 'b10'],
    solution: 'driver.find_elements(:css, ".vegan[data-category=\'drink\']")'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: 'Price attribute',
    task: 'Select plates whose data-price is exactly 8.',
    scene: B,
    ids: ['b1', 'b6'],
    solution: 'driver.find_elements(:css, ".plate[data-price=\'8\']")'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: 'Title contains Crispy',
    task: 'Select plates whose title contains "Crispy".',
    scene: B,
    ids: ['b2', 'b3', 'b8'],
    solution: 'driver.find_elements(:css, "[title*=\'Crispy\']")'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: 'Checked inputs',
    task: 'Select the checked checkbox input.',
    scene: FORM,
    ids: ['f-cheese'],
    solution: 'driver.find_elements(:css, "input:checked")'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: 'Disabled button',
    task: 'Select the disabled button.',
    scene: FORM,
    ids: ['f-disabled'],
    mode: 'element',
    solution: 'driver.find_element(:css, "button:disabled")'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: 'Selected option',
    task: 'Select the currently selected option in the size dropdown.',
    scene: FORM,
    ids: ['f-size-medium'],
    mode: 'element',
    solution: 'driver.find_element(:css, "option:checked")'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: 'Odd and not sweet',
    task: 'Select odd-numbered plates that are not sweet.',
    scene: B,
    ids: ['b3', 'b5', 'b7', 'b9'],
    solution: 'driver.find_elements(:css, ".table > .plate:nth-child(2n+1):not(.sweet)")'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: 'Not drink and not sweet',
    task: 'Select plates that are neither drinks nor sweet.',
    scene: B,
    ids: ['b3', 'b4', 'b5', 'b6', 'b7', 'b8'],
    solution: 'driver.find_elements(:css, ".plate:not([data-category=\'drink\']):not(.sweet)")'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: 'Two attribute selectors',
    task: 'Select alice\'s savory plates.',
    scene: B,
    ids: ['b3', 'b6'],
    solution: 'driver.find_elements(:css, "[data-chef=\'alice\'][data-category=\'savory\']")'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: 'Attribute exists except one',
    task: 'Select every plate with a data-price attribute whose price is not 10.',
    scene: B,
    ids: ['b1', 'b2', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10'],
    solution: 'driver.find_elements(:css, "[data-price]:not([data-price=\'10\'])")'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: 'Negative nth-child',
    task: 'Select the first three plates using -n+3.',
    scene: B,
    ids: ['b1', 'b2', 'b3'],
    solution: 'driver.find_elements(:css, ".plate:nth-child(-n+3)")',
    reference: ':nth-child(-n+3)'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: 'nth-last-child',
    task: 'Select the second plate from the end.',
    scene: B,
    ids: ['b9'],
    mode: 'element',
    solution: 'driver.find_element(:css, ".plate:nth-last-child(2)")'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: 'Odd from the end',
    task: 'Select plates in odd positions counted from the end.',
    scene: B,
    ids: ['b2', 'b4', 'b6', 'b8', 'b10'],
    solution: 'driver.find_elements(:css, ".plate:nth-last-child(odd)")'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: 'Repeated class attribute match',
    task: 'Select hot plates using two [class~=...] selectors.',
    scene: B,
    ids: ['b1', 'b2', 'b3', 'b6', 'b8', 'b10'],
    solution: 'driver.find_elements(:css, "div[class~=\'plate\'][class~=\'hot\']")'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: 'Chef starts with a',
    task: 'Select plates whose data-chef starts with a.',
    scene: B,
    ids: ['b1', 'b3', 'b6', 'b10'],
    solution: 'driver.find_elements(:css, "[data-chef^=\'a\']")'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: 'Chef ends with e',
    task: 'Select plates whose data-chef ends with e.',
    scene: B,
    ids: ['b1', 'b3', 'b6', 'b10'],
    solution: 'driver.find_elements(:css, "[data-chef$=\'e\']")'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: 'Chef contains lic',
    task: 'Select plates whose data-chef contains "lic".',
    scene: B,
    ids: ['b1', 'b3', 'b6', 'b10'],
    solution: 'driver.find_elements(:css, "[data-chef*=\'lic\']")'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: 'Neither hot nor vegan',
    task: 'Select plates that are neither hot nor vegan.',
    scene: B,
    ids: ['b4', 'b7'],
    solution: 'driver.find_elements(:css, ".plate:not(.hot):not(.vegan)")'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: '4n+2',
    task: 'Select plates at positions 2, 6, and 10 using 4n+2.',
    scene: B,
    ids: ['b2', 'b6', 'b10'],
    solution: 'driver.find_elements(:css, ".table > .plate:nth-child(4n+2)")'
  });

  selectLevel({
    chapter: 'CSS Advanced',
    title: 'Grouped child selectors',
    task: 'Select the price spans inside Pancakes and Waffles.',
    scene: B,
    ids: ['b1-price', 'b2-price'],
    solution: 'driver.find_elements(:css, "#pancakes > .price, #waffles > .price")'
  });

  // =========================================================================
  // Chapter 4 - XPath Fundamentals (30)
  // =========================================================================
  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath by id',
    task: 'Select the Pancakes plate with an id predicate.',
    scene: B,
    ids: ['b1'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@id=\'pancakes\']")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath attribute equals',
    task: 'Select every drink by its data-category attribute.',
    scene: B,
    ids: ['b9', 'b10'],
    solution: 'driver.find_elements(:xpath, "//div[@data-category=\'drink\']")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath contains class',
    task: 'Select every hot plate with contains(@class, ...).',
    scene: B,
    ids: ['b1', 'b2', 'b3', 'b6', 'b8', 'b10'],
    solution: 'driver.find_elements(:xpath, "//div[contains(@class, \'hot\')]")',
    reference: '//div[contains(@class, "hot")]'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath text match',
    task: 'Select the span whose text is exactly Pancakes.',
    scene: B,
    ids: ['b1-food'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//span[text()=\'Pancakes\']")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath parent',
    task: 'Select the plates whose price text is $8, by walking from the span to its parent.',
    scene: B,
    ids: ['b1', 'b6'],
    solution: 'driver.find_elements(:xpath, "//span[text()=\'$8\']/..")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath price equals',
    task: 'Select plates whose data-price attribute is 8.',
    scene: B,
    ids: ['b1', 'b6'],
    solution: 'driver.find_elements(:xpath, "//div[@data-price=\'8\']")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath numeric greater than',
    task: 'Select plates whose data-price is greater than 9.',
    scene: B,
    ids: ['b3'],
    solution: 'driver.find_elements(:xpath, "//div[@data-price>9]")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath numeric less than',
    task: 'Select plates whose data-price is less than 5.',
    scene: B,
    ids: ['b7', 'b9', 'b10'],
    solution: 'driver.find_elements(:xpath, "//div[@data-price<5]")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath calories',
    task: 'Select plates with at least 600 calories.',
    scene: B,
    ids: ['b2'],
    solution: 'driver.find_elements(:xpath, "//div[@data-calories>=600]")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath and',
    task: 'Select sweet plates cooked by alice.',
    scene: B,
    ids: ['b1'],
    solution: 'driver.find_elements(:xpath, "//div[@data-category=\'sweet\' and @data-chef=\'alice\']")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath or',
    task: 'Select sweet or healthy plates.',
    scene: B,
    ids: ['b1', 'b2', 'b4', 'b5'],
    solution: 'driver.find_elements(:xpath, "//div[@data-category=\'sweet\' or @data-category=\'healthy\']")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath not',
    task: 'Select every plate that is not a drink.',
    scene: B,
    ids: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8'],
    solution: 'driver.find_elements(:xpath, "//div[contains(@class,\'plate\') and not(@data-category=\'drink\')]")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath starts-with',
    task: 'Select plates cooked by a chef whose name starts with "ali".',
    scene: B,
    ids: ['b1', 'b3', 'b6', 'b10'],
    solution: 'driver.find_elements(:xpath, "//div[starts-with(@data-chef,\'ali\')]")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath contains title',
    task: 'Select plates whose title contains "Crispy".',
    scene: B,
    ids: ['b2', 'b3', 'b8'],
    solution: 'driver.find_elements(:xpath, "//div[contains(@title,\'Crispy\')]")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath contains class',
    task: 'Select every vegetarian plate using contains(@class, ...).',
    scene: B,
    ids: ['b1', 'b2', 'b4', 'b5', 'b7', 'b8', 'b9', 'b10'],
    solution: 'driver.find_elements(:xpath, "//div[contains(@class,\'vegetarian\')]")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath last child',
    task: 'Select the last plate in the table.',
    scene: B,
    ids: ['b10'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@class=\'table\']/div[last()]")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath first child',
    task: 'Select the first plate in the table.',
    scene: B,
    ids: ['b1'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@class=\'table\']/div[1]")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath position',
    task: 'Select the first three plates.',
    scene: B,
    ids: ['b1', 'b2', 'b3'],
    solution: 'driver.find_elements(:xpath, "//div[@class=\'table\']/div[position()<=3]")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath odd position',
    task: 'Select plates in odd positions with position() mod 2 = 1.',
    scene: B,
    ids: ['b1', 'b3', 'b5', 'b7', 'b9'],
    solution: 'driver.find_elements(:xpath, "//div[@class=\'table\']/div[position() mod 2 = 1]")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath index',
    task: 'Select the third plate by numeric predicate.',
    scene: B,
    ids: ['b3'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@class=\'table\']/div[3]")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath text and attribute',
    task: 'Select the plate whose price span says $9 using a parent step.',
    scene: B,
    ids: ['b2'],
    solution: 'driver.find_elements(:xpath, "//span[@class=\'price\' and text()=\'$9\']/parent::div")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'First savory',
    task: 'Select the first savory plate.',
    scene: B,
    ids: ['b3'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@data-category=\'savory\'][1]")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'Last savory',
    task: 'Select the last savory plate.',
    scene: B,
    ids: ['b6'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@data-category=\'savory\'][last()]")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath food span',
    task: 'Select the food span inside Bacon & Eggs.',
    scene: B,
    ids: ['b3-food'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//*[@id=\'bacon-eggs\']//span[@class=\'food\']")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath price 4',
    task: 'Select every plate priced at 4.',
    scene: B,
    ids: ['b7', 'b9'],
    solution: 'driver.find_elements(:xpath, "//div[contains(@class,\'plate\')][@data-price=\'4\']")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath normalize-space',
    task: 'Select plates cooked by bob using normalize-space().',
    scene: B,
    ids: ['b2', 'b5', 'b8'],
    solution: 'driver.find_elements(:xpath, "//div[contains(@class,\'plate\')][normalize-space(@data-chef)=\'bob\']")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath price range',
    task: 'Select plates priced from 8 through 10 inclusive.',
    scene: B,
    ids: ['b1', 'b2', 'b3', 'b6'],
    solution: 'driver.find_elements(:xpath, "//div[contains(@class,\'plate\')][@data-price >= 8 and @data-price <= 10]")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath not equal',
    task: 'Select every plate whose price is not 5.',
    scene: B,
    ids: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b9', 'b10'],
    solution: 'driver.find_elements(:xpath, "//div[contains(@class,\'plate\')][@data-price != \'5\']")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath contains either class',
    task: 'Select plates whose class contains sweet or savory.',
    scene: B,
    ids: ['b1', 'b2', 'b3', 'b6', 'b8'],
    solution: 'driver.find_elements(:xpath, "//div[contains(@class,\'sweet\') or contains(@class,\'savory\')]")'
  });

  selectLevel({
    chapter: 'XPath Fundamentals',
    title: 'XPath alice savory',
    task: 'Select alice\'s savory plates with two attribute predicates.',
    scene: B,
    ids: ['b3', 'b6'],
    solution: 'driver.find_elements(:xpath, "//div[contains(@class,\'plate\')][@data-chef=\'alice\' and @data-category=\'savory\']")'
  });

  // =========================================================================
  // Chapter 5 - XPath Advanced & Axes (30)
  // =========================================================================
  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Following sibling',
    task: 'Select the plate immediately after Pancakes.',
    scene: B,
    ids: ['b2'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@id=\'pancakes\']/following-sibling::div[1]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Preceding sibling',
    task: 'Select the plate immediately before Waffles.',
    scene: B,
    ids: ['b1'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@id=\'waffles\']/preceding-sibling::div[1]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Following sibling of Waffles',
    task: 'Select the plate immediately after Waffles.',
    scene: B,
    ids: ['b3'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@id=\'waffles\']/following-sibling::div[1]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Second preceding sibling',
    task: 'Select the plate two positions before Fruit Bowl.',
    scene: B,
    ids: ['b3'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@id=\'fruit-bowl\']/preceding-sibling::div[2]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Ancestor plate',
    task: 'Walk from the Pancakes text span up to its ancestor plate.',
    scene: B,
    ids: ['b1'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//span[text()=\'Pancakes\']/ancestor::div[contains(@class,\'plate\')]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Ancestor of prices',
    task: 'Select the ancestor plates of all $8 price spans.',
    scene: B,
    ids: ['b1', 'b6'],
    solution: 'driver.find_elements(:xpath, "//span[text()=\'$8\']/ancestor::div[contains(@class,\'plate\')]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Ancestor table',
    task: 'Select the table element that contains Coffee.',
    scene: B,
    ids: ['table'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@id=\'coffee\']/ancestor::div[@data-key=\'table\']")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Ancestor-or-self',
    task: 'Select Coffee using ancestor-or-self.',
    scene: B,
    ids: ['b10'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@id=\'coffee\']/ancestor-or-self::div[contains(@class,\'plate\')]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Following axis',
    task: 'Select the first plate that follows Pancakes anywhere after it.',
    scene: B,
    ids: ['b2'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@id=\'pancakes\']/following::div[contains(@class,\'plate\')][1]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Preceding axis',
    task: 'Select the nearest plate before Coffee.',
    scene: B,
    ids: ['b9'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@id=\'coffee\']/preceding::div[1][contains(@class,\'plate\')]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Child axis',
    task: 'Select the third child div of the table.',
    scene: B,
    ids: ['b3'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@class=\'table\']/child::div[3]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Descendant axis',
    task: 'Select the first price span descendant of the table.',
    scene: B,
    ids: ['b1-price'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@class=\'table\']/descendant::span[@class=\'price\'][1]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Self axis',
    task: 'Select Pancakes using the self axis.',
    scene: B,
    ids: ['b1'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@id=\'pancakes\']/self::div")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Descendant food',
    task: 'Select the food span inside Pancakes using descendant::.',
    scene: B,
    ids: ['b1-food'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@id=\'pancakes\']/descendant::span[@class=\'food\']")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'First descendant',
    task: 'Select the first descendant element of Pancakes.',
    scene: B,
    ids: ['b1-food'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@id=\'pancakes\']/descendant::*[1]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Last minus one',
    task: 'Select the second-to-last plate with last()-1.',
    scene: B,
    ids: ['b9'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@class=\'table\']/div[last()-1]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Position equals last',
    task: 'Select the last plate using position() = last().',
    scene: B,
    ids: ['b10'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@class=\'table\']/div[position()=last()]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Position greater than',
    task: 'Select plates after position 7.',
    scene: B,
    ids: ['b8', 'b9', 'b10'],
    solution: 'driver.find_elements(:xpath, "//div[@class=\'table\']/div[position()>7]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Position less than',
    task: 'Select plates before position 3.',
    scene: B,
    ids: ['b1', 'b2'],
    solution: 'driver.find_elements(:xpath, "//div[@class=\'table\']/div[position()<3]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Count preceding siblings',
    task: 'Select the fifth plate by counting its preceding siblings.',
    scene: B,
    ids: ['b5'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@class=\'table\']/div[count(preceding-sibling::div)=4]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Count following siblings',
    task: 'Select the plate with no following siblings.',
    scene: B,
    ids: ['b10'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@class=\'table\']/div[count(following-sibling::div)=0]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Sibling chain',
    task: 'From the second plate, select the first following sibling.',
    scene: B,
    ids: ['b3'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@class=\'table\']/div[2]/following-sibling::div[1]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Back from the ninth',
    task: 'From the ninth plate, select the immediately preceding sibling.',
    scene: B,
    ids: ['b8'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@class=\'table\']/div[9]/preceding-sibling::div[1]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Third following plate',
    task: 'From the first plate, select the third following plate.',
    scene: B,
    ids: ['b4'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@class=\'table\']/div[1]/following-sibling::div[contains(@class,\'plate\')][3]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Third preceding plate',
    task: 'From the tenth plate, select the third preceding plate.',
    scene: B,
    ids: ['b7'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@class=\'table\']/div[10]/preceding-sibling::div[3][contains(@class,\'plate\')]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Last following sibling',
    task: 'Select the last following plate sibling of Pancakes.',
    scene: B,
    ids: ['b10'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@id=\'pancakes\']/following-sibling::div[contains(@class,\'plate\')][last()]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Second savory',
    task: 'Select the second savory plate.',
    scene: B,
    ids: ['b6'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@class=\'table\']/div[@data-category=\'savory\'][2]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Last savory in table',
    task: 'Select the last savory plate in the table.',
    scene: B,
    ids: ['b6'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@class=\'table\']/div[@data-category=\'savory\'][last()]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Second hot',
    task: 'Select the second hot plate.',
    scene: B,
    ids: ['b2'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@class=\'table\']/div[contains(@class,\'hot\')][2]")'
  });

  selectLevel({
    chapter: 'XPath Advanced & Axes',
    title: 'Last hot',
    task: 'Select the last hot plate.',
    scene: B,
    ids: ['b10'],
    mode: 'element',
    solution: 'driver.find_element(:xpath, "//div[@class=\'table\']/div[contains(@class,\'hot\')][last()]")'
  });

  // =========================================================================
  // Chapter 6 - Collections & Scoped Finds (20)
  // =========================================================================
  selectLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'All headings',
    task: 'Return every h2 heading in the menu.',
    scene: MENU,
    ids: ['sec-breakfast-title', 'sec-lunch-title', 'sec-dinner-title'],
    solution: 'driver.find_elements(:tag_name, "h2")'
  });

  selectLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'All dishes',
    task: 'Return every .dish list item in the menu.',
    scene: MENU,
    ids: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9'],
    solution: 'driver.find_elements(:css, ".dish")'
  });

  selectLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'All sections',
    task: 'Return every .menu-section.',
    scene: MENU,
    ids: ['sec-breakfast', 'sec-lunch', 'sec-dinner'],
    solution: 'driver.find_elements(:css, ".menu-section")'
  });

  selectLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'All form inputs',
    task: 'Return every input in the form.',
    scene: FORM,
    ids: ['f-name', 'f-email', 'f-phone', 'f-quantity', 'f-cheese', 'f-vegan'],
    solution: 'driver.find_elements(:tag_name, "input")'
  });

  selectLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'All options',
    task: 'Return every option in the size dropdown.',
    scene: FORM,
    ids: ['f-size-small', 'f-size-medium', 'f-size-large'],
    solution: 'driver.find_elements(:tag_name, "option")'
  });

  selectLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'The only select',
    task: 'Return the select element as an array of one element.',
    scene: FORM,
    ids: ['f-size'],
    solution: 'driver.find_elements(:tag_name, "select")',
    hint: 'find_elements always returns an Array, even when it finds one element.'
  });

  selectLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'Scoped breakfast dishes',
    task: 'Search inside the breakfast section and return its dishes.',
    scene: MENU,
    ids: ['m1', 'm2', 'm3'],
    solution: 'driver.find_element(:css, "[data-key=\'sec-breakfast\']").find_elements(:css, ".dish")',
    hint: 'Call find_elements on the section element, not on driver.',
    reference: 'element.find_elements(:css, ".dish")'
  });

  selectLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'Items in the first open order',
    task: 'Return the items in the first open order.',
    scene: ORDERS,
    ids: ['i1', 'i2'],
    solution: 'driver.find_element(:css, ".order[data-status=\'open\']").find_elements(:css, ".item")'
  });

  selectLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'Scoped heading',
    task: 'Return the h3 heading inside the first open order.',
    scene: ORDERS,
    ids: ['o1-title'],
    mode: 'element',
    solution: 'driver.find_element(:css, ".order[data-status=\'open\']").find_element(:css, "h3")'
  });

  selectLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'Collection first',
    task: 'Return only the first plate from a collection of plates.',
    scene: B,
    ids: ['b1'],
    mode: 'element',
    solution: 'driver.find_elements(:css, ".plate").first'
  });

  selectLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'Collection last',
    task: 'Return only the last plate from a collection of plates.',
    scene: B,
    ids: ['b10'],
    mode: 'element',
    solution: 'driver.find_elements(:css, ".plate").last'
  });

  selectLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'Index 1',
    task: 'Return the second plate in the collection using [1].',
    scene: B,
    ids: ['b2'],
    mode: 'element',
    solution: 'driver.find_elements(:css, ".plate")[1]'
  });

  selectLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'Index 0',
    task: 'Return the first plate in the collection using [0].',
    scene: B,
    ids: ['b1'],
    mode: 'element',
    solution: 'driver.find_elements(:css, ".plate")[0]'
  });

  valueLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'Count the plates',
    task: 'Return the number of plates using .count.',
    scene: B,
    expected: 10,
    solution: 'driver.find_elements(:css, ".plate").count'
  });

  valueLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'Length of collection',
    task: 'Return the number of plates using .length.',
    scene: B,
    expected: 10,
    solution: 'driver.find_elements(:css, ".plate").length'
  });

  valueLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'Is the collection empty?',
    task: 'Return whether the plate collection is empty.',
    scene: B,
    expected: false,
    solution: 'driver.find_elements(:css, ".plate").empty?'
  });

  selectLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'Two exact links',
    task: 'Return both links whose full text is "View Menu".',
    scene: LINKS,
    ids: ['l9', 'l10'],
    solution: 'driver.find_elements(:link_text, "View Menu")'
  });

  selectLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'Every menu link',
    task: 'Return every link whose text contains "Menu" using partial_link_text.',
    scene: LINKS,
    ids: ['l3', 'l4', 'l8', 'l9', 'l10'],
    solution: 'driver.find_elements(:partial_link_text, "Menu")'
  });

  selectLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'Order two items',
    task: 'Return every item inside order 2.',
    scene: ORDERS,
    ids: ['i3', 'i4', 'i5'],
    solution: 'driver.find_element(:css, "[data-key=\'o2\']").find_elements(:css, ".item")'
  });

  selectLevel({
    chapter: 'Collections & Scoped Finds',
    title: 'Scoped options',
    task: 'Find the size select, then return its options.',
    scene: FORM,
    ids: ['f-size-small', 'f-size-medium', 'f-size-large'],
    solution: 'driver.find_element(:id, "size").find_elements(:tag_name, "option")'
  });

  // =========================================================================
  // Chapter 7 - Extraction & Scraping (30)
  // =========================================================================
  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Read the food name',
    task: 'Return the text of Pancakes\' .food span.',
    scene: B,
    expected: 'Pancakes',
    solution: 'driver.find_element(:id, "pancakes").find_element(:css, ".food").text'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Read Coffee\'s price',
    task: 'Return the price text for Coffee.',
    scene: B,
    expected: '$3',
    solution: 'driver.find_element(:id, "coffee").find_element(:css, ".price").text'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Read an attribute',
    task: 'Return the data-chef attribute for Waffles.',
    scene: B,
    expected: 'bob',
    solution: 'driver.find_element(:id, "waffles").attribute("data-chef")'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Attribute from first match',
    task: 'Return the data-category of the first vegan plate.',
    scene: B,
    expected: 'healthy',
    solution: 'driver.find_element(:css, ".vegan").attribute("data-category")'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Read a link href',
    task: 'Return the href of the Contact Us link.',
    scene: LINKS,
    expected: 'https://diners.example/contact',
    solution: 'driver.find_element(:link_text, "Contact Us").attribute("href")'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Map food names',
    task: 'Return an array of every food name using .map.',
    scene: B,
    expected: ['Pancakes', 'Waffles', 'Bacon & Eggs', 'Oatmeal', 'Fruit Bowl', 'Sausage', 'Toast', 'Hash Browns', 'Orange Juice', 'Coffee'],
    solution: 'driver.find_elements(:css, ".food").map { |el| el.text }'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Map with a symbol proc',
    task: 'Return every food name using map(&:text).',
    scene: B,
    expected: ['Pancakes', 'Waffles', 'Bacon & Eggs', 'Oatmeal', 'Fruit Bowl', 'Sausage', 'Toast', 'Hash Browns', 'Orange Juice', 'Coffee'],
    solution: 'driver.find_elements(:css, ".food").map(&:text)',
    hint: '&:text turns the text method into a block.'
  });

  outputLevel({
    chapter: 'Extraction & Scraping',
    title: 'Print each food',
    task: 'Use each and puts to print each food name on its own line.',
    scene: B,
    expected: ['Pancakes', 'Waffles', 'Bacon & Eggs', 'Oatmeal', 'Fruit Bowl', 'Sausage', 'Toast', 'Hash Browns', 'Orange Juice', 'Coffee'],
    solution: 'driver.find_elements(:css, ".food").each do |el|\n  puts el.text\nend'
  });

  outputLevel({
    chapter: 'Extraction & Scraping',
    title: 'Numbered output',
    task: 'Print each food name prefixed with its 1-based number and a period, e.g. "1. Pancakes".',
    scene: B,
    expected: ['1. Pancakes', '2. Waffles', '3. Bacon & Eggs', '4. Oatmeal', '5. Fruit Bowl', '6. Sausage', '7. Toast', '8. Hash Browns', '9. Orange Juice', '10. Coffee'],
    solution: 'driver.find_elements(:css, ".food").each_with_index do |el, i|\n  puts (i + 1).to_s + ". " + el.text\nend',
    hint: 'Use each_with_index and concatenate the number.'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Prices as integers',
    task: 'Return every price as an integer, without the dollar sign.',
    scene: B,
    expected: [8, 9, 10, 6, 7, 8, 4, 5, 4, 3],
    solution: 'driver.find_elements(:css, ".price").map { |el| el.text.delete("$").to_i }'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Sum the prices',
    task: 'Return the sum of all prices.',
    scene: B,
    expected: 64,
    solution: 'driver.find_elements(:css, ".price").map { |el| el.text.delete("$").to_i }.sum'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Filter with select',
    task: 'Return the food names of sweet plates.',
    scene: B,
    expected: ['Pancakes', 'Waffles'],
    solution: 'driver.find_elements(:css, ".plate").select { |el| el.attribute("data-category") == "sweet" }.map { |el| el.find_element(:css, ".food").text }'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Filter with reject',
    task: 'Return the food names of all non-drink plates.',
    scene: B,
    expected: ['Pancakes', 'Waffles', 'Bacon & Eggs', 'Oatmeal', 'Fruit Bowl', 'Sausage', 'Toast', 'Hash Browns'],
    solution: 'driver.find_elements(:css, ".plate").reject { |el| el.attribute("data-category") == "drink" }.map { |el| el.find_element(:css, ".food").text }'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Find in a collection',
    task: 'Find the Coffee plate and return its price text.',
    scene: B,
    expected: '$3',
    solution: 'driver.find_elements(:css, ".plate").find { |el| el.find_element(:css, ".food").text == "Coffee" }.find_element(:css, ".price").text'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Menu dish names',
    task: 'Return every dish name from the menu.',
    scene: MENU,
    expected: ['Pancakes', 'Waffles', 'Omelette', 'Cheeseburger', 'Caesar Salad', 'Grilled Cheese', 'Steak', 'Salmon', 'Vegetable Curry'],
    solution: 'driver.find_elements(:css, ".dish .food").map(&:text)'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Menu section names',
    task: 'Return the three section headings.',
    scene: MENU,
    expected: ['Breakfast', 'Lunch', 'Dinner'],
    solution: 'driver.find_elements(:css, ".menu-section > h2").map(&:text)'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Menu price strings',
    task: 'Return every menu price as text, including the dollar sign.',
    scene: MENU,
    expected: ['$8', '$9', '$10', '$12', '$9', '$8', '$24', '$20', '$14'],
    solution: 'driver.find_elements(:css, ".dish .price").map(&:text)'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Order customers',
    task: 'Return the customer names for all orders.',
    scene: ORDERS,
    expected: ['Ada', 'Grace', 'Alan'],
    solution: 'driver.find_elements(:css, ".order .customer strong").map(&:text)'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'All ordered items',
    task: 'Return every item name across all orders.',
    scene: ORDERS,
    expected: ['Pancakes', 'Coffee', 'Waffles', 'Fruit Bowl', 'Tea', 'Steak'],
    solution: 'driver.find_elements(:css, ".order .item").map(&:text)'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Scoped order items',
    task: 'Return the item names for order 2 only.',
    scene: ORDERS,
    expected: ['Waffles', 'Fruit Bowl', 'Tea'],
    solution: 'driver.find_element(:css, "[data-key=\'o2\']").find_elements(:css, ".item").map(&:text)'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Search the page source',
    task: 'Return true if the page source contains "Pancakes".',
    scene: B,
    expected: true,
    solution: 'driver.page_source.include?("Pancakes")'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Scan the source',
    task: 'Return how many plate data-key attributes match b followed by digits.',
    scene: B,
    expected: 10,
    solution: 'driver.page_source.scan(/data-key="b\\d+"/).length',
    hint: 'Scan for /data-key="b\\d+"/ and count the matches.'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Regex capture',
    task: 'Extract the numeric part of Pancakes\' price and return it as an integer.',
    scene: B,
    expected: 8,
    solution: 'text = driver.find_element(:id, "pancakes").find_element(:css, ".price").text\nm = text.match(/\\$(\\d+)/)\nm[1].to_i'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Scan words in a title',
    task: 'Return the number of words in the Waffles title attribute.',
    scene: B,
    expected: 2,
    solution: 'driver.find_element(:id, "waffles").attribute("title").scan(/\\w+/).length'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Unique chefs',
    task: 'Return the unique list of chefs, in first-seen order.',
    scene: B,
    expected: ['alice', 'bob', 'carol'],
    solution: 'driver.find_elements(:css, ".plate").map { |el| el.attribute("data-chef") }.uniq'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Filter prices',
    task: 'Return the prices that are at least 8, as integers.',
    scene: B,
    expected: [8, 9, 10, 8],
    solution: 'driver.find_elements(:css, ".price").map { |el| el.text.delete("$").to_i }.select { |n| n >= 8 }'
  });

  valueLevel({
    chapter: 'Extraction & Scraping',
    title: 'Scoped breakfast names',
    task: 'Return only breakfast dish names from the menu.',
    scene: MENU,
    expected: ['Pancakes', 'Waffles', 'Omelette'],
    solution: 'driver.find_element(:css, "[data-key=\'sec-breakfast\']").find_elements(:css, ".dish .food").map(&:text)'
  });

  outputLevel({
    chapter: 'Extraction & Scraping',
    title: 'CSV-style output',
    task: 'Print each menu dish as "Name,$price" on its own line.',
    scene: MENU,
    expected: ['Pancakes,$8', 'Waffles,$9', 'Omelette,$10', 'Cheeseburger,$12', 'Caesar Salad,$9', 'Grilled Cheese,$8', 'Steak,$24', 'Salmon,$20', 'Vegetable Curry,$14'],
    solution: 'driver.find_elements(:css, ".dish").each do |row|\n  puts row.find_element(:css, ".food").text + "," + row.find_element(:css, ".price").text\nend'
  });

  outputLevel({
    chapter: 'Extraction & Scraping',
    title: 'Order summaries',
    task: 'Print each customer and their item count as "Customer (count)".',
    scene: ORDERS,
    expected: ['Ada (2)', 'Grace (3)', 'Alan (1)'],
    solution: 'driver.find_elements(:css, ".order").each do |order|\n  puts order.find_element(:css, ".customer strong").text + " (" + order.find_elements(:css, ".item").count.to_s + ")"\nend'
  });

  outputLevel({
    chapter: 'Extraction & Scraping',
    title: 'While loop scraping',
    task: 'Use a while loop to print every ordered item name on its own line.',
    scene: ORDERS,
    expected: ['Pancakes', 'Coffee', 'Waffles', 'Fruit Bowl', 'Tea', 'Steak'],
    solution: 'items = driver.find_elements(:css, ".item")\ni = 0\nwhile i < items.count\n  puts items[i].text\n  i += 1\nend'
  });

  // =========================================================================
  // Chapter 8 - Actions, Waits & Navigation (20)
  // =========================================================================
  stateLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Click to add',
    task: 'Click the Add Pancakes button. The cart should contain 1 item.',
    scene: ACTION,
    state: { cart: 1 },
    solution: 'driver.find_element(:css, "[data-key=\'add-a1\']").click'
  });

  stateLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Two clicks',
    task: 'Add Waffles and Coffee to the cart.',
    scene: ACTION,
    state: { cart: 2 },
    solution: 'driver.find_element(:css, "[data-key=\'add-a2\']").click\ndriver.find_element(:css, "[data-key=\'add-a3\']").click'
  });

  stateLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Type a name',
    task: 'Type "Ada" into the Name input.',
    scene: FORM,
    state: { value: { key: 'f-name', equals: 'Ada' } },
    solution: 'driver.find_element(:id, "customer-name").send_keys("Ada")'
  });

  stateLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Type into two fields',
    task: 'Type "ada@example.com" into Email and "555-0100" into Phone.',
    scene: FORM,
    state: [
      { value: { key: 'f-email', equals: 'ada@example.com' } },
      { value: { key: 'f-phone', equals: '555-0100' } }
    ],
    solution: 'driver.find_element(:id, "customer-email").send_keys("ada@example.com")\ndriver.find_element(:id, "customer-phone").send_keys("555-0100")'
  });

  stateLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Uncheck a box',
    task: 'Click the Extra cheese checkbox to turn it off.',
    scene: FORM,
    state: { checked: { key: 'f-cheese', equals: false } },
    solution: 'driver.find_element(:id, "extra-cheese").click'
  });

  stateLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Clear an input',
    task: 'Clear the Quantity input.',
    scene: FORM,
    state: { value: { key: 'f-quantity', equals: '' } },
    solution: 'driver.find_element(:id, "quantity").clear'
  });

  stateLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Submit the form',
    task: 'Click the Place order button.',
    scene: FORM,
    state: { submitted: true },
    solution: 'driver.find_element(:id, "place-order").click'
  });

  stateLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Select by visible text',
    task: 'Select "Large" in the Size dropdown using Select#select_by_visible_text.',
    scene: FORM,
    state: { selected: { key: 'f-size', value: 'large', visibleText: 'Large' } },
    solution: 'sel = Select.new(driver.find_element(:id, "size"))\nsel.select_by_visible_text("Large")'
  });

  stateLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Select by value',
    task: 'Select the small size using Select#select_by_value.',
    scene: FORM,
    state: { selected: { key: 'f-size', value: 'small' } },
    solution: 'sel = Select.new(driver.find_element(:id, "size"))\nsel.select_by_value("small")'
  });

  stateLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Select by index',
    task: 'Select the first option using Select#select_by_index.',
    scene: FORM,
    state: { selected: { key: 'f-size', value: 'small', index: 0 } },
    solution: 'sel = Select.new(driver.find_element(:id, "size"))\nsel.select_by_index(0)'
  });

  stateLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Fill and submit',
    task: 'Type "Ada" into Name and "ada@example.com" into Email, select Large, check Vegan, then click Place order.',
    scene: FORM,
    state: [
      { value: { key: 'f-name', equals: 'Ada' } },
      { value: { key: 'f-email', equals: 'ada@example.com' } },
      { selected: { key: 'f-size', value: 'large' } },
      { checked: { key: 'f-vegan', equals: true } },
      { submitted: true }
    ],
    solution: 'driver.find_element(:id, "customer-name").send_keys("Ada")\ndriver.find_element(:id, "customer-email").send_keys("ada@example.com")\nsel = Select.new(driver.find_element(:id, "size"))\nsel.select_by_visible_text("Large")\ndriver.find_element(:id, "vegan").click\ndriver.find_element(:id, "place-order").click'
  });

  valueLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Sleep for a ticket',
    task: 'Sleep for 2 seconds, then return whether the "Fresh coffee" ticket is displayed.',
    scene: DELAYED,
    expected: true,
    solution: 'sleep 2\n driver.find_element(:css, "[data-key=\'w1\']").displayed?',
    hint: 'sleep takes seconds and advances the virtual clock.'
  });

  valueLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Wait then read text',
    task: 'Sleep for 3 seconds, then return the text of the "Hot pancakes" ticket.',
    scene: DELAYED,
    expected: 'Hot pancakes',
    solution: 'sleep 3\n driver.find_element(:css, "[data-key=\'w2\']").text'
  });

  valueLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Explicit wait',
    task: 'Use Selenium::WebDriver::Wait to wait until the "Hot pancakes" ticket is displayed, then return its text.',
    scene: DELAYED,
    expected: 'Hot pancakes',
    solution: 'wait = Selenium::WebDriver::Wait.new(timeout: 3)\nel = wait.until do\n  ticket = driver.find_element(:css, "[data-key=\'w2\']")\n  ticket.displayed? ? ticket : false\nend\nel.text',
    hint: 'Wait#until retries the block until it returns something truthy.'
  });

  stateLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Implicit wait',
    task: 'Set the implicit wait timeout to 4 seconds.',
    scene: DELAYED,
    state: { implicitWait: 4 },
    solution: 'driver.manage.timeouts.implicit_wait = 4'
  });

  selectLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Navigate and target',
    task: 'Navigate to the menu page, then select the first dish (Pancakes).',
    routes: ROUTES,
    startUrl: 'https://diners.example/',
    ids: ['m1'],
    mode: 'element',
    verify: [
      { kind: 'select', ids: ['m1'], mode: 'element' },
      { kind: 'state', state: { url: 'https://diners.example/menu' } }
    ],
    solution: 'driver.get("https://diners.example/menu")\ndriver.find_element(:css, "[data-key=\'m1\']")'
  });

  valueLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Navigate to specials',
    task: 'Navigate to the specials page with driver.navigate.to and return the page title.',
    routes: ROUTES,
    startUrl: 'https://diners.example/',
    expected: 'Daily Specials',
    solution: 'driver.navigate.to("https://diners.example/specials")\ndriver.title'
  });

  valueLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Go back',
    task: 'Open the menu, go back, and return the current URL.',
    routes: ROUTES,
    startUrl: 'https://diners.example/',
    expected: 'https://diners.example',
    solution: 'driver.get("https://diners.example/menu")\ndriver.navigate.back\ndriver.current_url'
  });

  valueLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Search the about page source',
    task: 'Go to the about page and return true if the page source contains "Since 1952".',
    routes: ROUTES,
    startUrl: 'https://diners.example/',
    expected: true,
    solution: 'driver.get("https://diners.example/about")\ndriver.page_source.include?("Since 1952")'
  });

  valueLevel({
    chapter: 'Actions, Waits & Navigation',
    title: 'Count dishes after navigation',
    task: 'Navigate to the menu and return the number of .dish elements.',
    routes: ROUTES,
    startUrl: 'https://diners.example/',
    expected: 9,
    solution: 'driver.get("https://diners.example/menu")\ndriver.find_elements(:css, ".dish").length'
  });

  // =========================================================================
  // Chapter 9 - Driver Setup & Lifecycle (4)
  // =========================================================================
  stateLevel({
    chapter: 'Driver Setup & Lifecycle',
    title: 'Start a Chrome session',
    task: 'Create a Chrome session with Selenium::WebDriver.for and assign it to driver.',
    scene: B,
    state: { driverType: 'chrome' },
    solution: 'driver = Selenium::WebDriver.for(:chrome)',
    hint: 'Selenium::WebDriver.for(:chrome) returns the session driver.',
    reference: 'driver = Selenium::WebDriver.for(:chrome)'
  });

  stateLevel({
    chapter: 'Driver Setup & Lifecycle',
    title: 'Configure headless mode',
    task: 'Start Chrome with the headless option enabled.',
    scene: B,
    state: { driverType: 'chrome', headless: true },
    solution: 'driver = Selenium::WebDriver.for(:chrome, { headless: true })',
    hint: 'Pass a hash as the second argument: { headless: true }.'
  });

  stateLevel({
    chapter: 'Driver Setup & Lifecycle',
    title: 'Set an implicit wait',
    task: 'Set the implicit wait timeout to 5 seconds.',
    scene: B,
    state: { implicitWait: 5 },
    solution: 'driver.manage.timeouts.implicit_wait = 5',
    hint: 'The setter lives under driver.manage.timeouts.',
    reference: 'driver.manage.timeouts.implicit_wait = 5'
  });

  stateLevel({
    chapter: 'Driver Setup & Lifecycle',
    title: 'Quit the session',
    task: 'Close the browser session when the scraper is finished.',
    scene: B,
    state: { quitFlag: true },
    solution: 'driver.quit',
    hint: 'driver.quit marks the session as finished.'
  });

  // =========================================================================
  // Chapter 10 - Secrets & Configuration (4)
  // =========================================================================
  valueLevel({
    chapter: 'Secrets & Configuration',
    title: 'Read a URL from ENV',
    task: 'Return the value of the DINER_URL environment variable.',
    scene: B,
    env: { DINER_URL: 'https://diners.example/menu' },
    expected: 'https://diners.example/menu',
    solution: 'ENV["DINER_URL"]',
    hint: 'ENV behaves like a hash: ENV["NAME"].'
  });

  valueLevel({
    chapter: 'Secrets & Configuration',
    title: 'Fall back to a safe default',
    task: 'Return DINER_MISSING, or the DINER_BASE value when it is nil.',
    scene: B,
    env: { DINER_BASE: 'https://diners.example' },
    expected: 'https://diners.example',
    solution: 'ENV["DINER_MISSING"] || ENV["DINER_BASE"]',
    hint: 'Ruby uses || for a nil fallback.'
  });

  stateLevel({
    chapter: 'Secrets & Configuration',
    title: 'Sign in with environment credentials',
    task: 'Use DINER_USER and DINER_PASS from ENV to sign in, then submit the form.',
    routes: ROUTES,
    startUrl: 'https://diners.example/login',
    env: { DINER_USER: 'ada', DINER_PASS: 'coffee' },
    state: { signedIn: true, url: 'https://diners.example/account' },
    solution: 'driver.find_element(:id, "login-username").send_keys(ENV["DINER_USER"])\ndriver.find_element(:id, "login-password").send_keys(ENV["DINER_PASS"])\ndriver.find_element(:id, "login-submit").click',
    hint: 'Read both secrets from ENV instead of hardcoding them.',
    reference: 'user = ENV["DINER_USER"]\npass = ENV["DINER_PASS"]'
  });

  stateLevel({
    chapter: 'Secrets & Configuration',
    title: 'Build a URL from configuration',
    task: 'Navigate to DINER_BASE plus /menu using string interpolation.',
    routes: ROUTES,
    startUrl: 'https://diners.example/',
    env: { DINER_BASE: 'https://diners.example' },
    state: { url: 'https://diners.example/menu', title: 'All-Day Menu' },
    solution: 'base = ENV["DINER_BASE"]\ndriver.get(base + "/menu")',
    hint: 'Build the URL by concatenating the configured base with "/menu".'
  });

  // =========================================================================
  // Chapter 11 - Login & Sessions (4)
  // =========================================================================
  stateLevel({
    chapter: 'Login & Sessions',
    title: 'Fill and submit the login form',
    task: 'Sign in as ada with the password coffee.',
    routes: ROUTES,
    startUrl: 'https://diners.example/login',
    state: { signedIn: true },
    solution: 'driver.find_element(:id, "login-username").send_keys("ada")\ndriver.find_element(:id, "login-password").send_keys("coffee")\ndriver.find_element(:id, "login-submit").click',
    hint: 'Use the username and password ids, then click the submit button.'
  });

  valueLevel({
    chapter: 'Login & Sessions',
    title: 'Protected pages redirect',
    task: 'Request the account page without signing in and return the resulting URL.',
    routes: ROUTES,
    startUrl: 'https://diners.example/login',
    expected: 'https://diners.example/login',
    solution: 'driver.get("https://diners.example/account")\ndriver.current_url',
    hint: 'Protected pages fall back to the login URL.'
  });

  valueLevel({
    chapter: 'Login & Sessions',
    title: 'Scrape the private ledger',
    task: 'Sign in and return the number of private plates on the account page.',
    routes: ROUTES,
    startUrl: 'https://diners.example/login',
    expected: 2,
    solution: 'driver.find_element(:id, "login-username").send_keys("ada")\ndriver.find_element(:id, "login-password").send_keys("coffee")\ndriver.find_element(:id, "login-submit").click\ndriver.find_elements(:css, ".private").length',
    hint: 'The login button navigates to the account page for you.'
  });

  stateLevel({
    chapter: 'Login & Sessions',
    title: 'Log out to clear the session',
    task: 'Sign in, then click Sign out so the session is cleared.',
    routes: ROUTES,
    startUrl: 'https://diners.example/login',
    state: { signedIn: false, url: 'https://diners.example/login' },
    solution: 'driver.find_element(:id, "login-username").send_keys("ada")\ndriver.find_element(:id, "login-password").send_keys("coffee")\ndriver.find_element(:id, "login-submit").click\ndriver.find_element(:id, "logout").click',
    hint: 'The logout button navigates back to the login page.'
  });

  // =========================================================================
  // Chapter 12 - Frames, Windows & Dialogs (4)
  // =========================================================================
  valueLevel({
    chapter: 'Frames, Windows & Dialogs',
    title: 'Read a heading inside a frame',
    task: 'Switch into the menu frame and return its heading text.',
    routes: ROUTES,
    startUrl: 'https://diners.example/contexts',
    expected: 'Frame Menu',
    solution: 'driver.switch_to.frame("menu")\ndriver.find_element(:id, "frame-title").text',
    hint: 'switch_to.frame accepts a frame id or name.'
  });

  valueLevel({
    chapter: 'Frames, Windows & Dialogs',
    title: 'Collect frame items',
    task: 'Switch into the menu frame and return the frame item texts.',
    routes: ROUTES,
    startUrl: 'https://diners.example/contexts',
    expected: ['Frame Pancakes', 'Frame Waffles'],
    solution: 'driver.switch_to.frame("menu")\ndriver.find_elements(:class_name, "frame-item").map(&:text)',
    hint: 'Find elements inside the frame, then map their text.'
  });

  stateLevel({
    chapter: 'Frames, Windows & Dialogs',
    title: 'Open and switch to a window',
    task: 'Open the specials window and switch to the new handle.',
    routes: ROUTES,
    startUrl: 'https://diners.example/contexts',
    state: { windowCount: 2, url: 'https://diners.example/specials' },
    solution: 'driver.find_element(:id, "open-specials").click\nhandle = driver.window_handles.last\ndriver.switch_to.window(handle)',
    hint: 'window_handles.last returns the newest window.'
  });

  stateLevel({
    chapter: 'Frames, Windows & Dialogs',
    title: 'Accept an alert',
    task: 'Trigger the alert and accept it.',
    routes: ROUTES,
    startUrl: 'https://diners.example/contexts',
    state: { alertAction: 'accepted' },
    solution: 'driver.find_element(:id, "show-alert").click\ndriver.switch_to.alert.accept',
    hint: 'driver.switch_to.alert exposes accept and dismiss.'
  });

  // =========================================================================
  // Chapter 13 - Screenshots, Uploads & Downloads (4)
  // =========================================================================
  stateLevel({
    chapter: 'Screenshots, Uploads & Downloads',
    title: 'Save a screenshot',
    task: 'Save a screenshot to evidence/menu.png.',
    routes: ROUTES,
    startUrl: 'https://diners.example/files',
    state: { screenshotPath: 'evidence/menu.png' },
    solution: 'driver.save_screenshot("evidence/menu.png")',
    hint: 'save_screenshot records the requested path.'
  });

  stateLevel({
    chapter: 'Screenshots, Uploads & Downloads',
    title: 'Upload a menu file',
    task: 'Attach /tmp/menu.csv to the file input.',
    routes: ROUTES,
    startUrl: 'https://diners.example/files',
    state: { uploadedFile: '/tmp/menu.csv' },
    solution: 'driver.find_element(:id, "menu-file").send_keys("/tmp/menu.csv")',
    hint: 'send_keys on a file input selects the file.'
  });

  stateLevel({
    chapter: 'Screenshots, Uploads & Downloads',
    title: 'Download the printable menu',
    task: 'Click the download button and keep the file name.',
    routes: ROUTES,
    startUrl: 'https://diners.example/files',
    state: { download: 'menu.pdf' },
    solution: 'driver.find_element(:id, "download-menu").click',
    hint: 'The button stores its data-file as the download name.'
  });

  stateLevel({
    chapter: 'Screenshots, Uploads & Downloads',
    title: 'Capture the whole workflow',
    task: 'Upload /tmp/menu.csv, download menu.pdf, and save a screenshot to evidence/files.png.',
    routes: ROUTES,
    startUrl: 'https://diners.example/files',
    state: [
      { uploadedFile: '/tmp/menu.csv' },
      { download: 'menu.pdf' },
      { screenshotPath: 'evidence/files.png' }
    ],
    solution: 'driver.find_element(:id, "menu-file").send_keys("/tmp/menu.csv")\ndriver.find_element(:id, "download-menu").click\ndriver.save_screenshot("evidence/files.png")',
    hint: 'All three actions use the same page.'
  });

  // =========================================================================
  // Chapter 14 - Dynamic Pages & Robustness (4)
  // =========================================================================
  valueLevel({
    chapter: 'Dynamic Pages & Robustness',
    title: 'Wait for the coffee ticket',
    task: 'Wait 2 virtual seconds, then return true if the coffee ticket is displayed.',
    scene: DELAYED,
    expected: true,
    solution: 'driver.sleep(2)\ndriver.find_element(:id, "w1").displayed?',
    hint: 'The first delayed ticket appears at 1500ms.'
  });

  valueLevel({
    chapter: 'Dynamic Pages & Robustness',
    title: 'Wait for the check',
    task: 'Wait 5 virtual seconds and return the text of the final ticket.',
    scene: DELAYED,
    expected: 'The check',
    solution: 'driver.sleep(5)\ndriver.find_element(:id, "w3").text',
    hint: 'The check appears at 4500ms.'
  });

  valueLevel({
    chapter: 'Dynamic Pages & Robustness',
    title: 'Count ready tickets',
    task: 'Wait 5 seconds and return how many tickets are marked data-ready.',
    scene: DELAYED,
    expected: 3,
    solution: 'driver.sleep(5)\ndriver.find_elements(:css, "[data-ready=\'true\']").length',
    hint: 'Three delayed tickets become ready; the status ticket does not.'
  });

  valueLevel({
    chapter: 'Dynamic Pages & Robustness',
    title: 'Poll after a longer delay',
    task: 'Sleep for 4.5 seconds and return true if the final ticket is displayed.',
    scene: DELAYED,
    expected: true,
    solution: 'driver.sleep(4.5)\ndriver.find_element(:id, "w3").displayed?',
    hint: 'Fractions of a virtual second are allowed.'
  });

  // =========================================================================
  // Chapter 15 - Pagination & Crawling (4)
  // =========================================================================
  valueLevel({
    chapter: 'Pagination & Crawling',
    title: 'Read page two',
    task: 'Navigate to menu page 2 and return its heading text.',
    routes: ROUTES,
    startUrl: 'https://diners.example/menu/page/1',
    expected: 'Menu Page 2',
    solution: 'driver.get("https://diners.example/menu/page/2")\ndriver.find_element(:id, "page-title").text',
    hint: 'Page headings use the id page-title.'
  });

  stateLevel({
    chapter: 'Pagination & Crawling',
    title: 'Follow the next link',
    task: 'Click the next link on menu page 1.',
    routes: ROUTES,
    startUrl: 'https://diners.example/menu/page/1',
    state: { url: 'https://diners.example/menu/page/2' },
    solution: 'driver.find_element(:css, ".next").click',
    hint: 'The next link has the class next.'
  });

  valueLevel({
    chapter: 'Pagination & Crawling',
    title: 'Collect page one dishes',
    task: 'Return the dish names on menu page 1.',
    routes: ROUTES,
    startUrl: 'https://diners.example/menu/page/1',
    expected: ['Pancakes', 'Waffles', 'Omelette'],
    solution: 'driver.find_elements(:css, ".dish").map(&:text)',
    hint: 'Each dish is a li.dish.'
  });

  outputLevel({
    chapter: 'Pagination & Crawling',
    title: 'Crawl every menu page',
    task: 'Start at page 1, follow next links until none remain, and print each dish name.',
    routes: ROUTES,
    startUrl: 'https://diners.example/menu/page/1',
    expected: ['Pancakes', 'Waffles', 'Omelette', 'Cheeseburger', 'Caesar Salad', 'Grilled Cheese', 'Steak', 'Salmon', 'Vegetable Curry'],
    solution: 'names = []\ndriver.get("https://diners.example/menu/page/1")\nwhile true\n  driver.find_elements(:css, ".dish").each { |dish| names << dish.text }\n  links = driver.find_elements(:css, ".next")\n  break if links.empty?\n  links.first.click\nend\nputs names',
    hint: 'Collect before checking for the next link.'
  });

  // =========================================================================
  // Chapter 16 - Shadow DOM & Advanced DOM (4)
  // =========================================================================
  valueLevel({
    chapter: 'Shadow DOM & Advanced DOM',
    title: 'Read inside a shadow root',
    task: 'Return the shadow root heading text from the shadow host.',
    routes: ROUTES,
    startUrl: 'https://diners.example/shadow',
    expected: 'Shadow Root Menu',
    solution: 'host = driver.find_element(:id, "shadow-menu")\nhost.shadow_root.find_element(:css, "h2").text',
    hint: 'Call shadow_root on the host, then find inside it.'
  });

  valueLevel({
    chapter: 'Shadow DOM & Advanced DOM',
    title: 'Collect shadow dishes',
    task: 'Return the dish names inside the shadow root.',
    routes: ROUTES,
    startUrl: 'https://diners.example/shadow',
    expected: ['Shadow Pancakes', 'Shadow Waffles'],
    solution: 'host = driver.find_element(:id, "shadow-menu")\nhost.shadow_root.find_elements(:css, ".dish-name").map(&:text)',
    hint: 'Search for .dish-name inside the shadow root.'
  });

  valueLevel({
    chapter: 'Shadow DOM & Advanced DOM',
    title: 'Count shadow dishes only',
    task: 'Return the number of .dish elements inside the shadow root.',
    routes: ROUTES,
    startUrl: 'https://diners.example/shadow',
    expected: 2,
    solution: 'host = driver.find_element(:id, "shadow-menu")\nhost.shadow_root.find_elements(:css, ".dish").length',
    hint: 'The light DOM decoy is outside the shadow root.'
  });

  outputLevel({
    chapter: 'Shadow DOM & Advanced DOM',
    title: 'Compare shadow and light DOM',
    task: 'Print the shadow dish names, then print the light DOM decoy text.',
    routes: ROUTES,
    startUrl: 'https://diners.example/shadow',
    expected: ['Shadow Pancakes', 'Shadow Waffles', 'Light Pancakes'],
    solution: 'host = driver.find_element(:id, "shadow-menu")\nputs host.shadow_root.find_elements(:css, ".dish-name").map(&:text)\nputs driver.find_element(:css, ".light-dish").text',
    hint: 'Both trees exist; search the correct root.'
  });

  // =========================================================================
  // Chapter 17 - Page Objects & Reusable Scrapers (4)
  // =========================================================================
  valueLevel({
    chapter: 'Page Objects & Reusable Scrapers',
    title: 'Use a locator map',
    task: 'Store a title locator in a hash and use it to return the page heading.',
    routes: ROUTES,
    startUrl: 'https://diners.example/menu/page/2',
    expected: 'Menu Page 2',
    solution: 'page = { title: { id: "page-title" } }\ndriver.find_element(page[:title]).text',
    hint: 'A hash can hold a locator: { id: "page-title" }.'
  });

  valueLevel({
    chapter: 'Page Objects & Reusable Scrapers',
    title: 'Reuse a dish locator',
    task: 'Store the dish locator in a hash and return how many dishes it finds.',
    routes: ROUTES,
    startUrl: 'https://diners.example/menu/page/2',
    expected: 3,
    solution: 'page = { dishes: { css: ".dish" } }\ndriver.find_elements(page[:dishes]).length',
    hint: 'find_elements accepts a locator hash too.'
  });

  outputLevel({
    chapter: 'Page Objects & Reusable Scrapers',
    title: 'Build a page map',
    task: 'Use a locator map for the title and dishes, then print the title and dish count.',
    routes: ROUTES,
    startUrl: 'https://diners.example/menu/page/3',
    expected: ['Menu Page 3', '3'],
    solution: 'page = { title: { css: ".scene-title" }, dishes: { css: ".dish" } }\nputs driver.find_element(page[:title]).text\nputs driver.find_elements(page[:dishes]).length',
    hint: 'Reuse each locator through the page hash.'
  });

  valueLevel({
    chapter: 'Page Objects & Reusable Scrapers',
    title: 'Symbol keys in a locator map',
    task: 'Build a locator map with symbol keys and return the page title.',
    routes: ROUTES,
    startUrl: 'https://diners.example/menu/page/1',
    expected: 'Menu Page 1',
    solution: 'locators = { :title => { :id => "page-title" } }\ndriver.find_element(locators[:title]).text',
    hint: 'Both title: and :title => forms work for hash keys.'
  });

  // =========================================================================
  // Chapter 18 - Diagnostics (4)
  // =========================================================================
  valueLevel({
    chapter: 'Diagnostics',
    title: 'Search the page source',
    task: 'Return true if the menu page source contains Pancakes.',
    scene: MENU,
    expected: true,
    solution: 'driver.page_source.include?("Pancakes")',
    hint: 'page_source returns the current markup as a string.'
  });

  outputLevel({
    chapter: 'Diagnostics',
    title: 'Log the current URL',
    task: 'Print the current URL of the menu page.',
    scene: MENU,
    expected: ['https://diners.example/menu'],
    solution: 'puts driver.current_url',
    hint: 'current_url is a useful diagnostic breadcrumb.'
  });

  valueLevel({
    chapter: 'Diagnostics',
    title: 'Verify title after navigation',
    task: 'Open the home page, click the View the menu link, and return the title.',
    routes: ROUTES,
    startUrl: 'https://diners.example/',
    expected: 'All-Day Menu',
    solution: 'driver.get("https://diners.example/")\ndriver.find_element(:link_text, "View the menu").click\ndriver.title',
    hint: 'Link text includes the leading View the menu phrase.'
  });

  stateLevel({
    chapter: 'Diagnostics',
    title: 'Capture failure evidence',
    task: 'Navigate to the menu and save a screenshot to evidence/diagnostics.png.',
    routes: ROUTES,
    startUrl: 'https://diners.example/',
    state: { url: 'https://diners.example/menu', screenshotPath: 'evidence/diagnostics.png' },
    solution: 'driver.get("https://diners.example/menu")\ndriver.save_screenshot("evidence/diagnostics.png")',
    hint: 'Record both where you were and what you saw.'
  });

  // =========================================================================
  // Chapter 19 - Structured Extraction & Export (4)
  // =========================================================================
  outputLevel({
    chapter: 'Structured Extraction & Export',
    title: 'Print structured dish names',
    task: 'Print every dish name on the menu, one per line.',
    scene: MENU,
    expected: ['Pancakes', 'Waffles', 'Omelette', 'Cheeseburger', 'Caesar Salad', 'Grilled Cheese', 'Steak', 'Salmon', 'Vegetable Curry'],
    solution: 'driver.find_elements(:css, ".dish .food").map(&:text).each { |name| puts name }',
    hint: 'The .food span holds the display name.'
  });

  valueLevel({
    chapter: 'Structured Extraction & Export',
    title: 'Build record hashes',
    task: 'Return one hash per dish with name and price text.',
    scene: MENU,
    expected: [
      { name: 'Pancakes', price: '$8' },
      { name: 'Waffles', price: '$9' },
      { name: 'Omelette', price: '$10' },
      { name: 'Cheeseburger', price: '$12' },
      { name: 'Caesar Salad', price: '$9' },
      { name: 'Grilled Cheese', price: '$8' },
      { name: 'Steak', price: '$24' },
      { name: 'Salmon', price: '$20' },
      { name: 'Vegetable Curry', price: '$14' }
    ],
    solution: 'driver.find_elements(:css, ".dish").map { |dish| { name: dish.find_element(:css, ".food").text, price: dish.find_element(:css, ".price").text } }',
    hint: 'Map each dish to a name/price hash.'
  });

  stateLevel({
    chapter: 'Structured Extraction & Export',
    title: 'Write a JSON export',
    task: 'Write the dish names as JSON to out/menu.json.',
    scene: MENU,
    state: { file: { name: 'out/menu.json', contains: 'Pancakes' } },
    solution: 'names = driver.find_elements(:css, ".food").map(&:text)\nFile.write("out/menu.json", JSON.generate(names))',
    hint: 'JSON.generate turns an array into a JSON string.'
  });

  stateLevel({
    chapter: 'Structured Extraction & Export',
    title: 'Write a CSV export',
    task: 'Write the first three dish names as a comma-separated file at out/menu.csv.',
    scene: MENU,
    state: { file: { name: 'out/menu.csv', contains: 'Pancakes,Waffles,Omelette' } },
    solution: 'names = driver.find_elements(:css, ".food").map(&:text).first(3)\nFile.write("out/menu.csv", names.join(","))',
    hint: 'Array#join inserts commas between values.'
  });

  // =========================================================================
  // Chapter 20 - Network/API Scraping & Errors (4)
  // =========================================================================
  valueLevel({
    chapter: 'Network/API Scraping & Errors',
    title: 'Count API records',
    task: 'Fetch the menu JSON endpoint and return how many records it contains.',
    scene: B,
    api: S.apiRoutes,
    expected: 3,
    solution: 'response = Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json"))\nJSON.parse(response.body).length',
    hint: 'Parse response.body with JSON.parse.'
  });

  valueLevel({
    chapter: 'Network/API Scraping & Errors',
    title: 'Read a success status',
    task: 'Return the HTTP status code string for the menu endpoint.',
    scene: B,
    api: S.apiRoutes,
    expected: '200',
    solution: 'response = Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json"))\nresponse.code',
    hint: 'response.code returns a string such as "200".'
  });

  valueLevel({
    chapter: 'Network/API Scraping & Errors',
    title: 'Detect a missing endpoint',
    task: 'Return the status code for the missing JSON endpoint.',
    scene: B,
    api: S.apiRoutes,
    expected: '404',
    solution: 'response = Net::HTTP.get_response(URI.parse("https://diners.example/api/missing.json"))\nresponse.code',
    hint: 'A missing endpoint responds with 404 instead of raising.'
  });

  valueLevel({
    chapter: 'Network/API Scraping & Errors',
    title: 'Extract names from JSON',
    task: 'Parse the menu endpoint and return the record names.',
    scene: B,
    api: S.apiRoutes,
    expected: ['Pancakes', 'Coffee', 'Steak'],
    solution: 'response = Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json"))\nJSON.parse(response.body).map { |item| item["name"] }',
    hint: 'Each record is a hash with a name key.'
  });

  // =========================================================================
  // Chapter 21 - Data Normalization (4)
  // =========================================================================
  valueLevel({
    chapter: 'Data Normalization',
    title: 'Normalize a messy name',
    task: 'Return the raw name stripped, collapsed to single spaces, and downcased.',
    routes: ROUTES,
    startUrl: 'https://diners.example/messy',
    expected: 'ada lovelace',
    solution: 'raw = driver.find_element(:id, "messy-name").attribute("data-raw")\nraw.strip.split(/\\s+/).join(" ").downcase',
    hint: 'Use strip, split(/\\s+/), join, and downcase.'
  });

  valueLevel({
    chapter: 'Data Normalization',
    title: 'Parse a price',
    task: 'Return the messy price as a number.',
    routes: ROUTES,
    startUrl: 'https://diners.example/messy',
    expected: 1234.5,
    solution: 'raw = driver.find_element(:id, "messy-price").attribute("data-raw")\nraw.gsub(/[$,]/, "").to_f',
    hint: 'Remove dollar signs and commas before to_f.'
  });

  valueLevel({
    chapter: 'Data Normalization',
    title: 'Reformat a date',
    task: 'Return the date as DD/MM/YYYY.',
    routes: ROUTES,
    startUrl: 'https://diners.example/messy',
    expected: '04/11/2026',
    solution: 'raw = driver.find_element(:id, "messy-date").attribute("data-raw")\nraw.split("-").reverse.join("/")',
    hint: 'Split on dashes, reverse the parts, then join with slashes.'
  });

  valueLevel({
    chapter: 'Data Normalization',
    title: 'Keep only phone digits',
    task: 'Return the phone number with all non-digit characters removed.',
    routes: ROUTES,
    startUrl: 'https://diners.example/messy',
    expected: '5550100100',
    solution: 'raw = driver.find_element(:id, "messy-phone").attribute("data-raw")\nraw.gsub(/\\D/, "")',
    hint: 'The \\D pattern matches non-digits.'
  });

  // =========================================================================
  // Chapter 22 - Persistence & Resume (4)
  // =========================================================================
  stateLevel({
    chapter: 'Persistence & Resume',
    title: 'Write a checkpoint',
    task: 'Save a checkpoint hash with page 2 to out/checkpoint.json.',
    scene: B,
    state: { file: { name: 'out/checkpoint.json', contains: '{"page":2}' } },
    solution: 'File.write("out/checkpoint.json", JSON.generate({ page: 2 }))',
    hint: 'JSON.generate can serialize a hash.'
  });

  valueLevel({
    chapter: 'Persistence & Resume',
    title: 'Read a checkpoint',
    task: 'Load out/checkpoint.json and return its page value.',
    scene: B,
    files: { 'out/checkpoint.json': '{"page":3}' },
    expected: 3,
    solution: 'checkpoint = JSON.parse(File.read("out/checkpoint.json"))\ncheckpoint["page"]',
    hint: 'File.read returns the saved string.'
  });

  stateLevel({
    chapter: 'Persistence & Resume',
    title: 'Resume from a checkpoint',
    task: 'Read page 2 from out/checkpoint.json and navigate there.',
    routes: ROUTES,
    startUrl: 'https://diners.example/menu/page/1',
    env: { DINER_BASE: 'https://diners.example' },
    files: { 'out/checkpoint.json': '{"page":2}' },
    state: { url: 'https://diners.example/menu/page/2' },
    solution: 'checkpoint = JSON.parse(File.read("out/checkpoint.json"))\npage = checkpoint["page"]\nbase = ENV["DINER_BASE"]\ndriver.get(base + "/menu/page/" + page.to_s)',
    hint: 'Combine the saved page with your configured base URL.'
  });

  outputLevel({
    chapter: 'Persistence & Resume',
    title: 'Print saved progress',
    task: 'Read out/job.json and print the page number, then the completed dishes joined by commas.',
    scene: B,
    files: { 'out/job.json': '{"page":3,"done":["Pancakes","Waffles"]}' },
    expected: ['3', 'Pancakes,Waffles'],
    solution: 'job = JSON.parse(File.read("out/job.json"))\nputs job["page"]\nputs job["done"].join(",")',
    hint: 'The done value is an array.'
  });

  // =========================================================================
  // Chapter 23 - Scheduling & Scale (4)
  // =========================================================================
  valueLevel({
    chapter: 'Scheduling & Scale',
    title: 'Sum a whole menu',
    task: 'Return the total price of every dish on the menu.',
    scene: MENU,
    expected: 114,
    solution: 'driver.find_elements(:css, ".price").map { |price| price.text.gsub("$", "").to_f }.sum',
    hint: 'Strip the dollar sign, convert to a number, then sum.'
  });

  outputLevel({
    chapter: 'Scheduling & Scale',
    title: 'Batch across pages',
    task: 'Crawl all three menu pages and print the total dish count.',
    routes: ROUTES,
    startUrl: 'https://diners.example/menu/page/1',
    expected: ['9'],
    solution: 'total = 0\ndriver.get("https://diners.example/menu/page/1")\nwhile true\n  total += driver.find_elements(:css, ".dish").length\n  links = driver.find_elements(:css, ".next")\n  break if links.empty?\n  links.first.click\nend\nputs total',
    hint: 'Accumulate the count before following the next link.'
  });

  stateLevel({
    chapter: 'Scheduling & Scale',
    title: 'Pace requests',
    task: 'Wait 2 virtual seconds before continuing.',
    scene: B,
    state: { clock: 2000 },
    solution: 'driver.sleep(2)',
    hint: 'sleep advances the virtual clock.'
  });

  outputLevel({
    chapter: 'Scheduling & Scale',
    title: 'Batch API statuses',
    task: 'Fetch both endpoints and print their status codes in order.',
    scene: B,
    api: S.apiRoutes,
    expected: ['200', '404'],
    solution: 'urls = ["https://diners.example/api/menu.json", "https://diners.example/api/missing.json"]\nputs urls.map { |url| Net::HTTP.get_response(URI.parse(url)).code }',
    hint: 'Map each URL to its response code.'
  });

  // =========================================================================
  // Chapter 24 - Compliance Capstone (4)
  // =========================================================================
  valueLevel({
    chapter: 'Compliance Capstone',
    title: 'Read robots.txt',
    task: 'Return true if robots.txt asks for a crawl delay of 2 seconds.',
    scene: B,
    api: S.apiRoutes,
    expected: true,
    solution: 'response = Net::HTTP.get_response(URI.parse("https://diners.example/robots.txt"))\nresponse.body.include?("Crawl-delay: 2")',
    hint: 'Check the robots.txt body for the crawl-delay line.'
  });

  valueLevel({
    chapter: 'Compliance Capstone',
    title: 'Read the terms',
    task: 'Return true if the terms mention Personal use only.',
    routes: ROUTES,
    startUrl: 'https://diners.example/compliance',
    expected: true,
    solution: 'driver.find_element(:class_name, "terms").text.include?("Personal use only")',
    hint: 'The terms paragraph has class terms.'
  });

  stateLevel({
    chapter: 'Compliance Capstone',
    title: 'Honor the crawl delay',
    task: 'Wait 2 virtual seconds before making the next request.',
    routes: ROUTES,
    startUrl: 'https://diners.example/compliance',
    state: { clock: 2000 },
    solution: 'driver.sleep(2)',
    hint: 'robots.txt asked for a 2 second crawl delay.'
  });

  stateLevel({
    chapter: 'Compliance Capstone',
    title: 'Compliant end-to-end run',
    task: 'Sign in, wait 2 seconds, scrape private orders to out/compliance.json, and save out/compliance.png.',
    routes: ROUTES,
    startUrl: 'https://diners.example/login',
    state: [
      { signedIn: true, url: 'https://diners.example/account' },
      { clock: 2000 },
      { screenshotPath: 'out/compliance.png' },
      { file: { name: 'out/compliance.json', contains: 'Secret Pancakes' } }
    ],
    solution: 'driver.find_element(:id, "login-username").send_keys("ada")\ndriver.find_element(:id, "login-password").send_keys("coffee")\ndriver.find_element(:id, "login-submit").click\ndriver.sleep(2)\norders = driver.find_elements(:css, ".private").map(&:text)\ndriver.save_screenshot("out/compliance.png")\nFile.write("out/compliance.json", JSON.generate(orders))',
    hint: 'Combine login, pacing, extraction, and evidence in one script.'
  });

  function addDrill(chapter, spec) {
    const options = Object.assign({ chapter, scene: B, requiredStrategy: null }, spec);
    options.explanation = options.explanation || options.hint || '';
    if (spec.kind === 'state') return stateLevel(options);
    if (spec.kind === 'output') return outputLevel(options);
    if (spec.kind === 'select') return selectLevel(options);
    return valueLevel(options);
  }

  function chapterCount(chapter) {
    return LEVELS.filter((level) => level.chapter === chapter).length;
  }

  function addMissing(chapter, specs, target) {
    const goal = target || 25;
    const needed = goal - chapterCount(chapter);
    specs.slice(0, Math.max(0, needed)).forEach((spec) => addDrill(chapter, spec));
  }

  // =========================================================================
  // Part 2 expansion - Browser Workflows (200 total)
  // =========================================================================
  (() => {
    const chapter = 'Driver Setup & Lifecycle';
    const specs = [];
    ['firefox', 'safari', 'edge', 'remote'].forEach((type) => {
      specs.push({
        title: `Start a ${type} session`,
        task: `Create a ${type} session and leave it assigned to driver.`,
        state: { driverType: type },
        solution: `driver = Selenium::WebDriver.for(:${type})`
      });
    });
    ['chrome', 'firefox', 'safari', 'edge'].forEach((type) => {
      specs.push({
        title: `Headless ${type} session`,
        task: `Create a headless ${type} session.`,
        state: { driverType: type, headless: true },
        solution: `driver = Selenium::WebDriver.for(:${type}, { headless: true })`
      });
    });
    ['chrome', 'firefox', 'safari', 'edge'].forEach((type) => {
      specs.push({
        title: `${type} with headless disabled`,
        task: `Create a ${type} session with headless explicitly disabled.`,
        state: { driverType: type, headless: false },
        solution: `driver = Selenium::WebDriver.for(:${type}, { headless: false })`
      });
    });
    [0, 1, 2, 3, 10].forEach((seconds) => {
      specs.push({
        title: `Implicit wait of ${seconds}s`,
        task: `Set the implicit wait timeout to ${seconds} seconds.`,
        state: { implicitWait: seconds },
        solution: `driver.manage.timeouts.implicit_wait = ${seconds}`
      });
    });
    specs.push({
      title: 'End with quit',
      task: 'Finish the session with quit.',
      state: { quitFlag: true },
      solution: 'driver.quit'
    });
    specs.push({
      title: 'End with close',
      task: 'Finish the session with close.',
      state: { quitFlag: true },
      solution: 'driver.close'
    });
    specs.push({
      title: 'Open the menu directly',
      task: 'Navigate to the menu page and leave the browser there.',
      routes: ROUTES,
      startUrl: 'https://diners.example/',
      state: { url: 'https://diners.example/menu', title: 'All-Day Menu' },
      solution: 'driver.get("https://diners.example/menu")'
    });
    specs.push({
      title: 'Open the about page directly',
      task: 'Navigate to the about page and leave the browser there.',
      routes: ROUTES,
      startUrl: 'https://diners.example/',
      state: { url: 'https://diners.example/about', title: 'About the Diner' },
      solution: 'driver.get("https://diners.example/about")'
    });
    addMissing(chapter, specs);
  })();

  (() => {
    const chapter = 'Secrets & Configuration';
    const specs = [];
    const envReads = [
      ['DINER_HOST', 'https://diners.example'],
      ['DINER_PATH', '/menu'],
      ['DINER_USER', 'ada'],
      ['DINER_PASS', 'coffee'],
      ['DINER_REGION', 'north'],
      ['DINER_FORMAT', 'json'],
      ['DINER_BATCH', '4']
    ];
    envReads.forEach(([key, value]) => {
      specs.push({
        title: `Read ${key}`,
        task: `Return the ${key} environment variable.`,
        env: { [key]: value },
        expected: value,
        solution: `ENV["${key}"]`
      });
    });
    [1, 2, 3, 4].forEach((index) => {
      specs.push({
        title: `Fallback configuration ${index}`,
        task: `Return DINER_MISSING_${index}, or DINER_BASE when it is nil.`,
        env: { DINER_BASE: 'https://diners.example' },
        expected: 'https://diners.example',
        solution: `ENV["DINER_MISSING_${index}"] || ENV["DINER_BASE"]`
      });
    });
    [1, 2, 3].forEach((index) => {
      specs.push({
        title: `Environment login ${index}`,
        task: 'Sign in using DINER_USER and DINER_PASS from ENV.',
        routes: ROUTES,
        startUrl: 'https://diners.example/login',
        env: { DINER_USER: 'ada', DINER_PASS: 'coffee' },
        state: { signedIn: true, url: 'https://diners.example/account' },
        solution: 'driver.find_element(:id, "login-username").send_keys(ENV["DINER_USER"])\ndriver.find_element(:id, "login-password").send_keys(ENV["DINER_PASS"])\ndriver.find_element(:id, "login-submit").click'
      });
    });
    ['/menu', '/files', '/compliance', '/about'].forEach((path) => {
      specs.push({
        title: `Build the ${path} URL`,
        task: `Navigate to DINER_BASE plus ${path}.`,
        routes: ROUTES,
        startUrl: 'https://diners.example/',
        env: { DINER_BASE: 'https://diners.example' },
        state: { url: `https://diners.example${path}` },
        solution: `base = ENV["DINER_BASE"]\ndriver.get(base + "${path}")`
      });
    });
    [1, 2, 3].forEach((index) => {
      specs.push({
        title: `Explicit override ${index}`,
        task: 'Return OVERRIDE when present, otherwise DINER_BASE.',
        env: { OVERRIDE: `https://override-${index}.example`, DINER_BASE: 'https://diners.example' },
        expected: `https://override-${index}.example`,
        solution: 'ENV["OVERRIDE"] || ENV["DINER_BASE"]'
      });
    });
    addMissing(chapter, specs);
  })();

  (() => {
    const chapter = 'Login & Sessions';
    const specs = [];
    const login = 'driver.find_element(:id, "login-username").send_keys("ada")\ndriver.find_element(:id, "login-password").send_keys("coffee")\ndriver.find_element(:id, "login-submit").click';
    [1, 2, 3].forEach((index) => {
      specs.push({
        title: `Sign in directly ${index}`,
        task: 'Fill the login form with ada / coffee and submit it.',
        routes: ROUTES,
        startUrl: 'https://diners.example/login',
        state: { signedIn: true },
        solution: login
      });
    });
    [1, 2].forEach((index) => {
      specs.push({
        title: `Protected redirect ${index}`,
        task: 'Request the protected account page while signed out and return the resulting URL.',
        routes: ROUTES,
        startUrl: 'https://diners.example/login',
        expected: 'https://diners.example/login',
        solution: 'driver.get("https://diners.example/account")\ndriver.current_url'
      });
    });
    [1, 2, 3].forEach((index) => {
      specs.push({
        title: `Count private plates ${index}`,
        task: 'Sign in and return the number of private plates.',
        routes: ROUTES,
        startUrl: 'https://diners.example/login',
        expected: 2,
        solution: `${login}\ndriver.find_elements(:css, ".private").length`
      });
    });
    [1, 2, 3].forEach((index) => {
      specs.push({
        title: `Read the welcome message ${index}`,
        task: 'Sign in and return the account welcome message.',
        routes: ROUTES,
        startUrl: 'https://diners.example/login',
        expected: 'Welcome, ada',
        solution: `${login}\ndriver.find_element(:id, "account-welcome").text`
      });
    });
    [1, 2, 3].forEach((index) => {
      specs.push({
        title: `Account page title ${index}`,
        task: 'Sign in and return the page title.',
        routes: ROUTES,
        startUrl: 'https://diners.example/login',
        expected: 'Order Ledger',
        solution: `${login}\ndriver.title`
      });
    });
    [1, 2, 3].forEach((index) => {
      specs.push({
        title: `Log out cleanly ${index}`,
        task: 'Sign in, then log out and end on the login page signed out.',
        routes: ROUTES,
        startUrl: 'https://diners.example/login',
        state: { signedIn: false, url: 'https://diners.example/login' },
        solution: `${login}\ndriver.find_element(:id, "logout").click`
      });
    });
    [1, 2].forEach((index) => {
      specs.push({
        title: `Count ledger rows ${index}`,
        task: 'Sign in and count the elements inside the account table.',
        routes: ROUTES,
        startUrl: 'https://diners.example/login',
        expected: 2,
        solution: `${login}\ndriver.find_elements(:css, "#account-table .plate").length`
      });
    });
    [1, 2].forEach((index) => {
      specs.push({
        title: `Capture login evidence ${index}`,
        task: 'Sign in and save a screenshot to out/account.png.',
        routes: ROUTES,
        startUrl: 'https://diners.example/login',
        state: { signedIn: true, screenshotPath: 'out/account.png' },
        solution: `${login}\ndriver.save_screenshot("out/account.png")`
      });
    });
    addMissing(chapter, specs);
  })();

  (() => {
    const chapter = 'Frames, Windows & Dialogs';
    const specs = [];
    [1, 2].forEach((index) => {
      specs.push({
        title: `Menu frame heading ${index}`,
        task: 'Switch into the menu frame and return its heading text.',
        routes: ROUTES,
        startUrl: 'https://diners.example/contexts',
        expected: 'Frame Menu',
        solution: 'driver.switch_to.frame("menu")\ndriver.find_element(:id, "frame-title").text'
      });
    });
    [1, 2].forEach((index) => {
      specs.push({
        title: `Specials frame heading ${index}`,
        task: 'Switch into the specials frame and return its heading text.',
        routes: ROUTES,
        startUrl: 'https://diners.example/contexts',
        expected: 'Specials Frame',
        solution: 'driver.switch_to.frame("specials")\ndriver.find_element(:id, "specials-frame-title").text'
      });
    });
    [1, 2].forEach((index) => {
      specs.push({
        title: `Specials frame note ${index}`,
        task: 'Switch into the specials frame and return its note text.',
        routes: ROUTES,
        startUrl: 'https://diners.example/contexts',
        expected: 'Blue plate only',
        solution: 'driver.switch_to.frame("specials")\ndriver.find_element(:id, "frame-note").text'
      });
    });
    [1, 2].forEach((index) => {
      specs.push({
        title: `Collect frame items ${index}`,
        task: 'Switch into the menu frame and return all frame item texts.',
        routes: ROUTES,
        startUrl: 'https://diners.example/contexts',
        expected: ['Frame Pancakes', 'Frame Waffles'],
        solution: 'driver.switch_to.frame("menu")\ndriver.find_elements(:class_name, "frame-item").map(&:text)'
      });
    });
    [1, 2].forEach((index) => {
      specs.push({
        title: `First frame item ${index}`,
        task: 'Switch into the menu frame and return the first frame item text.',
        routes: ROUTES,
        startUrl: 'https://diners.example/contexts',
        expected: 'Frame Pancakes',
        solution: 'driver.switch_to.frame("menu")\ndriver.find_elements(:class_name, "frame-item").first.text'
      });
    });
    [1, 2].forEach((index) => {
      specs.push({
        title: `Frame item count ${index}`,
        task: 'Switch into the menu frame and return the number of frame items.',
        routes: ROUTES,
        startUrl: 'https://diners.example/contexts',
        expected: 2,
        solution: 'driver.switch_to.frame("menu")\ndriver.find_elements(:class_name, "frame-item").length'
      });
    });
    [1, 2].forEach((index) => {
      specs.push({
        title: `Return to default content ${index}`,
        task: 'Switch into the menu frame, then back to the default content and return the main heading.',
        routes: ROUTES,
        startUrl: 'https://diners.example/contexts',
        expected: 'Contexts Lab',
        solution: 'driver.switch_to.frame("menu")\ndriver.switch_to.default_content\ndriver.find_element(:id, "contexts-main").text'
      });
    });
    [1, 2].forEach((index) => {
      specs.push({
        title: `Open a window ${index}`,
        task: 'Open the specials window and return the window count.',
        routes: ROUTES,
        startUrl: 'https://diners.example/contexts',
        expected: 2,
        solution: 'driver.find_element(:id, "open-specials").click\ndriver.window_handles.length'
      });
    });
    [1, 2].forEach((index) => {
      specs.push({
        title: `Switch to specials ${index}`,
        task: 'Open the specials window, switch to it, and return the current URL.',
        routes: ROUTES,
        startUrl: 'https://diners.example/contexts',
        expected: 'https://diners.example/specials',
        solution: 'driver.find_element(:id, "open-specials").click\nhandle = driver.window_handles.last\ndriver.switch_to.window(handle)\ndriver.current_url'
      });
    });
    [1, 2].forEach((index) => {
      specs.push({
        title: `Window title ${index}`,
        task: 'Open and switch to the specials window, then return its title.',
        routes: ROUTES,
        startUrl: 'https://diners.example/contexts',
        expected: 'Daily Specials',
        solution: 'driver.find_element(:id, "open-specials").click\nhandle = driver.window_handles.last\ndriver.switch_to.window(handle)\ndriver.title'
      });
    });
    specs.push({
      title: 'Accept the kitchen alert',
      task: 'Trigger the alert and accept it.',
      routes: ROUTES,
      startUrl: 'https://diners.example/contexts',
      state: { alertAction: 'accepted' },
      solution: 'driver.find_element(:id, "show-alert").click\ndriver.switch_to.alert.accept'
    });
    specs.push({
      title: 'Dismiss the kitchen alert',
      task: 'Trigger the alert and dismiss it.',
      routes: ROUTES,
      startUrl: 'https://diners.example/contexts',
      state: { alertAction: 'dismissed' },
      solution: 'driver.find_element(:id, "show-alert").click\ndriver.switch_to.alert.dismiss'
    });
    addMissing(chapter, specs);
  })();

  (() => {
    const chapter = 'Screenshots, Uploads & Downloads';
    const specs = [];
    ['out/menu.png', 'out/menu-2.png', 'out/menu-3.png', 'evidence/home.png', 'evidence/final.png'].forEach((path) => {
      specs.push({
        title: `Screenshot ${path}`,
        task: `Save a screenshot to ${path}.`,
        routes: ROUTES,
        startUrl: 'https://diners.example/files',
        state: { screenshotPath: path },
        solution: `driver.save_screenshot("${path}")`
      });
    });
    ['/tmp/menu.csv', '/tmp/menu.json', '/tmp/orders.csv', 'input/upload.txt', 'input/menu.tsv'].forEach((path) => {
      specs.push({
        title: `Upload ${path}`,
        task: `Attach ${path} to the file input.`,
        routes: ROUTES,
        startUrl: 'https://diners.example/files',
        state: { uploadedFile: path },
        solution: `driver.find_element(:id, "menu-file").send_keys("${path}")`
      });
    });
    [1, 2, 3].forEach((index) => {
      specs.push({
        title: `Download the menu ${index}`,
        task: 'Click the download button and keep the resolved file name.',
        routes: ROUTES,
        startUrl: 'https://diners.example/files',
        state: { download: 'menu.pdf' },
        solution: 'driver.find_element(:id, "download-menu").click'
      });
    });
    [
      ['Upload and screenshot', 'Upload /tmp/menu.csv and save out/upload.png.', 'driver.find_element(:id, "menu-file").send_keys("/tmp/menu.csv")\ndriver.save_screenshot("out/upload.png")', { uploadedFile: '/tmp/menu.csv', screenshotPath: 'out/upload.png' }, { uploadedFile: '/tmp/menu.csv' }, { screenshotPath: 'out/upload.png' }],
      ['Upload and download', 'Upload /tmp/menu.csv and download menu.pdf.', 'driver.find_element(:id, "menu-file").send_keys("/tmp/menu.csv")\ndriver.find_element(:id, "download-menu").click', { uploadedFile: '/tmp/menu.csv', download: 'menu.pdf' }, { uploadedFile: '/tmp/menu.csv' }, { download: 'menu.pdf' }],
      ['Download and screenshot', 'Download menu.pdf and save out/download.png.', 'driver.find_element(:id, "download-menu").click\ndriver.save_screenshot("out/download.png")', { download: 'menu.pdf', screenshotPath: 'out/download.png' }, { download: 'menu.pdf' }, { screenshotPath: 'out/download.png' }],
      ['Full file workflow', 'Upload, download, and capture out/files.png.', 'driver.find_element(:id, "menu-file").send_keys("/tmp/menu.csv")\ndriver.find_element(:id, "download-menu").click\ndriver.save_screenshot("out/files.png")', { uploadedFile: '/tmp/menu.csv', download: 'menu.pdf', screenshotPath: 'out/files.png' }, { uploadedFile: '/tmp/menu.csv' }, { download: 'menu.pdf' }, { screenshotPath: 'out/files.png' }]
    ].forEach(([title, task, solution, combined, first, second, third]) => {
      specs.push({
        title,
        task,
        routes: ROUTES,
        startUrl: 'https://diners.example/files',
        state: [first, second, third].filter(Boolean),
        solution
      });
    });
    [1, 2, 3, 4].forEach((index) => {
      specs.push({
        title: `File evidence bundle ${index}`,
        task: `Upload /tmp/menu-${index}.csv and save out/bundle-${index}.png.`,
        routes: ROUTES,
        startUrl: 'https://diners.example/files',
        state: [
          { uploadedFile: `/tmp/menu-${index}.csv` },
          { screenshotPath: `out/bundle-${index}.png` }
        ],
        solution: `driver.find_element(:id, "menu-file").send_keys("/tmp/menu-${index}.csv")\ndriver.save_screenshot("out/bundle-${index}.png")`
      });
    });
    addMissing(chapter, specs);
  })();

  (() => {
    const chapter = 'Ruby Variables & Collections';
    const specs = [
      ['Assign a string', 'Store "Ada" in name and return it.', 'name = "Ada"\nname', 'Ada'],
      ['Join two strings', 'Join first and last with a space.', 'first = "Ada"\nlast = "Lovelace"\nfirst + " " + last', 'Ada Lovelace'],
      ['Add numbers', 'Return the sum of count and four.', 'count = 3\ncount + 4', 7],
      ['Index an array', 'Return the second item in items.', 'items = ["Pancakes", "Waffles", "Omelette"]\nitems[1]', 'Waffles'],
      ['Use a negative index', 'Return the last item using a negative index.', 'items = ["Pancakes", "Waffles", "Omelette"]\nitems[-1]', 'Omelette'],
      ['Array length', 'Return how many items are in the array.', 'items = ["Pancakes", "Waffles"]\nitems.length', 2],
      ['Push onto an array', 'Add Waffles to the end and return the array.', 'items = ["Pancakes"]\nitems.push("Waffles")\nitems', ['Pancakes', 'Waffles']],
      ['Pop from an array', 'Remove the last item and return the remaining array.', 'items = ["Pancakes", "Waffles"]\nitems.pop\nitems', ['Pancakes']],
      ['Shift from an array', 'Remove the first item and return the remaining array.', 'items = ["Pancakes", "Waffles"]\nitems.shift\nitems', ['Waffles']],
      ['Unshift onto an array', 'Add Pancakes to the front and return the array.', 'items = ["Waffles"]\nitems.unshift("Pancakes")\nitems', ['Pancakes', 'Waffles']],
      ['Look up a symbol key', 'Return the name from the dish hash.', 'dish = { name: "Pancakes", price: 8 }\ndish[:name]', 'Pancakes'],
      ['Look up a string key', 'Return the name from the string-keyed hash.', 'dish = { "name" => "Pancakes" }\ndish["name"]', 'Pancakes'],
      ['Hash keys', 'Return the keys of the dish hash.', 'dish = { name: "Pancakes", price: 8 }\ndish.keys', ['name', 'price']],
      ['Hash values', 'Return the values of the dish hash.', 'dish = { name: "Pancakes", price: 8 }\ndish.values', ['Pancakes', 8]],
      ['Hash size', 'Return the number of pairs in the dish hash.', 'dish = { name: "Pancakes", price: 8 }\ndish.size', 2],
      ['Nested hash lookup', 'Return the lunch array from the menu hash.', 'menu = { breakfast: ["Pancakes"], lunch: ["Steak"] }\nmenu[:lunch]', ['Steak']],
      ['Deep lookup', 'Return the hot dish inside breakfast.', 'menu = { breakfast: { hot: "Pancakes" } }\nmenu[:breakfast][:hot]', 'Pancakes'],
      ['Uppercase a string', 'Return pancakes in uppercase.', '"pancakes".upcase', 'PANCAKES'],
      ['Lowercase a string', 'Return PANCAKES in lowercase.', '"PANCAKES".downcase', 'pancakes'],
      ['Split a string', 'Split the raw string on commas.', '"Pancakes,Waffles".split(",")', ['Pancakes', 'Waffles']],
      ['Join an array', 'Join the names with a pipe and spaces.', '["Pancakes", "Waffles"].join(" | ")', 'Pancakes | Waffles'],
      ['Check a substring', 'Return true if Pancakes includes cake.', '"Pancakes".include?("cake")', true],
      ['Convert to integer', 'Return the integer value of "42".', '"42".to_i', 42],
      ['Convert to float', 'Return the float value of "8.50".', '"8.50".to_f', 8.5],
      ['Fallback with nil', 'Return the fallback when value is nil.', 'value = nil\nvalue || "default"', 'default']
    ];
    specs.forEach(([title, task, solution, expected]) => {
      specs.push({ title, task, solution, expected });
    });
    addMissing(chapter, specs.slice(25));
  })();

  (() => {
    const chapter = 'Blocks, Iteration & Conditions';
    const specs = [
      ['Each with puts', 'Print each number on its own line.', '[1, 2, 3].each { |n| puts n }', ['1', '2', '3']],
      ['Each with index', 'Print each item prefixed by its 1-based position.', '["Pancakes", "Waffles"].each_with_index { |item, i| puts (i + 1).to_s + ". " + item }', ['1. Pancakes', '2. Waffles']],
      ['Map doubles', 'Return each number doubled.', '[1, 2, 3].map { |n| n * 2 }', [2, 4, 6]],
      ['Select evens', 'Return only the even numbers.', '[1, 2, 3, 4].select { |n| n % 2 == 0 }', [2, 4]],
      ['Reject odds', 'Reject the odd numbers.', '[1, 2, 3, 4].reject { |n| n % 2 == 1 }', [2, 4]],
      ['Count with a block', 'Count the even numbers.', '[1, 2, 3, 4].count { |n| n % 2 == 0 }', 2],
      ['Sum an array', 'Return the sum of the numbers.', '[1, 2, 3].sum', 6],
      ['Find the minimum', 'Return the smallest number.', '[3, 1, 2].min', 1],
      ['Find the maximum', 'Return the largest number.', '[3, 1, 2].max', 3],
      ['Sort ascending', 'Return the numbers sorted ascending.', '[3, 1, 2].sort', [1, 2, 3]],
      ['Sort by hash value', 'Sort the dishes by price and return their names.', 'items = [{ name: "Waffles", price: 9 }, { name: "Pancakes", price: 8 }]\nitems.sort_by { |item| item[:price] }.map { |item| item[:name] }', ['Pancakes', 'Waffles']],
      ['Remove duplicates', 'Return unique values only.', '[1, 2, 2, 3].uniq', [1, 2, 3]],
      ['Remove nil values', 'Drop the nil values.', '[1, nil, 2, nil].compact', [1, 2]],
      ['Branch with if', 'Return large when n is greater than five, otherwise small.', 'n = 8\nif n > 5\n  "large"\nelse\n  "small"\nend', 'large'],
      ['Branch with unless', 'Return small unless n is greater than five.', 'n = 3\nunless n > 5\n  "small"\nend', 'small'],
      ['While loop sum', 'Use a while loop to sum 1 through 5.', 'total = 0\nn = 1\nwhile n <= 5\n  total += n\n  n += 1\nend\ntotal', 15],
      ['Until loop countdown', 'Use an until loop to build a countdown array from 3 to 1.', 'items = []\nn = 3\nuntil n == 0\n  items << n\n  n -= 1\nend\nitems', [3, 2, 1]],
      ['Break early', 'Print numbers until the loop reaches three.', '[1, 2, 3, 4].each { |n| break if n == 3\nputs n }', ['1', '2']],
      ['Skip with next', 'Print only the odd numbers.', '[1, 2, 3, 4].each { |n| next if n % 2 == 0\nputs n }', ['1', '3']],
      ['Any match', 'Return true if any number is even.', '[1, 2, 3].any? { |n| n % 2 == 0 }', true],
      ['All match', 'Return true only if all numbers are even.', '[1, 2, 3].all? { |n| n % 2 == 0 }', false],
      ['None match', 'Return true if no number is negative.', '[1, 2, 3].none? { |n| n < 0 }', true],
      ['Find a match', 'Return the first number greater than two.', '[1, 2, 3, 4].find { |n| n > 2 }', 3],
      ['Flatten nested arrays', 'Flatten the nested numbers.', '[1, [2, [3]]].flatten', [1, 2, 3]],
      ['Map hashes to names', 'Return the name from each hash.', '[{ name: "Pancakes" }, { name: "Waffles" }].map { |item| item[:name] }', ['Pancakes', 'Waffles']]
    ];
    const entries = specs.map(([title, task, solution, expected]) => {
      const isOutput = Array.isArray(expected) && expected.length === 2 && title === 'Each with puts';
      return isOutput
        ? { title, task, solution, expected, kind: 'output' }
        : { title, task, solution, expected };
    });
    // Mark the other output-style drills explicitly.
    entries[0].kind = 'output';
    entries[1].kind = 'output';
    entries[17].kind = 'output';
    entries[18].kind = 'output';
    addMissing(chapter, entries);
  })();

  (() => {
    const chapter = 'Algorithms for Scrapers';
    const specs = [];
    const sum = 'driver.find_elements(:css, ".price").map { |price| price.text.gsub("$", "").to_i }.sum';
    specs.push(
      { title: 'Count all dishes', task: 'Count every dish on the menu.', scene: MENU, expected: 9, solution: 'driver.find_elements(:css, ".dish").length' },
      { title: 'Total the menu', task: 'Return the total price of all dishes.', scene: MENU, expected: 114, solution: sum },
      { title: 'Average the menu', task: 'Return the average price rounded to a whole number.', scene: MENU, expected: 13, solution: `${sum} / driver.find_elements(:css, ".dish").length` },
      { title: 'Most expensive dish', task: 'Return the highest price.', scene: MENU, expected: 24, solution: 'driver.find_elements(:css, ".price").map { |price| price.text.gsub("$", "").to_i }.max' },
      { title: 'Cheapest dish', task: 'Return the lowest price.', scene: MENU, expected: 8, solution: 'driver.find_elements(:css, ".price").map { |price| price.text.gsub("$", "").to_i }.min' },
      { title: 'Sorted dish names', task: 'Return all dish names sorted alphabetically.', scene: MENU, expected: ['Caesar Salad', 'Cheeseburger', 'Grilled Cheese', 'Omelette', 'Pancakes', 'Salmon', 'Steak', 'Vegetable Curry', 'Waffles'], solution: 'driver.find_elements(:css, ".dish .food").map(&:text).sort' },
      { title: 'Unique categories', task: 'Return each menu category once, in first-seen order.', scene: MENU, expected: ['sweet', 'savory', 'healthy', 'comfort', 'spicy'], solution: 'driver.find_elements(:css, ".dish").map { |dish| dish.attribute("data-category") }.uniq' },
      { title: 'Sweet dish names', task: 'Return names for dishes in the sweet category.', scene: MENU, expected: ['Pancakes', 'Waffles'], solution: 'driver.find_elements(:css, ".dish").select { |dish| dish.attribute("data-category") == "sweet" }.map { |dish| dish.find_element(:css, ".food").text }' },
      { title: 'Dishes over ten dollars', task: 'Return names for dishes costing more than ten dollars.', scene: MENU, expected: ['Cheeseburger', 'Steak', 'Salmon', 'Vegetable Curry'], solution: 'driver.find_elements(:css, ".dish").select { |dish| dish.attribute("data-price").to_i > 10 }.map { |dish| dish.find_element(:css, ".food").text }' },
      { title: 'Uppercase names', task: 'Return every dish name uppercased.', scene: MENU, expected: ['PANCAKES', 'WAFFLES', 'OMELETTE', 'CHEESEBURGER', 'CAESAR SALAD', 'GRILLED CHEESE', 'STEAK', 'SALMON', 'VEGETABLE CURRY'], solution: 'driver.find_elements(:css, ".dish .food").map { |dish| dish.text.upcase }' },
      { title: 'Build menu records', task: 'Return a hash per dish with name and price text.', scene: MENU, expected: [{ name: 'Pancakes', price: '$8' }, { name: 'Waffles', price: '$9' }, { name: 'Omelette', price: '$10' }, { name: 'Cheeseburger', price: '$12' }, { name: 'Caesar Salad', price: '$9' }, { name: 'Grilled Cheese', price: '$8' }, { name: 'Steak', price: '$24' }, { name: 'Salmon', price: '$20' }, { name: 'Vegetable Curry', price: '$14' }], solution: 'driver.find_elements(:css, ".dish").map { |dish| { name: dish.find_element(:css, ".food").text, price: dish.find_element(:css, ".price").text } }' },
      { title: 'Print CSV rows', task: 'Print one name,price line per dish.', scene: MENU, kind: 'output', expected: ['Pancakes,$8', 'Waffles,$9', 'Omelette,$10', 'Cheeseburger,$12', 'Caesar Salad,$9', 'Grilled Cheese,$8', 'Steak,$24', 'Salmon,$20', 'Vegetable Curry,$14'], solution: 'driver.find_elements(:css, ".dish").each { |dish| puts dish.find_element(:css, ".food").text + "," + dish.find_element(:css, ".price").text }' },
      { title: 'Count crawl results', task: 'Crawl all menu pages and return the total dish count.', routes: ROUTES, startUrl: 'https://diners.example/menu/page/1', expected: 9, solution: 'total = 0\ndriver.get("https://diners.example/menu/page/1")\nwhile true\n  total += driver.find_elements(:css, ".dish").length\n  links = driver.find_elements(:css, ".next")\n  break if links.empty?\n  links.first.click\nend\ntotal' },
      { title: 'Print crawl headings', task: 'Crawl all menu pages and print each page heading.', routes: ROUTES, startUrl: 'https://diners.example/menu/page/1', kind: 'output', expected: ['Menu Page 1', 'Menu Page 2', 'Menu Page 3'], solution: 'driver.get("https://diners.example/menu/page/1")\nwhile true\n  puts driver.find_element(:id, "page-title").text\n  links = driver.find_elements(:css, ".next")\n  break if links.empty?\n  links.first.click\nend' },
      { title: 'Total crawl dishes', task: 'Crawl all pages and print the total dish count.', routes: ROUTES, startUrl: 'https://diners.example/menu/page/1', kind: 'output', expected: ['9'], solution: 'total = 0\ndriver.get("https://diners.example/menu/page/1")\nwhile true\n  total += driver.find_elements(:css, ".dish").length\n  links = driver.find_elements(:css, ".next")\n  break if links.empty?\n  links.first.click\nend\nputs total' },
      { title: 'Count page one dishes', task: 'Return the number of dishes on page 1.', routes: ROUTES, startUrl: 'https://diners.example/menu/page/1', expected: 3, solution: 'driver.find_elements(:css, ".dish").length' },
      { title: 'Count page two dishes', task: 'Return the number of dishes on page 2.', routes: ROUTES, startUrl: 'https://diners.example/menu/page/2', expected: 3, solution: 'driver.find_elements(:css, ".dish").length' },
      { title: 'Page three names', task: 'Return the dish names on page 3.', routes: ROUTES, startUrl: 'https://diners.example/menu/page/3', expected: ['Steak', 'Salmon', 'Vegetable Curry'], solution: 'driver.find_elements(:css, ".dish").map(&:text)' },
      { title: 'Count orders', task: 'Return the number of orders.', scene: ORDERS, expected: 3, solution: 'driver.find_elements(:css, ".order").length' },
      { title: 'List customers', task: 'Return every customer name.', scene: ORDERS, expected: ['Ada', 'Grace', 'Alan'], solution: 'driver.find_elements(:css, ".customer strong").map(&:text)' },
      { title: 'Count all ordered items', task: 'Flatten the order item groups and return the total count.', scene: ORDERS, expected: 6, solution: 'groups = driver.find_elements(:css, ".order-items").map { |list| list.find_elements(:css, ".item").map(&:text) }\ngroups.flatten.length' },
      { title: 'Unique ordered items', task: 'Return each ordered item name once.', scene: ORDERS, expected: ['Pancakes', 'Coffee', 'Waffles', 'Fruit Bowl', 'Tea', 'Steak'], solution: 'driver.find_elements(:css, ".item").map(&:text).uniq' },
      { title: 'API menu names', task: 'Return the API menu record names.', api: S.apiRoutes, scene: B, expected: ['Pancakes', 'Coffee', 'Steak'], solution: 'response = Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json"))\nJSON.parse(response.body).map { |item| item["name"] }' },
      { title: 'API menu total', task: 'Return the total price from the API menu.', api: S.apiRoutes, scene: B, expected: 35, solution: 'response = Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json"))\nJSON.parse(response.body).map { |item| item["price"] }.sum' },
      { title: 'Ready delayed tickets', task: 'Wait for all delayed tickets and return the ready count.', scene: DELAYED, expected: 3, solution: 'driver.sleep(5)\ndriver.find_elements(:css, "[data-ready=\'true\']").length' }
    );
    addMissing(chapter, specs);
  })();

  const TARGET_COUNTS = {
    'Dynamic Pages & Robustness': 26,
    'Pagination & Crawling': 28,
    'Shadow DOM & Advanced DOM': 20,
    'Page Objects & Reusable Scrapers': 22,
    'Diagnostics': 20,
    'Loop Safety & Batching': 28,
    'Error Signals & Missing Data': 28,
    'Reliable Scraping Workflows': 28,
    'Structured Extraction & Export': 26,
    'Network/API Scraping & Errors': 30,
    'Data Normalization': 28,
    'Dates, Numbers & Units': 24,
    'Deduplication & Merging': 22,
    'JSON & Schema Validation': 24,
    'CSV & Tabular Data': 22,
    'Reporting & Summaries': 24,
    'Persistence & Resume': 24,
    'Scheduling & Scale': 26,
    'Compliance Capstone': 22,
    'Rate Limiting & Politeness': 24,
    'Error Monitoring & Logs': 26,
    'Environment Configuration': 24,
    'Deployment & Maintenance': 22,
    'Responsible Scraping Capstone': 32
  };

  function vSpec(title, task, solution, expected, hint, extra) {
    return Object.assign({ title, task, solution, expected, hint }, extra || {});
  }

  function oSpec(title, task, solution, expected, hint, extra) {
    return Object.assign({ kind: 'output', title, task, solution, expected, hint }, extra || {});
  }

  function stSpec(title, task, solution, state, hint, extra) {
    return Object.assign({ kind: 'state', title, task, solution, state, hint }, extra || {});
  }

  function selSpec(title, task, solution, ids, mode, hint, extra) {
    return Object.assign({ kind: 'select', title, task, solution, ids, mode, hint }, extra || {});
  }

  const API_OPTS = { api: API, scene: B };
  const PAGE_OPTS = { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/menu/page/1' };
  const DELAYED_OPTS = { routes: CURRICULUM_ROUTES, startUrl: DELAYED.url };
  const SHADOW_OPTS = { routes: CURRICULUM_ROUTES, startUrl: SHADOW_URL() };
  const RECORD_OPTS = { routes: CURRICULUM_ROUTES, startUrl: RECORDS.url };
  const BATCH_OPTS = { routes: CURRICULUM_ROUTES, startUrl: BATCH.url };
  const BROKEN_OPTS = { routes: CURRICULUM_ROUTES, startUrl: BROKEN.url };
  const RATE_OPTS = { routes: CURRICULUM_ROUTES, startUrl: RATE.url };

  function SHADOW_URL() {
    return 'https://diners.example/shadow';
  }

  (() => {
    const chapter = 'Dynamic Pages & Robustness';
    const specs = [];
    const tickets = [
      { id: 'w1', seconds: 2, ready: 'Fresh coffee', at: 1500 },
      { id: 'w2', seconds: 4, ready: 'Hot pancakes', at: 3000 },
      { id: 'w3', seconds: 5, ready: 'The check', at: 4500 }
    ];
    tickets.forEach((ticket) => {
      specs.push(vSpec(`Fixed sleep reveals ${ticket.id}`, `Sleep until ${ticket.id} is visible, then return its displayed state.`, `driver.sleep(${ticket.seconds})\ndriver.find_element(:id, "${ticket.id}").displayed?`, true, `The ticket appears at ${ticket.at}ms; sleep ${ticket.seconds} seconds first.`, DELAYED_OPTS));
      specs.push(vSpec(`Read ${ticket.id} after a sleep`, `Sleep until ${ticket.id} is visible, then return its text.`, `driver.sleep(${ticket.seconds})\ndriver.find_element(:id, "${ticket.id}").text`, ticket.ready, `Sleep ${ticket.seconds} seconds, then read .text.`, DELAYED_OPTS));
      specs.push(vSpec(`Wait for ${ticket.id}` , `Use an explicit wait to find ${ticket.id} and return its text.`, `wait = Selenium::WebDriver::Wait.new(timeout: 6)\nel = wait.until { driver.find_element(:id, "${ticket.id}") }\nel.text`, ticket.ready, `wait.until keeps polling until find_element succeeds.`, DELAYED_OPTS));
      specs.push(vSpec(`Wait for ${ticket.id} to display`, `Use wait.until with displayed? and return the ticket text.`, `wait = Selenium::WebDriver::Wait.new(timeout: 6)\nwait.until { driver.find_element(:id, "${ticket.id}").displayed? }\ndriver.find_element(:id, "${ticket.id}").text`, ticket.ready, `Wait for the visibility predicate, not just the element.`, DELAYED_OPTS));
      specs.push(vSpec(`Implicit wait before ${ticket.id}`, `Set a ${ticket.seconds}s implicit wait, then read ${ticket.id} with an explicit visibility wait.`, `driver.manage.timeouts.implicit_wait = ${ticket.seconds}\nwait = Selenium::WebDriver::Wait.new(timeout: 6)\nwait.until { driver.find_element(:id, "${ticket.id}").displayed? }\ndriver.find_element(:id, "${ticket.id}").text`, ticket.ready, `Implicit wait affects find_element; explicit wait handles hidden state.`, DELAYED_OPTS));
    });
    [1, 2, 3, 5].forEach((seconds) => {
      const count = seconds >= 5 ? 3 : seconds >= 3 ? 2 : seconds >= 2 ? 1 : 0;
      specs.push(vSpec(`Ready tickets at ${seconds}s`, `Sleep ${seconds} seconds and count tickets marked data-ready="true".`, `driver.sleep(${seconds})\ndriver.find_elements(:css, "[data-ready='true']").length`, count, `data-ready is set when the virtual clock reaches each appears-at time.`, DELAYED_OPTS));
    });
    specs.push(vSpec('Wait for three ready tickets', 'Poll until all three tickets are ready, then return their count.', `wait = Selenium::WebDriver::Wait.new(timeout: 6)\nwait.until { driver.find_elements(:css, "[data-ready='true']").length == 3 }\ndriver.find_elements(:css, "[data-ready='true']").length`, 3, 'Wait on the count, then read it once more.', DELAYED_OPTS));
    [2, 5].forEach((seconds) => {
      specs.push(stSpec(`Clock after ${seconds}s sleep`, `Sleep ${seconds} seconds and leave the virtual clock at that value.`, `driver.sleep(${seconds})`, { clock: seconds * 1000 }, 'The virtual clock advances by 1000ms per second.', DELAYED_OPTS));
    });
    specs.push(stSpec('Save dynamic evidence', 'Wait for the final ticket and save a screenshot to evidence/dynamic.png.', `wait = Selenium::WebDriver::Wait.new(timeout: 6)\nwait.until { driver.find_element(:id, "w3").displayed? }\ndriver.save_screenshot("evidence/dynamic.png")`, { screenshotPath: 'evidence/dynamic.png' }, 'Wait first, then save the screenshot.', DELAYED_OPTS));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'Pagination & Crawling';
    const specs = [];
    [1, 2, 3].forEach((page) => {
      specs.push(vSpec(`Open menu page ${page} directly`, `Navigate to menu page ${page} and return the page title.`, `driver.get("https://diners.example/menu/page/${page}")\ndriver.title`, `Menu Page ${page}`, 'Use the full page URL from ROUTES.', PAGE_OPTS));
      specs.push(vSpec(`Count dishes on page ${page}`, `Navigate to menu page ${page} and count .dish elements.`, `driver.get("https://diners.example/menu/page/${page}")\ndriver.find_elements(:css, ".dish").length`, 3, 'Each paged fixture has three dishes.', PAGE_OPTS));
      specs.push(vSpec(`Read dish names on page ${page}`, `Navigate to menu page ${page} and return all dish names.`, `driver.get("https://diners.example/menu/page/${page}")\ndriver.find_elements(:css, ".dish").map { |el| el.text }`, page === 1 ? ['Pancakes', 'Waffles', 'Omelette'] : page === 2 ? ['Cheeseburger', 'Caesar Salad', 'Grilled Cheese'] : ['Steak', 'Salmon', 'Vegetable Curry'], 'Map .dish elements to their text.', PAGE_OPTS));
    });
    [[1, 2], [2, 3]].forEach((pair) => {
      specs.push(vSpec(`Follow next from page ${pair[0]}`, `Starting on page ${pair[0]}, click .next and return the new URL.`, `driver.get("https://diners.example/menu/page/${pair[0]}")\ndriver.find_element(:css, ".next").click\ndriver.current_url`, `https://diners.example/menu/page/${pair[1]}`, 'The next link carries data-href for the pager.', PAGE_OPTS));
      specs.push(vSpec(`Follow next from page ${pair[0]} and read title`, `Starting on page ${pair[0]}, click .next and return the new title.`, `driver.get("https://diners.example/menu/page/${pair[0]}")\ndriver.find_element(:css, ".next").click\ndriver.title`, `Menu Page ${pair[1]}`, 'driver.title updates after navigation.', PAGE_OPTS));
    });
    [[3, 2], [2, 1]].forEach((pair) => {
      specs.push(vSpec(`Follow prev from page ${pair[0]}`, `Starting on page ${pair[0]}, click .prev and return the new URL.`, `driver.get("https://diners.example/menu/page/${pair[0]}")\ndriver.find_element(:css, ".prev").click\ndriver.current_url`, `https://diners.example/menu/page/${pair[1]}`, 'The prev link navigates like next.', PAGE_OPTS));
      specs.push(vSpec(`Follow prev from page ${pair[0]} and read title`, `Starting on page ${pair[0]}, click .prev and return the new title.`, `driver.get("https://diners.example/menu/page/${pair[0]}")\ndriver.find_element(:css, ".prev").click\ndriver.title`, `Menu Page ${pair[1]}`, 'Read the title after clicking prev.', PAGE_OPTS));
    });
    specs.push(vSpec('No next link on final page', 'Navigate to page 3 and return the number of .next links.', `driver.get("https://diners.example/menu/page/3")\ndriver.find_elements(:css, ".next").length`, 0, 'The terminal page has no next link.', PAGE_OPTS));
    specs.push(vSpec('No prev link on first page', 'Navigate to page 1 and return the number of .prev links.', `driver.find_elements(:css, ".prev").length`, 0, 'Page 1 has no previous link.', PAGE_OPTS));
    specs.push(oSpec('Crawl every menu dish', 'Follow next links and print every dish name on its own line.', `names = []\nurl = "https://diners.example/menu/page/1"\nwhile url\n  driver.get(url)\n  names = names + driver.find_elements(:css, ".dish").map { |el| el.text }\n  links = driver.find_elements(:css, ".next")\n  if links.length > 0\n    url = links[0].attribute("href")\n  else\n    url = nil\n  end\nend\nputs names`, ['Pancakes', 'Waffles', 'Omelette', 'Cheeseburger', 'Caesar Salad', 'Grilled Cheese', 'Steak', 'Salmon', 'Vegetable Curry'], 'Loop until there is no .next link.', PAGE_OPTS));
    specs.push(vSpec('Count crawled dishes', 'Follow all next links and return the total dish count.', `count = 0\nurl = "https://diners.example/menu/page/1"\nwhile url\n  driver.get(url)\n  count = count + driver.find_elements(:css, ".dish").length\n  links = driver.find_elements(:css, ".next")\n  if links.length > 0\n    url = links[0].attribute("href")\n  else\n    url = nil\n  end\nend\ncount`, 9, 'Accumulate counts across pages.', PAGE_OPTS));
    specs.push(vSpec('Collect titles while crawling', 'Follow every page and return the page titles in order.', `titles = []\nurl = "https://diners.example/menu/page/1"\nwhile url\n  driver.get(url)\n  titles = titles + [driver.title]\n  links = driver.find_elements(:css, ".next")\n  if links.length > 0\n    url = links[0].attribute("href")\n  else\n    url = nil\n  end\nend\ntitles`, ['Menu Page 1', 'Menu Page 2', 'Menu Page 3'], 'Record driver.title before following next.', PAGE_OPTS));
    specs.push(vSpec('Bounded crawl guard', 'Crawl with a guard of 10 pages and return the number visited.', `visited = 0\nurl = "https://diners.example/menu/page/1"\nwhile url && visited < 10\n  driver.get(url)\n  visited = visited + 1\n  links = driver.find_elements(:css, ".next")\n  if links.length > 0\n    url = links[0].attribute("href")\n  else\n    url = nil\n  end\nend\nvisited`, 3, 'A guard prevents an accidental infinite crawl.', PAGE_OPTS));
    specs.push(vSpec('Crawl into a page map', 'Crawl all pages and return a hash of page number to dish count.', `pages = {}\nurl = "https://diners.example/menu/page/1"\nwhile url\n  driver.get(url)\n  pages[driver.title] = driver.find_elements(:css, ".dish").length\n  links = driver.find_elements(:css, ".next")\n  if links.length > 0\n    url = links[0].attribute("href")\n  else\n    url = nil\n  end\nend\npages`, { 'Menu Page 1': 3, 'Menu Page 2': 3, 'Menu Page 3': 3 }, 'Hash keys come from the page title.', PAGE_OPTS));
    specs.push(vSpec('Page source marker', 'Navigate to page 2 and return true when the source contains "Page 2 of the paginated menu".', `driver.get("https://diners.example/menu/page/2")\ndriver.page_source.include?("Page 2 of the paginated menu")`, true, 'page_source exposes the full fixture HTML.', PAGE_OPTS));
    specs.push(vSpec('Two next clicks', 'From page 1, click next twice and return the final URL.', `driver.find_element(:css, ".next").click\ndriver.find_element(:css, ".next").click\ndriver.current_url`, 'https://diners.example/menu/page/3', 'The pager can be followed repeatedly.', PAGE_OPTS));
    specs.push(vSpec('Crawl with a stop page', 'Crawl pages until reaching page 3 and return the number of pages opened.', `url = "https://diners.example/menu/page/1"\nopened = 0\nwhile url && opened < 10\n  driver.get(url)\n  opened = opened + 1\n  if driver.current_url.include?("/page/3")\n    url = nil\n  else\n    url = driver.find_element(:css, ".next").attribute("href")\n  end\nend\nopened`, 3, 'Stop conditions can use the current URL.', PAGE_OPTS));
    specs.push(vSpec('First and last crawled dish', 'Crawl all pages and return the first and last dish names.', `names = []\nurl = "https://diners.example/menu/page/1"\nwhile url\n  driver.get(url)\n  names = names + driver.find_elements(:css, ".dish").map { |el| el.text }\n  links = driver.find_elements(:css, ".next")\n  if links.length > 0\n    url = links[0].attribute("href")\n  else\n    url = nil\n  end\nend\n[names.first, names.last]`, ['Pancakes', 'Vegetable Curry'], 'first and last summarize a crawl.', PAGE_OPTS));
    specs.push(vSpec('Crawl and count unique dishes', 'Crawl all pages and return the number of unique dish names.', `names = []\nurl = "https://diners.example/menu/page/1"\nwhile url\n  driver.get(url)\n  names = names + driver.find_elements(:css, ".dish").map { |el| el.text }\n  links = driver.find_elements(:css, ".next")\n  if links.length > 0\n    url = links[0].attribute("href")\n  else\n    url = nil\n  end\nend\nnames.uniq.length`, 9, 'uniq removes repeated names from the crawl.', PAGE_OPTS));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'Shadow DOM & Advanced DOM';
    const specs = [];
    const menu = [
      ['shadow-title', 'Shadow Root Menu'],
      ['shadow-dish-1-name', 'Shadow Pancakes'],
      ['shadow-dish-2-name', 'Shadow Waffles']
    ];
    menu.forEach((entry) => {
      specs.push(vSpec(`Read ${entry[0]}`, `Read the text inside the shadow root target ${entry[0]}.`, `host = driver.find_element(:id, "shadow-menu")\nhost.shadow_root.find_element(:css, "[data-key='${entry[0]}']").text`, entry[1], 'Scope the find to the shadow_root, not the document.', SHADOW_OPTS));
      specs.push(selSpec(`Select ${entry[0]} in shadow root`, `Return the shadow-root element with data-key ${entry[0]}.`, `host = driver.find_element(:id, "shadow-menu")\nhost.shadow_root.find_element(:css, "[data-key='${entry[0]}']")`, [entry[0]], 'element', 'Use an attribute selector inside the shadow root.', SHADOW_OPTS));
    });
    const drinks = [
      ['shadow-drinks-title', 'Shadow Drink Menu'],
      ['shadow-drink-1-name', 'Shadow Coffee'],
      ['shadow-drink-2-name', 'Shadow Tea'],
      ['shadow-drink-3-name', 'Shadow Shake']
    ];
    drinks.forEach((entry) => {
      specs.push(vSpec(`Read ${entry[0]}`, `Read the text inside the shadow drinks root target ${entry[0]}.`, `host = driver.find_element(:id, "shadow-drinks")\nhost.shadow_root.find_element(:css, "[data-key='${entry[0]}']").text`, entry[1], 'The drinks host has its own shadow root.', SHADOW_OPTS));
    });
    specs.push(vSpec('Count shadow menu dishes', 'Return the number of .dish nodes inside the menu shadow root.', `host = driver.find_element(:id, "shadow-menu")\nhost.shadow_root.find_elements(:css, ".dish").length`, 2, 'Scope the count to shadow_root.', SHADOW_OPTS));
    specs.push(vSpec('Count shadow drink dishes', 'Return the number of .dish nodes inside the drinks shadow root.', `host = driver.find_element(:id, "shadow-drinks")\nhost.shadow_root.find_elements(:css, ".dish").length`, 3, 'The drinks root has three dishes.', SHADOW_OPTS));
    specs.push(vSpec('List shadow menu dish names', 'Return all dish names from the menu shadow root.', `host = driver.find_element(:id, "shadow-menu")\nhost.shadow_root.find_elements(:css, ".dish-name").map { |el| el.text }`, ['Shadow Pancakes', 'Shadow Waffles'], 'Map scoped elements to text.', SHADOW_OPTS));
    specs.push(vSpec('List shadow drink dish names', 'Return all dish names from the drinks shadow root.', `host = driver.find_element(:id, "shadow-drinks")\nhost.shadow_root.find_elements(:css, ".dish-name").map { |el| el.text }`, ['Shadow Coffee', 'Shadow Tea', 'Shadow Shake'], 'Map the second shadow root.', SHADOW_OPTS));
    specs.push(vSpec('Light DOM decoy text', 'Return the light DOM decoy text outside the shadow root.', `driver.find_element(:css, ".light-dish").text`, 'Light Pancakes', 'The decoy is a normal document element.', SHADOW_OPTS));
    specs.push(vSpec('Ignore the light DOM decoy', 'Count shadow dish names while ignoring the light DOM decoy.', `host = driver.find_element(:id, "shadow-menu")\nhost.shadow_root.find_elements(:css, ".dish-name").length`, 2, 'A document-level .dish search would be wrong here.', SHADOW_OPTS));
    specs.push(vSpec('Combine both shadow roots', 'Return dish names from both shadow roots.', `menu = driver.find_element(:id, "shadow-menu").shadow_root.find_elements(:css, ".dish-name").map { |el| el.text }\ndrinks = driver.find_element(:id, "shadow-drinks").shadow_root.find_elements(:css, ".dish-name").map { |el| el.text }\nmenu + drinks`, ['Shadow Pancakes', 'Shadow Waffles', 'Shadow Coffee', 'Shadow Tea', 'Shadow Shake'], 'Concatenate the two scoped collections.', SHADOW_OPTS));
    specs.push(vSpec('Shadow roots have different counts', 'Return an array with the dish counts from both shadow roots.', `menu = driver.find_element(:id, "shadow-menu").shadow_root.find_elements(:css, ".dish").length\ndrinks = driver.find_element(:id, "shadow-drinks").shadow_root.find_elements(:css, ".dish").length\n[menu, drinks]`, [2, 3], 'Compare scoped collections directly.', SHADOW_OPTS));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'Page Objects & Reusable Scrapers';
    const specs = [];
    const maps = [
      { name: 'menu', url: 'https://diners.example/menu', locator: '.dish', key: 'dish', count: 6, first: 'Pancakes' },
      { name: 'breakfast', url: 'https://diners.example/', locator: '.plate', key: 'plate', count: 10, first: 'Pancakes' },
      { name: 'records', url: 'https://diners.example/records', locator: '.record', key: 'record', count: 10, first: 'Pancakes' },
      { name: 'batch', url: 'https://diners.example/batch', locator: '.job', key: 'job', count: 6, first: 'job-101' }
    ];
    maps.forEach((map) => {
      specs.push(vSpec(`${map.name} locator map count`, `Define a locator map for ${map.name} and return the number of ${map.key} elements.`, `page = { "${map.key}": "${map.locator}" }\ndriver.get("${map.url}")\ndriver.find_elements(:css, page["${map.key}"]).length`, map.count, 'Centralize the selector, then reuse it from the map.', { routes: CURRICULUM_ROUTES }));
      specs.push(vSpec(`${map.name} locator map first text`, `Define a locator map for ${map.name} and return the first ${map.key} text.`, `page = { "${map.key}": "${map.locator}" }\ndriver.get("${map.url}")\ndriver.find_element(:css, page["${map.key}"]).text`, map.first, 'Return the first match from the mapped selector.', { routes: CURRICULUM_ROUTES }));
    });
    ['breakfast', 'lunch', 'dinner'].forEach((name) => {
      const scene = name === 'breakfast' ? B : name === 'lunch' ? L : D;
      specs.push(vSpec(`Shared ${name} locator`, `Use a reusable locator map with the ${name} scene and count plates.`, `locators = { plates: ".plate" }\ndriver.find_elements(:css, locators[:plates]).length`, 10, 'The same map works across every table scene.', { scene }));
    });
    specs.push(vSpec('Map with multiple selectors', 'Define a page map with title and record selectors and return both counts.', `page = { "title": ".scene-title", "record": ".record" }\n[driver.find_elements(:css, page["title"]).length, driver.find_elements(:css, page["record"]).length]`, [1, 10], 'A map can hold several related locators.', RECORD_OPTS));
    specs.push(vSpec('Reuse a locator twice', 'Use one mapped locator to return counts from two scenes.', `locator = ".plate"\nfirst = driver.find_elements(:css, locator).length\nsecond = driver.find_elements(:css, locator).length\n[first, second]`, [10, 10], 'Reusing the map avoids duplicated selector strings.', { scene: B }));
    specs.push(vSpec('Locator map with method-style element', 'Use a locator map to find a specific record by data-key.', `page = { "email": "[data-key='record-1-email']" }\ndriver.find_element(:css, page["email"]).text`, 'ada@example.com', 'Map a precise selector for a single element.', RECORD_OPTS));
    specs.push(vSpec('Nested page map', 'Return the count from a nested locator map.', `page = { "table" => { "rows" => ".record" } }\ntable = page["table"]\ndriver.find_elements(:css, table["rows"]).length`, 10, 'Nested maps group related selectors.', RECORD_OPTS));
    specs.push(vSpec('Map keys report', 'Return the keys from a locator map.', `locators = { plates: ".plate", dishes: ".dish", records: ".record" }\nlocators.keys.sort`, ['dishes', 'plates', 'records'], 'keys lists every mapped selector name.', { scene: B }));
    specs.push(vSpec('Fetch a mapped selector', 'Use fetch to read the record selector from a map.', `locators = { record: ".record" }\ndriver.find_elements(:css, locators.fetch(:record)).length`, 10, 'fetch is a safe way to read a mapped key.', RECORD_OPTS));
    specs.push(vSpec('Merge locator maps', 'Merge shared and page-specific locator maps, then count records.', `shared = { plates: ".plate" }\nlocal = { records: ".record" }\npage = shared.merge(local)\ndriver.find_elements(:css, page[:records]).length`, 10, 'merge combines reusable maps.', RECORD_OPTS));
    specs.push(vSpec('Transform locator map', 'Transform mapped values to uppercase and return them.', `locators = { plates: ".plate", records: ".record" }\nlocators.transform_values { |value| value.upcase }.values`, ['.PLATE', '.RECORD'], 'transform_values keeps keys and changes selector values.', { scene: B }));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'Diagnostics';
    const specs = [];
    specs.push(vSpec('Error banner text', 'Read the error banner text from the diagnostics scene.', `driver.find_element(:css, "[data-key='error-banner']").text`, 'Error: upstream request failed with HTTP 500.', 'Read diagnostic text before changing pages.', BROKEN_OPTS));
    specs.push(vSpec('Error banner code', 'Return the data-code attribute from the error banner.', `driver.find_element(:css, "[data-key='error-banner']").attribute("data-code")`, '500', 'Attribute values often carry stable error codes.', BROKEN_OPTS));
    specs.push(vSpec('Count diagnostic links', 'Return the number of diagnostic links.', `driver.find_elements(:css, ".diagnostic-links a").length`, 2, 'Count both stale and recovery links.', BROKEN_OPTS));
    specs.push(vSpec('Empty results count', 'Return the data-count value on the empty results block.', `driver.find_element(:css, "[data-key='empty-results']").attribute("data-count")`, '0', 'Empty-state markers are useful diagnostics.', BROKEN_OPTS));
    specs.push(vSpec('Diagnostics page source', 'Return true when the page source contains "Diagnostics Lab".', `driver.page_source.include?("Diagnostics Lab")`, true, 'page_source is the fastest first check.', BROKEN_OPTS));
    specs.push(vSpec('Diagnostics URL', 'Return the current URL on the diagnostics page.', `driver.current_url`, 'https://diners.example/broken', 'Always log the URL when reproducing a failure.', BROKEN_OPTS));
    specs.push(vSpec('Diagnostics title', 'Return the current page title.', `driver.title`, 'Diagnostics Lab', 'The title helps identify the failing page.', BROKEN_OPTS));
    specs.push(stSpec('Screenshot the failure', 'Save a screenshot to evidence/diagnostics.png.', `driver.save_screenshot("evidence/diagnostics.png")`, { screenshotPath: 'evidence/diagnostics.png' }, 'Evidence should be saved before navigating away.', BROKEN_OPTS));
    specs.push(stSpec('Write a diagnostic report', 'Write a JSON file containing the URL and title.', `File.write("out/diagnostic.json", JSON.generate({ url: driver.current_url, title: driver.title }))`, { file: { name: 'out/diagnostic.json', contains: '/broken' } }, 'Persist the basic breadcrumbs.', BROKEN_OPTS));
    specs.push(stSpec('Diagnostics with banner in report', 'Write a report file containing the error banner text.', `error = driver.find_element(:css, "[data-key='error-banner']").text\nFile.write("out/error.txt", error)`, { file: { name: 'out/error.txt', contains: 'HTTP 500' } }, 'Save the visible error text.', BROKEN_OPTS));
    specs.push(vSpec('Click the recovery link', 'Click the recovery link and return the new URL.', `driver.find_element(:css, ".recovery-link").click\ndriver.current_url`, 'https://diners.example/records', 'Recovery links should lead to a working page.', BROKEN_OPTS));
    specs.push(vSpec('Recovery link title', 'Click the recovery link and return the new title.', `driver.find_element(:css, ".recovery-link").click\ndriver.title`, 'Record Ledger', 'Check the page title after recovery.', BROKEN_OPTS));
    specs.push(vSpec('Stale link href', 'Return the href of the stale link.', `driver.find_element(:css, ".stale-link").attribute("href")`, 'https://diners.example/missing', 'Inspect the target before following a suspicious link.', BROKEN_OPTS));
    specs.push(oSpec('Rescue a missing element', 'Try to find #not-here and print the rescued error class.', `begin\n  driver.find_element(:id, "not-here")\nrescue NoSuchElementError => error\n  puts error.class\nend`, ['NoSuchElementError'], 'begin/rescue keeps a diagnostic script running.', BROKEN_OPTS));
    specs.push(oSpec('Rescue and log message', 'Rescue a missing element and print its message.', `begin\n  driver.find_element(:id, "not-here")\nrescue => error\n  puts error.message\nend`, ['no such element: Unable to locate element: {"method":"id","selector":"not-here"}'], 'A broad rescue can capture the message for logging.', BROKEN_OPTS));
    specs.push(stSpec('Ensure runs on failure', 'Use ensure to save evidence even when a find fails.', `begin\n  driver.find_element(:id, "not-here")\nrescue NoSuchElementError\n  puts "missing"\nensure\n  driver.save_screenshot("evidence/ensure.png")\nend`, { screenshotPath: 'evidence/ensure.png' }, 'ensure always runs, even after a rescue.', BROKEN_OPTS));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'Loop Safety & Batching';
    const specs = [];
    [['success', 2], ['failure', 2], ['pending', 2]].forEach((entry) => {
      specs.push(vSpec(`Count ${entry[0]} jobs`, `Count batch jobs with status ${entry[0]}.`, `driver.find_elements(:css, ".job-${entry[0]}").length`, entry[1], 'The status is encoded in the job class.', BATCH_OPTS));
      specs.push(vSpec(`List ${entry[0]} job ids`, `Return the ids of jobs with status ${entry[0]}.`, `driver.find_elements(:css, ".job-${entry[0]} .job-id").map { |el| el.text }`, entry[0] === 'success' ? ['job-101', 'job-104'] : entry[0] === 'failure' ? ['job-102', 'job-105'] : ['job-103', 'job-106'], 'Map the id spans inside matching jobs.', BATCH_OPTS));
    });
    [0, 1, 2].forEach((attempts) => {
      const ids = attempts === 0 ? ['job-103'] : attempts === 1 ? ['job-101', 'job-106'] : ['job-102', 'job-104', 'job-105'];
      specs.push(vSpec(`Jobs with ${attempts} attempts`, `Return the ids of jobs whose data-attempts equals ${attempts}.`, `driver.find_elements(:css, "[data-attempts='${attempts}'] .job-id").map { |el| el.text }`, ids, 'Attribute selectors can filter batch metadata.', BATCH_OPTS));
    });
    specs.push(vSpec('Bounded each loop', 'Use each with a guard to return at most two job ids.', `ids = []\ndriver.find_elements(:css, ".job-id").each do |el|\n  break if ids.length == 2\n  ids = ids + [el.text]\nend\nids`, ['job-101', 'job-104'], 'break stops after the batch limit.', BATCH_OPTS));
    specs.push(vSpec('Each with index batch', 'Use each_with_index to return the first three job ids with their positions.', `pairs = []\ndriver.find_elements(:css, ".job-id").each_with_index do |el, index|\n  break if index == 3\n  pairs = pairs + [[index, el.text]]\nend\npairs`, [[0, 'job-101'], [1, 'job-102'], [2, 'job-103']], 'Use the index as an explicit bound.', BATCH_OPTS));
    specs.push(vSpec('While loop with max', 'Open pages with a while loop capped at three pages and return the count.', `url = "https://diners.example/menu/page/1"\nopened = 0\nwhile url && opened < 3\n  driver.get(url)\n  opened = opened + 1\n  links = driver.find_elements(:css, ".next")\n  if links.length > 0\n    url = links[0].attribute("href")\n  else\n    url = nil\n  end\nend\nopened`, 3, 'A max guard keeps crawls finite.', PAGE_OPTS));
    specs.push(vSpec('Skip pending jobs', 'Return ids for jobs that are not pending.', `ids = []\ndriver.find_elements(:css, ".job").each do |job|\n  status = job.attribute("data-status")\n  if status != "pending"\n    ids = ids + [job.attribute("data-id")]\n  end\nend\nids`, ['job-101', 'job-102', 'job-104', 'job-105'], 'Use a condition inside the loop.', BATCH_OPTS));
    specs.push(vSpec('Retryable job ids', 'Return ids for failed jobs with fewer than three attempts.', `ids = []\ndriver.find_elements(:css, ".job-failure").each do |job|\n  if job.attribute("data-attempts").to_i < 3\n    ids = ids + [job.attribute("data-id")]\n  end\nend\nids`, ['job-105'], 'Only retry jobs under the attempt limit.', BATCH_OPTS));
    specs.push(stSpec('Checkpoint after a batch', 'Write a checkpoint file after processing the first two jobs.', `ids = []\ndriver.find_elements(:css, ".job-id").each do |el|\n  break if ids.length == 2\n  ids = ids + [el.text]\nend\nFile.write("out/batch-checkpoint.json", JSON.generate({ processed: ids }))`, { file: { name: 'out/batch-checkpoint.json', contains: 'job-102' } }, 'Persist the batch position.', BATCH_OPTS));
    specs.push(vSpec('Batch size from env', 'Read BATCH_SIZE from ENV and return the first that many job ids.', `size = ENV["BATCH_SIZE"].to_i\nids = []\ndriver.find_elements(:css, ".job-id").each do |el|\n  break if ids.length == size\n  ids = ids + [el.text]\nend\nids`, ['job-101', 'job-102'], 'Configuration can drive the batch size.', Object.assign({}, BATCH_OPTS, { env: { BATCH_SIZE: '2' } })));
    specs.push(vSpec('Batch by category', 'Group records by category and return the category counts.', `groups = {}\ndriver.find_elements(:css, ".record").each do |row|\n  category = row.attribute("data-category").downcase\n  groups[category] = (groups[category] || 0) + 1\nend\ngroups`, { breakfast: 5, drink: 3, dinner: 1, lunch: 1 }, 'Normalize keys while batching records.', RECORD_OPTS));
    specs.push(vSpec('Bounded API batch', 'Read pages 1 through 3 and return the number of items.', `count = 0\n[1, 2, 3].each do |page|\n  response = Net::HTTP.get_response(URI.parse("https://diners.example/api/page/" + page.to_s + ".json"))\n  data = JSON.parse(response.body)\n  count = count + data["items"].length\nend\ncount`, 10, 'A fixed page list is naturally bounded.', API_OPTS));
    specs.push(vSpec('API batch with guard', 'Follow API next links with a guard of five and return the pages visited.', `pages = 0\nurl = "https://diners.example/api/page/1.json"\nwhile url && pages < 5\n  response = Net::HTTP.get_response(URI.parse(url))\n  data = JSON.parse(response.body)\n  pages = pages + 1\n  url = data["next"]\nend\npages`, 3, 'The envelope next field drives the loop.', API_OPTS));
    specs.push(vSpec('Batch totals', 'Return the total attempts across all batch jobs.', `total = 0\ndriver.find_elements(:css, ".job").each do |job|\n  total = total + job.attribute("data-attempts").to_i\nend\ntotal`, 9, 'Accumulate a numeric attribute across rows.', BATCH_OPTS));
    specs.push(vSpec('First failure in batch', 'Return the id of the first failed job.', `driver.find_elements(:css, ".job-failure").first.attribute("data-id")`, 'job-102', 'first stops after one result.', BATCH_OPTS));
    specs.push(vSpec('All failures in batch', 'Return the ids of all failed jobs.', `driver.find_elements(:css, ".job-failure").map { |job| job.attribute("data-id") }`, ['job-102', 'job-105'], 'Map the full filtered collection.', BATCH_OPTS));
    specs.push(vSpec('Job status counts', 'Return a hash of status to count.', `counts = {}\ndriver.find_elements(:css, ".job").each do |job|\n  status = job.attribute("data-status")\n  counts[status] = (counts[status] || 0) + 1\nend\ncounts`, { success: 2, failure: 2, pending: 2 }, 'Count each status in one pass.', BATCH_OPTS));
    specs.push(stSpec('Log batch progress', 'Print each processed job id and save the log to out/batch.log.', `driver.find_elements(:css, ".job-id").each do |el|\n  puts el.text\nend\nFile.write("out/batch.log", "processed")`, { file: { name: 'out/batch.log', contains: 'processed' }, outputIncludes: 'job-106' }, 'Output and file evidence can be checked together.', BATCH_OPTS));
    specs.push(vSpec('Batch with next signal', 'Use next to collect only successful job ids.', `ids = []\ndriver.find_elements(:css, ".job").each do |job|\n  next unless job.attribute("data-status") == "success"\n  ids = ids + [job.attribute("data-id")]\nend\nids`, ['job-101', 'job-104'], 'next skips rows that do not match.', BATCH_OPTS));
    specs.push(vSpec('Manual loop with break', 'Use a while loop to collect the first four job ids.', `jobs = driver.find_elements(:css, ".job-id")\nids = []\ni = 0\nwhile i < jobs.length\n  break if ids.length == 4\n  ids = ids + [jobs[i].text]\n  i = i + 1\nend\nids`, ['job-101', 'job-102', 'job-103', 'job-104'], 'Manual loops need their own guard.', BATCH_OPTS));
    specs.push(vSpec('Batch pages into groups', 'Crawl three pages and return dish names grouped by page number.', `pages = {}\n[1, 2, 3].each do |page|\n  driver.get("https://diners.example/menu/page/" + page.to_s)\n  pages[page.to_s] = driver.find_elements(:css, ".dish").map { |el| el.text }\nend\npages`, { '1': ['Pancakes', 'Waffles', 'Omelette'], '2': ['Cheeseburger', 'Caesar Salad', 'Grilled Cheese'], '3': ['Steak', 'Salmon', 'Vegetable Curry'] }, 'Build a page-to-items map in the loop.', PAGE_OPTS));
    specs.push(vSpec('Batch failure count', 'Return the number of failed jobs with more than one attempt.', `driver.find_elements(:css, ".job-failure").count { |job| job.attribute("data-attempts").to_i > 1 }`, 2, 'count with a block is a compact batch filter.', BATCH_OPTS));
    specs.push(vSpec('Pending job attempts', 'Return the total attempts for pending jobs.', `total = 0\ndriver.find_elements(:css, ".job-pending").each do |job|\n  total = total + job.attribute("data-attempts").to_i\nend\ntotal`, 1, 'Pending jobs may already have attempts.', BATCH_OPTS));
    specs.push(vSpec('Batch id suffix filter', 'Return ids whose numeric suffix is greater than 103.', `ids = []\ndriver.find_elements(:css, ".job-id").each do |el|\n  value = el.text.sub("job-", "").to_i\n  if value > 103\n    ids = ids + [el.text]\n  end\nend\nids`, ['job-104', 'job-105', 'job-106'], 'Parse the id suffix before filtering.', BATCH_OPTS));
    specs.push(vSpec('Bounded record batch', 'Process at most four records and return their names.', `names = []\ndriver.find_elements(:css, ".record").each do |row|\n  break if names.length == 4\n  names = names + [row.attribute("data-name")]\nend\nnames`, ['Pancakes', 'Waffles', 'Waffles', 'pancakes'], 'A bound keeps large batches predictable.', RECORD_OPTS));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'Error Signals & Missing Data';
    const specs = [];
    [['missing.json', '404'], ['error.json', '500'], ['limited.json', '429']].forEach((entry) => {
      specs.push(vSpec(`Status for ${entry[0]}`, `Fetch ${entry[0]} and return the response code.`, `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/${entry[0]}"))\nresponse.code`, entry[1], 'Check status codes before parsing a body.', API_OPTS));
      specs.push(vSpec(`Status integer for ${entry[0]}`, `Fetch ${entry[0]} and return the status as an integer.`, `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/${entry[0]}"))\nresponse.code.to_i`, Number(entry[1]), 'to_i converts the string code.', API_OPTS));
    });
    specs.push(vSpec('Empty payload length', 'Fetch the empty endpoint and return the number of records.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/empty.json"))\nJSON.parse(response.body).length`, 0, 'An empty array is a valid but empty result.', API_OPTS));
    specs.push(vSpec('Empty payload is empty?', 'Fetch the empty endpoint and return whether the parsed array is empty.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/empty.json"))\nJSON.parse(response.body).empty?`, true, 'empty? is a clear missing-data signal.', API_OPTS));
    specs.push(vSpec('Error body code', 'Fetch error.json and return the code field from the JSON body.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/error.json"))\nJSON.parse(response.body)["code"]`, 500, 'The body may repeat the status as structured data.', API_OPTS));
    specs.push(vSpec('Rate limit retry value', 'Fetch limited.json and return retry_after from the JSON body.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/limited.json"))\nJSON.parse(response.body)["retry_after"]`, 30, 'Retry hints often live in the response body.', API_OPTS));
    specs.push(oSpec('Rescue HTTP response value', 'Fetch missing.json, call value, and print the rescued error class.', `begin\n  response = Net::HTTP.get_response(URI.parse("https://diners.example/api/missing.json"))\n  response.value\nrescue RubyError => error\n  puts error.class\nend`, ['RubyError'], 'value raises on 4xx and 5xx responses.', API_OPTS));
    specs.push(stSpec('Log HTTP failure', 'Rescue a 500 response and write the error class to out/http-error.log.', `begin\n  response = Net::HTTP.get_response(URI.parse("https://diners.example/api/error.json"))\n  response.value\nrescue RubyError => error\n  File.write("out/http-error.log", error.class)\nend`, { file: { name: 'out/http-error.log', contains: 'RubyError' } }, 'Persist failure signals for later triage.', API_OPTS));
    specs.push(vSpec('Invalid records count', 'Fetch invalid.json and return the number of records.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/invalid.json"))\nJSON.parse(response.body).length`, 4, 'Count rows before validating each one.', API_OPTS));
    specs.push(vSpec('Invalid records missing name', 'Count records in invalid.json whose name is missing or not usable text.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/invalid.json"))\nrecords = JSON.parse(response.body)\nrecords.count { |record| !record.key?("name") || record["name"].to_s.strip.empty? || record["name"].to_s == "42" || record["name"].to_s == "[]" }`, 3, 'key? and to_s detect absent or unusable names.', API_OPTS));
    specs.push(vSpec('Invalid records missing price', 'Count records in invalid.json with no usable price.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/invalid.json"))\nrecords = JSON.parse(response.body)\nrecords.count { |record| record["price"].to_s.gsub(/[^0-9.]/, "").to_f <= 0 }`, 4, 'Treat non-numeric prices as missing data.', API_OPTS));
    specs.push(vSpec('Blank record names', 'Count records in the ledger with an empty name.', `driver.find_elements(:css, ".record").count { |row| row.attribute("data-name").strip.empty? }`, 1, 'Blank strings are a common missing-data signal.', RECORD_OPTS));
    specs.push(vSpec('Blank record emails', 'Count records in the ledger with an empty email.', `driver.find_elements(:css, ".record").count { |row| row.attribute("data-email").strip.empty? }`, 1, 'Check optional fields before export.', RECORD_OPTS));
    specs.push(vSpec('Blank record dates', 'Count records in the ledger with an empty updated value.', `driver.find_elements(:css, ".record").count { |row| row.attribute("data-updated").strip.empty? }`, 1, 'Missing dates can break reporting.', RECORD_OPTS));
    specs.push(vSpec('Empty result marker', 'Return the data-count from the empty results block.', `driver.find_element(:css, "[data-key='empty-results']").attribute("data-count").to_i`, 0, 'Read explicit empty-state attributes.', BROKEN_OPTS));
    specs.push(vSpec('Error banner present', 'Return true when the diagnostics error banner exists.', `driver.find_elements(:css, "[data-key='error-banner']").length > 0`, true, 'Existence checks are a simple error signal.', BROKEN_OPTS));
    specs.push(oSpec('Rescue missing element and continue', 'Rescue a missing element and print the text of the error banner.', `begin\n  driver.find_element(:id, "absent")\nrescue NoSuchElementError\n  puts driver.find_element(:css, "[data-key='error-banner']").text\nend`, ['Error: upstream request failed with HTTP 500.'], 'Recover with a known diagnostic element.', BROKEN_OPTS));
    specs.push(oSpec('Ensure after rescue', 'Rescue a missing element and print both the error class and the ensure marker.', `begin\n  driver.find_element(:id, "absent")\nrescue NoSuchElementError => error\n  puts error.class\nensure\n  puts "checked"\nend`, ['NoSuchElementError', 'checked'], 'ensure runs after the rescue body.', BROKEN_OPTS));
    specs.push(vSpec('Missing data fallback', 'Return each record name or "UNKNOWN" when blank.', `driver.find_elements(:css, ".record").map do |row|\n  name = row.attribute("data-name").strip\n  if name.empty?\n    "UNKNOWN"\n  else\n    name\n  end\nend`, ['Pancakes', 'Waffles', 'Waffles', 'pancakes', 'Coffee', 'Steak', 'UNKNOWN', 'Caesar Salad', 'Coffee', 'Caesar Salad'], 'Use a fallback instead of exporting blanks.', RECORD_OPTS));
    specs.push(vSpec('Missing price fallback', 'Return prices with a 0 fallback for blank values.', `driver.find_elements(:css, ".record").map do |row|\n  raw = row.attribute("data-price").strip\n  if raw.empty?\n    0\n  else\n    raw.gsub(/[^0-9.]/, "").to_f\n  end\nend`, [8, 9, 9, 8, 3, 24, 0, 9.5, 3, 9.5], 'Normalize after checking for blanks.', RECORD_OPTS));
    specs.push(stSpec('Write missing-data report', 'Write a JSON report listing the count of blank names and emails.', `blank_names = driver.find_elements(:css, ".record").count { |row| row.attribute("data-name").strip.empty? }\nblank_emails = driver.find_elements(:css, ".record").count { |row| row.attribute("data-email").strip.empty? }\nFile.write("out/missing.json", JSON.generate({ names: blank_names, emails: blank_emails }))`, { file: { name: 'out/missing.json', contains: '"names":1' } }, 'Store missing-data counts in a report.', RECORD_OPTS));
    specs.push(vSpec('HTTP status text', 'Fetch missing.json and return the response message.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/missing.json"))\nresponse.message`, 'Not Found', 'The message explains the numeric status.', API_OPTS));
    specs.push(vSpec('Success status check', 'Fetch menu.json and return whether the code equals "200".', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json"))\nresponse.code == "200"`, true, 'Compare the string code before parsing.', API_OPTS));
    specs.push(vSpec('Malformed field value', 'Fetch invalid.json and return the first bad id as text.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/invalid.json"))\nJSON.parse(response.body)[0]["id"].to_s`, 'bad-id', 'Wrong field values are error signals too.', API_OPTS));
    specs.push(vSpec('Malformed nested field', 'Fetch invalid.json and return the fourth category as text.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/invalid.json"))\nJSON.parse(response.body)[3]["category"].to_s`, '7', 'Nested value checks catch bad records.', API_OPTS));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'Reliable Scraping Workflows';
    const specs = [];
    const paths = ['evidence/workflow.png', 'evidence/reliable.png', 'evidence/run.png'];
    paths.forEach((path, index) => {
      specs.push(stSpec(`Workflow screenshot ${index + 1}`, `Navigate to the menu, extract the first dish, and save a screenshot to ${path}.`, `first = driver.find_element(:css, ".dish").text\nFile.write("out/workflow-${index + 1}.txt", first)\ndriver.save_screenshot("${path}")`, { screenshotPath: path }, 'Combine extraction, evidence, and navigation in one run.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/menu' }));
    });
    specs.push(vSpec('Login then scrape ledger', 'Sign in and return the number of private ledger rows.', `driver.find_element(:id, "login-username").send_keys("ada")\ndriver.find_element(:id, "login-password").send_keys("coffee")\ndriver.find_element(:id, "login-submit").click\ndriver.find_elements(:css, ".private").length`, 3, 'Authenticate before reading protected rows.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/login' }));
    specs.push(stSpec('Login evidence bundle', 'Sign in and save a screenshot to evidence/ledger.png.', `driver.find_element(:id, "login-username").send_keys("ada")\ndriver.find_element(:id, "login-password").send_keys("coffee")\ndriver.find_element(:id, "login-submit").click\ndriver.save_screenshot("evidence/ledger.png")`, { screenshotPath: 'evidence/ledger.png', signedIn: true }, 'Evidence should be captured in the authenticated session.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/login' }));
    specs.push(stSpec('Protected workflow export', 'Sign in, collect private rows, and write them to out/ledger.json.', `driver.find_element(:id, "login-username").send_keys("ada")\ndriver.find_element(:id, "login-password").send_keys("coffee")\ndriver.find_element(:id, "login-submit").click\nrows = driver.find_elements(:css, ".private").map { |el| el.text }\nFile.write("out/ledger.json", JSON.generate(rows))`, { file: { name: 'out/ledger.json', contains: '[' } }, 'Export only after authentication.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/login' }));
    specs.push(vSpec('Wait then navigate workflow', 'Wait for the coffee ticket, then navigate to the menu and return the title.', `wait = Selenium::WebDriver::Wait.new(timeout: 6)\nwait.until { driver.find_element(:id, "w1").displayed? }\ndriver.get("https://diners.example/menu")\ndriver.title`, 'All-Day Menu', 'Finish timing-sensitive work before changing pages.', { routes: CURRICULUM_ROUTES, startUrl: DELAYED.url }));
    specs.push(stSpec('Wait then evidence', 'Wait for the final ticket and save a screenshot to evidence/final-ticket.png.', `wait = Selenium::WebDriver::Wait.new(timeout: 6)\nwait.until { driver.find_element(:id, "w3").displayed? }\ndriver.save_screenshot("evidence/final-ticket.png")`, { screenshotPath: 'evidence/final-ticket.png', clock: 4500 }, 'The clock should show the wait actually happened.', DELAYED_OPTS));
    specs.push(vSpec('Crawl and export workflow', 'Crawl all paged dishes and return the count written to a JSON file.', `names = []\nurl = "https://diners.example/menu/page/1"\nwhile url\n  driver.get(url)\n  names = names + driver.find_elements(:css, ".dish").map { |el| el.text }\n  links = driver.find_elements(:css, ".next")\n  if links.length > 0\n    url = links[0].attribute("href")\n  else\n    url = nil\n  end\nend\nFile.write("out/crawl.json", JSON.generate(names))\nnames.length`, 9, 'A workflow can verify both the result and the export.', PAGE_OPTS));
    specs.push(stSpec('Crawl and check export', 'Crawl all pages and write dish names to out/crawl-check.json.', `names = []\nurl = "https://diners.example/menu/page/1"\nwhile url\n  driver.get(url)\n  names = names + driver.find_elements(:css, ".dish").map { |el| el.text }\n  links = driver.find_elements(:css, ".next")\n  if links.length > 0\n    url = links[0].attribute("href")\n  else\n    url = nil\n  end\nend\nFile.write("out/crawl-check.json", JSON.generate(names))`, { file: { name: 'out/crawl-check.json', contains: 'Vegetable Curry' } }, 'Check the last dish made it into the export.', PAGE_OPTS));
    specs.push(stSpec('Workflow with checkpoint', 'Write a checkpoint after reading menu page 1.', `driver.find_elements(:css, ".dish")\nFile.write("out/workflow-checkpoint.json", JSON.generate({ page: 1 }))`, { file: { name: 'out/workflow-checkpoint.json', contains: '"page":1' } }, 'Checkpoints make workflows resumable.', PAGE_OPTS));
    specs.push(vSpec('Batch with checkpoint', 'Process the first two batch jobs and return their ids.', `ids = []\ndriver.find_elements(:css, ".job-id").each do |el|\n  break if ids.length == 2\n  ids = ids + [el.text]\nend\nFile.write("out/batch-state.json", JSON.generate(ids))\nids`, ['job-101', 'job-102'], 'Keep the in-memory result and saved state in sync.', BATCH_OPTS));
    specs.push(stSpec('Batch checkpoint file', 'Write a checkpoint containing the first processed batch job.', `id = driver.find_element(:css, ".job-id").text\nFile.write("out/first-job.json", JSON.generate({ id: id }))`, { file: { name: 'out/first-job.json', contains: 'job-101' } }, 'Persist the first processed id.', BATCH_OPTS));
    specs.push(vSpec('Diagnose then recover', 'Read the error code, click the recovery link, and return the final title.', `code = driver.find_element(:css, "[data-key='error-banner']").attribute("data-code")\ndriver.find_element(:css, ".recovery-link").click\ndriver.title`, 'Record Ledger', 'Use the diagnostic signal before recovering.', BROKEN_OPTS));
    specs.push(stSpec('Diagnose with evidence', 'Read the error banner and save a screenshot to evidence/recovery.png.', `error = driver.find_element(:css, "[data-key='error-banner']").text\ndriver.save_screenshot("evidence/recovery.png")`, { screenshotPath: 'evidence/recovery.png' }, 'Pair the message with a screenshot.', BROKEN_OPTS));
    specs.push(oSpec('Rescue then recover', 'Rescue a missing element and print the recovery link text.', `begin\n  driver.find_element(:id, "absent")\nrescue NoSuchElementError\n  puts driver.find_element(:css, ".recovery-link").text\nend`, ['Recover with the records page'], 'Recover to a known good element.', BROKEN_OPTS));
    specs.push(stSpec('Rescue then save status', 'Rescue a missing element and write "recovered" to out/recovery.log.', `begin\n  driver.find_element(:id, "absent")\nrescue NoSuchElementError\n  File.write("out/recovery.log", "recovered")\nend`, { file: { name: 'out/recovery.log', contains: 'recovered' } }, 'Rescue paths should leave durable evidence.', BROKEN_OPTS));
    specs.push(vSpec('API then page cross-check', 'Fetch API menu names and return the first name found on the menu page.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json"))\nname = JSON.parse(response.body)[0]["name"]\ndriver.get("https://diners.example/menu")\ndriver.find_elements(:css, ".food").map { |el| el.text }.include?(name)`, true, 'Cross-check an API record against rendered HTML.', { routes: CURRICULUM_ROUTES, api: API }));
    specs.push(vSpec('API status gate', 'Fetch menu.json and only return its length when the status is 200.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json"))\nif response.code == "200"\n  JSON.parse(response.body).length\nelse\n  0\nend`, 3, 'Gate parsing on a successful status.', API_OPTS));
    specs.push(stSpec('API failure gate', 'Fetch error.json and write "failed" only when the status is not 200.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/error.json"))\nif response.code != "200"\n  File.write("out/api-gate.log", "failed")\nend`, { file: { name: 'out/api-gate.log', contains: 'failed' } }, 'Failure gates should be explicit.', API_OPTS));
    specs.push(stSpec('Rate limit pause workflow', 'Read the crawl delay from robots.txt and advance the clock by that amount.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/robots.txt"))\nif response.body.include?("Crawl-delay: 2")\n  driver.sleep(2)\nend`, { clock: 2000 }, 'Pause only when robots asks for a delay.', { api: API, scene: B }));
    specs.push(vSpec('Compliance workflow check', 'Read robots.txt and terms, then return true when both allow /menu and personal use.', `robots = Net::HTTP.get_response(URI.parse("https://diners.example/robots.txt")).body\nterms = Net::HTTP.get_response(URI.parse("https://diners.example/terms.txt")).body\nrobots.include?("Allow: /menu") && terms.include?("Personal use only")`, true, 'Check policy sources before crawling.', API_OPTS));
    specs.push(stSpec('Workflow report', 'Write a JSON workflow report with page and dish count.', `count = driver.find_elements(:css, ".dish").length\nFile.write("out/workflow-report.json", JSON.generate({ page: 1, dishes: count }))`, { file: { name: 'out/workflow-report.json', contains: '"dishes":6' } }, 'A compact report closes the workflow loop.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/menu' }));
    specs.push(vSpec('Shadow workflow', 'Read shadow dish names and count light decoys.', `menu = driver.find_element(:id, "shadow-menu").shadow_root.find_elements(:css, ".dish-name").map { |el| el.text }\ndecoys = driver.find_elements(:css, ".light-dish").length\n[menu.length, decoys]`, [2, 1], 'Separate scoped data from decoys.', SHADOW_OPTS));
    specs.push(stSpec('Shadow evidence', 'Collect shadow dishes and save a screenshot to evidence/shadow.png.', `driver.find_element(:id, "shadow-menu").shadow_root.find_elements(:css, ".dish")\ndriver.save_screenshot("evidence/shadow.png")`, { screenshotPath: 'evidence/shadow.png' }, 'Save evidence after scoped extraction.', SHADOW_OPTS));
    specs.push(vSpec('Batch failure workflow', 'Return failed job ids along with their attempt counts.', `driver.find_elements(:css, ".job-failure").map do |job|\n  [job.attribute("data-id"), job.attribute("data-attempts").to_i]\nend`, [['job-102', 3], ['job-105', 2]], 'Include diagnostic metadata with failures.', BATCH_OPTS));
    specs.push(stSpec('Batch failure log', 'Write failed job ids to out/failures.log.', `ids = driver.find_elements(:css, ".job-failure").map { |job| job.attribute("data-id") }\nFile.write("out/failures.log", ids.join(","))`, { file: { name: 'out/failures.log', contains: 'job-105' } }, 'A failure log supports later retries.', BATCH_OPTS));
    specs.push(vSpec('Workflow cleanup state', 'Navigate to the menu, save a screenshot, and quit the driver.', `driver.get("https://diners.example/menu")\ndriver.save_screenshot("evidence/cleanup.png")\ndriver.quit`, { kind: 'state', state: { screenshotPath: 'evidence/cleanup.png', quitFlag: true, url: 'https://diners.example/menu' } }, 'End a reliable workflow with a clean shutdown.', { routes: CURRICULUM_ROUTES }));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'Structured Extraction & Export';
    const specs = [];
    const records = [
      { key: 'id', expected: ['1', '2', '2', '3', '4', '5', '6', '7', '8', '7'] },
      { key: 'name', expected: ['Pancakes', 'Waffles', 'Waffles', 'pancakes', 'Coffee', 'Steak', '', 'Caesar Salad', 'Coffee', 'Caesar Salad'] },
      { key: 'price', expected: ['8', '$ 9.00', '9', '8', '$3', '24.00', '7.50', '$ 9.50', '3.00', '9.5'] },
      { key: 'category', expected: ['breakfast', 'Breakfast', 'breakfast', 'breakfast', 'drink', 'Dinner', '', 'lunch', 'Drink', 'LUNCH'] },
      { key: 'updated', expected: ['2026-11-01', '11/02/2026', '2026-11-02', '2026-11-03', '2026-11-04', '2026-11-05', '', '2026-11-07', '2026-11-08', '2026-11-07'] }
    ];
    records.forEach((field) => {
      specs.push(vSpec(`Extract record ${field.key}`, `Return the ${field.key} value from every record.`, `driver.find_elements(:css, ".record").map { |row| row.attribute("data-${field.key}") }`, field.expected, 'Read the data attribute from each row.', RECORD_OPTS));
    });
    specs.push(vSpec('Build record hashes', 'Return a hash for each record with id, name, and price.', `driver.find_elements(:css, ".record").map do |row|\n  { id: row.attribute("data-id"), name: row.attribute("data-name"), price: row.attribute("data-price") }\nend`, [
      { id: '1', name: 'Pancakes', price: '8' }, { id: '2', name: 'Waffles', price: '$ 9.00' },
      { id: '2', name: 'Waffles', price: '9' }, { id: '3', name: 'pancakes', price: '8' },
      { id: '4', name: 'Coffee', price: '$3' }, { id: '5', name: 'Steak', price: '24.00' },
      { id: '6', name: '', price: '7.50' }, { id: '7', name: 'Caesar Salad', price: '$ 9.50' },
      { id: '8', name: 'Coffee', price: '3.00' }, { id: '7', name: 'Caesar Salad', price: '9.5' }
    ], 'Map each row into a structured hash.', RECORD_OPTS));
    specs.push(vSpec('Menu name and price pairs', 'Return menu dishes as name and price pairs.', `driver.find_elements(:css, ".dish").map do |dish|\n  [dish.find_element(:css, ".food").text, dish.find_element(:css, ".price").text]\nend`, [['Pancakes', '$8'], ['Waffles', '$9'], ['Bacon & Eggs', '$10'], ['Oatmeal', '$6'], ['Fruit Bowl', '$7'], ['Sausage', '$8']], 'Use scoped finds inside each dish.', { scene: B }));
    specs.push(stSpec('Export menu JSON', 'Write menu dish names as JSON to out/menu-dishes.json.', `names = driver.find_elements(:css, ".food").map { |el| el.text }\nFile.write("out/menu-dishes.json", JSON.generate(names))`, { file: { name: 'out/menu-dishes.json', contains: 'Pancakes' } }, 'JSON.generate turns an array into a JSON string.', { scene: B }));
    specs.push(stSpec('Export records JSON', 'Write all record hashes as JSON to out/records.json.', `rows = driver.find_elements(:css, ".record").map do |row|\n  { id: row.attribute("data-id"), name: row.attribute("data-name"), price: row.attribute("data-price") }\nend\nFile.write("out/records.json", JSON.generate(rows))`, { file: { name: 'out/records.json', contains: 'Caesar Salad' } }, 'Structured rows are ready for export.', RECORD_OPTS));
    specs.push(stSpec('Export CSV with CSV.generate', 'Write record names and prices to out/records.csv.', `rows = [["name", "price"]]\ndriver.find_elements(:css, ".record").each do |row|\n  rows = rows + [[row.attribute("data-name"), row.attribute("data-price")]]\nend\nFile.write("out/records.csv", CSV.generate(rows))`, { file: { name: 'out/records.csv', contains: 'name,price' } }, 'CSV.generate handles quoting and commas.', RECORD_OPTS));
    specs.push(vSpec('CSV export string', 'Return CSV text with headers and the first three record names.', `rows = [["name"]]\nrows = rows + driver.find_elements(:css, ".record").first(3).map { |row| [row.attribute("data-name")] }\nCSV.generate(rows)`, "name\nPancakes\nWaffles\nWaffles", 'Return the generated CSV string when no file is needed.', RECORD_OPTS));
    specs.push(stSpec('Nested JSON export', 'Write a JSON object with records nested under a data key.', `rows = driver.find_elements(:css, ".record").map { |row| row.attribute("data-name") }\nFile.write("out/nested.json", JSON.generate({ data: { records: rows } }))`, { file: { name: 'out/nested.json', contains: '"records"' } }, 'Nested hashes become nested JSON.', RECORD_OPTS));
    specs.push(vSpec('Extract emails', 'Return non-blank email addresses from the ledger.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-email") }.reject { |email| email.empty? }`, ['ada@example.com', 'grace@example.com', 'grace@example.com', 'alan@example.com', 'missing@example.com', 'caesar@example.com', 'grace@example.com', 'caesar@example.com'], 'reject removes blank optional values.', RECORD_OPTS));
    specs.push(vSpec('Extract field by data-key', 'Return the price text from the second record using a data-key selector.', `driver.find_element(:css, "[data-key='record-2-price']").text`, '$ 9.00', 'A data-key selector targets one field precisely.', RECORD_OPTS));
    specs.push(vSpec('Extract category counts', 'Return a hash of downcased categories to row counts.', `counts = {}\ndriver.find_elements(:css, ".record").each do |row|\n  category = row.attribute("data-category").downcase\n  counts[category] = (counts[category] || 0) + 1\nend\ncounts`, { breakfast: 5, drink: 3, dinner: 1, lunch: 1 }, 'Normalize keys while extracting structure.', RECORD_OPTS));
    specs.push(stSpec('Write extraction summary', 'Write a text summary with the number of records extracted.', `count = driver.find_elements(:css, ".record").length\nFile.write("out/extraction-summary.txt", "records=" + count.to_s)`, { file: { name: 'out/extraction-summary.txt', contains: 'records=10' } }, 'A small summary is often enough evidence.', RECORD_OPTS));
    specs.push(vSpec('Menu details with attributes', 'Return each dish name with its data-category attribute.', `driver.find_elements(:css, ".dish").map do |dish|\n  [dish.find_element(:css, ".food").text, dish.attribute("data-category")]\nend`, [['Pancakes', 'sweet'], ['Waffles', 'sweet'], ['Bacon & Eggs', 'savory'], ['Oatmeal', 'healthy'], ['Fruit Bowl', 'healthy'], ['Sausage', 'savory']], 'Combine text and attribute extraction.', { scene: B }));
    specs.push(vSpec('Return first record hash', 'Return a hash for only the first ledger record.', `row = driver.find_element(:css, ".record")\n{ id: row.attribute("data-id"), email: row.attribute("data-email") }`, { id: '1', email: 'ada@example.com' }, 'A single row can still be structured.', RECORD_OPTS));
    specs.push(vSpec('Record keys', 'Return the keys from a structured record hash.', `row = { id: "1", name: "Pancakes", price: "8" }\nrow.keys`, ['id', 'name', 'price'], 'keys describes the export schema.', RECORD_OPTS));
    specs.push(vSpec('Record values', 'Return the values from a structured record hash.', `row = { id: "1", name: "Pancakes", price: "8" }\nrow.values`, ['1', 'Pancakes', '8'], 'values follows the same order as keys.', RECORD_OPTS));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'Network/API Scraping & Errors';
    const specs = [];
    [['menu.json', '200', 3], ['records.json', '200', 10], ['empty.json', '200', 0]].forEach((entry) => {
      specs.push(vSpec(`GET ${entry[0]} code`, `Fetch ${entry[0]} and return the response code.`, `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/${entry[0]}"))\nresponse.code`, entry[1], 'Always capture the response first.', API_OPTS));
      specs.push(vSpec(`GET ${entry[0]} count`, `Fetch ${entry[0]} and return the number of parsed records.`, `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/${entry[0]}"))\nJSON.parse(response.body).length`, entry[2], 'Parse only after checking the response.', API_OPTS));
    });
    specs.push(vSpec('API menu names', 'Fetch menu.json and return all item names.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json"))\nJSON.parse(response.body).map { |item| item["name"] }`, ['Pancakes', 'Coffee', 'Steak'], 'Map parsed records to names.', API_OPTS));
    specs.push(vSpec('API menu total', 'Fetch menu.json and sum the prices.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json"))\nJSON.parse(response.body).map { |item| item["price"] }.sum`, 35, 'sum works on numeric fields.', API_OPTS));
    specs.push(vSpec('API menu average', 'Fetch menu.json and return the rounded average price.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json"))\nprices = JSON.parse(response.body).map { |item| item["price"] }\nprices.sum.fdiv(prices.length).round(1)`, 11.7, 'fdiv keeps the average in floating-point before rounding.', API_OPTS));
    specs.push(vSpec('API category count', 'Fetch menu.json and count records in the sweet category.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json"))\nJSON.parse(response.body).count { |item| item["category"] == "sweet" }`, 1, 'Filter parsed records with count and a block.', API_OPTS));
    specs.push(vSpec('Error endpoint body', 'Fetch error.json and return the error field.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/error.json"))\nJSON.parse(response.body)["error"]`, 'internal server error', 'Error bodies often carry useful detail.', API_OPTS));
    specs.push(vSpec('Rate limit body', 'Fetch limited.json and return the retry_after field.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/limited.json"))\nJSON.parse(response.body)["retry_after"]`, 30, 'Read retry hints from the payload.', API_OPTS));
    specs.push(oSpec('Rescue 404 with value', 'Fetch missing.json, call value, and print the rescued message prefix.', `begin\n  response = Net::HTTP.get_response(URI.parse("https://diners.example/api/missing.json"))\n  response.value\nrescue RubyError => error\n  puts error.message\nend`, ['HTTP 404'], 'value raises for non-success statuses.', API_OPTS));
    specs.push(vSpec('Paginated envelope page', 'Fetch API page 2 and return the page field.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/page/2.json"))\nJSON.parse(response.body)["page"]`, 2, 'Paginated APIs often wrap items in an envelope.', API_OPTS));
    specs.push(vSpec('Paginated envelope next', 'Fetch API page 2 and return the next URL.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/page/2.json"))\nJSON.parse(response.body)["next"]`, 'https://diners.example/api/page/3.json', 'The next field tells you where to continue.', API_OPTS));
    specs.push(vSpec('Paginated envelope terminal', 'Fetch API page 3 and return the next field.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/page/3.json"))\nJSON.parse(response.body)["next"]`, null, 'nil next marks the final page.', API_OPTS));
    specs.push(vSpec('Crawl API pages', 'Follow next links and return the total number of items.', `count = 0\nurl = "https://diners.example/api/page/1.json"\nwhile url\n  response = Net::HTTP.get_response(URI.parse(url))\n  data = JSON.parse(response.body)\n  count = count + data["items"].length\n  url = data["next"]\nend\ncount`, 10, 'Loop until next is nil.', API_OPTS));
    specs.push(vSpec('Crawl API page numbers', 'Follow next links and return each page number.', `pages = []\nurl = "https://diners.example/api/page/1.json"\nwhile url\n  response = Net::HTTP.get_response(URI.parse(url))\n  data = JSON.parse(response.body)\n  pages = pages + [data["page"]]\n  url = data["next"]\nend\npages`, [1, 2, 3], 'Record the page field during the crawl.', API_OPTS));
    specs.push(vSpec('API records ids', 'Fetch records.json and return the id values.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/records.json"))\nJSON.parse(response.body).map { |record| record["id"] }`, [1, 2, 2, 3, 4, 5, 6, 7, 8, 7], 'Map parsed fields to an array.', API_OPTS));
    specs.push(vSpec('API records unique ids', 'Fetch records.json and return the number of unique ids.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/records.json"))\nJSON.parse(response.body).map { |record| record["id"] }.uniq.length`, 8, 'uniq detects repeated identifiers.', API_OPTS));
    specs.push(vSpec('API records with blank names', 'Fetch records.json and count records with blank names.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/records.json"))\nJSON.parse(response.body).count { |record| record["name"].to_s.strip.empty? }`, 1, 'Blank strings are missing data.', API_OPTS));
    specs.push(stSpec('Cache API response', 'Fetch menu.json and write the raw body to out/menu-api.json.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json"))\nFile.write("out/menu-api.json", response.body)`, { file: { name: 'out/menu-api.json', contains: 'Pancakes' } }, 'Caching raw responses helps debugging.', API_OPTS));
    specs.push(stSpec('API failure report', 'Fetch error.json and write a failure report when the code is not 200.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/error.json"))\nif response.code != "200"\n  File.write("out/api-failure.txt", response.code)\nend`, { file: { name: 'out/api-failure.txt', contains: '500' } }, 'Record the status that failed.', API_OPTS));
    specs.push(vSpec('Robots allow menu', 'Fetch robots.txt and return true when /menu is allowed.', `body = Net::HTTP.get_response(URI.parse("https://diners.example/robots.txt")).body\nbody.include?("Allow: /menu")`, true, 'Plain text endpoints can be checked with include?.', API_OPTS));
    specs.push(vSpec('Robots disallow orders', 'Fetch robots.txt and return true when /orders is disallowed.', `body = Net::HTTP.get_response(URI.parse("https://diners.example/robots.txt")).body\nbody.include?("Disallow: /orders")`, true, 'Read the rules before choosing a route.', API_OPTS));
    specs.push(vSpec('Strict robots disallow all', 'Fetch robots-strict.txt and return true when it disallows everything.', `body = Net::HTTP.get_response(URI.parse("https://diners.example/robots-strict.txt")).body\nbody.include?("Disallow: /")`, true, 'A broad disallow should stop crawling.', API_OPTS));
    specs.push(vSpec('Terms text', 'Fetch terms.txt and return true when it mentions personal use.', `body = Net::HTTP.get_response(URI.parse("https://diners.example/terms.txt")).body\nbody.include?("Personal use only")`, true, 'Policy text is another API-readable source.', API_OPTS));
    specs.push(vSpec('Privacy text', 'Fetch privacy.txt and return true when it mentions seven days.', `body = Net::HTTP.get_response(URI.parse("https://diners.example/privacy.txt")).body\nbody.include?("seven days")`, true, 'Retention rules are part of responsible scraping.', API_OPTS));
    specs.push(vSpec('Content type header', 'Fetch menu.json and return the content-type header.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json"))\nresponse["content-type"]`, 'application/json', 'Response headers describe the payload.', API_OPTS));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'Data Normalization';
    const specs = [];
    const rawValues = [
      { key: 'name', solution: 'strip', expected: ['Pancakes', 'Waffles', 'Waffles', 'pancakes', 'Coffee', 'Steak', '', 'Caesar Salad', 'Coffee', 'Caesar Salad'] },
      { key: 'price', solution: 'gsub(/[^0-9.]/, "").to_f', expected: [8, 9, 9, 8, 3, 24, 7.5, 9.5, 3, 9.5] },
      { key: 'category', solution: 'strip.downcase', expected: ['breakfast', 'breakfast', 'breakfast', 'breakfast', 'drink', 'dinner', '', 'lunch', 'drink', 'lunch'] },
      { key: 'updated', solution: 'strip', expected: ['2026-11-01', '11/02/2026', '2026-11-02', '2026-11-03', '2026-11-04', '2026-11-05', '', '2026-11-07', '2026-11-08', '2026-11-07'] }
    ];
    rawValues.forEach((field) => {
      specs.push(vSpec(`Normalize record ${field.key}`, `Read every record ${field.key} and normalize it with ${field.solution}.`, `driver.find_elements(:css, ".record").map { |row| row.attribute("data-${field.key}").${field.solution} }`, field.expected, 'Apply the same normalization to every row.', RECORD_OPTS));
    });
    specs.push(vSpec('Capitalize names', 'Return each non-blank record name in capitalized form.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-name").strip.capitalize }.reject { |name| name.empty? }`, ['Pancakes', 'Waffles', 'Waffles', 'Pancakes', 'Coffee', 'Steak', 'Caesar Salad', 'Coffee', 'Caesar Salad'], 'capitalize fixes case for display.', RECORD_OPTS));
    specs.push(vSpec('Downcase emails', 'Return all non-blank emails in lowercase.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-email").downcase }.reject { |email| email.empty? }`, ['ada@example.com', 'grace@example.com', 'grace@example.com', 'alan@example.com', 'missing@example.com', 'caesar@example.com', 'grace@example.com', 'caesar@example.com'], 'Normalize case before deduplication.', RECORD_OPTS));
    specs.push(vSpec('Phone digits only', 'Return the digits from the messy phone value.', `driver.find_element(:css, "[data-key='messy-phone']").attribute("data-raw").gsub(/[^0-9]/, "")`, '5550100100', 'Strip non-digits with gsub.', { scene: S.messy }));
    specs.push(vSpec('Messy price to float', 'Convert the messy price string to a float.', `driver.find_element(:css, "[data-key='messy-price']").attribute("data-raw").gsub(/[^0-9.]/, "").to_f`, 1234.5, 'Remove symbols and separators before to_f.', { scene: S.messy }));
    specs.push(vSpec('Messy name collapse spaces', 'Collapse repeated whitespace in the messy name.', `driver.find_element(:css, "[data-key='messy-name']").attribute("data-raw").split.join(" ")`, 'ada lovelace', 'split with no argument uses whitespace.', { scene: S.messy }));
    specs.push(vSpec('Normalize blank names', 'Replace blank record names with UNKNOWN.', `driver.find_elements(:css, ".record").map do |row|\n  name = row.attribute("data-name").strip\n  name.empty? ? "UNKNOWN" : name\nend`, ['Pancakes', 'Waffles', 'Waffles', 'pancakes', 'Coffee', 'Steak', 'UNKNOWN', 'Caesar Salad', 'Coffee', 'Caesar Salad'], 'Ternaries keep fallback logic compact.', RECORD_OPTS));
    specs.push(vSpec('Normalize blank categories', 'Replace blank categories with uncategorized.', `driver.find_elements(:css, ".record").map do |row|\n  category = row.attribute("data-category").strip.downcase\n  category.empty? ? "uncategorized" : category\nend`, ['breakfast', 'breakfast', 'breakfast', 'breakfast', 'drink', 'dinner', 'uncategorized', 'lunch', 'drink', 'lunch'], 'Fallbacks prevent empty grouping keys.', RECORD_OPTS));
    specs.push(vSpec('Normalize currency symbols', 'Return all prices as numbers with currency symbols removed.', `driver.find_elements(:css, ".record").map do |row|\n  row.attribute("data-price").gsub(/[^0-9.]/, "").to_f\nend`, [8, 9, 9, 8, 3, 24, 7.5, 9.5, 3, 9.5], 'Currency cleanup is reusable.', RECORD_OPTS));
    specs.push(vSpec('Trim and sort names', 'Return trimmed, non-blank names sorted alphabetically.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-name").strip }.reject { |name| name.empty? }.sort`, ['Caesar Salad', 'Caesar Salad', 'Coffee', 'Coffee', 'Pancakes', 'pancakes', 'Steak', 'Waffles', 'Waffles'], 'sort orders the normalized values.', RECORD_OPTS));
    specs.push(vSpec('Normalized unique names', 'Return the number of unique downcased names.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-name").strip.downcase }.reject { |name| name.empty? }.uniq.length`, 4, 'Normalize before uniq for accurate deduplication.', RECORD_OPTS));
    specs.push(vSpec('Mask emails', 'Return masked local parts for all non-blank emails.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-email") }.reject { |email| email.empty? }.map { |email| email.split("@")[0][0] + "***@" + email.split("@")[1] }`, ['a***@example.com', 'g***@example.com', 'g***@example.com', 'a***@example.com', 'm***@example.com', 'c***@example.com', 'g***@example.com', 'c***@example.com'], 'Mask personal data before export.', RECORD_OPTS));
    specs.push(vSpec('Normalize by replacing separators', 'Return each updated value with / replaced by -.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-updated").gsub("/", "-") }`, ['2026-11-01', '11-02-2026', '2026-11-02', '2026-11-03', '2026-11-04', '2026-11-05', '', '2026-11-07', '2026-11-08', '2026-11-07'], 'gsub can normalize separators.', RECORD_OPTS));
    specs.push(vSpec('Normalize name whitespace', 'Collapse whitespace in every record name.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-name").split.join(" ") }`, ['Pancakes', 'Waffles', 'Waffles', 'pancakes', 'Coffee', 'Steak', '', 'Caesar Salad', 'Coffee', 'Caesar Salad'], 'split and join collapse runs of whitespace.', RECORD_OPTS));
    specs.push(vSpec('Normalize category display', 'Return categories as capitalized display labels.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-category").strip.downcase.capitalize }.reject { |category| category.empty? }`, ['Breakfast', 'Breakfast', 'Breakfast', 'Breakfast', 'Drink', 'Dinner', 'Lunch', 'Drink', 'Lunch'], 'Display formatting is a normalization step.', RECORD_OPTS));
    specs.push(vSpec('Normalize price strings', 'Return prices as strings with two decimals.', `driver.find_elements(:css, ".record").map do |row|\n  row.attribute("data-price").gsub(/[^0-9.]/, "").to_f.round(2).to_s\nend`, ['8.0', '9.0', '9.0', '8.0', '3.0', '24.0', '7.5', '9.5', '3.0', '9.5'], 'round before converting back to text.', RECORD_OPTS));
    specs.push(stSpec('Export normalized records', 'Write normalized name and price pairs as JSON.', `rows = driver.find_elements(:css, ".record").map do |row|\n  { name: row.attribute("data-name").strip.downcase, price: row.attribute("data-price").gsub(/[^0-9.]/, "").to_f }\nend\nFile.write("out/normalized.json", JSON.generate(rows))`, { file: { name: 'out/normalized.json', contains: '"price":9.5' } }, 'Export normalized values, not raw strings.', RECORD_OPTS));
    specs.push(vSpec('Normalized report hash', 'Return a hash with normalized counts for names, prices, and categories.', `rows = driver.find_elements(:css, ".record")\n{ names: rows.map { |row| row.attribute("data-name").strip }.length, prices: rows.map { |row| row.attribute("data-price").gsub(/[^0-9.]/, "").to_f }.sum.round(1), categories: rows.map { |row| row.attribute("data-category").downcase }.uniq.length }`, { names: 10, prices: 92, categories: 5 }, 'A normalized report summarizes clean fields.', RECORD_OPTS));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'Dates, Numbers & Units';
    const specs = [];
    specs.push(vSpec('ISO date parts', 'Split the messy ISO date and return year, month, and day.', `parts = driver.find_element(:css, "[data-key='messy-date']").text.split("-")\n[parts[0].to_i, parts[1].to_i, parts[2].to_i]`, [2026, 11, 4], 'split converts a date string into numeric parts.', { scene: S.messy }));
    specs.push(vSpec('US date to ISO', 'Convert 11/02/2026 to ISO form YYYY-MM-DD.', `parts = "11/02/2026".split("/")\nparts[2] + "-" + parts[0] + "-" + parts[1]`, '2026-11-02', 'Reorder the split parts.', { scene: S.messy }));
    specs.push(vSpec('ISO date to US', 'Convert 2026-11-04 to MM/DD/YYYY form.', `parts = "2026-11-04".split("-")\nparts[1] + "/" + parts[2] + "/" + parts[0]`, '11/04/2026', 'Reorder year, month, and day.', { scene: S.messy }));
    specs.push(vSpec('Date year', 'Return the year from the messy date.', `driver.find_element(:css, "[data-key='messy-date']").text.split("-")[0].to_i`, 2026, 'The first ISO part is the year.', { scene: S.messy }));
    specs.push(vSpec('Date month name', 'Return a short month name for month 11.', `months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]\nmonths[10]`, 'Nov', 'Arrays can map month numbers to names.', { scene: S.messy }));
    specs.push(vSpec('Record dates normalized', 'Convert every non-blank record date to ISO form.', `driver.find_elements(:css, ".record").map do |row|\n  value = row.attribute("data-updated")\n  if value.include?("/")\n    parts = value.split("/")\n    parts[2] + "-" + parts[0] + "-" + parts[1]\n  else\n    value\n  end\nend.reject { |value| value.empty? }`, ['2026-11-01', '2026-11-02', '2026-11-02', '2026-11-03', '2026-11-04', '2026-11-05', '2026-11-07', '2026-11-08', '2026-11-07'], 'Handle both date formats in one pass.', RECORD_OPTS));
    specs.push(vSpec('Price without currency', 'Convert the messy price to a float.', `"$ 1,234.50".gsub(/[^0-9.]/, "").to_f`, 1234.5, 'Remove currency and separators before to_f.', { scene: S.messy }));
    specs.push(vSpec('Price to cents', 'Convert $9.50 to an integer number of cents.', `("$9.50".gsub(/[^0-9.]/, "").to_f * 100).round`, 950, 'Multiply by 100 and round.', { scene: S.messy }));
    specs.push(vSpec('Price with tax', 'Compute the total for $9.50 with 8 percent tax.', `price = "$9.50".gsub(/[^0-9.]/, "").to_f\n(price * 1.08).round(2)`, 10.26, 'Use floating-point math for percentages.', { scene: S.messy }));
    specs.push(vSpec('Discounted price', 'Compute a 25 percent discount on $24.00.', `price = "$24.00".gsub(/[^0-9.]/, "").to_f\n(price * 0.75).round(2)`, 18, 'Round to two decimals after discount.', { scene: S.messy }));
    specs.push(vSpec('Total menu price', 'Sum all normalized record prices as a float.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-price").gsub(/[^0-9.]/, "").to_f }.sum.round(1)`, 92, 'Normalize each price before summing.', RECORD_OPTS));
    specs.push(vSpec('Average menu price', 'Return the rounded average normalized record price.', `prices = driver.find_elements(:css, ".record").map { |row| row.attribute("data-price").gsub(/[^0-9.]/, "").to_f }\nprices.sum.fdiv(prices.length).round(1)`, 9.2, 'fdiv keeps the average in floating-point.', RECORD_OPTS));
    specs.push(vSpec('Kilometers to miles', 'Convert 10 kilometers to miles rounded to one decimal.', `(10 * 0.621371).round(1)`, 6.2, 'Use a conversion factor and round.', { scene: S.messy }));
    specs.push(vSpec('Miles to kilometers', 'Convert 10 miles to kilometers rounded to one decimal.', `(10 * 1.609344).round(1)`, 16.1, 'Use the inverse conversion factor.', { scene: S.messy }));
    specs.push(vSpec('Pounds to kilograms', 'Convert 22 pounds to kilograms rounded to one decimal.', `(22 * 0.453592).round(1)`, 10, 'Round after unit conversion.', { scene: S.messy }));
    specs.push(vSpec('Celsius to Fahrenheit', 'Convert 20 Celsius to Fahrenheit.', `20 * 9 / 5 + 32`, 68, 'Integer arithmetic works for exact conversions.', { scene: S.messy }));
    specs.push(vSpec('Fahrenheit to Celsius', 'Convert 68 Fahrenheit to Celsius.', `(68 - 32) * 5 / 9`, 20, 'Subtract before multiplying.', { scene: S.messy }));
    specs.push(vSpec('Percent as decimal', 'Convert 8 percent to a decimal.', `8 * 0.01`, 0.08, 'Use a float divisor for percentages.', { scene: S.messy }));
    specs.push(vSpec('Decimal as percent', 'Convert 0.25 to a percent string.', `(0.25 * 100).to_i.to_s + "%"`, '25%', 'Build display strings from numbers.', { scene: S.messy }));
    specs.push(vSpec('Parse leading zero', 'Convert the string "007" to an integer.', `"007".to_i`, 7, 'to_i drops leading zeros.', { scene: S.messy }));
    specs.push(vSpec('Parse negative number', 'Convert the string "-12.5" to a float.', `"-12.5".to_f`, -12.5, 'to_f keeps the sign.', { scene: S.messy }));
    specs.push(vSpec('Number with thousands separator', 'Convert "1,234" to an integer.', `"1,234".gsub(",", "").to_i`, 1234, 'Remove separators before converting.', { scene: S.messy }));
    specs.push(stSpec('Export normalized numbers', 'Write normalized prices and dates as JSON.', `prices = driver.find_elements(:css, ".record").map { |row| row.attribute("data-price").gsub(/[^0-9.]/, "").to_f }\nFile.write("out/numbers.json", JSON.generate({ total: prices.sum.round(1) }))`, { file: { name: 'out/numbers.json', contains: '92' } }, 'Export numeric results, not raw strings.', RECORD_OPTS));
    specs.push(vSpec('Numeric comparison', 'Return true when the total normalized price is greater than 90.', `total = driver.find_elements(:css, ".record").map { |row| row.attribute("data-price").gsub(/[^0-9.]/, "").to_f }.sum\ntotal > 90`, true, 'Compare normalized numeric totals.', RECORD_OPTS));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  const api = {
    LEVELS,
    CHAPTERS,
    CHAPTER_BLURBS,
    PARTS,
    ROUTES
  };

  (() => {
    const chapter = 'Deduplication & Merging';
    const specs = [];
    specs.push(vSpec('Unique record ids', 'Return the number of unique record ids in the ledger.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-id") }.uniq.length`, 8, 'uniq removes repeated ids.', RECORD_OPTS));
    specs.push(vSpec('Unique record names', 'Return the number of unique non-blank names.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-name").strip.downcase }.reject { |name| name.empty? }.uniq.length`, 4, 'Normalize before removing duplicates.', RECORD_OPTS));
    specs.push(vSpec('Unique API ids', 'Fetch records.json and return the number of unique ids.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/records.json"))\nJSON.parse(response.body).map { |record| record["id"] }.uniq.length`, 8, 'API records can be deduplicated the same way.', API_OPTS));
    specs.push(vSpec('Duplicate id count', 'Return the number of ids that appear more than once.', `ids = driver.find_elements(:css, ".record").map { |row| row.attribute("data-id") }\nids.uniq.count { |id| ids.count(id) > 1 }`, 2, 'Filter the unique ids by their frequency.', RECORD_OPTS));
    specs.push(vSpec('Duplicate name count', 'Return the number of normalized names that repeat.', `names = driver.find_elements(:css, ".record").map { |row| row.attribute("data-name").strip.downcase }.reject { |name| name.empty? }\nnames.uniq.count { |name| names.count(name) > 1 }`, 3, 'Count repeated normalized names.', RECORD_OPTS));
    specs.push(vSpec('Duplicate names list', 'Return the normalized names that appear more than once.', `names = driver.find_elements(:css, ".record").map { |row| row.attribute("data-name").strip.downcase }.reject { |name| name.empty? }\nnames.uniq.select { |name| names.count(name) > 1 }`, ['pancakes', 'coffee', 'caesar salad'], 'select keeps only repeated names.', RECORD_OPTS));
    specs.push(vSpec('First record per id', 'Return the first row for each unique id.', `seen = []\nrows = []\ndriver.find_elements(:css, ".record").each do |row|\n  id = row.attribute("data-id")\n  if !seen.include?(id)\n    seen = seen + [id]\n    rows = rows + [row.attribute("data-name")]\n  end\nend\nrows`, ['Pancakes', 'Waffles', 'pancakes', 'Coffee', 'Steak', '', 'Caesar Salad'], 'Track ids while iterating.', RECORD_OPTS));
    specs.push(vSpec('Last record per id', 'Keep the last row for each id and return its name.', `rows = {}\ndriver.find_elements(:css, ".record").each do |row|\n  rows[row.attribute("data-id")] = row.attribute("data-name")\nend\nrows.values`, ['Pancakes', 'Waffles', 'pancakes', 'Coffee', 'Steak', '', 'Caesar Salad', 'Coffee'], 'Hash assignment overwrites earlier duplicates.', RECORD_OPTS));
    specs.push(vSpec('Merge duplicate ids by price', 'Keep the highest normalized price for each id.', `prices = {}\ndriver.find_elements(:css, ".record").each do |row|\n  id = row.attribute("data-id")\n  price = row.attribute("data-price").gsub(/[^0-9.]/, "").to_f\n  if !prices.key?(id) || price > prices[id]\n    prices[id] = price\n  end\nend\nprices`, { '1': 8, '2': 9, '3': 8, '4': 3, '5': 24, '6': 7.5, '7': 9.5, '8': 3 }, 'Compare values while merging.', RECORD_OPTS));
    specs.push(vSpec('Unique categories', 'Return the sorted unique normalized categories.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-category").strip.downcase }.reject { |category| category.empty? }.uniq.sort`, ['breakfast', 'dinner', 'drink', 'lunch'], 'Sort after deduplication for stable results.', RECORD_OPTS));
    specs.push(vSpec('API duplicate names', 'Fetch records.json and count duplicate normalized names.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/records.json"))\nnames = JSON.parse(response.body).map { |record| record["name"].strip.downcase }.reject { |name| name.empty? }\nnames.uniq.count { |name| names.count(name) > 1 }`, 4, 'Normalize API names before counting duplicates.', API_OPTS));
    specs.push(vSpec('API unique emails', 'Fetch records.json and return the number of unique non-blank emails.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/records.json"))\nemails = JSON.parse(response.body).map { |record| record["email"].strip.downcase }.reject { |email| email.empty? }\nemails.uniq.length`, 5, 'Blank values should not become duplicate records.', API_OPTS));
    specs.push(vSpec('Deduplicate menu names', 'Crawl all paged dishes and return the number of unique names.', `names = []\nurl = "https://diners.example/menu/page/1"\nwhile url\n  driver.get(url)\n  names = names + driver.find_elements(:css, ".dish").map { |el| el.text }\n  links = driver.find_elements(:css, ".next")\n  if links.length > 0\n    url = links[0].attribute("href")\n  else\n    url = nil\n  end\nend\nnames.uniq.length`, 9, 'uniq works across a crawl as well.', PAGE_OPTS));
    specs.push(stSpec('Export unique names', 'Write unique normalized names to out/unique-names.json.', `names = driver.find_elements(:css, ".record").map { |row| row.attribute("data-name").strip.downcase }.reject { |name| name.empty? }.uniq\nFile.write("out/unique-names.json", JSON.generate(names))`, { file: { name: 'out/unique-names.json', contains: 'caesar salad' } }, 'Export the deduplicated set.', RECORD_OPTS));
    specs.push(vSpec('Merge two arrays', 'Merge two id lists and return the unique ids.', `first = ["1", "2", "3"]\nsecond = ["3", "4", "5"]\n(first + second).uniq`, ['1', '2', '3', '4', '5'], 'Concatenate then deduplicate.', RECORD_OPTS));
    specs.push(vSpec('Merge duplicate records into hashes', 'Merge records by id, keeping the first name for each id.', `merged = {}\ndriver.find_elements(:css, ".record").each do |row|\n  id = row.attribute("data-id")\n  if !merged.key?(id)\n    merged[id] = row.attribute("data-name")\n  end\nend\nmerged`, { '1': 'Pancakes', '2': 'Waffles', '3': 'pancakes', '4': 'Coffee', '5': 'Steak', '6': '', '7': 'Caesar Salad', '8': 'Coffee' }, 'key? prevents overwriting the first value.', RECORD_OPTS));
    specs.push(vSpec('Count records after dedupe', 'Return the record count after removing duplicate normalized names.', `names = driver.find_elements(:css, ".record").map { |row| row.attribute("data-name").strip.downcase }\nnames.uniq.length`, 5, 'Including the blank name yields one extra unique value.', RECORD_OPTS));
    specs.push(vSpec('Preferred record by freshness', 'For each id, keep the record with the lexicographically latest ISO date.', `chosen = {}\ndriver.find_elements(:css, ".record").each do |row|\n  id = row.attribute("data-id")\n  updated = row.attribute("data-updated")\n  if !chosen.key?(id) || updated > chosen[id][0]\n    chosen[id] = [updated, row.attribute("data-price")]\n  end\nend\nchosen["2"][1]`, '9', 'ISO dates compare lexicographically.', RECORD_OPTS));
    specs.push(vSpec('Deduplicate with fetch', 'Use fetch to merge counts by normalized name.', `counts = {}\ndriver.find_elements(:css, ".record").each do |row|\n  name = row.attribute("data-name").strip.downcase\n  counts[name] = counts.fetch(name, 0) + 1\nend\ncounts.fetch("pancakes")`, 2, 'fetch supplies a default for new keys.', RECORD_OPTS));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'JSON & Schema Validation';
    const specs = [];
    const payload = `JSON.parse(Net::HTTP.get_response(URI.parse("https://diners.example/api/records.json")).body)`;
    const invalid = `JSON.parse(Net::HTTP.get_response(URI.parse("https://diners.example/api/invalid.json")).body)`;
    specs.push(vSpec('Valid records have ids', `Return true when every record in records.json has an id.`, `${payload}.all? { |record| record.key?("id") }`, true, 'key? checks required fields.', API_OPTS));
    specs.push(vSpec('Invalid records have ids', `Return true when every record in invalid.json has an id.`, `${invalid}.all? { |record| record.key?("id") }`, false, 'One record is missing id.', API_OPTS));
    specs.push(vSpec('Valid records have names', `Return true when every record in records.json has a name.`, `${payload}.all? { |record| record.key?("name") }`, true, 'Required fields should be present.', API_OPTS));
    specs.push(vSpec('Invalid records have names', `Return true when every record in invalid.json has a name.`, `${invalid}.all? { |record| record.key?("name") }`, true, 'A schema gate checks keys, not value quality.', API_OPTS));
    specs.push(vSpec('Invalid records missing price', `Count records in invalid.json without a price.`, `${invalid}.count { |record| !record.key?("price") || record["price"] == nil }`, 3, 'Missing keys and null both fail validation.', API_OPTS));
    specs.push(vSpec('Invalid records name not string', `Count records in invalid.json whose name does not look like text.`, `${invalid}.count { |record| record["name"].to_s.strip.empty? || record["name"].to_s == "42" || record["name"].to_s == "[]" }`, 3, 'Simple type signals work without full reflection.', API_OPTS));
    specs.push(vSpec('Valid schema keys', `Return the keys from the first valid record.`, `${payload}[0].keys.sort`, ['category', 'email', 'id', 'name', 'price', 'updated'], 'keys describes the record schema.', API_OPTS));
    specs.push(vSpec('Fetch required field', `Use fetch to read the first valid record name.`, `${payload}[0].fetch("name")`, 'Pancakes', 'fetch fails loudly for missing keys.', API_OPTS));
    specs.push(vSpec('Fetch with default', `Use fetch with a default for a missing field.`, `${payload}[0].fetch("missing", "unknown")`, 'unknown', 'Defaults help with optional fields.', API_OPTS));
    specs.push(vSpec('Validate required keys', `Return true when the first valid record has all schema keys.`, `record = ${payload}[0]\n["id", "name", "price", "category"].all? { |key| record.key?(key) }`, true, 'Check a list of required keys.', API_OPTS));
    specs.push(vSpec('Validate invalid first record', `Return true when the first invalid record passes the required-key check.`, `record = ${invalid}[0]\n["id", "name", "price", "email"].all? { |key| record.key?(key) }`, false, 'The first invalid record lacks email.', API_OPTS));
    specs.push(vSpec('Numeric price fields', `Count records in records.json whose price converts to a positive number.`, `${payload}.count { |record| record["price"].to_s.gsub(/[^0-9.]/, "").to_f > 0 }`, 10, 'Conversion can validate loose numeric fields.', API_OPTS));
    specs.push(vSpec('Blank name fields', `Count records in records.json with blank names.`, `${payload}.count { |record| record["name"].to_s.strip.empty? }`, 1, 'Blank strings fail a non-empty schema rule.', API_OPTS));
    specs.push(vSpec('Nested pagination schema', `Return true when API page 1 has page, next, and items keys.`, `data = JSON.parse(Net::HTTP.get_response(URI.parse("https://diners.example/api/page/1.json")).body)\n["page", "next", "items"].all? { |key| data.key?(key) }`, true, 'Envelopes have their own schema.', API_OPTS));
    specs.push(vSpec('Nested validation count', `Return the number of items inside API page 1.`, `data = JSON.parse(Net::HTTP.get_response(URI.parse("https://diners.example/api/page/1.json")).body)\ndata.fetch("items").length`, 3, 'fetch can read a nested array.', API_OPTS));
    specs.push(stSpec('Write validation report', `Write a validation report with the number of invalid records.`, `records = ${invalid}\nbad = records.count { |record| !record.key?("email") || record["email"].to_s.strip.empty? || record["email"].to_s == "123" }\nFile.write("out/validation.json", JSON.generate({ invalid: bad }))`, { file: { name: 'out/validation.json', contains: '"invalid":4' } }, 'Save schema validation results.', API_OPTS));
    specs.push(vSpec('Parse checkpoint JSON', `Parse a seeded checkpoint file and return the page value.`, `data = JSON.parse(File.read("out/schema-checkpoint.json"))\ndata["page"]`, 2, 'JSON.parse works on simulated file contents.', { scene: B, files: { 'out/schema-checkpoint.json': '{"page":2,"done":false}' } }));
    specs.push(vSpec('Checkpoint key check', `Return true when the checkpoint has a done key.`, `data = JSON.parse(File.read("out/schema-checkpoint.json"))\ndata.key?("done")`, true, 'key? works on parsed JSON objects.', { scene: B, files: { 'out/schema-checkpoint.json': '{"page":2,"done":false}' } }));
    specs.push(vSpec('Transform record values', `Transform valid record names to lowercase and return the first three.`, `${payload}.map { |record| record["name"] }.first(3).map { |name| name.downcase }`, ['pancakes', 'waffles', 'waffles'], 'transform_values is available on hashes too.', API_OPTS));
    specs.push(vSpec('Hash transform values', `Use transform_values on a sample schema map.`, `schema = { name: "TEXT", price: "NUMBER" }\nschema.transform_values { |value| value.downcase }.values`, ['text', 'number'], 'transform_values normalizes schema metadata.', API_OPTS));
    specs.push(vSpec('Merge schema maps', `Merge required and optional schema maps and return the key count.`, `required = { id: true, name: true }\noptional = { email: false, price: false }\nrequired.merge(optional).keys.length`, 4, 'merge combines schema definitions.', API_OPTS));
    specs.push(vSpec('Valid JSON body', `Fetch menu.json and return true when the body parses.`, `body = Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json")).body\nJSON.parse(body).length > 0`, true, 'Successful parsing is the first schema check.', API_OPTS));
    specs.push(vSpec('Header validation', `Fetch menu.json and return true when content-type is application/json.`, `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json"))\nresponse["content-type"] == "application/json"`, true, 'Headers are part of the response contract.', API_OPTS));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'CSV & Tabular Data';
    const specs = [];
    const csv = 'name,price,category\nPancakes,8,breakfast\nWaffles,$9.00,breakfast\nCoffee,$3,drink\nSteak,24.00,dinner\n';
    const FILES = { scene: B, files: { 'input/menu.csv': csv } };
    const DATA_ROWS = `\ndata_rows = []\nrow_index = 1\nwhile row_index < rows.length\n  data_rows = data_rows + [rows[row_index]]\n  row_index = row_index + 1\nend`;
    specs.push(vSpec('Parse CSV rows', 'Read input/menu.csv and return the number of parsed rows.', `rows = CSV.parse(File.read("input/menu.csv"))\nrows.length`, 5, 'CSV.parse includes the header row.', FILES));
    specs.push(vSpec('CSV header', 'Return the header row from input/menu.csv.', `CSV.parse(File.read("input/menu.csv"))[0]`, ['name', 'price', 'category'], 'The first row names the columns.', FILES));
    specs.push(vSpec('CSV data row count', 'Return the number of data rows, excluding the header.', `rows = CSV.parse(File.read("input/menu.csv"))\nrows.length - 1`, 4, 'Subtract one for the header.', FILES));
    specs.push(vSpec('CSV first name', 'Return the name from the first data row.', `rows = CSV.parse(File.read("input/menu.csv"))\nrows[1][0]`, 'Pancakes', 'Rows are arrays of strings.', FILES));
    specs.push(vSpec('CSV price cleanup', 'Return the normalized price from the Waffles row.', `rows = CSV.parse(File.read("input/menu.csv"))\nrows[2][1].gsub(/[^0-9.]/, "").to_f`, 9, 'Clean currency text before numeric work.', FILES));
    specs.push(vSpec('CSV names', 'Return all data-row names from input/menu.csv.', `rows = CSV.parse(File.read("input/menu.csv"))${DATA_ROWS}\ndata_rows.map { |row| row[0] }`, ['Pancakes', 'Waffles', 'Coffee', 'Steak'], 'Ruby ranges slice rows after the header.', FILES));
    specs.push(vSpec('CSV categories', 'Return all data-row categories.', `rows = CSV.parse(File.read("input/menu.csv"))${DATA_ROWS}\ndata_rows.map { |row| row[2] }`, ['breakfast', 'breakfast', 'drink', 'dinner'], 'Map the third column.', FILES));
    specs.push(vSpec('CSV total price', 'Sum the normalized prices from the CSV.', `rows = CSV.parse(File.read("input/menu.csv"))${DATA_ROWS}\ndata_rows.map { |row| row[1].gsub(/[^0-9.]/, "").to_f }.sum.round(1)`, 44, 'Normalize before summing.', FILES));
    specs.push(vSpec('CSV average price', 'Return the rounded average normalized price.', `rows = CSV.parse(File.read("input/menu.csv"))${DATA_ROWS}\nprices = data_rows.map { |row| row[1].gsub(/[^0-9.]/, "").to_f }\nprices.sum.fdiv(prices.length).round(1)`, 11, 'fdiv divides by the number of data rows.', FILES));
    specs.push(vSpec('CSV category counts', 'Count data rows by category.', `counts = {}\nrows = CSV.parse(File.read("input/menu.csv"))${DATA_ROWS}\ndata_rows.each do |row|\n  counts[row[2]] = (counts[row[2]] || 0) + 1\nend\ncounts`, { breakfast: 2, drink: 1, dinner: 1 }, 'Build counts during one pass.', FILES));
    specs.push(vSpec('CSV filtered rows', 'Return names of rows in the breakfast category.', `rows = CSV.parse(File.read("input/menu.csv"))${DATA_ROWS}\ndata_rows.select { |row| row[2] == "breakfast" }.map { |row| row[0] }`, ['Pancakes', 'Waffles'], 'Filter before mapping names.', FILES));
    specs.push(vSpec('CSV sorted prices', 'Return normalized prices sorted ascending.', `rows = CSV.parse(File.read("input/menu.csv"))${DATA_ROWS}\nprices = data_rows.map { |row| row[1].gsub(/[^0-9.]/, "").to_f }\nprices.sort`, [3, 8, 9, 24], 'Sort numeric values, not raw strings.', FILES));
    specs.push(vSpec('CSV max price', 'Return the largest normalized price.', `rows = CSV.parse(File.read("input/menu.csv"))${DATA_ROWS}\ndata_rows.map { |row| row[1].gsub(/[^0-9.]/, "").to_f }.max`, 24, 'max finds the highest numeric price.', FILES));
    specs.push(vSpec('CSV min price', 'Return the smallest normalized price.', `rows = CSV.parse(File.read("input/menu.csv"))${DATA_ROWS}\ndata_rows.map { |row| row[1].gsub(/[^0-9.]/, "").to_f }.min`, 3, 'min finds the lowest numeric price.', FILES));
    specs.push(vSpec('Generate CSV header and rows', 'Return CSV text for a header and two data rows.', `CSV.generate([["name", "price"], ["Pancakes", "8"], ["Coffee", "3"]])`, "name,price\nPancakes,8\nCoffee,3", 'CSV.generate joins rows with newlines.', FILES));
    specs.push(vSpec('CSV quoting', 'Return CSV text that quotes a value containing a comma.', `CSV.generate([["name", "note"], ["Toast", "butter, jam"]])`, 'name,note\nToast,"butter, jam"', 'CSV.generate quotes values with commas.', FILES));
    specs.push(vSpec('CSV quote escaping', 'Return CSV text that escapes an embedded quote.', `CSV.generate([["name", "note"], ["Toast", 'a "quote"']])`, 'name,note\nToast,"a ""quote"""', 'CSV.generate doubles embedded quotes.', FILES));
    specs.push(stSpec('Write menu CSV', 'Write menu dish names and prices to out/menu-table.csv.', `rows = [["name", "price"]]\ndriver.find_elements(:css, ".dish").each do |dish|\n  name = dish.find_element(:css, ".food").text\n  price = dish.find_element(:css, ".price").text\n  rows = rows + [[name, price]]\nend\nFile.write("out/menu-table.csv", CSV.generate(rows))`, { file: { name: 'out/menu-table.csv', contains: 'Pancakes,$8' } }, 'Export scraped rows as a table.', { scene: B }));
    specs.push(stSpec('Write ledger CSV', 'Write record names and emails to out/ledger.csv.', `rows = [["name", "email"]]\ndriver.find_elements(:css, ".record").each do |row|\n  rows = rows + [[row.attribute("data-name"), row.attribute("data-email")]]\nend\nFile.write("out/ledger.csv", CSV.generate(rows))`, { file: { name: 'out/ledger.csv', contains: 'Pancakes,ada@example.com' } }, 'Attributes make clean CSV columns.', RECORD_OPTS));
    specs.push(stSpec('CSV to JSON export', 'Parse the CSV file and write its data rows as JSON.', `rows = CSV.parse(File.read("input/menu.csv"))${DATA_ROWS}\nrecords = data_rows.map { |row| { name: row[0], price: row[1], category: row[2] } }\nFile.write("out/menu-from-csv.json", JSON.generate(records))`, { file: { name: 'out/menu-from-csv.json', contains: '"price":"$9.00"' } }, 'CSV and JSON exports are interchangeable.', FILES));
    specs.push(vSpec('Column count', 'Return the number of columns in the CSV header.', `CSV.parse(File.read("input/menu.csv"))[0].length`, 3, 'Header width describes the table shape.', FILES));
    specs.push(vSpec('CSV to hashes', 'Convert the CSV data rows to hashes with name and category keys.', `rows = CSV.parse(File.read("input/menu.csv"))${DATA_ROWS}\ndata_rows.map { |row| { name: row[0], category: row[2] } }`, [
      { name: 'Pancakes', category: 'breakfast' }, { name: 'Waffles', category: 'breakfast' },
      { name: 'Coffee', category: 'drink' }, { name: 'Steak', category: 'dinner' }
    ], 'Hashes make CSV rows easier to consume.', FILES));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'Reporting & Summaries';
    const specs = [];
    specs.push(vSpec('Record count report', 'Return the number of ledger records.', `driver.find_elements(:css, ".record").length`, 10, 'A count is the simplest report.', RECORD_OPTS));
    specs.push(vSpec('Non-blank name count', 'Return the number of records with a non-blank name.', `driver.find_elements(:css, ".record").count { |row| !row.attribute("data-name").strip.empty? }`, 9, 'Quality reports count usable rows.', RECORD_OPTS));
    specs.push(vSpec('Total price report', 'Return the sum of normalized record prices.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-price").gsub(/[^0-9.]/, "").to_f }.sum.round(1)`, 92, 'Report clean numeric totals.', RECORD_OPTS));
    specs.push(vSpec('Average price report', 'Return the rounded average normalized price.', `prices = driver.find_elements(:css, ".record").map { |row| row.attribute("data-price").gsub(/[^0-9.]/, "").to_f }\nprices.sum.fdiv(prices.length).round(1)`, 9.2, 'Averages need floating-point division.', RECORD_OPTS));
    specs.push(vSpec('Highest price report', 'Return the highest normalized price.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-price").gsub(/[^0-9.]/, "").to_f }.max`, 24, 'max highlights the top value.', RECORD_OPTS));
    specs.push(vSpec('Lowest price report', 'Return the lowest normalized price.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-price").gsub(/[^0-9.]/, "").to_f }.min`, 3, 'min highlights the bottom value.', RECORD_OPTS));
    specs.push(vSpec('Category summary', 'Return counts by normalized category.', `counts = {}\ndriver.find_elements(:css, ".record").each do |row|\n  category = row.attribute("data-category").strip.downcase\n  counts[category] = (counts[category] || 0) + 1\nend\ncounts`, { breakfast: 5, drink: 3, dinner: 1, lunch: 1 }, 'Group counts make a useful summary.', RECORD_OPTS));
    specs.push(vSpec('Category price totals', 'Return normalized price totals by category.', `totals = {}\ndriver.find_elements(:css, ".record").each do |row|\n  category = row.attribute("data-category").strip.downcase\n  price = row.attribute("data-price").gsub(/[^0-9.]/, "").to_f\n  totals[category] = (totals[category] || 0) + price\nend\ntotals`, { breakfast: 34, drink: 11, dinner: 24, lunch: 23 }, 'Aggregate totals inside each group.', RECORD_OPTS));
    specs.push(vSpec('Unique name summary', 'Return the number of unique normalized names.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-name").strip.downcase }.reject { |name| name.empty? }.uniq.length`, 4, 'A uniqueness metric belongs in reports.', RECORD_OPTS));
    specs.push(vSpec('Missing email summary', 'Return the number of blank email values.', `driver.find_elements(:css, ".record").count { |row| row.attribute("data-email").strip.empty? }`, 2, 'Data-quality reports include gaps.', RECORD_OPTS));
    specs.push(vSpec('API menu summary', 'Fetch menu.json and return its item count and total price.', `items = JSON.parse(Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json")).body)\n{ count: items.length, total: items.map { |item| item["price"] }.sum }`, { count: 3, total: 35 }, 'API records can be summarized too.', API_OPTS));
    specs.push(vSpec('API category summary', 'Fetch menu.json and count items by category.', `items = JSON.parse(Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json")).body)\ncounts = {}\nitems.each { |item| counts[item["category"]] = (counts[item["category"]] || 0) + 1 }\ncounts`, { sweet: 1, drink: 1, savory: 1 }, 'Build a category report from JSON.', API_OPTS));
    specs.push(vSpec('Paginated item total', 'Crawl API pages and return the total item count.', `count = 0\nurl = "https://diners.example/api/page/1.json"\nwhile url\n  data = JSON.parse(Net::HTTP.get_response(URI.parse(url)).body)\n  count = count + data["items"].length\n  url = data["next"]\nend\ncount`, 10, 'Reports often cover multiple pages.', API_OPTS));
    specs.push(stSpec('Write JSON report', 'Write record and category counts to out/report.json.', `rows = driver.find_elements(:css, ".record")\nreport = { records: rows.length, categories: rows.map { |row| row.attribute("data-category").downcase }.uniq.length }\nFile.write("out/report.json", JSON.generate(report))`, { file: { name: 'out/report.json', contains: '"records":10' } }, 'Persist the summary as JSON.', RECORD_OPTS));
    specs.push(stSpec('Write CSV report', 'Write category counts to out/category-report.csv.', `counts = {}\ndriver.find_elements(:css, ".record").each do |row|\n  category = row.attribute("data-category").downcase\n  counts[category] = (counts[category] || 0) + 1\nend\nrows = [["category", "count"]]\ncounts.each { |category, count| rows = rows + [[category, count]] }\nFile.write("out/category-report.csv", CSV.generate(rows))`, { file: { name: 'out/category-report.csv', contains: 'category,count' } }, 'CSV reports are easy to share.', RECORD_OPTS));
    specs.push(stSpec('Write text report', 'Write a one-line total report to out/total.txt.', `total = driver.find_elements(:css, ".record").map { |row| row.attribute("data-price").gsub(/[^0-9.]/, "").to_f }.sum.round(1)\nFile.write("out/total.txt", "total=" + total.to_s)`, { file: { name: 'out/total.txt', contains: 'total=92' } }, 'A plain-text report is enough for simple checks.', RECORD_OPTS));
    specs.push(vSpec('Job status report', 'Return counts by batch job status.', `counts = {}\ndriver.find_elements(:css, ".job").each do |job|\n  status = job.attribute("data-status")\n  counts[status] = (counts[status] || 0) + 1\nend\ncounts`, { success: 2, failure: 2, pending: 2 }, 'Operational reports track job status.', BATCH_OPTS));
    specs.push(vSpec('Failed job attempts', 'Return the total attempts for failed jobs.', `driver.find_elements(:css, ".job-failure").map { |job| job.attribute("data-attempts").to_i }.sum`, 5, 'Attempt totals help prioritize retries.', BATCH_OPTS));
    specs.push(vSpec('Page crawl report', 'Crawl paged dishes and return a hash of page number to item count.', `counts = {}\nurl = "https://diners.example/menu/page/1"\nwhile url\n  driver.get(url)\n  page = driver.find_element(:css, ".page-marker").text\n  counts[page] = driver.find_elements(:css, ".dish").length\n  links = driver.find_elements(:css, ".next")\n  url = links.length > 0 ? links[0].attribute("href") : nil\nend\ncounts`, { '1': 3, '2': 3, '3': 3 }, 'Crawl reports show coverage by page.', PAGE_OPTS));
    specs.push(vSpec('API page report', 'Crawl API pages and return the pages visited.', `pages = []\nurl = "https://diners.example/api/page/1.json"\nwhile url\n  data = JSON.parse(Net::HTTP.get_response(URI.parse(url)).body)\n  pages = pages + [data["page"]]\n  url = data["next"]\nend\npages`, [1, 2, 3], 'Coverage reports include page identifiers.', API_OPTS));
    specs.push(vSpec('Report total from seeded JSON', 'Read a seeded checkpoint and return the completed count.', `data = JSON.parse(File.read("out/report-seed.json"))\ndata.fetch("completed")`, 7, 'Reports can be assembled from saved state.', { scene: B, files: { 'out/report-seed.json': '{"completed":7,"failed":2}' } }));
    specs.push(vSpec('Report failure ratio', 'Read seeded counts and return completed minus failed.', `data = JSON.parse(File.read("out/report-seed.json"))\ndata.fetch("completed") - data.fetch("failed")`, 5, 'Derived metrics are common in reports.', { scene: B, files: { 'out/report-seed.json': '{"completed":7,"failed":2}' } }));
    specs.push(vSpec('Report boolean gate', 'Return true when all seeded counts are positive.', `data = JSON.parse(File.read("out/report-seed.json"))\ndata.values.all? { |value| value.to_i > 0 }`, true, 'A summary can assert overall health.', { scene: B, files: { 'out/report-seed.json': '{"completed":7,"failed":2}' } }));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    addMissing('Structured Extraction & Export', [
      vSpec('Export selected columns', 'Write only id and name columns to out/selected.csv.', `rows = [["id", "name"]]\ndriver.find_elements(:css, ".record").each do |row|\n  rows = rows + [[row.attribute("data-id"), row.attribute("data-name")]]\nend\nFile.write("out/selected.csv", CSV.generate(rows))`, { file: { name: 'out/selected.csv', contains: 'id,name' } }, 'Select columns before export.', RECORD_OPTS),
      vSpec('Export lowercase names', 'Write normalized lowercase names to out/lower-names.json.', `names = driver.find_elements(:css, ".record").map { |row| row.attribute("data-name").strip.downcase }\nFile.write("out/lower-names.json", JSON.generate(names))`, { file: { name: 'out/lower-names.json', contains: 'waffles' } }, 'Normalize as part of export.', RECORD_OPTS)
    ], TARGET_COUNTS['Structured Extraction & Export']);
    addMissing('Data Normalization', [
      vSpec('Normalize email domains', 'Return the domain part of every non-blank email.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-email") }.reject { |email| email.empty? }.map { |email| email.split("@")[1] }.uniq`, ['example.com'], 'Split addresses before domain reporting.', RECORD_OPTS),
      vSpec('Normalize category keys', 'Return a hash of normalized categories to capitalized labels.', `counts = {}\ndriver.find_elements(:css, ".record").each do |row|\n  category = row.attribute("data-category").strip.downcase\n  if !counts.key?(category)\n    counts[category] = category.capitalize\n  end\nend\ncounts`, { breakfast: 'Breakfast', drink: 'Drink', dinner: 'Dinner', lunch: 'Lunch' }, 'Build clean labels while scanning rows.', RECORD_OPTS),
      vSpec('Normalize numeric text', 'Return the string "007" as an integer.', `"007".to_i`, 7, 'to_i handles padded numbers.', RECORD_OPTS)
    ], TARGET_COUNTS['Data Normalization']);
    addMissing('Deduplication & Merging', [
      vSpec('Unique status values', 'Return the unique normalized job statuses.', `driver.find_elements(:css, ".job").map { |job| job.attribute("data-status").downcase }.uniq.sort`, ['failure', 'pending', 'success'], 'Unique values describe the state space.', BATCH_OPTS),
      vSpec('Deduplicate page names', 'Return the number of unique dish names across the three paged scenes.', `names = []\n[1, 2, 3].each do |page|\n  driver.get("https://diners.example/menu/page/" + page.to_s)\n  names = names + driver.find_elements(:css, ".dish").map { |el| el.text }\nend\nnames.uniq.length`, 9, 'A fixed page list keeps the crawl bounded.', PAGE_OPTS),
      vSpec('Merge counts with fetch', 'Use fetch to count records by normalized category.', `counts = {}\ndriver.find_elements(:css, ".record").each do |row|\n  category = row.attribute("data-category").downcase\n  counts[category] = counts.fetch(category, 0) + 1\nend\ncounts.fetch("breakfast")`, 5, 'fetch gives a default for new groups.', RECORD_OPTS)
    ], TARGET_COUNTS['Deduplication & Merging']);
    addMissing('JSON & Schema Validation', [
      vSpec('Validate JSON array shape', 'Fetch records.json and return true when the parsed body is an array.', `data = JSON.parse(Net::HTTP.get_response(URI.parse("https://diners.example/api/records.json")).body)\ndata.length > 0`, true, 'JSON.parse returns arrays for array payloads.', API_OPTS)
    ], TARGET_COUNTS['JSON & Schema Validation']);
  })();

  (() => {
    addMissing('Reporting & Summaries', [
      vSpec('Report status gate', 'Return true when every report count is non-negative.', `data = JSON.parse(File.read("out/report-seed.json"))\ndata.values.all? { |value| value.to_i >= 0 }`, true, 'A report can validate its own inputs.', { scene: B, files: { 'out/report-seed.json': '{"completed":7,"failed":2}' } })
    ], TARGET_COUNTS['Reporting & Summaries']);
  })();

  (() => {
    const chapter = 'Persistence & Resume';
    const specs = [];
    const seeded = { scene: B, files: { 'out/checkpoint.json': '{"page":2,"processed":["Pancakes","Waffles"]}' } };
    specs.push(vSpec('Checkpoint absent', 'Return false when out/fresh.json does not exist.', `File.exist?("out/fresh.json")`, false, 'File.exist? checks simulated storage.', { scene: B }));
    specs.push(stSpec('Create a fresh checkpoint', 'Write an empty processed list to out/fresh.json.', `File.write("out/fresh.json", JSON.generate({ processed: [] }))`, { file: { name: 'out/fresh.json', contains: '"processed":[]' } }, 'Start checkpoints with an explicit empty state.', { scene: B }));
    specs.push(vSpec('Checkpoint present', 'Return true when out/checkpoint.json exists.', `File.exist?("out/checkpoint.json")`, true, 'Check before reading a checkpoint.', seeded));
    specs.push(vSpec('Read checkpoint page', 'Read out/checkpoint.json and return its page value.', `data = JSON.parse(File.read("out/checkpoint.json"))\ndata["page"]`, 2, 'Parsed checkpoints behave like hashes.', seeded));
    specs.push(vSpec('Fetch checkpoint page', 'Use fetch to read the page from out/checkpoint.json.', `JSON.parse(File.read("out/checkpoint.json")).fetch("page")`, 2, 'fetch fails loudly for missing keys.', seeded));
    specs.push(vSpec('Checkpoint fallback', 'Use fetch with a default for a missing checkpoint key.', `JSON.parse(File.read("out/checkpoint.json")).fetch("batch", 1)`, 1, 'Defaults make old checkpoints compatible.', seeded));
    specs.push(vSpec('Processed list length', 'Return the number of processed dishes in the checkpoint.', `data = JSON.parse(File.read("out/checkpoint.json"))\ndata.fetch("processed").length`, 2, 'Checkpoints can store completed ids.', seeded));
    specs.push(vSpec('Processed names', 'Return the processed dish names from the checkpoint.', `JSON.parse(File.read("out/checkpoint.json")).fetch("processed")`, ['Pancakes', 'Waffles'], 'Saved lists can be read back directly.', seeded));
    specs.push(vSpec('Resume page URL', 'Build the paged URL from the checkpoint page.', `page = JSON.parse(File.read("out/checkpoint.json")).fetch("page")\n"https://diners.example/menu/page/" + page.to_s`, 'https://diners.example/menu/page/2', 'Convert saved values into navigation targets.', seeded));
    specs.push(vSpec('Resume navigation', 'Read the checkpoint page and navigate to that menu page.', `page = JSON.parse(File.read("out/checkpoint.json")).fetch("page")\ndriver.get("https://diners.example/menu/page/" + page.to_s)\ndriver.title`, 'Menu Page 2', 'Resume should restore the browser location.', Object.assign({}, seeded, { routes: CURRICULUM_ROUTES })));
    specs.push(stSpec('Write processed ids', 'Write the first two ledger record ids as a checkpoint.', `ids = []\ndriver.find_elements(:css, ".record").each do |row|\n  break if ids.length == 2\n  ids = ids + [row.attribute("data-id")]\nend\nFile.write("out/processed.json", JSON.generate(ids))`, { file: { name: 'out/processed.json', contains: '"1"' } }, 'Persist completed item ids.', RECORD_OPTS));
    specs.push(vSpec('Append processed id', 'Read a checkpoint, append a new dish, and return the list.', `data = JSON.parse(File.read("out/checkpoint.json"))\ndata["processed"] = data.fetch("processed") + ["Omelette"]\ndata.fetch("processed")`, ['Pancakes', 'Waffles', 'Omelette'], 'Update the list before writing it back.', seeded));
    specs.push(vSpec('Idempotent processing', 'Return the processed list after skipping dishes already saved.', `data = JSON.parse(File.read("out/checkpoint.json"))\nprocessed = data.fetch("processed")\n["Pancakes", "Waffles", "Omelette"].each do |dish|\n  if !processed.include?(dish)\n    processed = processed + [dish]\n  end\nend\nprocessed`, ['Pancakes', 'Waffles', 'Omelette'], 'include? prevents duplicate work.', seeded));
    specs.push(stSpec('Checkpoint after batch', 'Process the first three batch jobs and save their ids.', `ids = []\ndriver.find_elements(:css, ".job-id").each do |el|\n  break if ids.length == 3\n  ids = ids + [el.text]\nend\nFile.write("out/batch-resume.json", JSON.generate({ processed: ids }))`, { file: { name: 'out/batch-resume.json', contains: 'job-103' } }, 'Checkpoint the batch position.', BATCH_OPTS));
    specs.push(vSpec('Nested checkpoint value', 'Read a nested checkpoint and return the retry count.', `data = JSON.parse(File.read("out/nested-checkpoint.json"))\ndata.fetch("state").fetch("retries")`, 3, 'Nested checkpoints keep state organized.', { scene: B, files: { 'out/nested-checkpoint.json': '{"state":{"retries":3,"page":1}}' } }));
    specs.push(vSpec('Failure queue', 'Return failed job ids that still have attempts remaining.', `ids = []\ndriver.find_elements(:css, ".job-failure").each do |job|\n  if job.attribute("data-attempts").to_i < 3\n    ids = ids + [job.attribute("data-id")]\n  end\nend\nids`, ['job-105'], 'A failure queue decides what to resume.', BATCH_OPTS));
    specs.push(vSpec('Retry queue count', 'Return the number of pending jobs with at least one attempt.', `driver.find_elements(:css, ".job-pending").count { |job| job.attribute("data-attempts").to_i > 0 }`, 1, 'Partial attempts are worth remembering.', BATCH_OPTS));
    specs.push(vSpec('Progress percentage', 'Read seeded progress counts and return the percent complete.', `data = JSON.parse(File.read("out/progress.json"))\n(data.fetch("done") * 100 / data.fetch("total")).round`, 75, 'Reports often convert counts into percentages.', { scene: B, files: { 'out/progress.json': '{"done":3,"total":4}' } }));
    specs.push(vSpec('Checkpoint path from env', 'Read CHECKPOINT_PATH from ENV and check that file exists.', `path = ENV["CHECKPOINT_PATH"]\nFile.exist?(path)`, true, 'Configuration can point to different checkpoint files.', { scene: B, env: { CHECKPOINT_PATH: 'out/progress.json' }, files: { 'out/progress.json': '{"done":3,"total":4}' } }));
    specs.push(stSpec('Write resume report', 'Write a resume report with the saved page and processed count.', `data = JSON.parse(File.read("out/checkpoint.json"))\nreport = { page: data.fetch("page"), processed: data.fetch("processed").length }\nFile.write("out/resume-report.json", JSON.generate(report))`, { file: { name: 'out/resume-report.json', contains: '"processed":2' } }, 'Close the loop with a durable resume report.', seeded));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'Scheduling & Scale';
    const specs = [];
    specs.push(vSpec('Fixed page list', 'Use a fixed list of three pages and return the number of dishes.', `count = 0\n[1, 2, 3].each do |page|\n  driver.get("https://diners.example/menu/page/" + page.to_s)\n  count = count + driver.find_elements(:css, ".dish").length\nend\ncount`, 9, 'A fixed list is the simplest bounded schedule.', PAGE_OPTS));
    specs.push(vSpec('Follow next with max', 'Follow next links with a max of five pages and return the pages visited.', `pages = []\nurl = "https://diners.example/menu/page/1"\nwhile url && pages.length < 5\n  driver.get(url)\n  pages = pages + [driver.title]\n  links = driver.find_elements(:css, ".next")\n  url = links.length > 0 ? links[0].attribute("href") : nil\nend\npages`, ['Menu Page 1', 'Menu Page 2', 'Menu Page 3'], 'A max guard protects the schedule.', PAGE_OPTS));
    specs.push(vSpec('Env batch size', 'Read BATCH_SIZE and return that many job ids.', `size = ENV["BATCH_SIZE"].to_i\nids = []\ndriver.find_elements(:css, ".job-id").each do |el|\n  break if ids.length == size\n  ids = ids + [el.text]\nend\nids`, ['job-101', 'job-102'], 'Configuration drives batch width.', Object.assign({}, BATCH_OPTS, { env: { BATCH_SIZE: '2' } })));
    specs.push(vSpec('Retry under limit', 'Return failed job ids with attempts below the configured limit.', `limit = ENV["MAX_ATTEMPTS"].to_i\nids = []\ndriver.find_elements(:css, ".job-failure").each do |job|\n  if job.attribute("data-attempts").to_i < limit\n    ids = ids + [job.attribute("data-id")]\n  end\nend\nids`, ['job-105'], 'Retry policy can be configured.', Object.assign({}, BATCH_OPTS, { env: { MAX_ATTEMPTS: '3' } })));
    specs.push(vSpec('Skip exhausted jobs', 'Return failed job ids that reached the attempt limit.', `driver.find_elements(:css, ".job-failure").select { |job| job.attribute("data-attempts").to_i >= 3 }.map { |job| job.attribute("data-id") }`, ['job-102'], 'Exhausted jobs should leave the retry queue.', BATCH_OPTS));
    specs.push(stSpec('Pace with sleep', 'Sleep two virtual seconds before scraping and verify the clock.', `driver.sleep(2)\ndriver.find_elements(:css, ".dish")`, { clock: 2000 }, 'Scheduled jobs should be paced.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/menu' }));
    specs.push(vSpec('Retry after header', 'Fetch limited.json and return the retry_after field.', `response = Net::HTTP.get_response(URI.parse("https://diners.example/api/limited.json"))\nJSON.parse(response.body).fetch("retry_after")`, 30, 'Retry-After tells the scheduler when to return.', API_OPTS));
    specs.push(vSpec('Domain delays', 'Return all configured delay values from the rate scene.', `driver.find_elements(:css, ".rate-delay").map { |el| el.text }`, ['2 seconds', '5 seconds', '10 seconds'], 'Per-domain rules shape the schedule.', RATE_OPTS));
    specs.push(vSpec('Max domain delay', 'Return the largest configured delay in seconds.', `driver.find_elements(:css, ".rate-entry").map { |el| el.attribute("data-delay").to_i }.max`, 10, 'Use the strictest rule when domains share a run.', RATE_OPTS));
    specs.push(vSpec('Job status counts', 'Return counts for each job status.', `counts = {}\ndriver.find_elements(:css, ".job").each do |job|\n  status = job.attribute("data-status")\n  counts[status] = (counts[status] || 0) + 1\nend\ncounts`, { success: 2, failure: 2, pending: 2 }, 'Schedulers track work by status.', BATCH_OPTS));
    specs.push(vSpec('Pending job ids', 'Return ids of jobs waiting to run.', `driver.find_elements(:css, ".job-pending").map { |job| job.attribute("data-id") }`, ['job-103', 'job-106'], 'Pending jobs are the work queue.', BATCH_OPTS));
    specs.push(vSpec('Success ids', 'Return ids of jobs that need no retry.', `driver.find_elements(:css, ".job-success").map { |job| job.attribute("data-id") }`, ['job-101', 'job-104'], 'Successful jobs can be skipped.', BATCH_OPTS));
    specs.push(stSpec('Checkpoint scheduled batch', 'Save the first two pending job ids to out/pending-checkpoint.json.', `ids = driver.find_elements(:css, ".job-pending").map { |job| job.attribute("data-id") }.first(2)\nFile.write("out/pending-checkpoint.json", JSON.generate(ids))`, { file: { name: 'out/pending-checkpoint.json', contains: 'job-106' } }, 'Persist the scheduled queue.', BATCH_OPTS));
    specs.push(vSpec('API pages with guard', 'Crawl at most five API pages and return the page numbers.', `pages = []\nurl = "https://diners.example/api/page/1.json"\nwhile url && pages.length < 5\n  data = JSON.parse(Net::HTTP.get_response(URI.parse(url)).body)\n  pages = pages + [data.fetch("page")]\n  url = data["next"]\nend\npages`, [1, 2, 3], 'API schedules need guards too.', API_OPTS));
    specs.push(vSpec('Backoff from retry field', 'Fetch limited.json and compute a 2x backoff from retry_after.', `data = JSON.parse(Net::HTTP.get_response(URI.parse("https://diners.example/api/limited.json")).body)\ndata.fetch("retry_after") * 2`, 60, 'Backoff multiplies the base delay.', API_OPTS));
    specs.push(stSpec('Apply backoff', 'Fetch limited.json and sleep for its retry_after seconds.', `data = JSON.parse(Net::HTTP.get_response(URI.parse("https://diners.example/api/limited.json")).body)\ndriver.sleep(data.fetch("retry_after"))`, { clock: 30000 }, 'Scale sleeps can be driven by API responses.', API_OPTS));
    specs.push(vSpec('Total attempts', 'Return total attempts across all batch jobs.', `driver.find_elements(:css, ".job").map { |job| job.attribute("data-attempts").to_i }.sum`, 9, 'Attempt totals help estimate cost.', BATCH_OPTS));
    specs.push(vSpec('Bounded records run', 'Process at most four ledger records and return their names.', `names = []\ndriver.find_elements(:css, ".record").each do |row|\n  break if names.length == 4\n  names = names + [row.attribute("data-name")]\nend\nnames`, ['Pancakes', 'Waffles', 'Waffles', 'pancakes'], 'Large ledgers need bounded runs.', RECORD_OPTS));
    specs.push(vSpec('Resume page from checkpoint', 'Read a seeded scheduler checkpoint and return the next page.', `data = JSON.parse(File.read("out/scheduler.json"))\ndata.fetch("next_page")`, 2, 'Resume state tells the scheduler where to continue.', { scene: B, files: { 'out/scheduler.json': '{"next_page":2,"mode":"paged"}' } }));
    specs.push(vSpec('Schedule mode gate', 'Return true when the scheduler mode is paged.', `data = JSON.parse(File.read("out/scheduler.json"))\ndata.fetch("mode") == "paged"`, true, 'Mode flags select the next strategy.', { scene: B, files: { 'out/scheduler.json': '{"next_page":2,"mode":"paged"}' } }));
    specs.push(stSpec('Write run summary', 'Write a run summary with successful and failed job counts.', `success = driver.find_elements(:css, ".job-success").length\nfailure = driver.find_elements(:css, ".job-failure").length\nFile.write("out/run-summary.json", JSON.generate({ success: success, failure: failure }))`, { file: { name: 'out/run-summary.json', contains: '"success":2' } }, 'Scheduled runs should leave a summary.', BATCH_OPTS));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    addMissing('Scheduling & Scale', [
      vSpec('Crawl with explicit max', 'Crawl paged dishes with a max of three pages and return the page titles.', `titles = []\nurl = "https://diners.example/menu/page/1"\nwhile url && titles.length < 3\n  driver.get(url)\n  titles = titles + [driver.title]\n  links = driver.find_elements(:css, ".next")\n  url = links.length > 0 ? links[0].attribute("href") : nil\nend\ntitles`, ['Menu Page 1', 'Menu Page 2', 'Menu Page 3'], 'The max makes the crawl schedule predictable.', PAGE_OPTS)
    ], TARGET_COUNTS['Scheduling & Scale']);
  })();

  (() => {
    const chapter = 'Compliance Capstone';
    const specs = [];
    const policy = API_OPTS;
    specs.push(vSpec('Robots allows menu', 'Fetch robots.txt and return true when /menu is allowed.', `Net::HTTP.get_response(URI.parse("https://diners.example/robots.txt")).body.include?("Allow: /menu")`, true, 'Allowed routes are safe to crawl.', policy));
    specs.push(vSpec('Robots blocks orders', 'Fetch robots.txt and return true when /orders is disallowed.', `Net::HTTP.get_response(URI.parse("https://diners.example/robots.txt")).body.include?("Disallow: /orders")`, true, 'Disallowed routes must be skipped.', policy));
    specs.push(vSpec('Strict robots blocks all', 'Fetch robots-strict.txt and return true when it disallows everything.', `Net::HTTP.get_response(URI.parse("https://diners.example/robots-strict.txt")).body.include?("Disallow: /")`, true, 'A broad disallow should halt crawling.', policy));
    specs.push(vSpec('Terms personal use', 'Fetch terms.txt and return true when personal use is allowed.', `Net::HTTP.get_response(URI.parse("https://diners.example/terms.txt")).body.include?("Personal use only")`, true, 'Check terms before collecting data.', policy));
    specs.push(vSpec('Terms no resale', 'Fetch terms.txt and return true when resale is prohibited.', `Net::HTTP.get_response(URI.parse("https://diners.example/terms.txt")).body.include?("Do not resell data")`, true, 'A compliance report should capture restrictions.', policy));
    specs.push(vSpec('Privacy retention', 'Fetch privacy.txt and return true when raw exports expire after seven days.', `Net::HTTP.get_response(URI.parse("https://diners.example/privacy.txt")).body.include?("seven days")`, true, 'Retention windows are part of the policy.', policy));
    specs.push(vSpec('Privacy email rule', 'Fetch privacy.txt and return true when publishing email addresses is forbidden.', `Net::HTTP.get_response(URI.parse("https://diners.example/privacy.txt")).body.include?("Do not publish personal email addresses")`, true, 'Do not export personal fields unnecessarily.', policy));
    specs.push(vSpec('Robot crawl delay', 'Fetch robots.txt and return the crawl delay in seconds.', `body = Net::HTTP.get_response(URI.parse("https://diners.example/robots.txt")).body\nbody.split("Crawl-delay: ")[1].to_i`, 2, 'Parse the numeric crawl delay.', policy));
    specs.push(vSpec('Compliance gate', 'Return true when robots allows /menu and terms allow personal use.', `robots = Net::HTTP.get_response(URI.parse("https://diners.example/robots.txt")).body\nterms = Net::HTTP.get_response(URI.parse("https://diners.example/terms.txt")).body\nrobots.include?("Allow: /menu") && terms.include?("Personal use only")`, true, 'Combine policy checks into one gate.', policy));
    specs.push(vSpec('Strict gate stops', 'Return false when strict robots withholds permission for /menu.', `body = Net::HTTP.get_response(URI.parse("https://diners.example/robots-strict.txt")).body\n!body.include?("Allow: /menu")`, true, 'Absence of permission is not permission.', policy));
    specs.push(vSpec('Private data requires login', 'Try to visit /account from a fresh session and return the redirected URL.', `driver.get("https://diners.example/account")\ndriver.current_url`, 'https://diners.example/login', 'Authentication redirects protect private data.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/' }));
    specs.push(vSpec('Authorised private scrape', 'Sign in and return the number of private records.', `driver.find_element(:id, "login-username").send_keys("ada")\ndriver.find_element(:id, "login-password").send_keys("coffee")\ndriver.find_element(:id, "login-submit").click\ndriver.find_elements(:css, ".private").length`, 3, 'Only scrape protected pages after consent.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/login' }));
    specs.push(vSpec('Masked email export data', 'Return non-blank emails with masked local parts.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-email") }.reject { |email| email.empty? }.map { |email| email.split("@")[0][0] + "***@" + email.split("@")[1] }.uniq`, ['a***@example.com', 'g***@example.com', 'm***@example.com', 'c***@example.com'], 'Mask personal data before sharing.', RECORD_OPTS));
    specs.push(vSpec('Allowed route only', 'Crawl only /menu and return the dish count.', `driver.get("https://diners.example/menu")\ndriver.find_elements(:css, ".dish").length`, 6, 'Stay inside allowed routes.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/' }));
    specs.push(stSpec('Compliance screenshot', 'Save evidence of the menu crawl to evidence/compliance-menu.png.', `driver.get("https://diners.example/menu")\ndriver.save_screenshot("evidence/compliance-menu.png")`, { screenshotPath: 'evidence/compliance-menu.png' }, 'Evidence supports later review.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/' }));
    specs.push(stSpec('Log compliance decision', 'Write a decision log allowing /menu after policy checks.', `File.write("out/compliance-decision.log", "allow /menu")`, { file: { name: 'out/compliance-decision.log', contains: 'allow /menu' } }, 'Record which policy decision was made.', { scene: B }));
    specs.push(stSpec('Write compliance report', 'Write a JSON report with robots, terms, and privacy checks.', `robots = Net::HTTP.get_response(URI.parse("https://diners.example/robots.txt")).body\nterms = Net::HTTP.get_response(URI.parse("https://diners.example/terms.txt")).body\nprivacy = Net::HTTP.get_response(URI.parse("https://diners.example/privacy.txt")).body\nreport = { robots: robots.include?("Allow: /menu"), terms: terms.include?("Personal use only"), privacy: privacy.include?("seven days") }\nFile.write("out/compliance.json", JSON.generate(report))`, { file: { name: 'out/compliance.json', contains: '"robots":true' } }, 'A final report documents the full gate.', { api: API, scene: B }));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'Rate Limiting & Politeness';
    const specs = [];
    specs.push(vSpec('Retry note text', 'Read the retry note from the rate scene.', `driver.find_element(:css, ".retry-note").text`, 'Retry-After: 30 seconds', 'The page shows the shared retry value.', RATE_OPTS));
    specs.push(vSpec('Retry after value', 'Return the retry-after value as an integer.', `driver.find_element(:css, "[data-key='retry-after']").attribute("data-seconds").to_i`, 30, 'data-seconds gives a machine-readable value.', RATE_OPTS));
    specs.push(vSpec('Rate entry count', 'Return the number of per-domain rate rules.', `driver.find_elements(:css, ".rate-entry").length`, 3, 'Count the configured domains.', RATE_OPTS));
    specs.push(vSpec('Rate domains', 'Return the configured domains.', `driver.find_elements(:css, ".rate-domain").map { |el| el.text }`, ['diners.example', 'api.diners.example', 'archive.diners.example'], 'Read all domain labels.', RATE_OPTS));
    specs.push(vSpec('Rate delays', 'Return the configured delay values as integers.', `driver.find_elements(:css, ".rate-entry").map { |el| el.attribute("data-delay").to_i }`, [2, 5, 10], 'Normalize delay attributes to numbers.', RATE_OPTS));
    specs.push(vSpec('Domain delay map', 'Return a hash of domain to delay seconds.', `delays = {}\ndriver.find_elements(:css, ".rate-entry").each do |el|\n  delays[el.attribute("data-domain")] = el.attribute("data-delay").to_i\nend\ndelays`, { 'diners.example': 2, 'api.diners.example': 5, 'archive.diners.example': 10 }, 'A map lets the scheduler look up delays.', RATE_OPTS));
    specs.push(vSpec('Largest delay', 'Return the largest configured delay.', `driver.find_elements(:css, ".rate-entry").map { |el| el.attribute("data-delay").to_i }.max`, 10, 'Use the strictest delay for shared runs.', RATE_OPTS));
    specs.push(vSpec('Smallest delay', 'Return the smallest configured delay.', `driver.find_elements(:css, ".rate-entry").map { |el| el.attribute("data-delay").to_i }.min`, 2, 'min helps compare per-domain rules.', RATE_OPTS));
    specs.push(vSpec('Strictest domain', 'Return the domain with the largest delay.', `best_domain = ""\nbest_delay = -1\ndriver.find_elements(:css, ".rate-entry").each do |el|\n  delay = el.attribute("data-delay").to_i\n  if delay > best_delay\n    best_delay = delay\n    best_domain = el.attribute("data-domain")\n  end\nend\nbest_domain`, 'archive.diners.example', 'Track the domain alongside the largest delay.', RATE_OPTS));
    specs.push(vSpec('Robot crawl delay text', 'Fetch robots.txt and return the crawl delay line.', `Net::HTTP.get_response(URI.parse("https://diners.example/robots.txt")).body.split("\\n").select { |line| line.include?("Crawl-delay") }[0]`, 'Crawl-delay: 2', 'Policy text and page data should agree.', API_OPTS));
    specs.push(stSpec('Honor robot delay', 'Fetch robots.txt and sleep for the requested crawl delay.', `body = Net::HTTP.get_response(URI.parse("https://diners.example/robots.txt")).body\ndelay = body.split("Crawl-delay: ")[1].to_i\ndriver.sleep(delay)`, { clock: 2000 }, 'Polite crawlers wait the requested time.', API_OPTS));
    specs.push(stSpec('Honor retry after', 'Fetch limited.json and sleep for its retry_after seconds.', `data = JSON.parse(Net::HTTP.get_response(URI.parse("https://diners.example/api/limited.json")).body)\ndriver.sleep(data.fetch("retry_after"))`, { clock: 30000 }, '429 responses often include waiting guidance.', API_OPTS));
    specs.push(stSpec('Exponential backoff', 'Fetch limited.json and sleep for twice the retry_after value.', `data = JSON.parse(Net::HTTP.get_response(URI.parse("https://diners.example/api/limited.json")).body)\ndriver.sleep(data.fetch("retry_after") * 2)`, { clock: 60000 }, 'Backoff reduces pressure on a struggling service.', API_OPTS));
    specs.push(vSpec('Rate limited status', 'Fetch limited.json and return the status code.', `Net::HTTP.get_response(URI.parse("https://diners.example/api/limited.json")).code`, '429', '429 means too many requests.', API_OPTS));
    specs.push(vSpec('Rate limited error', 'Fetch limited.json and return the error field.', `JSON.parse(Net::HTTP.get_response(URI.parse("https://diners.example/api/limited.json")).body).fetch("error")`, 'rate limit exceeded', 'The error message confirms the cause.', API_OPTS));
    specs.push(vSpec('Rate limit retry field', 'Fetch limited.json and return retry_after.', `JSON.parse(Net::HTTP.get_response(URI.parse("https://diners.example/api/limited.json")).body).fetch("retry_after")`, 30, 'The payload gives a wait hint.', API_OPTS));
    specs.push(vSpec('Wait before retry', 'Return the delay needed before retrying a limited request.', `data = JSON.parse(Net::HTTP.get_response(URI.parse("https://diners.example/api/limited.json")).body)\ndata.fetch("retry_after") + 5`, 35, 'Add a small safety margin to server guidance.', API_OPTS));
    specs.push(vSpec('Three page pacing total', 'Compute the total pause for three pages at the robot crawl delay.', `body = Net::HTTP.get_response(URI.parse("https://diners.example/robots.txt")).body\ndelay = body.split("Crawl-delay: ")[1].to_i\ndelay * 3`, 6, 'Pacing costs accumulate across pages.', API_OPTS));
    specs.push(stSpec('Paced page crawl', 'Visit three menu pages with a one-second pause before each.', `times = 0\n[1, 2, 3].each do |page|\n  driver.sleep(1)\n  driver.get("https://diners.example/menu/page/" + page.to_s)\n  times = times + 1\nend`, { clock: 3000, url: 'https://diners.example/menu/page/3' }, 'Crawls can be both bounded and paced.', PAGE_OPTS));
    specs.push(stSpec('Env driven delay', 'Read CRAWL_DELAY from ENV and sleep that long.', `driver.sleep(ENV["CRAWL_DELAY"].to_i)`, { clock: 4000 }, 'Operators can tune delays without code changes.', Object.assign({}, { scene: B }, { env: { CRAWL_DELAY: '4' } })));
    specs.push(stSpec('Write rate report', 'Write a JSON report with the maximum domain delay and retry value.', `max_delay = driver.find_elements(:css, ".rate-entry").map { |el| el.attribute("data-delay").to_i }.max\nreport = { max_delay: max_delay, retry_after: 30 }\nFile.write("out/rate-report.json", JSON.generate(report))`, { file: { name: 'out/rate-report.json', contains: '"max_delay":10' } }, 'Persist rate-limit decisions.', RATE_OPTS));
    specs.push(stSpec('Log polite pause', 'Write a log line stating the chosen delay.', `delay = driver.find_elements(:css, ".rate-entry").map { |el| el.attribute("data-delay").to_i }.max\nFile.write("out/politeness.log", "delay=" + delay.to_s)`, { file: { name: 'out/politeness.log', contains: 'delay=10' } }, 'Logs make pacing auditable.', RATE_OPTS));
    specs.push(vSpec('Combined delay ceiling', 'Return the larger of the max domain delay and the API retry value.', `domain = driver.find_elements(:css, ".rate-entry").map { |el| el.attribute("data-delay").to_i }.max\napi = JSON.parse(Net::HTTP.get_response(URI.parse("https://diners.example/api/limited.json")).body).fetch("retry_after")\n[domain, api].max`, 30, 'When rules overlap, honour the longer wait.', Object.assign({}, RATE_OPTS, { api: API })));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    addMissing('Compliance Capstone', [
      vSpec('Minimal necessary fields', 'Return id and name only from the first record.', `row = driver.find_element(:css, ".record")\n{ id: row.attribute("data-id"), name: row.attribute("data-name") }`, { id: '1', name: 'Pancakes' }, 'Collect only the fields the task needs.', RECORD_OPTS)
    ], TARGET_COUNTS['Compliance Capstone']);
    addMissing('Rate Limiting & Politeness', [
      vSpec('Delay from seeded plan', 'Read a seeded rate plan and return the delay for the api domain.', `plan = JSON.parse(File.read("out/rate-plan.json"))\nplan.fetch("api.diners.example")`, 5, 'Plans can be stored outside the script.', { scene: B, files: { 'out/rate-plan.json': '{"diners.example":2,"api.diners.example":5}' } })
    ], TARGET_COUNTS['Rate Limiting & Politeness']);
  })();

  (() => {
    const chapter = 'Error Monitoring & Logs';
    const specs = [];
    specs.push(vSpec('Banner message', 'Return the diagnostics error banner text.', `driver.find_element(:css, "[data-key='error-banner']").text`, 'Error: upstream request failed with HTTP 500.', 'Visible messages are the first monitoring signal.', BROKEN_OPTS));
    specs.push(vSpec('Banner code', 'Return the diagnostics error code.', `driver.find_element(:css, "[data-key='error-banner']").attribute("data-code")`, '500', 'Codes make logs searchable.', BROKEN_OPTS));
    specs.push(oSpec('Rescue missing element class', 'Rescue a missing element and print the error class.', `begin\n  driver.find_element(:id, "not-here")\nrescue NoSuchElementError => error\n  puts error.class\nend`, ['NoSuchElementError'], 'Rescued errors can be classified.', BROKEN_OPTS));
    specs.push(oSpec('Rescue missing element message', 'Rescue a missing element and print the error message.', `begin\n  driver.find_element(:id, "not-here")\nrescue NoSuchElementError => error\n  puts error.message\nend`, ['no such element: Unable to locate element: {"method":"id","selector":"not-here"}'], 'Messages explain which lookup failed.', BROKEN_OPTS));
    specs.push(oSpec('Ensure always logs', 'Rescue a missing element and print an ensure marker.', `begin\n  driver.find_element(:id, "not-here")\nrescue NoSuchElementError\n  puts "missing"\nensure\n  puts "checked"\nend`, ['missing', 'checked'], 'ensure runs on both success and failure.', BROKEN_OPTS));
    specs.push(stSpec('Write error class log', 'Rescue a missing element and write the error class to out/error-class.log.', `begin\n  driver.find_element(:id, "not-here")\nrescue NoSuchElementError => error\n  File.write("out/error-class.log", error.class)\nend`, { file: { name: 'out/error-class.log', contains: 'NoSuchElementError' } }, 'Persist failures for triage.', BROKEN_OPTS));
    specs.push(stSpec('Write error message log', 'Rescue a missing element and write its message to out/error-message.log.', `begin\n  driver.find_element(:id, "not-here")\nrescue NoSuchElementError => error\n  File.write("out/error-message.log", error.message)\nend`, { file: { name: 'out/error-message.log', contains: 'not-here' } }, 'Message logs identify the failing selector.', BROKEN_OPTS));
    specs.push(stSpec('Screenshot failure state', 'Save a screenshot to evidence/monitoring-error.png.', `driver.save_screenshot("evidence/monitoring-error.png")`, { screenshotPath: 'evidence/monitoring-error.png' }, 'Screenshots complement textual logs.', BROKEN_OPTS));
    specs.push(vSpec('API error code', 'Fetch error.json and return its status code.', `Net::HTTP.get_response(URI.parse("https://diners.example/api/error.json")).code`, '500', 'Server errors need status monitoring.', API_OPTS));
    specs.push(vSpec('API error body', 'Fetch error.json and return the error field.', `JSON.parse(Net::HTTP.get_response(URI.parse("https://diners.example/api/error.json")).body).fetch("error")`, 'internal server error', 'Bodies often explain the failure.', API_OPTS));
    specs.push(vSpec('API missing code', 'Fetch missing.json and return its numeric status.', `Net::HTTP.get_response(URI.parse("https://diners.example/api/missing.json")).code.to_i`, 404, 'Numeric codes are easy to aggregate.', API_OPTS));
    specs.push(vSpec('API missing message', 'Fetch missing.json and return its response message.', `Net::HTTP.get_response(URI.parse("https://diners.example/api/missing.json")).message`, 'Not Found', 'Messages are more readable in logs.', API_OPTS));
    specs.push(oSpec('Rescue HTTP failure', 'Fetch missing.json, call value, and print the rescued error class.', `begin\n  response = Net::HTTP.get_response(URI.parse("https://diners.example/api/missing.json"))\n  response.value\nrescue RubyError => error\n  puts error.class\nend`, ['RubyError'], 'value converts bad statuses into exceptions.', API_OPTS));
    specs.push(stSpec('Log HTTP failure', 'Rescue a 500 response and write failed to out/http-monitor.log.', `begin\n  response = Net::HTTP.get_response(URI.parse("https://diners.example/api/error.json"))\n  response.value\nrescue RubyError\n  File.write("out/http-monitor.log", "failed")\nend`, { file: { name: 'out/http-monitor.log', contains: 'failed' } }, 'Failure logs should be explicit.', API_OPTS));
    specs.push(vSpec('Rate limited status', 'Fetch limited.json and return its status code.', `Net::HTTP.get_response(URI.parse("https://diners.example/api/limited.json")).code`, '429', 'Rate limits are monitoring events too.', API_OPTS));
    specs.push(stSpec('Log retry hint', 'Fetch limited.json and write its retry_after value to out/retry.log.', `data = JSON.parse(Net::HTTP.get_response(URI.parse("https://diners.example/api/limited.json")).body)\nFile.write("out/retry.log", data.fetch("retry_after").to_s)`, { file: { name: 'out/retry.log', contains: '30' } }, 'Save retry guidance for operators.', API_OPTS));
    specs.push(vSpec('Blank name count', 'Count ledger rows with blank names.', `driver.find_elements(:css, ".record").count { |row| row.attribute("data-name").strip.empty? }`, 1, 'Blank fields are data-quality errors.', RECORD_OPTS));
    specs.push(vSpec('Blank email count', 'Count ledger rows with blank emails.', `driver.find_elements(:css, ".record").count { |row| row.attribute("data-email").strip.empty? }`, 2, 'Optional fields can still be monitored.', RECORD_OPTS));
    specs.push(vSpec('Blank date count', 'Count ledger rows with blank updated values.', `driver.find_elements(:css, ".record").count { |row| row.attribute("data-updated").strip.empty? }`, 1, 'Missing timestamps break freshness checks.', RECORD_OPTS));
    specs.push(vSpec('Fallback name count', 'Return the number of rows whose name needs a fallback.', `driver.find_elements(:css, ".record").count { |row| row.attribute("data-name").strip.empty? }`, 1, 'Count fallbacks to spot systemic problems.', RECORD_OPTS));
    specs.push(vSpec('Failed job count', 'Count failed batch jobs.', `driver.find_elements(:css, ".job-failure").length`, 2, 'Operational monitors count failures.', BATCH_OPTS));
    specs.push(vSpec('Exhausted job count', 'Count failed jobs that reached three attempts.', `driver.find_elements(:css, ".job-failure").count { |job| job.attribute("data-attempts").to_i >= 3 }`, 1, 'Exhausted jobs need human review.', BATCH_OPTS));
    specs.push(stSpec('Write failure report', 'Write failed job ids to out/failed-jobs.json.', `ids = driver.find_elements(:css, ".job-failure").map { |job| job.attribute("data-id") }\nFile.write("out/failed-jobs.json", JSON.generate(ids))`, { file: { name: 'out/failed-jobs.json', contains: 'job-105' } }, 'Durable failure reports support triage.', BATCH_OPTS));
    specs.push(vSpec('Combined monitor summary', 'Return a hash of banner code, failed jobs, and blank names.', `banner = driver.find_element(:css, "[data-key='error-banner']").attribute("data-code")\nfailed = driver.find_elements(:css, ".job-failure").length\nblanks = driver.find_elements(:css, ".record").count { |row| row.attribute("data-name").strip.empty? }\n{ banner: banner.to_i, failed: failed, blanks: blanks }`, { banner: 500, failed: 2, blanks: 1 }, 'A single summary can span multiple sources.', { routes: CURRICULUM_ROUTES, startUrl: BROKEN.url, files: {} }));
    specs.push(vSpec('Health after recovery', 'Click the recovery link and return the final page title.', `driver.find_element(:css, ".recovery-link").click\ndriver.title`, 'Record Ledger', 'Recovery should restore a known good page.', BROKEN_OPTS));
    specs.push(vSpec('Monitor seeded counts', 'Read seeded counts and return the error rate percent.', `data = JSON.parse(File.read("out/monitor-seed.json"))\n(data.fetch("errors") * 100 / data.fetch("total")).round`, 5, 'Error rates are common monitoring metrics.', { scene: B, files: { 'out/monitor-seed.json': '{"errors":1,"total":20}' } }));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'Environment Configuration';
    const specs = [];
    const configFiles = { scene: B, files: { 'config/diner.json': '{"base_url":"https://diners.example","timeout":5,"batch_size":2,"features":{"mask_emails":true}}' } };
    specs.push(vSpec('Read base URL', 'Return DINER_BASE from ENV.', `ENV["DINER_BASE"]`, 'https://diners.example', 'Environment variables carry deployment settings.', { scene: B, env: { DINER_BASE: 'https://diners.example' } }));
    specs.push(vSpec('Build URL from env', 'Navigate to DINER_BASE plus /menu and return the title.', `driver.get(ENV["DINER_BASE"] + "/menu")\ndriver.title`, 'All-Day Menu', 'Combine a configured base with a route.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/', env: { DINER_BASE: 'https://diners.example' } }));
    specs.push(vSpec('Read timeout env', 'Return TIMEOUT_SECONDS as an integer.', `ENV["TIMEOUT_SECONDS"].to_i`, 6, 'Timeouts are deployment settings.', { scene: B, env: { TIMEOUT_SECONDS: '6' } }));
    specs.push(vSpec('Apply implicit wait', 'Set the implicit wait from ENV and return the configured value.', `seconds = ENV["TIMEOUT_SECONDS"].to_i\ndriver.manage.timeouts.implicit_wait = seconds\ndriver.manage.timeouts.implicit_wait`, 6, 'Configuration should reach the driver.', { scene: B, env: { TIMEOUT_SECONDS: '6' } }));
    specs.push(vSpec('Read headless flag', 'Return true when HEADLESS is "true".', `ENV["HEADLESS"] == "true"`, true, 'Feature flags often arrive as strings.', { scene: B, env: { HEADLESS: 'true' } }));
    specs.push(stSpec('Start headless driver', 'Create a headless Chrome session using the HEADLESS flag.', `headless = ENV["HEADLESS"] == "true"\ndriver = Selenium::WebDriver.for(:chrome, { headless: headless })`, { headless: true, driverType: 'chrome' }, 'Driver options can be environment-driven.', { scene: B, env: { HEADLESS: 'true' } }));
    specs.push(stSpec('Driver type from env', 'Create the driver named by DRIVER_TYPE.', `driver = Selenium::WebDriver.for(ENV["DRIVER_TYPE"].to_sym)`, { driverType: 'firefox' }, 'to_sym turns text into a Selenium strategy.', { scene: B, env: { DRIVER_TYPE: 'firefox' } }));
    specs.push(vSpec('Batch size from env', 'Return BATCH_SIZE as an integer.', `ENV["BATCH_SIZE"].to_i`, 4, 'Batch width can be tuned per environment.', { scene: B, env: { BATCH_SIZE: '4' } }));
    specs.push(vSpec('Max attempts from env', 'Return MAX_ATTEMPTS as an integer.', `ENV["MAX_ATTEMPTS"].to_i`, 3, 'Retry policy can be configured externally.', { scene: B, env: { MAX_ATTEMPTS: '3' } }));
    specs.push(vSpec('Checkpoint path from env', 'Read CHECKPOINT_PATH and return true when the file exists.', `File.exist?(ENV["CHECKPOINT_PATH"])`, true, 'Deployments can choose where state lives.', { scene: B, env: { CHECKPOINT_PATH: 'out/checkpoint.json' }, files: { 'out/checkpoint.json': '{"page":1}' } }));
    specs.push(vSpec('Feature flag on', 'Return true when MASK_EMAILS is "true".', `ENV["MASK_EMAILS"] == "true"`, true, 'Flags should be explicit.', { scene: B, env: { MASK_EMAILS: 'true' } }));
    specs.push(vSpec('Feature flag off', 'Return false when MASK_EMAILS is "false".', `ENV["MASK_EMAILS"] == "true"`, false, 'A disabled flag must not be treated as true.', { scene: B, env: { MASK_EMAILS: 'false' } }));
    specs.push(vSpec('Read config file', 'Parse config/diner.json and return its base_url.', `JSON.parse(File.read("config/diner.json")).fetch("base_url")`, 'https://diners.example', 'Config files complement environment variables.', configFiles));
    specs.push(vSpec('Read nested config', 'Return the mask_emails feature flag from the config file.', `JSON.parse(File.read("config/diner.json")).fetch("features").fetch("mask_emails")`, true, 'Nested config keeps related flags together.', configFiles));
    specs.push(vSpec('Config fallback', 'Use fetch to provide a default timeout.', `JSON.parse(File.read("config/diner.json")).fetch("retries", 2)`, 2, 'Defaults protect older config files.', configFiles));
    specs.push(vSpec('Env overrides config', 'Return the timeout from ENV when present, otherwise from config.', `timeout = ENV["TIMEOUT_SECONDS"].to_i\nif timeout > 0\n  timeout\nelse\n  JSON.parse(File.read("config/diner.json")).fetch("timeout")\nend`, 9, 'Environment values can override file values.', Object.assign({}, configFiles, { env: { TIMEOUT_SECONDS: '9' } })));
    specs.push(vSpec('Config fallback used', 'Return the config timeout when no ENV override exists.', `timeout = ENV["TIMEOUT_SECONDS"].to_i\nif timeout > 0\n  timeout\nelse\n  JSON.parse(File.read("config/diner.json")).fetch("timeout")\nend`, 5, 'The file value is the baseline.', configFiles));
    specs.push(vSpec('Masked secret', 'Return a masked version of the configured password.', `password = ENV["DINER_PASS"]\npassword[0] + "***" + password[-1]`, 'c***e', 'Secrets should be masked in reports.', { scene: B, env: { DINER_PASS: 'coffee' } }));
    specs.push(vSpec('Login from env', 'Sign in using credentials from ENV and return the page title.', `driver.find_element(:id, "login-username").send_keys(ENV["DINER_USER"])\ndriver.find_element(:id, "login-password").send_keys(ENV["DINER_PASS"])\ndriver.find_element(:id, "login-submit").click\ndriver.title`, 'Private Account', 'Credentials should not be hard-coded.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/login', env: { DINER_USER: 'ada', DINER_PASS: 'coffee' } }));
    specs.push(vSpec('Environment name', 'Return true when APP_ENV is production.', `ENV["APP_ENV"] == "production"`, true, 'Deployment stages are usually named.', { scene: B, env: { APP_ENV: 'production' } }));
    specs.push(vSpec('Endpoint selection', 'Choose the API endpoint from the environment name.', `if ENV["APP_ENV"] == "production"\n  "https://diners.example/api/records.json"\nelse\n  "https://diners.example/api/menu.json"\nend`, 'https://diners.example/api/menu.json', 'Lower environments can use different endpoints.', { scene: B, env: { APP_ENV: 'staging' } }));
    specs.push(vSpec('Configured retry delay', 'Compute retry delay from ENV and a multiplier.', `ENV["RETRY_DELAY"].to_i * 2`, 12, 'Derived settings keep scripts flexible.', { scene: B, env: { RETRY_DELAY: '6' } }));
    specs.push(stSpec('Write config report', 'Write a sanitized config report without the password.', `report = { base: ENV["DINER_BASE"], user: ENV["DINER_USER"] }\nFile.write("out/config-report.json", JSON.generate(report))`, { file: { name: 'out/config-report.json', contains: 'ada' } }, 'Reports should include safe settings only.', { scene: B, env: { DINER_BASE: 'https://diners.example', DINER_USER: 'ada', DINER_PASS: 'coffee' } }));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'Deployment & Maintenance';
    const specs = [];
    specs.push(stSpec('Start Chrome session', 'Create a Chrome driver and verify the session type.', 'driver = Selenium::WebDriver.for(:chrome)', { driverType: 'chrome' }, 'Deployment smoke tests should assert the driver.', { scene: B }));
    specs.push(stSpec('Start Firefox session', 'Create a Firefox driver and verify the session type.', 'driver = Selenium::WebDriver.for(:firefox)', { driverType: 'firefox' }, 'Cross-browser jobs need explicit sessions.', { scene: B }));
    specs.push(stSpec('Start headless session', 'Create a headless Chrome driver.', 'driver = Selenium::WebDriver.for(:chrome, { headless: true })', { driverType: 'chrome', headless: true }, 'Scheduled jobs often run headless.', { scene: B }));
    specs.push(stSpec('Configure implicit wait', 'Set an implicit wait of four seconds.', `driver.manage.timeouts.implicit_wait = 4`, { implicitWait: 4 }, 'Timeouts are part of deployment settings.', { scene: B }));
    specs.push(stSpec('Clean quit', 'Create a driver, then quit it.', `driver = Selenium::WebDriver.for(:chrome)\ndriver.quit`, { quitFlag: true }, 'Always release browser resources.', { scene: B }));
    specs.push(vSpec('Navigate back', 'Visit the menu, go to orders, then go back and return the URL.', `driver.get("https://diners.example/menu")\ndriver.get("https://diners.example/orders")\ndriver.navigate.back\ndriver.current_url`, 'https://diners.example/menu', 'History checks catch navigation regressions.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/' }));
    specs.push(vSpec('Navigate forward', 'Visit menu and orders, go back, then forward and return the URL.', `driver.get("https://diners.example/menu")\ndriver.get("https://diners.example/orders")\ndriver.navigate.back\ndriver.navigate.forward\ndriver.current_url`, 'https://diners.example/orders', 'Forward should restore the later page.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/' }));
    specs.push(vSpec('Refresh page', 'Refresh the menu and return the title.', `driver.get("https://diners.example/menu")\ndriver.navigate.refresh\ndriver.title`, 'All-Day Menu', 'Refresh is a common health check.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/' }));
    specs.push(vSpec('Open a second window', 'Click the specials link and return the number of open windows.', `driver.find_element(:id, "open-specials").click\ndriver.window_handles.length`, 2, 'Window counts help verify pop-up handling.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/links' }));
    specs.push(vSpec('Switch to new window', 'Open specials, switch to the newest window, and return its title.', `driver.find_element(:id, "open-specials").click\nhandle = driver.window_handles.last\ndriver.switch_to.window(handle)\ndriver.title`, 'Specials Board', 'Switching windows should be deterministic.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/links' }));
    specs.push(vSpec('Smoke title', 'Load the menu and return the page title.', `driver.get("https://diners.example/menu")\ndriver.title`, 'All-Day Menu', 'A title check is a cheap deployment smoke test.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/' }));
    specs.push(vSpec('Smoke URL', 'Load the records page and return the current URL.', `driver.get("https://diners.example/records")\ndriver.current_url`, 'https://diners.example/records', 'Route checks confirm deployment wiring.', RECORD_OPTS));
    specs.push(stSpec('Write maintenance log', 'Write a maintenance log line for a successful smoke test.', `File.write("out/maintenance.log", "smoke ok")`, { file: { name: 'out/maintenance.log', contains: 'smoke ok' } }, 'Logs prove scheduled checks ran.', { scene: B }));
    specs.push(stSpec('Write deployment report', 'Write a JSON deployment report with driver and title.', `driver = Selenium::WebDriver.for(:chrome)\ndriver.get("https://diners.example/menu")\nFile.write("out/deployment.json", JSON.generate({ driver: "chrome", title: driver.title }))`, { file: { name: 'out/deployment.json', contains: 'All-Day Menu' } }, 'Reports are useful after a deploy.', { scene: B, routes: CURRICULUM_ROUTES }));
    specs.push(vSpec('Read deployment config', 'Read the deployment config and return its environment name.', `JSON.parse(File.read("config/deploy.json")).fetch("environment")`, 'production', 'Deployment config describes the target stage.', { scene: B, files: { 'config/deploy.json': '{"environment":"production","driver":"chrome"}' } }));
    specs.push(stSpec('Shutdown report', 'Quit the driver and write a shutdown marker.', `driver = Selenium::WebDriver.for(:chrome)\ndriver.quit\nFile.write("out/shutdown.log", "clean")`, { quitFlag: true, file: { name: 'out/shutdown.log', contains: 'clean' } }, 'Shutdown evidence closes the run.', { scene: B }));
    specs.push(stSpec('Exhausted job quarantine', 'Write exhausted job ids to out/quarantine.json.', `ids = driver.find_elements(:css, ".job-failure").select { |job| job.attribute("data-attempts").to_i >= 3 }.map { |job| job.attribute("data-id") }\nFile.write("out/quarantine.json", JSON.generate(ids))`, { file: { name: 'out/quarantine.json', contains: 'job-102' } }, 'Maintenance queues need explicit quarantine state.', BATCH_OPTS));
    specs.push(vSpec('Authenticated session id', 'Sign in and return the session id.', `driver.find_element(:id, "login-username").send_keys("ada")\ndriver.find_element(:id, "login-password").send_keys("coffee")\ndriver.find_element(:id, "login-submit").click\ndriver.session_id`, 'session-0', 'Session checks help debug authentication.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/login' }));
    specs.push(vSpec('API smoke status', 'Fetch menu.json and return its status code.', `Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json")).code`, '200', 'API smoke tests complement page smoke tests.', API_OPTS));
    specs.push(stSpec('Health screenshot', 'Save a screenshot to evidence/health.png after loading the menu.', `driver.get("https://diners.example/menu")\ndriver.save_screenshot("evidence/health.png")`, { screenshotPath: 'evidence/health.png' }, 'Visual evidence helps diagnose deploy drift.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/' }));
    specs.push(vSpec('Environment health gate', 'Return true when deployment config and driver config agree.', `env = JSON.parse(File.read("config/deploy.json")).fetch("environment")\ndriver_name = ENV["DRIVER_TYPE"]\nenv == "production" && driver_name == "chrome"`, true, 'Configuration and runtime state should match.', { scene: B, env: { DRIVER_TYPE: 'chrome' }, files: { 'config/deploy.json': '{"environment":"production","driver":"chrome"}' } }));
    specs.push(stSpec('Final smoke summary', 'Write a JSON summary with page and API status checks.', `page_status = driver.title == "All-Day Menu"\napi_status = Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json")).code == "200"\nFile.write("out/smoke-summary.json", JSON.generate({ page: page_status, api: api_status }))`, { file: { name: 'out/smoke-summary.json', contains: '"page":true' } }, 'A compact summary is ideal for CI.', { routes: CURRICULUM_ROUTES, api: API, startUrl: 'https://diners.example/menu' }));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    const chapter = 'Responsible Scraping Capstone';
    const specs = [];
    specs.push(vSpec('Policy gate first', 'Return true when robots and terms both permit the planned crawl.', `robots = Net::HTTP.get_response(URI.parse("https://diners.example/robots.txt")).body\nterms = Net::HTTP.get_response(URI.parse("https://diners.example/terms.txt")).body\nrobots.include?("Allow: /menu") && terms.include?("Personal use only")`, true, 'Responsible runs begin with permission.', API_OPTS));
    specs.push(vSpec('Strict robots stop', 'Return false when strict robots blocks the crawl.', `body = Net::HTTP.get_response(URI.parse("https://diners.example/robots-strict.txt")).body\n!body.include?("Allow: /")`, true, 'If rules are strict, stop.', API_OPTS));
    specs.push(vSpec('Terms restriction', 'Return true when terms prohibit resale.', `Net::HTTP.get_response(URI.parse("https://diners.example/terms.txt")).body.include?("Do not resell data")`, true, 'Track downstream use restrictions.', API_OPTS));
    specs.push(vSpec('Privacy retention rule', 'Return true when privacy policy requires deletion after seven days.', `Net::HTTP.get_response(URI.parse("https://diners.example/privacy.txt")).body.include?("seven days")`, true, 'Respect retention windows.', API_OPTS));
    specs.push(stSpec('Honour crawl delay', 'Fetch robots.txt and sleep for the requested delay.', `body = Net::HTTP.get_response(URI.parse("https://diners.example/robots.txt")).body\ndriver.sleep(body.split("Crawl-delay: ")[1].to_i)`, { clock: 2000 }, 'Pacing is non-negotiable.', API_OPTS));
    specs.push(vSpec('Per-domain ceiling', 'Return the largest delay from the rate scene.', `driver.find_elements(:css, ".rate-entry").map { |el| el.attribute("data-delay").to_i }.max`, 10, 'Shared runners should use the strictest delay.', RATE_OPTS));
    specs.push(stSpec('Honour retry after', 'Fetch limited.json and sleep for its retry_after value.', `data = JSON.parse(Net::HTTP.get_response(URI.parse("https://diners.example/api/limited.json")).body)\ndriver.sleep(data.fetch("retry_after"))`, { clock: 30000 }, '429 responses must slow the run down.', API_OPTS));
    specs.push(vSpec('Mask exported emails', 'Return masked non-blank emails for a safe export.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-email") }.reject { |email| email.empty? }.map { |email| email.split("@")[0][0] + "***@" + email.split("@")[1] }.uniq.length`, 4, 'Do not publish personal email addresses.', RECORD_OPTS));
    specs.push(vSpec('Blank name fallback', 'Return names with UNKNOWN substituted for blanks.', `driver.find_elements(:css, ".record").map do |row|\n  name = row.attribute("data-name").strip\n  name.empty? ? "UNKNOWN" : name\nend`, ['Pancakes', 'Waffles', 'Waffles', 'pancakes', 'Coffee', 'Steak', 'UNKNOWN', 'Caesar Salad', 'Coffee', 'Caesar Salad'], 'Fallbacks keep exports honest.', RECORD_OPTS));
    specs.push(vSpec('Deduplicate ids', 'Return the number of unique ledger ids.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-id") }.uniq.length`, 8, 'Duplicates inflate reports.', RECORD_OPTS));
    specs.push(vSpec('Normalize prices', 'Return normalized ledger prices.', `driver.find_elements(:css, ".record").map { |row| row.attribute("data-price").gsub(/[^0-9.]/, "").to_f }`, [8, 9, 9, 8, 3, 24, 7.5, 9.5, 3, 9.5], 'Clean values before analysis.', RECORD_OPTS));
    specs.push(vSpec('Bounded crawl', 'Crawl at most three paged scenes and return the dish count.', `count = 0\nurl = "https://diners.example/menu/page/1"\nwhile url && count < 3\n  driver.get(url)\n  count = count + driver.find_elements(:css, ".dish").length\n  links = driver.find_elements(:css, ".next")\n  url = links.length > 0 ? links[0].attribute("href") : nil\nend\ncount`, 9, 'Bounded crawls avoid runaway requests.', PAGE_OPTS));
    specs.push(stSpec('Write crawl checkpoint', 'Save the last visited page as a checkpoint.', `File.write("out/responsible-checkpoint.json", JSON.generate({ page: 3 }))`, { file: { name: 'out/responsible-checkpoint.json', contains: '"page":3' } }, 'Resume state supports safe retries.', { scene: B }));
    specs.push(vSpec('Resume checkpoint', 'Read the responsible checkpoint and return the page.', `JSON.parse(File.read("out/responsible-checkpoint.json")).fetch("page")`, 3, 'Resume state should be readable.', { scene: B, files: { 'out/responsible-checkpoint.json': '{"page":3}' } }));
    specs.push(stSpec('Log an error', 'Rescue a missing element and write a failure marker.', `begin\n  driver.find_element(:id, "not-here")\nrescue NoSuchElementError\n  File.write("out/responsible-error.log", "missing")\nend`, { file: { name: 'out/responsible-error.log', contains: 'missing' } }, 'Failures should leave durable evidence.', BROKEN_OPTS));
    specs.push(stSpec('Save evidence screenshot', 'Save a screenshot to evidence/responsible.png.', `driver.save_screenshot("evidence/responsible.png")`, { screenshotPath: 'evidence/responsible.png' }, 'Evidence supports audit and debugging.', { scene: B }));
    specs.push(vSpec('API status gate', 'Return true when menu.json responds with 200.', `Net::HTTP.get_response(URI.parse("https://diners.example/api/menu.json")).code == "200"`, true, 'Only parse successful responses.', API_OPTS));
    specs.push(vSpec('API envelope crawl', 'Crawl API pages and return the total item count.', `count = 0\nurl = "https://diners.example/api/page/1.json"\nwhile url\n  data = JSON.parse(Net::HTTP.get_response(URI.parse(url)).body)\n  count = count + data.fetch("items").length\n  url = data["next"]\nend\ncount`, 10, 'Follow documented pagination signals.', API_OPTS));
    specs.push(vSpec('Retry queue', 'Return failed job ids that can still be retried.', `driver.find_elements(:css, ".job-failure").select { |job| job.attribute("data-attempts").to_i < 3 }.map { |job| job.attribute("data-id") }`, ['job-105'], 'Retry only within policy limits.', BATCH_OPTS));
    specs.push(vSpec('Quarantine exhausted jobs', 'Return failed job ids that reached the attempt limit.', `driver.find_elements(:css, ".job-failure").select { |job| job.attribute("data-attempts").to_i >= 3 }.map { |job| job.attribute("data-id") }`, ['job-102'], 'Exhausted jobs need review.', BATCH_OPTS));
    specs.push(stSpec('Write rate report', 'Write a rate report with the maximum domain delay.', `delay = driver.find_elements(:css, ".rate-entry").map { |el| el.attribute("data-delay").to_i }.max\nFile.write("out/responsible-rate.json", JSON.generate({ delay: delay }))`, { file: { name: 'out/responsible-rate.json', contains: '"delay":10' } }, 'Document the politeness decision.', RATE_OPTS));
    specs.push(vSpec('Login before private data', 'Sign in and return the number of private rows.', `driver.find_element(:id, "login-username").send_keys("ada")\ndriver.find_element(:id, "login-password").send_keys("coffee")\ndriver.find_element(:id, "login-submit").click\ndriver.find_elements(:css, ".private").length`, 3, 'Authentication must precede protected data.', { routes: CURRICULUM_ROUTES, startUrl: 'https://diners.example/login' }));
    specs.push(stSpec('No raw private emails', 'Write masked private row labels to out/private-safe.txt.', `rows = driver.find_elements(:css, ".private").map { |el| el.text }\nFile.write("out/private-safe.txt", rows.map { |row| row[0] + "***" }.join(","))`, { file: { name: 'out/private-safe.txt', contains: '***' } }, 'Avoid publishing private identifiers.', { routes: CURRICULUM_ROUTES, startUrl: S.account.url }));
    specs.push(stSpec('Final JSON export', 'Write normalized ledger records to out/responsible-ledger.json.', `rows = driver.find_elements(:css, ".record").map do |row|\n  { id: row.attribute("data-id"), name: row.attribute("data-name").strip.downcase, price: row.attribute("data-price").gsub(/[^0-9.]/, "").to_f }\nend\nFile.write("out/responsible-ledger.json", JSON.generate(rows))`, { file: { name: 'out/responsible-ledger.json', contains: 'waffles' } }, 'Export only clean, necessary fields.', RECORD_OPTS));
    specs.push(stSpec('Final CSV export', 'Write normalized record names and prices to out/responsible-ledger.csv.', `rows = [["name", "price"]]\ndriver.find_elements(:css, ".record").each do |row|\n  rows = rows + [[row.attribute("data-name").strip.downcase, row.attribute("data-price").gsub(/[^0-9.]/, "").to_f]]\nend\nFile.write("out/responsible-ledger.csv", CSV.generate(rows))`, { file: { name: 'out/responsible-ledger.csv', contains: 'name,price' } }, 'CSV is a portable final format.', RECORD_OPTS));
    specs.push(vSpec('Final counts', 'Return record count, blank name count, and unique id count.', `rows = driver.find_elements(:css, ".record")\n[rows.length, rows.count { |row| row.attribute("data-name").strip.empty? }, rows.map { |row| row.attribute("data-id") }.uniq.length]`, [10, 1, 8], 'Final counts summarize quality.', RECORD_OPTS));
    specs.push(vSpec('Configured run', 'Return true when RUN_MODE from ENV is responsible.', `ENV["RUN_MODE"] == "responsible"`, true, 'Run mode should be explicit.', { scene: B, env: { RUN_MODE: 'responsible' } }));
    specs.push(stSpec('Total pacing clock', 'Sleep twice for the robot crawl delay and verify the clock.', `body = Net::HTTP.get_response(URI.parse("https://diners.example/robots.txt")).body\ndelay = body.split("Crawl-delay: ")[1].to_i\ndriver.sleep(delay)\ndriver.sleep(delay)`, { clock: 4000 }, 'Total pacing matters across a full run.', API_OPTS));
    specs.push(stSpec('Clean shutdown', 'Quit the driver after a successful run.', `driver = Selenium::WebDriver.for(:chrome)\ndriver.quit`, { quitFlag: true }, 'Responsible runs release resources.', { scene: B }));
    specs.push(stSpec('Write compliance evidence', 'Write a final compliance decision file.', `File.write("out/final-compliance.txt", "allowed with pacing and masking")`, { file: { name: 'out/final-compliance.txt', contains: 'pacing' } }, 'The final decision should be auditable.', { scene: B }));
    specs.push(vSpec('Responsible decision gate', 'Return true when policy, rate, and privacy checks all pass.', `robots = Net::HTTP.get_response(URI.parse("https://diners.example/robots.txt")).body\nprivacy = Net::HTTP.get_response(URI.parse("https://diners.example/privacy.txt")).body\ndelay = driver.find_elements(:css, ".rate-entry").map { |el| el.attribute("data-delay").to_i }.max\nrobots.include?("Allow: /menu") && privacy.include?("seven days") && delay > 0`, true, 'Combine the checks into one final gate.', Object.assign({}, RATE_OPTS, { api: API })));
    specs.push(stSpec('End-to-end responsible run', 'Check policy, pace, scrape the ledger, mask emails, and write the final export.', `robots = Net::HTTP.get_response(URI.parse("https://diners.example/robots.txt")).body\nif robots.include?("Allow: /menu")\n  driver.sleep(2)\n  names = driver.find_elements(:css, ".record").map { |row| row.attribute("data-name").strip.downcase }\n  File.write("out/responsible-final.json", JSON.generate({ names: names }))\nend`, { clock: 2000, file: { name: 'out/responsible-final.json', contains: 'waffles' } }, 'This is the production-like capstone.', Object.assign({}, RECORD_OPTS, { api: API })));
    addMissing(chapter, specs, TARGET_COUNTS[chapter]);
  })();

  (() => {
    addMissing('Environment Configuration', [
      vSpec('Configured timeout value', 'Read TIMEOUT_SECONDS from ENV and return it as an integer.', `ENV["TIMEOUT_SECONDS"].to_i`, 7, 'Runtime settings can be injected per deployment.', { scene: B, env: { TIMEOUT_SECONDS: '7' } })
    ], TARGET_COUNTS['Environment Configuration']);

    const seenKeys = new Set();
    LEVELS.forEach((level) => {
      const baseKey = level.key || stableKey(level);
      let key = baseKey;
      let suffix = 2;
      while (seenKeys.has(key)) {
        key = `${baseKey}#${suffix}`;
        suffix += 1;
      }
      level.key = key;
      seenKeys.add(key);
    });

    LEVELS.sort((a, b) => (a.chapterIndex - b.chapterIndex) || (a._sequence - b._sequence));
    LEVELS.forEach((level, index) => {
      level.id = index + 1;
      level.chapterIndex = CHAPTERS.indexOf(level.chapter);
    });

    const LEGACY_IDS_BY_KEY = {};
    const LEVELS_BY_LEGACY_ID = {};
    LEVELS.forEach((level) => {
      LEGACY_IDS_BY_KEY[level.key] = level.legacyId;
      LEVELS_BY_LEGACY_ID[String(level.legacyId)] = level;
    });

    Object.assign(api, {
      LEGACY_IDS_BY_KEY,
      LEVELS_BY_LEGACY_ID,
      TOTAL: LEVELS.length
    });
    global.LEGACY_IDS_BY_KEY = LEGACY_IDS_BY_KEY;
    global.LEVELS_BY_LEGACY_ID = LEVELS_BY_LEGACY_ID;
  })();

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.SeleniumDinerLevels = api;
  global.LEVELS = LEVELS;
  global.CHAPTERS = CHAPTERS;
  global.CHAPTER_BLURBS = CHAPTER_BLURBS;
  global.PARTS = PARTS;
})(typeof window !== 'undefined' ? window : globalThis);
