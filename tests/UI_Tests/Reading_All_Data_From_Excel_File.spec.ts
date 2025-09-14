import { test, expect } from '@playwright/test';
// Requiring the exceljs module
import ExcelJS from 'exceljs';

test.describe('Read data from Excel file', () => {

	test('Read data', async ({ page }) => {
		// Reading our test file using ExcelJS
		const workbook = new ExcelJS.Workbook();
		await workbook.xlsx.readFile('./tests/TestData/TestAllData.xlsx');

	let data: { [key: string]: any }[] = [];

		// Process all worksheets
		workbook.worksheets.forEach((worksheet) => {
			// Get headers from first row
			const firstRow = worksheet.getRow(1);
			const headers: string[] = [];
			firstRow.eachCell((cell: any, colNumber: number) => {
				headers.push(cell.value as string);
			});

			// Convert rows to JSON objects
			worksheet.eachRow((row: any, rowNumber: number) => {
				if (rowNumber > 1) { // Skip header row
					const record: { [key: string]: any } = {};
					row.eachCell((cell: any, colNumber: number) => {
						if (headers[colNumber - 1]) {
							record[headers[colNumber - 1]] = cell.value;
						}
					});
					data.push(record);
					console.log(record);
				}
			});
		});

		// Printing data
		//console.log(data)
	})
})