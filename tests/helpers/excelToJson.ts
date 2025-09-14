// helpers/excelToJson.ts
import ExcelJS from 'exceljs';

interface ExcelRecord {
  [key: string]: any;
}

async function excelToJson(filePath: string): Promise<ExcelRecord[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.worksheets[0];

  if (!worksheet) {
    throw new Error('No worksheet found in the Excel file');
  }

  const firstRow = worksheet.getRow(1);
  const headers = (firstRow.values as any[]).slice(1) as string[]; // skip index 0
  const records: ExcelRecord[] = [];

  worksheet.eachRow((row: ExcelJS.Row, rowNumber: number) => {
    if (rowNumber > 1) {
      const values = (row.values as any[]).slice(1);
      const record: ExcelRecord = {};
      headers.forEach((header: string, index: number) => {
        record[header] = values[index] ?? '';
      });
      records.push(record);
    }
  });

  return records;
}

export { excelToJson };
