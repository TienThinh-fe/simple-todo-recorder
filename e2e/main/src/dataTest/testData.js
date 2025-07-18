/**
 * Test Data Constants
 *
 * This file contains all the test data used across different test scenarios.
 * Keeping test data centralized makes it easier to maintain and update.
 */

// Common test todo items
export const TEST_TODOS = {
  SIMPLE: 'Buy groceries',
  HIGH_PRIORITY: 'Important meeting preparation',
  WITH_DATE: 'Submit project report',
  LONG_NAME:
    'This is a very long todo item name that tests how the application handles longer text content',
  SPECIAL_CHARS: 'Todo with special chars: @#$%^&*()',
  EMPTY: '',
  SPACES_ONLY: '   ',
}

// Priority levels
export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
}

// Common dates for testing
export const TEST_DATES = {
  TODAY: new Date().toISOString().split('T')[0],
  TOMORROW: new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0],
  NEXT_WEEK: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0],
  PAST_DATE: '2020-01-01',
  FUTURE_DATE: '2030-12-31',
}

// Expected messages and text
export const EXPECTED_MESSAGES = {
  SINGLE_TODO: '1 todo item',
  MULTIPLE_TODOS: (count) => `${count} todo items`,
  PAGE_TITLE: 'Simple Todo Recorder',
  MAIN_HEADING: 'Simple Todo Recorder',
}

// Timeouts for different operations (in milliseconds)
export const TIMEOUTS = {
  SHORT: 5000, // For quick operations
  MEDIUM: 10000, // For normal operations
  LONG: 30000, // For slow operations
  ELEMENT_WAIT: 60000, // For waiting for elements (matching your example)
}

// Application URLs and paths
export const URLS = {
  BASE: '/',
  LOCAL: 'http://localhost:5173',
}

// Test scenarios data
export const SCENARIOS = {
  CREATE_TODO: {
    name: 'Automation test todo',
    priority: PRIORITIES.HIGH,
    dueDate: TEST_DATES.TOMORROW,
  },
  EDIT_TODO: {
    original: 'Original todo name',
    updated: 'Updated todo name',
  },
  MULTIPLE_TODOS: [
    { name: 'First todo', priority: PRIORITIES.LOW },
    { name: 'Second todo', priority: PRIORITIES.MEDIUM },
    { name: 'Third todo', priority: PRIORITIES.HIGH },
  ],
}

export default {
  TEST_TODOS,
  PRIORITIES,
  TEST_DATES,
  EXPECTED_MESSAGES,
  TIMEOUTS,
  URLS,
  SCENARIOS,
}
