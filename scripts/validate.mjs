import { readFileSync } from 'node:fs';

const index = readFileSync('index.html', 'utf8');
const app = readFileSync('src/main.jsx', 'utf8');
const combined = `${index}\n${app}`;
const required = [
  'Research Peptide Blend Calculator',
  'For laboratory research and educational purposes only',
  'Not intended for diagnostic, therapeutic, or human use',
  'FAQPage',
  'SoftwareApplication',
  'BreadcrumbList',
  'WebPage',
  'Peptide Concentration Calculator',
  'Multi-Peptide Blend Calculator',
  'Solution Dilution Calculator',
  'Unit Conversion Tool',
  'Research Reference Compound',
];
const prohibited = ['bodybuilding', 'muscle growth', 'fat loss', 'performance enhancement', 'TRT', 'cycle'];
const missing = required.filter((term) => !combined.includes(term));
const presentProhibited = prohibited.filter((term) => combined.toLowerCase().includes(term.toLowerCase()));
if (missing.length || presentProhibited.length) {
  console.error(JSON.stringify({ missing, presentProhibited }, null, 2));
  process.exit(1);
}
console.log('Static validation passed: SEO, compliance, schema, and calculator sections are present.');
