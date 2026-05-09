const presets = ['BPC-157', 'TB-500', 'CJC-1295', 'GHK-Cu', 'Ipamorelin'];

const faqs = [
  ['What is peptide concentration?', 'Peptide concentration describes the amount of peptide mass present in a defined solution volume. In laboratory calculations it is commonly expressed as mg/mL or mcg/mL for analytical preparation, formulation modeling, and assay planning.'],
  ['How is peptide dilution calculated?', 'Peptide dilution is calculated by comparing stock concentration with target final concentration. The relationship C1 × V1 = C2 × V2 helps estimate stock solution and solvent requirements for a non-clinical analytical preparation.'],
  ['What is peptide reconstitution?', 'Peptide reconstitution is the laboratory process of adding a defined solvent volume to a dry reference compound to create a measurable solution concentration for educational biochemical calculations.'],
  ['How do laboratory peptide solutions work?', 'Laboratory peptide solutions combine a known compound mass with a measured solvent volume, producing a concentration used for analytical aliquots, assay preparation, or blend ratio modeling in controlled research environments.'],
  ['What affects peptide concentration?', 'Peptide concentration is affected by compound mass, solvent volume, measurement precision, transfer loss, purity assumptions, and dilution steps. Analytical calculations should document units, rounding, and preparation conditions.'],
  ['How is mg converted to mcg?', 'Milligrams are converted to micrograms by multiplying by 1,000. For example, 5 mg equals 5,000 mcg. This unit conversion is useful when comparing peptide mass and concentration values.'],
  ['Why is solvent volume important?', 'Solvent volume determines final solution concentration. Adding more solvent lowers concentration, while using less solvent increases concentration. Accurate volume measurement supports reproducible laboratory peptide concentration calculations.'],
  ['How are multi-peptide blends analyzed?', 'Multi-peptide blends are analyzed by calculating each compound mass as a percentage of total mass and then dividing each mass by final solution volume to obtain individual and total analytical concentration.'],
  ['What is an analytical dilution ratio?', 'An analytical dilution ratio describes the relationship between an original stock solution and a prepared lower-concentration solution. It is used to plan laboratory solvent adjustments and assay concentration targets.'],
  ['What is a peptide vial concentration calculator?', 'A peptide vial concentration calculator estimates mg/mL and mcg/mL after adding a selected solvent volume to a known research reference compound mass. It is a mathematical tool, not a clinical guide.'],
  ['Can this calculator model BAC water dilution?', 'The calculator can model solvent-volume dilution mathematics for laboratory reference solutions, including cases where a defined aqueous solvent volume is entered. It does not provide human-use instructions.'],
  ['What is final assay concentration?', 'Final assay concentration is the concentration present after stock solution, solvent, and dilution steps are combined for an analytical experiment. It is calculated from mass or stock contribution divided by final volume.'],
  ['How are peptide blend percentages calculated?', 'Blend percentage is calculated by dividing one compound mass by total compound mass and multiplying by 100. This helps compare formulation ratios in a laboratory peptide blend model.'],
  ['What units does the peptide calculator support?', 'The unit converter supports g, mg, mcg, mL, and µL conversions. These conversions help standardize biochemical calculations and reduce unit-entry errors in research documentation.'],
  ['Is this calculator intended for medical use?', 'No. This calculator is for laboratory research and educational biochemical calculations only. It is not intended for diagnostic, therapeutic, pharmaceutical, or human-use decisions.'],
  ['What are common peptide calculation errors?', 'Common errors include mixing mg and mcg, entering µL as mL, overlooking total blend volume, rounding too early, and not documenting solvent additions. Structured calculations reduce analytical preparation mistakes.'],
];

