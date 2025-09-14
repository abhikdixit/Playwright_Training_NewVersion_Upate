const { ESLint } = require('eslint');
const fs = require('fs');
const path = require('path');

(async function main() {
  const eslint = new ESLint({
    fix: false,
  });

  // Get all .js files in the current directory
  const files = fs.readdirSync(process.cwd())
    .filter(f => f.endsWith('.js'));

  if (files.length === 0) {
    console.log('No .js files found in the current directory.');
    return;
  }

  // Lint files
  const results = await eslint.lintFiles(files);

  // Generate HTML report
  const formatter = await eslint.loadFormatter('html');
  const resultText = formatter.format(results);
  fs.writeFileSync(path.join(process.cwd(), 'eslint-report.html'), resultText);
  console.log('ESLint report generated: eslint-report.html');
})();