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
            <a href="#impact" className="hover:text-purple-400 transition-colors">Contact</a>
          </nav>
        </div>
        <p className="mt-8 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} LeanPrompt. Chrome extension + Supabase auth; compression runs locally in the browser.
        </p>
      </div>
    </footer>
  );
}
