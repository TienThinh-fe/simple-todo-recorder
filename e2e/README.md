# 🚀 E2E Automation Testing Framework

## 📋 Overview

This is a comprehensive end-to-end (e2e) automation testing framework built specifically for the Simple Todo Recorder application. The framework is designed for **beginners in automation testing** and uses the **Behavior Driven Development (BDD)** approach with Gherkin syntax.

## 🏗️ Framework Architecture

```
e2e/
├── main/                          # Main automation framework folder
│   ├── config/                    # Configuration files
│   │   └── wdio.conf.js          # WebDriverIO main configuration
│   ├── src/                       # Source code for tests
│   │   ├── features/              # Feature files (Gherkin scenarios)
│   │   │   ├── todo-creation.feature
│   │   │   └── todo-comprehensive.feature
│   │   ├── pages/                 # Page Object Model files
│   │   │   └── todo.page.js       # Todo page elements and actions
│   │   └── steps/                 # Step definitions (Given, When, Then)
│   │       ├── given.js           # Given step implementations
│   │       ├── when.js            # When step implementations
│   │       └── then.js            # Then step implementations
│   └── test-data/                 # Test data files
│       └── test-scenarios.json    # Scenario-specific test data
```

## �️ Technologies Used

- **WebDriverIO v9.18.1**: Main automation framework for browser interaction
- **Cucumber**: BDD framework for writing tests in plain English
- **Chrome Browser**: Automated browser for test execution
- **Node.js ES Modules**: Modern JavaScript module system
- **expect-webdriverio**: Assertion library for test validations

## 🎯 Key Features

### 1. **Beginner-Friendly Design**
- Clear, readable test scenarios in plain English
- Well-commented code with explanations
- Step-by-step documentation

### 2. **BDD Approach (Given-When-Then)**
- **Given**: Sets up the initial state
- **When**: Performs actions
- **Then**: Verifies expected outcomes

### 3. **Page Object Model**
- Centralized element definitions
- Reusable page interactions
- Better maintainability

### 4. **Clean Test Isolation**
- Each test starts with a clean browser state
- localStorage cleanup between tests
- Independent test execution

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Chrome browser
- Simple Todo Recorder application running on `http://localhost:5173`

### Running Tests

1. **Run all e2e tests:**
   ```bash
   npm run e2e
   ```

2. **Run specific feature file:**
   ```bash
   npx wdio run ./e2e/main/config/wdio.conf.js --spec "e2e/main/src/features/todo-creation.feature"
   ```

3. **Run with specific tag:**
   ```bash
   npx wdio run ./e2e/main/config/wdio.conf.js --cucumberOpts.tagExpression="@smoke"
   ```

## 📝 Writing Tests

### Feature File Example
```gherkin
Feature: Todo Creation and Management
  As a user of the Todo application
  I want to create and manage my todos
  So that I can keep track of my tasks

  @smoke @HappyPath
  Scenario: Create a simple todo successfully
    Given I open the todo application
    And the todo application is ready
    When I add a todo "Buy groceries"
    Then I should see "Buy groceries" in the todo list
    And the todo counter should show "1 todo item"
```

### Step Definition Example
```javascript
// Given step
Given(/^I open the todo application$/, async () => {
  // Navigate to the application URL
  await browser.url('http://localhost:5173/')
})

// When step
When(/^I add a todo "([^"]*)"$/, async (todoText) => {
  // Enter todo text and submit
  await todoPage.todoNameInput.setValue(todoText)
  await todoPage.addButton.click()
})

// Then step
Then(/^I should see "([^"]*)" in the todo list$/, async (todoText) => {
  // Verify todo appears in the list
  const todoFound = await todoPage.findTodoByText(todoText)
  expect(todoFound).toBe(true)
})
```

## 🏷️ Tags and Test Organization

### Available Tags:
- `@smoke`: Quick verification tests
- `@regression`: Comprehensive functionality tests
- `@HappyPath`: Positive flow scenarios
- `@TodoModule`: Todo-specific functionality
- `@BasicValidation`: Basic UI element checks
- `@FormValidation`: Form interaction tests
- `@CompleteFlow`: End-to-end workflow tests

