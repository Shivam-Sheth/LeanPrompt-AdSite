const metrics = [
  { value: "Up to 40%", label: "Fewer prompt tokens", sub: "Shorter prompts, same intent" },
  { value: "Lower", label: "Compute cost per query", sub: "Pay for what you need" },
  { value: "Lower", label: "Estimated carbon impact", sub: "At scale, every token counts" },
  { value: "Clearer", label: "Prompts for the model", sub: "Better clarity, better results" },
];

const barData = [
  { label: "Tokens", verbose: 100, lean: 58 },
  { label: "Cost", verbose: 100, lean: 62 },
  { label: "Carbon", verbose: 100, lean: 76 },
];

export default function Impact() {
  return (
    <section id="impact" className="py-20 lg:py-28 bg-neutral-50 bg-grid-pattern">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 text-center">
          The impact
        </h2>
        <p className="mt-4 text-neutral-600 text-center max-w-2xl mx-auto">
          Real savings on tokens, cost, and carbon—without changing your workflow.
        </p>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-lg hover:border-purple-100 transition-all duration-300"
            >
              <p className="text-2xl lg:text-3xl font-bold text-purple-600">{m.value}</p>
              <p className="mt-1 font-display font-semibold text-neutral-900">{m.label}</p>
              <p className="mt-1 text-sm text-neutral-500">{m.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-2xl mx-auto">
          <h3 className="font-display font-semibold text-xl text-neutral-900 text-center mb-8">
            Verbose prompt vs LeanPrompt optimized
          </h3>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 lg:p-8 shadow-sm">
            <div className="space-y-6">
              {barData.map((row, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-neutral-700">{row.label}</span>
                    <span className="text-neutral-500">
                      Verbose 100% → Lean {row.lean}%
                    </span>
                  </div>
                  <div className="flex gap-4 h-10 items-center">
                    <div className="flex-1 flex rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
                      <div
                        className="rounded-l-lg bg-neutral-400 h-full transition-all duration-500 flex items-center justify-end pr-2 text-white text-xs font-medium"
                        style={{ width: `${row.verbose}%` }}
                      />
                    </div>
                    <div className="flex-1 flex rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
                      <div
                        className="rounded-l-lg bg-purple-500 h-full flex items-center justify-end pr-2 text-white text-xs font-medium transition-all duration-500"
                        style={{ width: `${row.lean}%` }}
                      >
                        {row.lean}%
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-1 text-xs text-neutral-500">
                    <span className="flex-1 text-center">Verbose</span>
                    <span className="flex-1 text-center">LeanPrompt</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-8 mt-8 pt-6 border-t border-neutral-100 justify-center text-sm">
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-neutral-400" /> Verbose
              </span>
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-purple-500" /> LeanPrompt
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
