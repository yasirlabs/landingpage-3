import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, ArrowRight, Code, Zap, Shield, Layers, Clock, Users, Terminal, Globe, Package, BarChart2, Lock, FileText } from "lucide-react";

function useInView(ref, options = {}) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsInView(true); observer.unobserve(entry.target); }
    }, { threshold: 0.08, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return isInView;
}

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref);
  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const step = (timestamp, startTime) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
    };
    requestAnimationFrame((t) => step(t, t));
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const CodeSnippet = () => (
  <div className="relative rounded-xl overflow-hidden shadow-lg" style={{ border: "1px solid #e2e8f0" }}>
    <div className="flex items-center gap-2 px-5 py-3" style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fca5a5" }} />
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fcd34d" }} />
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#86efac" }} />
      <span className="ml-3 text-xs font-mono" style={{ color: "#94a3b8" }}>terminal — devkit-pro</span>
    </div>
    <div className="p-6 font-mono text-sm space-y-3" style={{ background: "#0f172a" }}>
      {[
        { prompt: "$", cmd: "git clone devkit-pro/starter", delay: "0.4s" },
        { prompt: "$", cmd: "pnpm install", delay: "0.8s" },
        { prompt: "$", cmd: "pnpm dev", delay: "1.2s" },
        { prompt: "✓", cmd: "Ready on localhost:3000", delay: "1.8s", success: true },
      ].map((line, i) => (
        <div key={i} className="flex gap-4 opacity-0" style={{ animation: `fadeUp 0.5s ease ${line.delay} forwards` }}>
          <span style={{ color: line.success ? "#4ade80" : "#64748b" }}>{line.prompt}</span>
          <span style={{ color: line.success ? "#86efac" : "#cbd5e1" }}>{line.cmd}</span>
        </div>
      ))}
      <div className="flex items-center gap-2 opacity-0 mt-2" style={{ animation: "fadeUp 0.5s ease 2.4s forwards" }}>
        <span style={{ color: "#334155" }}>└</span>
        <span className="text-xs" style={{ color: "#64748b" }}>50+ components loaded and ready</span>
        <span className="inline-block w-2 h-4 ml-1" style={{ background: "#475569", animation: "blink 1s step-end infinite" }} />
      </div>
    </div>
  </div>
);

