const cards = [
  {
    title: "Easy to understand",
    copy: "“Grammarly for AI prompts”—everyone gets it in one sentence. No jargon, no complexity.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Valuable for enterprises",
    copy: "Companies using LLMs heavily see immediate savings on token costs and a clearer path to sustainable AI usage.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "More sustainable AI",
    copy: "Supports greener AI by reducing unnecessary compute. Efficiency and sustainability go hand in hand.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

export default function Judges() {
  return (
    <section id="why-leanprompt" className="py-20 lg:py-28 bg-neutral-50 bg-grid-pattern">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-900 text-center">
          Why LeanPrompt matters
        </h2>
        <p className="mt-4 text-neutral-600 text-center max-w-2xl mx-auto">
          For users, for business, and for the planet.
        </p>
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div
              key={i}
              className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm hover:shadow-lg hover:border-purple-100 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                {c.icon}
              </div>
              <h3 className="mt-5 font-display font-semibold text-lg text-neutral-900">
                {c.title}
              </h3>
              <p className="mt-2 text-neutral-600 leading-relaxed">
                {c.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
