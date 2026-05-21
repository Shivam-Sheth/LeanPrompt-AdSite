import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    // Supabase v2 automatically processes the recovery token from the URL hash
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        // Session is active — user can now set a new password
        setInvalid(false);
      }
    });

    // Check if we have a valid session already (token already processed)
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        // No session and no recovery hash = invalid/expired link
        const hash = window.location.hash;
        if (!hash.includes("access_token") && !hash.includes("type=recovery")) {
          setInvalid(true);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords don't match."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setError("");
    setLoading(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (err) { setError(err.message); return; }
    setDone(true);
    setTimeout(() => navigate("/dashboard", { replace: true }), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
      <Link to="/" className="mb-8 text-2xl font-display font-bold tracking-tight text-white">
        <span className="text-purple-400">Lean</span>Prompt
      </Link>

      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-black/40">
        {invalid ? (
          <>
            <h1 className="text-xl font-semibold text-white mb-3">Link expired</h1>
            <p className="text-slate-400 text-sm mb-6">This reset link is invalid or has expired. Request a new one.</p>
            <Link to="/login" className="block w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm text-center transition-colors">
              Back to login
            </Link>
          </>
        ) : done ? (
          <>
            <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-white mb-2">Password updated</h1>
            <p className="text-slate-400 text-sm">Redirecting to your dashboard…</p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold text-white mb-2">Set a new password</h1>
            <p className="text-slate-400 text-sm mb-6">Choose a strong password for your account.</p>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="password"
                placeholder="New password (min. 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
                className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors shadow-lg shadow-purple-900/30"
              >
                {loading ? "Updating…" : "Set new password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
