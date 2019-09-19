var holiTravelPage = function() {
    
    var waitAction = require('./CommonAndWaitUtility.js');

    // Page object on holiday travel page 
    var holidayTravelPage_PackageTravel_LandRegion = element(by.name('idestflat'));
    var holidayTravelPage_PackageTravel_EarliestArival = element(by.xpath('//form/div[1]/div[2]/div/div/div[1]/div'));
    var holidayTravelPage_PackageTravel_EarliestArival_NextMonthIcon = element(by.className('month-button month-button-next icon-arrow-right-bold'));
    var holidayTravelPage_PackageTravel_EarliestArival_6thOCt = element(by.xpath('//form/div[1]/div[2]/div/div/div[3]/div[2]/div/div/div[2]/table/tbody/tr[2]/td[7]'));
    var holidayTravelPage_PackageTravel_LatestDeparture_13thOct = element(by.xpath('//form/div[1]/div[2]/div/div/div[3]/div[2]/div/div/div[2]/table/tbody/tr[3]/td[7]'));
    var holidayTravelPage_PackageTravel_OfferSearch = element(by.id('submit'));
    var holidayDestination_TravelDestination_RegionListHeader = element(by.id('regionList'));
    var holidayDestination_TravelDestination_FirsRow = element(by.xpath('//section/table/tbody[1]/tr[1]/td[5]/a/span/span'));


    // Page class methods which perfrom operation on the page object and web elemtents


    var waitActionFunction = new waitAction();
    
    // User launch https://www.ab-in-den-urlaub.de/ page
    this.userLaunchTheApplication = function() {
      browser.waitForAngularEnabled(false); 
      browser.get('https://www.ab-in-den-urlaub.de');
    };

    // Verify page is loaded completely .
    this.isPageLoaded = function () {
      waitActionFunction.waitTillPageIsReadyState();
      waitActionFunction.waitForElementIsDisplayed(holidayTravelPage_PackageTravel_LandRegion);
      return this;
  };

    // Get Page Title 
    this.pageTitle = function() {
        return browser.getTitle();
      }; 

    // User enter the region name
    this.enterRegion = function(Regionname) {
      waitActionFunction.waitTillPageIsReadyState();
      holidayTravelPage_PackageTravel_LandRegion.sendKeys("Sizilien");
    };

    // User select start date
    this.setStartDate = function() {
      waitActionFunction.waitForElementIsDisplayed(holidayTravelPage_PackageTravel_EarliestArival);
      holidayTravelPage_PackageTravel_EarliestArival.click();
      holidayTravelPage_PackageTravel_EarliestArival_NextMonthIcon.click();
      holidayTravelPage_PackageTravel_EarliestArival_6thOCt.click();
     };

     // User select end date
    this.setEndDate = function() {
      holidayTravelPage_PackageTravel_LatestDeparture_13thOct.click();
     };

     // User submit the details
     this.clickSubmitButton = function() {
      holidayTravelPage_PackageTravel_OfferSearch.click();
      waitActionFunction.waitForElementIsDisplayed(holidayDestination_TravelDestination_RegionListHeader);
      holidayDestination_TravelDestination_FirsRow.click();
      waitActionFunction.waitTillPageIsReadyState();
    };

  
  };

  module.exports = holiTravelPage