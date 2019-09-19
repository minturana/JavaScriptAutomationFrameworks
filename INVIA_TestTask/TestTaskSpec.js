var holidayTravelPage = require('./holidayTravelPage.PO.js');
var hotelSelectionPage = require('./HotelSelectionPage.PO.js');
var hotelDetailPage = require('./HotelDetailsPage.PO.js');

var actulPageTitle='Urlaub: Bis 40% Rabatt beim Marktführer | ab-in-den-urlaub.de';
var ort_Land_Region='Sizilien';
var hotelSlectionPageTitle='ab-in-den-urlaub.de';


describe('User Steps For Holiday Travel,Hotel Selection, Details And Booking Page ', function() {
    
    it('User fill the require information on Holiday travel page', function() {
        var holidayTravelHomePage = new holidayTravelPage();   
        console.log("[Info:] User launch the application");
        holidayTravelHomePage.userLaunchTheApplication();
        holidayTravelHomePage.isPageLoaded();
        console.log("[Info:] Verify application page title");
        expect(holidayTravelHomePage.pageTitle()).toEqual(actulPageTitle);
        console.log("lInfo:] User enter the region name");
        holidayTravelHomePage.enterRegion(ort_Land_Region);
        console.log("[Info:] User set the start date");
        holidayTravelHomePage.setStartDate();
        console.log("[Info:] User set the end date");
        holidayTravelHomePage.setEndDate();
        console.log("[Info:] User sumbit the details");
        holidayTravelHomePage.clickSubmitButton();
    });

    it('User select the require information on hotel selection page', function() {
        var hotelSelectPage = new hotelSelectionPage();
        console.log("[Info:] User navigate to hotel selection page");
        hotelSelectPage.verifyUserNavigateToHotelSelectionPage();
        expect(hotelSelectPage.pageTitle()).toEqual(hotelSlectionPageTitle);
        console.log("[Info:] User set the start date");
        hotelSelectPage.selectStartDateOnHolelSelectionPage();
        console.log("[Info:] User set the end date");
        hotelSelectPage.selectEndDateOnHolelSelectionPage();
        console.log("[Info:] User select four star and best rating hotel");
        hotelSelectPage.userSelectFoursStarAndBestRatingHotel();
        console.log("[Info:] User sort the hostel list in decending order based on price");
        hotelSelectPage.sortTheResultInDecendingOrder();
        console.log("[Info:] Verify filters are applied successfully");
        hotelSelectPage.verifyFiltersAreAppliedSucessFully();
        console.log("[Info:] User click move with most expensive Hotel");
        hotelSelectPage.userClickOnMostExpensiveHotel();
    });

    it('User fill the requie info on hotel details page and navigate to booking page', function() {
        var hotelDetailedPage = new hotelDetailPage();
        console.log("[Info:] User navigate to hotel details page");
        hotelDetailedPage.userSwitchWindow();
        hotelDetailedPage.verifyUserNavigateToHotelDetailsPage();
        console.log("[Info:] User select departure time and return journey");
        hotelDetailedPage.selectDepartureTimeReturnJournyAndDateOfArrival();
        console.log("[Info:] Option available for direct flights ");
        hotelDetailedPage.optionsAvailableForDirectFlightsOnFirstPageOfResults();
        console.log("[Info:] Verify first flight falls with in desired time range ");
        hotelDetailedPage.verifyFirstFlightFallsWithTheDesiredTimeRange();
        console.log("[Info:] Go to booking and verify hotel name on booking page ");
        hotelDetailedPage.goTOBookingAndVerifyHotelNameOnBookingPage();
     
    });   
 

  });

