import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-12 bg-neutral-900 text-neutral-300">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="font-display font-bold text-white text-lg">LeanPrompt</p>
            <p className="text-sm text-neutral-400 mt-0.5">Grammarly for AI prompts</p>
          </div>
          <nav className="flex gap-8 text-sm">
            <a href="/download" className="hover:text-purple-400 transition-colors">Download</a>
            <a href="#problem" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#demo" className="hover:text-purple-400 transition-colors">Demo</a>
            <a href="mailto:shethshivam123@gmail.com" className="hover:text-purple-400 transition-colors">Contact</a>
          </nav>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} LeanPrompt. All rights reserved.</p>
          <Link to="/privacy" className="hover:text-neutral-300 transition-colors underline underline-offset-2">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
