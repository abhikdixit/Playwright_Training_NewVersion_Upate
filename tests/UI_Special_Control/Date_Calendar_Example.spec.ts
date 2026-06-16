import { test, expect, type FrameLocator } from '@playwright/test';

test.describe('Date Picker Tests', () => {
  test('should select a date 3 days after today', async ({ page }) => {
    try {
      // Configuration
      const config = {
        url: 'https://jqueryui.com/datepicker/',
        selectors: {
          frame: '.demo-frame',
          datePicker: '.hasDatepicker',
          today: '.ui-datepicker-today > a'
        },
        daysToAdd: 3
      };

      // Navigate to the page
      await page.goto(config.url, { waitUntil: 'networkidle' });

      // Get frame and wait for it to be ready
      const frameElement: FrameLocator = page.frameLocator(config.selectors.frame);
      await frameElement.locator(config.selectors.datePicker).waitFor({ state: 'visible' });

      // Open the date picker
      await frameElement.locator(config.selectors.datePicker).click();

      // Get today's date value
      const defaultDate = frameElement.locator(config.selectors.today);
      await defaultDate.waitFor({ state: 'visible' });
      
      const currentDateValue = await defaultDate.getAttribute('data-date');
      if (!currentDateValue) {
        throw new Error('Failed to get current date value');
      }

      // Calculate target date
      const currentDate = parseInt(currentDateValue);
      if (isNaN(currentDate)) {
        throw new Error('Invalid current date value');
      }

      const targetDate = currentDate + config.daysToAdd;
      
      // Construct and verify the selector
      const dateSelector = `[data-date='${targetDate}']`;
      const targetDateElement = frameElement.locator(dateSelector);
      
      // Wait for and click the target date
      await targetDateElement.waitFor({ state: 'visible' });
      await targetDateElement.click();
      await page.waitForTimeout(8000); // Wait for the date to be selected

      // Wait for the date to be selected and verify
      const selectedValue = await frameElement.locator(config.selectors.datePicker).inputValue();
      expect(selectedValue).not.toBe('');

      // Wait for any animations to complete
      await page.waitForLoadState('networkidle');
      
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });
});

    