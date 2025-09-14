# Excel Library Migration Guide

## Migration from xlsx to exceljs

This document describes the migration from the vulnerable `xlsx` and `js-xlsx` libraries to the secure `exceljs` library.

### Why Migration Was Needed

- **Security vulnerabilities**: The `xlsx` library had high-severity vulnerabilities including:
  - Prototype Pollution (GHSA-4r6h-8v6p-xvw6)
  - Regular Expression Denial of Service (ReDoS) (GHSA-5pgg-2g8v-p4x9)
- **Dependency issues**: `js-xlsx` depends on vulnerable versions of `jszip`
- **No fix available**: No secure versions were available for these packages

### Changes Made

#### Package.json Updates
- **Removed**: `xlsx ^0.18.5`, `js-xlsx ^0.8.22`
- **Added**: `exceljs ^4.4.0`
- **Removed**: Circular dependency `"playwright_newversion": "file:"`

#### Files Updated

1. **tests/UI_Tests/CommonFunction.js**
   - Updated `ReadExcelFile()` method to use ExcelJS
   - Now properly handles async Excel reading

2. **tests/UI_Tests/Read_DataFrom_Excel_NopCommerce_AllScenario.spec.js**
   - Replaced xlsx imports with ExcelJS
   - Added helper function for reading Excel files
   - Data reading now happens inside test function

3. **tests/UI_Tests/Read_DataFrom_Excel_WebordersAPP_AllScenario_New.spec.js**
   - Updated to use ExcelJS with ES6 imports
   - Async data reading implementation

4. **tests/UI_Tests/Read_DataFrom_Excel_WebordersAPP_Hooks.spec.js**
   - Converted to use ExcelJS with CommonJS require
   - Maintained existing test structure

5. **tests/UI_Tests/Read_DataFrom_Excel_WebordersAPP_AllScenario.spec.js**
   - Updated to ExcelJS with ES6 imports
   - Proper async handling

6. **tests/UI_Tests/Read_DataFrom_Excel_WebordersAPP.spec.js**
   - Restructured to use ExcelJS
   - Changed from individual tests to grouped test structure

7. **tests/UI_Tests/Reading_All_Data_From_Excel_File.spec.js**
   - Complete rewrite to use ExcelJS
   - Handles multiple worksheets properly

8. **tests/UI_Tests/BaseTest.js**
   - Updated `ReadExcelFile()` method in Login_LogoutPage class
   - ES6 import for ExcelJS

9. **page-objects/AbstractPage.js**
   - Updated `readDataFromExcelFile()` method
   - Mixed CommonJS/ES6 compatible implementation

### Key Differences Between xlsx and exceljs

#### Old xlsx approach:
```javascript
import { readFile, utils } from 'xlsx';

var workbook = readFile(filename);
var sheet_name_list = workbook.SheetNames;
var records = utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
```

#### New exceljs approach:
```javascript
import ExcelJS from 'exceljs';

const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile(filename);
const worksheet = workbook.worksheets[0];
const records = [];

// Get headers from first row
const firstRow = worksheet.getRow(1);
const headers = [];
firstRow.eachCell((cell, colNumber) => {
  headers.push(cell.value);
});

// Convert rows to JSON objects
worksheet.eachRow((row, rowNumber) => {
  if (rowNumber > 1) { // Skip header row
    const record = {};
    row.eachCell((cell, colNumber) => {
      if (headers[colNumber - 1]) {
        record[headers[colNumber - 1]] = cell.value;
      }
    });
    records.push(record);
  }
});
```

### Benefits of ExcelJS

1. **Security**: No known vulnerabilities
2. **Active maintenance**: Regularly updated and maintained
3. **Better performance**: More efficient memory usage
4. **Rich features**: Support for charts, formulas, styling
5. **TypeScript support**: Built-in TypeScript definitions
6. **Streaming support**: Can handle large files efficiently

### Installation

The secure exceljs library is already installed:
```bash
npm install exceljs
```

### Testing

All Excel-related functionality has been updated and should work seamlessly with the existing test data files.

### Security Audit Results

After migration: **0 vulnerabilities found**

---

**Note**: All existing Excel files (.xlsx) will continue to work without any changes. Only the code that reads these files has been updated to use the secure exceljs library.
