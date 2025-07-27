//import { Page } from '@playwright/test'
  import { expect, Locator, Page } from '@playwright/test';
  const fs = require('fs');
  const xlsx = require('xlsx');
  import { parse } from 'csv-parse/sync';

export class AbstractPage {
   page= Page

  constructor(page= Page) {
    this.page = page
  }

  async wait() {
    //await this.page.waitForTimeout(process.env.settime)
    await this.page.waitForTimeout(3000)
  }

  async readDataFromJSONFile(fileName) {
    // Reads the JSON file and returns the parsed data
    const data = fs.readFileSync(fileName)
    return JSON.parse(data);
  }

  async readDataFromExcelFile(fileName, sheetName) {
    // Reads the Excel file and returns the parsed data
    const workbook = xlsx.readFile(fileName);
    const sheetNameList = workbook.SheetNames;
    return xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[sheetName]]);
  }

  async readDataFromCSVFile(fileName) {
    // Reads the CSV file and returns the parsed data
    const records = parse(readFileSync(fileName), {
      columns: true,
      skip_empty_lines: true
    });
    return records;
  }

}
