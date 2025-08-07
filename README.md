# 📘 Cypress Automation Test Suite – Documentation

Welcome to the Cypress automation project. This project contains end-to-end UI tests for web applications using Cypress and custom page object design. This guide will help you understand, set up, and execute the test suite – even if you're revisiting it after several years.

---

## ✅ Prerequisites

Ensure the following are installed on your system:

| Tool                           | Required Version |
| ------------------------------ | ---------------- |
| [Node.js](https://nodejs.org/) | >= 14.x          |
| [npm](https://www.npmjs.com/)  | >= 6.x           |
| [Git](https://git-scm.com/)    | Latest           |

You may also install VS Code or any IDE of your choice for better experience.

---

## 🚀 Installation Steps

```bash
# Clone the project
git clone https://github.com/your-username/cypress-practice-new.git
cd cypress-practice-new

# Install dependencies
npm install
```

To verify Cypress is installed correctly:

```bash
npx cypress open
```

---

## 🧾 Project Structure

```
CypressPracticeNew/
│
├── cypress.config.js          # Cypress configuration
├── package.json               # Project metadata & dependencies
├── README.md                  # Documentation
├── cypress/
│   ├── integration/           # Test scripts & page objects
│   │   ├── examples/          # Functional test cases
│   │   └── pageObjects/       # Page Object classes (e.g., HomePage.js)
│   ├── fixtures/              # Test data in JSON
│   ├── support/               # Custom commands and setup
│   ├── downloads/             # Exported/downloaded files
│   ├── failure/screenshots/   # Screenshots from failed tests
│   └── reports/html/          # HTML test reports (mochawesome)
├── node_modules/              # Installed npm modules
└── .gitignore                 # Files/folders to ignore in Git
```

---

## 🔍 Folder-wise Breakdown

### 📁 `integration/`

Holds your test cases and structured subfolders:

- `examples/`: Actual Cypress test cases like `Test1.js`, `upload-download.js`
- `pageObjects/`: Contains reusable classes like `HomePage.js`, `ProductPage.js`

### 📁 `fixtures/`

Static data used in your tests like test inputs, dummy records, etc.

### 📁 `support/`

Includes:

- `commands.js`: Custom Cypress commands
- `e2e.js`: Global setup for all specs

### 📁 `downloads/`

Stores test artifacts like downloaded Excel/CSV files for validation purposes.

### 📁 `reports/html/`

Mochawesome HTML reports with interactive UI to view passed/failed test steps.

---

## 🔄 How to Run the Tests

### Open Cypress Test Runner (GUI mode):

```bash
npx cypress open
```

### Run all tests in headless mode (CLI mode):

```bash
npx cypress run
```

### Generate Mochawesome Report:

Ensure `reporter` is configured in `cypress.config.js`, e.g.:

```js
reporter: 'mochawesome',
reporterOptions: {
  reportDir: 'cypress/reports/html',
  overwrite: false,
  html: true,
  json: true
}
```

---

## 🔧 CI/CD Integration (Optional)

You can plug this into any CI/CD pipeline like GitHub Actions, Jenkins, or GitLab CI for automated test runs on every commit or release.

---

## 📊 Architecture Diagram (Conceptual)

```
                        +--------------------+
                        |  Cypress Test Code |
                        +--------------------+
                                 |
                                 v
                      +----------------------+
                      |  Page Object Models  |
                      +----------------------+
                                 |
                                 v
         +----------------------------------------------+
         |   Application Under Test (Browser-based UI)  |
         +----------------------------------------------+

             +-----------------+
             | Test Reports    | <--- Mochawesome Output
             +-----------------+
```

---

## 📌 Tips for Future Reference

- 🔄 To update dependencies: `npm update`
- 🛠 To add a new test, place it in `integration/examples/`
- 🧱 To add reusable selectors/actions, use `pageObjects/`
- 📂 Always verify downloaded files using fixtures or file comparison logic
- 🧪 Maintain `.env` file if sensitive config or API keys are required (not in current setup)

---

## 📧 Contact

Maintainer: [Your Name]  
Email: your.email@example.com  
GitHub: [@your-username](https://github.com/your-username)

## 📦 Project Dependencies

### 📦 Runtime Dependencies

- **convert-excel-to-json**: `^1.7.0`
- **exceljs**: `^4.4.0`

### 🛠️ Dev Dependencies

- **cypress**: `^13.13.2`
- **cypress-iframe**: `^1.0.1`
- **cypress-mochawesome-reporter**: `^3.8.2`
- **neat-csv**: `5.1.0`

NOTES:

1. We have cypress xpath plugin if we want to use xpath selector https://www.cypress.io/blog/understanding-selectors-in-testing
   Why it's not in official Cypress docs
   Cypress has always encouraged using CSS selectors instead of XPath because:

Cypress natively supports only CSS selectors.

CSS selectors are faster, easier to read, and work better with Cypress’s retry-ability and shadow DOM features.

That’s why you won’t see cypress-xpath promoted in the official docs — it goes against Cypress’s design philosophy, though it still works.

cy.xpath('<locator>')
cy.xpath().xpath() -> Chained xpath
STeps:

1. install the plugin using `npm install -D cypress-xpath`
2. Add /// <reference types="cypress-xpath" /> in support/commands.js
3. Add require('cypress-xpath') in support/e2e.js

## Cypress Assertions

1. Implicit > should, and
2. Explicit > expect, assert

### We can chain multiple assertions

cy.url().should('include', 'abc').and('eq', 'https://abc.com').and('not.contain', 'xyz')
.should('be.visible').and('exist')
.should(have, value)

You can chain Cypress commands, but .text() is not a Cypress command — it's a jQuery method. That’s why you can’t chain it like other Cypress commands.

🔍 Let's break it down:
✅ Cypress commands (chainable):
Commands like these return Cypress “Chainable” objects, which support chaining:

js
Copy
Edit
cy.get('selector') // Cypress command
.click() // Cypress command
.should('be.visible') // Cypress command
Each of these is a Cypress function that returns control back to Cypress’s internal command queue — allowing Cypress to manage timing, retries, and assertions.

In Cypress: What does $ mean?
In Cypress, $ is often used to represent a jQuery-wrapped DOM element.

🔍 Example:
js
Copy
Edit
cy.get('.my-element').then(($el) => {
const text = $el.text(); // $el is a jQuery object
});
Here:

cy.get() returns a Cypress chainable object.

.then(($el) => {}) gives you access to the actual DOM element wrapped in jQuery.

$el is just a naming convention — not a special character — but by convention, Cypress (and jQuery) developers use $ as a prefix to signal:

"This variable is a jQuery object."

You could rename it and it would still work:

js
Copy
Edit
.then((el) => el.text()) // works fine too
But using $el makes your code more readable and clear that it’s not a raw DOM node — it’s a jQuery-wrapped one.

//TDD Style
assert.equal(actual,expected)
assert.notEqual(actual,expected)
https://docs.cypress.io/app/references/assertions

```
my-cypress-project/
├── cypress/
│ ├── e2e/ # Your end-to-end test files
│ ├── fixtures/ # Static test data (JSON, etc.)
│ ├── support/
│ │ ├── commands.js # Custom Cypress commands
│ │ └── e2e.js # Global setup code for E2E tests
│
├── cypress.config.js # Main Cypress configuration file
├── package.json # Project dependencies and scripts
```

## Selecting Radio btns and checkboxes

cy.get().check().should('be.checked ')
cy.get('<locator>').uncheck().should('not.be.checked')

## Selecting first and last checkbox

cy.get('<locator>').first().check()
cy.get('<locator>').last().check()

## Website for automation practice

https://www.automationexercise.com/
[text](https://www.zoho.com/commerce/free-demo.html)
[text](https://testing.qaautomationlabs.com/index.php)

## Selecting values from Dropdown

cy.get('<locator>').select('India').should('have.value','India')

## To press enter from keyboard

cy.get('<locator>').type('Italy').type('{enter}')

## Difference between `have.value` and `have.text`

| Assertion                     | Used For                                                 | What It Checks                                           | Example Element                   |
| ----------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | --------------------------------- |
| `should('have.value', 'abc')` | **Form inputs** (like `<input>`, `<textarea>`)           | Checks the `value` **attribute/property** of the element | `<input type="text" value="abc">` |
| `should('have.text', 'abc')`  | **Non-input elements** (like `<div>`, `<button>`, `<p>`) | Checks the **visible text content** between the tags     | `<button>abc</button>`            |

cy.wrap() is a Cypress command that is used to wrap an object (like a variable, promise, DOM element, etc.) into a Cypress chainable so that you can continue chaining Cypress commands with it.
cy.wait(3000)

Cypress events link https://docs.cypress.io/api/cypress-api/catalog-of-events

```
 it('Read all the rows & Columns data in the first page',()=>{

        cy.get("table[class='table table-bordered table-hover']>tbody>tr")
            .each( ($row,index,$rows)=>{

                  cy.wrap($row).within(()=>{

                      cy.get('td').each(($col,index,$cols)=>{
                                cy.log($col.text());
                       })
            })

        })
    })
```

## Mouse events

1. Right Click
   cy.get(<locator>).trigger('mouseover)
2. Double Click
   cy.get(<locator>).trigger('dblclick)
3. Drag and Drop
   Use cypress drag and drop plugin

```bash
npm install --save-dev @4tw/cypress-drag-drop
```

## File Upload

1. Add the cypress file upload plugin

```bash
npm install --save-dev cypress-file-upload
```

.attachFile() will read files available in fixtures

## Commands In cypress

In Support/Command.js

```bash
Cypress.Commands.add('selectProduct', (productName) => {
    cy.get('h4.card-title').each(($e1,index)=>{
    if($e1.text().includes(productName)){
        cy.get('div.card-footer button').eq(index).click()
    }
}) })
```
