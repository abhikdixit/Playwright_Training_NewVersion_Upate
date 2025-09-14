import { Page } from '@playwright/test';

/**
 * Search through a paginated web table for a specific value and return a corresponding result
 * @param page - Playwright page object
 * @param tableSelector - CSS selector for the table
 * @param targetValue - Value to search for
 * @param targetColumn - Column number (1-based) containing the search value
 * @param resultColumn - Column number (1-based) containing the desired result
 * @param nextButtonSelector - CSS selector for the pagination next button
 * @param processingIndicatorSelector - Optional CSS selector for loading indicator
 * @returns Promise<string | null> - Returns the found value or null if not found
 */
export async function searchWebTable(
  page: Page,
  tableSelector: string,
  targetValue: string,
  targetColumn: number,
  resultColumn: number,
  nextButtonSelector: string,
  processingIndicatorSelector?: string
): Promise<string | null> {
  try {
    // Wait for table to be ready
    await page.waitForSelector(tableSelector, { state: 'visible' });
    if (processingIndicatorSelector) {
      await page.locator(processingIndicatorSelector).waitFor({ state: 'hidden' });
    }

    let result: string | null = null;

    while (true) {
      // Wait for rows to be present
      const rows = await page.$$(`${tableSelector} tbody tr`);
      let foundOnPage = false;

      // Search current page
      for (const row of rows) {
        const targetCell = await row.$(`td:nth-child(${targetColumn})`);
        if (!targetCell) continue;

        const targetText = await targetCell.textContent();
        if (!targetText) continue;

        if (targetText.trim().includes(targetValue)) {
          const resultCell = await row.$(`td:nth-child(${resultColumn})`);
          if (!resultCell) continue;

          const cellText = await resultCell.textContent();
          result = cellText || null;
          foundOnPage = true;
          break;
        }
      }

      if (foundOnPage) {
        break;
      }

      // Check if we can go to next page
      const nextButton = page.locator(nextButtonSelector);
      const parentLi = nextButton.locator('..');
      const parentClass = await parentLi.getAttribute('class');

      if (await nextButton.isDisabled() || (parentClass && parentClass.includes('disabled'))) {
        break;
      }

      // Snapshot current first row to detect content change after pagination
      const firstRow = page.locator(`${tableSelector} tbody tr`).first();
      const firstRowSignature = await firstRow.textContent();

      // Go to next page
      await nextButton.click();

      // Wait for page transition
      if (processingIndicatorSelector) {
        await page.locator(processingIndicatorSelector).waitFor({ state: 'visible' });
        await page.locator(processingIndicatorSelector).waitFor({ state: 'hidden' });
      } else {
        // Fallback: wait until the first row's text changes, indicating new page data
        await page.waitForFunction(
          ([selector, previous]) => {
            const row = document.querySelector(`${selector} tbody tr`);
            if (!row) return false;
            return (row.textContent || '').trim() !== (previous || '').trim();
          },
          [tableSelector, firstRowSignature],
          { timeout: 3000 }
        ).catch(() => undefined);
      }
    }

    return result;
  } catch (error) {
    console.error('Error in searchWebTable:', error);
    throw error;
  }
}