const contentSections = [
  ['What Is a Research Peptide Blend Calculator?', 'A research peptide blend calculator is an educational software tool that models peptide mass, solvent volume, concentration, and blend percentages for laboratory analysis. It supports biochemical calculations, analytical preparation planning, and non-clinical research documentation without providing human-use guidance.', ['Models peptide solution concentration', 'Compares formulation ratios', 'Supports analytical concentration estimates']],
  ['Peptide Concentration Explained', 'Peptide concentration expresses how much reference compound is present in a measured solution volume. In laboratory peptide calculator workflows, concentration is usually reported as mg/mL and mcg/mL to support assay preparation and analytical dilution planning.', ['Formula: mass ÷ volume', '5 mg in 2 mL = 2.5 mg/mL', '2.5 mg/mL = 2,500 mcg/mL']],
  ['Understanding Peptide Reconstitution in Laboratory Settings', 'Peptide reconstitution in laboratory settings means combining a measured dry research reference compound with a defined solvent volume. The result is a stock solution concentration that can be used for educational modeling, analytical aliquots, and controlled assay calculations.', ['Choose compound mass', 'Enter reconstitution volume', 'Calculate stock solution concentration']],
  ['Analytical Dilution Ratios', 'An analytical dilution ratio compares stock concentration with final target concentration after solvent adjustment. Laboratory dilution calculations use proportional relationships to estimate concentration changes and final assay concentration for research-only samples.', ['Use C1 × V1 = C2 × V2', 'Track solvent additions', 'Document final analytical concentration']],
  ['Peptide Solution Stability', 'Peptide solution stability is influenced by solvent selection, temperature, light exposure, container material, pH, and time in solution. This educational platform highlights calculation variables but does not replace compound-specific stability documentation or validated laboratory procedures.', ['Minimize repeated handling', 'Use validated reference documentation', 'Record storage and preparation metadata']],
  ['Solvent Volume and Concentration Relationships', 'Solvent volume and concentration are inversely related when compound mass remains constant. Increasing solvent volume lowers mg/mL concentration, while decreasing solvent volume raises concentration in the resulting laboratory sample.', ['Constant mass, higher volume = lower concentration', 'Constant mass, lower volume = higher concentration', 'Always verify mL and µL units']],
  ['Multi-Compound Blend Calculations', 'Multi-compound blend calculations evaluate each peptide reference compound as part of a combined preparation. The model reports per-compound concentration, blend percentage, total mass, total solution volume, and final analytical concentration.', ['Sum all compound masses', 'Calculate each compound percentage', 'Divide each mass by final volume']],
  ['Peptide Storage and Laboratory Handling', 'Laboratory handling of peptide reference compounds should emphasize traceability, clear labeling, documented volumes, and controlled environmental conditions. Storage decisions should follow supplier certificates, safety data sheets, and institutional research procedures.', ['Label mass, solvent, and date', 'Use non-clinical research records', 'Follow institutional safety practices']],
  ['Common Research Calculation Errors', 'Common peptide calculation errors include unit mismatches, incorrectly converting mg to mcg, using total blend mass instead of per-compound mass, and forgetting solvent changes. This peptide analytical calculator is designed to make calculation assumptions visible.', ['Check unit conversions', 'Avoid early rounding', 'Separate total and per-compound values']],
];

const state = {
  dark: false,
  massMg: 5,
  volumeMl: 2,
  stockConc: 2.5,
  stockVolume: 1,
  finalVolume: 10,
  unitValue: 5,
  unitType: 'mg',
  blendVolume: 3,
  compounds: [
    { id: 1, name: 'BPC-157', massMg: 5 },
    { id: 2, name: 'TB-500', massMg: 5 },
    { id: 3, name: 'GHK-Cu', massMg: 10 },
  ],
};

const root = document.getElementById('root');

function formatNumber(value, digits = 3) {
  if (!Number.isFinite(value)) return '0';
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: digits }).format(value);
}

function unitConversions() {
  const value = Number(state.unitValue) || 0;
  if (state.unitType === 'mg') return { g: value / 1000, mg: value, mcg: value * 1000 };
  if (state.unitType === 'mcg') return { g: value / 1_000_000, mg: value / 1000, mcg: value };
  if (state.unitType === 'g') return { g: value, mg: value * 1000, mcg: value * 1_000_000 };
  if (state.unitType === 'mL') return { mL: value, 'µL': value * 1000 };
  return { mL: value / 1000, 'µL': value };
}

function schemaJson() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', name: 'Research Peptide Blend Calculator', description: 'SEO-focused educational peptide concentration, blend, reconstitution, and dilution calculator for laboratory research and biochemical modeling.', inLanguage: 'en-US' },
      { '@type': 'SoftwareApplication', name: 'Research Peptide Blend Calculator', applicationCategory: 'EducationalApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: 'Client-side peptide solution calculator for laboratory concentration estimates, multi-compound blend analysis, dilution ratios, and unit conversion.' },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://example.com/' }, { '@type': 'ListItem', position: 2, name: 'Research Peptide Calculator', item: 'https://example.com/#calculator' }] },
      { '@type': 'FAQPage', mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
    ],
  });
}

function metrics(items) {
  return `<div class="metric-grid">${items.map(([label, value]) => `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`).join('')}</div>`;
}

function input(label, key, step = '0.01') {
  return `<label class="field"><span>${label}</span><input data-field="${key}" type="number" min="0" step="${step}" value="${state[key]}"></label>`;
}

