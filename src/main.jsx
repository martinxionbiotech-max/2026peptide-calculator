const { useMemo, useState } = React;
const { createRoot } = ReactDOM;
const motion = window.Motion?.motion || {
  div: 'div',
  article: 'article',
};

const presets = ['BPC-157', 'TB-500', 'CJC-1295', 'GHK-Cu', 'Ipamorelin'];

const faqs = [
  {
    question: 'What is peptide concentration?',
    answer:
      'Peptide concentration describes the amount of peptide mass present in a defined solution volume. In laboratory calculations it is commonly expressed as mg/mL or mcg/mL for analytical preparation, formulation modeling, and assay planning.',
  },
  {
    question: 'How is peptide dilution calculated?',
    answer:
      'Peptide dilution is calculated by comparing stock concentration with target final concentration. The relationship C1 × V1 = C2 × V2 helps estimate how much stock solution and solvent are needed for a non-clinical analytical preparation.',
  },
  {
    question: 'What is peptide reconstitution?',
    answer:
      'Peptide reconstitution is the laboratory process of adding a defined solvent volume to a dry reference compound to create a measurable solution concentration. This calculator models reconstitution volume and concentration for educational biochemical calculations only.',
  },
  {
    question: 'How do laboratory peptide solutions work?',
    answer:
      'Laboratory peptide solutions combine a known compound mass with a measured solvent volume, producing a concentration that can be used for analytical aliquots, assay preparation, or blend ratio modeling in controlled research environments.',
  },
  {
    question: 'What affects peptide concentration?',
    answer:
      'Peptide concentration is affected by compound mass, solvent volume, measurement precision, transfer loss, purity assumptions, and dilution steps. Analytical calculations should document units, rounding, and laboratory preparation conditions.',
  },
  {
    question: 'How is mg converted to mcg?',
    answer:
      'Milligrams are converted to micrograms by multiplying by 1,000. For example, 5 mg equals 5,000 mcg. This unit conversion is useful when comparing peptide mass and concentration values across analytical tables.',
  },
  {
    question: 'Why is solvent volume important?',
    answer:
      'Solvent volume determines final solution concentration. Adding more solvent lowers concentration, while using less solvent increases concentration. Accurate volume measurement supports reproducible laboratory peptide concentration calculations.',
  },
  {
    question: 'How are multi-peptide blends analyzed?',
    answer:
      'Multi-peptide blends are analyzed by calculating each compound mass as a percentage of total mass and then dividing each mass by the final solution volume. This gives individual compound concentration and total analytical concentration.',
  },
  {
    question: 'What is an analytical dilution ratio?',
    answer:
      'An analytical dilution ratio describes the relationship between an original stock solution and a prepared lower-concentration solution. It is used to plan laboratory solvent adjustments and assay concentration targets.',
  },
  {
    question: 'What is a peptide vial concentration calculator?',
    answer:
      'A peptide vial concentration calculator estimates mg/mL and mcg/mL after adding a selected solvent volume to a known research reference compound mass. It is a mathematical tool, not a clinical or human-use guide.',
  },
  {
    question: 'Can this calculator model BAC water dilution?',
    answer:
      'The calculator can model solvent-volume dilution mathematics for laboratory reference solutions, including scenarios where a defined aqueous solvent volume is entered. It does not provide instructions for human use or therapeutic preparation.',
  },
  {
    question: 'What is final assay concentration?',
    answer:
      'Final assay concentration is the concentration present after stock solution, solvent, and dilution steps are combined for an analytical experiment. It is calculated from the final mass or stock contribution divided by final volume.',
  },
  {
    question: 'How are peptide blend percentages calculated?',
    answer:
      'Blend percentage is calculated by dividing one compound mass by the total mass of all compounds and multiplying by 100. This helps compare formulation ratios in a laboratory peptide blend model.',
  },
  {
    question: 'What units does the peptide calculator support?',
    answer:
      'The unit converter supports g, mg, mcg, mL, and µL conversions. These conversions help standardize biochemical calculations and reduce unit-entry errors in research documentation.',
  },
  {
    question: 'Is this calculator intended for medical use?',
    answer:
      'No. This calculator is for laboratory research and educational biochemical calculations only. It is not intended for diagnostic, therapeutic, pharmaceutical, or human-use decisions.',
  },
  {
    question: 'What are common peptide calculation errors?',
    answer:
      'Common errors include mixing mg and mcg, entering µL as mL, overlooking total blend volume, rounding too early, and not documenting solvent additions. Structured calculations reduce analytical preparation mistakes.',
  },
];

