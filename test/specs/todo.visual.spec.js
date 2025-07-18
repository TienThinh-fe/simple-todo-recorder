describe('Todo App Visual Tests', () => {
  beforeEach(async () => {
    await browser.url('/')
    // Wait for the app to initialize
    await browser.waitUntil(
      async () => {
        const app = await $('#app')
        return await app.isDisplayed()
      },
      {
        timeout: 10000,
        timeoutMsg: 'App did not load within 10 seconds',
      },
    )

    // Add a small delay to see the page load
    await browser.pause(1000)
  })

  it('should load the todo app (Visual Test)', async () => {
    console.log('📋 Checking if the todo app loads...')

    // Check if the page loads with correct title
    const title = await browser.getTitle()
    expect(title).toContain('Simple Todo Recorder')

    // Check if main heading is present
    const heading = await $('h1')
    await expect(heading).toBeDisplayed()
    const headingText = await heading.getText()
    expect(headingText).toContain('Simple Todo Recorder')

    console.log('✅ App loaded successfully!')
    await browser.pause(1500)
  })

  it('should visually demonstrate adding a todo item', async () => {
    console.log('📝 Demonstrating todo creation...')

    // Fill out the form with visible delays
    const todoNameInput = await $('#todo-name')
    const prioritySelect = await $('#todo-priority')
    const dueDateInput = await $('#todo-due-date')
    const addButton = await $('#add-todo-btn')

    // Highlight the input field
    await todoNameInput.scrollIntoView()
    await browser.pause(500)

    console.log('⌨️  Typing todo name...')
    await todoNameInput.setValue('My Visual Test Todo')
    await browser.pause(1000)

    console.log('📋 Selecting priority...')
    await prioritySelect.selectByAttribute('value', 'high')
    await browser.pause(1000)

    console.log('📅 Setting due date...')
    await dueDateInput.setValue('2025-12-31')
    await browser.pause(1000)

    console.log('🖱️  Clicking add button...')
    await addButton.click()
    await browser.pause(1500)

    // Check if todo was added to the list
    const todoItems = await $$('.todo-item')
    expect(todoItems.length).toBeGreaterThan(0)

    // Check if the todo name appears in the list
    const todoContent = await $('.todo-name')
    await expect(todoContent).toBeDisplayed()
    const todoText = await todoContent.getText()
    expect(todoText).toBe('My Visual Test Todo')

    console.log('✅ Todo created successfully!')

    // Highlight the created todo
    await todoContent.scrollIntoView()
    await browser.pause(2000)
  })

  it('should demonstrate adding multiple todos with different priorities', async () => {
    console.log('📚 Adding multiple todos with different priorities...')

    const todos = [
      { name: 'High Priority Task', priority: 'high', date: '2025-07-20' },
      { name: 'Medium Priority Task', priority: 'medium', date: '2025-07-25' },
      { name: 'Low Priority Task', priority: 'low', date: '2025-07-30' },
    ]

    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i]
      console.log(`📝 Adding ${todo.priority} priority todo: ${todo.name}`)

      const todoNameInput = await $('#todo-name')
      const prioritySelect = await $('#todo-priority')
      const dueDateInput = await $('#todo-due-date')
      const addButton = await $('#add-todo-btn')

      await todoNameInput.setValue(todo.name)
      await browser.pause(500)

      await prioritySelect.selectByAttribute('value', todo.priority)
      await browser.pause(500)

      await dueDateInput.setValue(todo.date)
      await browser.pause(500)

      await addButton.click()
      await browser.pause(1500)

      // Check counter update
      const counter = await $('#todo-counter')
      const counterText = await counter.getText()
      console.log(`📊 Counter now shows: ${counterText}`)
    }

    // Final check - should have at least 3 todos
    const todoItems = await $$('.todo-item')
    expect(todoItems.length).toBeGreaterThanOrEqual(3)

    console.log('✅ All todos created successfully!')
    await browser.pause(3000) // Pause to see final result
  })
})
