export const config = {
    // Specify Test Files
    specs: [
        './test/specs/**/*.js'
    ],
    
    // Capabilities
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--headless',
                '--disable-gpu', 
                '--no-sandbox',
                '--disable-dev-shm-usage'
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
    }
}