### Running Tagged Tests:
```bash
# Run only smoke tests
npx wdio run ./e2e/main/config/wdio.conf.js --cucumberOpts.tagExpression="@smoke"

# Run regression tests
npx wdio run ./e2e/main/config/wdio.conf.js --cucumberOpts.tagExpression="@regression"
```

## 🧪 Available Test Scenarios

### 1. **Basic Todo Creation** (`todo-creation.feature`)
- Create simple todos
- Add todos with priorities
- Add todos with due dates
- Create multiple todos
- Verify todo counter functionality

### 2. **Comprehensive Testing** (`todo-comprehensive.feature`)
- Complete todo management workflow
- Application loading verification
- Detailed form interactions
- Multiple todo creation with different priorities

## 🔧 Step Definitions Reference

### Given Steps (Setup)
```gherkin
Given I open the todo application
Given I open the site "/"
Given I wait on element "elementName" for 60000ms to be displayed
Given I wait on element "elementName" for 60000ms to be enabled
```

### When Steps (Actions)
```gherkin
When I add a todo "Todo Text"
When I enter "text" in the todo name field
When I select "high" priority
When I set the due date to "2025-12-31"
When I click the add todo button
When I click on the element "elementName"
When I set "text" to the inputfield "elementName"
When I pause for 1000ms
```

### Then Steps (Verification)
```gherkin
Then I should see "Todo Text" in the todo list
Then the todo counter should show "1 todo item"
Then the todo should show "HIGH PRIORITY" label
Then the todo should show due date information
Then I should see 3 todos in the list
Then the todo application should be ready
Then I expect that the title is "Simple Todo Recorder"
```

## 🎯 Page Object Model

### TodoPage Class
The `TodoPage` class centralizes all element definitions and interactions:

```javascript
class TodoPage {
  // Element getters
  get todoNameInput() { return $('[data-testid="todo-name"]') }
  get prioritySelect() { return $('[data-testid="priority-select"]') }
  get dueDateInput() { return $('[data-testid="due-date"]') }
  get addButton() { return $('[data-testid="add-todo"]') }
  get todoItems() { return $$('.todo-item') }
  get todoCounter() { return $('[data-testid="todo-counter"]') }

  // Action methods
  async addTodo(text) {
    await this.todoNameInput.setValue(text)
    await this.addButton.click()
  }

  async selectPriority(priority) {
    await this.prioritySelect.selectByAttribute('value', priority)
  }
}
```

## 🚨 Troubleshooting

### Common Issues and Solutions

1. **Tests not finding elements**
   - Ensure the application is running on `http://localhost:5173`
   - Check that test data attributes exist on elements

2. **Browser not starting**
   - Verify Chrome is installed
   - Check WebDriverIO configuration

3. **Step definitions not found**
   - Ensure step definition files are in correct location
   - Check pattern matching in step definitions

4. **Tests failing randomly**
   - Add appropriate waits for elements
   - Ensure clean state between tests

## 📊 Test Reports

After running tests, you'll see:
- ✅ Passed scenarios
- ❌ Failed scenarios  
- Test execution summary
- Detailed step-by-step results

## 🔄 Continuous Integration

This framework is ready for CI/CD integration:
- Headless browser execution
- JSON/XML report generation
- Exit codes for build success/failure

## 📚 Learning Resources

### For Beginners:
1. **Gherkin Syntax**: Learn to write readable test scenarios
2. **WebDriverIO Documentation**: Browser automation concepts
3. **Cucumber.js**: BDD framework understanding
4. **Page Object Model**: Design pattern for maintainable tests

### Next Steps:
- Add more complex scenarios
- Implement data-driven testing
- Add visual regression testing
- Integrate with CI/CD pipelines

## 🤝 Contributing

When adding new tests:
1. Write clear, descriptive scenarios
2. Follow the Given-When-Then pattern
3. Add appropriate tags
4. Update documentation
5. Ensure tests are independent and reliable

---

**Happy Testing! 🎉**

This framework provides a solid foundation for automation testing while remaining accessible to beginners. The combination of clear documentation, well-structured code, and comprehensive examples makes it an excellent learning tool for automation testing concepts.
