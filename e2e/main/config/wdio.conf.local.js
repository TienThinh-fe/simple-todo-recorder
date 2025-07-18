/**
 * WebDriverIO Configuration for Local Development
 *
 * This configuration extends the main config but with settings
 * optimized for local development and debugging.
 */

import { config as baseConfig } from './wdio.conf.js'

// Clone the base configuration
export const config = {
  ...baseConfig,

  // Override capabilities for local development
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          // Remove --headless for local development to see the browser
          // '--headless',
          '--disable-gpu',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-web-security',
          '--window-size=1920,1080',
          // Add debugging options
          '--auto-open-devtools-for-tabs',
        ],
      },
      acceptInsecureCerts: true,
    },
  ],

  // More verbose logging for development
  logLevel: 'debug',

  // Don't bail on first failure during development
  bail: 0,

  // Longer timeouts for debugging
  waitforTimeout: 30000,
  connectionRetryTimeout: 180000,

  // Cucumber options for development
  cucumberOpts: {
    ...baseConfig.cucumberOpts,

    // Longer timeout for debugging steps
    timeout: 120000,

    // Enable snippets to get step definition suggestions
    snippets: true,

    // More detailed output
    backtrace: true,
  },

  // Additional reporters for development
  reporters: [
    'spec',
    // You can add more reporters here for development
  ],

  // Development-specific hooks
  beforeScenario: function (world, context) {
    const scenarioName = context.pickle.name
    console.log(`\n🎬 [DEV] Starting scenario: ${scenarioName}`)

    // Add a small pause to see what's happening
    // browser.pause(1000);
  },

  afterScenario: function (world, result, context) {
    const scenarioName = context.pickle.name
    const status = result.passed ? '✅ PASSED' : '❌ FAILED'
    console.log(`🏁 [DEV] Scenario "${scenarioName}" ${status}`)

    // Always take screenshot in dev mode for review
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const status_prefix = result.passed ? 'passed' : 'failed'
    const screenshotPath = `./e2e/_results_/screenshots/dev-${status_prefix}-${timestamp}.png`

    try {
      browser.saveScreenshot(screenshotPath)
      console.log(`📷 [DEV] Screenshot saved: ${screenshotPath}`)
    } catch (e) {
      console.log('Could not save screenshot:', e.message)
    }

    // Add pause after each scenario in dev mode to review results
    // Uncomment the line below if you want to pause after each scenario
    // browser.pause(2000);
  },
}
