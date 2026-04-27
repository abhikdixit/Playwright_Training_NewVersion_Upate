import { test, expect } from '@playwright/test';
import { BlazeDemoFlightPage } from '../../page-objects/BlazeDemoFlightPage';

test.describe('BlazeDemo Flight Booking - End to End Tests', () => {
  let flightPage: BlazeDemoFlightPage;

  test.beforeEach(async ({ page }) => {
    flightPage = new BlazeDemoFlightPage(page);
  });

  test('TC001: Should display all available departure cities on home page', async ({ page }) => {
    flightPage = new BlazeDemoFlightPage(page);
    await flightPage.visit();

    const departureCities = await flightPage.getAvailableDepartureCities();
    console.log('Available Departure Cities:', departureCities);

    expect(departureCities.length).toBeGreaterThan(0);
    expect(departureCities).toContain('Boston');
    expect(departureCities).toContain('New York');
  });

  test('TC002: Should display all available destination cities on home page', async ({ page }) => {
    flightPage = new BlazeDemoFlightPage(page);
    await flightPage.visit();

    const destinationCities = await flightPage.getAvailableDestinationCities();
    console.log('Available Destination Cities:', destinationCities);

    expect(destinationCities.length).toBeGreaterThan(0);
    expect(destinationCities).toContain('Paris');
    expect(destinationCities).toContain('London');
  });

  test('TC003: Should select departure and destination cities from dropdown', async ({ page }) => {
    flightPage = new BlazeDemoFlightPage(page);
    await flightPage.visit();

    // Select Boston as departure city
    await flightPage.selectDepartureCity('Boston');

    // Select Paris as destination city
    await flightPage.selectDestinationCity('Paris');

    // Verify selections
    const departureValue = await flightPage.departureDropdown.inputValue();
    const destinationValue = await flightPage.destinationDropdown.inputValue();

    expect(departureValue).toBe('Boston');
    expect(destinationValue).toBe('Paris');
  });

  test('TC004: Should navigate to flights page after selecting cities and clicking Find Flights', async ({ page }) => {
    flightPage = new BlazeDemoFlightPage(page);
    await flightPage.visit();

    // Select cities
    await flightPage.selectDepartureCity('Boston');
    await flightPage.selectDestinationCity('London');

    // Click Find Flights
    await flightPage.clickFindFlights();

    // Verify that we are on the flights page
    const pageTitle = await page.title();
    console.log('Page Title:', pageTitle);

    // Verify flight options are displayed
    const flightOptions = page.locator('table tbody tr');
    expect(await flightOptions.count()).toBeGreaterThan(0);
  });

  test('TC005: Complete end-to-end flight booking with all required steps', async ({ page }) => {
    flightPage = new BlazeDemoFlightPage(page);

    // Test data
    const departureCity = 'Boston';
    const destinationCity = 'Paris';
    const firstName = 'John';
    const lastName = 'Doe';
    const cardNumber = '4111111111111111';
    const cardMonth = '12';
    const cardYear = '2025';
    const nameOnCard = 'John Doe';

    // Execute complete booking flow
    await flightPage.completeBooking(
      departureCity,
      destinationCity,
      firstName,
      lastName,
      cardNumber,
      cardMonth,
      cardYear,
      nameOnCard
    );

    // Verify booking confirmation
    const isConfirmed = await flightPage.verifyBookingConfirmation();
    expect(isConfirmed).toBe(true);

    // Print confirmation details
    const confirmationNumber = await flightPage.getConfirmationNumber();
    console.log('Booking Confirmation:', confirmationNumber);

    // Verify confirmation message on page
    await expect(page.locator('h1:has-text("Thank you")')).toBeVisible();
  });

  test('TC006: Complete booking from New York to London', async ({ page }) => {
    flightPage = new BlazeDemoFlightPage(page);

    const testData = {
      departureCity: 'New York',
      destinationCity: 'London',
      firstName: 'Jane',
      lastName: 'Smith',
      cardNumber: '5555555555554444',
      cardMonth: '06',
      cardYear: '2026',
      nameOnCard: 'Jane Smith'
    };

    await flightPage.completeBooking(
      testData.departureCity,
      testData.destinationCity,
      testData.firstName,
      testData.lastName,
      testData.cardNumber,
      testData.cardMonth,
      testData.cardYear,
      testData.nameOnCard
    );

    const isConfirmed = await flightPage.verifyBookingConfirmation();
    expect(isConfirmed).toBe(true);
    console.log('✓ Booking from New York to London completed successfully');
  });

  test('TC007: Complete booking from San Diego to Berlin', async ({ page }) => {
    flightPage = new BlazeDemoFlightPage(page);

    const testData = {
      departureCity: 'San Diego',
      destinationCity: 'Berlin',
      firstName: 'Michael',
      lastName: 'Johnson',
      cardNumber: '378282246310005',
      cardMonth: '03',
      cardYear: '2025',
      nameOnCard: 'Michael Johnson'
    };

    await flightPage.completeBooking(
      testData.departureCity,
      testData.destinationCity,
      testData.firstName,
      testData.lastName,
      testData.cardNumber,
      testData.cardMonth,
      testData.cardYear,
      testData.nameOnCard
    );

    const isConfirmed = await flightPage.verifyBookingConfirmation();
    expect(isConfirmed).toBe(true);
    console.log('✓ Booking from San Diego to Berlin completed successfully');
  });

  test('TC008: Should select cheapest flight from available options', async ({ page }) => {
    flightPage = new BlazeDemoFlightPage(page);
    await flightPage.visit();

    // Select cities
    await flightPage.selectDepartureCity('Boston');
    await flightPage.selectDestinationCity('Paris');
    await flightPage.clickFindFlights();

    // Select the cheapest flight
    await flightPage.selectCheapestFlight();

    // Verify the flight is selected (a radio button should be checked)
    const checkedRadio = page.locator('input[type="radio"]:checked');
    expect(await checkedRadio.count()).toBeGreaterThan(0);

    console.log('✓ Cheapest flight successfully selected');
  });

  test('TC009: Verify page title and URL after navigation', async ({ page }) => {
    flightPage = new BlazeDemoFlightPage(page);
    await flightPage.visit();

    // Verify initial page elements
    expect(page.url()).toContain('blazedemo.com');

    // Select cities and find flights
    await flightPage.selectDepartureCity('Boston');
    await flightPage.selectDestinationCity('London');
    await flightPage.clickFindFlights();

    // Verify page changed
    expect(page.url()).toContain('reserve.php');

    console.log('✓ URL verification passed');
  });

  test('TC010: Validate form fields on passenger details page', async ({ page }) => {
    flightPage = new BlazeDemoFlightPage(page);
    await flightPage.visit();

    // Navigate to passenger details
    await flightPage.selectDepartureCity('New York');
    await flightPage.selectDestinationCity('Berlin');
    await flightPage.clickFindFlights();
    await flightPage.selectFirstFlight();

    // Verify passenger form is displayed and has required fields
    expect(await flightPage.firstNameInput.isVisible()).toBe(true);
    expect(await flightPage.lastNameInput.isVisible()).toBe(true);
    expect(await flightPage.creditCardInput.isVisible()).toBe(true);
    expect(await flightPage.nameOnCardInput.isVisible()).toBe(true);

    console.log('✓ All required form fields are visible on passenger details page');
  });
});
