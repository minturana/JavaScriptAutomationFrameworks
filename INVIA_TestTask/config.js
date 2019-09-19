exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['TestTaskSpec.js'],
    capabilities: {
        'browserName': 'chrome'
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 5000000
        },
     
    onPrepare: function() {
            browser.manage().window().setSize(1600, 1000);
        },   

        params: {
            GlobalhotelName: ''
        },
        
    directConnect: true,
    onPrepare: function () {
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(5000);
    }

};