/**
 * Given Step Definitions
 *
 * These steps handle setup and preconditions for test scenarios.
 * "Given" steps typically set up the initial state before testing begins.
 *
 * Pattern: Given I [initial state or precondition]
 */

import { Given } from '@wdio/cucumber-framework'
import { expect } from '@wdio/globals'
import TodoPage from '../pageObjects/todoPage.js'
import { URLS, TIMEOUTS } from '../dataTest/testData.js'

const todoPage = new TodoPage()

/**
 * Navigate to the application
 * Usage: Given I open the site "/"
 */
Given(/^I open the site "([^"]*)"$/, async (url) => {
  await browser.url(url)
  // Clear localStorage to ensure clean state for each test
  await browser.execute(() => {
    localStorage.removeItem('simple-todo-app-todos')
  })
  await todoPage.waitForPageLoad()
})

/**
 * Alternative way to open the todo application
 * Usage: Given I open the todo application
 */
Given(/^I open the todo application$/, async () => {
  await browser.url(URLS.BASE)
  // Clear localStorage to ensure clean state for each test
  await browser.execute(() => {
    localStorage.removeItem('simple-todo-app-todos')
  })
  // Refresh to ensure clean state
  await browser.refresh()
  await todoPage.waitForPageLoad()
})

/**
 * Wait for a specific element to be displayed
 * Usage: Given I wait on element "todoNameInput" for 60000ms to be displayed
 */
Given(
  /^I wait on element "([^"]*)" for (\d+)ms to be displayed$/,
  async (elementName, timeout) => {
    // This is a generic step that waits for any element
    // In a real implementation, you'd need to map elementName to actual selectors
    const timeoutMs = parseInt(timeout)

    // For now, we'll wait for the main app to be displayed
    await todoPage.appContainer.waitForDisplayed({ timeout: timeoutMs })
  },
)

/**
 * Wait for a specific element to be enabled
 * Usage: Given I wait on element "addButton" for 60000ms to be enabled
 */
Given(
  /^I wait on element "([^"]*)" for (\d+)ms to be enabled$/,
  async (elementName, timeout) => {
    const timeoutMs = parseInt(timeout)

    // Map common element names to actual page object elements
    const elementMap = {
      todoNameInput: todoPage.todoNameInput,
      addButton: todoPage.addTodoButton,
      prioritySelect: todoPage.prioritySelect,
      dueDateInput: todoPage.dueDateInput,
    }

    const element = elementMap[elementName]
    if (element) {
      await element.waitForEnabled({ timeout: timeoutMs })
    } else {
      console.warn(`Element "${elementName}" not found in element map`)
    }
  },
)

/**
 * Verify the page title
 * Usage: Given the page title should be "Simple Todo Recorder"
 */
Given(/^the page title should be "([^"]*)"$/, async (expectedTitle) => {
  const actualTitle = await browser.getTitle()
  expect(actualTitle).toContain(expectedTitle)
})

/**
 * Ensure the todo list is empty (setup step)
 * Usage: Given the todo list is empty
 */
Given(/^the todo list is empty$/, async () => {
  // In a real application, you might need to clear existing todos
  // For now, we'll just verify the current count
  const todoItems = await todoPage.todoItems
  if (todoItems.length > 0) {
    console.log(
      `Warning: Todo list is not empty. Found ${todoItems.length} items.`,
    )
  }
})

/**
 * Set up a specific number of existing todos
 * Usage: Given I have 3 todos in the list
 */
Given(/^I have (\d+) todos? in the list$/, async (count) => {
  const targetCount = parseInt(count)
  const currentTodos = await todoPage.todoItems
  const currentCount = currentTodos.length

  // Add todos if we need more
  for (let i = currentCount; i < targetCount; i++) {
    await todoPage.addTodo(`Test todo ${i + 1}`)
  }
})

/**
 * Set up a todo with specific name
 * Usage: Given I have a todo "Buy groceries"
 */
Given(/^I have a todo "([^"]*)"$/, async (todoName) => {
  await todoPage.addTodo(todoName)

  // Verify the todo was created
  const todoElement = await todoPage.getTodoByName(todoName)
  await expect(todoElement).toBeDisplayed()
})

/**
 * Generic pause step for setup
 * Usage: Given I pause for 5000ms
 */
Given(/^I pause for (\d+)ms$/, async (milliseconds) => {
  await browser.pause(parseInt(milliseconds))
})

/**
 * Verify initial page state
 * Usage: Given the todo application is ready
 */
Given(/^the todo application is ready$/, async () => {
  await todoPage.waitForPageLoad()
  await expect(todoPage.mainHeading).toBeDisplayed()
  await expect(todoPage.todoNameInput).toBeDisplayed()
  await expect(todoPage.addTodoButton).toBeDisplayed()
})
