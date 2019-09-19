var waitActionUtility = function() {

    var waitTimeout = 120000;
    //wait till specified time
    this.wait = function (value) {
        browser.sleep(value | 2000);
    };


    //wait for element is displayed
    this.waitForElementIsDisplayed = function (element) {
        if (typeof element !== 'undefined') {
            browser.wait(function () {
                return element.isDisplayed();
            }, waitTimeout | 60000);
        }
    };

    //wait for element is not displayed
    this.waitForElementIsNotDisplayed = function (element) {
        if (typeof element !== 'undefined') {
            browser.wait(function () {
                return !element.isDisplayed();
            }, waitTimeout | 60000);
        }
    };

    // Verify element is present in DOM
    this.verifyElementIsPresent= function (element) {
           return element.isPresent();
    };

    // Select value from dropdown for passed parameter
    this.selectValueFromDropDown = function (element, value) {
        if (typeof element !== 'undefined') {
            element.isDisplayed().then(function () {
                element.isEnabled().then(function () {
                    if (typeof value !== 'undefined') {
                        element.$('[label="' + value + '"]').click();
                    }
                    return this;
                });
            });
        }
    };

    //User switch the window
    this.userSwitchWindows = function () {
        browser.getAllWindowHandles().then(function(handles){
            browser.switchTo().window(handles[2]).then(function(){
            });
        });   return this;
     }; 

     //Wait till the time page is loaded
    this.waitTillPageIsReadyState = function (element) {
        browser.executeScript("return document.readyState");
    };

    //Wait for element to display
    this.waitForElementToDisplayed = function (element) {
        browser.wait(function(){
            return element(by.id('identifier1')).isDisplayed();
            }, 2*60*1000);
            
    };
};


module.exports = waitActionUtility
