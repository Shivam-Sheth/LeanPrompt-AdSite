import { useState } from "react";

const examples = [
  {
    id: "fake-news",
    label: "Fake news classification",
    original: "Please analyze the following social media post and determine whether it contains misinformation related to vaccines. Explain your reasoning clearly and classify it as true, false, or misleading.",
    optimized: "Label this post: vaccine misinfo — true, false, or misleading? Explain briefly.",
    tokensBefore: 42,
    tokensAfter: 13,
    costReduction: 55,
    carbonReduction: 50,
  },
  {
    id: "email",
    label: "Email drafting",
    original: "Please help me write a polite and professional email to my professor asking for an extension on my assignment because I have been dealing with personal issues and need a little more time.",
    optimized: "Email professor: politely request assignment extension, citing personal issues.",
    tokensBefore: 38,
    tokensAfter: 11,
    costReduction: 57,
    carbonReduction: 52,
  },
  {
    id: "summarization",
    label: "Document summarization",
    original: "Can you read the following long text and summarize the main ideas into concise bullet points while making sure nothing important is left out?",
    optimized: "Summarize this text as bullet points. Cover all key ideas.",
    tokensBefore: 28,
    tokensAfter: 10,
    costReduction: 51,
    carbonReduction: 46,
  },
  {
    id: "coding",
    label: "Coding help",
    original: "Please review the following Python code, identify any bugs or inefficiencies, explain what is going wrong, and provide a corrected version with comments.",
    optimized: "Debug this Python code: explain issues, return fixed version with comments.",
    tokensBefore: 35,
    tokensAfter: 12,
    costReduction: 53,
    carbonReduction: 48,
  },
  {
    id: "partial",
    label: "Partial selection",
    isPartial: true,
    context: `def calculate_discount(price, discount_percent):\n    if discount_percent > 100:\n        return 0\n    discount = price * discount_percent\n    return price - discount`,
    originalInstruction: "Please carefully review this function, identify any bugs or logic errors that are present, explain what is going wrong in detail, and then provide me with a corrected version of the code.",
    optimized: "Find bugs/logic errors, explain, return fixed version.",
    tokensBefore: 35,
    tokensAfter: 9,
    costReduction: 59,
    carbonReduction: 54,
  },
];

export default function Demo() {
  const [selected, setSelected] = useState(examples[0]);
  const tokenReduction = Math.round(((selected.tokensBefore - selected.tokensAfter) / selected.tokensBefore) * 100);

  return (
    <section id="demo" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 text-center">
          Try the demo
        </h2>
        <p className="mt-4 text-neutral-600 text-center max-w-2xl mx-auto">
          Click an example to see how LeanPrompt optimizes prompts — no API calls, simulated results for demo.
        </p>

        <div className="mt-12 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {examples.map((ex) => (
              <button
                key={ex.id}
                onClick={() => setSelected(ex)}
                className={`w-full text-left rounded-xl border-2 px-4 py-3 transition-all duration-200 ${
                  selected.id === ex.id
                    ? "border-purple-500 bg-purple-50 shadow-md"
                    : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                <span className="font-medium text-neutral-900">{ex.label}</span>
                {ex.isPartial && (
                  <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">highlight only</span>
                )}
              </button>
            ))}
          </div>

          <div className="lg:col-span-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 lg:p-8 shadow-sm">
            {selected.isPartial ? (
              <PartialDemo selected={selected} tokenReduction={tokenReduction} />
            ) : (
              <StandardDemo selected={selected} tokenReduction={tokenReduction} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StandardDemo({ selected, tokenReduction }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Original prompt</p>
        <p className="text-neutral-700 bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
          {selected.original}
        </p>
        <p className="mt-1 text-sm text-neutral-500">{selected.tokensBefore} tokens</p>
      </div>
      <div className="flex items-center gap-2 text-purple-600 font-medium">
        <span>↓</span>
        <span>LeanPrompt optimized</span>
      </div>
      <div>
        <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-2">Optimized prompt</p>
        <p className="text-neutral-800 bg-purple-50 rounded-xl p-4 border border-purple-100">
          {selected.optimized}
        </p>
        <p className="mt-1 text-sm text-purple-600 font-medium">{selected.tokensAfter} tokens</p>
      </div>
      <Metrics selected={selected} tokenReduction={tokenReduction} />
    </div>
  );
}

function PartialDemo({ selected, tokenReduction }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Full prompt</p>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-100">
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Context — not selected</span>
          </div>
          <pre className="px-4 py-3 text-sm text-neutral-500 font-mono whitespace-pre-wrap leading-relaxed">{selected.context}</pre>

          <div className="border-t border-amber-200 bg-amber-50 px-4 py-3">
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Selected instruction</span>
            <p className="mt-1 text-neutral-700 text-sm leading-relaxed">{selected.originalInstruction}</p>
          </div>
        </div>
        <p className="mt-1 text-sm text-neutral-500">{selected.tokensBefore} tokens selected</p>
      </div>

      <div className="flex items-center gap-2 text-purple-600 font-medium text-sm">
        <span>↓</span>
        <span>LeanPrompt compresses selection only</span>
      </div>

      <div>
        <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-2">Result sent to AI</p>
        <div className="bg-purple-50 rounded-xl border border-purple-100 overflow-hidden">
          <pre className="px-4 py-3 text-sm text-neutral-500 font-mono whitespace-pre-wrap leading-relaxed">{selected.context}</pre>
          <div className="border-t border-purple-200 px-4 py-3">
            <p className="text-neutral-800 text-sm font-medium">{selected.optimized}</p>
          </div>
        </div>
        <p className="mt-1 text-sm text-purple-600 font-medium">{selected.tokensAfter} tokens (instruction only)</p>
      </div>

      <Metrics selected={selected} tokenReduction={tokenReduction} />
    </div>
  );
}

function Metrics({ selected, tokenReduction }) {
  return (
    <div className="grid grid-cols-3 gap-4 pt-2">
      <MetricCard label="Token reduction" value={`${tokenReduction}%`} sub={`${selected.tokensBefore} → ${selected.tokensAfter}`} />
      <MetricCard label="Cost saved" value={`~${selected.costReduction}%`} sub="est. inference" />
      <MetricCard label="CO₂ reduction" value={`~${selected.carbonReduction}%`} sub="est. per query" />
    </div>
  );
}

function MetricCard({ label, value, sub }) {
  return (
    <div className="rounded-xl bg-white border border-neutral-200 p-4 text-center shadow-sm">
      <p className="text-2xl font-bold text-purple-600">{value}</p>
      <p className="text-sm font-medium text-neutral-700 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-neutral-500 mt-0.5">{sub}</p>}
    </div>
  );
}
