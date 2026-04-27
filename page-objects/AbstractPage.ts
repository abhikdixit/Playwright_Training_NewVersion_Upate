//import { Page } from '@playwright/test'
import { Page } from '@playwright/test';
import fs from 'fs';
import xlsx from 'xlsx';
import { parse } from 'csv-parse/sync';

export class AbstractPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async wait(): Promise<void> {
    //await this.page.waitForTimeout(process.env.settime)
    await this.page.waitForTimeout(3000);
  }

  async readDataFromJSONFile(fileName: string): Promise<any> {
    // Reads the JSON file and returns the parsed data
    let data: string = fs.readFileSync(fileName, 'utf-8');
    return JSON.parse(data);
  }

  async readDataFromExcelFile(fileName: string, sheetName: string): Promise<any[]> {
    // Reads the Excel file and returns the parsed data
    const workbook = xlsx.readFile(fileName);
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
      return [];
    }
    return xlsx.utils.sheet_to_json(worksheet);
  }

  async readDataFromCSVFile(fileName: string): Promise<any[]> {
    // Reads the CSV file and returns the parsed data
    const records = parse(fs.readFileSync(fileName), {
      columns: true,
      skip_empty_lines: true
    });
    return records;
  }

  
  
}
