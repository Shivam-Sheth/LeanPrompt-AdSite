const steps = [
  {
    step: "1",
    title: "You write your prompt",
    desc: "Type naturally—no need to shorten yourself. Say what you need in your own words.",
  },
  {
    step: "2",
    title: "LeanPrompt optimizes before send",
    desc: "We rewrite your prompt into a shorter, intent-preserving version—before it ever reaches the model.",
  },
  {
    step: "3",
    title: "The LLM gets an efficient prompt",
    desc: "Fewer tokens in, same quality out. Lower cost, lower carbon, clearer instructions.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-neutral-50 bg-grid-pattern">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 text-center">
          How it works
        </h2>
        <p className="mt-4 text-neutral-600 text-center max-w-2xl mx-auto">
          Three steps from verbose to efficient—without changing how you work.
        </p>
        <div className="mt-16 relative">
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-neutral-200" style={{ marginLeft: "12.5%", marginRight: "12.5%", width: "75%" }} />
          <div className="grid md:grid-cols-3 gap-10 lg:gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-purple-600 text-white font-display font-bold text-2xl flex items-center justify-center shadow-lg shadow-purple-600/25">
                  {s.step}
                </div>
                <h3 className="mt-6 font-display font-semibold text-xl text-neutral-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-neutral-600 max-w-xs">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
