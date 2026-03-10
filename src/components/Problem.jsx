const problems = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Rising AI compute costs",
    copy: "Every token costs money. Verbose prompts drive up inference bills for individuals and enterprises alike.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Carbon emissions at scale",
    copy: "Inefficient prompts mean more compute per query. At scale, that translates to unnecessary carbon impact.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: "Verbose by habit",
    copy: "Users often type long prompts when shorter ones would preserve the same meaning—and get the same result.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 text-center">
          Why this matters
        </h2>
        <p className="mt-4 text-neutral-600 text-center max-w-2xl mx-auto">
          Inefficient prompts aren’t just noisy—they’re expensive and unsustainable.
        </p>
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {problems.map((p, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-neutral-200 bg-neutral-50/50 p-8 shadow-sm hover:shadow-lg hover:border-purple-100 hover:bg-white transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                {p.icon}
              </div>
              <h3 className="mt-5 font-display font-semibold text-lg text-neutral-900">
                {p.title}
              </h3>
              <p className="mt-2 text-neutral-600 leading-relaxed">
                {p.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
