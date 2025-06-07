const { test, expect } = require('@playwright/test');

test('Rediff Register Page Test', async ({ page }) => {
  await page.goto('https://register.rediff.com/register/register.php?FormName=user_details');

  await page.fill('input[name="fullname"]', 'John Doe'); // Type on Full Name field
  await page.fill('input[name="login"]', 'johndoe12345'); // Type on Rediffmail ID field

  await page.click('input[title="Check availability"]'); // Click CHECK AVAILABILITY button
  
  await page.waitForSelector('b:has-text("Yippie! The ID you\'ve chosen is available.")'); // Wait for availability message
  
  if (await page.isVisible('b:has-text("Yippie! The ID you\'ve chosen is available.")')) {
    await page.fill('input[name="passwd"]', 'SecurePassword!123'); // Type on Password field
    await page.fill('input[name="confirm_passwd"]', 'SecurePassword!123'); // Type on Retype Password field
    
    if (!(await page.isChecked('input[name="altemailchk"]'))) {
      await page.check('input[name="altemailchk"]'); // Check the checkbox if not selected
    }
    
    await page.selectOption('select[name="hint"]', { label: 'What is the name of your first school?' }); // Select Security Question
    await page.fill('input[name="hintanswer"]', 'MyFirstSchool'); // Type answer
    await page.fill('input[name="mothername"]', 'MaidenName'); // Type Mother's Maiden Name
    await page.selectOption('select[name="country"]', 'USA'); // Select USA/CANADA
    await page.fill('input[name="mobno"]', '1234567890'); // Type Mobile No.
    await page.selectOption('select[name="DOB_Day"]', '05'); // Select Day
    await page.selectOption('select[name="DOB_Month"]', 'MAR'); // Select Month
    await page.selectOption('select[name="DOB_Year"]', '2019'); // Select Year
    
    if (!(await page.isChecked('input[value="f"]'))) {
      await page.check('input[value="f"]'); // Check female radio button if not selected
    }
  }
});
