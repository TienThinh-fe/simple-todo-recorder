/**
 * Dialog Utilities
 * This file contains functions to show confirmation and edit dialogs
 * These dialogs provide user interaction for delete confirmation and item editing
 */

/**
 * Shows a confirmation dialog before deleting a todo item
 * @param {string} todoName - Name of the todo item to be deleted
 * @returns {boolean} True if user confirms deletion, false otherwise
 */
export function showDeleteConfirmation(todoName) {
  // Use browser's built-in confirm dialog
  // This is simple but functional for our demo purposes
  const message = `Are you sure you want to delete "${todoName}"?\n\nThis action cannot be undone.`
  return confirm(message)
}

/**
 * Shows an edit dialog for modifying a todo item
 * @param {Object} todoItem - The todo item to edit
 * @returns {Object|null} Updated todo item or null if cancelled
 */
export function showEditDialog(todoItem) {
  // Create a modal dialog using HTML and CSS
  const modal = createEditModal(todoItem)
  document.body.appendChild(modal)

  // Return a promise that resolves when dialog is closed
  return new Promise((resolve) => {
    // Handle save button click
    const saveBtn = modal.querySelector('#save-edit-btn')
    const cancelBtn = modal.querySelector('#cancel-edit-btn')
    const closeBtn = modal.querySelector('.modal-close')

    saveBtn.addEventListener('click', () => {
      const updatedItem = getUpdatedItemFromForm(modal, todoItem)
      closeModal(modal)
      resolve(updatedItem)
    })

    // Handle cancel button click
    cancelBtn.addEventListener('click', () => {
      closeModal(modal)
      resolve(null)
    })

    // Handle close button click
    closeBtn.addEventListener('click', () => {
      closeModal(modal)
      resolve(null)
    })

    // Handle clicking outside the modal to close it
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal)
        resolve(null)
      }
    })
  })
}

/**
 * Creates the HTML structure for the edit modal dialog
 * @param {Object} todoItem - The todo item to edit
 * @returns {HTMLElement} The modal element
 */
function createEditModal(todoItem) {
  const modal = document.createElement('div')
  modal.className = 'modal-overlay'

  modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit Todo Item</h3>
                <button class="modal-close" type="button">&times;</button>
            </div>
            <div class="modal-body">
                <form id="edit-todo-form">
                    <div class="form-group">
                        <label for="edit-name">Todo Name:</label>
                        <input type="text" id="edit-name" value="${
                          todoItem.name
                        }" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-priority">Priority:</label>
                        <select id="edit-priority" required>
                            <option value="high" ${
                              todoItem.priority === 'high' ? 'selected' : ''
                            }>High</option>
                            <option value="medium" ${
                              todoItem.priority === 'medium' ? 'selected' : ''
                            }>Medium</option>
                            <option value="low" ${
                              todoItem.priority === 'low' ? 'selected' : ''
                            }>Low</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="edit-due-date">Due Date:</label>
                        <input type="date" id="edit-due-date" value="${
                          todoItem.dueDate
                        }" required>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" id="cancel-edit-btn" class="btn-secondary">Cancel</button>
                <button type="button" id="save-edit-btn" class="btn-primary">Save Changes</button>
            </div>
        </div>
    `

  return modal
}

/**
 * Extracts the updated todo item data from the edit form
 * @param {HTMLElement} modal - The modal element containing the form
 * @param {Object} originalItem - The original todo item
 * @returns {Object} Updated todo item
 */
function getUpdatedItemFromForm(modal, originalItem) {
  const name = modal.querySelector('#edit-name').value.trim()
  const priority = modal.querySelector('#edit-priority').value
  const dueDate = modal.querySelector('#edit-due-date').value

  // Return updated item with same ID and creation date
  return {
    ...originalItem,
    name: name,
    priority: priority,
    dueDate: dueDate,
  }
}

/**
 * Closes and removes the modal from the page
 * @param {HTMLElement} modal - The modal element to close
 */
function closeModal(modal) {
  // Add closing animation class if you want to animate the close
  modal.classList.add('modal-closing')

  // Remove the modal from the page after a short delay
  setTimeout(() => {
    if (modal.parentNode) {
      modal.parentNode.removeChild(modal)
    }
  }, 150)
}
