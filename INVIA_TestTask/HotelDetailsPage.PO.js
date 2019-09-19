var hotelDetailsPage = function() {
    var waitAction = require('./CommonAndWaitUtility.js');


    // Page object & locators for hotel details page and Booking page
    var hotelDetailPage_HotelInfo = element(by.id('hotelInfoBox'));
    var hotelDetailPage_FilterBy_DepartureTimeArrival_priceBarlOower = element(by.xpath('//div[@id="departureTimeRange"]//div[contains(@class,"lower")]'));    
    var hotelDetailPage_FilterBy_PriceBarUpper = element(by.xpath('//div[@id="departureTimeRange"]//div[contains(@class,"upper")]')); 
    var hotelDetailPage_FilterBy_DepartureTimeReturnJourney_priceBarlUpper = element(by.xpath('//div[@id="returnTimeRange"]//div[contains(@class,"upper")]'));       
    var hotelDetailPage_FilterBy_DateOFArrival = element(by.xpath('//div[@id="offerFilter-arrival"]/div[2]/label[3]/input'));    
    var hotelDetailPage_OfferSection_DirectFlightOfferList = element.all(by.xpath('//section[@id="skeletonOffers"]/section[4]/article/div/div/div[2]/div/span[contains(text(),"Direktflug")]'));    
    var hotelDetailPage_OfferSection_FirstFlight_FlightDepartureTimeArrival = element(by.xpath('//section[@id="skeletonOffers"]/section[4]/article[1]/div/div[1]/div[1]/div/span[1]'));    
    var hotelDetailPage_OfferSection_FirstFlight_FlightDepartureTimeReturnJourney = element(by.xpath('//section[@id="skeletonOffers"]/section[4]/article[1]/div/div[1]/div[2]/div/span[1]'));    
    var hotelDetailPage_OfferSection_FirstFlight_CheckAvailablitly = element(by.xpath('//section[@id="skeletonOffers"]/section[4]/article[1]/div/div[3]//button')); 
    var hotelDetailPage_OfferSection_FirstFlight_PriceTag = element(by.xpath('//section[@id="skeletonOffers"]/section[4]/article[1]/div/div[3]/div[4]/a')); 
    var hotelDetailPage_OfferSection_FirstFlight_BookingButton = element(by.xpath('//section[@id="skeletonOffers"]/section[4]/article[1]/div/div[3]/a'));    
    var bookingPage_VactionSummary_AccomdationHotelName = element(by.xpath('//section[@id="vacationSummary"]/ul/ol[1]/li[1]/span[2]'));    
    var bookingPage_CustomerDataInfomation = element(by.id('userdataHeader'));


// Page class methods which perfrom operation on the page object and web elemtents

    var waitActionFunction = new waitAction();
    var EC = protractor.ExpectedConditions;  

    // user switch window
    this.userSwitchWindow = function () {
        browser.getAllWindowHandles().then(function(handles){
            browser.switchTo().window(handles[1]).then(function(){
            });
        });   return this;
     };     
     
     // user navigate to Hotel details page
     this.verifyUserNavigateToHotelDetailsPage = function () {
         waitActionFunction.waitTillPageIsReadyState();
         waitActionFunction.waitForElementIsDisplayed(hotelDetailPage_HotelInfo);
    };

     // user set time range for departure and return journey
     // Note : hotelDetailPage_OfferSection_FirstFlight_PriceTag page object has been used to verify that all flights content are loaded sucessufly 
    this.selectDepartureTimeReturnJournyAndDateOfArrival = function () {
        browser.sleep(5000);
        browser.wait(EC.visibilityOf(hotelDetailPage_OfferSection_FirstFlight_PriceTag), 30000);
        browser.wait(EC.elementToBeClickable(hotelDetailPage_OfferSection_FirstFlight_PriceTag), 8000);
        waitActionFunction.waitTillPageIsReadyState();
        browser.executeScript('window.scrollTo(0,1200);');
        browser.wait(EC.visibilityOf(hotelDetailPage_FilterBy_DepartureTimeArrival_priceBarlOower), 10000);
        browser.wait(EC.elementToBeClickable(hotelDetailPage_FilterBy_DepartureTimeArrival_priceBarlOower), 8000);
        browser.sleep(5000);
        browser.actions().dragAndDrop(hotelDetailPage_FilterBy_DepartureTimeReturnJourney_priceBarlUpper, {x: -120, y: 0}).mouseUp().perform();
        browser.wait(EC.visibilityOf(hotelDetailPage_OfferSection_FirstFlight_PriceTag), 10000);
        browser.wait(EC.elementToBeClickable(hotelDetailPage_OfferSection_FirstFlight_PriceTag), 8000);
        browser.actions().dragAndDrop(hotelDetailPage_FilterBy_PriceBarUpper, {x: -30, y: 0}).mouseUp().perform();
        browser.wait(EC.visibilityOf(hotelDetailPage_OfferSection_FirstFlight_PriceTag), 10000);
        browser.wait(EC.elementToBeClickable(hotelDetailPage_OfferSection_FirstFlight_PriceTag), 8000);
        browser.actions().dragAndDrop(hotelDetailPage_FilterBy_DepartureTimeArrival_priceBarlOower, {x: 40, y: 0}).mouseUp().perform();
        browser.wait(EC.visibilityOf(hotelDetailPage_OfferSection_FirstFlight_PriceTag), 10000);
        browser.wait(EC.elementToBeClickable(hotelDetailPage_OfferSection_FirstFlight_PriceTag), 8000);
        waitActionFunction.waitTillPageIsReadyState();
        browser.executeScript("arguments[0].click();", hotelDetailPage_FilterBy_DateOFArrival);
        waitActionFunction.waitTillPageIsReadyState();
        browser.wait(EC.visibilityOf(hotelDetailPage_OfferSection_FirstFlight_PriceTag), 10000);
        browser.wait(EC.elementToBeClickable(hotelDetailPage_OfferSection_FirstFlight_PriceTag), 8000);

        };

    // Print count of available direct flights on first page 
    this.optionsAvailableForDirectFlightsOnFirstPageOfResults = function () {
        hotelDetailPage_OfferSection_DirectFlightOfferList.count().then(function(count) {
                console.log("The direct flights count is ="+count);
              });
   
        }
 
    /* This method consists definition and initialization four variables as per time range given in test task.
    * Extract text for first flight departure and return journey timing 
    * Compare the extracted timing text with defined variables values
    */

        this.verifyFirstFlightFallsWithTheDesiredTimeRange = function () {
           
            browser.wait(EC.visibilityOf(hotelDetailPage_OfferSection_FirstFlight_FlightDepartureTimeArrival), 30000);
            var departureTimeArrival_From= "4:00", departureTimeArrival_TO="21:00";
            var departureTimeReturnJourney_From= "00:00", departureTimeReturnJourney_From_TO="12:00";
            browser.wait(EC.visibilityOf(hotelDetailPage_OfferSection_FirstFlight_PriceTag), 30000);
            browser.wait(EC.elementToBeClickable(hotelDetailPage_OfferSection_FirstFlight_PriceTag), 8000);  
            browser.sleep(10000);  
            var flightDepartureTimeArrival_From = hotelDetailPage_OfferSection_FirstFlight_FlightDepartureTimeArrival.getText().then((text) => {
            
                console.log("The Flighting Timing For Departure Time Arrival="+text)
                var flightDepartureTimeArrival_From_TimeRange = new Array();
                flightDepartureTimeArrival_From_TimeRange=text.split("-");
                var flightDepartureTimeArrival_From_TimeRange_1 = new Array(); 
                flightDepartureTimeArrival_From_TimeRange_1=flightDepartureTimeArrival_From_TimeRange[0].split(":");
                var flightDepartureTimeArrival_From_TimeRange_2 = new Array();
                flightDepartureTimeArrival_From_TimeRange_2=flightDepartureTimeArrival_From_TimeRange[1].split(":");
                var flightDepartureTimeArrival_From_TimeRange_2_1 = new Array();
                flightDepartureTimeArrival_From_TimeRange_2_1=flightDepartureTimeArrival_From_TimeRange_2[1].split(" ");
                var departureTimeArrival_From_1 = new Array(); 
                departureTimeArrival_From_1=departureTimeArrival_From.split(":");
                var departureTimeArrival_TO_1 = new Array(); 
                departureTimeArrival_TO_1=departureTimeArrival_TO.split(":");

        

                if(parseInt(flightDepartureTimeArrival_From_TimeRange_1[0],10)<=parseInt(departureTimeArrival_TO_1[0],10)){
                    console.log("Flight Timing Match")
                    expect("Flight Match").toEqual("Flight Match");
                }
                else{
                    console.log("Flight Timing Not Match")
                    expect("Flight Match").toEqual("Flight Not Match");
                }

                if(parseInt(flightDepartureTimeArrival_From_TimeRange_2_1[0],10)>=parseInt(departureTimeArrival_From_1[0],10)){
                    console.log("Flight Timing Match")
                    expect("Flight Match").toEqual("Flight Match");
                }
                else{
                    console.log("Flight Timing Not Match")
                     expect("Flight Match").toEqual("Flight Not Match");
                }

                if(parseInt(flightDepartureTimeArrival_From_TimeRange_2[0],10)<=parseInt(departureTimeArrival_TO_1[0],10)){
                    console.log("Flight Timing Match")
                    expect("Flight Match").toEqual("Flight Match");
                }
                else{
                    console.log("Flight Timing Not Match")
                   expect("Flight Match").toEqual("Flight Not Match");
                }

                
                return text;
            }) 

            var flightDepartureTimeArrival_TO = hotelDetailPage_OfferSection_FirstFlight_FlightDepartureTimeReturnJourney.getText().then((text) => {
                console.log("The Flighting Timing For Departure Time Return Journey="+text);  
                var flightDepartureTimeArrival_From_TimeRange = new Array();
                flightDepartureTimeArrival_From_TimeRange=text.split("-");
                var flightDepartureTimeArrival_From_TimeRange_1 = new Array(); 
                flightDepartureTimeArrival_From_TimeRange_1=flightDepartureTimeArrival_From_TimeRange[0].split(":");
                var flightDepartureTimeArrival_From_TimeRange_2 = new Array();
                flightDepartureTimeArrival_From_TimeRange_2=flightDepartureTimeArrival_From_TimeRange[1].split(":");
                var flightDepartureTimeArrival_From_TimeRange_2_1 = new Array();
                flightDepartureTimeArrival_From_TimeRange_2_1=flightDepartureTimeArrival_From_TimeRange_2[1].split(" ");
                var departureTimeArrival_From_1 = new Array(); 
                departureTimeArrival_From_1=departureTimeReturnJourney_From.split(":");
                var departureTimeArrival_TO_1 = new Array(); 
                departureTimeArrival_TO_1=departureTimeReturnJourney_From_TO.split(":");               
                if(parseInt(flightDepartureTimeArrival_From_TimeRange_1[0],10)>=parseInt(departureTimeArrival_From_1[0],10)){
                    console.log("Flight Timing Match")
                    expect("Flight Match").toEqual("Flight Match");
                }
                else{
                    console.log("Flight Timing Not Match")
                    expect("Flight Match").toEqual("Flight Not Match");
                }

                if(parseInt(flightDepartureTimeArrival_From_TimeRange_1[0],10)<=parseInt(departureTimeArrival_TO_1[0],10)){
                    console.log("Flight Timing Match")
                    expect("Flight Match").toEqual("Flight Match");
                }
                else{
                    console.log("Flight Timing Not Match")
                    expect("Flight Match").toEqual("Flight Not Match");
                }

                if(parseInt(flightDepartureTimeArrival_From_TimeRange_2_1[0],10)>=parseInt(departureTimeArrival_From_1[0],10)){
                    console.log("Flight Timing Match")
                    expect("Flight Match").toEqual("Flight Match");
                }
                else{
                    console.log("Flight Timing Not Match")
                    expect("Flight Match").toEqual("Flight Not Match");
                }

                if(parseInt(flightDepartureTimeArrival_From_TimeRange_2[0],10)<=parseInt(departureTimeArrival_TO_1[0],10)){
                    console.log("Flight Timing Match")
                    expect("Flight Match").toEqual("Flight Match");
                }
                else{
                    console.log("Flight Timing Not Match")
                    expect("Flight Match").toEqual("Flight Not Match");
                }


                return text;    
        })

        }

        /* Verify user navigate to booking page
         * Verify customer details is displayed
         * Verify hotel at the booking page is the same as the one we selected earlier 
         */
        this.goTOBookingAndVerifyHotelNameOnBookingPage = function () {
            //First check if check availabllity buttion is avaiable, then click it so that user can see the booking button
            if(waitActionFunction.verifyElementIsPresent(hotelDetailPage_OfferSection_FirstFlight_CheckAvailablitly)){
                browser.executeScript("arguments[0].click();", hotelDetailPage_OfferSection_FirstFlight_CheckAvailablitly);
            }
            browser.wait(EC.elementToBeClickable(hotelDetailPage_OfferSection_FirstFlight_BookingButton), 30000);
            browser.executeScript("arguments[0].click();", hotelDetailPage_OfferSection_FirstFlight_BookingButton);
            waitActionFunction.userSwitchWindows();
            browser.sleep(4000);
            waitActionFunction.waitForElementIsDisplayed(bookingPage_CustomerDataInfomation);

            /* Note: Hotel name on hotel seletion and booking might have differnt Text  but in actul, hotels are same.
              So hotel name on booking page have been splitted and stord in array then verified with hotel name on hotel selection page.
              Example : Hotel name on hotel selection page is "Cann Simoneta Hotel & Beach House" and same hotel is diplaying with name "Hotel Can Simoneta" on booking page. 
              Otherwise expect(text).toContain(browser.params.GlobalhotelName) would have worked for us.
            */
            var hotelName = bookingPage_VactionSummary_AccomdationHotelName.getText().then((text) => {
                var accomodation_Name_Text = new Array(); 
                accomodation_Name_Text=text.split(" ");
                for(hotel_Txt=0;hotel_Txt<(accomodation_Name_Text.length)-1;hotel_Txt++){
                    expect((browser.params.GlobalhotelName).toUpperCase()).toContain(accomodation_Name_Text[hotel_Txt].toUpperCase().trim());
                }
                console.log("The Actul Hotel Name On Booking Page ="+text);
                console.log("The Expected Hotel Name From Config File ="+browser.params.GlobalhotelName);

                //expect(text).toContain(browser.params.GlobalhotelName);
            });
   
        }

};

module.exports = hotelDetailsPage