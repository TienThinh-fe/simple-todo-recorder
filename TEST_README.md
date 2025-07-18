# WebdriverIO Testing Setup

## Running Tests

1. Start the development server:

   ```bash
   npm run dev
   ```

2. In another terminal, run the tests:
   ```bash
   npm test
   ```

## Test Structure

- Tests are located in `test/specs/`
- Configuration is in `wdio.conf.js`
- Tests run in headless Chrome by default

## Writing Tests

Tests use WebdriverIO's built-in assertions and selectors:

```javascript
// Basic test structure
describe('My Test Suite', () => {
  it('should do something', async () => {
    await browser.url('/')
    const element = await $('selector')
    await expect(element).toBeDisplayed()
  })
})
```

## Common Selectors

- `$('input')` - Select first input
- `$$('.class')` - Select all elements with class
- `$('#id')` - Select by ID
- `$('button*=text')` - Select button containing text
