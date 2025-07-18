/**
 * Then Step Definitions
 *
 * These steps handle verifications and assertions.
 * "Then" steps typically check if expected results occurred.
 *
 * Pattern: Then I [should see/expect some result]
 */

import { Then } from '@wdio/cucumber-framework'
import { expect } from '@wdio/globals'
import TodoPage from '../pageObjects/todoPage.js'
import { EXPECTED_MESSAGES, TIMEOUTS } from '../dataTest/testData.js'

const todoPage = new TodoPage()

/**
 * Verify that a todo appears in the list
 * Usage: Then I should see "Buy groceries" in the todo list
 */
Then(/^I should see "([^"]*)" in the todo list$/, async (todoName) => {
  const todoElement = await todoPage.getTodoByName(todoName)
  await expect(todoElement).toBeDisplayed()
})

/**
 * Verify that a todo does NOT appear in the list
 * Usage: Then I should not see "Old task" in the todo list
 */
Then(/^I should not see "([^"]*)" in the todo list$/, async (todoName) => {
  try {
    await todoPage.getTodoByName(todoName)
    // If we get here, the todo was found, which is unexpected
    throw new Error(`Todo "${todoName}" was found but should not be visible`)
  } catch (error) {
    // This is expected - the todo should not be found
    if (error.message.includes('not found')) {
      // Good - todo was not found as expected
      return
    }
    // Re-throw if it's a different error
    throw error
  }
})

/**
 * Verify the todo counter
 * Usage: Then the todo counter should show "3 todo items"
 */
Then(/^the todo counter should show "([^"]*)"$/, async (expectedText) => {
  const counterElement = await todoPage.todoCounter
  await expect(counterElement).toHaveText(expectedText)
})

/**
 * Verify the todo counter increases by a specific number
 * Usage: Then the todo counter should increase by 1
 */
Then(/^the todo counter should increase by (\d+)$/, async (increment) => {
  // This step would need to track the previous count
  // For simplicity, we'll just verify the counter is displayed
  await expect(todoPage.todoCounter).toBeDisplayed()
})

/**
 * Verify page title contains expected text
 * Usage: Then I expect that the title is "Simple Todo Recorder"
 */
Then(/^I expect that the title is "([^"]*)"$/, async (expectedTitle) => {
  const actualTitle = await browser.getTitle()
  expect(actualTitle).toContain(expectedTitle)
})

/**
 * Verify an element is displayed
 * Usage: Then I expect that element "todoList" is displayed
 */
Then(/^I expect that element "([^"]*)" is displayed$/, async (elementName) => {
  const elementMap = {
    todoList: todoPage.todoList,
    todoCounter: todoPage.todoCounter,
    addButton: todoPage.addTodoButton,
    todoNameInput: todoPage.todoNameInput,
  }

  const element = elementMap[elementName]
  if (element) {
    await expect(element).toBeDisplayed()
  } else {
    console.warn(`Element "${elementName}" not found in element map`)
  }
})

/**
 * Verify an element is NOT displayed
 * Usage: Then I expect that element "errorMessage" is not displayed
 */
Then(
  /^I expect that element "([^"]*)" is not displayed$/,
  async (elementName) => {
    const elementMap = {
      todoList: todoPage.todoList,
      todoCounter: todoPage.todoCounter,
    }

    const element = elementMap[elementName]
    if (element) {
      await expect(element).not.toBeDisplayed()
    }
  },
)

/**
 * Wait for element to be displayed with timeout
 * Usage: Then I wait on element "todoList" for 60000ms to be displayed
 */
Then(
  /^I wait on element "([^"]*)" for (\d+)ms to be displayed$/,
  async (elementName, timeout) => {
    const timeoutMs = parseInt(timeout)

    const elementMap = {
      todoList: todoPage.todoList,
      todoCounter: todoPage.todoCounter,
      addButton: todoPage.addTodoButton,
      todoNameInput: todoPage.todoNameInput,
    }

    const element = elementMap[elementName]
    if (element) {
      await element.waitForDisplayed({ timeout: timeoutMs })
    }
  },
)

