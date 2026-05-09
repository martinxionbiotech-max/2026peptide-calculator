import { readFileSync } from 'node:fs';

const index = readFileSync('index.html', 'utf8');
const app = readFileSync('src/main.js', 'utf8');
const styles = readFileSync('src/styles.css', 'utf8');
const combined = `${index}\n${app}\n${styles}`;
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
  'src/main.js',
  'src/styles.css',
];
const prohibited = ['bodybuilding', 'muscle growth', 'fat loss', 'performance enhancement', 'TRT', 'inject'];
const blockedRuntimeDependencies = ['https://cdn.tailwindcss.com', 'https://unpkg.com', 'text/babel'];
const missing = required.filter((term) => !combined.includes(term));
const presentProhibited = prohibited.filter((term) => combined.toLowerCase().includes(term.toLowerCase()));
const presentBlockedRuntimeDependencies = blockedRuntimeDependencies.filter((term) => combined.includes(term));
if (missing.length || presentProhibited.length || presentBlockedRuntimeDependencies.length) {
  console.error(JSON.stringify({ missing, presentProhibited, presentBlockedRuntimeDependencies }, null, 2));
  process.exit(1);
}
console.log('Static validation passed: SEO, compliance, schema, calculator sections, and local runtime assets are present.');
