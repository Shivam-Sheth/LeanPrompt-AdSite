import { Link } from "react-router-dom";

const LAST_UPDATED = "May 2026";
const CONTACT = "shethshivam123@gmail.com";

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-neutral-900 mb-3">{title}</h2>
      {children}
    </section>
  );
}

function P({ children }) {
  return <p className="text-neutral-600 leading-relaxed mb-3">{children}</p>;
}

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200 mb-3">
      <table className="w-full text-sm">
        <thead className="bg-neutral-50 border-b border-neutral-200">
          <tr>
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-3 font-semibold text-neutral-700">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-neutral-600 align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Privacy() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      <header className="border-b border-neutral-200 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl text-neutral-900 tracking-tight hover:text-purple-600 transition-colors">
            <span className="text-purple-600">Lean</span>Prompt
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 lg:px-12 py-14 max-w-3xl">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-neutral-400 mb-10">Last updated: {LAST_UPDATED}</p>

        <Section title="What is LeanPrompt?">
          <P>
            LeanPrompt is a Chrome extension and web application that compresses your AI prompts
            before you send them to tools like ChatGPT, Claude, and Gemini — reducing token usage
            while preserving your intent.
          </P>
        </Section>

        <Section title="What data we collect">
          <p className="font-medium text-neutral-800 mb-1">Prompt text</p>
          <P>
            When you click "Optimize", LeanPrompt reads the text from the AI tool's input field to
            compress it. Compression runs locally on your device first. If cloud compression (API
            Assist) is enabled, your prompt is also sent to our server and then to Google's Gemini
            API. We do not read your prompts automatically — processing only happens when you
            actively click Optimize.
          </P>
          <P>
            If you click "Apply" or "Reject" on a result, the original prompt, compressed prompt,
            your action, and metadata (compression quality score, detected intent, site name) are
            stored in our database linked to your account.
          </P>

          <p className="font-medium text-neutral-800 mb-1 mt-4">Account information</p>
          <P>
            If you create an account, we collect your email address. Passwords are hashed by
            Supabase and never stored in plain text. You may also sign in with Google.
          </P>

          <p className="font-medium text-neutral-800 mb-1 mt-4">Usage statistics</p>
          <P>
            We store aggregate counts of your compressions and estimated tokens saved in your user
            profile to power the dashboard.
          </P>

          <p className="font-medium text-neutral-800 mb-1 mt-4">Extension settings</p>
          <P>
            Your preferences (compression level, enabled sites, API Assist toggle) are saved in
            Chrome's sync storage and sync across your signed-in Chrome devices.
          </P>
        </Section>

        <Section title="What we do NOT collect">
          <ul className="list-disc list-inside space-y-1 text-neutral-600">
            <li>Web pages or browsing history — we only process text you explicitly compress</li>
            <li>Keystrokes or mouse activity</li>
            <li>Payment information (LeanPrompt is currently free)</li>
            <li>Device identifiers beyond standard server access logs</li>
          </ul>
        </Section>

        <Section title="How data flows">
          <ol className="list-decimal list-inside space-y-2 text-neutral-600 mb-3">
            <li>You click "Optimize."</li>
            <li>LeanPrompt compresses your prompt locally (offline model, no network required).</li>
            <li>If API Assist is enabled, the prompt is also sent to our Supabase server.</li>
            <li>Our server forwards it to <strong className="text-neutral-800">Google's Gemini API</strong> and returns the result.</li>
            <li>If you reject a result, that example may be analyzed by <strong className="text-neutral-800">OpenAI's API</strong> in an automated process to identify patterns for improving future compressions.</li>
          </ol>
          <P>
            You can disable cloud compression by turning off "API Assist" in extension settings.
            When off, all compression is local and no prompt text leaves your browser.
          </P>
        </Section>

        <Section title="Data retention">
          <P>
            Prompt feedback is stored in our database while your account is active. We are
            implementing automated deletion of prompt text older than 90 days. Until that is in
            place, you can request immediate deletion of all your data by emailing{" "}
            <a href={`mailto:${CONTACT}`} className="text-purple-600 hover:underline">{CONTACT}</a>.
          </P>
        </Section>

        <Section title="Your rights">
          <P>
            You can request deletion of all data associated with your account at any time by
            emailing{" "}
            <a href={`mailto:${CONTACT}`} className="text-purple-600 hover:underline">{CONTACT}</a>.
            We will delete your data within 30 days.
          </P>
          <P>
            You can also opt out of feedback storage at any time by disabling "History" in the
            extension settings. This prevents future feedback from being stored, but does not
            delete previously stored data.
          </P>
        </Section>

        <Section title="Third-party services">
          <Table
            headers={["Service", "Purpose", "Data shared"]}
            rows={[
              ["Supabase", "Database and authentication", "Email, prompt feedback, usage stats"],
              ["Google Gemini API", "Cloud prompt compression", "Prompt text (when API Assist is on)"],
              ["OpenAI API", "Compression pattern analysis", "Rejected prompt examples"],
              ["Vercel", "Web app hosting", "Server access logs (IP, user agent)"],
            ]}
          />
          <P>All services are based in the United States.</P>
        </Section>

        <Section title="Chrome extension permissions">
          <Table
            headers={["Permission", "Why"]}
            rows={[
              ["storage", "Save settings and pending feedback queue"],
              ["activeTab", "Read prompt text from the active AI tool tab"],
              ["scripting", "Inject the optimization overlay on supported sites"],
              ["identity", "Enable Google Sign-In"],
              ["alarms", "Refresh your login session in the background"],
              ["contextMenus", "Add 'Disable on this site' to the right-click menu"],
            ]}
          />
        </Section>

        <Section title="Local storage">
          <P>
            LeanPrompt stores the following in your browser:
          </P>
          <ul className="list-disc list-inside space-y-1 text-neutral-600 mb-3">
            <li><strong className="text-neutral-800">Chrome sync storage</strong> — extension settings</li>
            <li><strong className="text-neutral-800">Chrome local storage</strong> — pending feedback queue, usage counter, disabled sites list</li>
            <li><strong className="text-neutral-800">Website localStorage</strong> (on AI tool sites) — overlay position and size preferences</li>
          </ul>
          <P>LeanPrompt does not set HTTP cookies.</P>
        </Section>

        <Section title="Security">
          <P>
            All communication between the extension, our servers, and third-party APIs uses HTTPS.
            Auth tokens are stored in Chrome's extension storage, isolated per extension ID. We use
            Supabase Row Level Security so users can only access their own data. API keys are stored
            as server-side secrets and are never included in the extension bundle.
          </P>
        </Section>

        <Section title="Children's privacy">
          <P>
            LeanPrompt is not directed at children under 13. We do not knowingly collect personal
            information from children.
          </P>
        </Section>

        <Section title="Changes to this policy">
          <P>
            We will post any material changes here and update the "Last updated" date above.
          </P>
        </Section>

        <Section title="Contact">
          <P>
            Questions about this policy:{" "}
            <a href={`mailto:${CONTACT}`} className="text-purple-600 hover:underline">{CONTACT}</a>
          </P>
        </Section>

        <div className="pt-6 border-t border-neutral-200 flex gap-6 text-sm">
          <Link to="/" className="text-purple-600 hover:underline">← Home</Link>
          <Link to="/download" className="text-neutral-500 hover:text-neutral-800 transition-colors">Download</Link>
        </div>
      </main>
    </div>
  );
}
