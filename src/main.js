/**
 * Main Application File
 * This is the entry point of our Todo App
 * It coordinates all the other modules and handles user interactions
 */

// Import all the modules we created
import {
  createTodoItem,
  getCurrentDate,
  validateTodoItem,
} from './todo-item.js'
import { saveTodos, loadTodos } from './todo-storage.js'
import { showDeleteConfirmation, showEditDialog } from './dialogs.js'
import { renderTodoList, showMessage, clearAddForm } from './todo-ui.js'

/**
 * Main application state
 * This array holds all the todo items in memory
 */
let todos = []

/**
 * Initialize the application when the page loads
 * This function sets up the initial state and event listeners
 */
function initializeApp() {
  console.log('Initializing Todo App...')

  // Load existing todos from local storage
  todos = loadTodos()
  console.log('Loaded todos:', todos)

  // Set up the HTML structure
  setupHTML()

  // Set up event listeners for user interactions
  setupEventListeners()

  // Display the current todos
  renderTodoList(todos, handleEditTodo, handleDeleteTodo)

  // Set default due date to today
  document.getElementById('todo-due-date').value = getCurrentDate()

  console.log('Todo App initialized successfully!')
}

/**
 * Creates the HTML structure for the application
 */
function setupHTML() {
  const app = document.getElementById('app')

  app.innerHTML = `
        <div class="todo-app">
            <header class="app-header">
                <h1>Simple Todo Recorder</h1>
                <p>A demo app for Chrome DevTools Recorder testing</p>
            </header>
            
            <section class="add-todo-section">
                <h2>Add New Todo</h2>
                <form id="add-todo-form" class="add-todo-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="todo-name">Todo Name:</label>
                            <input type="text" id="todo-name" placeholder="Enter todo name..." required>
                        </div>
                        <div class="form-group">
                            <label for="todo-priority">Priority:</label>
                            <select id="todo-priority" required>
                                <option value="high">High</option>
                                <option value="medium" selected>Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="todo-due-date">Due Date:</label>
                            <input type="date" id="todo-due-date" required>
                        </div>
                        <div class="form-group">
                            <button type="submit" id="add-todo-btn" class="btn-primary">Add Todo</button>
                        </div>
                    </div>
                </form>
            </section>
            
            <section class="todo-list-section">
                <div class="list-header">
                    <h2>Your Todos</h2>
                    <span id="todo-counter" class="todo-counter">0 todo items</span>
                </div>
                <div id="todo-list" class="todo-list">
                    <!-- Todo items will be inserted here -->
                </div>
            </section>
        </div>
    `
}

/**
 * Sets up all event listeners for user interactions
 */
function setupEventListeners() {
  // Handle form submission for adding new todos
  const addForm = document.getElementById('add-todo-form')
  addForm.addEventListener('submit', handleAddTodo)

  // Handle Enter key in the name field
  const nameInput = document.getElementById('todo-name')
  nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTodo(e)
    }
  })
}

/**
 * Handles adding a new todo item
 * @param {Event} event - The form submit event
 */
function handleAddTodo(event) {
  // Prevent the form from submitting normally
  event.preventDefault()

  console.log('Adding new todo...')

  // Get values from the form
  const name = document.getElementById('todo-name').value
  const priority = document.getElementById('todo-priority').value
  const dueDate = document.getElementById('todo-due-date').value

  // Create a new todo item
  const newTodo = createTodoItem(name, priority, dueDate)

  // Validate the todo item
  const validation = validateTodoItem(newTodo)
  if (!validation.isValid) {
    showMessage(validation.error, 'error')
    return
  }

  // Add the todo to our list
  todos.push(newTodo)

  // Save to local storage
  saveTodos(todos)

  // Update the display
  renderTodoList(todos, handleEditTodo, handleDeleteTodo)

  // Clear the form
  clearAddForm()

  // Show success message
  showMessage('Todo added successfully!')

  console.log('Todo added:', newTodo)
}

/**
 * Handles editing an existing todo item
 * @param {Object} todoToEdit - The todo item to edit
 */
async function handleEditTodo(todoToEdit) {
  console.log('Editing todo:', todoToEdit)

  try {
    // Show the edit dialog and wait for user input
    const updatedTodo = await showEditDialog(todoToEdit)

    // If user cancelled, do nothing
    if (!updatedTodo) {
      console.log('Edit cancelled by user')
      return
    }

    // Validate the updated todo
    const validation = validateTodoItem(updatedTodo)
    if (!validation.isValid) {
      showMessage(validation.error, 'error')
      return
    }

    // Find and update the todo in our list
    const index = todos.findIndex((todo) => todo.id === todoToEdit.id)
    if (index !== -1) {
      todos[index] = updatedTodo

      // Save to local storage
      saveTodos(todos)

      // Update the display
      renderTodoList(todos, handleEditTodo, handleDeleteTodo)

      // Show success message
      showMessage('Todo updated successfully!')

      console.log('Todo updated:', updatedTodo)
    }
  } catch (error) {
    console.error('Error editing todo:', error)
    showMessage('Error updating todo. Please try again.', 'error')
  }
}

/**
 * Handles deleting a todo item
 * @param {Object} todoToDelete - The todo item to delete
 */
function handleDeleteTodo(todoToDelete) {
  console.log('Attempting to delete todo:', todoToDelete)

  // Show confirmation dialog
  const confirmed = showDeleteConfirmation(todoToDelete.name)

  if (confirmed) {
    // Remove the todo from our list
    todos = todos.filter((todo) => todo.id !== todoToDelete.id)

    // Save to local storage
    saveTodos(todos)

    // Update the display
    renderTodoList(todos, handleEditTodo, handleDeleteTodo)

    // Show success message
    showMessage('Todo deleted successfully!')

    console.log('Todo deleted:', todoToDelete)
  } else {
    console.log('Delete cancelled by user')
  }
}

/**
 * Start the application when the page is loaded
 * We use DOMContentLoaded to ensure the HTML is ready
 */
document.addEventListener('DOMContentLoaded', initializeApp)
