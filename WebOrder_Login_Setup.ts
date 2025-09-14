// global-setup.js

import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.getByLabel('Username:').fill('Tester');
  await page.getByLabel('Password:').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();

  // Ensure the folder exists
  const storagePath = path.resolve('./tests/OrangeHRM');
  if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, { recursive: true });
  }

  await page.context().storageState({ path: path.join(storagePath, 'WebOrderState.json') });

  await browser.close();
}

export default globalSetup;
