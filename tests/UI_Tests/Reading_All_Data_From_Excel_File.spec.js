const { test, expect } = require('@playwright/test');
// Requiring the module
const reader = require('xlsx')


test.describe.only('Read data from Excel file', () => {

	test('Read data', async ({ page }) => {
		// Reading our test file
		const file = reader.readFile('./tests/TestData/TestAllData.xlsx')

		let data = []

		const sheets = file.SheetNames

		for (let i = 0; i < sheets.length; i++) {
			const temp = reader.utils.sheet_to_json(
				file.Sheets[file.SheetNames[i]])
			temp.forEach(async(res) => {
				data.push(res)
				console.log(res)
				
			})
		}

		// Printing data
		//console.log(data)
	})
})