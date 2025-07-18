/**
 * WebDriverIO Configuration for Cucumber/Gherkin
 * This configuration file sets up WebDriverIO to run Cucumber-based
 * automation tests. It includes settings for browser, timeouts,
 * reporting, and test execution.
 */

import path from 'path'
import { fileURLToPath } from 'url'

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const config = {
  // Test Runner Configuration
  runner: 'local',

  // Specify Test Files - Use absolute paths for better reliability
  specs: [path.join(__dirname, '../src/features/**/*.feature')],

  // Patterns to exclude
  exclude: [],

  // Browser Capabilities
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          // Comment out --headless to see the browser during test development
          '--headless',
          '--disable-gpu',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-web-security',
          '--window-size=1920,1080',
        ],
      },
      acceptInsecureCerts: true,
    },
  ],

  // Test Configuration
  logLevel: 'info',
  bail: 0,
  baseUrl: 'http://localhost:5173',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  // Services
  services: [],

  // Framework Configuration - Using Cucumber
  framework: 'cucumber',

  // Cucumber Options - Use absolute paths for step definitions
  cucumberOpts: {
    // Require step definition files
    require: [
      path.join(__dirname, '../src/steps/given.js'),
      path.join(__dirname, '../src/steps/when.js'),
      path.join(__dirname, '../src/steps/then.js'),
    ],
    // Show full backtrace for errors
    backtrace: false,
    // Require modules before executing features
    requireModule: [],
    // Only execute scenarios with these tags
    // Example: '@smoke' or '@regression' or '@smoke or @regression'
    tagExpression: '',
    // Fail if there are any undefined or pending steps
    failOnUndefined: false,
    // Name for the feature
    names: [],
    // Only execute scenarios matching this regex
    snippets: true,
    // Show source when reporting step definitions
    source: true,
    // Specify a profile to use
    profile: [],
    // Timeout for step definitions (60 seconds)
    timeout: 60000,
    // Enable colors in output
    colors: true,
  },

  // Test Reporters
  reporters: [
    'spec',
    // Uncomment below for Allure reports
    // ['allure', {
    //   outputDir: './e2e/_results_/allure-raw',
    //   disableWebdriverStepsReporting: false,
    //   disableWebdriverScreenshotsReporting: false,
    // }]
  ],

  // Hooks
  /**
   * Gets executed once before all workers get launched
   */
  onPrepare: function (config, capabilities) {
    console.log('🚀 Starting Cucumber E2E Tests...')
  },

  /**
   * Gets executed before a worker process is spawned
   */
  onWorkerStart: function (cid, caps, specs, args, execArgv) {
    console.log(`Worker ${cid} started`)
  },

  /**
   * Gets executed just before initialising the webdriver session
   */
  beforeSession: function (config, capabilities, specs, cid) {
    console.log('Setting up browser session...')
  },

  /**
   * Gets executed before test execution begins
   */
  before: function (capabilities, specs) {
    // Set implicit wait timeout
    browser.setTimeout({ implicit: 10000 })

    console.log('🎭 Browser session ready for testing')
  },

  /**
   * Hook that gets executed before each Cucumber scenario
   */
  beforeScenario: function (world, context) {
    const scenarioName = context.pickle?.name || 'Unknown scenario'
    console.log(`\n🎬 Starting scenario: ${scenarioName}`)
  },

  /**
   * Hook that gets executed after each Cucumber scenario
   */
  afterScenario: function (world, result, context) {
    const scenarioName = context.pickle?.name || 'Unknown scenario'
    const status = result.passed ? '✅ PASSED' : '❌ FAILED'
    console.log(`🏁 Scenario "${scenarioName}" ${status}`)

    // Skip screenshot for now to avoid crashes
    if (!result.passed) {
      console.log(`❌ Scenario failed: ${scenarioName}`)
    }
  },

  /**
   * Gets executed after all tests are done
   */
  after: function (result, capabilities, specs) {
    console.log('🧹 Cleaning up browser session...')
  },

  /**
   * Gets executed after all workers got shut down
   */
  onComplete: function (exitCode, config, capabilities, results) {
    const totalTests = results.failed + results.passed
    console.log('\n📊 Test Execution Summary:')
    console.log(`Total scenarios: ${totalTests}`)
    console.log(`✅ Passed: ${results.passed}`)
    console.log(`❌ Failed: ${results.failed}`)
    console.log(`🏁 Tests completed with exit code: ${exitCode}`)
  },

  /**
   * Gets executed when an error happens, good place to take a screenshot
   */
  onError: function (error, context) {
    console.log('💥 An error occurred:', error.message)
    // Skip screenshot for now to avoid crashes
  },
}