export default function Index() {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const heroRef = useRef(null), socialRef = useRef(null), problemRef = useRef(null);
  const solutionRef = useRef(null), featuresRef = useRef(null), benefitsRef = useRef(null);
  const audienceRef = useRef(null), includedRef = useRef(null), pricingRef = useRef(null);
  const faqRef = useRef(null), ctaRef = useRef(null);

  const heroIn = useInView(heroRef), socialIn = useInView(socialRef), problemIn = useInView(problemRef);
  const solutionIn = useInView(solutionRef), featuresIn = useInView(featuresRef), benefitsIn = useInView(benefitsRef);
  const audienceIn = useInView(audienceRef), includedIn = useInView(includedRef), pricingIn = useInView(pricingRef);
  const faqIn = useInView(faqRef), ctaIn = useInView(ctaRef);

  const testimonials = [
    { author: "Alex Chen", title: "Senior Product Lead", company: "TechVenture", text: "We launched our entire product ecosystem 4 weeks faster. The code quality is exceptional — our team understood the architecture immediately. Best $16 we've ever spent.", rating: 5, initials: "AC" },
    { author: "Maya Patel", title: "Freelance Developer", company: "Independent", text: "As a freelancer, this has been a game-changer. I deliver professional, production-ready apps instead of spending weeks on boilerplate. My clients love the polished results.", rating: 5, initials: "MP" },
    { author: "James Wilson", title: "CTO", company: "StartupLabs", text: "The documentation is excellent. Even junior developers onboard and start contributing within days. The component library alone saves hundreds of hours every quarter.", rating: 5, initials: "JW" },
    { author: "Sofia Rodriguez", title: "Design Systems Lead", company: "Design+Dev Co", text: "Finally, a starter kit that takes design systems seriously. The theming integrates beautifully with our workflow. Implementation was completely seamless.", rating: 5, initials: "SR" },
  ];

  const faqs = [
    { q: "Is it suitable for teams of varying experience levels?", a: "Yes. The codebase is structured with clear separation of concerns and thorough documentation at every layer. We have had developers of all skill levels — from junior engineers to seasoned architects — adopt this successfully." },
    { q: "Can we customize the design system and components?", a: "Fully. You receive complete source code under the MIT license with no restrictions. The theming system uses CSS variables for straightforward global changes, and Tailwind makes component-level customization systematic and maintainable." },
    { q: "What level of ongoing support is provided?", a: "You receive comprehensive documentation, guided setup materials, and annotated code throughout. Access to a professional Slack community of thousands of developers is included, along with email support for technical questions." },
    { q: "What is the technology stack?", a: "React 18 with TypeScript, Vite for fast builds, Tailwind CSS 3, React Router 6, and a Node/Express server. All dependencies are current, well-maintained, and proven in production environments." },
    { q: "How quickly can our team get started?", a: "Immediately after purchase. Extract the archive, run `pnpm install && pnpm dev`, and your team is writing product code within minutes. No activation requirements — just a clean, ready codebase." },
    { q: "How are updates handled?", a: "You own the code outright. Major version updates are provided at no additional cost. Your team controls the upgrade schedule and maintains full autonomy over your technology decisions." },
  ];

  const features = [
    { icon: Zap, title: "Rapid Onboarding", desc: "A single command gets the environment running. No complex configuration or hidden dependencies.", color: "#0ea5e9" },
    { icon: Code, title: "Full TypeScript Coverage", desc: "End-to-end type safety from client to server. Reduces bugs in review and improves IDE productivity.", color: "#6366f1" },
    { icon: Shield, title: "Security by Default", desc: "Secure dependencies, authentication patterns, and data-handling best practices included from day one.", color: "#10b981" },
    { icon: Package, title: "50+ UI Components", desc: "Accessible, production-grade components covering all standard interface patterns. Fully customizable.", color: "#f59e0b" },
    { icon: Globe, title: "Platform-Agnostic Deployment", desc: "Pre-configured for Netlify, Vercel, and AWS. Consistent, predictable deployment across environments.", color: "#0ea5e9" },
    { icon: Terminal, title: "Testing Infrastructure", desc: "Vitest configured with representative examples. Unit, component, and integration tests ready to extend.", color: "#8b5cf6" },
    { icon: Layers, title: "Scalable Architecture", desc: "Structural patterns drawn from leading engineering organizations. Supports growth from prototype to scale.", color: "#6366f1" },
    { icon: BarChart2, title: "Performance Optimized", desc: "Vite-powered builds with code splitting and lazy loading. Measurable performance from the first deploy.", color: "#10b981" },
    { icon: FileText, title: "Complete Documentation", desc: "Setup, deployment, customization, and common architectural patterns — all thoroughly documented.", color: "#f59e0b" },
  ];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap');
    @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes subtlePulse { 0%,100% { opacity: 1; } 50% { opacity: 0.7; } }
    .anim-up { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }
    .anim-down { animation: fadeDown 0.35s ease both; }
    .accent-text { color: #1e40af; }
    .feature-card { background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.3s ease; }
    .feature-card:hover { border-color: #bfdbfe; box-shadow: 0 8px 32px rgba(30,64,175,0.08); transform: translateY(-4px); }
    .problem-card { background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.25s ease; }
    .problem-card:hover { border-left: 3px solid #dc2626; padding-left: 29px; }
    .btn-primary { background: #1e3a8a; transition: all 0.2s ease; }
    .btn-primary:hover { background: #1e40af; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(30,58,138,0.3); }
    .btn-primary:active { transform: scale(0.98); }
    .btn-ghost { background: transparent; border: 1.5px solid #cbd5e1; transition: all 0.2s ease; }
    .btn-ghost:hover { border-color: #1e40af; color: #1e40af; }
    .label-tag { background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; font-weight: 600; }
    .pricing-card { border: 1.5px solid #1e3a8a; box-shadow: 0 0 0 4px rgba(30,58,138,0.06); }
    .faq-item { background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.2s ease; }
    .faq-item:hover, .faq-open { border-color: #93c5fd; background: #f8fafc; }
    .marquee-wrap { display: flex; gap: 1rem; animation: marquee 30s linear infinite; width: max-content; }
    .divider { height: 1px; background: linear-gradient(to right, transparent, #e2e8f0, transparent); }
    .stat-card { background: #ffffff; border: 1px solid #e2e8f0; }
    .testimonial-card { background: #ffffff; border: 1px solid #e2e8f0; transition: all 0.25s ease; }
    .testimonial-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.08); transform: translateY(-3px); }
    .nav-bar { background: rgba(255,255,255,0.95); backdrop-filter: blur(16px); border-bottom: 1px solid #e2e8f0; }
    .included-card { background: #f8fafc; border: 1.5px solid #bfdbfe; }
    body, * { font-family: 'Sora', system-ui, sans-serif !important; }
    .mono { font-family: 'IBM Plex Mono', monospace !important; }
  `;

  const vis = (inView, delay = 0) => ({
    className: `transition-all duration-700 ${inView ? "anim-up opacity-100" : "opacity-0"}`,
    style: { animationDelay: inView ? `${delay}ms` : "0ms" },
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a", fontFamily: "'Sora', system-ui, sans-serif", overflowX: "hidden" }}>
      <style>{css}</style>

      {/* NAV */}
      <nav className="nav-bar" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#1e3a8a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={16} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em", color: "#0f172a" }}>DevKit Pro</span>
          </div>
          <div style={{ display: "flex", gap: 32, fontSize: 14, color: "#64748b", fontWeight: 500 }}>
            {["Features", "Pricing", "FAQ"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ textDecoration: "none", color: "inherit", transition: "color 0.2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = "#1e3a8a"}
                onMouseLeave={e => (e.target as HTMLElement).style.color = "#64748b"}>{l}</a>
            ))}
          </div>
          <button className="btn-primary" style={{ color: "#fff", fontSize: 14, fontWeight: 700, padding: "10px 22px", borderRadius: 8, border: "none", cursor: "pointer", letterSpacing: "-0.01em" }}>
            Request Access — $16
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 100, paddingBottom: 80, background: "#ffffff", borderBottom: "1px solid #e2e8f0", overflow: "hidden" }}>
        {/* Subtle grid bg */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)", backgroundSize: "48px 48px", opacity: 0.35, pointerEvents: "none" }} />
        {/* Accent line */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "linear-gradient(to bottom, transparent, #1e3a8a, transparent)" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1152, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div {...vis(heroIn)} className={`label-tag ${vis(heroIn).className}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 4, fontSize: 12, marginBottom: 28, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Trusted by 2,500+ development teams globally
            </div>
            <h1 {...vis(heroIn, 100)} style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: 24, color: "#0f172a" }}>
              Ship production-grade applications.<br />
              <span className="accent-text">Faster, at scale.</span>
            </h1>
            <p {...vis(heroIn, 200)} style={{ fontSize: 18, color: "#475569", lineHeight: 1.8, marginBottom: 36, maxWidth: 480, fontWeight: 400 }}>
              A comprehensive, battle-tested codebase with 50+ components, complete TypeScript coverage, and the architectural foundations your team needs to deliver with confidence.
            </p>
            <div {...vis(heroIn, 300)} style={{ display: "flex", gap: 14, marginBottom: 36 }}>
              <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 8, border: "none", cursor: "pointer" }}>
                Get Instant Access <ArrowRight size={16} />
              </button>
              <button className="btn-ghost" style={{ color: "#475569", fontWeight: 600, fontSize: 15, padding: "14px 24px", borderRadius: 8, cursor: "pointer", background: "transparent" }}>
                View demo →
              </button>
            </div>
            <div {...vis(heroIn, 400)} style={{ display: "flex", flexWrap: "wrap", gap: 20, fontSize: 13, color: "#64748b" }}>
              {["MIT License", "No recurring fees", "30-day guarantee", "Lifetime access"].map(t => (
                <span key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 500 }}>
                  <Check size={13} color="#1e3a8a" />{t}
                </span>
              ))}
            </div>
          </div>
          <div {...vis(heroIn, 500)}>
            <CodeSnippet />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
              {["React 18", "TypeScript", "Tailwind CSS", "Vite", "Express"].map((tech, i) => (
                <span key={tech} className="mono opacity-0" style={{ padding: "6px 12px", borderRadius: 4, fontSize: 11, fontWeight: 500, background: "#f1f5f9", border: "1px solid #e2e8f0", color: "#475569", animation: `fadeUp 0.5s ease ${1.4 + i * 0.1}s forwards` }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background: "#0f172a", padding: "56px 24px" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1 }}>
          {[
            { val: 2500, suf: "+", label: "Development Teams" },
            { val: 200, suf: "hrs", label: "Saved Per Project" },
            { val: 50, suf: "+", label: "Production Components" },
            { val: 100, suf: "%", label: "TypeScript Coverage" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "32px 28px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
              <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 6, color: "#ffffff" }}>
                <AnimatedCounter target={s.val} suffix={s.suf} />
              </div>
              <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MARQUEE */}
      <div style={{ background: "#f1f5f9", borderBottom: "1px solid #e2e8f0", padding: "24px 0", overflow: "hidden" }}>
        <p style={{ textAlign: "center", fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, marginBottom: 18 }}>Adopted by teams at</p>
        <div style={{ overflow: "hidden" }}>
          <div className="marquee-wrap">
            {[...Array(2)].map((_, rep) =>
              ["Vercel", "Stripe", "Linear", "Notion", "Loom", "Figma", "Raycast", "Planetscale", "Supabase", "Railway"].map(co => (
                <span key={`${co}-${rep}`} style={{ padding: "6px 20px", borderRadius: 4, fontSize: 13, fontWeight: 700, color: "#94a3b8", whiteSpace: "nowrap", background: "#ffffff", border: "1px solid #e2e8f0" }}>{co}</span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section ref={socialRef} style={{ background: "#ffffff", padding: "96px 24px", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p {...vis(socialIn)} className={`label-tag ${vis(socialIn).className}`} style={{ display: "inline-block", padding: "6px 14px", borderRadius: 4, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Client Feedback</p>
            <h2 {...vis(socialIn, 100)} style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>Trusted by builders worldwide</h2>
            <p {...vis(socialIn, 200)} style={{ color: "#64748b", fontSize: 17 }}>Verified feedback from development teams in production</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {testimonials.map((t, idx) => (
              <div key={idx} {...vis(socialIn, (idx + 1) * 80)} className={`testimonial-card ${vis(socialIn, (idx + 1) * 80).className}`} style={{ borderRadius: 12, padding: "36px 32px" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" style={{ flexShrink: 0 }}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: 28, fontSize: 15 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#1e3a8a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, color: "#fff", flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{t.author}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>{t.title} · {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section ref={problemRef} style={{ background: "#f8fafc", padding: "96px 24px", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 896, margin: "0 auto" }}>
          <p {...vis(problemIn)} style={{ color: "#dc2626", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Current Challenges</p>
          <h2 {...vis(problemIn, 100)} style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 52, lineHeight: 1.15, color: "#0f172a" }}>
            Common inefficiencies that delay delivery.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { n: "01", title: "Redundant setup across every project", desc: "Each project requires rebuilding the same foundational infrastructure. Development time is spent on tooling, routing, and shared components before any real product work begins." },
              { n: "02", title: "Inconsistency slowing team velocity", desc: "Projects built at different times diverge in patterns and conventions. New team members struggle to orient, and technical debt compounds silently across codebases." },
              { n: "03", title: "Architectural decision paralysis", desc: "Uncertainty around TypeScript configurations, testing frameworks, and state management patterns slows decision-making and delays the start of meaningful development." },
              { n: "04", title: "Unreliable deployment pipelines", desc: "Moving from local development to production environments involves fragile scripts and environment-specific failures that erode team confidence in the release process." },
            ].map((item, idx) => (
              <div key={idx} {...vis(problemIn, (idx + 1) * 80)} className={`problem-card ${vis(problemIn, (idx + 1) * 80).className}`} style={{ borderRadius: 8, padding: "28px 32px", display: "flex", gap: 24, alignItems: "flex-start", borderLeft: "3px solid #e2e8f0" }}>
                <div className="mono" style={{ fontSize: 11, fontWeight: 600, color: "#dc2626", flexShrink: 0, marginTop: 3, letterSpacing: "0.05em" }}>{item.n}</div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section ref={solutionRef} style={{ background: "#ffffff", padding: "96px 24px", borderTop: "1px solid #e2e8f0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, background: "radial-gradient(circle, rgba(30,58,138,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 896, margin: "0 auto" }}>
          <p {...vis(solutionIn)} style={{ color: "#1e40af", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Our Solution</p>
          <h2 {...vis(solutionIn, 100)} style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.15 }}>
            A complete engineering foundation.<br />
            <span className="accent-text">Available immediately.</span>
          </h2>
          <p {...vis(solutionIn, 200)} style={{ color: "#64748b", fontSize: 17, marginBottom: 52, maxWidth: 520, lineHeight: 1.7 }}>
            The foundational codebase that organizations typically invest $50,000–$100,000 to build internally. Delivered for $16, with no recurring costs.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: Zap, title: "Immediate Productivity", desc: "Production-ready code that your team can extend from day one. No boilerplate configuration required.", color: "#0ea5e9" },
              { icon: Layers, title: "Enterprise Architecture", desc: "Structural patterns derived from leading engineering organizations. Engineered to scale from MVP to enterprise.", color: "#6366f1" },
              { icon: Code, title: "50+ UI Components", desc: "Accessible, thoroughly tested components covering all standard interface patterns. Ready for customization.", color: "#1e40af" },
              { icon: Lock, title: "Security by Design", desc: "TypeScript enforcement, dependency auditing, secure defaults, and authentication best practices included.", color: "#10b981" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} {...vis(solutionIn, (idx + 1) * 80)} className={`feature-card ${vis(solutionIn, (idx + 1) * 80).className}`} style={{ borderRadius: 10, padding: "32px 28px" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: `${item.color}10`, border: `1px solid ${item.color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    <Icon size={18} color={item.color} />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 10, color: "#0f172a" }}>{item.title}</h3>
                  <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section ref={featuresRef} id="features" style={{ background: "#f8fafc", padding: "96px 24px", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p {...vis(featuresIn)} className={`label-tag ${vis(featuresIn).className}`} style={{ display: "inline-block", padding: "6px 14px", borderRadius: 4, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Platform Capabilities</p>
            <h2 {...vis(featuresIn, 100)} style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.03em" }}>Comprehensive tooling.<br />Nothing extraneous.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} {...vis(featuresIn, (idx + 1) * 45)} className={`feature-card ${vis(featuresIn, (idx + 1) * 45).className}`} style={{ borderRadius: 10, padding: "28px 24px" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `${f.color}12`, border: `1px solid ${f.color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon size={16} color={f.color} />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: "#0f172a" }}>{f.title}</h3>
                  <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.75 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section ref={benefitsRef} style={{ background: "#ffffff", padding: "96px 24px", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 896, margin: "0 auto" }}>
          <p {...vis(benefitsIn)} style={{ color: "#1e40af", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Business Value</p>
          <h2 {...vis(benefitsIn, 100)} style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 52, color: "#0f172a" }}>Why engineering teams choose this</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: Clock, t: "200+ hours saved per project", d: "Eliminate boilerplate configuration. Your team focuses exclusively on features that deliver business value." },
              { icon: Shield, t: "Deploy with confidence", d: "Production-ready code means fewer defects, better performance, and consistent quality across all deliverables." },
              { icon: BarChart2, t: "Accelerate team growth", d: "Professionally structured code serves as a reference architecture. Engineers level up while building real products." },
              { icon: Users, t: "Supported by a growing community", d: "Thousands of developers on a shared codebase. Faster resolution, shared learnings, collective ownership." },
              { icon: Code, t: "Complete ownership", d: "Full source code with no vendor dependencies or lock-in. Your product roadmap remains entirely under your control." },
              { icon: Layers, t: "Architected for scale", d: "Structural foundations designed for long-term growth. Move from proof-of-concept to production without costly rewrites." },
            ].map((b, idx) => {
              const Icon = b.icon;
              return (
                <div key={idx} {...vis(benefitsIn, (idx + 1) * 60)} className={`feature-card ${vis(benefitsIn, (idx + 1) * 60).className}`} style={{ borderRadius: 10, padding: "26px 24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={15} color="#1e40af" />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: "#0f172a" }}>{b.t}</h3>
                    <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7 }}>{b.d}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section ref={audienceRef} style={{ background: "#f8fafc", padding: "96px 24px", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p {...vis(audienceIn)} className={`label-tag ${vis(audienceIn).className}`} style={{ display: "inline-block", padding: "6px 14px", borderRadius: 4, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Use Cases</p>
            <h2 {...vis(audienceIn, 100)} style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.03em" }}>Designed for your context</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { icon: Terminal, r: "Independent Developers", w: "Deliver at the velocity of a full team. Compete effectively in any market segment with professional-grade output." },
              { icon: Users, r: "Freelance Consultants", w: "Reduce delivery time without sacrificing quality. Command appropriate rates. Increase project throughput." },
              { icon: Zap, r: "Early-Stage Startups", w: "Move with urgency without accumulating technical debt. Onboard new engineers in days, not weeks." },
              { icon: BarChart2, r: "Digital Agencies", w: "Standardize across all client engagements. Reduce per-project overhead. Deliver consistent, predictable quality." },
              { icon: FileText, r: "Engineering Students", w: "Learn professional patterns from real-world codebases. Build a compelling portfolio grounded in industry standards." },
              { icon: Layers, r: "Enterprise Engineering Teams", w: "Establish architectural standards. Reduce technical debt systematically. Onboard large engineering teams at pace." },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} {...vis(audienceIn, (idx + 1) * 70)} className={`feature-card ${vis(audienceIn, (idx + 1) * 70).className}`} style={{ borderRadius: 10, padding: "28px 24px" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon size={16} color="#1e40af" />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: "#0f172a" }}>{item.r}</h3>
                  <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.75 }}>{item.w}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section ref={includedRef} style={{ background: "#ffffff", padding: "96px 24px", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 896, margin: "0 auto" }}>
          <p {...vis(includedIn)} style={{ color: "#1e40af", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Package Contents</p>
          <h2 {...vis(includedIn, 100)} style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 52, color: "#0f172a" }}>Everything included. No exceptions.</h2>
          <div {...vis(includedIn, 200)} className={`included-card ${vis(includedIn, 200).className}`} style={{ borderRadius: 12, padding: "48px 52px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {[
                "Complete source code with MIT license", "50+ production-ready UI components",
                "Responsive design system (Tailwind CSS)", "Express backend with example API routes",
                "Database integration patterns", "Authentication implementation examples",
                "Type-safe API layer setup", "Deployment configuration for all major platforms",
                "Comprehensive technical documentation", "Video setup walkthrough",
                "Component customization reference", "All future version updates",
                "Slack community access", "Email-based technical support",
                "Perpetual license — no subscription required", "Commercial use across unlimited projects",
              ].map((item, idx) => (
                <div key={idx} {...vis(includedIn, (idx + 1) * 25)} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Check size={10} color="#1e40af" />
                  </div>
                  <span style={{ fontSize: 13, color: "#334155", fontWeight: 500, lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section ref={pricingRef} id="pricing" style={{ background: "#f8fafc", padding: "96px 24px", borderTop: "1px solid #e2e8f0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", zIndex: 10, maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <p {...vis(pricingIn)} className={`label-tag ${vis(pricingIn).className}`} style={{ display: "inline-block", padding: "6px 14px", borderRadius: 4, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>Investment</p>
          <h2 {...vis(pricingIn, 100)} style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12, color: "#0f172a" }}>A one-time investment.<br />Permanent access.</h2>
          <p {...vis(pricingIn, 200)} style={{ color: "#64748b", fontSize: 17, marginBottom: 48 }}>No subscriptions. No licensing tiers. No surprises.</p>
          <div {...vis(pricingIn, 300)} className={`pricing-card ${vis(pricingIn, 300).className}`} style={{ borderRadius: 16, padding: "52px 44px", background: "#ffffff" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ color: "#cbd5e1", fontSize: 20, fontWeight: 500, textDecoration: "line-through", marginBottom: 10 }}>$99</span>
              <span style={{ fontSize: 88, fontWeight: 900, lineHeight: 1, letterSpacing: "-0.05em", color: "#0f172a" }}>$16</span>
            </div>
            <p style={{ color: "#94a3b8", marginBottom: 36, fontSize: 14 }}>One-time payment · Unlimited projects · Perpetual access</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36, textAlign: "left" }}>
              {[
                "Immediate download upon payment",
                "No recurring subscription fees",
                "Unrestricted commercial use",
                "30-day refund guarantee",
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Check size={11} color="#1e40af" />
                  </div>
                  <span style={{ fontSize: 14, color: "#334155", fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
            <button className="btn-primary" style={{ width: "100%", color: "#fff", fontWeight: 700, fontSize: 16, padding: "16px 28px", borderRadius: 10, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}>
              Get Instant Access <ArrowRight size={16} />
            </button>
            <p style={{ color: "#94a3b8", fontSize: 12 }}>Secure checkout · Immediate delivery · No recurring charges</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} id="faq" style={{ background: "#ffffff", padding: "96px 24px", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p {...vis(faqIn)} style={{ color: "#1e40af", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Frequently Asked Questions</p>
          <h2 {...vis(faqIn, 100)} style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 52, color: "#0f172a" }}>Common questions, answered.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqs.map((faq, idx) => (
              <div key={idx} {...vis(faqIn, (idx + 1) * 60)} className={`faq-item ${expandedFAQ === idx ? "faq-open" : ""} ${vis(faqIn, (idx + 1) * 60).className}`} style={{ borderRadius: 10, overflow: "hidden" }}>
                <button onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)} style={{ width: "100%", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontWeight: 600, color: "#0f172a", fontSize: 15 }}>{faq.q}</span>
                  <ChevronDown size={16} color="#64748b" style={{ flexShrink: 0, marginLeft: 16, transform: expandedFAQ === idx ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
                </button>
                {expandedFAQ === idx && (
                  <div className="anim-down" style={{ padding: "0 24px 22px" }}>
                    <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.85 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section ref={ctaRef} style={{ position: "relative", padding: "112px 24px", background: "#0f172a", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(30,58,138,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,138,0.08) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <p {...vis(ctaIn)} className={`label-tag ${vis(ctaIn).className}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 4, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 28, background: "rgba(239,246,255,0.07)", border: "1px solid rgba(191,219,254,0.15)", color: "#93c5fd" }}>
            Join 2,500+ development teams already shipping faster
          </p>
          <h2 {...vis(ctaIn, 100)} style={{ fontSize: 56, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 22, color: "#f8fafc" }}>
            Eliminate boilerplate.<br />
            <span style={{ color: "#60a5fa" }}>Deliver with confidence.</span>
          </h2>
          <p {...vis(ctaIn, 200)} style={{ color: "#64748b", fontSize: 18, marginBottom: 44, maxWidth: 480, margin: "0 auto 44px", lineHeight: 1.7 }}>
            Your next project deserves a proper technical foundation. Reduce delivery time, increase quality, and build with clarity.
          </p>
          <button {...vis(ctaIn, 300)} className={`btn-primary ${vis(ctaIn, 300).className}`} style={{ color: "#fff", fontWeight: 700, fontSize: 16, padding: "18px 44px", borderRadius: 10, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            Get Instant Access — $16 <ArrowRight size={18} />
          </button>
          <p {...vis(ctaIn, 400)} style={{ color: "#475569", fontSize: 13 }}>
            30-day guarantee · Immediate download · Perpetual license · No subscription
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#080f1a", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "#1e3a8a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={13} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 13, color: "#475569" }}>DevKit Pro</span>
          </div>
          <p style={{ color: "#334155", fontSize: 13 }}>© 2025 DevKit Pro. All rights reserved.</p>
          <div style={{ display: "flex", gap: 24, fontSize: 13, color: "#334155" }}>
            {["Privacy Policy", "Terms of Use", "Support"].map(l => (
              <a key={l} href="#" style={{ textDecoration: "none", color: "inherit", transition: "color 0.2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = "#94a3b8"}
                onMouseLeave={e => (e.target as HTMLElement).style.color = "#334155"}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}