/*
 * Scene fixtures for Selenium Ruby Diner.
 * Every targetable element carries a unique data-key so answers can be checked.
 */
(function (global) {
  'use strict';

  const ORIGIN = 'https://diners.example';

  function esc(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function encodedHtml(value) {
    return esc(encodeURIComponent(String(value)));
  }

  function attrs(map) {
    return Object.keys(map || {})
      .filter((key) => map[key] !== undefined && map[key] !== null && map[key] !== false)
      .map((key) => `${key}="${esc(map[key])}"`)
      .join(' ');
  }

  function slug(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function plate(key, name, options) {
    const opts = options || {};
    const classes = ['plate'].concat(opts.classes || []).join(' ');
    const data = opts.data || {};
    const attributeMap = {
      id: opts.id || key,
      'data-key': key,
      'data-label': opts.label || name,
      title: opts.title,
      lang: opts.lang
    };
    Object.keys(data).forEach((nameKey) => {
      attributeMap[`data-${slug(nameKey)}`] = data[nameKey];
    });
    if (opts.price !== undefined) attributeMap['data-price'] = opts.price;

    const food = `<span class="food" data-key="${key}-food" data-label="${esc(name)} food">${esc(name)}</span>`;
    const price = opts.price !== undefined
      ? `<span class="price" data-key="${key}-price" data-label="${esc(name)} price">$${esc(opts.price)}</span>`
      : '';
    const tags = (opts.tags || []).map((tag, index) => {
      return `<span class="tag tag-${slug(tag)}" data-key="${key}-tag-${index + 1}" data-label="${esc(name)} tag: ${esc(tag)}">${esc(tag)}</span>`;
    }).join('');

    return `<div class="${classes}" ${attrs(attributeMap)}>
      ${food}${price}${tags}
    </div>`;
  }

  function tableScene(options) {
    const opts = options || {};
    return {
      url: `${ORIGIN}/${opts.slug || 'menu'}`,
      title: opts.title || 'Diner Menu',
      html: `<div class="scene scene-table">
        <div class="scene-heading">
          <h1 class="scene-title" data-key="scene-title" data-label="${esc(opts.title || 'Menu')} heading">${esc(opts.title || 'Diner Menu')}</h1>
          <p class="scene-note">${esc(opts.note || 'Hover over a plate to inspect its markup.')}</p>
        </div>
        <div class="table" data-key="table" data-label="table">
          ${(opts.items || []).join('\n')}
        </div>
        ${opts.extra || ''}
      </div>`
    };
  }

  function linkScene(options) {
    const opts = options || {};
    const links = (opts.links || []).map((link) => {
      return `<li><a class="menu-link ${link.className || ''}" href="${esc(link.href)}" data-key="${link.key}" data-label="${esc(link.text)}">${esc(link.text)}</a></li>`;
    }).join('\n');
    return {
      url: `${ORIGIN}/${opts.slug || 'links'}`,
      title: opts.title || 'Diner Links',
      html: `<div class="scene scene-links">
        <div class="scene-heading">
          <h1 class="scene-title" data-key="scene-title" data-label="${esc(opts.title || 'Links')} heading">${esc(opts.title || 'Diner Links')}</h1>
          <p class="scene-note">${esc(opts.note || 'A list of links for link_text practice.')}</p>
        </div>
        <ul class="link-list" data-key="link-list" data-label="link list">
          ${links}
        </ul>
      </div>`
    };
  }

  function section(name, title, dishes) {
    const sectionKey = `sec-${slug(name)}`;
    const dishHtml = dishes.map((dish) => {
      return `<li class="dish ${slug(dish.category || '')}" data-key="${dish.key}" data-label="${esc(dish.name)}" data-category="${esc(dish.category || '')}" data-price="${esc(dish.price)}">
        <a class="dish-link" href="${ORIGIN}/menu/${slug(dish.name)}" data-key="${dish.key}-link" data-label="${esc(dish.name)} link"><span class="food" data-key="${dish.key}-food" data-label="${esc(dish.name)} food">${esc(dish.name)}</span></a>
        <span class="price" data-key="${dish.key}-price" data-label="${esc(dish.name)} price">$${esc(dish.price)}</span>
      </li>`;
    }).join('\n');
    return `<section class="menu-section" data-key="${sectionKey}" data-label="${esc(title)} section" data-section="${esc(name)}">
      <h2 data-key="${sectionKey}-title" data-label="${esc(title)} heading">${esc(title)}</h2>
      <ul class="dishes" data-key="${sectionKey}-list" data-label="${esc(title)} dish list">
        ${dishHtml}
      </ul>
    </section>`;
  }

  function menuScene(options) {
    const opts = options || {};
    const sections = (opts.sections || []).map((item) => section(item.name, item.title, item.dishes)).join('\n');
    return {
      url: `${ORIGIN}/${opts.slug || 'menu'}`,
      title: opts.title || 'All-Day Menu',
      html: `<div class="scene scene-menu">
        <div class="scene-heading">
          <h1 class="scene-title" data-key="scene-title" data-label="${esc(opts.title || 'All-Day Menu')} heading">${esc(opts.title || 'All-Day Menu')}</h1>
          <p class="scene-note">${esc(opts.note || 'A nested menu for CSS, XPath, and scoped searches.')}</p>
        </div>
        ${sections}
      </div>`
    };
  }

  function orderScene(options) {
    const opts = options || {};
    const orders = (opts.orders || []).map((order) => {
      const items = order.items.map((item) => {
        return `<li class="item" data-key="${item.key}" data-label="${esc(item.name)}">${esc(item.name)}</li>`;
      }).join('\n');
      return `<article class="order" data-key="${order.key}" data-label="Order ${esc(order.number)}" data-status="${esc(order.status)}" data-customer="${esc(order.customer)}">
        <h3 data-key="${order.key}-title" data-label="Order ${esc(order.number)} heading">Order ${esc(order.number)} <span class="status" data-key="${order.key}-status" data-label="Order ${esc(order.number)} status">${esc(order.status)}</span></h3>
        <p class="customer">Customer: <strong data-key="${order.key}-customer" data-label="Order ${esc(order.number)} customer">${esc(order.customer)}</strong></p>
        <ul class="order-items" data-key="${order.key}-items" data-label="Order ${esc(order.number)} items">
          ${items}
        </ul>
      </article>`;
    }).join('\n');
    return {
      url: `${ORIGIN}/${opts.slug || 'orders'}`,
      title: opts.title || 'Open Orders',
      html: `<div class="scene scene-orders">
        <div class="scene-heading">
          <h1 class="scene-title" data-key="scene-title" data-label="${esc(opts.title || 'Open Orders')} heading">${esc(opts.title || 'Open Orders')}</h1>
          <p class="scene-note">${esc(opts.note || 'Nested orders for ancestor and sibling practice.')}</p>
        </div>
        <div class="order-list" data-key="order-list" data-label="order list">
          ${orders}
        </div>
      </div>`
    };
  }

  function formScene() {
    return {
      url: `${ORIGIN}/order`,
      title: 'Place Your Order',
      html: `<div class="scene scene-form">
        <div class="scene-heading">
          <h1 class="scene-title" data-key="scene-title" data-label="Place Your Order heading">Place Your Order</h1>
          <p class="scene-note">Form controls for id, name, tag, and Select practice.</p>
        </div>
        <form id="order-form" class="order-form" data-key="order-form" data-label="order form">
          <div class="field">
            <label for="customer-name">Name</label>
            <input id="customer-name" data-key="f-name" data-label="Name input" name="customer_name" type="text" placeholder="Ada Lovelace">
          </div>
          <div class="field">
            <label for="customer-email">Email</label>
            <input id="customer-email" data-key="f-email" data-label="Email input" name="email" type="email" placeholder="ada@example.com">
          </div>
          <div class="field">
            <label for="customer-phone">Phone</label>
            <input id="customer-phone" data-key="f-phone" data-label="Phone input" name="phone" type="tel" placeholder="555-0100">
          </div>
          <div class="field">
            <label for="notes">Notes</label>
            <textarea id="notes" data-key="f-notes" data-label="Notes textarea" name="notes" placeholder="Extra napkins"></textarea>
          </div>
          <div class="field">
            <label for="quantity">Quantity</label>
            <input id="quantity" data-key="f-quantity" data-label="Quantity input" name="quantity" type="number" value="1">
          </div>
          <div class="field">
            <label for="size">Size</label>
            <select id="size" data-key="f-size" data-label="Size select" name="size">
              <option value="small" data-key="f-size-small" data-label="Small option">Small</option>
              <option value="medium" selected data-key="f-size-medium" data-label="Medium option">Medium</option>
              <option value="large" data-key="f-size-large" data-label="Large option">Large</option>
            </select>
          </div>
          <div class="field checkbox">
            <input type="checkbox" id="extra-cheese" data-key="f-cheese" data-label="Extra cheese checkbox" name="extra_cheese" checked>
            <label for="extra-cheese">Extra cheese</label>
          </div>
          <div class="field checkbox">
            <input type="checkbox" id="vegan" data-key="f-vegan" data-label="Vegan checkbox" name="vegan">
            <label for="vegan">Vegan</label>
          </div>
          <div class="actions">
            <button type="submit" id="place-order" data-key="f-submit" data-label="Place order button" data-click="submit" class="btn primary" name="submit_order">Place order</button>
            <button type="reset" id="reset-order" data-key="f-reset" data-label="Reset button" class="btn" name="reset">Reset</button>
            <button type="button" id="disabled-button" data-key="f-disabled" data-label="Disabled button" class="btn" disabled>Disabled</button>
          </div>
        </form>
        <p class="cart-line">Items in cart: <span data-cart-count>0</span></p>
      </div>`
    };
  }

  function actionScene() {
    return {
      url: `${ORIGIN}/action`,
      title: 'Order Counter',
      html: `<div class="scene scene-action">
        <div class="scene-heading">
          <h1 class="scene-title" data-key="scene-title" data-label="Order Counter heading">Order Counter</h1>
          <p class="scene-note">Click buttons, fill inputs, and watch the cart update.</p>
        </div>
        <div class="table action-table" data-key="table" data-label="action table">
          ${plate('a1', 'Pancakes', { classes: ['hot', 'sweet'], price: 8, data: { category: 'sweet' }, tags: ['hot', 'sweet'] })}
          <button class="add-btn" data-key="add-a1" data-label="Add Pancakes" data-click="add" data-value="1">Add Pancakes</button>
          ${plate('a2', 'Waffles', { classes: ['hot', 'sweet'], price: 9, data: { category: 'sweet' }, tags: ['hot', 'sweet'] })}
          <button class="add-btn" data-key="add-a2" data-label="Add Waffles" data-click="add" data-value="1">Add Waffles</button>
          ${plate('a3', 'Coffee', { classes: ['hot', 'drink'], price: 3, data: { category: 'drink' }, tags: ['hot', 'drink'] })}
          <button class="add-btn" data-key="add-a3" data-label="Add Coffee" data-click="add" data-value="1">Add Coffee</button>
          ${plate('a4', 'Fruit Bowl', { classes: ['cold', 'healthy', 'vegan'], price: 7, data: { category: 'healthy' }, tags: ['cold', 'healthy'] })}
          <button class="add-btn" data-key="add-a4" data-label="Add Fruit Bowl" data-click="add" data-value="1">Add Fruit Bowl</button>
        </div>
        <div class="counter">
          <p class="cart-line">Cart: <span data-cart-count>0</span></p>
          <button class="btn primary" data-key="checkout" data-label="Checkout button" data-click="submit">Checkout</button>
          <button class="btn" data-key="flip-sign" data-label="Flip sign button" data-click="toggle" data-on="false" aria-pressed="false">Flip the sign</button>
        </div>
      </div>`
    };
  }

  function delayedScene() {
    return {
      url: `${ORIGIN}/kitchen`,
      title: 'Kitchen Window',
      html: `<div class="scene scene-delayed">
        <div class="scene-heading">
          <h1 class="scene-title" data-key="scene-title" data-label="Kitchen Window heading">Kitchen Window</h1>
          <p class="scene-note">Tickets appear after a short delay. Time advances in virtual seconds.</p>
        </div>
        <div class="ticket-board">
          <div class="ticket" id="w0" data-key="w0" data-label="Kitchen status">Kitchen is cooking...</div>
          <div class="ticket" id="w1" data-key="w1" data-label="Fresh coffee" data-appears-at="1500" hidden>Fresh coffee</div>
          <div class="ticket" id="w2" data-key="w2" data-label="Hot pancakes" data-appears-at="3000" hidden>Hot pancakes</div>
          <div class="ticket" id="w3" data-key="w3" data-label="The check" data-appears-at="4500" hidden>The check</div>
        </div>
      </div>`
    };
  }

  function loginScene() {
    return {
      url: `${ORIGIN}/login`,
      title: 'Sign In',
      html: `<div class="scene scene-login">
        <div class="scene-heading">
          <h1 class="scene-title" data-key="login-title" data-label="Staff login heading">Staff Login</h1>
          <p class="scene-note">Sign in to open the protected order ledger.</p>
        </div>
        <form class="order-form" data-key="login-form" data-label="login form">
          <div class="field">
            <label for="login-username">Username</label>
            <input id="login-username" data-key="login-user" data-label="Username input" name="username" type="text" placeholder="ada">
          </div>
          <div class="field">
            <label for="login-password">Password</label>
            <input id="login-password" data-key="login-pass" data-label="Password input" name="password" type="password" placeholder="coffee">
          </div>
          <div class="actions">
            <button type="button" id="login-submit" data-key="login-submit" data-label="Sign in button" data-click="login" data-href="${ORIGIN}/account" data-user="ada" data-password="coffee" class="btn primary">Sign in</button>
          </div>
        </form>
      </div>`
    };
  }

  function accountScene() {
    return {
      url: `${ORIGIN}/account`,
      title: 'Order Ledger',
      requiresAuth: true,
      html: `<div class="scene scene-account">
        <div class="scene-heading">
          <h1 class="scene-title" data-key="account-title" data-label="Order ledger heading">Protected Order Ledger</h1>
          <p class="welcome" data-key="account-welcome" data-label="Welcome message">Welcome, ada</p>
          <p class="scene-note">Private orders are only visible after login.</p>
        </div>
        <div class="table" data-key="account-table" data-label="private order table">
          ${plate('p1', 'Secret Pancakes', { classes: ['private', 'sweet'], price: 11, data: { category: 'private' } })}
          ${plate('p2', 'Private Coffee', { classes: ['private', 'drink'], price: 4, data: { category: 'private' } })}
        </div>
        <button type="button" id="logout" data-key="logout" data-label="Sign out button" data-click="logout" data-href="${ORIGIN}/login" class="btn">Sign out</button>
      </div>`
    };
  }

  function contextsScene() {
    const menuFrame = `<div class="frame-doc">
      <h2 id="frame-title" data-key="frame-title" data-label="Frame menu heading">Frame Menu</h2>
      <ul class="frame-list">
        <li class="frame-item" data-key="frame-item-1" data-label="Frame pancakes">Frame Pancakes</li>
        <li class="frame-item" data-key="frame-item-2" data-label="Frame waffles">Frame Waffles</li>
      </ul>
    </div>`;
    const specialsFrame = `<div class="frame-doc">
      <h2 id="specials-frame-title" data-key="specials-frame-title" data-label="Specials frame heading">Specials Frame</h2>
      <p class="frame-note" data-key="frame-note" data-label="Frame note">Blue plate only</p>
    </div>`;
    return {
      url: `${ORIGIN}/contexts`,
      title: 'Frames & Windows',
      html: `<div class="scene scene-contexts">
        <div class="scene-heading">
          <h1 class="scene-title" data-key="contexts-main" data-label="Contexts heading">Contexts Lab</h1>
          <p class="scene-note">Switch into a frame, open a new window, or read an alert.</p>
        </div>
        <div class="frame-stack">
          <iframe id="menu-frame" name="menu" title="Menu frame" data-key="menu-frame" data-label="Menu iframe" data-frame-html="${encodedHtml(menuFrame)}"></iframe>
          <iframe id="specials-frame" name="specials" title="Specials frame" data-key="specials-frame" data-label="Specials iframe" data-frame-html="${encodedHtml(specialsFrame)}"></iframe>
        </div>
        <div class="actions">
          <button type="button" id="open-specials" data-key="open-specials" data-label="Open specials window" data-click="window" data-href="${ORIGIN}/specials" data-window-title="Daily Specials" class="btn">Open specials window</button>
          <button type="button" id="show-alert" data-key="show-alert" data-label="Show alert button" data-click="alert" data-alert-text="Kitchen is closed" class="btn">Show alert</button>
        </div>
      </div>`
    };
  }

  function pagedScene(page, previous, next, dishes) {
    return {
      url: `${ORIGIN}/menu/page/${page}`,
      title: `Menu Page ${page}`,
      html: `<div class="scene scene-paged">
        <div class="scene-heading">
          <h1 id="page-title" class="scene-title" data-key="page-title" data-label="Menu page ${page} heading">Menu Page ${page}</h1>
          <p class="scene-note">Page ${page} of the paginated menu.</p>
        </div>
        <ul class="paged-list" data-key="page-${page}-list" data-label="Page ${page} dishes">
          ${dishes.map((dish, index) => `<li class="dish" data-key="p${page}-d${index + 1}" data-label="${esc(dish)}">${esc(dish)}</li>`).join('\n')}
        </ul>
        <div class="pager">
          ${previous ? `<a class="prev" href="${ORIGIN}/menu/page/${previous}" data-key="page-${page}-prev" data-label="Previous page" data-click="nav" data-href="${ORIGIN}/menu/page/${previous}">Previous</a>` : ''}
          ${next ? `<a class="next" href="${ORIGIN}/menu/page/${next}" data-key="page-${page}-next" data-label="Next page" data-click="nav" data-href="${ORIGIN}/menu/page/${next}">Next</a>` : ''}
        </div>
      </div>`
    };
  }

  function shadowScene() {
    return {
      url: `${ORIGIN}/shadow`,
      title: 'Shadow Menu',
      html: `<div class="scene scene-shadow">
        <div class="scene-heading">
          <h1 class="scene-title" data-key="shadow-page-title" data-label="Shadow menu page heading">Shadow Menu</h1>
          <p class="scene-note">The real dishes live inside an open shadow root.</p>
        </div>
        <div id="shadow-menu" data-shadow-host data-key="shadow-host" data-label="Shadow menu host">
          <template>
            <div class="shadow-inner">
              <h2 data-key="shadow-title" data-label="Shadow root heading">Shadow Root Menu</h2>
              <div class="dish" data-key="shadow-dish-1" data-label="Shadow pancakes"><span class="dish-name" data-key="shadow-dish-1-name" data-label="Shadow pancakes name">Shadow Pancakes</span></div>
              <div class="dish" data-key="shadow-dish-2" data-label="Shadow waffles"><span class="dish-name" data-key="shadow-dish-2-name" data-label="Shadow waffles name">Shadow Waffles</span></div>
            </div>
          </template>
          <div class="light-dish" data-key="light-decoy" data-label="Light DOM decoy">Light Pancakes</div>
        </div>
        <div id="shadow-drinks" data-shadow-host data-key="shadow-drinks-host" data-label="Shadow drinks host">
          <template>
            <div class="shadow-inner">
              <h2 data-key="shadow-drinks-title" data-label="Shadow drinks heading">Shadow Drink Menu</h2>
              <div class="dish" data-key="shadow-drink-1" data-label="Shadow coffee"><span class="dish-name" data-key="shadow-drink-1-name" data-label="Shadow coffee name">Shadow Coffee</span></div>
              <div class="dish" data-key="shadow-drink-2" data-label="Shadow tea"><span class="dish-name" data-key="shadow-drink-2-name" data-label="Shadow tea name">Shadow Tea</span></div>
              <div class="dish" data-key="shadow-drink-3" data-label="Shadow shake"><span class="dish-name" data-key="shadow-drink-3-name" data-label="Shadow shake name">Shadow Shake</span></div>
            </div>
          </template>
        </div>
      </div>`
    };
  }

  function filesScene() {
    return {
      url: `${ORIGIN}/files`,
      title: 'Files & Evidence',
      html: `<div class="scene scene-files">
        <div class="scene-heading">
          <h1 class="scene-title" data-key="files-title" data-label="Files heading">Files & Evidence</h1>
          <p class="scene-note">Upload a menu file, download a printable menu, and capture screenshots.</p>
        </div>
        <div class="field">
          <label for="menu-file">Menu file</label>
          <input id="menu-file" data-key="menu-file" data-label="Menu file input" type="file" name="menu_file">
        </div>
        <div class="actions">
          <button type="button" id="download-menu" data-key="download-menu" data-label="Download menu button" data-click="download" data-file="menu.pdf" class="btn primary">Download menu</button>
        </div>
      </div>`
    };
  }

  function messyScene() {
    return {
      url: `${ORIGIN}/messy`,
      title: 'Messy Records',
      html: `<div class="scene scene-messy">
        <div class="scene-heading">
          <h1 class="scene-title" data-key="messy-title" data-label="Messy records heading">Messy Records</h1>
          <p class="scene-note">Raw values need stripping and normalization.</p>
        </div>
        <div class="messy-grid">
          <p>Name: <strong id="messy-name" data-key="messy-name" data-label="Messy name" data-raw="  ada   lovelace  ">  ada   lovelace  </strong></p>
          <p>Price: <strong id="messy-price" data-key="messy-price" data-label="Messy price" data-raw="$ 1,234.50">$ 1,234.50</strong></p>
          <p>Date: <strong id="messy-date" data-key="messy-date" data-label="Messy date" data-raw="2026-11-04">2026-11-04</strong></p>
          <p>Phone: <strong id="messy-phone" data-key="messy-phone" data-label="Messy phone" data-raw="(555) 010-0100">(555) 010-0100</strong></p>
        </div>
      </div>`
    };
  }

  function complianceScene() {
    return {
      url: `${ORIGIN}/compliance`,
      title: 'Compliance Notes',
      html: `<div class="scene scene-compliance">
        <div class="scene-heading">
          <h1 class="scene-title" data-key="compliance-title" data-label="Compliance heading">Compliance Notes</h1>
          <p class="scene-note">Read the house rules before scraping.</p>
        </div>
        <div class="policy-card" data-key="policy-card" data-label="Policy card">
          <p class="terms" data-key="terms" data-label="Terms text">Personal use only. Do not resell data. Respect crawl-delay: 2 seconds.</p>
          <p class="privacy" data-key="privacy" data-label="Privacy note">Store only the fields you need and delete raw exports after seven days.</p>
        </div>
      </div>`
    };
  }

  const login = loginScene();
  const account = accountScene();
  const contexts = contextsScene();
  const page1 = pagedScene(1, null, 2, ['Pancakes', 'Waffles', 'Omelette']);
  const page2 = pagedScene(2, 1, 3, ['Cheeseburger', 'Caesar Salad', 'Grilled Cheese']);
  const page3 = pagedScene(3, 2, null, ['Steak', 'Salmon', 'Vegetable Curry']);
  const shadow = shadowScene();
  const files = filesScene();
  const messy = messyScene();
  const compliance = complianceScene();

  const apiRoutes = {
    'https://diners.example/api/menu.json': {
      status: 200,
      body: JSON.stringify([
        { name: 'Pancakes', price: 8, category: 'sweet' },
        { name: 'Coffee', price: 3, category: 'drink' },
        { name: 'Steak', price: 24, category: 'savory' }
      ])
    },
    'https://diners.example/api/missing.json': {
      status: 404,
      body: JSON.stringify({ error: 'not found' })
    },
    'https://diners.example/robots.txt': {
      status: 200,
      body: 'User-agent: *\nAllow: /menu\nDisallow: /orders\nCrawl-delay: 2\n'
    }
  };

  const breakfast = tableScene({
    slug: 'breakfast',
    title: 'Breakfast Menu',
    note: 'Hover over a plate to inspect its markup. Everything here is targetable.',
    items: [
      plate('b1', 'Pancakes', { id: 'pancakes', title: 'Fluffy buttermilk pancakes', classes: ['hot', 'sweet', 'breakfast', 'vegetarian'], price: 8, data: { category: 'sweet', chef: 'alice', calories: 520 }, tags: ['hot', 'sweet'] }),
      plate('b2', 'Waffles', { id: 'waffles', title: 'Crispy waffles', classes: ['hot', 'sweet', 'breakfast', 'vegetarian'], price: 9, data: { category: 'sweet', chef: 'bob', calories: 610 }, tags: ['hot', 'sweet'] }),
      plate('b3', 'Bacon & Eggs', { id: 'bacon-eggs', title: 'Crispy bacon and eggs', classes: ['hot', 'savory', 'breakfast'], price: 10, data: { category: 'savory', chef: 'alice', calories: 450 }, tags: ['hot', 'savory'] }),
      plate('b4', 'Oatmeal', { id: 'oatmeal', title: 'Steel-cut oatmeal', classes: ['warm', 'healthy', 'breakfast', 'vegetarian'], price: 6, data: { category: 'healthy', chef: 'carol', calories: 300 }, tags: ['warm', 'healthy'] }),
      plate('b5', 'Fruit Bowl', { id: 'fruit-bowl', title: 'Seasonal fruit', classes: ['cold', 'healthy', 'breakfast', 'vegetarian', 'vegan'], price: 7, data: { category: 'healthy', chef: 'bob', calories: 180 }, tags: ['cold', 'healthy', 'vegan'] }),
      plate('b6', 'Sausage', { id: 'sausage', title: 'Maple sausage', classes: ['hot', 'savory', 'breakfast'], price: 8, data: { category: 'savory', chef: 'alice', calories: 400 }, tags: ['hot', 'savory'] }),
      plate('b7', 'Toast', { id: 'toast', title: 'Sourdough toast', classes: ['warm', 'breakfast', 'vegetarian'], price: 4, data: { category: 'side', chef: 'carol', calories: 220 }, tags: ['warm'] }),
      plate('b8', 'Hash Browns', { id: 'hash-browns', title: 'Crispy hash browns', classes: ['hot', 'savory', 'breakfast', 'vegetarian'], price: 5, data: { category: 'side', chef: 'bob', calories: 310 }, tags: ['hot', 'savory'] }),
      plate('b9', 'Orange Juice', { id: 'orange-juice', title: 'Fresh orange juice', classes: ['cold', 'drink', 'breakfast', 'vegetarian', 'vegan'], price: 4, data: { category: 'drink', chef: 'carol', calories: 110 }, tags: ['cold', 'drink', 'vegan'] }),
      plate('b10', 'Coffee', { id: 'coffee', title: 'Bottomless coffee', classes: ['hot', 'drink', 'breakfast', 'vegetarian', 'vegan'], price: 3, data: { category: 'drink', chef: 'alice', calories: 5 }, tags: ['hot', 'drink', 'vegan'] })
    ]
  });

  const lunch = tableScene({
    slug: 'lunch',
    title: 'Lunch Menu',
    note: 'A second table for extra selector practice.',
    items: [
      plate('l1', 'Cheeseburger', { id: 'cheeseburger', title: 'Classic cheeseburger', classes: ['hot', 'savory', 'lunch'], price: 12, data: { category: 'savory', chef: 'alice', calories: 720 }, tags: ['hot', 'savory'] }),
      plate('l2', 'Veggie Burger', { id: 'veggie-burger', title: 'Garden veggie burger', classes: ['hot', 'savory', 'lunch', 'vegetarian'], price: 11, data: { category: 'savory', chef: 'bob', calories: 650 }, tags: ['hot', 'vegetarian'] }),
      plate('l3', 'Caesar Salad', { id: 'caesar-salad', title: 'Crisp romaine salad', classes: ['cold', 'healthy', 'lunch'], price: 9, data: { category: 'healthy', chef: 'carol', calories: 350 }, tags: ['cold', 'healthy'] }),
      plate('l4', 'Tomato Soup', { id: 'tomato-soup', title: 'Roasted tomato soup', classes: ['warm', 'healthy', 'lunch', 'vegetarian'], price: 7, data: { category: 'healthy', chef: 'alice', calories: 250 }, tags: ['warm', 'healthy'] }),
      plate('l5', 'Grilled Cheese', { id: 'grilled-cheese', title: 'Toasted sourdough and cheddar', classes: ['hot', 'lunch', 'vegetarian'], price: 8, data: { category: 'comfort', chef: 'bob', calories: 480 }, tags: ['hot'] }),
      plate('l6', 'Club Sandwich', { id: 'club-sandwich', title: 'Triple-decker club', classes: ['cold', 'lunch'], price: 10, data: { category: 'sandwich', chef: 'carol', calories: 600 }, tags: ['cold'] }),
      plate('l7', 'Fries', { id: 'fries', title: 'Golden fries', classes: ['hot', 'side', 'lunch', 'vegetarian', 'vegan'], price: 4, data: { category: 'side', chef: 'alice', calories: 380 }, tags: ['hot', 'side', 'vegan'] }),
      plate('l8', 'Onion Rings', { id: 'onion-rings', title: 'Beer-battered onion rings', classes: ['hot', 'side', 'lunch', 'vegetarian'], price: 5, data: { category: 'side', chef: 'bob', calories: 420 }, tags: ['hot', 'side'] }),
      plate('l9', 'Lemonade', { id: 'lemonade', title: 'Fresh-squeezed lemonade', classes: ['cold', 'drink', 'lunch', 'vegetarian', 'vegan'], price: 3, data: { category: 'drink', chef: 'carol', calories: 120 }, tags: ['cold', 'drink', 'vegan'] }),
      plate('l10', 'Iced Tea', { id: 'iced-tea', title: 'Sweet iced tea', classes: ['cold', 'drink', 'lunch', 'vegetarian', 'vegan'], price: 3, data: { category: 'drink', chef: 'alice', calories: 90 }, tags: ['cold', 'drink', 'vegan'] })
    ]
  });

  const dinner = tableScene({
    slug: 'dinner',
    title: 'Dinner Menu',
    note: 'The dinner table has plenty of attributes to combine.',
    items: [
      plate('d1', 'Steak', { id: 'steak', title: 'Ribeye steak', classes: ['hot', 'savory', 'dinner'], price: 24, data: { category: 'savory', chef: 'alice', calories: 850 }, tags: ['hot', 'savory'] }),
      plate('d2', 'Salmon', { id: 'salmon', title: 'Herb-crusted salmon', classes: ['hot', 'healthy', 'dinner'], price: 20, data: { category: 'healthy', chef: 'bob', calories: 600 }, tags: ['hot', 'healthy'] }),
      plate('d3', 'Pasta', { id: 'pasta', title: 'Wild mushroom pasta', classes: ['hot', 'dinner', 'vegetarian'], price: 15, data: { category: 'comfort', chef: 'carol', calories: 700 }, tags: ['hot'] }),
      plate('d4', 'Roast Chicken', { id: 'roast-chicken', title: 'Herb roast chicken', classes: ['hot', 'savory', 'dinner'], price: 18, data: { category: 'savory', chef: 'alice', calories: 780 }, tags: ['hot', 'savory'] }),
      plate('d5', 'Vegetable Curry', { id: 'vegetable-curry', title: 'Spicy vegetable curry', classes: ['hot', 'spicy', 'dinner', 'vegetarian', 'vegan'], price: 14, data: { category: 'spicy', chef: 'bob', calories: 550 }, tags: ['hot', 'spicy', 'vegan'] }),
      plate('d6', 'Caesar Salad', { id: 'dinner-salad', title: 'Crisp romaine salad', classes: ['cold', 'healthy', 'dinner'], price: 9, data: { category: 'healthy', chef: 'carol', calories: 350 }, tags: ['cold', 'healthy'] }),
      plate('d7', 'Garlic Bread', { id: 'garlic-bread', title: 'Garlic butter bread', classes: ['hot', 'side', 'dinner', 'vegetarian'], price: 5, data: { category: 'side', chef: 'alice', calories: 300 }, tags: ['hot', 'side'] }),
      plate('d8', 'Mashed Potatoes', { id: 'mashed-potatoes', title: 'Buttery mashed potatoes', classes: ['warm', 'side', 'dinner', 'vegetarian'], price: 5, data: { category: 'side', chef: 'bob', calories: 280 }, tags: ['warm', 'side'] }),
      plate('d9', 'Red Wine', { id: 'red-wine', title: 'House red wine', classes: ['cold', 'drink', 'dinner', 'vegetarian', 'vegan'], price: 9, data: { category: 'drink', chef: 'carol', calories: 150 }, tags: ['cold', 'drink', 'vegan'] }),
      plate('d10', 'Sparkling Water', { id: 'sparkling-water', title: 'Sparkling mineral water', classes: ['cold', 'drink', 'dinner', 'vegetarian', 'vegan'], price: 3, data: { category: 'drink', chef: 'alice', calories: 0 }, tags: ['cold', 'drink', 'vegan'] })
    ]
  });

  const dessert = tableScene({
    slug: 'dessert',
    title: 'Dessert Menu',
    note: 'Sweet things for nth-child and attribute practice.',
    items: [
      plate('s1', 'Chocolate Cake', { id: 'chocolate-cake', title: 'Triple chocolate cake', classes: ['cold', 'sweet', 'dessert', 'vegetarian'], price: 7, data: { category: 'sweet', chef: 'carol', calories: 650 }, tags: ['cold', 'sweet'] }),
      plate('s2', 'Apple Pie', { id: 'apple-pie', title: 'Warm apple pie', classes: ['warm', 'sweet', 'dessert', 'vegetarian'], price: 6, data: { category: 'sweet', chef: 'alice', calories: 500 }, tags: ['warm', 'sweet'] }),
      plate('s3', 'Cheesecake', { id: 'cheesecake', title: 'New York cheesecake', classes: ['cold', 'sweet', 'dessert', 'vegetarian'], price: 8, data: { category: 'sweet', chef: 'bob', calories: 720 }, tags: ['cold', 'sweet'] }),
      plate('s4', 'Ice Cream', { id: 'ice-cream', title: 'Vanilla bean ice cream', classes: ['cold', 'sweet', 'dessert', 'vegetarian'], price: 5, data: { category: 'sweet', chef: 'carol', calories: 300 }, tags: ['cold', 'sweet'] }),
      plate('s5', 'Brownie', { id: 'brownie', title: 'Fudge brownie', classes: ['warm', 'sweet', 'dessert', 'vegetarian'], price: 6, data: { category: 'sweet', chef: 'alice', calories: 550 }, tags: ['warm', 'sweet'] }),
      plate('s6', 'Fruit Tart', { id: 'fruit-tart', title: 'Seasonal fruit tart', classes: ['cold', 'sweet', 'dessert', 'vegetarian'], price: 7, data: { category: 'sweet', chef: 'bob', calories: 420 }, tags: ['cold', 'sweet'] }),
      plate('s7', 'Pudding', { id: 'pudding', title: 'Vanilla pudding', classes: ['cold', 'sweet', 'dessert', 'vegetarian'], price: 4, data: { category: 'sweet', chef: 'carol', calories: 260 }, tags: ['cold', 'sweet'] }),
      plate('s8', 'Milkshake', { id: 'milkshake', title: 'Chocolate milkshake', classes: ['cold', 'sweet', 'drink', 'dessert', 'vegetarian'], price: 6, data: { category: 'drink', chef: 'alice', calories: 580 }, tags: ['cold', 'sweet', 'drink'] })
    ]
  });

  const specials = tableScene({
    slug: 'specials',
    title: 'Daily Specials',
    note: 'Today only. The chef is experimenting again.',
    items: [
      plate('x1', 'Blue Plate Special', { id: 'blue-plate', title: 'Meatloaf and gravy', classes: ['hot', 'savory', 'special'], price: 13, data: { category: 'savory', chef: 'alice', calories: 800 }, tags: ['hot', 'special'] }),
      plate('x2', 'Green Goddess Bowl', { id: 'green-goddess', title: 'Green goddess grain bowl', classes: ['cold', 'healthy', 'special', 'vegetarian', 'vegan'], price: 12, data: { category: 'healthy', chef: 'bob', calories: 430 }, tags: ['cold', 'healthy', 'vegan'] }),
      plate('x3', 'Red Hot Chili', { id: 'red-hot-chili', title: 'Five-alarm chili', classes: ['hot', 'spicy', 'special'], price: 10, data: { category: 'spicy', chef: 'carol', calories: 520 }, tags: ['hot', 'spicy'] }),
      plate('x4', 'Golden Pancakes', { id: 'golden-pancakes', title: 'Buttermilk pancakes with syrup', classes: ['hot', 'sweet', 'special', 'vegetarian'], price: 9, data: { category: 'sweet', chef: 'alice', calories: 700 }, tags: ['hot', 'sweet'] }),
      plate('x5', 'Purple Slaw', { id: 'purple-slaw', title: 'Purple cabbage slaw', classes: ['cold', 'healthy', 'special', 'vegetarian', 'vegan'], price: 6, data: { category: 'side', chef: 'bob', calories: 180 }, tags: ['cold', 'healthy', 'vegan'] }),
      plate('x6', 'Midnight Shake', { id: 'midnight-shake', title: 'Midnight chocolate shake', classes: ['cold', 'sweet', 'drink', 'special', 'vegetarian'], price: 7, data: { category: 'drink', chef: 'carol', calories: 610 }, tags: ['cold', 'sweet', 'drink'] })
    ]
  });

  const links = linkScene({
    slug: 'links',
    title: 'Diner Links',
    note: 'Use link_text for the whole label, partial_link_text for a fragment.',
    links: [
      { key: 'l1', text: 'Pancakes', href: `${ORIGIN}/menu/pancakes`, className: 'breakfast' },
      { key: 'l2', text: 'Pancake Special', href: `${ORIGIN}/specials/pancakes`, className: 'special' },
      { key: 'l3', text: 'View Lunch Menu', href: `${ORIGIN}/menu/lunch`, className: 'lunch' },
      { key: 'l4', text: 'View Dinner Menu', href: `${ORIGIN}/menu/dinner`, className: 'dinner' },
      { key: 'l5', text: 'Contact Us', href: `${ORIGIN}/contact`, className: 'contact' },
      { key: 'l6', text: 'About the Diner', href: `${ORIGIN}/about`, className: 'about' },
      { key: 'l7', text: 'Order Online', href: `${ORIGIN}/order`, className: 'order' },
      { key: 'l8', text: 'Download Menu (PDF)', href: `${ORIGIN}/menu.pdf`, className: 'pdf' },
      { key: 'l9', text: 'View Menu', href: `${ORIGIN}/menu`, className: 'menu' },
      { key: 'l10', text: 'View Menu', href: `${ORIGIN}/menu/all`, className: 'menu alt' }
    ]
  });

  const menu = menuScene({
    slug: 'menu',
    title: 'All-Day Menu',
    note: 'Sections contain dish lists. Great for descendant and sibling XPath.',
    sections: [
      {
        name: 'breakfast',
        title: 'Breakfast',
        dishes: [
          { key: 'm1', name: 'Pancakes', category: 'sweet', price: 8 },
          { key: 'm2', name: 'Waffles', category: 'sweet', price: 9 },
          { key: 'm3', name: 'Omelette', category: 'savory', price: 10 }
        ]
      },
      {
        name: 'lunch',
        title: 'Lunch',
        dishes: [
          { key: 'm4', name: 'Cheeseburger', category: 'savory', price: 12 },
          { key: 'm5', name: 'Caesar Salad', category: 'healthy', price: 9 },
          { key: 'm6', name: 'Grilled Cheese', category: 'comfort', price: 8 }
        ]
      },
      {
        name: 'dinner',
        title: 'Dinner',
        dishes: [
          { key: 'm7', name: 'Steak', category: 'savory', price: 24 },
          { key: 'm8', name: 'Salmon', category: 'healthy', price: 20 },
          { key: 'm9', name: 'Vegetable Curry', category: 'spicy', price: 14 }
        ]
      }
    ]
  });

  const orders = orderScene({
    slug: 'orders',
    title: 'Open Orders',
    note: 'Orders have items, customers, and statuses.',
    orders: [
      { key: 'o1', number: 1, status: 'open', customer: 'Ada', items: [{ key: 'i1', name: 'Pancakes' }, { key: 'i2', name: 'Coffee' }] },
      { key: 'o2', number: 2, status: 'open', customer: 'Grace', items: [{ key: 'i3', name: 'Waffles' }, { key: 'i4', name: 'Fruit Bowl' }, { key: 'i5', name: 'Tea' }] },
      { key: 'o3', number: 3, status: 'closed', customer: 'Alan', items: [{ key: 'i6', name: 'Steak' }] }
    ]
  });

  const form = formScene();
  const action = actionScene();
  const delayed = delayedScene();

  const home = {
    url: `${ORIGIN}/`,
    title: 'Selenium Ruby Diner',
    html: `<div class="scene scene-home">
      <div class="scene-heading">
        <h1 class="scene-title" data-key="scene-title" data-label="Selenium Ruby Diner heading">Selenium Ruby Diner</h1>
        <p class="scene-note">Since 1952. Serving selectors hot and fresh.</p>
      </div>
      <div class="home-card">
        <p data-key="home-copy" data-label="Home copy">Welcome, scraper. The menu is nested, the forms are labelled, and the kitchen is slow.</p>
        <ul class="link-list">
          <li><a class="menu-link" href="${ORIGIN}/menu" data-key="home-menu" data-label="Menu link" data-click="nav" data-href="${ORIGIN}/menu">View the menu</a></li>
          <li><a class="menu-link" href="${ORIGIN}/specials" data-key="home-specials" data-label="Specials link" data-click="nav" data-href="${ORIGIN}/specials">Today's specials</a></li>
          <li><a class="menu-link" href="${ORIGIN}/about" data-key="home-about" data-label="About link" data-click="nav" data-href="${ORIGIN}/about">About the diner</a></li>
          <li><a class="menu-link" href="${ORIGIN}/order" data-key="home-order" data-label="Order link" data-click="nav" data-href="${ORIGIN}/order">Order online</a></li>
        </ul>
      </div>
    </div>`
  };

  const about = {
    url: `${ORIGIN}/about`,
    title: 'About the Diner',
    html: `<div class="scene scene-about">
      <div class="scene-heading">
        <h1 class="scene-title" data-key="scene-title" data-label="About the Diner heading">About the Diner</h1>
        <p class="scene-note">A little history with your hash browns.</p>
      </div>
      <div class="home-card">
        <p data-key="about-copy" data-label="About copy">Since 1952, the Selenium Ruby Diner has served pancakes, selectors, and questionable coffee.</p>
        <p>Our founder believed every element deserves a reliable locator.</p>
        <a class="menu-link" href="${ORIGIN}/menu" data-key="about-menu" data-label="Menu link" data-click="nav" data-href="${ORIGIN}/menu">Back to the menu</a>
      </div>
    </div>`
  };

  const all = {
    breakfast,
    lunch,
    dinner,
    dessert,
    specials,
    links,
    menu,
    orders,
    form,
    action,
    delayed,
    login,
    account,
    contexts,
    page1,
    page2,
    page3,
    shadow,
    files,
    messy,
    compliance,
    apiRoutes,
    home,
    about
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = all;
  global.Scenes = all;
})(typeof window !== 'undefined' ? window : globalThis);
