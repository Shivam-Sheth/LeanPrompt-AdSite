import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Confirmed() {
  const [status, setStatus] = useState("checking"); // checking | ok | error
  const [message, setMessage] = useState("Verifying your email…");

  useEffect(() => {
    let active = true;
    // Supabase appends the verified session to the URL; detectSessionInUrl picks it up.
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return;
        if (data.session) {
          setStatus("ok");
          setMessage("Your email is confirmed and you're signed in on the web.");
        } else {
          setStatus("ok");
          setMessage("Your email is confirmed. You can now sign in.");
        }
      })
      .catch(() => {
        if (!active) return;
        setStatus("error");
        setMessage("We couldn't verify automatically, but your link may still have worked. Try signing in.");
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 text-center">
      <Link to="/" className="mb-8 text-2xl font-display font-bold tracking-tight text-white">
        <span className="text-purple-400">Lean</span>Prompt
      </Link>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-black/40">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-purple-600/15 border border-purple-500/30">
          {status === "error" ? (
            <span className="text-2xl">⚠️</span>
          ) : (
            <svg className="h-7 w-7 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        <h1 className="text-xl font-semibold text-white mb-2">
          {status === "checking" ? "Confirming…" : status === "error" ? "Almost there" : "Email confirmed"}
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed mb-6">{message}</p>

        <div className="rounded-xl bg-purple-600/10 border border-purple-500/20 px-4 py-3 text-left text-sm text-purple-200 mb-6">
          <p className="font-medium mb-1">Next step</p>
          <p className="text-purple-300/90">
            Open the LeanPrompt extension (the floating icon next to your prompt box, or the toolbar popup) and sign in
            with this email and password.
          </p>
        </div>

        <p className="text-xs text-slate-500">
          Need help? Email{" "}
          <a className="text-purple-400 hover:text-purple-300" href="mailto:leanpromptsupport@gmail.com">
            leanpromptsupport@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
