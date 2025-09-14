import { readFile, utils, WorkBook, WorkSheet } from "xlsx";
import { parse } from "csv-parse/sync";
import { readFileSync } from "fs";
import { Browser, BrowserContext, Page } from "@playwright/test";

export class CommonFunction {
  /**
   * Read Excel file and return data from the given sheet as JSON.
   * Accepts sheet index (number) or sheet name (string).
   */
  ReadExcelFile(filename: string, sheetname: string | number): any[] {
    const workbook: WorkBook = readFile(filename);
    const sheetNames: string[] = workbook.SheetNames;

    let resolvedSheet: string;

    if (typeof sheetname === "number") {
      if (sheetname < 0 || sheetname >= sheetNames.length) {
        throw new Error(
          `Invalid sheet index: ${sheetname}. Available sheets: ${sheetNames.join(", ")}`
        );
      }
      resolvedSheet = sheetNames[sheetname];
    } else {
      if (!sheetNames.includes(sheetname)) {
        throw new Error(
          `Sheet "${sheetname}" not found in ${filename}. Available sheets: ${sheetNames.join(", ")}`
        );
      }
      resolvedSheet = sheetname;
    }

    const worksheet: WorkSheet = workbook.Sheets[resolvedSheet];
    return utils.sheet_to_json(worksheet);
  }

  /** Read CSV file and return rows as JSON objects */
  ReadCSVFile(filename: string): any[] {
    return parse(readFileSync(filename, "utf-8"), {
      columns: true,
      skip_empty_lines: true,
    });
  }
/*That T is a generic type parameter.

When you call ReadJSONFile, you can tell TypeScript what shape of data you expect from the JSON file.
TypeScript will then enforce that shape, so you don’t have to cast manually or deal with any.*/
  /** Read JSON file and parse its contents */
  ReadJSONFile<T>(filename: string): T {
    const data = readFileSync(filename, "utf-8");
    return JSON.parse(data) as T;
  }

  /** Launch browser context and page */
  async launchBrowserAndPage(
    browser: Browser
  ): Promise<{ context: BrowserContext; page: Page }> {
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    return { context, page };
  }
}
