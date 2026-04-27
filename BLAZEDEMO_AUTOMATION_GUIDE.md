# BlazeDemo Flight Booking - Automation Guide

## Overview
This automation suite provides end-to-end testing for the BlazeDemo flight booking website (https://blazedemo.com/). The suite includes complete booking workflows from city selection to payment confirmation.

## Project Structure

```
├── page-objects/
│   └── BlazeDemoFlightPage.ts          # Page Object Model for flight booking
├── tests/WEBORDER/
│   └── BalzeDemo_Flight.spec.ts        # End-to-end test scenarios
└── testData/
    └── BlazeDemoTestData.json          # Test data and scenarios
```

## Features Automated

### 1. **Home Page - City Selection**
- Select departure city from dropdown
- Select destination city from dropdown
- View all available cities
- Click "Find Flights" button

### 2. **Flight Selection Page**
- View available flight options with prices
- Select first available flight
- Select cheapest flight
- View flight details (airline, departure time, price)

### 3. **Passenger Details & Payment Page**
- Enter passenger first name
- Enter passenger last name
- Enter credit card number
- Enter card expiry month
- Enter card expiry year
- Enter name on card
- Click "Purchase Flight" button

### 4. **Confirmation Page**
- Verify booking confirmation message
- Extract confirmation number
- Verify booking success

## Page Object Methods

### BlazeDemoFlightPage Class

#### Navigation Methods
```typescript
async visit(): Promise<void>
// Navigate to https://blazedemo.com/
```

#### City Selection Methods
```typescript
async selectDepartureCity(city: string): Promise<void>
// Select departure city from dropdown

async selectDestinationCity(city: string): Promise<void>
// Select destination city from dropdown

async getAvailableDepartureCities(): Promise<string[]>
// Get list of all available departure cities

async getAvailableDestinationCities(): Promise<string[]>
// Get list of all available destination cities
```

#### Flight Search Methods
```typescript
async clickFindFlights(): Promise<void>
// Click Find Flights button and navigate to flight selection page

async selectFirstFlight(): Promise<void>
// Select the first available flight

async selectCheapestFlight(): Promise<void>
// Select the cheapest flight based on price comparison
```

#### Passenger & Payment Methods
```typescript
async fillPassengerDetails(firstName: string, lastName: string): Promise<void>
// Fill passenger first and last names

async fillCreditCardDetails(
  cardNumber: string,
  month: string,
  year: string,
  nameOnCard: string
): Promise<void>
// Fill all credit card details

async clickPurchaseButton(): Promise<void>
// Click Purchase Flight button
```

#### Confirmation Methods
```typescript
async verifyBookingConfirmation(): Promise<boolean>
// Verify if booking confirmation page is displayed

async getConfirmationNumber(): Promise<string>
// Extract confirmation number from confirmation page
```

#### Complete Booking Flow
```typescript
async completeBooking(
  departureCity: string,
  destinationCity: string,
  firstName: string,
  lastName: string,
  cardNumber: string,
  cardMonth: string,
  cardYear: string,
  nameOnCard: string
): Promise<void>
// Execute complete end-to-end booking process
```

## Test Scenarios

### TC001: Display Departure Cities
Verifies all available departure cities are displayed on home page.

### TC002: Display Destination Cities
Verifies all available destination cities are displayed on home page.

### TC003: Select Cities from Dropdown
Validates city selection from dropdown menus.

### TC004: Navigation to Flights Page
Verifies successful navigation to flights page after city selection.

### TC005: Complete End-to-End Booking
Full booking flow from Boston to Paris:
- Departure: Boston
- Destination: Paris
- Passenger: John Doe
- Card: 4111111111111111

### TC006: New York to London Booking
Complete booking with alternative route and passenger details.

### TC007: San Diego to Berlin Booking
Another complete booking scenario with different cities.

### TC008: Select Cheapest Flight
Validates the logic to identify and select the cheapest flight option.

### TC009: Verify URL Navigation
Confirms URL changes throughout the booking process.

### TC010: Validate Passenger Form
Ensures all required form fields are present on passenger details page.

## Running Tests

### Run All Tests
```bash
npx playwright test tests/WEBORDER/BalzeDemo_Flight.spec.ts
```

### Run Specific Test
```bash
npx playwright test tests/WEBORDER/BalzeDemo_Flight.spec.ts -g "TC005"
```

### Run with UI Mode (Recommended for Development)
```bash
npx playwright test tests/WEBORDER/BalzeDemo_Flight.spec.ts --ui
```

### Run with Debug Mode
```bash
npx playwright test tests/WEBORDER/BalzeDemo_Flight.spec.ts --debug
```

### Run with Specific Browser
```bash
npx playwright test tests/WEBORDER/BalzeDemo_Flight.spec.ts --project=chromium
```

### View Test Report
```bash
npx playwright show-report
```

## Test Data

Test data is stored in `testData/BlazeDemoTestData.json` with multiple booking scenarios:

1. **Scenario 1**: Boston → Paris (John Doe)
2. **Scenario 2**: New York → London (Jane Smith)
3. **Scenario 3**: San Diego → Berlin (Michael Johnson)
4. **Scenario 4**: Phoenix → Madrid (Sarah Williams)
5. **Scenario 5**: Portland → Rome (David Brown)

### Valid Test Credit Cards

| Type | Number | Exp Month | Exp Year |
|------|--------|-----------|----------|
| Visa | 4111111111111111 | 12 | 2025 |
| Mastercard | 5555555555554444 | 06 | 2026 |
| American Express | 378282246310005 | 03 | 2025 |
| Discover | 6011111111111117 | 11 | 2026 |

## Configuration

The tests use the default Playwright configuration from `playwright.config.ts`.

Key settings:
- Timeout: 30 seconds per test
- Retries: 0 by default (can be configured)
- Headless: true by default
- Screenshot on failure: Enabled

## Troubleshooting

### Issue: Tests timeout on "Find Flights" click
**Solution**: The network wait might be too long. Adjust wait time in `AbstractPage.wait()` method.

### Issue: Dropdown selection not working
**Solution**: Ensure dropdown values match exactly. Use `getAvailableDepartureCities()` to verify available options.

### Issue: Payment details not filling correctly
**Solution**: Verify input field names haven't changed on the website. Update locators if needed.

### Issue: Booking confirmation not found
**Solution**: Check if booking was actually successful. The confirmation page takes time to load after purchase.

## Best Practices

1. **Use Page Objects**: Always use the `BlazeDemoFlightPage` class instead of inline selectors.
2. **Wait for Network**: Use `page.waitForLoadState('networkidle')` after major actions.
3. **Validate Before Action**: Always verify element visibility before interacting.
4. **Use Test Data Files**: Store credentials and test data in JSON files.
5. **Add Explicit Waits**: Use `await this.wait()` between critical actions.
6. **Log Important Events**: Log confirmation numbers and key milestones.

## Screenshots and Reports

Playwright automatically generates:
- Screenshots of failed tests in `test-results/`
- HTML report in `playwright-report/`
- Allure reports (if configured)

View the HTML report:
```bash
npx playwright show-report
```

## Dependencies

- Playwright: ^1.40.0
- TypeScript: ^5.0.0
- @playwright/test: ^1.40.0

## Future Enhancements

1. Add data-driven tests using parameterization
2. Add visual regression testing
3. Add E2E testing with multiple passengers
4. Add negative test cases (invalid credit cards, etc.)
5. Add API-level assertions for backend validation
6. Add performance metrics collection
7. Add accessibility testing

## Support

For issues or questions:
1. Check Playwright documentation: https://playwright.dev
2. Review ChromeDevTools for selector updates
3. Run tests in UI mode for debugging
4. Enable trace recording for debugging

## References

- BlazeDemo Website: https://blazedemo.com/
- Playwright Documentation: https://playwright.dev
- Page Object Model Pattern: https://playwright.dev/docs/pom
