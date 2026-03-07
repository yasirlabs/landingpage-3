import { useState, useRef, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────
   ICONS (inline SVG components)
───────────────────────────────────────── */
const Icon = ({ d, size = 16, color = "currentColor", fill = "none", strokeWidth = 1.75 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const Icons = {
  Zap: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  ArrowRight: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d="M5 12h14M12 5l7 7-7 7" />,
  ArrowUpRight: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d="M7 17L17 7M7 7h10v10" />,
  Check: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d="M20 6L9 17l-5-5" />,
  ChevronDown: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d="M6 9l6 6 6-6" />,
  ChevronRight: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d="M9 18l6-6-6-6" />,
  Code: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
  Shield: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  Layers: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M12 2L2 7l10 5 10-5-10-5z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"]} />,
  Clock: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M12 6v6l4 2"]} />,
  Users: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", "M23 21v-2a4 4 0 00-3-3.87", "M16 3.13a4 4 0 010 7.75", "M9 7a4 4 0 100 8 4 4 0 000-8z"]} />,
  Terminal: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M4 17l6-6-6-6", "M12 19h8"]} />,
  Globe: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M2 12h20", "M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"]} />,
  Package: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M16.5 9.4l-9-5.19", "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z", "M3.27 6.96L12 12.01l8.73-5.05", "M12 22.08V12"]} />,
  BarChart: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M18 20V10", "M12 20V4", "M6 20v-6"]} />,
  Lock: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z", "M7 11V7a5 5 0 0110 0v4"]} />,
  FileText: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z", "M14 2v6h6", "M16 13H8", "M16 17H8", "M10 9H8"]} />,
  Star: ({ size = 14, color = "currentColor" }) => <Icon size={size} color={color} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={color} strokeWidth={0} />,
  Menu: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M3 12h18", "M3 6h18", "M3 18h18"]} />,
  X: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M18 6L6 18", "M6 6l12 12"]} />,
  Play: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d="M5 3l14 9-14 9V3z" fill={color} />,
  Sparkles: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z", "M5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75L5 17z", "M19 3l.5 1.5L21 5l-1.5.5L19 7l-.5-1.5L17 5l1.5-.5L19 3z"]} />,
  Cpu: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18", "M7 9h.01M7 12h.01M7 15h.01M17 9h.01M17 12h.01M17 15h.01"]} />,
  Database: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M12 2C6.48 2 2 4.69 2 8c0 3.31 4.48 6 10 6s10-2.69 10-6c0-3.31-4.48-6-10-6z", "M2 8v8c0 3.31 4.48 6 10 6s10-2.69 10-6V8", "M2 12c0 3.31 4.48 6 10 6s10-2.69 10-6"]} />,
  Rocket: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z", "M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"]} />,
  Award: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M8.21 13.89L7 23l5-3 5 3-1.21-9.12", "M12 15A7 7 0 1012 1a7 7 0 000 14z"]} />,
  ExternalLink: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6", "M15 3h6v6", "M10 14L21 3"]} />,
  Copy: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M20 9h-9a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z", "M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"]} />,
  Github: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />,
  Twitter: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />,
  Mail: ({ size = 16, color = "currentColor" }) => <Icon size={size} color={color} d={["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"]} />,
};

/* ─────────────────────────────────────────
   HOOKS
───────────────────────────────────────── */
function useInView(ref, threshold = 0.08) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsInView(true); observer.unobserve(el); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return isInView;
}

function useCounter(target, inView, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return count;
}

/* ─────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Geist+Mono:wght@300;400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

:root{
  --navy:#0a1628;
  --navy-800:#0f2040;
  --navy-700:#152a52;
  --blue:#1a4fd6;
  --blue-light:#3b6ef8;
  --blue-soft:#e8eeff;
  --blue-mid:#b8cafe;
  --cyan:#00c2ff;
  --green:#00d68f;
  --amber:#f5a623;
  --red:#f04040;
  --slate:#64748b;
  --slate-200:#e2e8f0;
  --slate-100:#f1f5f9;
  --slate-50:#f8fafc;
  --white:#ffffff;
  --text:#0a1628;
  --text-muted:#4a5568;
  --radius-sm:6px;
  --radius:10px;
  --radius-lg:16px;
  --radius-xl:24px;
  --shadow-sm:0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.05);
  --shadow:0 4px 16px rgba(0,0,0,.08),0 2px 6px rgba(0,0,0,.04);
  --shadow-lg:0 16px 48px rgba(0,0,0,.12),0 4px 16px rgba(0,0,0,.06);
  --shadow-blue:0 8px 32px rgba(26,79,214,.22);
}

html{scroll-behavior:smooth;}
body,*{font-family:'Bricolage Grotesque',system-ui,sans-serif!important;}
.mono{font-family:'Geist Mono',monospace!important;}

/* Animations */
@keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}  }
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.6;}}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
@keyframes gradientShift{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
@keyframes borderGlow{0%,100%{box-shadow:0 0 0 0 rgba(26,79,214,.4);}50%{box-shadow:0 0 0 6px rgba(26,79,214,0);}}

.anim-up{animation:fadeUp .6s cubic-bezier(.16,1,.3,1) both;}
.anim-in{animation:fadeIn .5s ease both;}
.anim-down{animation:slideDown .3s ease both;}

/* Scrollbar */
::-webkit-scrollbar{width:6px;}
::-webkit-scrollbar-track{background:var(--slate-100);}
::-webkit-scrollbar-thumb{background:var(--blue-mid);border-radius:3px;}

/* Selection */
::selection{background:rgba(26,79,214,.15);color:var(--navy);}

/* NAV */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:100;
  height:64px;
  background:rgba(255,255,255,.92);
  backdrop-filter:blur(20px) saturate(1.4);
  border-bottom:1px solid rgba(226,232,240,.8);
  transition:background .3s,box-shadow .3s;
}
.nav.scrolled{background:rgba(255,255,255,.98);box-shadow:var(--shadow);}
.nav-inner{max-width:1200px;margin:0 auto;padding:0 28px;height:100%;display:flex;align-items:center;justify-content:space-between;gap:24px;}
.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;}
.nav-logo-mark{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;color:#fff;position:relative;overflow:hidden;}
.nav-logo-mark::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.15) 0%,transparent 60%);}
.nav-logo-text{font-weight:800;font-size:15px;letter-spacing:-.02em;color:var(--navy);}
.nav-links{display:flex;align-items:center;gap:4px;}
.nav-link{font-size:13.5px;font-weight:500;color:var(--slate);text-decoration:none;padding:7px 13px;border-radius:var(--radius-sm);transition:all .2s;white-space:nowrap;}
.nav-link:hover{color:var(--blue);background:var(--blue-soft);}
.nav-link.active{color:var(--blue);background:var(--blue-soft);}
.nav-actions{display:flex;align-items:center;gap:10px;}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-weight:600;font-size:14px;padding:11px 22px;border-radius:var(--radius);border:none;cursor:pointer;text-decoration:none;transition:all .2s;letter-spacing:-.01em;white-space:nowrap;position:relative;overflow:hidden;}
.btn::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.12) 0%,transparent 100%);pointer-events:none;}
.btn:active{transform:scale(.97)!important;}

