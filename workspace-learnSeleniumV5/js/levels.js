/*
 * Selenium Ruby Diner - 264 levels.
 *
 * Chapters:
 *   1. Locator Basics             (20)
 *   2. CSS Fundamentals           (30)
 *   3. CSS Advanced               (20)
 *   4. XPath Fundamentals         (30)
 *   5. XPath Advanced & Axes      (30)
 *   6. Collections & Scoped Finds (20)
 *   7. Extraction & Scraping      (30)
 *   8. Actions, Waits & Navigation(20)
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

  function add(level) {
    level._sequence = LEVELS.length;
    level.id = LEVELS.length + 1;
    level.chapterIndex = CHAPTERS.indexOf(level.chapter);
    level.requiredStrategy = level.requiredStrategy || inferRequiredStrategy(level.solution);
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
    solution: 'driver = Selenium::WebDriver.for :chrome',
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
    hint: 'Interpolate with #{...} inside a double-quoted string.'
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
    const options = Object.assign({ chapter, scene: B }, spec);
    if (spec.kind === 'state') return stateLevel(options);
    if (spec.kind === 'output') return outputLevel(options);
    if (spec.kind === 'select') return selectLevel(options);
    return valueLevel(options);
  }

  function chapterCount(chapter) {
    return LEVELS.filter((level) => level.chapter === chapter).length;
  }

  function addMissing(chapter, specs) {
    const needed = 25 - chapterCount(chapter);
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
        solution: `driver = Selenium::WebDriver.for :${type}`
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

  // =========================================================================
  // Part 3 expansion - Resilient Scraping (200 total)
  // =========================================================================
  const apiUnused = null;

  const api = {
    LEVELS,
    CHAPTERS,
    CHAPTER_BLURBS,
    PARTS,
    ROUTES
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.SeleniumDinerLevels = api;
  global.LEVELS = LEVELS;
  global.CHAPTERS = CHAPTERS;
  global.CHAPTER_BLURBS = CHAPTER_BLURBS;
  global.PARTS = PARTS;
})(typeof window !== 'undefined' ? window : globalThis);
