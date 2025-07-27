import { readFile, utils } from 'xlsx';
import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';

export class CommonFunction {

  async ReadExcelFile(filename, sheetname) 
  {
    var workbook = readFile(filename);
    var sheet_name_list = workbook.SheetNames;
    var records = utils.sheet_to_json(workbook.Sheets[sheet_name_list[sheetname]]);
    return records;
  }

   async ReadCSVFile(filename) 
  {
    const records = parse(readFileSync(filename), {
      columns: true,
      skip_empty_lines: true
    });
    return records;
  }

  async ReadJSONFile(filename)
  {
    const data = readFileSync(filename);
    return JSON.parse(data);
  }

  // browserHelper.js
  async launchBrowserAndPage(browser) {
    const context = await browser.newContext();
    const page = await context.newPage();
    return { context, page };
  }

}