import { useState } from "react";

const links = [
  { label: "Problem", id: "problem" },
  { label: "How it works", id: "how-it-works" },
  { label: "Demo", id: "demo" },
  { label: "Impact", id: "impact" },
  { label: "Why LeanPrompt", id: "why-leanprompt" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-md">
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <button onClick={() => scrollTo("problem")} className="font-display font-bold text-xl text-neutral-900 hover:text-purple-600 transition-colors">
          LeanPrompt
        </button>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-sm font-medium text-neutral-600 hover:text-purple-600 transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-neutral-100"
          aria-label="Menu"
        >
          <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-6 py-4 flex flex-col gap-2">
          {links.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left py-2 font-medium text-neutral-700 hover:text-purple-600">
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
