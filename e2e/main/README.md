# Automation Testing Guide for Beginners

This guide will help you understand and write automation tests for the Todo application using WebDriverIO and Cucumber.

## 🎯 What is Automation Testing?

Automation testing means writing code that tests your application automatically, just like a human would:

- Opening the website
- Clicking buttons
- Filling out forms
- Checking if everything works correctly

## 📝 How to Write Tests

### Step 1: Understanding Gherkin Syntax

Tests are written in **Gherkin syntax** - it's like writing instructions in plain English:

```gherkin
Feature: Todo Management
  As a user
  I want to manage my todos
  So that I can stay organized

  @TodoModule @regression @HappyPath
  Scenario: Create a new todo successfully
    Given I open the todo application
    When I fill in the todo form with "Buy groceries"
    And I click the add button
    Then I should see "Buy groceries" in the todo list
    And the todo counter should increase by 1
```

### Step 2: Understanding the Keywords

- **Feature**: What functionality you're testing
- **Scenario**: A specific test case
- **Given**: Sets up the starting situation (preconditions)
- **When**: The action you're performing
- **Then**: What should happen (assertions)
- **And**: Continues the previous step type

### Step 3: Using Tags for Organization

Tags help categorize and run specific tests:

```gherkin
@TodoModule @regression @HappyPath @CreateTodo
Scenario: Create a new todo with priority
```

Common tags in this project:

- `@TodoModule` - All todo-related functionality
- `@regression` - Critical tests that must always pass
- `@HappyPath` - Positive test scenarios (everything works)
- `@smoke` - Quick basic functionality tests
- `@CreateTodo` - Specific to todo creation
- `@EditTodo` - Specific to todo editing
- `@DeleteTodo` - Specific to todo deletion

## 🏗️ Framework Components

### 1. Feature Files (`./src/features/`)

These contain your test scenarios written in Gherkin syntax.

### 2. Step Definitions (`./src/steps/`)

These translate Gherkin steps into actual code:

- `given.js` - Setup steps (Given...)
- `when.js` - Action steps (When...)
- `then.js` - Verification steps (Then...)

### 3. Page Objects (`./src/pageObjects/`)

These define the elements on each page:

```javascript
// todoPage.js
export default class TodoPage {
  get todoNameInput() {
    return $('#todo-name')
  }
  get addButton() {
    return $('#add-todo-btn')
  }
  get todoList() {
    return $('.todo-list')
  }
}
```

### 4. Test Data (`./src/dataTest/`)

Store test data and constants here.

## 🔧 Running Tests

### Run All Tests

```bash
npm run e2e
```

### Run Specific Feature

```bash
npx wdio ./e2e/main/config/wdio.conf.js --spec ./e2e/main/src/features/todo-creation.feature
```

### Run Tests with Tags

```bash
# Run only smoke tests
npx wdio ./e2e/main/config/wdio.conf.js --cucumberOpts.tagExpression='@smoke'

# Run regression tests
npx wdio ./e2e/main/config/wdio.conf.js --cucumberOpts.tagExpression='@regression'

# Run multiple tags
npx wdio ./e2e/main/config/wdio.conf.js --cucumberOpts.tagExpression='@TodoModule and @HappyPath'
```

## ✍️ Writing Your First Test

### Step 1: Create a Feature File

Create a new file in `./src/features/` with `.feature` extension:

```gherkin
Feature: Todo Priority Management

  @TodoModule @regression @HappyPath @PriorityTodo
  Scenario: Create todo with high priority
    Given I open the todo application
    When I enter "Important task" in the todo name field
    And I select "high" priority
    And I click the add todo button
    Then I should see "Important task" in the todo list
    And the todo should show "HIGH PRIORITY" label
```

### Step 2: Check if Steps Exist

Run the test - if steps don't exist, WebDriverIO will suggest the code you need to add.

### Step 3: Add Missing Steps

Add the step definitions to the appropriate files in `./src/steps/`.

## 🚨 Common Mistakes for Beginners

1. **Forgetting to wait for elements**: Always wait for elements to be visible/clickable
2. **Hard-coding waits**: Use `waitForDisplayed()` instead of `pause()`
3. **Not using page objects**: Define elements in page objects, not in steps
4. **Poor test data management**: Use the dataTest folder for test data
5. **Writing too complex tests**: Start simple, one scenario per test

## 📊 Best Practices

1. **Write clear scenario names**: Anyone should understand what the test does
2. **Use meaningful tags**: Helps organize and run specific test suites
3. **Keep scenarios independent**: Each test should work on its own
4. **Use page objects**: Makes tests easier to maintain
5. **Add comments**: Explain complex logic in your step definitions

## 🎯 Example Test Structure

```gherkin
Feature: Todo Management
  # Background runs before each scenario in this feature
  Background:
    Given I open the todo application
    And the todo list is empty

  @TodoModule @smoke @CreateTodo
  Scenario: Create a simple todo
    When I add a todo "Buy milk"
    Then I should see "Buy milk" in the todo list

  @TodoModule @regression @EditTodo
  Scenario: Edit an existing todo
    Given I have a todo "Original task"
    When I edit the todo to "Updated task"
    Then I should see "Updated task" in the todo list
    And I should not see "Original task"
```

## 🛠️ Debugging Tips

1. **Use browser pause**: Add `await browser.pause(5000)` to see what's happening
2. **Check element selectors**: Make sure your CSS selectors are correct
3. **Use debug mode**: Run with `--debug` flag
4. **Check browser console**: Look for JavaScript errors
5. **Take screenshots**: Add screenshot steps for visual debugging

## 📚 Next Steps

1. Study the existing feature files
2. Practice by modifying existing scenarios
3. Create new scenarios for edge cases
4. Learn about advanced WebDriverIO features
5. Explore additional Cucumber features

Remember: Start simple and gradually add complexity! 🚀
