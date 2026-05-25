export default function Hero({ onTryDemo, onSeeImpact }) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-neutral-50 bg-grid-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/40 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 text-center lg:text-left animate-fade-in">
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight">
            LeanPrompt
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-purple-600 font-semibold">
            Grammarly for AI prompts
          </p>
          <p className="mt-6 text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Optimize prompts before you hit send. LeanPrompt rewrites your input into shorter, more efficient versions that preserve intent while reducing token usage, estimated cost, and carbon footprint in every AI interaction.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="/download"
              className="px-6 py-3.5 rounded-xl bg-purple-600 text-white font-semibold shadow-lg shadow-purple-600/25 hover:bg-purple-700 hover:shadow-purple-600/30 transition-all duration-200"
            >
              Download for Chrome
            </a>
            <button
              onClick={onTryDemo}
              className="px-6 py-3.5 rounded-xl border-2 border-purple-600 text-purple-700 font-semibold hover:bg-purple-50 transition-all duration-200"
            >
              Try Demo
            </button>
            <button
              onClick={onSeeImpact}
              className="px-6 py-3.5 rounded-xl border-2 border-neutral-300 text-neutral-700 font-semibold hover:border-purple-500 hover:text-purple-700 hover:bg-purple-50/50 transition-all duration-200"
            >
              See Impact
            </button>
          </div>
        </div>
        <div className="flex-1 w-full max-w-lg animate-slide-up">
          <MockChatVisual />
        </div>
      </div>
    </section>
  );
}

function MockChatVisual() {
  const original = "Please analyze the following social media post and determine whether it contains misinformation...";
  const optimized = "Label this post: vaccine misinfo — true, false, or misleading? Explain briefly.";
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-xl shadow-neutral-200/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-neutral-100 bg-neutral-50/80 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <div className="w-2 h-2 rounded-full bg-amber-400" />
        <div className="w-2 h-2 rounded-full bg-purple-500" />
        <span className="ml-2 text-sm text-neutral-500 font-medium">Chat — LeanPrompt active</span>
      </div>
      <div className="p-4 space-y-4">
        <div className="rounded-xl bg-neutral-100 p-3">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Original</p>
          <p className="text-sm text-neutral-700 line-clamp-2">{original}</p>
          <p className="mt-2 text-xs text-neutral-500">~42 tokens</p>
        </div>
        <div className="flex justify-center">
          <span className="text-purple-600 font-semibold text-sm">↓ Optimized</span>
        </div>
        <div className="rounded-xl bg-purple-50 border border-purple-100 p-3 glow-purple">
          <p className="text-xs font-medium text-purple-700 uppercase tracking-wider mb-1">LeanPrompt</p>
          <p className="text-sm text-neutral-800 line-clamp-2">{optimized}</p>
          <p className="mt-2 text-xs text-purple-600 font-medium">~13 tokens · 69% fewer</p>
        </div>
        <div className="flex gap-3 pt-2">
          <MetricPill label="Cost" value="-38%" />
          <MetricPill label="CO₂" value="-32%" />
        </div>
      </div>
    </div>
  );
}

function MetricPill({ label, value }) {
  return (
    <span className="flex-1 rounded-lg bg-neutral-100 py-2 text-center text-sm">
      <span className="font-semibold text-purple-600">{value}</span>
      <span className="text-neutral-500 ml-1">{label}</span>
    </span>
  );
}
