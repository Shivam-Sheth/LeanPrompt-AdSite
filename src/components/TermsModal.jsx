import { useEffect, useRef, useState } from "react";

export default function TermsModal({ open, onClose, onAccept }) {
  const scrollRef = useRef(null);
  const [scrolledToEnd, setScrolledToEnd] = useState(false);

  useEffect(() => {
    if (open) setScrolledToEnd(false);
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function handleScroll(e) {
    const el = e.currentTarget;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 40) {
      setScrolledToEnd(true);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <h2 className="font-bold text-lg text-neutral-900">
            Terms &amp; Conditions
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 transition-colors"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="px-6 py-5 overflow-y-auto text-sm text-neutral-700 leading-relaxed space-y-4"
        >
          <p className="text-neutral-500">
            Last updated: May 2026 · LeanPrompt Beta (v0.1.0)
          </p>

          <section>
            <h3 className="font-semibold text-neutral-900 mb-1">1. Beta software</h3>
            <p>
              LeanPrompt is provided as a beta release for testing and evaluation. Features may
              change, break, or be removed without notice. The compression engine may occasionally
              shorten prompts too aggressively or miss nuance. You always review the compressed
              prompt before it is sent — you remain in control of what you submit to any AI service.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-neutral-900 mb-1">2. How your prompts are handled</h3>
            <p>
              Compression runs locally in your browser by default. When Smart (Gemini) compression
              is enabled, your prompt text is sent to our backend and Google's Gemini API to produce
              a higher-quality compression. We store anonymized prompt/compression pairs and your
              accept/reject feedback to improve the offline engine. Do not paste passwords, secrets,
              or sensitive personal data into any prompt.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-neutral-900 mb-1">3. Accounts &amp; usage</h3>
            <p>
              Some features require an account. You are responsible for activity under your account.
              Free and paid tiers may have monthly usage limits. We may adjust limits and pricing
              during the beta period.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-neutral-900 mb-1">4. Third-party AI services</h3>
            <p>
              LeanPrompt works alongside ChatGPT, Claude, Gemini, and other AI tools. Your use of
              those services is governed by their own terms. LeanPrompt is not affiliated with,
              endorsed by, or responsible for those services or their output.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-neutral-900 mb-1">5. No warranty</h3>
            <p>
              The software is provided "as is" without warranty of any kind. We do not guarantee that
              compression preserves the exact meaning of every prompt. To the maximum extent permitted
              by law, LeanPrompt is not liable for any loss arising from use of the extension.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-neutral-900 mb-1">6. Privacy</h3>
            <p>
              Our handling of data is described in the Privacy Policy. By accepting these terms you
              acknowledge you have reviewed it.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-neutral-900 mb-1">7. Contact</h3>
            <p>
              Questions, bug reports, or data requests:{" "}
              <a href="mailto:leanpromptsupport@gmail.com" className="text-purple-600 underline underline-offset-2">
                leanpromptsupport@gmail.com
              </a>
              .
            </p>
          </section>

          <p className="text-neutral-400 text-xs pt-2">
            Scroll to the end to enable the Accept button.
          </p>
        </div>

        <div className="px-6 py-4 border-t border-neutral-200 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-500">
            {scrolledToEnd ? "Thanks for reading." : "Please scroll through the full terms."}
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onAccept}
              disabled={!scrolledToEnd}
              className="px-5 py-2 rounded-lg text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Accept &amp; Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
