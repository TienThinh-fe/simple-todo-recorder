/**
 * Todo Item Class
 * This file defines the structure of a todo item and related utility functions
 */

/**
 * Creates a new todo item object with all required fields
 * @param {string} name - The name/title of the todo item
 * @param {string} priority - Priority level: 'high', 'medium', or 'low'
 * @param {string} dueDate - Due date in YYYY-MM-DD format
 * @returns {Object} A new todo item object
 */
export function createTodoItem(name, priority, dueDate) {
  return {
    // Unique identifier for each todo item (timestamp + random number)
    id: Date.now() + Math.random(),
    name: name.trim(), // Remove extra spaces
    priority: priority,
    dueDate: dueDate,
    // Timestamp when the item was created
    createdAt: new Date().toISOString(),
  }
}

/**
 * Gets the current date in YYYY-MM-DD format
 * This is used as the default value for the due date field
 * @returns {string} Current date in YYYY-MM-DD format
 */
export function getCurrentDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0') // Month is 0-indexed
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Validates a todo item to ensure all required fields are present
 * @param {Object} todoItem - The todo item to validate
 * @returns {Object} Validation result with isValid boolean and error message
 */
export function validateTodoItem(todoItem) {
  // Check if name is provided and not empty
  if (!todoItem.name || todoItem.name.trim() === '') {
    return {
      isValid: false,
      error: 'Todo name is required',
    }
  }

  // Check if priority is one of the allowed values
  const validPriorities = ['high', 'medium', 'low']
  if (!validPriorities.includes(todoItem.priority)) {
    return {
      isValid: false,
      error: 'Priority must be high, medium, or low',
    }
  }

  // Check if due date is provided
  if (!todoItem.dueDate) {
    return {
      isValid: false,
      error: 'Due date is required',
    }
  }

  // If all checks pass, item is valid
  return {
    isValid: true,
    error: null,
  }
}

/**
 * Gets the CSS class name for priority styling
 * @param {string} priority - The priority level
 * @returns {string} CSS class name for the priority
 */
export function getPriorityClass(priority) {
  return `priority-${priority}`
}
