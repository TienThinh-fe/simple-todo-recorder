export const config = {
    // Specify Test Files
    specs: [
        './test/specs/**/*.js'
    ],
    
    // Capabilities for visible testing
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--disable-gpu', 
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--window-size=1280,720'
                // Removed --headless to make browser visible
            ]
        }
    }],
    
    // Test Configuration
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost:5173',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    
    // Framework
    framework: 'mocha',
    reporters: ['spec'],
    
    // Mocha Configuration
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    
    // Add some hooks to slow down actions for better visibility
    beforeTest: function (test, context) {
        console.log(`\n🧪 Starting test: ${test.title}`);
    },
    
    afterTest: function(test, context, { error, result, duration, passed, retries }) {
        if (passed) {
            console.log(`✅ Test passed: ${test.title}`);
        } else {
            console.log(`❌ Test failed: ${test.title}`);
        }
    }
}