const contentSections = [
  {
    title: 'What Is a Research Peptide Blend Calculator?',
    definition:
      'A research peptide blend calculator is an educational software tool that models peptide mass, solvent volume, concentration, and blend percentages for laboratory analysis. It supports biochemical calculations, analytical preparation planning, and non-clinical research documentation without providing human-use guidance.',
    bullets: ['Models peptide solution concentration', 'Compares formulation ratios', 'Supports analytical concentration estimates'],
  },
  {
    title: 'Peptide Concentration Explained',
    definition:
      'Peptide concentration expresses how much reference compound is present in a measured solution volume. In laboratory peptide calculator workflows, concentration is usually reported as mg/mL and mcg/mL to support assay preparation and analytical dilution planning.',
    bullets: ['Formula: mass ÷ volume', '5 mg in 2 mL = 2.5 mg/mL', '2.5 mg/mL = 2,500 mcg/mL'],
  },
  {
    title: 'Understanding Peptide Reconstitution in Laboratory Settings',
    definition:
      'Peptide reconstitution in laboratory settings means combining a measured dry research reference compound with a defined solvent volume. The result is a stock solution concentration that can be used for educational modeling, analytical aliquots, and controlled assay calculations.',
    bullets: ['Choose compound mass', 'Enter reconstitution volume', 'Calculate stock solution concentration'],
  },
  {
    title: 'Analytical Dilution Ratios',
    definition:
      'An analytical dilution ratio compares the stock concentration with the final target concentration after solvent adjustment. Laboratory dilution calculations use proportional relationships to estimate concentration changes and final assay concentration for research-only samples.',
    bullets: ['Use C1 × V1 = C2 × V2', 'Track solvent additions', 'Document final analytical concentration'],
  },
  {
    title: 'Peptide Solution Stability',
    definition:
      'Peptide solution stability is influenced by solvent selection, temperature, light exposure, container material, pH, and time in solution. This educational platform highlights calculation variables but does not replace compound-specific stability documentation or validated laboratory protocols.',
    bullets: ['Minimize repeated handling', 'Use validated reference documentation', 'Record storage and preparation metadata'],
  },
  {
    title: 'Solvent Volume and Concentration Relationships',
    definition:
      'Solvent volume and concentration are inversely related when compound mass remains constant. Increasing solvent volume lowers mg/mL concentration, while decreasing solvent volume raises concentration in the resulting laboratory sample.',
    bullets: ['Constant mass, higher volume = lower concentration', 'Constant mass, lower volume = higher concentration', 'Always verify mL and µL units'],
  },
  {
    title: 'Multi-Compound Blend Calculations',
    definition:
      'Multi-compound blend calculations evaluate each peptide reference compound as part of a combined preparation. The model reports per-compound concentration, blend percentage, total mass, total solution volume, and final analytical concentration.',
    bullets: ['Sum all compound masses', 'Calculate each compound percentage', 'Divide each mass by final volume'],
  },
  {
    title: 'Peptide Storage and Laboratory Handling',
    definition:
      'Laboratory handling of peptide reference compounds should emphasize traceability, clear labeling, documented volumes, and controlled environmental conditions. Storage decisions should follow supplier certificates, safety data sheets, and institutional research procedures.',
    bullets: ['Label mass, solvent, and date', 'Use non-clinical research records', 'Follow institutional safety practices'],
  },
  {
    title: 'Common Research Calculation Errors',
    definition:
      'Common peptide calculation errors include unit mismatches, incorrectly converting mg to mcg, using total blend mass instead of per-compound mass, and forgetting solvent changes. This peptide analytical calculator is designed to make calculation assumptions visible.',
    bullets: ['Check unit conversions', 'Avoid early rounding', 'Separate total and per-compound values'],
  },
];

function formatNumber(value, digits = 3) {
  if (!Number.isFinite(value)) return '0';
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: digits }).format(value);
}

