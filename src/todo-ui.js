/**
 * Todo UI Management
 * This file handles all the user interface updates and rendering
 * It's responsible for showing the todo list and updating the display
 */

import { getPriorityClass } from './todo-item.js'

/**
 * Renders the entire todo list in the HTML
 * This function clears the current display and shows all todos
 * @param {Array} todos - Array of todo items to display
 * @param {Function} onEdit - Callback function when edit button is clicked
 * @param {Function} onDelete - Callback function when delete button is clicked
 */
export function renderTodoList(todos, onEdit, onDelete) {
  // Get the container where todos will be displayed
  const todoList = document.getElementById('todo-list')

  // Clear any existing content
  todoList.innerHTML = ''

  // If no todos, show a friendly message
  if (todos.length === 0) {
    todoList.innerHTML = `
            <div class="empty-state">
                <p>No todos yet! Add your first todo item above.</p>
            </div>
        `
    return
  }

  // Create HTML for each todo item
  todos.forEach((todo) => {
    const todoElement = createTodoElement(todo, onEdit, onDelete)
    todoList.appendChild(todoElement)
  })

  // Update the counter showing how many todos there are
  updateTodoCounter(todos.length)
}

/**
 * Creates a single todo item HTML element
 * @param {Object} todo - The todo item data
 * @param {Function} onEdit - Callback function for edit action
 * @param {Function} onDelete - Callback function for delete action
 * @returns {HTMLElement} The todo item element
 */
function createTodoElement(todo, onEdit, onDelete) {
  // Create the main container for this todo item
  const todoItem = document.createElement('div')
  todoItem.className = 'todo-item'
  todoItem.setAttribute('data-todo-id', todo.id) // For testing purposes

  // Format the due date to be more readable
  const formattedDate = formatDate(todo.dueDate)

  // Build the HTML content for this todo item
  todoItem.innerHTML = `
        <div class="todo-content">
            <div class="todo-name">${escapeHtml(todo.name)}</div>
            <div class="todo-meta">
                <span class="todo-priority ${getPriorityClass(todo.priority)}">
                    ${capitalize(todo.priority)} Priority
                </span>
                <span class="todo-due-date">Due: ${formattedDate}</span>
            </div>
        </div>
        <div class="todo-actions">
            <button class="btn-edit" data-action="edit" title="Edit this todo">Edit</button>
            <button class="btn-delete" data-action="delete" title="Delete this todo">Delete</button>
        </div>
    `

  // Add event listeners for the action buttons
  const editBtn = todoItem.querySelector('.btn-edit')
  const deleteBtn = todoItem.querySelector('.btn-delete')

  editBtn.addEventListener('click', () => onEdit(todo))
  deleteBtn.addEventListener('click', () => onDelete(todo))

  return todoItem
}

/**
 * Updates the counter showing total number of todos
 * @param {number} count - Number of todos
 */
function updateTodoCounter(count) {
  const counter = document.getElementById('todo-counter')
  if (counter) {
    const text = count === 1 ? '1 todo item' : `${count} todo items`
    counter.textContent = text
  }
}

/**
 * Shows a temporary message to the user (success or error)
 * @param {string} message - The message to show
 * @param {string} type - Type of message: 'success' or 'error'
 */
export function showMessage(message, type = 'success') {
  // Remove any existing message
  const existingMessage = document.querySelector('.message')
  if (existingMessage) {
    existingMessage.remove()
  }

  // Create new message element
  const messageElement = document.createElement('div')
  messageElement.className = `message message-${type}`
  messageElement.textContent = message

  // Add it to the page
  const app = document.getElementById('app')
  app.insertBefore(messageElement, app.firstChild)

  // Remove the message after 3 seconds
  setTimeout(() => {
    if (messageElement.parentNode) {
      messageElement.remove()
    }
  }, 3000)
}

/**
 * Clears the add todo form
 */
export function clearAddForm() {
  document.getElementById('todo-name').value = ''
  document.getElementById('todo-priority').value = 'medium'
  document.getElementById('todo-due-date').value = getCurrentDateString()
}

/**
 * Helper function to format date for display
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date string
 */
function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00') // Prevent timezone issues
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Helper function to capitalize the first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Helper function to escape HTML characters to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

/**
 * Helper function to get current date as string
 * @returns {string} Current date in YYYY-MM-DD format
 */
function getCurrentDateString() {
  const today = new Date()
  return today.toISOString().split('T')[0]
}
