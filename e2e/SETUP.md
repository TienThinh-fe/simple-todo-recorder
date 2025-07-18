# E2E Testing Setup Instructions

## Quick Setup for E2E Testing

### 1. Install Dependencies

Run this command to install all required testing dependencies:

```bash
npm install @wdio/cucumber-framework @cucumber/cucumber expect-webdriverio --save-dev
```

### 2. Verify Installation

Check if everything is installed correctly:

```bash
npm list @wdio/cucumber-framework
npm list @cucumber/cucumber
npm list expect-webdriverio
```

### 3. Start the Todo Application

Before running tests, make sure your todo application is running:

```bash
npm run dev
```

Keep this terminal open and running!

### 4. Run Your First Test

In a new terminal, run:

```bash
# Run all e2e tests
npm run e2e

# OR run tests with visible browser (recommended for beginners)
npm run e2e:local
```

### 5. Understanding the Output

When tests run, you'll see:

- ✅ Green checkmarks for passing tests
- ❌ Red X marks for failing tests
- Screenshots saved in `e2e/_results_/screenshots/` for failed tests

### 6. Common Commands

```bash
# Run only smoke tests (quick basic tests)
npm run e2e:smoke

# Run regression tests (comprehensive tests)
npm run e2e:regression

# Run specific feature file
npx wdio ./e2e/main/config/wdio.conf.js --spec ./e2e/main/src/features/todo-creation.feature

# Run tests with specific tags
npx wdio ./e2e/main/config/wdio.conf.js --cucumberOpts.tagExpression='@TodoModule'
```

### Troubleshooting

**Problem: "Module not found" errors**

```bash
npm install
```

**Problem: Tests fail immediately**

- Make sure `npm run dev` is running
- Check that the application opens at http://localhost:5173

**Problem: Can't see what's happening**

- Use `npm run e2e:local` instead of `npm run e2e`
- This will show the browser so you can see the tests running

**Problem: Tests are too fast**

- Tests include automatic waits
- You can add more pauses in the test files if needed

### Next Steps

1. Read the `BEGINNER_GUIDE.md` for detailed explanations
2. Look at the feature files in `e2e/main/src/features/`
3. Try modifying existing tests
4. Create your own test scenarios

Happy testing! 🚀
