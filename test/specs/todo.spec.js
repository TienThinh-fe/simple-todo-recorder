describe('Todo App Basic Tests', () => {
    
    beforeEach(async () => {
        await browser.url('/');
        // Wait for the app to initialize
        await browser.waitUntil(async () => {
            const app = await $('#app');
            return await app.isDisplayed();
        }, {
            timeout: 10000,
            timeoutMsg: 'App did not load within 10 seconds'
        });
    });

    it('should load the todo app', async () => {
        // Check if the page loads with correct title
        const title = await browser.getTitle();
        expect(title).toContain('Simple Todo Recorder');
        
        // Check if main heading is present
        const heading = await $('h1');
        await expect(heading).toBeDisplayed();
        const headingText = await heading.getText();
        expect(headingText).toContain('Simple Todo Recorder');
    });

    it('should have todo input field and form elements', async () => {
        // Check if todo name input exists
        const todoNameInput = await $('#todo-name');
        await expect(todoNameInput).toBeDisplayed();
        
        // Check if priority select exists
        const prioritySelect = await $('#todo-priority');
        await expect(prioritySelect).toBeDisplayed();
        
        // Check if due date input exists
        const dueDateInput = await $('#todo-due-date');
        await expect(dueDateInput).toBeDisplayed();
        
        // Check if add button exists
        const addButton = await $('#add-todo-btn');
        await expect(addButton).toBeDisplayed();
    });

    it('should be able to add a todo item', async () => {
        // Fill out the form
        const todoNameInput = await $('#todo-name');
        const prioritySelect = await $('#todo-priority');
        const dueDateInput = await $('#todo-due-date');
        const addButton = await $('#add-todo-btn');
        
        await todoNameInput.setValue('Test todo item');
        await prioritySelect.selectByAttribute('value', 'high');
        await dueDateInput.setValue('2025-12-31');
        await addButton.click();
        
        // Check if todo was added to the list
        const todoItems = await $$('.todo-item');
        expect(todoItems.length).toBeGreaterThan(0);
        
        // Check if the todo name appears in the list
        const todoContent = await $('.todo-name');
        await expect(todoContent).toBeDisplayed();
        const todoText = await todoContent.getText();
        expect(todoText).toBe('Test todo item');
    });

    it('should display todo with correct priority and due date', async () => {
        const todoNameInput = await $('#todo-name');
        const prioritySelect = await $('#todo-priority');
        const dueDateInput = await $('#todo-due-date');
        const addButton = await $('#add-todo-btn');
        
        await todoNameInput.setValue('High Priority Task');
        await prioritySelect.selectByAttribute('value', 'high');
        await dueDateInput.setValue('2025-12-25');
        await addButton.click();
        
        // Check priority display
        const priorityElement = await $('.todo-priority');
        await expect(priorityElement).toBeDisplayed();
        const priorityText = await priorityElement.getText();
        expect(priorityText.toUpperCase()).toContain('HIGH PRIORITY');
        
        // Check due date display
        const dueDateElement = await $('.todo-due-date');
        await expect(dueDateElement).toBeDisplayed();
        const dueDateText = await dueDateElement.getText();
        expect(dueDateText).toContain('Due:');
    });

    it('should update todo counter when adding items', async () => {
        // Get initial counter value (may not be 0 due to previous tests)
        const counter = await $('#todo-counter');
        const initialCounterText = await counter.getText();
        const initialCount = parseInt(initialCounterText.match(/\d+/)[0]);
        
        // Add a todo
        const todoNameInput = await $('#todo-name');
        const addButton = await $('#add-todo-btn');
        
        await todoNameInput.setValue('Counter test todo');
        await addButton.click();
        
        // Check updated counter (should be initial + 1)
        const expectedCount = initialCount + 1;
        const expectedText = expectedCount === 1 ? '1 todo item' : `${expectedCount} todo items`;
        
        await browser.waitUntil(async () => {
            const counterText = await counter.getText();
            return counterText.includes(expectedText);
        }, {
            timeout: 5000,
            timeoutMsg: `Counter did not update to "${expectedText}" within 5 seconds`
        });
    });
});