function App() {
  const [dark, setDark] = useState(false);
  const [massMg, setMassMg] = useState(5);
  const [volumeMl, setVolumeMl] = useState(2);
  const [stockConc, setStockConc] = useState(2.5);
  const [stockVolume, setStockVolume] = useState(1);
  const [finalVolume, setFinalVolume] = useState(10);
  const [unitValue, setUnitValue] = useState(5);
  const [unitType, setUnitType] = useState('mg');
  const [blendVolume, setBlendVolume] = useState(3);
  const [compounds, setCompounds] = useState([
    { id: 1, name: 'BPC-157', massMg: 5 },
    { id: 2, name: 'TB-500', massMg: 5 },
    { id: 3, name: 'GHK-Cu', massMg: 10 },
  ]);

  const concentration = volumeMl > 0 ? massMg / volumeMl : 0;
  const totalMass = compounds.reduce((sum, compound) => sum + Number(compound.massMg || 0), 0);
  const blendRows = compounds.map((compound) => ({
    ...compound,
    percentage: totalMass > 0 ? (compound.massMg / totalMass) * 100 : 0,
    concentration: blendVolume > 0 ? compound.massMg / blendVolume : 0,
  }));
  const dilution = finalVolume > 0 ? (stockConc * stockVolume) / finalVolume : 0;
  const dilutionFactor = stockVolume > 0 ? finalVolume / stockVolume : 0;
  const unitConversions = useMemo(() => {
    const value = Number(unitValue) || 0;
    if (unitType === 'mg') return { g: value / 1000, mg: value, mcg: value * 1000 };
    if (unitType === 'mcg') return { g: value / 1_000_000, mg: value / 1000, mcg: value };
    if (unitType === 'g') return { g: value, mg: value * 1000, mcg: value * 1_000_000 };
    if (unitType === 'mL') return { mL: value, uL: value * 1000 };
    return { mL: value / 1000, uL: value };
  }, [unitType, unitValue]);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: 'Research Peptide Blend Calculator',
        description:
          'SEO-focused educational peptide concentration, blend, reconstitution, and dilution calculator for laboratory research and biochemical modeling.',
        inLanguage: 'en-US',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Research Peptide Blend Calculator',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description:
          'Client-side peptide solution calculator for laboratory concentration estimates, multi-compound blend analysis, dilution ratios, and unit conversion.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://example.com/' },
          { '@type': 'ListItem', position: 2, name: 'Research Peptide Calculator', item: 'https://example.com/#calculator' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className={dark ? 'dark' : ''}>
      <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <header className="border-b border-blue-100 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-blue-600">Biochemical Research Tools</p>
              <span className="text-xl font-black">Research Peptide Blend Calculator</span>
            </div>
            <button
              className="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold shadow-sm dark:border-slate-700"
              onClick={() => setDark(!dark)}
            >
              {dark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </nav>
        </header>

        <section className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-white via-blue-50 to-cyan-50 dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
          <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,#1d4ed8_1px,transparent_0)] [background-size:34px_34px]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm dark:border-blue-800 dark:bg-slate-900 dark:text-blue-200">
                For laboratory research and educational purposes only
              </div>
              <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
                Research Peptide Calculator for Concentration, Blend, and Dilution Modeling
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
                A professional peptide blend calculator for laboratory peptide concentration calculations, reconstitution volume modeling, peptide dilution analysis, and multi-compound formulation ratios. This educational calculation tool is designed for non-clinical biochemical research environments.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {['Not intended for diagnostic, therapeutic, or human use.', 'Analytical concentration modeling only.', 'Client-side calculations with transparent formulas.'].map((item) => (
                  <div key={item} className="rounded-2xl border border-blue-100 bg-white/85 p-4 text-sm font-semibold shadow-sm dark:border-slate-800 dark:bg-slate-900/85">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-2xl shadow-blue-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-blue-950/40"
            >
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">Quick concentration result</p>
              <div className="mt-6 rounded-3xl bg-blue-600 p-6 text-white">
                <span className="text-sm uppercase tracking-[0.25em] text-blue-100">Current model</span>
                <p className="mt-3 text-5xl font-black">{formatNumber(concentration)} mg/mL</p>
                <p className="mt-2 text-blue-100">{formatNumber(concentration * 1000)} mcg/mL analytical concentration</p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <Metric label="Peptide mass" value={`${formatNumber(massMg)} mg`} />
                <Metric label="Solvent volume" value={`${formatNumber(volumeMl)} mL`} />
                <Metric label="Dilution ratio" value={`1:${formatNumber(dilutionFactor)}`} />
                <Metric label="Blend mass" value={`${formatNumber(totalMass)} mg`} />
              </div>
            </motion.div>
          </div>
        </section>

        <section id="calculator" className="mx-auto max-w-7xl px-6 py-14">
          <div className="mb-8 max-w-3xl">
            <p className="font-bold uppercase tracking-[0.25em] text-blue-600">Scientific calculation suite</p>
            <h2 className="mt-3 text-3xl font-black">Peptide concentration calculator and laboratory blend model</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Enter mass, solvent volume, blend composition, and dilution variables to produce transparent analytical estimates for research documentation.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Peptide Concentration Calculator" intro="Calculate mg/mL, mcg/mL, and analytical dilution ratio from peptide mass and solvent volume.">
              <Input label="Peptide mass (mg)" value={massMg} onChange={setMassMg} />
              <Input label="Solvent volume (mL)" value={volumeMl} onChange={setVolumeMl} />
              <ResultGrid items={[['Concentration', `${formatNumber(concentration)} mg/mL`], ['Micro concentration', `${formatNumber(concentration * 1000)} mcg/mL`], ['Analytical ratio', `1 mL contains ${formatNumber(concentration)} mg`]]} />
            </Card>

            <Card title="Solution Dilution Calculator" intro="Model dilution ratios, solvent adjustments, and final assay concentration using C1 × V1 = C2 × V2.">
              <Input label="Stock concentration (mg/mL)" value={stockConc} onChange={setStockConc} />
              <Input label="Stock solution volume (mL)" value={stockVolume} onChange={setStockVolume} />
              <Input label="Final solution volume (mL)" value={finalVolume} onChange={setFinalVolume} />
              <ResultGrid items={[['Final concentration', `${formatNumber(dilution)} mg/mL`], ['Final micro concentration', `${formatNumber(dilution * 1000)} mcg/mL`], ['Dilution factor', `${formatNumber(dilutionFactor)}x`], ['Added solvent estimate', `${formatNumber(Math.max(finalVolume - stockVolume, 0))} mL`]]} />
            </Card>

            <Card title="Multi-Peptide Blend Calculator" intro="Combine multiple research reference compounds and calculate concentration per compound, blend percentage, and final analytical concentration.">
              <Input label="Total solution volume (mL)" value={blendVolume} onChange={setBlendVolume} />
              <div className="space-y-3">
                {compounds.map((compound, index) => (
                  <div key={compound.id} className="grid gap-3 rounded-2xl border border-slate-200 p-3 dark:border-slate-700 sm:grid-cols-[1fr_120px]">
                    <input
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
                      value={compound.name}
                      onChange={(event) => setCompounds(compounds.map((item, i) => (i === index ? { ...item, name: event.target.value } : item)))}
                      aria-label="Compound name"
                    />
                    <input
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
                      type="number"
                      value={compound.massMg}
                      onChange={(event) => setCompounds(compounds.map((item, i) => (i === index ? { ...item, massMg: Number(event.target.value) } : item)))}
                      aria-label="Compound mass mg"
                    />
                  </div>
                ))}
              </div>
              <button
                className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-600/20"
                onClick={() => setCompounds([...compounds, { id: Date.now(), name: 'Research compound', massMg: 1 }])}
              >
                Add compound
              </button>
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800">
                    <tr><th className="p-3">Compound</th><th className="p-3">Blend %</th><th className="p-3">mg/mL</th></tr>
                  </thead>
                  <tbody>
                    {blendRows.map((row) => (
                      <tr key={row.id} className="border-t border-slate-200 dark:border-slate-700"><td className="p-3 font-semibold">{row.name}</td><td className="p-3">{formatNumber(row.percentage)}%</td><td className="p-3">{formatNumber(row.concentration)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ResultGrid items={[['Total mass', `${formatNumber(totalMass)} mg`], ['Total solution volume', `${formatNumber(blendVolume)} mL`], ['Final analytical concentration', `${formatNumber(blendVolume > 0 ? totalMass / blendVolume : 0)} mg/mL`]]} />
            </Card>

            <Card title="Unit Conversion Tool" intro="Convert mg, mcg, g, mL, and µL to standardize peptide analytical calculator inputs.">
              <div className="grid grid-cols-[1fr_130px] gap-3">
                <Input label="Value" value={unitValue} onChange={setUnitValue} />
                <label className="text-sm font-bold text-slate-600 dark:text-slate-300">
                  Unit
                  <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-950" value={unitType} onChange={(event) => setUnitType(event.target.value )}>
                    <option value="mg">mg</option><option value="mcg">mcg</option><option value="g">g</option><option value="mL">mL</option><option value="uL">µL</option>
                  </select>
                </label>
              </div>
              <ResultGrid items={Object.entries(unitConversions).map(([unit, value]) => [unit === 'uL' ? 'µL' : unit, formatNumber(value, 6)])} />
              <div className="mt-6 rounded-2xl bg-blue-50 p-4 dark:bg-blue-950/40">
                <h3 className="font-black">Research Preset Library</h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {presets.map((preset) => <button key={preset} onClick={() => setCompounds([...compounds, { id: Date.now(), name: preset, massMg: 5 }])} className="rounded-xl border border-blue-200 bg-white p-3 text-left text-sm font-bold dark:border-blue-900 dark:bg-slate-900">{preset}<span className="block text-xs font-medium text-slate-500">Research Reference Compound</span></button>)}
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="bg-white py-14 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl font-black">Educational research guide for peptide solution calculations</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {contentSections.map((section) => (
                <article key={section.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
                  <h3 className="text-xl font-black text-blue-700 dark:text-blue-300">{section.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">{section.definition}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {section.bullets.map((bullet) => <li key={bullet} className="flex gap-2"><span className="mt-2 h-2 w-2 rounded-full bg-blue-500" />{bullet}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="text-3xl font-black">Scientific summary tables</h2>
          <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">Snippet-ready reference tables summarize the formulas used by this laboratory peptide calculator.</p>
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <table className="w-full text-left text-sm">
              <thead className="bg-blue-600 text-white"><tr><th className="p-4">Calculation</th><th className="p-4">Formula</th><th className="p-4">Research use</th></tr></thead>
              <tbody>
                <tr className="border-t border-slate-200 dark:border-slate-800"><td className="p-4 font-bold">Concentration</td><td className="p-4">mass (mg) ÷ volume (mL)</td><td className="p-4">Peptide solution concentration</td></tr>
                <tr className="border-t border-slate-200 dark:border-slate-800"><td className="p-4 font-bold">Micro conversion</td><td className="p-4">mg × 1,000 = mcg</td><td className="p-4">Peptide mg to mcg converter</td></tr>
                <tr className="border-t border-slate-200 dark:border-slate-800"><td className="p-4 font-bold">Dilution</td><td className="p-4">C1 × V1 = C2 × V2</td><td className="p-4">Final assay concentration</td></tr>
                <tr className="border-t border-slate-200 dark:border-slate-800"><td className="p-4 font-bold">Blend percentage</td><td className="p-4">compound mass ÷ total mass × 100</td><td className="p-4">Peptide blend ratio analysis</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-blue-950 py-14 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl font-black">Frequently Asked Questions</h2>
            <p className="mt-3 max-w-3xl text-blue-100">Research-oriented answers for peptide concentration, laboratory dilution, reconstitution volume, and analytical formulation calculations.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <summary className="cursor-pointer font-bold">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-7 text-blue-100">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
          <p className="font-black text-slate-900 dark:text-white">For laboratory research and educational purposes only.</p>
          <p className="mt-2">Not intended for diagnostic, therapeutic, or human use. This calculator provides analytical concentration estimates only.</p>
        </footer>
      </main>
    </div>
  );
}

function Card({ title, intro, children }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-100/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-blue-950/20"
    >
      <h2 className="text-2xl font-black">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{intro}</p>
      <div className="mt-5 space-y-4">{children}</div>
    </motion.article>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label className="block text-sm font-bold text-slate-600 dark:text-slate-300">
      {label}
      <input
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-900 outline-none ring-blue-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        type="number"
        value={value}
        min="0"
        step="0.01"
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function ResultGrid({ items }) {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {items.map(([label, value]) => <Metric key={label} label={label} value={value} />)}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">{label}</p>
      <p className="mt-2 text-lg font-black">{value}</p>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
