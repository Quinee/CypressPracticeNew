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
