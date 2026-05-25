import { Link } from "react-router-dom";

const EXTENSION_ZIP = "/leanprompt-extension.zip";

const steps = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    label: "Step 1",
    title: "Download the zip",
    body: "Click the download button above. Save leanprompt-extension.zip anywhere — your Downloads folder works fine.",
    highlight: null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
      </svg>
    ),
    label: "Step 2",
    title: "Unzip to a permanent folder",
    body: "Extract the zip. Keep the extracted folder somewhere you won't delete it — Chrome loads the extension from this folder every time.",
    highlight: null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
      </svg>
    ),
    label: "Step 3",
    title: "Open Chrome Extensions",
    body: "In Chrome, type this in the address bar and press Enter:",
    highlight: "chrome://extensions",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
      </svg>
    ),
    label: "Step 4",
    title: "Turn on Developer mode",
    body: 'Look for the "Developer mode" toggle in the top-right corner of the Extensions page. Flip it on. New buttons will appear.',
    highlight: null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
    label: "Step 5",
    title: "Load unpacked",
    body: 'Click "Load unpacked" → navigate to the folder you extracted in Step 2 → select it. LeanPrompt will appear in your extensions list.',
    highlight: null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
    label: "Step 6",
    title: "Pin it and start compressing",
    body: "Click the puzzle-piece icon in Chrome's toolbar, find LeanPrompt, and click the pin. Open ChatGPT, Claude, or Gemini — type a prompt and the LeanPrompt button will appear.",
    highlight: null,
  },
];

export default function Download() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      {/* Nav */}
      <header className="border-b border-neutral-200 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl text-neutral-900 tracking-tight hover:text-purple-600 transition-colors">
            <span className="text-purple-600">Lean</span>Prompt
          </Link>
          <Link to="/login" className="text-sm font-semibold text-purple-600 hover:text-purple-500">
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-violet-500 text-white">
        <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Beta · Version 0.1.0 · Chrome 120+
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            Install LeanPrompt
          </h1>
          <p className="mt-4 text-lg text-purple-100 max-w-xl mx-auto leading-relaxed">
            Say less, get more. Compress your AI prompts before you hit send — works on ChatGPT, Claude, Gemini, and 40+ other AI tools.
          </p>

          {/* Download CTA */}
          <a
            href={EXTENSION_ZIP}
            download="leanprompt-extension.zip"
            className="mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-purple-700 font-bold text-lg shadow-xl shadow-purple-900/30 hover:bg-purple-50 active:scale-95 transition-all duration-150"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download for Chrome · Free
          </a>

          <p className="mt-4 text-purple-200 text-sm">
            Also available on the{" "}
            <a
              href="https://chromewebstore.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              Chrome Web Store
            </a>{" "}
            · under review
          </p>

          {/* Beta notice */}
          <div className="mt-8 mx-auto max-w-xl bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-sm text-purple-100 text-left flex gap-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 shrink-0 mt-0.5 text-amber-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <div>
              <span className="font-semibold text-white">This is a beta release.</span> Compression is accurate on most prompts but may occasionally shorten things too aggressively or miss nuance. You always see the compressed version before it's sent — you're in control. Found a bug?{" "}
              <a href="mailto:shethshivam123@gmail.com" className="underline underline-offset-2 hover:text-white">
                Let us know.
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="container mx-auto px-6 lg:px-12 py-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-neutral-900 text-center mb-2">
          How to install
        </h2>
        <p className="text-center text-neutral-500 text-sm mb-12">
          Takes about 60 seconds. No account needed to start.
        </p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-8 bottom-8 w-px bg-gradient-to-b from-purple-300 via-purple-200 to-transparent hidden sm:block" />

          <ol className="space-y-6">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-5 group">
                {/* Number circle */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white font-bold text-sm flex items-center justify-center shadow-md shadow-purple-200 z-10">
                  {i + 1}
                </div>

                {/* Card */}
                <div className="flex-1 bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-purple-500 uppercase tracking-wider mb-0.5">
                        {step.label}
                      </p>
                      <h3 className="font-semibold text-neutral-900 text-base leading-snug">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-neutral-600 text-sm leading-relaxed">
                        {step.body}
                      </p>
                      {step.highlight && (
                        <div className="mt-3 inline-flex items-center gap-2 bg-neutral-900 text-green-400 font-mono text-sm px-4 py-2 rounded-lg select-all">
                          {step.highlight}
                          <button
                            onClick={() => navigator.clipboard.writeText(step.highlight)}
                            title="Copy"
                            className="text-neutral-500 hover:text-white transition-colors ml-1"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Warning box */}
        <div className="mt-10 flex gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <div>
            <strong className="font-semibold">Chrome may show a warning the first time.</strong> That's expected for manually installed extensions. You can safely dismiss it. Once the Chrome Web Store listing is live, installation will be one-click with no warning.
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
          <Link to="/" className="text-purple-600 hover:underline">
            ← Back to home
          </Link>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-neutral-900 transition-colors">
              Privacy Policy
            </Link>
            <a href="mailto:shethshivam123@gmail.com" className="hover:text-neutral-900 transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