function render() {
  const concentration = state.volumeMl > 0 ? state.massMg / state.volumeMl : 0;
  const totalMass = state.compounds.reduce((sum, compound) => sum + Number(compound.massMg || 0), 0);
  const blendRows = state.compounds.map((compound) => ({
    ...compound,
    percentage: totalMass > 0 ? (compound.massMg / totalMass) * 100 : 0,
    concentration: state.blendVolume > 0 ? compound.massMg / state.blendVolume : 0,
  }));
  const dilution = state.finalVolume > 0 ? (state.stockConc * state.stockVolume) / state.finalVolume : 0;
  const dilutionFactor = state.stockVolume > 0 ? state.finalVolume / state.stockVolume : 0;

  document.documentElement.classList.toggle('dark', state.dark);
  root.innerHTML = `
    <script type="application/ld+json">${schemaJson()}</script>
    <header class="site-header">
      <nav class="nav"><div><p class="eyebrow">Biochemical Research Tools</p><strong>Research Peptide Blend Calculator</strong></div><button id="darkToggle" class="ghost-button">${state.dark ? 'Light Mode' : 'Dark Mode'}</button></nav>
    </header>
    <main>
      <section class="hero section-grid">
        <div class="hero-copy animate-card">
          <div class="pill">For laboratory research and educational purposes only</div>
          <h1>Research Peptide Calculator for Concentration, Blend, and Dilution Modeling</h1>
          <p>A professional peptide blend calculator for laboratory peptide concentration calculations, reconstitution volume modeling, peptide dilution analysis, and multi-compound formulation ratios. This educational calculation tool is designed for non-clinical biochemical research environments.</p>
          <div class="trust-row"><span>Not intended for diagnostic, therapeutic, or human use.</span><span>Analytical concentration modeling only.</span><span>Client-side calculations with transparent formulas.</span></div>
        </div>
        <aside class="result-card animate-card delay"><p class="eyebrow">Quick concentration result</p><div class="blue-panel"><span>Current model</span><strong>${formatNumber(concentration)} mg/mL</strong><em>${formatNumber(concentration * 1000)} mcg/mL analytical concentration</em></div>${metrics([['Peptide mass', `${formatNumber(state.massMg)} mg`], ['Solvent volume', `${formatNumber(state.volumeMl)} mL`], ['Dilution ratio', `1:${formatNumber(dilutionFactor)}`], ['Blend mass', `${formatNumber(totalMass)} mg`]])}</aside>
      </section>

      <section id="calculator" class="section"><p class="eyebrow">Scientific calculation suite</p><h2>Peptide concentration calculator and laboratory blend model</h2><p class="section-intro">Enter mass, solvent volume, blend composition, and dilution variables to produce transparent analytical estimates for research documentation.</p><div class="cards">
        <article class="card animate-card"><h3>Peptide Concentration Calculator</h3><p>Calculate mg/mL, mcg/mL, and analytical dilution ratio from peptide mass and solvent volume.</p>${input('Peptide mass (mg)', 'massMg')}${input('Solvent volume (mL)', 'volumeMl')}${metrics([['Concentration', `${formatNumber(concentration)} mg/mL`], ['Micro concentration', `${formatNumber(concentration * 1000)} mcg/mL`], ['Analytical ratio', `1 mL contains ${formatNumber(concentration)} mg`]])}</article>
        <article class="card animate-card"><h3>Solution Dilution Calculator</h3><p>Model dilution ratios, solvent adjustments, and final assay concentration using C1 × V1 = C2 × V2.</p>${input('Stock concentration (mg/mL)', 'stockConc')}${input('Stock solution volume (mL)', 'stockVolume')}${input('Final solution volume (mL)', 'finalVolume')}${metrics([['Final concentration', `${formatNumber(dilution)} mg/mL`], ['Final micro concentration', `${formatNumber(dilution * 1000)} mcg/mL`], ['Dilution factor', `${formatNumber(dilutionFactor)}x`], ['Added solvent estimate', `${formatNumber(Math.max(state.finalVolume - state.stockVolume, 0))} mL`]])}</article>
        <article class="card animate-card"><h3>Multi-Peptide Blend Calculator</h3><p>Combine multiple research reference compounds and calculate concentration per compound, blend percentage, and final analytical concentration.</p>${input('Total solution volume (mL)', 'blendVolume')}
          <div class="compound-list">${state.compounds.map((compound, index) => `<div class="compound-row"><input data-compound-name="${index}" value="${compound.name}" aria-label="Compound name"><input data-compound-mass="${index}" type="number" min="0" step="0.01" value="${compound.massMg}" aria-label="Compound mass mg"></div>`).join('')}</div><button id="addCompound" class="primary-button">Add compound</button>
          <div class="table-wrap"><table><thead><tr><th>Compound</th><th>Blend %</th><th>mg/mL</th></tr></thead><tbody>${blendRows.map((row) => `<tr><td>${row.name}</td><td>${formatNumber(row.percentage)}%</td><td>${formatNumber(row.concentration)}</td></tr>`).join('')}</tbody></table></div>${metrics([['Total mass', `${formatNumber(totalMass)} mg`], ['Total solution volume', `${formatNumber(state.blendVolume)} mL`], ['Final analytical concentration', `${formatNumber(state.blendVolume > 0 ? totalMass / state.blendVolume : 0)} mg/mL`]])}</article>
        <article class="card animate-card"><h3>Unit Conversion Tool</h3><p>Convert mg, mcg, g, mL, and µL to standardize peptide analytical calculator inputs.</p><div class="unit-row">${input('Value', 'unitValue')}<label class="field"><span>Unit</span><select id="unitType"><option value="mg">mg</option><option value="mcg">mcg</option><option value="g">g</option><option value="mL">mL</option><option value="uL">µL</option></select></label></div>${metrics(Object.entries(unitConversions()).map(([unit, value]) => [unit, formatNumber(value, 6)]))}<div class="preset-box"><h4>Research Preset Library</h4><div class="preset-grid">${presets.map((preset) => `<button class="preset" data-preset="${preset}">${preset}<small>Research Reference Compound</small></button>`).join('')}</div></div></article>
      </div></section>

      <section class="section white-section"><h2>Educational research guide for peptide solution calculations</h2><div class="content-grid">${contentSections.map(([title, definition, bullets]) => `<article class="content-card"><h3>${title}</h3><p>${definition}</p><ul>${bullets.map((bullet) => `<li>${bullet}</li>`).join('')}</ul></article>`).join('')}</div></section>
      <section class="section"><h2>Scientific summary tables</h2><p class="section-intro">Snippet-ready reference tables summarize the formulas used by this laboratory peptide calculator.</p><div class="table-wrap large"><table><thead><tr><th>Calculation</th><th>Formula</th><th>Research use</th></tr></thead><tbody><tr><td>Concentration</td><td>mass (mg) ÷ volume (mL)</td><td>Peptide solution concentration</td></tr><tr><td>Micro conversion</td><td>mg × 1,000 = mcg</td><td>Peptide mg to mcg converter</td></tr><tr><td>Dilution</td><td>C1 × V1 = C2 × V2</td><td>Final assay concentration</td></tr><tr><td>Blend percentage</td><td>compound mass ÷ total mass × 100</td><td>Peptide blend ratio analysis</td></tr></tbody></table></div></section>
      <section class="faq-section"><div class="section"><h2>Frequently Asked Questions</h2><p>Research-oriented answers for peptide concentration, laboratory dilution, reconstitution volume, and analytical formulation calculations.</p><div class="faq-grid">${faqs.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join('')}</div></div></section>
    </main>
    <footer><strong>For laboratory research and educational purposes only.</strong><span>Not intended for diagnostic, therapeutic, or human use. This calculator provides analytical concentration estimates only.</span></footer>`;

  const unitSelect = document.getElementById('unitType');
  if (unitSelect) unitSelect.value = state.unitType;
  attachEvents();
}

