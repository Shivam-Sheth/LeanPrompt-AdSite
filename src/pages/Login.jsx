import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [forgotMode, setForgotMode] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/dashboard", { replace: true });
    });
  }, [navigate]);

  const clearMessages = () => { setError(""); setInfo(""); };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!email || (!forgotMode && !password)) { setError("Please fill in all fields."); return; }
    clearMessages();
    setLoading(true);

    if (forgotMode) {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://lean-prompt.vercel.app/reset-password",
      });
      setLoading(false);
      if (err) { setError(err.message); return; }
      setInfo("Password reset email sent — check your inbox.");
      setForgotMode(false);
      return;
    }

    if (tab === "signin") {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (err) { setError(err.message); return; }
      navigate("/dashboard", { replace: true });
    } else {
      const { data, error: err } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (err) { setError(err.message); return; }
      if (data.user && !data.session) {
        setInfo("Check your email for a confirmation link, then sign in.");
        setTab("signin");
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
      <Link to="/" className="mb-8 text-2xl font-display font-bold tracking-tight text-white">
        <span className="text-purple-400">Lean</span>Prompt
      </Link>

      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-black/40">
        <h1 className="text-xl font-semibold text-white mb-6">
          {forgotMode ? "Reset your password" : tab === "signin" ? "Welcome back" : "Create an account"}
        </h1>

        {!forgotMode && (
          <div className="flex gap-1 bg-slate-800 rounded-xl p-1 mb-6">
            {["signin", "signup"].map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); clearMessages(); }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === t ? "bg-purple-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                {t === "signin" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>
        )}

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}
        {info && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
            {info}
          </div>
        )}

        <form onSubmit={handleAuth} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
          />
          {!forgotMode && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
          )}
          <button
            type="submit"
            disabled={loading}
            className="py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors shadow-lg shadow-purple-900/30"
          >
            {loading ? "…" : forgotMode ? "Send reset email" : tab === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {!forgotMode && tab === "signin" && (
          <button
            onClick={() => { setForgotMode(true); clearMessages(); }}
            className="mt-4 text-sm text-slate-500 hover:text-purple-400 transition-colors w-full text-center"
          >
            Forgot password?
          </button>
        )}
        {forgotMode && (
          <button
            onClick={() => { setForgotMode(false); clearMessages(); }}
            className="mt-4 text-sm text-slate-500 hover:text-purple-400 transition-colors w-full text-center"
          >
            ← Back to sign in
          </button>
        )}
      </div>
    </div>
  );
}
