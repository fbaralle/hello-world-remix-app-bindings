import type { MetaFunction } from "@remix-run/cloudflare";
import WebflowLogo from "~/components/WebflowLogo";
import DocCard from "~/components/DocCard";
import BindingsStatus from "~/components/BindingsStatus";

const FRAMEWORK = "Remix";

const DOC_LINKS = [
  {
    title: "Webflow Cloud overview",
    description: "What Webflow Cloud is and what you can build on it.",
    href: "https://developers.webflow.com/webflow-cloud",
  },
  {
    title: "Storing data",
    description: "Add SQLite, Key Value, and Object Storage bindings.",
    href: "https://developers.webflow.com/webflow-cloud/storing-data/overview",
  },
  {
    title: `${FRAMEWORK} on Webflow Cloud`,
    description: "Build and deploy your first Webflow Cloud app.",
    href: "https://developers.webflow.com/webflow-cloud/getting-started",
  },
  {
    title: "Environments & deployments",
    description: "Manage previews, production, and deployment history.",
    href: "https://developers.webflow.com/webflow-cloud/environments",
  },
];

export const meta: MetaFunction = () => [
  { title: "Hello World · Remix · Webflow Cloud" },
  {
    name: "description",
    content:
      "A minimal Remix starter with Cloudflare bindings deployed on Webflow Cloud.",
  },
];

export default function Index() {
  return (
    <div className="wf-page">
      <div className="wf-glow" aria-hidden />

      <header className="wf-header">
        <div className="wf-brand">
          <WebflowLogo />
          <span className="wf-brand-text">Webflow Cloud</span>
        </div>
        <nav className="wf-nav">
          <a href="https://developers.webflow.com/webflow-cloud" target="_blank" rel="noreferrer">Docs</a>
          <a href="https://github.com/Webflow-Examples" target="_blank" rel="noreferrer" className="wf-nav-ghost">GitHub</a>
        </nav>
      </header>

      <main className="wf-main">
        <section className="wf-hero">
          <p className="wf-eyebrow">Hello, world · {FRAMEWORK} · with bindings</p>
          <h1 className="wf-title">
            Your <span className="wf-gradient">{FRAMEWORK}</span> app
            <br />is live with Cloudflare bindings.
          </h1>
          <p className="wf-subtitle">
            D1, R2, and KV are wired in. Deploy with <code>wrangler.json</code> and Webflow Cloud provisions them automatically.
          </p>
          <div className="wf-cta">
            <a className="wf-btn wf-btn-primary" href="https://developers.webflow.com/webflow-cloud/storing-data/overview" target="_blank" rel="noreferrer">
              Read the bindings guide
            </a>
            <a className="wf-btn wf-btn-ghost" href="https://github.com/Webflow-Examples/hello-world-remix-app-bindings" target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          </div>
        </section>

        <BindingsStatus />

        <section className="wf-cards" aria-label="Documentation" style={{ marginTop: 32 }}>
          {DOC_LINKS.map((l) => (
            <DocCard key={l.href} {...l} />
          ))}
        </section>
      </main>

      <footer className="wf-footer">
        <span>
          Built with {FRAMEWORK} · Deployed on{" "}
          <a href="https://webflow.com/cloud" target="_blank" rel="noreferrer">Webflow Cloud</a>
        </span>
      </footer>
    </div>
  );
}