function attachEvents() {
  document.getElementById('darkToggle')?.addEventListener('click', () => {
    state.dark = !state.dark;
    render();
  });
  document.querySelectorAll('[data-field]').forEach((element) => {
    element.addEventListener('change', (event) => {
      state[event.target.dataset.field] = Number(event.target.value);
      render();
    });
  });
  document.getElementById('unitType')?.addEventListener('change', (event) => {
    state.unitType = event.target.value;
    render();
  });
  document.querySelectorAll('[data-compound-name]').forEach((element) => {
    element.addEventListener('change', (event) => {
      state.compounds[Number(event.target.dataset.compoundName)].name = event.target.value;
      render();
    });
  });
  document.querySelectorAll('[data-compound-mass]').forEach((element) => {
    element.addEventListener('change', (event) => {
      state.compounds[Number(event.target.dataset.compoundMass)].massMg = Number(event.target.value);
      render();
    });
  });
  document.getElementById('addCompound')?.addEventListener('click', () => {
    state.compounds.push({ id: Date.now(), name: 'Research compound', massMg: 1 });
    render();
  });
  document.querySelectorAll('[data-preset]').forEach((element) => {
    element.addEventListener('click', (event) => {
      state.compounds.push({ id: Date.now(), name: event.currentTarget.dataset.preset, massMg: 5 });
      render();
    });
  });
}

render();
