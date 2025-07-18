/**
 * Todo Page Object
 *
 * This file contains all the element selectors and basic interactions
 * for the Todo application page. Page objects help keep tests maintainable
 * by centralizing element definitions.
 *
 * How to use:
 * import TodoPage from '../pageObjects/todoPage.js';
 * const todoPage = new TodoPage();
 * await todoPage.todoNameInput.setValue('My new todo');
 */

class TodoPage {
  // Main form elements for creating todos
  get todoNameInput() {
    return $('#todo-name')
  }

  get prioritySelect() {
    return $('#todo-priority')
  }

  get dueDateInput() {
    return $('#todo-due-date')
  }

  get addTodoButton() {
    return $('#add-todo-btn')
  }

  // Todo list and items
  get todoList() {
    return $('.todo-list')
  }

  get todoItems() {
    return $$('.todo-item')
  }

  get todoNames() {
    return $$('.todo-name')
  }

  get todoPriorities() {
    return $$('.todo-priority')
  }

  get todoDueDates() {
    return $$('.todo-due-date')
  }

  // Counter and status elements
  get todoCounter() {
    return $('#todo-counter')
  }

  get mainHeading() {
    return $('h1')
  }

  // Application container
  get appContainer() {
    return $('#app')
  }

  /**
   * Helper method to add a todo with all details
   * @param {string} name - Todo name
   * @param {string} priority - Priority level (low, medium, high)
   * @param {string} dueDate - Due date in YYYY-MM-DD format
   */
  async addTodo(name, priority = 'medium', dueDate = '') {
    await this.todoNameInput.setValue(name)

    if (priority) {
      await this.prioritySelect.selectByAttribute('value', priority)
    }

    if (dueDate) {
      await this.dueDateInput.setValue(dueDate)
    }

    await this.addTodoButton.click()
  }

  /**
   * Helper method to get todo by name
   * @param {string} todoName - Name of the todo to find
   * @returns {WebdriverIO.Element} Todo element
   */
  async getTodoByName(todoName) {
    const todoNames = await this.todoNames

    for (const nameElement of todoNames) {
      const text = await nameElement.getText()
      if (text === todoName) {
        return nameElement.parentElement() // Return the parent todo-item
      }
    }

    throw new Error(`Todo with name "${todoName}" not found`)
  }

  /**
   * Helper method to wait for the page to load
   */
  async waitForPageLoad() {
    await this.appContainer.waitForDisplayed({ timeout: 10000 })
    await this.mainHeading.waitForDisplayed({ timeout: 10000 })
  }

  /**
   * Helper method to get current todo count
   * @returns {number} Number of todos
   */
  async getTodoCount() {
    const counterText = await this.todoCounter.getText()
    const match = counterText.match(/(\d+)/)
    return match ? parseInt(match[1]) : 0
  }
}

export default TodoPage