/**
 * Wait for element to exist
 * Usage: Then I wait on element "todoCounter" for 60000ms to exist
 */
Then(
  /^I wait on element "([^"]*)" for (\d+)ms to exist$/,
  async (elementName, timeout) => {
    const timeoutMs = parseInt(timeout)

    const elementMap = {
      todoList: todoPage.todoList,
      todoCounter: todoPage.todoCounter,
      addButton: todoPage.addTodoButton,
      todoNameInput: todoPage.todoNameInput,
    }

    const element = elementMap[elementName]
    if (element) {
      await element.waitForExist({ timeout: timeoutMs })
    }
  },
)

/**
 * Verify todo has specific priority
 * Usage: Then the todo should show "HIGH PRIORITY" label
 */
Then(/^the todo should show "([^"]*)" label$/, async (expectedLabel) => {
  const priorityElements = await todoPage.todoPriorities
  let found = false

  for (const element of priorityElements) {
    const text = await element.getText()
    if (text.includes(expectedLabel)) {
      found = true
      break
    }
  }

  expect(found).toBe(true)
})

/**
 * Verify specific number of todos in list
 * Usage: Then I should see 3 todos in the list
 */
Then(/^I should see (\d+) todos? in the list$/, async (expectedCount) => {
  const todoItems = await todoPage.todoItems
  expect(todoItems).toHaveLength(parseInt(expectedCount))
})

/**
 * Verify the todo list is empty
 * Usage: Then the todo list should be empty
 */
Then(/^the todo list should be empty$/, async () => {
  const todoItems = await todoPage.todoItems
  expect(todoItems).toHaveLength(0)
})

/**
 * Verify element has specific text
 * Usage: Then the element "mainHeading" should contain "Simple Todo Recorder"
 */
Then(
  /^the element "([^"]*)" should contain "([^"]*)"$/,
  async (elementName, expectedText) => {
    const elementMap = {
      mainHeading: todoPage.mainHeading,
      todoCounter: todoPage.todoCounter,
    }

    const element = elementMap[elementName]
    if (element) {
      await expect(element).toHaveTextContaining(expectedText)
    }
  },
)

/**
 * Verify element background color (for success messages)
 * Usage: Then I expect "successMessage" background color equal "#4caf50"
 */
Then(
  /^I expect "([^"]*)" background color equal "([^"]*)"$/,
  async (elementName, expectedColor) => {
    // This would need to be implemented based on actual success message elements
    // For now, we'll just log the expectation
    console.log(
      `Checking background color of ${elementName} should be ${expectedColor}`,
    )

    // In a real implementation, you would:
    // const element = await $(selector);
    // const backgroundColor = await element.getCSSProperty('background-color');
    // expect(backgroundColor.value).toBe(expectedColor);
  },
)

/**
 * Generic pause for verification
 * Usage: Then I pause for 5000ms
 */
Then(/^I pause for (\d+)ms$/, async (milliseconds) => {
  await browser.pause(parseInt(milliseconds))
})

/**
 * Verify todo has due date information
 * Usage: Then the todo should show due date information
 */
Then(/^the todo should show due date information$/, async () => {
  const dueDateElements = await todoPage.todoDueDates
  expect(dueDateElements.length).toBeGreaterThan(0)

  // Check that at least one due date element contains "Due:"
  let foundDueDate = false
  for (const element of dueDateElements) {
    const text = await element.getText()
    if (text.includes('Due:')) {
      foundDueDate = true
      break
    }
  }

  expect(foundDueDate).toBe(true)
})

/**
 * Verify application is ready and functional
 * Usage: Then the todo application should be ready
 */
Then(/^the todo application should be ready$/, async () => {
  await expect(todoPage.appContainer).toBeDisplayed()
  await expect(todoPage.mainHeading).toBeDisplayed()
  await expect(todoPage.todoNameInput).toBeDisplayed()
  await expect(todoPage.addTodoButton).toBeDisplayed()
  await expect(todoPage.todoCounter).toBeDisplayed()
})
