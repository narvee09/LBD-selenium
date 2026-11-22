/*
 * Java versions of Part 1 content for Selenium Java Diner.
 */
(function (global) {
  'use strict';

  const CONTENT = {
  "1": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the Waffles plate using its id.",
    "hint": "The id is \"waffles\". Pass it with By.id.",
    "reference": "driver.findElement(By.id(\"waffles\"))",
    "solution": "return driver.findElement(By.id(\"waffles\"));"
  },
  "2": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the Coffee plate using findElement and By.id.",
    "hint": "The Coffee plate has the id \"coffee\".",
    "reference": "",
    "solution": "return driver.findElement(By.id(\"coffee\"));"
  },
  "3": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the Name input using By.name.",
    "hint": "The name attribute is customer_name, not the element id.",
    "reference": "driver.findElement(By.name(\"customer_name\"))",
    "solution": "return driver.findElement(By.name(\"customer_name\"));"
  },
  "4": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the Vegan checkbox by its name attribute.",
    "hint": "Checkbox inputs can have a name too.",
    "reference": "",
    "solution": "return driver.findElement(By.name(\"vegan\"));"
  },
  "5": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the first hot plate using By.className. (Selenium returns the first match.)",
    "hint": "Pancakes is the first plate with the hot class.",
    "reference": "driver.findElement(By.className(\"hot\"))",
    "solution": "return driver.findElement(By.className(\"hot\"));"
  },
  "6": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the first vegan plate using By.className.",
    "hint": "Selenium Java accepts both By.className and By.cssSelector.",
    "reference": "",
    "solution": "return driver.findElement(By.className(\"vegan\"));"
  },
  "7": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the scene heading using its tag name.",
    "hint": "There is only one h1 in the scene.",
    "reference": "driver.findElement(By.tagName(\"h1\"))",
    "solution": "return driver.findElement(By.tagName(\"h1\"));"
  },
  "8": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the first button in the form using By.tagName.",
    "hint": "The Place order button is the first button in document order.",
    "reference": "",
    "solution": "return driver.findElement(By.tagName(\"button\"));"
  },
  "9": {
    "starter": "// Return the target element or elements\n",
    "task": "Return every input element in the form with findElements and By.tagName.",
    "hint": "Use findElements (plural) to get a List.",
    "reference": "driver.findElements(By.tagName(\"input\"))",
    "solution": "return driver.findElements(By.tagName(\"input\"));"
  },
  "10": {
    "starter": "// Return the target element or elements\n",
    "task": "Return every plate with the vegetarian class.",
    "hint": "Use findElements with By.className.",
    "reference": "",
    "solution": "return driver.findElements(By.className(\"vegetarian\"));"
  },
  "11": {
    "starter": "// Return the target element or elements\n",
    "task": "Return both drinks. Use findElements so neither is lost.",
    "hint": "findElement would only return the first drink.",
    "reference": "",
    "solution": "return driver.findElements(By.className(\"drink\"));"
  },
  "12": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the Bacon & Eggs plate with a CSS id selector.",
    "hint": "A CSS id selector starts with #.",
    "reference": "driver.findElement(By.cssSelector(\"#bacon-eggs\"))",
    "solution": "return driver.findElement(By.cssSelector(\"#bacon-eggs\"));"
  },
  "13": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the Coffee plate with an XPath that checks its id.",
    "hint": "Use //div[@id='coffee'].",
    "reference": "driver.findElement(By.xpath(\"//div[@id='coffee']\"))",
    "solution": "return driver.findElement(By.xpath(\"//div[@id='coffee']\"));"
  },
  "14": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the Contact Us link with By.linkText.",
    "hint": "linkText matches the complete visible link label.",
    "reference": "driver.findElement(By.linkText(\"Contact Us\"))",
    "solution": "return driver.findElement(By.linkText(\"Contact Us\"));"
  },
  "15": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the PDF link using By.partialLinkText. Match the word \"Download\".",
    "hint": "partial_link_text matches a substring of the link label.",
    "reference": "",
    "solution": "return driver.findElement(By.partialLinkText(\"Download\"));"
  },
  "16": {
    "starter": "// Return the target element or elements\n",
    "task": "Return both links whose complete text is \"View Menu\".",
    "hint": "Use findElements with By.linkText.",
    "reference": "",
    "solution": "return driver.findElements(By.linkText(\"View Menu\"));"
  },
  "17": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the Waffles plate with findElement(By.id(\"...\")).",
    "hint": "Java locators are built with the By class.",
    "reference": "driver.findElement(By.id(\"waffles\"))",
    "solution": "return driver.findElement(By.id(\"waffles\"));"
  },
  "18": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the first vegan plate with findElement(By.cssSelector(\"...\")).",
    "hint": "The first element with class vegan is the Fruit Bowl.",
    "reference": "",
    "solution": "return driver.findElement(By.cssSelector(\".vegan\"));"
  },
  "19": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the first savory plate with findElement(By.xpath(\"...\")).",
    "hint": "The first savory plate is Bacon & Eggs.",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@data-category='savory']\"));"
  },
  "20": {
    "starter": "// Return the target element or elements\n",
    "task": "Return every anchor element on the links page using findElements with By.tagName(\"a\").",
    "hint": "The plural method returns a List of anchors.",
    "reference": "",
    "solution": "return driver.findElements(By.tagName(\"a\"));"
  },
  "21": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every hot plate.",
    "hint": "A class selector starts with a dot.",
    "reference": "driver.findElements(By.cssSelector(\".hot\"))",
    "solution": "return driver.findElements(By.cssSelector(\".hot\"));"
  },
  "22": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every plate with the vegan class.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".vegan\"));"
  },
  "23": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the Pancakes plate by CSS id.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.cssSelector(\"#pancakes\"));"
  },
  "24": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the Waffles plate by CSS id.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.cssSelector(\"#waffles\"));"
  },
  "25": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every div with the plate class.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\"div.plate\"));"
  },
  "26": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every plate.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".plate\"));"
  },
  "27": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates that are both hot and sweet.",
    "hint": "Chain class selectors with no space.",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".hot.sweet\"));"
  },
  "28": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates that have both the breakfast and vegetarian classes.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".breakfast.vegetarian\"));"
  },
  "29": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every plate inside the .table container using a descendant selector.",
    "hint": "",
    "reference": ".table .plate  # space means descendant",
    "solution": "return driver.findElements(By.cssSelector(\".table .plate\"));"
  },
  "30": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the direct plate children of .table.",
    "hint": "",
    "reference": ".table > .plate  # > means direct child",
    "solution": "return driver.findElements(By.cssSelector(\".table > .plate\"));"
  },
  "31": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every price span that is a direct child of a plate.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".plate > .price\"));"
  },
  "32": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every plate immediately after a hot plate.",
    "hint": "The + combinator selects the next sibling only.",
    "reference": ".hot + .plate",
    "solution": "return driver.findElements(By.cssSelector(\".hot + .plate\"));"
  },
  "33": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every plate that follows a hot plate (not only the next one).",
    "hint": "",
    "reference": ".hot ~ .plate",
    "solution": "return driver.findElements(By.cssSelector(\".hot ~ .plate\"));"
  },
  "34": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every vegan plate or sweet plate using a selector group.",
    "hint": "",
    "reference": ".vegan, .sweet  # comma means OR",
    "solution": "return driver.findElements(By.cssSelector(\".vegan, .sweet\"));"
  },
  "35": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every descendant of the Pancakes plate.",
    "hint": "* matches any element.",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\"#pancakes *\"));"
  },
  "36": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates whose data-category is exactly \"sweet\".",
    "hint": "",
    "reference": "[data-category=\"sweet\"]",
    "solution": "return driver.findElements(By.cssSelector(\"[data-category='sweet']\"));"
  },
  "37": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates whose data-category is \"drink\".",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\"[data-category='drink']\"));"
  },
  "38": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates whose data-category starts with the letter s.",
    "hint": "",
    "reference": "[attr^=\"value\"]  # starts with",
    "solution": "return driver.findElements(By.cssSelector(\"[data-category^='s']\"));"
  },
  "39": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates whose data-category ends with y.",
    "hint": "",
    "reference": "[attr$=\"value\"]  # ends with",
    "solution": "return driver.findElements(By.cssSelector(\"[data-category$='y']\"));"
  },
  "40": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates whose data-category contains the letter e.",
    "hint": "",
    "reference": "[attr*=\"value\"]  # contains",
    "solution": "return driver.findElements(By.cssSelector(\"[data-category*='e']\"));"
  },
  "41": {
    "starter": "// Return the target element or elements\n",
    "task": "Select vegan plates using the attribute word selector on class.",
    "hint": "",
    "reference": "[class~=\"vegan\"]",
    "solution": "return driver.findElements(By.cssSelector(\"[class~='vegan']\"));"
  },
  "42": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates whose data-chef is alice using the |= attribute selector.",
    "hint": "|= matches the exact value or the value followed by a hyphen.",
    "reference": "[data-chef|=\"alice\"]",
    "solution": "return driver.findElements(By.cssSelector(\"[data-chef|='alice']\"));"
  },
  "43": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the first plate child of the table.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.cssSelector(\".plate:first-child\"));"
  },
  "44": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the last plate child of the table.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.cssSelector(\".plate:last-child\"));"
  },
  "45": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the third plate with :nth-child.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.cssSelector(\".plate:nth-child(3)\"));"
  },
  "46": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every even-numbered plate.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".plate:nth-child(even)\"));"
  },
  "47": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates at positions 1, 4, 7, and 10 using 3n+1.",
    "hint": "",
    "reference": ".plate:nth-child(3n+1)",
    "solution": "return driver.findElements(By.cssSelector(\".plate:nth-child(3n+1)\"));"
  },
  "48": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every plate that does not have the hot class.",
    "hint": "",
    "reference": ":not(.hot)",
    "solution": "return driver.findElements(By.cssSelector(\".plate:not(.hot)\"));"
  },
  "49": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates that are hot but not sweet.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".hot:not(.sweet)\"));"
  },
  "50": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the second div child of the table with :nth-of-type.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.cssSelector(\".table > div:nth-of-type(2)\"));"
  },
  "51": {
    "starter": "// Return the target element or elements\n",
    "task": "Select vegan drink plates.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".vegan[data-category='drink']\"));"
  },
  "52": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates whose data-price is exactly 8.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".plate[data-price='8']\"));"
  },
  "53": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates whose title contains \"Crispy\".",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\"[title*='Crispy']\"));"
  },
  "54": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the checked checkbox input.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\"input:checked\"));"
  },
  "55": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the disabled button.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.cssSelector(\"button:disabled\"));"
  },
  "56": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the currently selected option in the size dropdown.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.cssSelector(\"option:checked\"));"
  },
  "57": {
    "starter": "// Return the target element or elements\n",
    "task": "Select odd-numbered plates that are not sweet.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".table > .plate:nth-child(2n+1):not(.sweet)\"));"
  },
  "58": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates that are neither drinks nor sweet.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".plate:not([data-category='drink']):not(.sweet)\"));"
  },
  "59": {
    "starter": "// Return the target element or elements\n",
    "task": "Select alice's savory plates.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\"[data-chef='alice'][data-category='savory']\"));"
  },
  "60": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every plate with a data-price attribute whose price is not 10.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\"[data-price]:not([data-price='10'])\"));"
  },
  "61": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the first three plates using -n+3.",
    "hint": "",
    "reference": ":nth-child(-n+3)",
    "solution": "return driver.findElements(By.cssSelector(\".plate:nth-child(-n+3)\"));"
  },
  "62": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the second plate from the end.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.cssSelector(\".plate:nth-last-child(2)\"));"
  },
  "63": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates in odd positions counted from the end.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".plate:nth-last-child(odd)\"));"
  },
  "64": {
    "starter": "// Return the target element or elements\n",
    "task": "Select hot plates using two [class~=...] selectors.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\"div[class~='plate'][class~='hot']\"));"
  },
  "65": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates whose data-chef starts with a.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\"[data-chef^='a']\"));"
  },
  "66": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates whose data-chef ends with e.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\"[data-chef$='e']\"));"
  },
  "67": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates whose data-chef contains \"lic\".",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\"[data-chef*='lic']\"));"
  },
  "68": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates that are neither hot nor vegan.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".plate:not(.hot):not(.vegan)\"));"
  },
  "69": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates at positions 2, 6, and 10 using 4n+2.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".table > .plate:nth-child(4n+2)\"));"
  },
  "70": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the price spans inside Pancakes and Waffles.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\"#pancakes > .price, #waffles > .price\"));"
  },
  "71": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the Pancakes plate with an id predicate.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@id='pancakes']\"));"
  },
  "72": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every drink by its data-category attribute.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[@data-category='drink']\"));"
  },
  "73": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every hot plate with contains(@class, ...).",
    "hint": "",
    "reference": "//div[contains(@class, \"hot\")]",
    "solution": "return driver.findElements(By.xpath(\"//div[contains(@class, 'hot')]\"));"
  },
  "74": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the span whose text is exactly Pancakes.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//span[text()='Pancakes']\"));"
  },
  "75": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the plates whose price text is $8, by walking from the span to its parent.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//span[text()='$8']/..\"));"
  },
  "76": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates whose data-price attribute is 8.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[@data-price='8']\"));"
  },
  "77": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates whose data-price is greater than 9.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[@data-price>9]\"));"
  },
  "78": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates whose data-price is less than 5.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[@data-price<5]\"));"
  },
  "79": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates with at least 600 calories.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[@data-calories>=600]\"));"
  },
  "80": {
    "starter": "// Return the target element or elements\n",
    "task": "Select sweet plates cooked by alice.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[@data-category='sweet' and @data-chef='alice']\"));"
  },
  "81": {
    "starter": "// Return the target element or elements\n",
    "task": "Select sweet or healthy plates.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[@data-category='sweet' or @data-category='healthy']\"));"
  },
  "82": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every plate that is not a drink.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[contains(@class,'plate') and not(@data-category='drink')]\"));"
  },
  "83": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates cooked by a chef whose name starts with \"ali\".",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[starts-with(@data-chef,'ali')]\"));"
  },
  "84": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates whose title contains \"Crispy\".",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[contains(@title,'Crispy')]\"));"
  },
  "85": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every vegetarian plate using contains(@class, ...).",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[contains(@class,'vegetarian')]\"));"
  },
  "86": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the last plate in the table.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@class='table']/div[last()]\"));"
  },
  "87": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the first plate in the table.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@class='table']/div.get(1)\"));"
  },
  "88": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the first three plates.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[@class='table']/div[position()<=3]\"));"
  },
  "89": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates in odd positions with position() mod 2 = 1.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[@class='table']/div[position() mod 2 = 1]\"));"
  },
  "90": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the third plate by numeric predicate.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@class='table']/div.get(3)\"));"
  },
  "91": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the plate whose price span says $9 using a parent step.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//span[@class='price' and text()='$9']/parent::div\"));"
  },
  "92": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the first savory plate.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@data-category='savory'].get(1)\"));"
  },
  "93": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the last savory plate.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@data-category='savory'][last()]\"));"
  },
  "94": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the food span inside Bacon & Eggs.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//*[@id='bacon-eggs']//span[@class='food']\"));"
  },
  "95": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every plate priced at 4.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[contains(@class,'plate')][@data-price='4']\"));"
  },
  "96": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates cooked by bob using normalize-space().",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[contains(@class,'plate')][normalize-space(@data-chef)='bob']\"));"
  },
  "97": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates priced from 8 through 10 inclusive.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[contains(@class,'plate')][@data-price >= 8 and @data-price <= 10]\"));"
  },
  "98": {
    "starter": "// Return the target element or elements\n",
    "task": "Select every plate whose price is not 5.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[contains(@class,'plate')][@data-price != '5']\"));"
  },
  "99": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates whose class contains sweet or savory.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[contains(@class,'sweet') or contains(@class,'savory')]\"));"
  },
  "100": {
    "starter": "// Return the target element or elements\n",
    "task": "Select alice's savory plates with two attribute predicates.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[contains(@class,'plate')][@data-chef='alice' and @data-category='savory']\"));"
  },
  "101": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the plate immediately after Pancakes.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@id='pancakes']/following-sibling::div.get(1)\"));"
  },
  "102": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the plate immediately before Waffles.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@id='waffles']/preceding-sibling::div.get(1)\"));"
  },
  "103": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the plate immediately after Waffles.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@id='waffles']/following-sibling::div.get(1)\"));"
  },
  "104": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the plate two positions before Fruit Bowl.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@id='fruit-bowl']/preceding-sibling::div.get(2)\"));"
  },
  "105": {
    "starter": "// Return the target element or elements\n",
    "task": "Walk from the Pancakes text span up to its ancestor plate.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//span[text()='Pancakes']/ancestor::div[contains(@class,'plate')]\"));"
  },
  "106": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the ancestor plates of all $8 price spans.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//span[text()='$8']/ancestor::div[contains(@class,'plate')]\"));"
  },
  "107": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the table element that contains Coffee.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@id='coffee']/ancestor::div[@data-key='table']\"));"
  },
  "108": {
    "starter": "// Return the target element or elements\n",
    "task": "Select Coffee using ancestor-or-self.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@id='coffee']/ancestor-or-self::div[contains(@class,'plate')]\"));"
  },
  "109": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the first plate that follows Pancakes anywhere after it.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@id='pancakes']/following::div[contains(@class,'plate')].get(1)\"));"
  },
  "110": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the nearest plate before Coffee.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@id='coffee']/preceding::div.get(1)[contains(@class,'plate')]\"));"
  },
  "111": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the third child div of the table.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@class='table']/child::div.get(3)\"));"
  },
  "112": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the first price span descendant of the table.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@class='table']/descendant::span[@class='price'].get(1)\"));"
  },
  "113": {
    "starter": "// Return the target element or elements\n",
    "task": "Select Pancakes using the self axis.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@id='pancakes']/self::div\"));"
  },
  "114": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the food span inside Pancakes using descendant::.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@id='pancakes']/descendant::span[@class='food']\"));"
  },
  "115": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the first descendant element of Pancakes.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@id='pancakes']/descendant::*.get(1)\"));"
  },
  "116": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the second-to-last plate with last()-1.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@class='table']/div[last()-1]\"));"
  },
  "117": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the last plate using position() = last().",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@class='table']/div[position()=last()]\"));"
  },
  "118": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates after position 7.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[@class='table']/div[position()>7]\"));"
  },
  "119": {
    "starter": "// Return the target element or elements\n",
    "task": "Select plates before position 3.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.xpath(\"//div[@class='table']/div[position()<3]\"));"
  },
  "120": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the fifth plate by counting its preceding siblings.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@class='table']/div[count(preceding-sibling::div)=4]\"));"
  },
  "121": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the plate with no following siblings.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@class='table']/div[count(following-sibling::div)=0]\"));"
  },
  "122": {
    "starter": "// Return the target element or elements\n",
    "task": "From the second plate, select the first following sibling.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@class='table']/div.get(2)/following-sibling::div.get(1)\"));"
  },
  "123": {
    "starter": "// Return the target element or elements\n",
    "task": "From the ninth plate, select the immediately preceding sibling.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@class='table']/div.get(9)/preceding-sibling::div.get(1)\"));"
  },
  "124": {
    "starter": "// Return the target element or elements\n",
    "task": "From the first plate, select the third following plate.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@class='table']/div.get(1)/following-sibling::div[contains(@class,'plate')].get(3)\"));"
  },
  "125": {
    "starter": "// Return the target element or elements\n",
    "task": "From the tenth plate, select the third preceding plate.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@class='table']/div.get(10)/preceding-sibling::div.get(3)[contains(@class,'plate')]\"));"
  },
  "126": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the last following plate sibling of Pancakes.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@id='pancakes']/following-sibling::div[contains(@class,'plate')][last()]\"));"
  },
  "127": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the second savory plate.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@class='table']/div[@data-category='savory'].get(2)\"));"
  },
  "128": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the last savory plate in the table.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@class='table']/div[@data-category='savory'][last()]\"));"
  },
  "129": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the second hot plate.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@class='table']/div[contains(@class,'hot')].get(2)\"));"
  },
  "130": {
    "starter": "// Return the target element or elements\n",
    "task": "Select the last hot plate.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.xpath(\"//div[@class='table']/div[contains(@class,'hot')][last()]\"));"
  },
  "131": {
    "starter": "// Return the target element or elements\n",
    "task": "Return every h2 heading in the menu.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.tagName(\"h2\"));"
  },
  "132": {
    "starter": "// Return the target element or elements\n",
    "task": "Return every .dish list item in the menu.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".dish\"));"
  },
  "133": {
    "starter": "// Return the target element or elements\n",
    "task": "Return every .menu-section.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".menu-section\"));"
  },
  "134": {
    "starter": "// Return the target element or elements\n",
    "task": "Return every input in the form.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.tagName(\"input\"));"
  },
  "135": {
    "starter": "// Return the target element or elements\n",
    "task": "Return every option in the size dropdown.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.tagName(\"option\"));"
  },
  "136": {
    "starter": "// Return the target element or elements\n",
    "task": "Return the select element as a list of one element.",
    "hint": "findElements always returns a List, even when it finds one element.",
    "reference": "",
    "solution": "return driver.findElements(By.tagName(\"select\"));"
  },
  "137": {
    "starter": "// Return the target element or elements\n",
    "task": "Search inside the breakfast section and return its dishes.",
    "hint": "Call findElements on the section element, not on driver.",
    "reference": "element.findElements(By.cssSelector(\".dish\"))",
    "solution": "return driver.findElement(By.cssSelector(\"[data-key='sec-breakfast']\")).findElements(By.cssSelector(\".dish\"));"
  },
  "138": {
    "starter": "// Return the target element or elements\n",
    "task": "Return the items in the first open order.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.cssSelector(\".order[data-status='open']\")).findElements(By.cssSelector(\".item\"));"
  },
  "139": {
    "starter": "// Return the target element or elements\n",
    "task": "Return the h3 heading inside the first open order.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.cssSelector(\".order[data-status='open']\")).findElement(By.cssSelector(\"h3\"));"
  },
  "140": {
    "starter": "// Return the target element or elements\n",
    "task": "Return only the first plate from a collection of plates.",
    "hint": "",
    "reference": "",
    "solution": "return Diner.first(driver.findElements(By.cssSelector(\".plate\")));"
  },
  "141": {
    "starter": "// Return the target element or elements\n",
    "task": "Return only the last plate from a collection of plates.",
    "hint": "",
    "reference": "",
    "solution": "return Diner.last(driver.findElements(By.cssSelector(\".plate\")));"
  },
  "142": {
    "starter": "// Return the target element or elements\n",
    "task": "Return the second plate in the collection using [1].",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".plate\")).get(1);"
  },
  "143": {
    "starter": "// Return the target element or elements\n",
    "task": "Return the first plate in the collection using [0].",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".plate\")).get(0);"
  },
  "144": {
    "starter": "// Return the requested value\n",
    "task": "Return the number of plates using size().",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".plate\")).size();"
  },
  "145": {
    "starter": "// Return the requested value\n",
    "task": "Return the number of plates using size().",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".plate\")).size();"
  },
  "146": {
    "starter": "// Return the requested value\n",
    "task": "Return whether the plate collection is empty.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.cssSelector(\".plate\")).isEmpty();"
  },
  "147": {
    "starter": "// Return the target element or elements\n",
    "task": "Return both links whose full text is \"View Menu\".",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.linkText(\"View Menu\"));"
  },
  "148": {
    "starter": "// Return the target element or elements\n",
    "task": "Return every link whose text contains \"Menu\" using partial_link_text.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElements(By.partialLinkText(\"Menu\"));"
  },
  "149": {
    "starter": "// Return the target element or elements\n",
    "task": "Return every item inside order 2.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.cssSelector(\"[data-key='o2']\")).findElements(By.cssSelector(\".item\"));"
  },
  "150": {
    "starter": "// Return the target element or elements\n",
    "task": "Find the size select, then return its options.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.id(\"size\")).findElements(By.tagName(\"option\"));"
  },
  "151": {
    "starter": "// Return the requested value\n",
    "task": "Return the text of Pancakes' .food span.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.id(\"pancakes\")).findElement(By.cssSelector(\".food\")).getText();"
  },
  "152": {
    "starter": "// Return the requested value\n",
    "task": "Return the price text for Coffee.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.id(\"coffee\")).findElement(By.cssSelector(\".price\")).getText();"
  },
  "153": {
    "starter": "// Return the requested value\n",
    "task": "Return the data-chef attribute for Waffles.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.id(\"waffles\")).getAttribute(\"data-chef\");"
  },
  "154": {
    "starter": "// Return the requested value\n",
    "task": "Return the data-category of the first vegan plate.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.cssSelector(\".vegan\")).getAttribute(\"data-category\");"
  },
  "155": {
    "starter": "// Return the requested value\n",
    "task": "Return the href of the Contact Us link.",
    "hint": "",
    "reference": "",
    "solution": "return driver.findElement(By.linkText(\"Contact Us\")).getAttribute(\"href\");"
  },
  "156": {
    "starter": "// Return the requested value\n",
    "task": "Return a list of every food name using Diner.texts.",
    "hint": "",
    "reference": "",
    "solution": "return Diner.texts(driver.findElements(By.cssSelector(\".food\")));"
  },
  "157": {
    "starter": "// Return the requested value\n",
    "task": "Return every food name using Diner.texts.",
    "hint": "Diner.texts maps getText over a list of elements.",
    "reference": "",
    "solution": "return Diner.texts(driver.findElements(By.cssSelector(\".food\")));"
  },
  "158": {
    "starter": "// Print the requested lines\n",
    "task": "Use a for-each loop and System.out.println to print each food name on its own line.",
    "hint": "",
    "reference": "",
    "solution": "for (WebElement el : driver.findElements(By.cssSelector(\".food\"))) {\n  System.out.println(el.getText());\n}"
  },
  "159": {
    "starter": "// Print the requested lines\n",
    "task": "Print each food name prefixed with its 1-based number and a period, e.g. \"1. Pancakes\".",
    "hint": "Use an index loop and Diner.str for the number.",
    "reference": "",
    "solution": "List<WebElement> foods = driver.findElements(By.cssSelector(\".food\"));\nfor (int i = 0; i < foods.size(); i++) {\n  System.out.println(Diner.str(i + 1) + \". \" + foods.get(i).getText());\n}"
  },
  "160": {
    "starter": "// Return the requested value\n",
    "task": "Return every price as an integer, without the dollar sign.",
    "hint": "",
    "reference": "",
    "solution": "return Diner.toInts(Diner.texts(driver.findElements(By.cssSelector(\".price\"))), \"$\");"
  },
  "161": {
    "starter": "// Return the requested value\n",
    "task": "Return the sum of all prices.",
    "hint": "",
    "reference": "",
    "solution": "return Diner.sum(Diner.toInts(Diner.texts(driver.findElements(By.cssSelector(\".price\"))), \"$\"));"
  },
  "162": {
    "starter": "// Return the requested value\n",
    "task": "Return the food names of sweet plates.",
    "hint": "",
    "reference": "",
    "solution": "List<WebElement> plates = driver.findElements(By.cssSelector(\".plate\"));\nList<WebElement> sweet = Diner.filter(plates, el -> el.getAttribute(\"data-category\").equals(\"sweet\"));\nreturn Diner.map(sweet, el -> el.findElement(By.cssSelector(\".food\")).getText());"
  },
  "163": {
    "starter": "// Return the requested value\n",
    "task": "Return the food names of all non-drink plates.",
    "hint": "",
    "reference": "",
    "solution": "List<WebElement> plates = driver.findElements(By.cssSelector(\".plate\"));\nList<WebElement> mains = Diner.reject(plates, el -> el.getAttribute(\"data-category\").equals(\"drink\"));\nreturn Diner.map(mains, el -> el.findElement(By.cssSelector(\".food\")).getText());"
  },
  "164": {
    "starter": "// Return the requested value\n",
    "task": "Find the Coffee plate and return its price text.",
    "hint": "",
    "reference": "",
    "solution": "WebElement coffee = Diner.find(driver.findElements(By.cssSelector(\".plate\")), el -> el.findElement(By.cssSelector(\".food\")).getText().equals(\"Coffee\"));\nreturn coffee.findElement(By.cssSelector(\".price\")).getText();"
  },
  "165": {
    "starter": "// Return the requested value\n",
    "task": "Return every dish name from the menu.",
    "hint": "",
    "reference": "",
    "solution": "return Diner.texts(driver.findElements(By.cssSelector(\".dish .food\")));"
  },
  "166": {
    "starter": "// Return the requested value\n",
    "task": "Return the three section headings.",
    "hint": "",
    "reference": "",
    "solution": "return Diner.texts(driver.findElements(By.cssSelector(\".menu-section > h2\")));"
  },
  "167": {
    "starter": "// Return the requested value\n",
    "task": "Return every menu price as text, including the dollar sign.",
    "hint": "",
    "reference": "",
    "solution": "return Diner.texts(driver.findElements(By.cssSelector(\".dish .price\")));"
  },
  "168": {
    "starter": "// Return the requested value\n",
    "task": "Return the customer names for all orders.",
    "hint": "",
    "reference": "",
    "solution": "return Diner.texts(driver.findElements(By.cssSelector(\".order .customer strong\")));"
  },
  "169": {
    "starter": "// Return the requested value\n",
    "task": "Return every item name across all orders.",
    "hint": "",
    "reference": "",
    "solution": "return Diner.texts(driver.findElements(By.cssSelector(\".order .item\")));"
  },
  "170": {
    "starter": "// Return the requested value\n",
    "task": "Return the item names for order 2 only.",
    "hint": "",
    "reference": "",
    "solution": "return Diner.texts(driver.findElement(By.cssSelector(\"[data-key='o2']\")).findElements(By.cssSelector(\".item\")));"
  },
  "171": {
    "starter": "// Return the requested value\n",
    "task": "Return true if the page source contains \"Pancakes\".",
    "hint": "",
    "reference": "",
    "solution": "return driver.getPageSource().contains(\"Pancakes\");"
  },
  "172": {
    "starter": "// Return the requested value\n",
    "task": "Return how many plate data-key attributes match b followed by digits.",
    "hint": "Scan for /data-key=\"b\\d+\"/ and count the matches.",
    "reference": "",
    "solution": "return Diner.countMatches(driver.getPageSource(), \"data-key=\\\"b\\\\d+\\\"\");"
  },
  "173": {
    "starter": "// Return the requested value\n",
    "task": "Extract the numeric part of Pancakes' price and return it as an integer.",
    "hint": "",
    "reference": "",
    "solution": "String text = driver.findElement(By.id(\"pancakes\")).findElement(By.cssSelector(\".price\")).getText();\nMatcher m = Diner.match(text, \"\\\\$(\\\\d+)\");\nreturn Diner.toInt(m.group(1));"
  },
  "174": {
    "starter": "// Return the requested value\n",
    "task": "Return the number of words in the Waffles title attribute.",
    "hint": "",
    "reference": "",
    "solution": "return Diner.countWords(driver.findElement(By.id(\"waffles\")).getAttribute(\"title\"));"
  },
  "175": {
    "starter": "// Return the requested value\n",
    "task": "Return the unique list of chefs, in first-seen order.",
    "hint": "",
    "reference": "",
    "solution": "return Diner.unique(Diner.map(driver.findElements(By.cssSelector(\".plate\")), el -> el.getAttribute(\"data-chef\")));"
  },
  "176": {
    "starter": "// Return the requested value\n",
    "task": "Return the prices that are at least 8, as integers.",
    "hint": "",
    "reference": "",
    "solution": "return Diner.filter(Diner.toInts(Diner.texts(driver.findElements(By.cssSelector(\".price\"))), \"$\"), n -> n >= 8);"
  },
  "177": {
    "starter": "// Return the requested value\n",
    "task": "Return only breakfast dish names from the menu.",
    "hint": "",
    "reference": "",
    "solution": "return Diner.texts(driver.findElement(By.cssSelector(\"[data-key='sec-breakfast']\")).findElements(By.cssSelector(\".dish .food\")));"
  },
  "178": {
    "starter": "// Print the requested lines\n",
    "task": "Print each menu dish as \"Name,$price\" on its own line.",
    "hint": "",
    "reference": "",
    "solution": "for (WebElement row : driver.findElements(By.cssSelector(\".dish\"))) {\n  System.out.println(row.findElement(By.cssSelector(\".food\")).getText() + \",\" + row.findElement(By.cssSelector(\".price\")).getText());\n}"
  },
  "179": {
    "starter": "// Print the requested lines\n",
    "task": "Print each customer and their item count as \"Customer (count)\".",
    "hint": "",
    "reference": "",
    "solution": "for (WebElement order : driver.findElements(By.cssSelector(\".order\"))) {\n  System.out.println(order.findElement(By.cssSelector(\".customer strong\")).getText() + \" (\" + Diner.str(order.findElements(By.cssSelector(\".item\")).size()) + \")\");\n}"
  },
  "180": {
    "starter": "// Print the requested lines\n",
    "task": "Use a while loop to print every ordered item name on its own line.",
    "hint": "",
    "reference": "",
    "solution": "List<WebElement> items = driver.findElements(By.cssSelector(\".item\"));\nint i = 0;\nwhile (i < items.size()) {\n  System.out.println(items.get(i).getText());\n  i += 1;\n}"
  },
  "181": {
    "starter": "// Perform the requested action\n",
    "task": "Click the Add Pancakes button. The cart should contain 1 item.",
    "hint": "",
    "reference": "",
    "solution": "driver.findElement(By.cssSelector(\"[data-key='add-a1']\")).click();"
  },
  "182": {
    "starter": "// Perform the requested action\n",
    "task": "Add Waffles and Coffee to the cart.",
    "hint": "",
    "reference": "",
    "solution": "driver.findElement(By.cssSelector(\"[data-key='add-a2']\")).click();\ndriver.findElement(By.cssSelector(\"[data-key='add-a3']\")).click();"
  },
  "183": {
    "starter": "// Perform the requested action\n",
    "task": "Type \"Ada\" into the Name input.",
    "hint": "",
    "reference": "",
    "solution": "driver.findElement(By.id(\"customer-name\")).sendKeys(\"Ada\");"
  },
  "184": {
    "starter": "// Perform the requested action\n",
    "task": "Type \"ada@example.com\" into Email and \"555-0100\" into Phone.",
    "hint": "",
    "reference": "",
    "solution": "driver.findElement(By.id(\"customer-email\")).sendKeys(\"ada@example.com\");\ndriver.findElement(By.id(\"customer-phone\")).sendKeys(\"555-0100\");"
  },
  "185": {
    "starter": "// Perform the requested action\n",
    "task": "Click the Extra cheese checkbox to turn it off.",
    "hint": "",
    "reference": "",
    "solution": "driver.findElement(By.id(\"extra-cheese\")).click();"
  },
  "186": {
    "starter": "// Perform the requested action\n",
    "task": "Clear the Quantity input.",
    "hint": "",
    "reference": "",
    "solution": "driver.findElement(By.id(\"quantity\")).clear();"
  },
  "187": {
    "starter": "// Perform the requested action\n",
    "task": "Click the Place order button.",
    "hint": "",
    "reference": "",
    "solution": "driver.findElement(By.id(\"place-order\")).click();"
  },
  "188": {
    "starter": "// Perform the requested action\n",
    "task": "Select \"Large\" in the Size dropdown using Select#select_by_visible_text.",
    "hint": "",
    "reference": "",
    "solution": "Select sel = new Select(driver.findElement(By.id(\"size\")));\nsel.selectByVisibleText(\"Large\");"
  },
  "189": {
    "starter": "// Perform the requested action\n",
    "task": "Select the small size using Select#select_by_value.",
    "hint": "",
    "reference": "",
    "solution": "Select sel = new Select(driver.findElement(By.id(\"size\")));\nsel.selectByValue(\"small\");"
  },
  "190": {
    "starter": "// Perform the requested action\n",
    "task": "Select the first option using Select#select_by_index.",
    "hint": "",
    "reference": "",
    "solution": "Select sel = new Select(driver.findElement(By.id(\"size\")));\nsel.selectByIndex(0);"
  },
  "191": {
    "starter": "// Perform the requested action\n",
    "task": "Type \"Ada\" into Name and \"ada@example.com\" into Email, select Large, check Vegan, then click Place order.",
    "hint": "",
    "reference": "",
    "solution": "driver.findElement(By.id(\"customer-name\")).sendKeys(\"Ada\");\ndriver.findElement(By.id(\"customer-email\")).sendKeys(\"ada@example.com\");\nSelect sel = new Select(driver.findElement(By.id(\"size\")));\nsel.selectByVisibleText(\"Large\");\ndriver.findElement(By.id(\"vegan\")).click();\ndriver.findElement(By.id(\"place-order\")).click();"
  },
  "192": {
    "starter": "// Return the requested value\n",
    "task": "Sleep for 2 seconds, then return whether the \"Fresh coffee\" ticket is displayed.",
    "hint": "Thread.sleep takes milliseconds and advances the virtual clock.",
    "reference": "",
    "solution": "Thread.sleep(2000);\nreturn driver.findElement(By.cssSelector(\"[data-key='w1']\")).isDisplayed();"
  },
  "193": {
    "starter": "// Return the requested value\n",
    "task": "Sleep for 3 seconds, then return the text of the \"Hot pancakes\" ticket.",
    "hint": "",
    "reference": "",
    "solution": "Thread.sleep(3000);\nreturn driver.findElement(By.cssSelector(\"[data-key='w2']\")).getText();"
  },
  "194": {
    "starter": "// Return the requested value\n",
    "task": "Use WebDriverWait to wait until the \"Hot pancakes\" ticket is displayed, then return its text.",
    "hint": "Wait#until retries the block until it returns something truthy.",
    "reference": "",
    "solution": "WebDriverWait wait = new WebDriverWait(driver, 3);\nWebElement el = wait.until(d -> d.findElement(By.cssSelector(\"[data-key='w2']\")).isDisplayed() ? d.findElement(By.cssSelector(\"[data-key='w2']\")) : null);\nreturn el.getText();"
  },
  "195": {
    "starter": "// Perform the requested action\n",
    "task": "Set the implicit wait timeout to 4 seconds.",
    "hint": "",
    "reference": "",
    "solution": "driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(4));"
  },
  "196": {
    "starter": "// Return the target element or elements\n",
    "task": "Navigate to the menu page, then select the first dish (Pancakes).",
    "hint": "",
    "reference": "",
    "solution": "driver.get(\"https://diners.example/menu\");\nreturn driver.findElement(By.cssSelector(\"[data-key='m1']\"));"
  },
  "197": {
    "starter": "// Return the requested value\n",
    "task": "Navigate to the specials page with driver.navigate.to and return the page title.",
    "hint": "",
    "reference": "",
    "solution": "driver.navigate().to(\"https://diners.example/specials\");\nreturn driver.getTitle();"
  },
  "198": {
    "starter": "// Return the requested value\n",
    "task": "Open the menu, go back, and return the current URL.",
    "hint": "",
    "reference": "",
    "solution": "driver.get(\"https://diners.example/menu\");\ndriver.navigate().back();\nreturn driver.getCurrentUrl();"
  },
  "199": {
    "starter": "// Return the requested value\n",
    "task": "Go to the about page and return true if the page source contains \"Since 1952\".",
    "hint": "",
    "reference": "",
    "solution": "driver.get(\"https://diners.example/about\");\nreturn driver.getPageSource().contains(\"Since 1952\");"
  },
  "200": {
    "starter": "// Return the requested value\n",
    "task": "Navigate to the menu and return the number of .dish elements.",
    "hint": "",
    "reference": "",
    "solution": "driver.get(\"https://diners.example/menu\");\nreturn driver.findElements(By.cssSelector(\".dish\")).size();"
  }
};

  const api = { CONTENT };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.SeleniumJavaLevels = api;
})(typeof window !== 'undefined' ? window : globalThis);
