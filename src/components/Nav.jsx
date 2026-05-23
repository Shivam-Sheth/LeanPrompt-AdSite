import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";

const links = [
  { label: "Problem", id: "problem" },
  { label: "How it works", id: "how-it-works" },
  { label: "Demo", id: "demo" },
  { label: "Impact", id: "impact" },
  { label: "Why LeanPrompt", id: "why-leanprompt" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === "/";

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  const scrollTo = (id) => {
    if (!isLanding) {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-md">
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <Link to="/" className="font-display font-bold text-xl text-neutral-900 hover:text-purple-600 transition-colors">
          LeanPrompt
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {isLanding && links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-sm font-medium text-neutral-600 hover:text-purple-600 transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/download"
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors shadow-sm"
          >
            Download
          </Link>
          {session ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-neutral-700 hover:text-purple-600 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors shadow-sm"
            >
              Sign in
            </Link>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-neutral-100"
          aria-label="Menu"
        >
          <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-6 py-4 flex flex-col gap-2">
          {isLanding && links.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left py-2 font-medium text-neutral-700 hover:text-purple-600">
              {l.label}
            </button>
          ))}
          <Link to="/download" onClick={() => setOpen(false)} className="block py-2 font-semibold text-purple-600 hover:text-purple-500">
            Download extension
          </Link>
          <div className="pt-2 border-t border-neutral-100 mt-1">
            {session ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="block py-2 font-medium text-neutral-700 hover:text-purple-600">
                  Dashboard
                </Link>
                <button onClick={handleSignOut} className="block py-2 font-medium text-neutral-600 hover:text-purple-600">
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="block py-2 font-semibold text-purple-600 hover:text-purple-500">
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
