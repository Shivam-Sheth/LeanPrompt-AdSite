import { useState } from "react";

const examples = [
  {
    id: "fake-news",
    label: "Fake news classification",
    original: "Please analyze the following social media post and determine whether it contains misinformation related to vaccines. Explain your reasoning clearly and classify it as true, false, or misleading.",
    optimized: "Classify this post for vaccine misinformation as true, false, or misleading. Briefly explain why.",
    tokensBefore: 42,
    tokensAfter: 18,
    costReduction: 38,
    carbonReduction: 32,
  },
  {
    id: "email",
    label: "Email drafting",
    original: "Please help me write a polite and professional email to my professor asking for an extension on my assignment because I have been dealing with personal issues and need a little more time.",
    optimized: "Draft a polite email to my professor requesting an extension due to personal issues.",
    tokensBefore: 38,
    tokensAfter: 16,
    costReduction: 29,
    carbonReduction: 24,
  },
  {
    id: "summarization",
    label: "Document summarization",
    original: "Can you read the following long text and summarize the main ideas into concise bullet points while making sure nothing important is left out?",
    optimized: "Summarize the text into concise bullet points covering all key ideas.",
    tokensBefore: 28,
    tokensAfter: 12,
    costReduction: 42,
    carbonReduction: 38,
  },
  {
    id: "coding",
    label: "Coding help",
    original: "Please review the following Python code, identify any bugs or inefficiencies, explain what is going wrong, and provide a corrected version with comments.",
    optimized: "Review this Python code, identify bugs and inefficiencies, explain them briefly, and return a corrected commented version.",
    tokensBefore: 35,
    tokensAfter: 20,
    costReduction: 31,
    carbonReduction: 28,
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
          Click an example to see how LeanPrompt optimizes prompts—no API calls, simulated results for demo.
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
              </button>
            ))}
          </div>

          <div className="lg:col-span-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 lg:p-8 shadow-sm">
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <MetricCard label="Token reduction" value={`${tokenReduction}%`} sub={`${selected.tokensBefore} → ${selected.tokensAfter}`} />
                <MetricCard label="Cost saved" value={`~${selected.costReduction}%`} sub="est. inference" />
                <MetricCard label="CO₂ reduction" value={`~${selected.carbonReduction}%`} sub="est. per query" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
