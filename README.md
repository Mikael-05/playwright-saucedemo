# Playwright TypeScript — SauceDemo Test Automation

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI-2088FF?logo=githubactions&logoColor=white)

## 1. About the project

This project is an end-to-end test automation framework built with Playwright and TypeScript, using SauceDemo as the application under test.
The main objective of this project was to strengthen my skills in Playwright test automation while building a maintainable and scalable framework based on the Page Object Model (POM) design pattern.
The project also integrates GitHub Actions to automate test execution and demonstrate a basic Continuous Integration (CI) workflow.

## 2. Objectives

- Improve my practical skills with Playwright and TypeScript
- Build a structured and maintainable automation framework
- Apply the Page Object Model (POM) pattern
- Organize tests according to their purpose and execution frequency
- Implement test tagging with smoke, sanity and regression
- Automate test execution through GitHub Actions
- Run fast feedback tests on every push
- Separate critical tests from broader test suites
- Practice automation framework design and CI principles

## 3. Tech Stack

| Technology | Purpose |
|---|---|
| Playwright | End-to-end test automation |
| TypeScript | Programming language |
| Node.js | Runtime environment |
| Page Object Model | Test architecture |
| GitHub Actions | CI / automated test execution |
| SauceDemo | Application under test |


## 4. Project Architecture

The framework follows the Page Object Model (POM) approach.


```text
├── .github/
│   └── workflows/
│       └── playwright.yml (supports smoke, sanity, and regression test suites)
│
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── tests/
│   ├── login/
│   ├── inventory/
│   ├── cart/
│   └── checkout/
│
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md

```

The exact file structure may evolve as the framework grows.

### Why Page Object Model?

The POM pattern allows the project to separate:

- **Test logic** → what should be tested
- **Page interactions** → how the application is interacted with
- **Locators** → where elements are located

This makes the test suite:
- Easier to maintain
- Easier to read
- Easier to reuse
- Easier to debug
- Easier to scale


For example, a login test can focus on the expected behavior without containing all the selectors and low-level interactions of the login page.

## 5. Test Strategy

Tests are organized using three tags according to their purpose.

### 5.1 Smoke

The smoke suite contains the most critical tests used to quickly verify that the main application flows are working.
These tests are executed automatically on every push.
The objective is to provide rapid feedback and detect major regressions as early as possible.
```bash
npx playwright test --grep @smoke
```

### 5.2 Sanity

The sanity suite contains a focused set of tests used to verify that specific application functionalities are behaving as expected.
These tests are executed through GitHub Actions.
```bash
npx playwright test --grep @sanity
```

### 5.3 Regression

The regression suite contains the broader test coverage designed to detect regressions across the application.
It is also executed through GitHub Actions.
```bash
npx playwright test --grep @regression
```

## 6. CI / GitHub Actions

The project uses GitHub Actions to automate test execution.
The objective is to demonstrate how an automated test framework can be integrated into a CI pipeline.

### Workflow

```text
                    Git Push
                       │
                       ▼
                ┌─────────────┐
                │ GitHub Repo │
                └──────┬──────┘
                       │
                       ▼
                 Smoke Tests
                       │
                ┌──────┴──────┐
                │             │
              PASS           FAIL
                │             │
                ▼             ▼
             Continue      Feedback
```

The smoke suite is designed to provide fast feedback after every push, while the sanity and regression suites can be triggered through a GitHub Actions workflow.

This separation makes it possible to balance:
- execution speed
- critical coverage
- broader regression coverage

  
## 7. Getting Started

### 7.1 Prerequisites

Make sure you have the following installed:
- Node.js
- npm
- Git

### 7.2 Installation steps

#### 1. Clone the repository
```bash
git clone <repository-url>
cd <repository-name>
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Install Playwright browsers
```bash
npx playwright install
```

## 8. Running the Tests

Run the complete test suite
```bash
npx playwright test
```
Run smoke tests
```bash
npx playwright test --grep @smoke
```

Run sanity tests
```bash
npx playwright test --grep @sanity
```

Run regression tests
```bash
npx playwright test --grep @regression
```

Run tests in headed mode
```bash
npx playwright test --headed
```

Run a specific test file
```bash
npx playwright test tests/<test-file>.spec.ts
```

## 9. Test Reports

After a test execution, Playwright generates an HTML report.
To open the report:
```bash
npx playwright show-report
```

The report provides useful information such as:
- test status
- execution duration
- failed assertions
- screenshots
- traces
- test steps

This makes it easier to investigate failures locally or during CI execution.

## 10. Example of Test Organization

Tests are organized around application features rather than mixing all scenarios into a single test file.
A typical test follows this structure:

```text
Test
 │
 ├── Arrange
 │
 ├── Act
 │     └── Page Object methods
 │
 └── Assert
       └── Expected application behavior
```

This approach keeps the test scenarios focused on business behavior while page-specific implementation details remain inside the Page Objects.

## 11. Test Tags

The project uses Playwright annotations to classify tests:

```typescript
test('@smoke User can successfully log in', async ({ page }) => {
    // ...
});

test('@sanity User can add a product to the cart', async ({ page }) => {
    // ...
});

test('@regression User can complete the checkout process', async ({ page }) => {
    // ...
});
```

Tags allow specific subsets of the test suite to be executed depending on the context.
For example:
```bash
npx playwright test --grep @smoke
```
This is particularly useful in CI environments where different test suites may need to be executed at different frequencies.

## 12. Skills Demonstrated

This project demonstrates practical experience with:
- Playwright
- TypeScript
- End-to-End Testing
- Page Object Model (POM)
- Test organization and tagging
- Assertions
- Locators
- Test isolation
- HTML test reports
- Git / GitHub
- GitHub Actions
- Continuous Integration principles
- Test suite segmentation
- Automation framework design
  
## 13. Possible Improvements

This project is intentionally focused on building a solid Playwright foundation. Potential future improvements include:
- Add API testing with Playwright
- Add more comprehensive test coverage
- Improve test data management
- Introduce fixtures for reusable test setup
- Add environment-based configuration
- Add parallel execution strategies
- Store Playwright reports as GitHub Actions artifacts
- Add screenshots and traces automatically on failure
- Add test result notifications

## 14. Project Context

This repository was created as a personal learning and portfolio project with the goal of developing practical skills in modern test automation.
Rather than focusing only on writing individual automated tests, the project aims to reproduce the structure and practices that can be found in a professional automation framework:
Maintainable test architecture + reusable components + test categorization + CI automation
The project is continuously evolving as I deepen my knowledge of Playwright, TypeScript and test automation best practices.

## 15. Author

Mikael LOMBARD

QA Automation / Test Automation

This repository is part of my technical portfolio and demonstrates my approach to building automated end-to-end tests with Playwright and TypeScript.
