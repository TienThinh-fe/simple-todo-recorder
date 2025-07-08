/**
 * Todo Storage Module
 * This file handles saving and loading todo items from browser's local storage
 * Local storage allows data to persist even after closing the browser
 */

// Key name used to store todos in local storage
const STORAGE_KEY = 'simple-todo-app-todos'

/**
 * Saves the todo list to local storage
 * @param {Array} todos - Array of todo objects to save
 */
export function saveTodos(todos) {
  try {
    // Convert JavaScript object to JSON string for storage
    const todosJson = JSON.stringify(todos)
    localStorage.setItem(STORAGE_KEY, todosJson)
    console.log('Todos saved to local storage')
  } catch (error) {
    console.error('Error saving todos:', error)
  }
}

/**
 * Loads the todo list from local storage
 * @returns {Array} Array of todo objects, empty array if nothing stored
 */
export function loadTodos() {
  try {
    // Get the JSON string from local storage
    const todosJson = localStorage.getItem(STORAGE_KEY)

    // If nothing stored, return empty array
    if (!todosJson) {
      return []
    }

    // Convert JSON string back to JavaScript object
    const todos = JSON.parse(todosJson)
    console.log('Todos loaded from local storage')
    return todos
  } catch (error) {
    console.error('Error loading todos:', error)
    return [] // Return empty array if error occurs
  }
}

/**
 * Clears all todos from local storage
 * Useful for testing or reset functionality
 */
export function clearTodos() {
  localStorage.removeItem(STORAGE_KEY)
  console.log('Todos cleared from local storage')
}
