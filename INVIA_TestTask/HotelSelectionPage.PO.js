var holtSelectionPage = function() {
    var waitAction = require('./CommonAndWaitUtility.js');


   // page objects and lcoators for hotel selection page
    var holtelSelectionPage_HotelList = element(by.id('hotelList'));
    var holtelSelectionPage_TravelSearchFilter_EarliestArrival = element(by.css('.datepicker-double-inputs>div[class="datepicker-input-wrapper datepicker-input-wrapper-start"]>div'));
    var latestDeparture = element(by.css('.datepicker-double-inputs>div[class="datepicker-input-wrapper datepicker-input-wrapper-end"]>div'));
    var holtelSelectionPage_TravelSearchFilte_earliestArrival_date = element(by.css('.day.day-13.selected'));
    var holtelSelectionPage_TravelSearchFilte_LatestDeparture_date = element(by.xpath('.//div[@class="month month-9 year-2019"]/table//tr//td[text()="20"]'));
    var holtelSelectionPage_FilterBy_Hotel_FourStars = element(by.css('input[data-name="ab 4 Sternen"]'));
    var holtelSelectionPage_FilterBy_ExcellentRating = element(by.css('label[title="Bewertung Exzellent"]>svg'));
    var holtelSelectionPage_HotelListHeader_Dropdown_HotelSortBy = element(by.id('hotelsorting'));
    var holtelSelectionPage_HotelListTable_HotelPricesList = element.all(by.xpath('//section[@id="hotelList"]/div[3]/article/div[2]/div[3]/div[1]/a//strong'));
    var holtelSelectionPage_HotelListTable_HighesPriceHotelName = element(by.xpath('//h2[@id="hotelname-0"]/a'));
    var holtelSelectionPage_AppliedFilteres_FourStars = element(by.xpath('(//div[@class="hotelFilter-wrapper"]/div[1])[2]'));
    var holtelSelectionPage_AppliedFilteres_Excellent = element(by.xpath('//div[@class="hotelFilter-wrapper"]/div[2]'));

   // Page class methods which perfrom operation on the page object and web elemtents


    var waitActionFunction = new waitAction();
    var EC = protractor.ExpectedConditions;  

    // User navigate to hotel selectin page
    this.verifyUserNavigateToHotelSelectionPage = function () {
        waitActionFunction.waitForElementIsDisplayed(holtelSelectionPage_HotelList);
        return this;
    };

    // Get Page Title
    this.pageTitle = function() {
        return browser.getTitle();
    }; 
      
    // User set the start date
    this.selectStartDateOnHolelSelectionPage = function () {
       holtelSelectionPage_TravelSearchFilter_EarliestArrival.click();
       browser.wait(EC.elementToBeClickable(holtelSelectionPage_TravelSearchFilte_earliestArrival_date), 8000);
       holtelSelectionPage_TravelSearchFilte_earliestArrival_date.click();
       return this;
    };   

    // User set the end date
    this.selectEndDateOnHolelSelectionPage = function () {
       waitActionFunction.waitForElementIsDisplayed(holtelSelectionPage_TravelSearchFilte_LatestDeparture_date); 
       browser.wait(EC.elementToBeClickable(holtelSelectionPage_TravelSearchFilte_LatestDeparture_date), 8000);
       holtelSelectionPage_TravelSearchFilte_LatestDeparture_date.click();
       return this;
    };

    // User select four star and best rating hotel
    this.userSelectFoursStarAndBestRatingHotel = function () {
      waitActionFunction.waitTillPageIsReadyState();
      holtelSelectionPage_FilterBy_Hotel_FourStars.click();
      waitActionFunction.waitTillPageIsReadyState();
      browser.wait(EC.elementToBeClickable(holtelSelectionPage_FilterBy_ExcellentRating), 20000);
      holtelSelectionPage_FilterBy_ExcellentRating.click();
      waitActionFunction.waitTillPageIsReadyState();

      return this;
   };
   
   // Verify filters are applied successfully
    this.verifyFiltersAreAppliedSucessFully = function () {
      waitActionFunction.waitTillPageIsReadyState();
      browser.sleep(2000);
      browser.wait(EC.visibilityOf(holtelSelectionPage_AppliedFilteres_FourStars), 10000);
      browser.wait(EC.visibilityOf(holtelSelectionPage_AppliedFilteres_Excellent), 10000);
      waitActionFunction.waitForElementIsDisplayed(holtelSelectionPage_AppliedFilteres_FourStars);
      waitActionFunction.waitForElementIsDisplayed(holtelSelectionPage_AppliedFilteres_Excellent);
      return this;
    };
     
   /*
   * This function sort the hotel price list in decending order.
   * First sort the price list through sort by functionality available on holel selection page 
   * Then sort the price list through JS sort function
   * And compare both of sorted array.
   * And Verify hotel price list is sorted in deceneding order 
   */
   this.sortTheResultInDecendingOrder = function () {
    var hotelPrice=0;
    var sortedHotelPrieList_JS_Sort = [] , SortedHotelPriceList = [];
    waitActionFunction.waitForElementIsDisplayed(holtelSelectionPage_HotelListHeader_Dropdown_HotelSortBy);
    waitActionFunction.selectValueFromDropDown(holtelSelectionPage_HotelListHeader_Dropdown_HotelSortBy,"Höchster Preis")
    browser.sleep(3000);
    holtelSelectionPage_HotelListTable_HotelPricesList.each(function(element) {
      element.getText().then(function (text) {
        SortedHotelPriceList[hotelPrice]=text;
        sortedHotelPrieList_JS_Sort[hotelPrice]=text;
        console.log("Hotel Price After Sorting="+SortedHotelPriceList[hotelPrice]);
        hotelPrice++;
       });
    }).then(function(){
    sortedHotelPrieList_JS_Sort.sort().reverse();
    console.log("Sorted Hotel price list through JS sort function"+sortedHotelPrieList_JS_Sort)
    console.log("Sorted Hotel price list through sort functionality on hotel selection detail "+SortedHotelPriceList)
    expect(sortedHotelPrieList_JS_Sort).toEqual(SortedHotelPriceList);
  });
    return this;
 };

 //User store the name of hotel and click the most expensive hotel 
 // Global parameter "GlobalhotelName" stores the value of most expensive hotel price
 this.userClickOnMostExpensiveHotel = function (hotelName) { 
     var flightDepartureTimeArrival_TO = holtelSelectionPage_HotelListTable_HighesPriceHotelName.getText().then((text) => {
     hotelName=text;
     browser.params.GlobalhotelName=text;
     console.log("The most expensive hotel found on hotel selection page is ="+browser.params.GlobalhotelName); 
   })
    waitActionFunction.waitTillPageIsReadyState();
    browser.wait(EC.elementToBeClickable(holtelSelectionPage_HotelListTable_HighesPriceHotelName), 30000);
    browser.executeScript("arguments[0].click();", holtelSelectionPage_HotelListTable_HighesPriceHotelName);
};


};
module.exports = holtSelectionPage