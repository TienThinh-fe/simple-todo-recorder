# Simple Todo Recorder

A simple todo list application designed for demonstrating Chrome DevTools Recorder functionality. This app is perfect for creating automated testing flows and learning web automation.

## Features

- **Add Todo Items**: Create new todos with name, priority (High/Medium/Low), and due date
- **Edit Todo Items**: Modify existing todos using a modal dialog
- **Delete Todo Items**: Remove todos with confirmation dialog
- **Local Storage**: All todos are automatically saved to browser's local storage
- **Responsive Design**: Works on desktop and mobile devices
- **Clean UI**: Simple, functional design perfect for testing

## Project Structure

```text
src/
├── main.js          # Main application entry point and coordination
├── todo-item.js     # Todo item creation and validation
├── todo-storage.js  # Local storage management
├── todo-ui.js       # User interface rendering and updates
├── dialogs.js       # Modal dialogs for edit and delete confirmation
└── style.css        # Application styling
```

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Build for production:**

   ```bash
   npm run build
   ```

## For Chrome DevTools Recorder Testing

This application is designed with testing in mind:

- **Clear Element IDs**: All interactive elements have descriptive IDs
- **Data Attributes**: Todo items include `data-todo-id` attributes for targeting
- **Predictable Actions**: Consistent button placement and behavior
- **Dialog Confirmations**: Standard browser confirm dialogs for easy automation
- **Form Validation**: Clear error messages and validation feedback

### Suggested Testing Scenarios

1. **Add Todo Flow:**

   - Fill out the form with name, priority, and due date
   - Click "Add Todo" button
   - Verify todo appears in the list

2. **Edit Todo Flow:**

   - Click "Edit" button on an existing todo
   - Modify values in the modal dialog
   - Click "Save Changes"
   - Verify changes are reflected

3. **Delete Todo Flow:**

   - Click "Delete" button on an existing todo
   - Confirm deletion in the dialog
   - Verify todo is removed from the list

4. **Form Validation:**
   - Try submitting empty form
   - Verify error messages appear

## Code Comments

The code is heavily commented to help beginners and QA testers understand:

- What each function does
- Why certain decisions were made
- How different parts work together
- Browser APIs and concepts used

## Browser Compatibility

- Modern browsers with ES6+ support
- Local Storage support required
- Responsive design works on mobile devices

## Tech Stack

- **Vanilla JavaScript**: No frameworks, pure JavaScript for simplicity
- **Vite**: Fast development build tool
- **CSS3**: Modern styling with flexbox and responsive design
- **Local Storage API**: Browser storage for persistence

This project demonstrates clean, testable code structure perfect for learning web development and test automation.
