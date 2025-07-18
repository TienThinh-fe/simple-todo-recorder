/**
 * When Step Definitions
 *
 * These steps handle actions and interactions with the application.
 * "When" steps typically perform actions like clicking, typing, selecting, etc.
 *
 * Pattern: When I [perform some action]
 */

import { When } from '@wdio/cucumber-framework'
import { expect } from '@wdio/globals'
import TodoPage from '../pageObjects/todoPage.js'
import { PRIORITIES } from '../dataTest/testData.js'

const todoPage = new TodoPage()

/**
 * Set text in an input field
 * Usage: When I set "Buy groceries" to the inputfield "todoNameInput"
 */
When(
  /^I set "([^"]*)" to the inputfield "([^"]*)"$/,
  async (text, fieldName) => {
    // Map field names to actual elements
    const fieldMap = {
      todoNameInput: todoPage.todoNameInput,
      dueDateInput: todoPage.dueDateInput,
    }

    const field = fieldMap[fieldName]
    if (field) {
      await field.setValue(text)
    } else {
      console.warn(`Field "${fieldName}" not found in field map`)
    }
  },
)

/**
 * Click on an element
 * Usage: When I click on the element "addButton"
 */
When(/^I click on the element "([^"]*)"$/, async (elementName) => {
  // Map element names to actual page object elements
  const elementMap = {
    addButton: todoPage.addTodoButton,
    todoNameInput: todoPage.todoNameInput,
    prioritySelect: todoPage.prioritySelect,
    dueDateInput: todoPage.dueDateInput,
  }

  const element = elementMap[elementName]
  if (element) {
    await element.click()
  } else {
    console.warn(`Element "${elementName}" not found in element map`)
  }
})

/**
 * Add a simple todo with just a name
 * Usage: When I add a todo "Buy groceries"
 */
When(/^I add a todo "([^"]*)"$/, async (todoName) => {
  await todoPage.addTodo(todoName)
})

/**
 * Add a todo with specific priority
 * Usage: When I add a todo "Important task" with "high" priority
 */
When(
  /^I add a todo "([^"]*)" with "([^"]*)" priority$/,
  async (todoName, priority) => {
    await todoPage.addTodo(todoName, priority)
  },
)

/**
 * Add a todo with all details
 * Usage: When I add a todo "Task" with "high" priority and due date "2025-12-31"
 */
When(
  /^I add a todo "([^"]*)" with "([^"]*)" priority and due date "([^"]*)"$/,
  async (todoName, priority, dueDate) => {
    await todoPage.addTodo(todoName, priority, dueDate)
  },
)

/**
 * Fill in the todo name field
 * Usage: When I enter "Buy groceries" in the todo name field
 */
When(/^I enter "([^"]*)" in the todo name field$/, async (todoName) => {
  await todoPage.todoNameInput.setValue(todoName)
})

/**
 * Select a priority level
 * Usage: When I select "high" priority
 */
When(/^I select "([^"]*)" priority$/, async (priority) => {
  await todoPage.prioritySelect.selectByAttribute('value', priority)
})

/**
 * Set a due date
 * Usage: When I set the due date to "2025-12-31"
 */
When(/^I set the due date to "([^"]*)"$/, async (dueDate) => {
  await todoPage.dueDateInput.setValue(dueDate)
})

/**
 * Click the add todo button
 * Usage: When I click the add todo button
 */
When(/^I click the add todo button$/, async () => {
  await todoPage.addTodoButton.click()
})

/**
 * Fill in the complete todo form
 * Usage: When I fill in the todo form with "Task name"
 */
When(/^I fill in the todo form with "([^"]*)"$/, async (todoName) => {
  await todoPage.todoNameInput.setValue(todoName)
})

/**
 * Fill in the todo form with all details
 * Usage: When I fill in the todo form with "Task" and "high" priority and "2025-12-31" due date
 */
When(
  /^I fill in the todo form with "([^"]*)" and "([^"]*)" priority and "([^"]*)" due date$/,
  async (todoName, priority, dueDate) => {
    await todoPage.todoNameInput.setValue(todoName)
    await todoPage.prioritySelect.selectByAttribute('value', priority)
    await todoPage.dueDateInput.setValue(dueDate)
  },
)

/**
 * Clear an input field
 * Usage: When I clear the todo name field
 */
When(/^I clear the todo name field$/, async () => {
  await todoPage.todoNameInput.clearValue()
})

/**
 * Wait for an element to be clickable and then click
 * Usage: When I wait for "addButton" to be clickable and click it
 */
When(
  /^I wait for "([^"]*)" to be clickable and click it$/,
  async (elementName) => {
    const elementMap = {
      addButton: todoPage.addTodoButton,
      todoNameInput: todoPage.todoNameInput,
      prioritySelect: todoPage.prioritySelect,
    }

    const element = elementMap[elementName]
    if (element) {
      await element.waitForClickable({ timeout: 10000 })
      await element.click()
    }
  },
)

/**
 * Pause execution for debugging
 * Usage: When I pause for 5000ms
 */
When(/^I pause for (\d+)ms$/, async (milliseconds) => {
  await browser.pause(parseInt(milliseconds))
})

/**
 * Press a keyboard key
 * Usage: When I press "Enter"
 */
When(/^I press "([^"]*)"$/, async (key) => {
  await browser.keys(key)
})

/**
 * Wait for element to be enabled
 * Usage: When I wait on element "addButton" for 60000ms to be enabled
 */
When(
  /^I wait on element "([^"]*)" for (\d+)ms to be enabled$/,
  async (elementName, timeout) => {
    const timeoutMs = parseInt(timeout)

    const elementMap = {
      addButton: todoPage.addTodoButton,
      todoNameInput: todoPage.todoNameInput,
      prioritySelect: todoPage.prioritySelect,
      dueDateInput: todoPage.dueDateInput,
    }

    const element = elementMap[elementName]
    if (element) {
      await element.waitForEnabled({ timeout: timeoutMs })
    }
  },
)

/**
 * Wait for element to be clickable
 * Usage: When I wait on element "addButton" for 60000ms to be clickable
 */
When(
  /^I wait on element "([^"]*)" for (\d+)ms to be clickable$/,
  async (elementName, timeout) => {
    const timeoutMs = parseInt(timeout)

    const elementMap = {
      addButton: todoPage.addTodoButton,
      todoNameInput: todoPage.todoNameInput,
      prioritySelect: todoPage.prioritySelect,
      dueDateInput: todoPage.dueDateInput,
    }

    const element = elementMap[elementName]
    if (element) {
      await element.waitForClickable({ timeout: timeoutMs })
    }
  },
)
