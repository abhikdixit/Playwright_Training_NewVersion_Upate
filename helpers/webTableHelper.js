async function searchWebTable(page, tableSelector, targetValue, targetColumn, resultColumn, nextButtonSelector, processingIndicatorSelector) {
  await page.waitForSelector(tableSelector);
  if (processingIndicatorSelector) {
    await page.locator(processingIndicatorSelector).waitFor({ state: 'hidden' });
  }

  let result = null;

  while (true) {
    const rows = await page.$$(`${tableSelector} tbody tr`);
    let foundOnPage = false;

    for (const row of rows) {
      const targetCell = await row.$(`td:nth-child(${targetColumn})`);
      const targetText = await targetCell.textContent();

      if (targetText.trim().includes(targetValue)) {
        const resultCell = await row.$(`td:nth-child(${resultColumn})`);
        result = await resultCell.textContent();
        foundOnPage = true;
        break;
      }
    }

    if (foundOnPage) {
      break;
    }

    const nextButton = page.locator(nextButtonSelector);
    const parentLi = nextButton.locator('xpath=..');
    const parentClass = await parentLi.getAttribute('class');

    if (await nextButton.isDisabled() || (parentClass && parentClass.includes('disabled'))) {
      break;
    }

    await nextButton.click();

    if (processingIndicatorSelector) {
      await page.locator(processingIndicatorSelector).waitFor({ state: 'visible' });
      await page.locator(processingIndicatorSelector).waitFor({ state: 'hidden' });
    }
  }

  return result;
}

module.exports = { searchWebTable };