.btn-primary{background:var(--blue);color:#fff;box-shadow:var(--shadow-blue);}
.btn-primary:hover{background:var(--blue-light);transform:translateY(-2px);box-shadow:0 12px 36px rgba(26,79,214,.3);}

.btn-primary-lg{font-size:16px;padding:15px 32px;border-radius:var(--radius-lg);}

.btn-secondary{background:var(--navy);color:#fff;}
.btn-secondary:hover{background:var(--navy-700);transform:translateY(-2px);}

.btn-ghost{background:transparent;color:var(--text-muted);border:1.5px solid var(--slate-200);}
.btn-ghost:hover{border-color:var(--blue);color:var(--blue);background:var(--blue-soft);}

.btn-outline{background:transparent;color:var(--blue);border:1.5px solid var(--blue);}
.btn-outline:hover{background:var(--blue);color:#fff;}

.btn-white{background:#fff;color:var(--navy);box-shadow:var(--shadow);}
.btn-white:hover{transform:translateY(-2px);box-shadow:var(--shadow-lg);}

.btn-danger{background:var(--red);color:#fff;}
.btn-danger:hover{background:#d43232;transform:translateY(-2px);}

.btn-success{background:var(--green);color:#fff;}
.btn-success:hover{background:#00b87a;transform:translateY(-2px);}

.btn-sm{font-size:12px;padding:7px 14px;border-radius:var(--radius-sm);}
.btn-xs{font-size:11px;padding:5px 10px;border-radius:5px;}
.btn-icon{padding:10px;border-radius:var(--radius);aspect-ratio:1;}
.btn-icon-sm{padding:7px;border-radius:var(--radius-sm);aspect-ratio:1;}

.btn-loading{pointer-events:none;opacity:.75;}
.btn-loading::before{content:'';width:14px;height:14px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;}

.btn-pill{border-radius:999px;}

/* BADGES / TAGS */
.badge{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;padding:4px 10px;border-radius:999px;letter-spacing:.04em;white-space:nowrap;}
.badge-blue{background:var(--blue-soft);color:var(--blue);border:1px solid var(--blue-mid);}
.badge-navy{background:var(--navy);color:#fff;}
.badge-green{background:#d1fae5;color:#065f46;border:1px solid #a7f3d0;}
.badge-amber{background:#fef3c7;color:#92400e;border:1px solid #fde68a;}
.badge-red{background:#fee2e2;color:#991b1b;border:1px solid #fecaca;}
.badge-slate{background:var(--slate-100);color:var(--slate);border:1px solid var(--slate-200);}
.badge-dot::before{content:'';width:6px;height:6px;border-radius:50%;background:currentColor;flex-shrink:0;}

/* CARDS */
.card{background:#fff;border:1px solid var(--slate-200);border-radius:var(--radius-lg);transition:all .25s;}
.card-sm{border-radius:var(--radius);}
.card:hover{border-color:var(--blue-mid);box-shadow:var(--shadow);}
.card-elevated{box-shadow:var(--shadow);border-color:transparent;}
.card-elevated:hover{box-shadow:var(--shadow-lg);transform:translateY(-3px);}
.card-navy{background:var(--navy);border-color:rgba(255,255,255,.08);color:#fff;}
.card-blue{background:var(--blue);border-color:transparent;color:#fff;}
.card-soft{background:var(--slate-50);border-color:var(--slate-100);}

/* INPUTS */
.input-wrap{display:flex;flex-direction:column;gap:6px;}
.label{font-size:13px;font-weight:600;color:var(--text);letter-spacing:-.01em;}
.input{width:100%;font-size:14px;font-family:inherit;padding:10px 14px;border-radius:var(--radius);border:1.5px solid var(--slate-200);background:#fff;color:var(--text);transition:all .2s;outline:none;}
.input:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(26,79,214,.1);}
.input:disabled{background:var(--slate-100);color:var(--slate);cursor:not-allowed;}
.input-error{border-color:var(--red)!important;box-shadow:0 0 0 3px rgba(240,64,64,.08)!important;}
.input-success{border-color:var(--green)!important;}
.input-hint{font-size:12px;color:var(--slate);}
.input-hint.error{color:var(--red);}
.input-hint.success{color:#065f46;}
.input-group{display:flex;border:1.5px solid var(--slate-200);border-radius:var(--radius);overflow:hidden;transition:all .2s;}
.input-group:focus-within{border-color:var(--blue);box-shadow:0 0 0 3px rgba(26,79,214,.1);}
.input-group .input{border:none;border-radius:0;}
.input-group .input:focus{box-shadow:none;}
.input-prefix{padding:10px 14px;background:var(--slate-50);color:var(--slate);font-size:14px;border-right:1.5px solid var(--slate-200);display:flex;align-items:center;white-space:nowrap;}
.textarea{resize:vertical;min-height:100px;}

/* SELECT */
.select{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:36px;cursor:pointer;}

/* CHECKBOX & RADIO */
.checkbox-wrap,.radio-wrap{display:flex;align-items:center;gap:10px;cursor:pointer;user-select:none;}
.checkbox,.radio{width:17px;height:17px;border:1.5px solid var(--slate-200);border-radius:4px;display:flex;align-items:center;justify-content:center;transition:all .15s;background:#fff;flex-shrink:0;}
.radio{border-radius:50%;}
.checkbox-wrap:has(input:checked) .checkbox{background:var(--blue);border-color:var(--blue);}
.radio-wrap:has(input:checked) .radio{border-color:var(--blue);}
.radio-dot{width:7px;height:7px;border-radius:50%;background:var(--blue);display:none;}
.radio-wrap:has(input:checked) .radio-dot{display:block;}
.checkbox-check{display:none;}
.checkbox-wrap:has(input:checked) .checkbox-check{display:flex;color:#fff;}
input[type=checkbox],input[type=radio]{position:absolute;opacity:0;width:0;height:0;}

/* TOGGLE */
.toggle{width:42px;height:24px;background:var(--slate-200);border-radius:999px;position:relative;cursor:pointer;transition:background .2s;flex-shrink:0;}
.toggle.on{background:var(--blue);}
.toggle-thumb{width:18px;height:18px;border-radius:50%;background:#fff;position:absolute;top:3px;left:3px;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.15);}
.toggle.on .toggle-thumb{transform:translateX(18px);}

/* AVATAR */
.avatar{border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0;overflow:hidden;}
.avatar-xs{width:24px;height:24px;font-size:10px;}
.avatar-sm{width:32px;height:32px;font-size:12px;}
.avatar-md{width:40px;height:40px;font-size:14px;}
.avatar-lg{width:52px;height:52px;font-size:18px;}
.avatar-xl{width:72px;height:72px;font-size:24px;}
.avatar-group{display:flex;flex-direction:row-reverse;}
.avatar-group .avatar{border:2px solid #fff;margin-left:-8px;}
.avatar-group .avatar:last-child{margin-left:0;}

/* DIVIDER */
.divider{height:1px;background:var(--slate-200);}
.divider-label{display:flex;align-items:center;gap:16px;color:var(--slate);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;}
.divider-label::before,.divider-label::after{content:'';flex:1;height:1px;background:var(--slate-200);}

/* TOOLTIP */
.tooltip-wrap{position:relative;display:inline-flex;}
.tooltip{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);background:var(--navy);color:#fff;font-size:12px;padding:6px 10px;border-radius:6px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .2s;z-index:99;}
.tooltip::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:var(--navy);}
.tooltip-wrap:hover .tooltip{opacity:1;}

/* PROGRESS */
.progress{height:6px;background:var(--slate-200);border-radius:999px;overflow:hidden;}
.progress-bar{height:100%;border-radius:999px;background:var(--blue);transition:width .6s ease;}
.progress-bar.green{background:var(--green);}
.progress-bar.amber{background:var(--amber);}
.progress-bar.gradient{background:linear-gradient(90deg,var(--blue),var(--cyan));}

/* BREADCRUMB */
.breadcrumb{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--slate);}
.breadcrumb a{color:var(--slate);text-decoration:none;transition:color .2s;}
.breadcrumb a:hover{color:var(--blue);}
.breadcrumb-current{color:var(--text);font-weight:600;}

/* TABS */
.tabs{display:flex;gap:2px;background:var(--slate-100);padding:4px;border-radius:var(--radius);}
.tab{padding:8px 16px;border-radius:7px;font-size:13px;font-weight:500;color:var(--slate);cursor:pointer;transition:all .2s;border:none;background:none;}
.tab.active{background:#fff;color:var(--text);font-weight:600;box-shadow:var(--shadow-sm);}

/* STEPS */
.steps{display:flex;align-items:center;gap:0;}
.step{display:flex;align-items:center;flex:1;}
.step-circle{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;transition:all .3s;}
.step-circle.done{background:var(--blue);color:#fff;}
.step-circle.active{background:var(--blue);color:#fff;box-shadow:0 0 0 4px rgba(26,79,214,.15);}
.step-circle.pending{background:var(--slate-100);color:var(--slate);border:1.5px solid var(--slate-200);}
.step-line{flex:1;height:2px;background:var(--slate-200);}
.step-line.done{background:var(--blue);}

/* ALERT */
.alert{padding:14px 18px;border-radius:var(--radius);border-left:3px solid;display:flex;align-items:flex-start;gap:12px;}
.alert-info{background:#eff6ff;border-color:var(--blue);color:#1e40af;}
.alert-success{background:#f0fdf4;border-color:var(--green);color:#065f46;}
.alert-warning{background:#fffbeb;border-color:var(--amber);color:#92400e;}
.alert-error{background:#fef2f2;border-color:var(--red);color:#991b1b;}

/* TABLE */
.table{width:100%;border-collapse:collapse;font-size:13.5px;}
.table th{padding:10px 16px;text-align:left;font-size:11px;font-weight:700;color:var(--slate);text-transform:uppercase;letter-spacing:.06em;background:var(--slate-50);border-bottom:1px solid var(--slate-200);}
.table td{padding:13px 16px;border-bottom:1px solid var(--slate-200);color:var(--text);}
.table tr:last-child td{border-bottom:none;}
.table tr:hover td{background:var(--slate-50);}

/* CODE */
.code-block{background:#0f172a;border-radius:var(--radius);overflow:hidden;font-family:'Geist Mono',monospace;font-size:13px;}
.code-header{display:flex;align-items:center;justify-content:space-between;padding:12px 18px;background:#0a0f1e;border-bottom:1px solid rgba(255,255,255,.06);}
.code-dots{display:flex;gap:6px;}
.code-dot{width:10px;height:10px;border-radius:50%;}
.code-body{padding:20px 22px;line-height:1.7;overflow-x:auto;}
.code-line{display:flex;gap:16px;}
.code-prompt{color:#4a5568;}
.code-cmd{color:#cbd5e1;}
.code-success{color:#4ade80;}
.code-comment{color:#4a5568;font-style:italic;}
.code-string{color:#86efac;}
.code-keyword{color:#93c5fd;}
.code-number{color:#fcd34d;}

/* SKELETON */
.skeleton{background:linear-gradient(90deg,var(--slate-200) 25%,var(--slate-100) 50%,var(--slate-200) 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:var(--radius-sm);}

/* CHIP */
.chip{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:999px;font-size:12px;font-weight:500;border:1px solid var(--slate-200);background:#fff;color:var(--text);cursor:default;transition:all .2s;}
.chip:hover{border-color:var(--blue);color:var(--blue);}
.chip-close{display:flex;align-items:center;color:var(--slate);cursor:pointer;transition:color .2s;}
.chip-close:hover{color:var(--red);}

/* STAT CARD */
.stat{padding:24px 28px;border-radius:var(--radius-lg);background:#fff;border:1px solid var(--slate-200);}
.stat-val{font-size:40px;font-weight:800;letter-spacing:-.04em;line-height:1;margin-bottom:4px;}
.stat-label{font-size:12px;font-weight:600;color:var(--slate);text-transform:uppercase;letter-spacing:.08em;}
.stat-trend{display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:600;padding:2px 8px;border-radius:999px;margin-top:10px;}
.stat-trend.up{background:#d1fae5;color:#065f46;}
.stat-trend.down{background:#fee2e2;color:#991b1b;}

/* SECTION HELPERS */
.section{padding:96px 24px;}
.section-sm{padding:64px 24px;}
.container{max-width:1200px;margin:0 auto;}
.container-sm{max-width:800px;margin:0 auto;}
.container-xs{max-width:560px;margin:0 auto;}

/* HERO SHAPES */
.shape-blob{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;opacity:.12;}

/* MARQUEE */
.marquee-track{overflow:hidden;}
.marquee-inner{display:flex;gap:12px;animation:marquee 32s linear infinite;width:max-content;}
.marquee-inner:hover{animation-play-state:paused;}

/* PRICING */
.pricing-badge{background:linear-gradient(135deg,#1a4fd6,#3b6ef8);color:#fff;font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;letter-spacing:.04em;}

/* FEATURE ICON BOX */
.icon-box{display:flex;align-items:center;justify-content:center;flex-shrink:0;border-radius:var(--radius);}

/* GRADIENT TEXT */
.gradient-text{background:linear-gradient(135deg,var(--blue) 0%,#6366f1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

/* NOISE OVERLAY */
.noise::after{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.04'/%3E%3C/svg%3E");pointer-events:none;opacity:.4;}

/* MOBILE */
@media(max-width:768px){
  .nav-links{display:none;}
  .hide-mobile{display:none!important;}
  .section{padding:64px 20px;}
  .grid-2,.grid-3,.grid-4{grid-template-columns:1fr!important;}
  h1{font-size:38px!important;}
}
@media(max-width:1024px){
  .hero-grid{grid-template-columns:1fr!important;}
  .code-panel{display:none!important;}
}
`;

/* ─────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────── */

function AnimatedCounter({ target, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const count = useCounter(target, inView);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          <div className="nav-logo-mark">
            <img src="/logodev.png" />
          </div>
          <span className="nav-logo-text">DevKit Pro</span>
        </a>
        <div className="nav-links">
          {["Features", "Pricing", "Testimonials", "FAQ"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </div>
        <div className="nav-actions">
          <a href="#" className="btn btn-ghost btn-sm hide-mobile">View Demo</a>
          <a href="#pricing" className="btn btn-primary btn-sm">Get Access — $16</a>
        </div>
      </div>
    </nav>
  );
}

function CodePanel() {
  const [copied, setCopied] = useState(false);
  const lines = [
    { type: "prompt", cmd: "git clone devkit-pro/starter", delay: "0.5s" },
    { type: "comment", cmd: "# Installing dependencies...", delay: "0.9s" },
    { type: "prompt", cmd: "pnpm install", delay: "1.1s" },
    { type: "prompt", cmd: "pnpm dev", delay: "1.6s" },
    { type: "success", cmd: "✓  Ready on localhost:3000", delay: "2.2s" },
    { type: "success", cmd: "✓  50+ components loaded", delay: "2.6s" },
    { type: "success", cmd: "✓  TypeScript checks passed", delay: "3.0s" },
  ];
  return (
    <div className="code-block" style={{ boxShadow: "0 24px 64px rgba(0,0,0,.25)" }}>
      <div className="code-header">
        <div className="code-dots">
          <div className="code-dot" style={{ background: "#ff5f57" }} />
          <div className="code-dot" style={{ background: "#febc2e" }} />
          <div className="code-dot" style={{ background: "#28c840" }} />
        </div>
        <span className="mono" style={{ fontSize: 11, color: "#475569" }}>terminal — devkit-pro</span>
        <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="btn btn-ghost btn-xs mono" style={{ color: "#64748b", border: "1px solid #1e293b", background: "#0a0f1e" }}>
          {copied ? "Copied!" : <><Icons.Copy size={11} /> Copy</>}
        </button>
      </div>
      <div className="code-body">
        {lines.map((l, i) => (
          <div key={i} className="code-line opacity-0 mono" style={{ animation: `fadeUp .4s ease ${l.delay} forwards`, marginBottom: 8 }}>
            <span className={l.type === "success" ? "code-success" : l.type === "comment" ? "code-comment" : "code-prompt"}>
              {l.type === "prompt" ? "$" : l.type === "comment" ? "" : ""}
            </span>
            <span className={l.type === "success" ? "code-success" : l.type === "comment" ? "code-comment" : "code-cmd"}>
              {l.cmd}
            </span>
          </div>
        ))}
        <div className="mono opacity-0" style={{ animation: "fadeUp .4s ease 3.4s forwards", marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#334155" }}>❯</span>
          <span className="inline-block w-2 h-4" style={{ width: 8, height: 16, background: "#3b6ef8", animation: "blink 1s step-end infinite" }} />
        </div>
      </div>
    </div>
  );
}

function TechBadge({ label, delay }) {
  return (
    <span className="mono chip opacity-0" style={{ animation: `fadeUp .4s ease ${delay} forwards`, fontSize: 12, letterSpacing: "-.01em" }}>
      {label}
    </span>
  );
}

function StarRating({ count = 5 }) {
  return (
    <div style={{ display: "flex", gap: 2, color: "#f59e0b" }}>
      {Array.from({ length: count }).map((_, i) => <Icons.Star key={i} size={13} />)}
    </div>
  );
}

function TestimonialCard({ t, delay, inView }) {
  return (
    <div className={`card card-elevated ${inView ? "anim-up" : "opacity-0"}`}
      style={{ borderRadius: 14, padding: "32px 30px", animationDelay: inView ? `${delay}ms` : "0ms" }}>
      <StarRating />
      <p style={{ color: "#334155", fontSize: 15, lineHeight: 1.8, margin: "18px 0 24px", fontWeight: 400 }}>
        "{t.text}"
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 18, borderTop: "1px solid var(--slate-200)" }}>
        <div className="avatar avatar-md" style={{ background: "linear-gradient(135deg, #1a4fd6, #6366f1)", color: "#fff" }}>{t.initials}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{t.author}</div>
          <div style={{ fontSize: 12, color: "var(--slate)" }}>{t.title} · {t.company}</div>
        </div>
        <span className="badge badge-green" style={{ marginLeft: "auto" }}>Verified</span>
      </div>
    </div>
  );
}

function FAQItem({ faq, idx, expanded, onToggle, inView }) {
  return (
    <div className={`card card-sm ${inView ? "anim-up" : "opacity-0"}`}
      style={{ borderRadius: 10, overflow: "hidden", animationDelay: `${idx * 60}ms` }}>
      <button onClick={() => onToggle(idx)}
        style={{ width: "100%", padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}>
        <span style={{ fontWeight: 600, color: "var(--text)", fontSize: 15 }}>{faq.q}</span>
        <div style={{ flexShrink: 0, transition: "transform .3s", transform: expanded ? "rotate(180deg)" : "none", color: "var(--slate)" }}>
          <Icons.ChevronDown size={16} />
        </div>
      </button>
      {expanded && (
        <div className="anim-down" style={{ padding: "0 22px 20px" }}>
          <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.85 }}>{faq.a}</p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   DESIGN SYSTEM SHOWCASE (new section)
───────────────────────────────────────── */
function DSShowcase({ inView }) {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(true);
  const [tab, setTab] = useState("overview");
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(65);

  return (
    <section style={{ background: "var(--slate-50)", padding: "96px 24px", borderTop: "1px solid var(--slate-200)" }}>
      <div className="container-sm">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="badge badge-blue" style={{ marginBottom: 14 }}>
            <Icons.Sparkles size={10} /> Design System
          </span>
          <h2 style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-.03em", marginBottom: 10 }}>
            Every component you'll ever need
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 17, lineHeight: 1.7 }}>
            50+ battle-tested UI primitives, fully accessible and customizable.
          </p>
        </div>

        {/* BUTTONS */}
        <div className="card" style={{ padding: "36px 32px", marginBottom: 16 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--slate)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 20 }}>Buttons</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-ghost">Ghost</button>
            <button className="btn btn-outline">Outline</button>
            <button className="btn btn-danger">Danger</button>
            <button className="btn btn-success">Success</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
            <button className="btn btn-primary btn-sm">Small</button>
            <button className="btn btn-primary">Default</button>
            <button className="btn btn-primary btn-primary-lg">Large</button>
            <button className="btn btn-primary btn-pill">Pill Shape</button>
            <button className="btn btn-primary btn-loading">Loading</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <button className="btn btn-ghost btn-icon"><Icons.Github size={16} /></button>
            <button className="btn btn-ghost btn-icon"><Icons.Twitter size={16} /></button>
            <button className="btn btn-ghost btn-icon"><Icons.Mail size={16} /></button>
            <button className="btn btn-primary" style={{ gap: 8 }}><Icons.Rocket size={15} /> Get Started <Icons.ArrowRight size={15} /></button>
            <button className="btn btn-ghost" style={{ gap: 8 }}><Icons.Play size={14} /> Watch Demo</button>
          </div>
        </div>

        {/* BADGES */}
        <div className="card" style={{ padding: "36px 32px", marginBottom: 16 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--slate)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 20 }}>Badges & Chips</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
            <span className="badge badge-blue">Default</span>
            <span className="badge badge-green badge-dot">Active</span>
            <span className="badge badge-amber badge-dot">Pending</span>
            <span className="badge badge-red badge-dot">Error</span>
            <span className="badge badge-slate">Neutral</span>
            <span className="badge badge-navy">Dark</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["React 18", "TypeScript", "Tailwind CSS", "Vite", "Express", "Vitest", "PostgreSQL"].map(t => (
              <span key={t} className="chip">
                {t}
                <span className="chip-close"><Icons.X size={10} /></span>
              </span>
            ))}
          </div>
        </div>

        {/* INPUTS */}
        <div className="card" style={{ padding: "36px 32px", marginBottom: 16 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--slate)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 24 }}>Form Elements</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <div className="input-wrap">
              <label className="label">Email address</label>
              <div className="input-group">
                <span className="input-prefix">@</span>
                <input className="input" type="email" placeholder="you@example.com" />
              </div>
            </div>
            <div className="input-wrap">
              <label className="label">Project name</label>
              <input className="input" type="text" placeholder="my-awesome-app" />
              <span className="input-hint">Use lowercase letters and hyphens.</span>
            </div>
            <div className="input-wrap">
              <label className="label">Status (error state)</label>
              <input className="input input-error" type="text" defaultValue="invalid-value" />
              <span className="input-hint error">This field has an error.</span>
            </div>
            <div className="input-wrap">
              <label className="label">License key (success)</label>
              <input className="input input-success" type="text" defaultValue="DK-PRO-XXXX-YYYY" />
              <span className="input-hint success">Valid license key.</span>
            </div>
          </div>
          <div className="input-wrap" style={{ marginBottom: 20 }}>
            <label className="label">Select framework</label>
            <select className="input select">
              <option>React 18</option>
              <option>Next.js 14</option>
              <option>Remix 2</option>
            </select>
          </div>
          <div className="input-wrap" style={{ marginBottom: 20 }}>
            <label className="label">Project description</label>
            <textarea className="input textarea" placeholder="Describe your project..." />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
            <label className="checkbox-wrap">
              <input type="checkbox" defaultChecked />
              <span className="checkbox"><span className="checkbox-check"><Icons.Check size={10} /></span></span>
              <span style={{ fontSize: 14, color: "var(--text)" }}>I agree to the terms</span>
            </label>
            <label className="checkbox-wrap">
              <input type="checkbox" />
              <span className="checkbox"><span className="checkbox-check"><Icons.Check size={10} /></span></span>
              <span style={{ fontSize: 14, color: "var(--text)" }}>Email notifications</span>
            </label>
            <label className="radio-wrap">
              <input type="radio" name="plan" defaultChecked />
              <span className="radio"><span className="radio-dot" /></span>
              <span style={{ fontSize: 14 }}>Monthly</span>
            </label>
            <label className="radio-wrap">
              <input type="radio" name="plan" />
              <span className="radio"><span className="radio-dot" /></span>
              <span style={{ fontSize: 14 }}>Annual</span>
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className={`toggle ${toggle1 ? "on" : ""}`} onClick={() => setToggle1(!toggle1)}>
                <div className="toggle-thumb" />
              </div>
              <span style={{ fontSize: 14, color: "var(--text)" }}>Dark mode</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className={`toggle ${toggle2 ? "on" : ""}`} onClick={() => setToggle2(!toggle2)}>
                <div className="toggle-thumb" />
              </div>
              <span style={{ fontSize: 14, color: "var(--text)" }}>Notifications</span>
            </div>
          </div>
        </div>

        {/* TABS + STEPS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div className="card" style={{ padding: "28px 24px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--slate)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 16 }}>Tabs</h3>
            <div className="tabs" style={{ marginBottom: 20 }}>
              {["overview", "code", "preview"].map(t => (
                <button key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}
                  style={{ textTransform: "capitalize" }}>{t}</button>
              ))}
            </div>
            <div style={{ padding: "16px", background: "var(--slate-50)", borderRadius: 8, fontSize: 13, color: "var(--text-muted)" }}>
              Active tab: <strong style={{ color: "var(--text)" }}>{tab}</strong>
            </div>
          </div>
          <div className="card" style={{ padding: "28px 24px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--slate)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 16 }}>Progress Steps</h3>
            <div className="steps" style={{ marginBottom: 20 }}>
              {[1, 2, 3, 4].map((s, i) => (
                <div key={s} className="step">
                  <div className={`step-circle ${s < step ? "done" : s === step ? "active" : "pending"}`}>
                    {s < step ? <Icons.Check size={13} /> : s}
                  </div>
                  {i < 3 && <div className={`step-line ${s < step ? "done" : ""}`} />}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setStep(Math.max(1, step - 1))}>← Back</button>
              <button className="btn btn-primary btn-sm" onClick={() => setStep(Math.min(4, step + 1))}>Next →</button>
            </div>
          </div>
        </div>

        {/* ALERTS */}
        <div className="card" style={{ padding: "36px 32px", marginBottom: 16 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--slate)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 20 }}>Alerts</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div className="alert alert-info"><Icons.Zap size={15} /><div><strong>Info:</strong> Your project was created successfully.</div></div>
            <div className="alert alert-success"><Icons.Check size={15} /><div><strong>Success:</strong> Deployment completed. Your app is live.</div></div>
            <div className="alert alert-warning"><Icons.Clock size={15} /><div><strong>Warning:</strong> Your trial expires in 3 days.</div></div>
            <div className="alert alert-error"><Icons.Shield size={15} /><div><strong>Error:</strong> Authentication failed. Please try again.</div></div>
          </div>
        </div>

        {/* PROGRESS + STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div className="card" style={{ padding: "28px 24px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--slate)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 20 }}>Progress Bars</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "TypeScript Coverage", val: 100, cls: "gradient" },
                { label: "Test Coverage", val: 82, cls: "" },
                { label: "Performance Score", val: 96, cls: "green" },
                { label: "Bundle Size Budget", val: 44, cls: "amber" },
              ].map(p => (
                <div key={p.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, fontWeight: 600, color: "var(--text)" }}>
                    <span>{p.label}</span><span style={{ color: "var(--slate)" }}>{p.val}%</span>
                  </div>
                  <div className="progress">
                    <div className={`progress-bar ${p.cls}`} style={{ width: `${p.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: "28px 24px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--slate)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 20 }}>Avatars</h3>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
              {[
                { initials: "AC", bg: "#1a4fd6" }, { initials: "MP", bg: "#7c3aed" },
                { initials: "JW", bg: "#059669" }, { initials: "SR", bg: "#dc2626" }
              ].map((a, i) => ["avatar-xs", "avatar-sm", "avatar-md", "avatar-lg"][i] && (
                <div key={i} className={`avatar ${["avatar-xs","avatar-sm","avatar-md","avatar-lg"][i]}`}
                  style={{ background: a.bg, color: "#fff" }}>{a.initials}</div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "var(--slate)", marginBottom: 10, textTransform: "uppercase", letterSpacing: ".06em" }}>Avatar Group</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className="avatar-group">
                  {["AC","MP","JW","SR","+4"].map((i, idx) => (
                    <div key={idx} className="avatar avatar-sm" style={{ background: ["#1a4fd6","#7c3aed","#059669","#dc2626","#64748b"][idx], color: "#fff", fontSize: 10 }}>{i}</div>
                  ))}
                </div>
                <span style={{ fontSize: 13, color: "var(--slate)" }}>8 contributors</span>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--slate-200)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--slate)", textTransform: "uppercase", letterSpacing: ".08em" }}>Data Table</h3>
            <button className="btn btn-primary btn-sm"><Icons.Rocket size={12} /> Export</button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Component</th><th>Status</th><th>Tests</th><th>Coverage</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Button", status: "Stable", tests: 24, cov: 100 },
                  { name: "Input", status: "Stable", tests: 18, cov: 98 },
                  { name: "Modal", status: "Beta", tests: 12, cov: 84 },
                  { name: "DataTable", status: "Stable", tests: 31, cov: 100 },
                ].map(row => (
                  <tr key={row.name}>
                    <td><strong>{row.name}</strong></td>
                    <td><span className={`badge ${row.status === "Stable" ? "badge-green" : "badge-amber"}`}>{row.status}</span></td>
                    <td><span className="mono" style={{ fontSize: 12 }}>{row.tests} tests</span></td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className="progress" style={{ flex: 1, maxWidth: 80 }}>
                          <div className="progress-bar gradient" style={{ width: `${row.cov}%` }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--slate)", minWidth: 32 }}>{row.cov}%</span>
                      </div>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-xs"><Icons.ExternalLink size={11} /> View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TOOLTIPS + DIVIDERS */}
        <div className="card" style={{ padding: "28px 24px" }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--slate)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 20 }}>Tooltips & Dividers</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
            {["Hover me", "Top tooltip", "Info"].map(t => (
              <div key={t} className="tooltip-wrap">
                <button className="btn btn-ghost btn-sm">{t}</button>
                <div className="tooltip">Tooltip: {t}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="divider" />
            <div className="divider-label">or continue with</div>
            <div className="divider" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function DevKitPro() {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const socialRef = useRef(null);
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const featuresRef = useRef(null);
  const benefitsRef = useRef(null);
  const audienceRef = useRef(null);
  const includedRef = useRef(null);
  const pricingRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  const dsRef = useRef(null);

  const heroIn = useInView(heroRef);
  const statsIn = useInView(statsRef);
  const socialIn = useInView(socialRef);
  const problemIn = useInView(problemRef);
  const solutionIn = useInView(solutionRef);
  const featuresIn = useInView(featuresRef);
  const benefitsIn = useInView(benefitsRef);
  const audienceIn = useInView(audienceRef);
  const includedIn = useInView(includedRef);
  const pricingIn = useInView(pricingRef);
  const faqIn = useInView(faqRef);
  const ctaIn = useInView(ctaRef);
  const dsIn = useInView(dsRef);

  const an = (inView, delay = 0) => ({
    className: inView ? "anim-up" : "opacity-0",
    style: { animationDelay: `${delay}ms` },
  });

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
    { icon: Icons.Zap, title: "Rapid Onboarding", desc: "A single command gets the environment running. No complex configuration or hidden dependencies.", color: "#0ea5e9" },
    { icon: Icons.Code, title: "Full TypeScript", desc: "End-to-end type safety from client to server. Reduces bugs and improves IDE productivity.", color: "#6366f1" },
    { icon: Icons.Shield, title: "Security by Default", desc: "Secure dependencies, auth patterns, and data-handling best practices from day one.", color: "#10b981" },
    { icon: Icons.Package, title: "50+ UI Components", desc: "Accessible, production-grade components covering all standard patterns. Fully customizable.", color: "#f59e0b" },
    { icon: Icons.Globe, title: "Platform-Agnostic", desc: "Pre-configured for Netlify, Vercel, and AWS. Predictable deployment across environments.", color: "#0ea5e9" },
    { icon: Icons.Terminal, title: "Testing Infrastructure", desc: "Vitest configured with representative examples. Unit, component, and integration tests ready.", color: "#8b5cf6" },
    { icon: Icons.Layers, title: "Scalable Architecture", desc: "Structural patterns from leading engineering organizations. Built to scale from MVP to enterprise.", color: "#6366f1" },
    { icon: Icons.BarChart, title: "Performance Optimized", desc: "Vite builds with code splitting and lazy loading. Measurable performance from first deploy.", color: "#10b981" },
    { icon: Icons.FileText, title: "Complete Documentation", desc: "Setup, deployment, customization, and architectural patterns — all thoroughly documented.", color: "#f59e0b" },
  ];

  return (
    <div style={{ background: "#fff", color: "var(--text)", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{STYLES}</style>

      <NavBar />

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 100, paddingBottom: 80, background: "#fff", borderBottom: "1px solid var(--slate-200)", position: "relative", overflow: "hidden" }}>
        {/* Decorative blobs */}
        <div className="shape-blob" style={{ width: 600, height: 600, background: "#1a4fd6", top: -200, right: -100 }} />
        <div className="shape-blob" style={{ width: 400, height: 400, background: "#6366f1", bottom: -100, left: -100 }} />
        {/* Grid pattern */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--slate-200) 1px, transparent 1px), linear-gradient(90deg, var(--slate-200) 1px, transparent 1px)", backgroundSize: "48px 48px", opacity: .3, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "linear-gradient(to bottom, transparent, var(--blue), transparent)" }} />

        <div className="container" style={{ padding: "0 28px", position: "relative", zIndex: 10 }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
            <div>
              <div {...an(heroIn)}>
                <span className="badge badge-blue" style={{ marginBottom: 24 }}>
                  <Icons.Award size={11} /> Trusted by 2,500+ development teams globally
                </span>
              </div>
              <h1 {...an(heroIn, 80)} style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.06, letterSpacing: "-.04em", marginBottom: 22 }}>
                Ship production-grade apps.{" "}
                <span className="gradient-text">Faster, at scale.</span>
              </h1>
              <p {...an(heroIn, 160)} style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 36, maxWidth: 480 }}>
                A comprehensive, battle-tested codebase with 50+ components, complete TypeScript coverage, and the architectural foundations your team needs.
              </p>
              <div {...an(heroIn, 240)} style={{ display: "flex", gap: 12, marginBottom: 36, flexWrap: "wrap" }}>
                <a href="#pricing" className="btn btn-primary btn-primary-lg">
                  Get Instant Access <Icons.ArrowRight size={17} />
                </a>
                <button className="btn btn-ghost btn-primary-lg">
                  <Icons.Play size={15} /> Watch Demo
                </button>
              </div>
              <div {...an(heroIn, 320)} style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
                {["MIT License", "No recurring fees", "30-day guarantee", "Lifetime access"].map(t => (
                  <span key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>
                    <span style={{ color: "var(--blue)" }}><Icons.Check size={13} /></span>{t}
                  </span>
                ))}
              </div>
            </div>
            <div className="code-panel" {...an(heroIn, 400)}>
              <CodePanel />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                {["React 18", "TypeScript", "Tailwind CSS", "Vite", "Express", "Vitest"].map((t, i) => (
                  <TechBadge key={t} label={t} delay={`${1.4 + i * 0.1}s`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div ref={statsRef} style={{ background: "var(--navy)", padding: "56px 28px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1 }}>
            {[
              { val: 2500, suf: "+", label: "Development Teams" },
              { val: 200, suf: "hrs", label: "Saved Per Project" },
              { val: 50, suf: "+", label: "Production Components" },
              { val: 100, suf: "%", label: "TypeScript Coverage" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "32px 28px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,.07)" : "none" }}>
                <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-.04em", marginBottom: 6, color: "#fff" }}>
                  <AnimatedCounter target={s.val} suffix={s.suf} />
                </div>
                <div style={{ fontSize: 11, color: "#475569", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div style={{ background: "var(--slate-50)", borderBottom: "1px solid var(--slate-200)", padding: "22px 0", overflow: "hidden" }}>
        <p style={{ textAlign: "center", fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".15em", fontWeight: 700, marginBottom: 14 }}>Adopted by teams at</p>
        <div className="marquee-track">
          <div className="marquee-inner">
            {[...Array(2)].flatMap((_, r) =>
              ["Vercel", "Stripe", "Linear", "Notion", "Loom", "Figma", "Raycast", "Planetscale", "Supabase", "Railway"].map(co => (
                <span key={`${co}-${r}`} style={{ padding: "6px 22px", borderRadius: 6, fontSize: 13, fontWeight: 700, color: "#94a3b8", whiteSpace: "nowrap", background: "#fff", border: "1px solid var(--slate-200)", flexShrink: 0 }}>{co}</span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <section ref={socialRef} id="testimonials" style={{ background: "#fff", padding: "96px 28px", borderTop: "1px solid var(--slate-200)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span {...an(socialIn)} className={`badge badge-blue ${an(socialIn).className}`} style={{ marginBottom: 16 }}>Client Feedback</span>
            <h2 {...an(socialIn, 100)} style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-.03em", marginBottom: 10 }}>Trusted by builders worldwide</h2>
            <p {...an(socialIn, 180)} style={{ color: "var(--text-muted)", fontSize: 17 }}>Verified feedback from development teams in production</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="grid-2">
            {testimonials.map((t, i) => <TestimonialCard key={i} t={t} delay={(i + 1) * 80} inView={socialIn} />)}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section ref={problemRef} style={{ background: "var(--slate-50)", padding: "96px 28px", borderTop: "1px solid var(--slate-200)" }}>
        <div className="container-sm">
          <p {...an(problemIn)} style={{ color: "var(--red)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".15em", marginBottom: 10 }}>Current Challenges</p>
          <h2 {...an(problemIn, 80)} style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-.03em", marginBottom: 48, lineHeight: 1.12 }}>Common inefficiencies that delay delivery.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { n: "01", title: "Redundant setup across every project", desc: "Each project requires rebuilding the same foundational infrastructure. Development time is spent on tooling before any real product work begins." },
              { n: "02", title: "Inconsistency slowing team velocity", desc: "Projects built at different times diverge in patterns. New team members struggle to orient, and technical debt compounds silently across codebases." },
              { n: "03", title: "Architectural decision paralysis", desc: "Uncertainty around TypeScript configs, testing frameworks, and state management patterns slows decision-making and delays meaningful development." },
              { n: "04", title: "Unreliable deployment pipelines", desc: "Moving from local development to production involves fragile scripts and environment-specific failures that erode team confidence." },
            ].map((item, i) => (
              <div key={i} {...an(problemIn, (i + 1) * 80)}
                className={`card card-sm ${an(problemIn, (i + 1) * 80).className}`}
                style={{ padding: "24px 28px", display: "flex", gap: 22, alignItems: "flex-start", borderLeft: "3px solid var(--slate-200)", borderRadius: 10 }}>
                <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: "var(--red)", flexShrink: 0, marginTop: 3 }}>{item.n}</span>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section ref={solutionRef} style={{ background: "#fff", padding: "96px 28px", borderTop: "1px solid var(--slate-200)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 500, height: 500, background: "radial-gradient(circle, rgba(26,79,214,.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container-sm" style={{ position: "relative", zIndex: 10 }}>
          <p {...an(solutionIn)} style={{ color: "var(--blue)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".15em", marginBottom: 10 }}>Our Solution</p>
          <h2 {...an(solutionIn, 80)} style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-.03em", marginBottom: 12, lineHeight: 1.12 }}>
            A complete engineering foundation.<br />
            <span className="gradient-text">Available immediately.</span>
          </h2>
          <p {...an(solutionIn, 160)} style={{ color: "var(--text-muted)", fontSize: 17, marginBottom: 48, maxWidth: 520, lineHeight: 1.7 }}>
            The foundational codebase organizations invest $50,000–$100,000 to build internally. Delivered for $16, with no recurring costs.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="grid-2">
            {[
              { icon: Icons.Zap, title: "Immediate Productivity", desc: "Production-ready code your team can extend from day one. No boilerplate configuration required.", color: "#0ea5e9" },
              { icon: Icons.Layers, title: "Enterprise Architecture", desc: "Structural patterns from leading engineering orgs. Engineered to scale from MVP to enterprise.", color: "#6366f1" },
              { icon: Icons.Code, title: "50+ UI Components", desc: "Accessible, thoroughly tested components covering all standard patterns. Ready for customization.", color: "#1a4fd6" },
              { icon: Icons.Lock, title: "Security by Design", desc: "TypeScript enforcement, dependency auditing, secure defaults, and auth best practices included.", color: "#10b981" },
            ].map((item, i) => {
              const I = item.icon;
              return (
                <div key={i} {...an(solutionIn, (i + 1) * 80)} className={`card ${an(solutionIn, (i + 1) * 80).className}`}
                  style={{ padding: "28px 26px", borderRadius: 12 }}>
                  <div className="icon-box" style={{ width: 40, height: 40, background: `${item.color}15`, border: `1px solid ${item.color}30`, marginBottom: 16 }}>
                    <I size={18} color={item.color} />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.75 }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section ref={featuresRef} id="features" style={{ background: "var(--slate-50)", padding: "96px 28px", borderTop: "1px solid var(--slate-200)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span {...an(featuresIn)} className={`badge badge-blue ${an(featuresIn).className}`} style={{ marginBottom: 16 }}>Platform Capabilities</span>
            <h2 {...an(featuresIn, 80)} style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-.03em" }}>Comprehensive tooling.<br />Nothing extraneous.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} className="grid-3">
            {features.map((f, i) => {
              const I = f.icon;
              return (
                <div key={i} {...an(featuresIn, i * 50)} className={`card ${an(featuresIn, i * 50).className}`}
                  style={{ padding: "26px 22px", borderRadius: 12 }}>
                  <div className="icon-box" style={{ width: 36, height: 36, background: `${f.color}15`, border: `1px solid ${f.color}25`, marginBottom: 14 }}>
                    <I size={16} color={f.color} />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 7 }}>{f.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.75 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DESIGN SYSTEM SHOWCASE ── */}
      <div ref={dsRef}>
        <DSShowcase inView={dsIn} />
      </div>

      {/* ── BENEFITS ── */}
      <section ref={benefitsRef} style={{ background: "#fff", padding: "96px 28px", borderTop: "1px solid var(--slate-200)" }}>
        <div className="container-sm">
          <p {...an(benefitsIn)} style={{ color: "var(--blue)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".15em", marginBottom: 10 }}>Business Value</p>
          <h2 {...an(benefitsIn, 80)} style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-.03em", marginBottom: 48 }}>Why engineering teams choose this</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="grid-2">
            {[
              { icon: Icons.Clock, t: "200+ hours saved per project", d: "Eliminate boilerplate. Your team focuses exclusively on features that deliver business value." },
              { icon: Icons.Shield, t: "Deploy with confidence", d: "Production-ready code means fewer defects, better performance, and consistent quality." },
              { icon: Icons.BarChart, t: "Accelerate team growth", d: "Professionally structured code serves as a reference architecture. Engineers level up building real products." },
              { icon: Icons.Users, t: "Growing community support", d: "Thousands of developers on a shared codebase. Faster resolution, shared learnings, collective ownership." },
              { icon: Icons.Code, t: "Complete ownership", d: "Full source code with no vendor lock-in. Your product roadmap remains entirely under your control." },
              { icon: Icons.Layers, t: "Architected for scale", d: "Structural foundations designed for long-term growth. Move from proof-of-concept to production without rewrites." },
            ].map((b, i) => {
              const I = b.icon;
              return (
                <div key={i} {...an(benefitsIn, i * 60)} className={`card ${an(benefitsIn, i * 60).className}`}
                  style={{ padding: "22px 20px", display: "flex", gap: 14, alignItems: "flex-start", borderRadius: 12 }}>
                  <div className="icon-box" style={{ width: 34, height: 34, background: "var(--blue-soft)", border: "1px solid var(--blue-mid)", flexShrink: 0 }}>
                    <I size={15} color="var(--blue)" />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 5 }}>{b.t}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.7 }}>{b.d}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section ref={audienceRef} style={{ background: "var(--slate-50)", padding: "96px 28px", borderTop: "1px solid var(--slate-200)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span {...an(audienceIn)} className={`badge badge-blue ${an(audienceIn).className}`} style={{ marginBottom: 16 }}>Use Cases</span>
            <h2 {...an(audienceIn, 80)} style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-.03em" }}>Designed for your context</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} className="grid-3">
            {[
              { icon: Icons.Terminal, r: "Independent Developers", w: "Deliver at the velocity of a full team. Compete effectively in any market with professional-grade output." },
              { icon: Icons.Users, r: "Freelance Consultants", w: "Reduce delivery time without sacrificing quality. Command appropriate rates. Increase project throughput." },
              { icon: Icons.Zap, r: "Early-Stage Startups", w: "Move with urgency without accumulating technical debt. Onboard new engineers in days, not weeks." },
              { icon: Icons.BarChart, r: "Digital Agencies", w: "Standardize across all client engagements. Reduce per-project overhead. Deliver consistent quality." },
              { icon: Icons.FileText, r: "Engineering Students", w: "Learn professional patterns from real-world codebases. Build a portfolio grounded in industry standards." },
              { icon: Icons.Layers, r: "Enterprise Teams", w: "Establish architectural standards. Reduce technical debt systematically. Onboard large teams at pace." },
            ].map((item, i) => {
              const I = item.icon;
              return (
                <div key={i} {...an(audienceIn, i * 70)} className={`card ${an(audienceIn, i * 70).className}`}
                  style={{ padding: "26px 22px", borderRadius: 12 }}>
                  <div className="icon-box" style={{ width: 36, height: 36, background: "var(--blue-soft)", border: "1px solid var(--blue-mid)", marginBottom: 14 }}>
                    <I size={16} color="var(--blue)" />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 7 }}>{item.r}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.75 }}>{item.w}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section ref={includedRef} style={{ background: "#fff", padding: "96px 28px", borderTop: "1px solid var(--slate-200)" }}>
        <div className="container-sm">
          <p {...an(includedIn)} style={{ color: "var(--blue)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".15em", marginBottom: 10 }}>Package Contents</p>
          <h2 {...an(includedIn, 80)} style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-.03em", marginBottom: 48 }}>Everything included. No exceptions.</h2>
          <div {...an(includedIn, 160)} className={`${an(includedIn, 160).className}`}
            style={{ borderRadius: 16, padding: "44px 48px", background: "var(--slate-50)", border: "1.5px solid var(--blue-mid)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-2">
              {[
                "Complete source code (MIT license)", "50+ production-ready UI components",
                "Responsive design system (Tailwind)", "Express backend with API routes",
                "Database integration patterns", "Authentication implementation examples",
                "Type-safe API layer setup", "Deployment configs for all major platforms",
                "Comprehensive technical documentation", "Video setup walkthrough",
                "Component customization reference", "All future version updates",
                "Slack community access (4,000+ devs)", "Email-based technical support",
                "Perpetual license — no subscription", "Commercial use on unlimited projects",
              ].map((item, i) => (
                <div key={i} {...an(includedIn, i * 20)} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--blue-soft)", border: "1px solid var(--blue-mid)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, color: "var(--blue)" }}>
                    <Icons.Check size={10} />
                  </div>
                  <span style={{ fontSize: 13, color: "#334155", fontWeight: 500, lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section ref={pricingRef} id="pricing" style={{ background: "var(--slate-50)", padding: "96px 28px", borderTop: "1px solid var(--slate-200)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(var(--blue-mid) 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: .25, pointerEvents: "none" }} />
        <div className="container-xs" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <span {...an(pricingIn)} className={`badge badge-blue ${an(pricingIn).className}`} style={{ marginBottom: 18 }}>Investment</span>
          <h2 {...an(pricingIn, 80)} style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-.03em", marginBottom: 10 }}>
            A one-time investment.<br />Permanent access.
          </h2>
          <p {...an(pricingIn, 160)} style={{ color: "var(--text-muted)", fontSize: 17, marginBottom: 44 }}>No subscriptions. No licensing tiers. No surprises.</p>
          <div {...an(pricingIn, 240)} className={`card ${an(pricingIn, 240).className}`}
            style={{ borderRadius: 20, padding: "48px 44px", border: "2px solid var(--blue)", boxShadow: "var(--shadow-blue), var(--shadow-lg)" }}>
            {/* Recommended badge */}
            <div style={{ marginBottom: 28 }}>
              <span className="pricing-badge">Most Popular</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ color: "var(--slate)", fontSize: 22, fontWeight: 500, textDecoration: "line-through", marginBottom: 12 }}>$99</span>
              <span style={{ fontSize: 96, fontWeight: 900, lineHeight: 1, letterSpacing: "-.05em" }}>$16</span>
            </div>
            <p style={{ color: "var(--slate)", marginBottom: 36, fontSize: 14 }}>One-time payment · Unlimited projects · Perpetual access</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 13, marginBottom: 36, textAlign: "left" }}>
              {[
                "Immediate download upon payment",
                "No recurring subscription fees",
                "Unrestricted commercial use",
                "30-day money-back guarantee",
                "Lifetime access to updates",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--blue-soft)", border: "1px solid var(--blue-mid)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--blue)" }}>
                    <Icons.Check size={11} />
                  </div>
                  <span style={{ fontSize: 14, color: "#334155", fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary btn-primary-lg" style={{ width: "100%", marginBottom: 14, justifyContent: "center", borderRadius: 12 }}>
              Get Instant Access <Icons.ArrowRight size={17} />
            </button>
            <p style={{ color: "var(--slate)", fontSize: 12 }}>Secure checkout · Immediate delivery · No recurring charges</p>
          </div>

          {/* Comparison */}
          <div {...an(pricingIn, 360)} className={`${an(pricingIn, 360).className}`} style={{ marginTop: 32 }}>
            <div className="card" style={{ padding: 0, overflow: "hidden", textAlign: "left" }}>
              <table className="table" style={{ fontSize: 13 }}>
                <thead>
                  <tr>
                    <th>What you're getting</th>
                    <th>Build yourself</th>
                    <th style={{ color: "var(--blue)" }}>DevKit Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Setup time", "2–4 weeks", "5 minutes"],
                    ["TypeScript config", "Manual", "Included"],
                    ["Component library", "$0 + 200h", "Included"],
                    ["Testing setup", "$0 + 40h", "Included"],
                    ["Documentation", "Write yourself", "Complete"],
                    ["Total cost", "$5,000–$15,000", "$16 one-time"],
                  ].map(([label, bad, good]) => (
                    <tr key={label}>
                      <td style={{ fontWeight: 600 }}>{label}</td>
                      <td style={{ color: "var(--red)" }}>{bad}</td>
                      <td style={{ color: "var(--blue)", fontWeight: 600 }}>{good}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section ref={faqRef} id="faq" style={{ background: "#fff", padding: "96px 28px", borderTop: "1px solid var(--slate-200)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p {...an(faqIn)} style={{ color: "var(--blue)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".15em", marginBottom: 10 }}>FAQ</p>
          <h2 {...an(faqIn, 80)} style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-.03em", marginBottom: 48 }}>Common questions, answered.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} idx={i} expanded={expandedFAQ === i} onToggle={setExpandedFAQ} inView={faqIn} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section ref={ctaRef} style={{ position: "relative", padding: "112px 28px", background: "var(--navy)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(26,79,214,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(26,79,214,.1) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
        <div className="shape-blob" style={{ width: 600, height: 600, background: "var(--blue)", top: -200, left: "50%", transform: "translateX(-50%)", opacity: .07 }} />
        <div className="container-xs" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <span {...an(ctaIn)} className={`badge ${an(ctaIn).className}`}
            style={{ marginBottom: 28, background: "rgba(239,246,255,.07)", border: "1px solid rgba(191,219,254,.15)", color: "#93c5fd" }}>
            <Icons.Sparkles size={10} /> Join 2,500+ development teams already shipping faster
          </span>
          <h2 {...an(ctaIn, 80)} style={{ fontSize: 56, fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.08, marginBottom: 20, color: "#f8fafc" }}>
            Eliminate boilerplate.<br />
            <span style={{ color: "#60a5fa" }}>Deliver with confidence.</span>
          </h2>
          <p {...an(ctaIn, 160)} style={{ color: "#64748b", fontSize: 18, marginBottom: 44, lineHeight: 1.7 }}>
            Your next project deserves a proper technical foundation. Reduce delivery time, increase quality, and build with clarity.
          </p>
          <div {...an(ctaIn, 240)} style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
            <a href="#pricing" className="btn btn-white btn-primary-lg">
              Get Instant Access — $16 <Icons.ArrowRight size={17} />
            </a>
            <button className="btn btn-primary-lg" style={{ background: "rgba(255,255,255,.08)", color: "#fff", border: "1px solid rgba(255,255,255,.15)", borderRadius: "var(--radius-lg)", padding: "15px 28px" }}>
              <Icons.Play size={15} /> Watch Demo
            </button>
          </div>
          <p {...an(ctaIn, 320)} style={{ color: "#475569", fontSize: 13 }}>
            30-day guarantee · Immediate download · Perpetual license · No subscription
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#050c18", borderTop: "1px solid rgba(255,255,255,.05)", padding: "56px 28px 32px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <img src="/logodev2.png" />
                </div>
                <span style={{ fontWeight: 800, fontSize: 15, color: "#fff" }}>DevKit Pro</span>
              </div>
              <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.7, maxWidth: 240, marginBottom: 20 }}>
                A production-ready starter kit for development teams that ship fast.
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                {[Icons.Github, Icons.Twitter, Icons.Mail].map((I, i) => (
                  <button key={i} className="btn btn-icon-sm" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", color: "#64748b", borderRadius: 8, padding: 8, cursor: "pointer" }}>
                    <I size={15} />
                  </button>
                ))}
              </div>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
              { title: "Resources", links: ["Documentation", "Examples", "Templates", "Blog"] },
              { title: "Company", links: ["About", "Privacy Policy", "Terms of Use", "Support"] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontWeight: 700, fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 16 }}>{col.title}</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map(l => (
                    <a key={l} href="#" style={{ color: "#334155", fontSize: 13, textDecoration: "none", transition: "color .2s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8"}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#334155"}>{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="divider" style={{ borderColor: "rgba(255,255,255,.05)", marginBottom: 24 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ color: "#334155", fontSize: 12 }}>© 2025 DevKit Pro. All rights reserved.</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span className="badge badge-green" style={{ fontSize: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block", marginRight: 4, animation: "pulse 2s ease infinite" }} />
                All systems operational
              </span>
              <span className="badge badge-slate" style={{ fontSize: 10 }}>v3.2.1</span>
              <span className="badge badge-slate" style={{ fontSize: 10 }}>MIT License</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}