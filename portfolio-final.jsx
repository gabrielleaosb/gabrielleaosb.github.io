// Final version — V3 Editorial + Terminal overlay easter egg + redesigned Projects section
// Press ` or Ctrl+K to open terminal overlay anywhere

const THEMES = {
  dark: {
    bg: "#0e0e0f", bg2: "#141416", text: "#ededed", muted: "#7a7a7a",
    hair: "rgba(255,255,255,0.08)", hair2: "rgba(255,255,255,0.14)",
    accent: "#f5f5f0", dim: "#9a9a9a",
    chipBg: "rgba(255,255,255,0.04)", chipBd: "rgba(255,255,255,0.12)",
    cardBg: "rgba(255,255,255,0.02)", hoverBg: "rgba(255,255,255,0.04)",
    termBg: "#0a0a0b",
  },
  light: {
    bg: "#f6f5f1", bg2: "#efeee9", text: "#0f0f0f", muted: "#6b6b6b",
    hair: "rgba(0,0,0,0.1)", hair2: "rgba(0,0,0,0.18)",
    accent: "#0a0a0a", dim: "#5a5a5a",
    chipBg: "rgba(0,0,0,0.03)", chipBd: "rgba(0,0,0,0.14)",
    cardBg: "rgba(0,0,0,0.015)", hoverBg: "rgba(0,0,0,0.035)",
    termBg: "#f2f0ea",
  }
};

// =================================================================
// Terminal Overlay (easter egg — activated by ` or Ctrl+K)
// =================================================================
function TerminalOverlay({ theme, lang, onClose, onToggleTheme, onToggleLang, onNav }) {
  const T = THEMES[theme];
  const t = I18N[lang];
  const P = PORTFOLIO;
  const [input, setInput] = React.useState("");
  const [history, setHistory] = React.useState([]);
  const [cmdH, setCmdH] = React.useState([]);
  const [hIdx, setHIdx] = React.useState(-1);
  const inputRef = React.useRef(null);
  const scrollRef = React.useRef(null);

  const prompt = `${P.handle}@portfolio:~$`;

  React.useEffect(() => {
    inputRef.current?.focus();
    setHistory([{ type: "out", lines: [
      ``,
      `◦ ${P.name} — ${lang === "pt" ? P.role_pt : P.role_en}`,
      `◦ ${lang === "pt" ? "Terminal interativo. Digite" : "Interactive terminal. Type"} 'help' ${lang === "pt" ? "ou" : "or"} 'ls'.`,
      `◦ ESC ${lang === "pt" ? "para fechar" : "to close"}.`,
      ``,
    ]}]);
  }, [lang]);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const commands = {
    help: () => [
      `${lang === "pt" ? "Comandos" : "Commands"}:`,
      ``,
      `  about, skills, projects, exp, edu, contact`,
      `  ls          ${lang === "pt" ? "listar seções" : "list sections"}`,
      `  goto <sec>  ${lang === "pt" ? "navegar até seção" : "scroll to section"}`,
      `  open <id>   ${lang === "pt" ? "abrir projeto" : "open project"}`,
      `  whoami      ${lang === "pt" ? "quem sou" : "who am I"}`,
      `  theme       ${lang === "pt" ? "alternar tema" : "toggle theme"}`,
      `  lang        ${lang === "pt" ? "alternar idioma" : "toggle language"}`,
      `  sudo        ${lang === "pt" ? "tente" : "try it"}`,
      `  clear       ${lang === "pt" ? "limpar" : "clear"}`,
      `  exit        ${lang === "pt" ? "fechar terminal" : "close terminal"}`,
      ``,
    ],
    ls: () => [`about  skills  projects  exp  edu  contact`, ``],
    whoami: () => [`${P.name} — ${lang === "pt" ? P.role_pt : P.role_en}`, `◦ ${lang === "pt" ? P.location_pt : P.location_en}`, `◦ ${lang === "pt" ? P.status_pt : P.status_en}`, ``],
    about: () => [
      ``,
      ...(lang === "pt" ? P.about_pt : P.about_en).flatMap(p => [p, ``]),
    ],
    skills: () => {
      const out = [``];
      P.skills.forEach(g => out.push(`  ${g.group.padEnd(12)} ${g.items.join(" · ")}`));
      out.push(``);
      return out;
    },
    projects: () => {
      const out = [``];
      P.projects.forEach((p, i) => {
        const badge = p.status === "wip" ? `⟡ ${t.in_dev}` : `● ${t.view_live}`;
        out.push(`  ${String(i+1).padStart(2, "0")}. ${p.name.padEnd(22)} ${p.year}  ${badge}`);
        out.push(`      ${lang === "pt" ? p.tagline_pt : p.tagline_en}`);
        out.push(``);
      });
      return out;
    },
    exp: () => {
      const out = [``];
      P.experience.forEach(e => {
        out.push(`  [${lang === "pt" ? e.period : e.period_en}] ${lang === "pt" ? e.role_pt : e.role_en}  @  ${e.company}`);
        out.push(`  ${lang === "pt" ? e.desc_pt : e.desc_en}`);
        out.push(``);
      });
      return out;
    },
    edu: () => {
      const out = [``];
      P.education.forEach(e => {
        out.push(`  ${e.title}`);
        out.push(`  ${e.sub} · ${e.period}`);
        out.push(``);
      });
      out.push(`  ${t.courses}:`);
      P.courses.forEach(c => out.push(`    · ${c.name} (${c.platform})`));
      out.push(``);
      return out;
    },
    contact: () => [
      ``,
      `  email      ${P.email}`,
      `  github     ${P.github}`,
      `  linkedin   ${P.linkedin}`,
      ``,
    ],
    theme: () => { onToggleTheme(); return [`» theme → ${theme === "dark" ? "light" : "dark"}`, ``]; },
    lang: () => { onToggleLang(); return [`» lang → ${lang === "pt" ? "en" : "pt"}`, ``]; },
    clear: () => { setHistory([]); return null; },
    exit: () => { onClose(); return null; },
    sudo: () => [`${lang === "pt" ? "você não está no sudoers. este incidente será reportado." : "you are not in the sudoers file. this incident will be reported."}`, ``],
    "sudo rm -rf /": () => [`nice try ☺`, ``],
    "hello": () => [`${lang === "pt" ? "oi! 👋" : "hey there! 👋"}`, ``],
    "hi": () => [`${lang === "pt" ? "oi! 👋" : "hey there! 👋"}`, ``],
    "date": () => [new Date().toString(), ``],
    "echo": () => [``],
  };

  const runCmd = (raw) => {
    const full = raw.trim();
    setHistory(h => [...h, { type: "input", text: raw }]);
    if (!full) return;
    setCmdH(ch => [...ch, full]);
    setHIdx(-1);

    const lower = full.toLowerCase();
    const [verb, ...rest] = lower.split(/\s+/);

    // goto / open sub-commands
    if (verb === "goto" && rest[0]) {
      const sec = rest[0];
      const valid = ["about", "skills", "projects", "exp", "edu", "contact"];
      if (valid.includes(sec)) {
        onNav(sec);
        setHistory(h => [...h, { type: "out", lines: [`→ ${sec}`, ``] }]);
        return;
      }
      setHistory(h => [...h, { type: "out", lines: [`${lang === "pt" ? "seção inválida" : "invalid section"}: ${sec}`, ``] }]);
      return;
    }
    if (verb === "open" && rest[0]) {
      const proj = P.projects.find(p => p.id === rest[0] || p.name.toLowerCase().includes(rest[0]));
      if (proj) {
        if (proj.link) window.open(proj.link, "_blank");
        setHistory(h => [...h, { type: "out", lines: [proj.link ? `→ ${proj.link}` : `${lang === "pt" ? "sem link ainda" : "no link yet"}`, ``] }]);
        return;
      }
      setHistory(h => [...h, { type: "out", lines: [`${lang === "pt" ? "projeto não encontrado" : "project not found"}: ${rest[0]}`, ``] }]);
      return;
    }

    const fn = commands[lower] || commands[verb];
    if (!fn) {
      setHistory(h => [...h, { type: "out", lines: [`${lang === "pt" ? "comando não encontrado" : "command not found"}: ${verb}`, `${lang === "pt" ? "digite" : "type"} 'help'`, ``] }]);
      return;
    }
    const out = fn();
    if (out === null) return;
    setHistory(h => [...h, { type: "out", lines: out }]);
  };

  const onKey = (e) => {
    if (e.key === "Enter") { runCmd(input); setInput(""); }
    else if (e.key === "Escape") { onClose(); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdH.length) {
        const ni = hIdx === -1 ? cmdH.length - 1 : Math.max(0, hIdx - 1);
        setHIdx(ni); setInput(cmdH[ni]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx !== -1) {
        const ni = hIdx + 1;
        if (ni >= cmdH.length) { setHIdx(-1); setInput(""); }
        else { setHIdx(ni); setInput(cmdH[ni]); }
      }
    } else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); runCmd("clear"); }
  };

  const s = {
    backdrop: {
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, animation: "glitchIn 0.25s ease"
    },
    term: {
      width: "min(820px, 100%)", maxHeight: "min(580px, 90vh)",
      background: T.termBg, color: T.text, border: `1px solid ${T.hair2}`,
      display: "flex", flexDirection: "column", overflow: "hidden",
      boxShadow: theme === "dark" ? "0 30px 80px rgba(0,0,0,0.6)" : "0 30px 80px rgba(0,0,0,0.15)",
      fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.65,
    },
    termHead: {
      padding: "10px 14px", borderBottom: `1px solid ${T.hair}`,
      display: "flex", alignItems: "center", gap: 10, fontSize: 11, color: T.muted,
    },
    dots: { display: "flex", gap: 6 },
    dot: (c) => ({ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.9 }),
    termBody: { flex: 1, overflowY: "auto", padding: "16px 20px", minHeight: 0 },
    line: { whiteSpace: "pre-wrap", wordBreak: "break-word" },
    termInput: {
      display: "flex", gap: 8, alignItems: "center", padding: "12px 20px",
      borderTop: `1px solid ${T.hair}`,
    },
    input: { flex: 1, background: "transparent", border: "none", outline: "none",
      color: T.text, fontFamily: "inherit", fontSize: 13 },
    cursor: { display: "inline-block", width: 7, height: 14, background: T.text,
      verticalAlign: "middle", animation: "blink 1s step-end infinite" },
  };

  return (
    <div style={s.backdrop} onClick={onClose}>
      <div style={s.term} onClick={(e) => e.stopPropagation()}>
        <div style={s.termHead}>
          <div style={s.dots}>
            <span style={s.dot("#ff5f56")} onClick={onClose}></span>
            <span style={s.dot("#ffbd2e")}></span>
            <span style={s.dot("#27c93f")}></span>
          </div>
          <div style={{ flex: 1, textAlign: "center", letterSpacing: 1 }}>
            {P.handle}@portfolio — zsh
          </div>
          <div style={{ fontSize: 10, color: T.muted, letterSpacing: 1 }}>ESC ✕</div>
        </div>
        <div style={s.termBody} ref={scrollRef}>
          {history.map((h, i) => {
            if (h.type === "input") return (
              <div key={i} style={s.line}>
                <span style={{ color: T.muted }}>{prompt}</span>{" "}
                <span>{h.text}</span>
              </div>
            );
            return h.lines.map((l, j) => (
              <div key={`${i}-${j}`} style={s.line}>{l || "\u00A0"}</div>
            ));
          })}
        </div>
        <div style={s.termInput}>
          <span style={{ color: T.muted }}>{prompt}</span>
          <input ref={inputRef} style={s.input} value={input}
            onChange={(e) => setInput(e.target.value)} onKeyDown={onKey}
            spellCheck={false} autoFocus />
          <span style={s.cursor}></span>
        </div>
      </div>
    </div>
  );
}

// =================================================================
// Project Card (redesigned — rich hover with ASCII preview)
// =================================================================
function ProjectCard({ p, idx, lang, T, theme, t, onOpenTerm }) {
  const [hover, setHover] = React.useState(false);

  // ASCII-ish visual per project type
  const visuals = {
    "crp-al": ["╭──────────────────────╮", "│  institutional.site  │", "│  · psicologia        │", "│  · alagoas / brasil  │", "│  · in progress...    │", "╰──────────────────────╯"],
    "menu":   ["╭──────────────────────╮", "│  $ ./menu --start    │", "│  > appetizers   [12] │", "│  > mains        [24] │", "│  > desserts     [08] │", "│  > order via whatsapp│", "╰──────────────────────╯"],
    "dice":   ["       ┌───┐   ┌───┐", "       │ ⚄ │   │ ⚅ │", "       └───┘   └───┘", "   roll d20: 17 + 3", "   → crit near-miss ✓"],
    "ai-analysis": ["  import pandas as pd", "  from openai import *", "", "  df = read_csv(...)", "  insight = gpt(df)", "  → plot.show()"],
    "discord-bot": ["  > /ping",  "  ← pong 42ms", "  > /play lofi", "  ← ♪ now playing...", "  > /moderate @user", "  ← ✓ action logged"],
    "rpg-sheet": ["  ┌─ character ─────┐", "  │ name:  aranel   │", "  │ class: ranger   │", "  │ hp:    34/40    │", "  │ ac:    16       │", "  └─────────────────┘"],
  };
  const art = visuals[p.id] || visuals["menu"];

  const s = {
    card: {
      position: "relative",
      border: `1px solid ${hover ? T.hair2 : T.hair}`,
      background: hover ? T.cardBg : "transparent",
      padding: "24px 28px",
      display: "grid",
      gridTemplateColumns: "48px 1fr 240px",
      gap: 24,
      alignItems: "stretch",
      transition: "border-color 0.2s, background 0.2s",
      marginBottom: -1, // collapse borders
      cursor: p.link ? "pointer" : "default",
      overflow: "hidden",
    },
    num: {
      fontSize: 11, color: T.muted, letterSpacing: 2, paddingTop: 4,
      display: "flex", flexDirection: "column", gap: 8,
    },
    numBig: { fontSize: 24, color: T.accent, fontWeight: 500, letterSpacing: 0 },
    main: { display: "flex", flexDirection: "column", gap: 10, minWidth: 0 },
    titleRow: { display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" },
    name: { fontSize: 22, fontWeight: 500, color: T.accent, letterSpacing: "-0.01em",
      fontFamily: "'Geist Mono', 'JetBrains Mono', monospace" },
    yearInline: { fontSize: 11, color: T.muted, letterSpacing: 2 },
    statusBadge: (wip) => ({
      display: "inline-flex", alignItems: "center", gap: 6,
      fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase",
      padding: "3px 9px", border: `1px solid ${T.chipBd}`,
      color: wip ? T.muted : T.accent,
    }),
    statusDot: (wip) => ({
      width: 5, height: 5, borderRadius: "50%",
      background: wip ? T.muted : T.accent,
      animation: wip ? "blink 1.4s ease-in-out infinite" : "none",
    }),
    tag: { fontSize: 12.5, color: T.muted, lineHeight: 1.65, marginTop: 2,
      maxWidth: 520 },
    tagsRow: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 },
    tag2: { fontSize: 10.5, color: T.muted, padding: "3px 8px",
      border: `1px solid ${T.chipBd}`, background: T.chipBg, letterSpacing: 0.5 },
    preview: {
      background: T.bg2,
      border: `1px solid ${T.hair}`,
      padding: "12px 14px",
      fontSize: 10.5, lineHeight: 1.55, color: T.muted,
      fontFamily: "'JetBrains Mono', monospace",
      whiteSpace: "pre", overflow: "hidden",
      position: "relative",
      transition: "border-color 0.2s, color 0.2s",
      ...(hover ? { borderColor: T.hair2, color: T.text } : {}),
    },
    previewScan: {
      position: "absolute", left: 0, right: 0, height: "40%",
      background: `linear-gradient(to bottom, transparent, ${theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"}, transparent)`,
      animation: "scan 3s linear infinite",
      pointerEvents: "none",
    },
    actions: { display: "flex", gap: 10, marginTop: 10, fontSize: 11,
      color: T.muted, letterSpacing: 1.5, textTransform: "uppercase" },
    action: { cursor: "pointer", borderBottom: `1px dashed ${T.chipBd}`,
      paddingBottom: 1, transition: "color 0.2s, border-color 0.2s" },
    arrow: {
      position: "absolute", right: 12, top: 12,
      fontSize: 18, color: hover ? T.accent : T.muted,
      transition: "transform 0.25s, color 0.2s",
      transform: hover ? "translate(2px, -2px)" : "translate(0, 0)",
    },
  };

  const wip = p.status === "wip";

  return (
    <div style={s.card}
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
         onClick={() => p.link && window.open(p.link, "_blank")}>
      <div style={s.num}>
        <span style={s.numBig}>{String(idx+1).padStart(2, "0")}</span>
        <span>/{String(PORTFOLIO.projects.length).padStart(2, "0")}</span>
      </div>
      <div style={s.main}>
        <div style={s.titleRow}>
          <span style={s.name}>{p.name}</span>
          <span style={s.yearInline}>{p.year}</span>
          <span style={s.statusBadge(wip)}>
            <span style={s.statusDot(wip)}></span>
            {wip ? t.in_dev : t.view_live}
          </span>
        </div>
        <div style={s.tag}>{lang === "pt" ? p.tagline_pt : p.tagline_en}</div>
        <div style={{ fontSize: 12, color: T.dim, lineHeight: 1.65, maxWidth: 520 }}>
          {lang === "pt" ? p.desc_pt : p.desc_en}
        </div>
        <div style={s.tagsRow}>
          {p.tags.map((tg, i) => <span key={i} style={s.tag2}>{tg}</span>)}
        </div>
        <div style={s.actions}>
          {p.link && (
            <span style={{...s.action, color: hover ? T.accent : T.muted}}>
              {t.view_live} ↗
            </span>
          )}
          <span style={s.action}
                onClick={(e) => { e.stopPropagation(); onOpenTerm(`open ${p.id}`); }}>
            $ open {p.id}
          </span>
        </div>
      </div>
      <div style={s.preview}>
        <div style={s.previewScan}></div>
        {art.join("\n")}
      </div>
      <span style={s.arrow}>↗</span>
    </div>
  );
}

// =================================================================
// Main Portfolio
// =================================================================
function Portfolio() {
  const [theme, setTheme] = React.useState("dark");
  const [lang, setLang] = React.useState("pt");
  const [termOpen, setTermOpen] = React.useState(false);
  const [now, setNow] = React.useState(new Date());
  const scrollRef = React.useRef(null);

  const T = THEMES[theme];
  const t = I18N[lang];
  const P = PORTFOLIO;

  // sync html class for scrollbar
  React.useEffect(() => {
    document.documentElement.classList.toggle("light-theme", theme === "light");
  }, [theme]);

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // global keybinds
  React.useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault(); setTermOpen(true);
      } else if (e.key === "`" && !termOpen) {
        if (document.activeElement && ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
        e.preventDefault(); setTermOpen(true);
      } else if (e.key === "Escape" && termOpen) {
        setTermOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [termOpen]);

  const toggleTheme = () => setTheme(x => x === "dark" ? "light" : "dark");
  const toggleLang = () => setLang(x => x === "pt" ? "en" : "pt");

  const scrollTo = (id) => {
    const el = scrollRef.current?.querySelector(`[data-sec="${id}"]`);
    if (el && scrollRef.current) {
      scrollRef.current.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
    }
  };

  const navFromTerm = (sec) => { scrollTo(sec); setTermOpen(false); };
  const openTermWithCmd = (cmd) => { setTermOpen(true); /* cmd hint — not pre-filled, user sees how */ };

  const clock = now.toLocaleTimeString(lang === "pt" ? "pt-BR" : "en-US", { hour12: false });

  const s = {
    root: {
      minHeight: "100vh", background: T.bg, color: T.text,
      fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace",
      fontSize: 13.5, lineHeight: 1.7,
      display: "flex", flexDirection: "column",
      transition: "background 0.3s, color 0.3s",
    },
    // Top bar
    top: {
      position: "sticky", top: 0, zIndex: 20,
      padding: "12px 32px", borderBottom: `1px solid ${T.hair}`,
      display: "flex", alignItems: "center", gap: 16, fontSize: 11, color: T.muted,
      letterSpacing: 1, textTransform: "uppercase", background: T.bg,
      backdropFilter: "blur(12px)",
    },
    brand: { color: T.text, letterSpacing: 1.5 },
    navLinks: { display: "flex", gap: 22, marginLeft: "auto", marginRight: 18 },
    navLink: { cursor: "pointer", color: T.muted, transition: "color 0.15s" },
    chips: { display: "flex", gap: 6, alignItems: "center" },
    chip: { padding: "4px 10px", border: `1px solid ${T.chipBd}`, cursor: "pointer",
      fontSize: 10, color: T.text, background: T.chipBg, letterSpacing: 1 },
    termHint: {
      padding: "4px 10px", border: `1px solid ${T.chipBd}`, cursor: "pointer",
      fontSize: 10, color: T.muted, background: "transparent",
      display: "flex", alignItems: "center", gap: 8, letterSpacing: 1,
    },
    kbd: {
      padding: "1px 5px", border: `1px solid ${T.chipBd}`,
      fontSize: 9, color: T.text, background: T.chipBg,
    },

    // Hero
    scroll: { flex: 1, overflowY: "auto", minHeight: 0 },
    inner: { maxWidth: 1040, margin: "0 auto", padding: "72px 32px 120px" },
    hero: { borderBottom: `1px solid ${T.hair}`, paddingBottom: 64, marginBottom: 72 },
    heroMeta: { display: "flex", gap: 18, fontSize: 11, color: T.muted,
      textTransform: "uppercase", letterSpacing: 2, marginBottom: 40, alignItems: "center" },
    heroHello: { fontSize: 12, color: T.muted, letterSpacing: 2,
      textTransform: "uppercase", marginBottom: 24 },
    heroName: {
      fontSize: "clamp(48px, 8.5vw, 104px)", fontWeight: 500, lineHeight: 1,
      letterSpacing: "-0.035em", color: T.accent, marginBottom: 28,
      fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
    },
    heroRole: {
      fontSize: "clamp(18px, 2.2vw, 24px)", color: T.muted,
      marginBottom: 40, fontWeight: 400, letterSpacing: "-0.01em",
    },
    heroRoleHL: { color: T.text },
    heroDesc: { fontSize: 14.5, lineHeight: 1.85, color: T.text, maxWidth: 640, marginBottom: 36 },
    heroCtaRow: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" },
    heroCta: {
      padding: "12px 22px", border: `1px solid ${T.accent}`, color: T.bg,
      background: T.accent, fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
      cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.2s",
    },
    heroCta2: {
      padding: "12px 22px", border: `1px solid ${T.chipBd}`, color: T.text,
      fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
      cursor: "pointer", background: "transparent", fontFamily: "inherit",
    },
    heroStatus: { display: "inline-flex", alignItems: "center", gap: 10, fontSize: 11,
      color: T.muted, letterSpacing: 2, textTransform: "uppercase" },
    statusDot: { width: 7, height: 7, borderRadius: "50%", background: T.accent,
      animation: "blink 2s ease-in-out infinite" },

    // Sections
    section: { marginBottom: 96, paddingTop: 8 },
    secLabel: { fontSize: 10, color: T.muted, letterSpacing: 3, textTransform: "uppercase",
      marginBottom: 16, display: "flex", alignItems: "center", gap: 14 },
    secLabelNum: { color: T.accent },
    secLine: { flex: 1, height: 1, background: T.hair },
    secTitle: { fontSize: "clamp(28px, 3.6vw, 38px)", fontWeight: 500,
      color: T.accent, marginBottom: 40, letterSpacing: "-0.02em",
      fontFamily: "'Geist Mono', 'JetBrains Mono', monospace" },

    // About
    aboutGrid: { display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 52 },
    aboutPara: { fontSize: 14.5, lineHeight: 1.85, marginBottom: 20, color: T.text },
    infoBox: { border: `1px solid ${T.hair}`, background: T.cardBg },
    infoRow: { display: "grid", gridTemplateColumns: "110px 1fr", padding: "14px 18px",
      borderBottom: `1px solid ${T.hair}`, fontSize: 13 },
    infoKey: { color: T.muted, textTransform: "uppercase", fontSize: 10.5, letterSpacing: 1.5 },
    infoVal: { color: T.text, wordBreak: "break-word" },

    // Skills
    skillRow: { display: "grid", gridTemplateColumns: "150px 1fr", gap: 24, padding: "20px 0",
      borderBottom: `1px solid ${T.hair}`, alignItems: "start" },
    skillGroup: { color: T.muted, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, paddingTop: 4 },
    skillItems: { display: "flex", flexWrap: "wrap", gap: 8 },
    skillChip: { padding: "5px 11px", border: `1px solid ${T.chipBd}`, fontSize: 12,
      color: T.text, background: T.chipBg },

    // Projects (redesigned: featured + list)
    projectsHeader: { display: "flex", justifyContent: "space-between", alignItems: "baseline",
      marginBottom: 32, flexWrap: "wrap", gap: 12 },
    projectsHint: { fontSize: 11, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase" },
    projList: { border: `1px solid ${T.hair}`, borderBottom: "none" },

    // Experience
    expRow: { display: "grid", gridTemplateColumns: "170px 1fr", gap: 24, padding: "22px 0",
      borderBottom: `1px solid ${T.hair}`, alignItems: "start" },
    expPeriod: { fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: 1.5, paddingTop: 4 },
    expRole: { fontSize: 16, color: T.accent, marginBottom: 6, letterSpacing: "-0.01em" },
    expCompany: { color: T.muted },
    expDesc: { fontSize: 13, color: T.muted, lineHeight: 1.75, maxWidth: 580 },

    // Education
    eduGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 },
    eduLabel: { fontSize: 10, color: T.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 },
    eduItem: { padding: "14px 0", borderBottom: `1px solid ${T.hair}` },
    eduTitle: { fontSize: 14, color: T.text, marginBottom: 3 },
    eduSub: { fontSize: 11.5, color: T.muted },

    // Contact
    contactBox: { border: `1px solid ${T.hair}`, background: T.cardBg, padding: 32 },
    contactRow: { display: "flex", gap: 16, padding: "14px 0",
      borderBottom: `1px solid ${T.hair}`, alignItems: "baseline" },
    contactKey: { color: T.muted, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, width: 110 },
    contactVal: { color: T.text, fontSize: 14 },

    // Footer
    footer: { marginTop: 96, paddingTop: 32, borderTop: `1px solid ${T.hair}`,
      fontSize: 11, color: T.muted, letterSpacing: 1.5, display: "flex",
      justifyContent: "space-between", flexWrap: "wrap", gap: 20 },
  };

  const projectsHintText = lang === "pt"
    ? "Pressione ` ou Ctrl+K para abrir o terminal"
    : "Press ` or Ctrl+K to open the terminal";

  return (
    <div style={s.root}>
      {/* Top Nav */}
      <div style={s.top}>
        <span style={s.brand}>{P.handle}</span>
        <span style={{ color: T.dim }}>//</span>
        <span>{clock}</span>
        <div style={s.navLinks}>
          <span style={s.navLink} onClick={() => scrollTo("about")}>{t.nav_about}</span>
          <span style={s.navLink} onClick={() => scrollTo("skills")}>{t.nav_skills}</span>
          <span style={s.navLink} onClick={() => scrollTo("projects")}>{t.nav_projects}</span>
          <span style={s.navLink} onClick={() => scrollTo("exp")}>{t.nav_exp}</span>
          <span style={s.navLink} onClick={() => scrollTo("edu")}>{t.nav_edu}</span>
          <span style={s.navLink} onClick={() => scrollTo("contact")}>{t.nav_contact}</span>
        </div>
        <div style={s.chips}>
          <span style={s.termHint} onClick={() => setTermOpen(true)}>
            <span style={{ opacity: 0.6 }}>❯_</span>
            <span style={s.kbd}>⌘K</span>
          </span>
          <span style={s.chip} onClick={toggleLang}>{lang.toUpperCase()}</span>
          <span style={s.chip} onClick={toggleTheme}>{theme === "dark" ? "☾" : "☀"}</span>
        </div>
      </div>

      {/* Content */}
      <div style={s.scroll} ref={scrollRef}>
        <div style={s.inner}>
          {/* Hero */}
          <div style={s.hero}>
            <div style={s.heroMeta}>
              <span>portfolio — 2026</span>
              <span style={{ color: T.dim }}>/</span>
              <span>{lang === "pt" ? P.location_pt : P.location_en}</span>
              <span style={{ color: T.dim }}>/</span>
              <span>v1.0</span>
            </div>
            <div style={s.heroHello}>{t.hello}</div>
            <div style={s.heroName}>{P.name}.</div>
            <div style={s.heroRole}>
              <span style={s.heroRoleHL}>{lang === "pt" ? P.role_pt : P.role_en}</span>
              <span style={{ color: T.dim }}> — {t.intro_role}</span>
            </div>
            <div style={s.heroDesc}>
              {lang === "pt" ? P.hero_desc_pt : P.hero_desc_en}
            </div>
            <div style={s.heroCtaRow}>
              <button style={s.heroCta} onClick={() => scrollTo("projects")}>
                {t.cta_primary} →
              </button>
              <button style={s.heroCta2} onClick={() => scrollTo("contact")}>
                {t.cta_secondary}
              </button>
              <span style={{...s.heroStatus, marginLeft: 12}}>
                <span style={s.statusDot}></span>
                <span>{lang === "pt" ? P.status_pt : P.status_en}</span>
              </span>
            </div>
          </div>

          {/* About */}
          <div style={s.section} data-sec="about">
            <div style={s.secLabel}>
              <span style={s.secLabelNum}>01</span>
              <span>— {t.about_title}</span>
              <span style={s.secLine}></span>
            </div>
            <div style={s.aboutGrid}>
              <div>
                {(lang === "pt" ? P.about_pt : P.about_en).map((p, i) => (
                  <p key={i} style={s.aboutPara}>{p}</p>
                ))}
              </div>
              <div style={s.infoBox}>
                <div style={s.infoRow}><span style={s.infoKey}>name</span><span style={s.infoVal}>{P.name}</span></div>
                <div style={s.infoRow}><span style={s.infoKey}>role</span><span style={s.infoVal}>{lang === "pt" ? P.role_pt : P.role_en}</span></div>
                <div style={s.infoRow}><span style={s.infoKey}>location</span><span style={s.infoVal}>{lang === "pt" ? P.location_pt : P.location_en}</span></div>
                <div style={s.infoRow}><span style={s.infoKey}>email</span><span style={s.infoVal}>{P.email}</span></div>
                <div style={{...s.infoRow, borderBottom: "none"}}>
                  <span style={s.infoKey}>status</span>
                  <span style={{...s.infoVal, color: T.accent, display: "inline-flex", alignItems: "center", gap: 8}}>
                    <span style={{width:6,height:6,borderRadius:"50%",background:T.accent,animation:"blink 2s infinite"}}></span>
                    {lang === "pt" ? P.status_pt : P.status_en}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div style={s.section} data-sec="skills">
            <div style={s.secLabel}>
              <span style={s.secLabelNum}>02</span>
              <span>— {t.skills_title}</span>
              <span style={s.secLine}></span>
            </div>
            <div>
              {P.skills.map((g, i) => (
                <div key={i} style={s.skillRow}>
                  <div style={s.skillGroup}>{g.group}</div>
                  <div style={s.skillItems}>
                    {g.items.map((it, j) => <span key={j} style={s.skillChip}>{it}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects — REDESIGNED */}
          <div style={s.section} data-sec="projects">
            <div style={s.secLabel}>
              <span style={s.secLabelNum}>03</span>
              <span>— {t.projects_title} ({String(P.projects.length).padStart(2, "0")})</span>
              <span style={s.secLine}></span>
            </div>
            <div style={s.projectsHeader}>
              <h2 style={s.secTitle}>{t.projects_title}</h2>
              <span style={s.projectsHint}>{projectsHintText}</span>
            </div>
            <div style={s.projList}>
              {P.projects.map((p, i) => (
                <ProjectCard key={p.id} p={p} idx={i} lang={lang} T={T}
                  theme={theme} t={t} onOpenTerm={() => setTermOpen(true)} />
              ))}
            </div>
          </div>

          {/* Experience */}
          <div style={s.section} data-sec="exp">
            <div style={s.secLabel}>
              <span style={s.secLabelNum}>04</span>
              <span>— {t.exp_title}</span>
              <span style={s.secLine}></span>
            </div>
            <div>
              {P.experience.map((e, i) => (
                <div key={i} style={s.expRow}>
                  <div style={s.expPeriod}>{lang === "pt" ? e.period : e.period_en}</div>
                  <div>
                    <div style={s.expRole}>
                      {lang === "pt" ? e.role_pt : e.role_en}
                      <span style={s.expCompany}> @ {e.company}</span>
                    </div>
                    <div style={s.expDesc}>{lang === "pt" ? e.desc_pt : e.desc_en}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div style={s.section} data-sec="edu">
            <div style={s.secLabel}>
              <span style={s.secLabelNum}>05</span>
              <span>— {t.edu_title}</span>
              <span style={s.secLine}></span>
            </div>
            <div style={s.eduGrid}>
              <div>
                <div style={s.eduLabel}>{t.edu_title}</div>
                {P.education.map((e, i) => (
                  <div key={i} style={s.eduItem}>
                    <div style={s.eduTitle}>{e.title}</div>
                    <div style={s.eduSub}>{e.sub} · {e.period}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={s.eduLabel}>{t.courses}</div>
                {P.courses.map((c, i) => (
                  <div key={i} style={s.eduItem}>
                    <div style={s.eduTitle}>{c.name}</div>
                    <div style={s.eduSub}>{c.platform}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div style={s.section} data-sec="contact">
            <div style={s.secLabel}>
              <span style={s.secLabelNum}>06</span>
              <span>— {t.contact_title}</span>
              <span style={s.secLine}></span>
            </div>
            <div style={s.contactBox}>
              <div style={s.contactRow}>
                <span style={s.contactKey}>email</span>
                <a style={s.contactVal} href={`mailto:${P.email}`}>{P.email}</a>
              </div>
              <div style={s.contactRow}>
                <span style={s.contactKey}>github</span>
                <a style={s.contactVal} href={P.github} target="_blank" rel="noreferrer">{P.github}</a>
              </div>
              <div style={s.contactRow}>
                <span style={s.contactKey}>linkedin</span>
                <a style={s.contactVal} href={P.linkedin} target="_blank" rel="noreferrer">{P.linkedin}</a>
              </div>
              <div style={{...s.contactRow, borderBottom: "none"}}>
                <span style={s.contactKey}>location</span>
                <span style={s.contactVal}>{lang === "pt" ? P.location_pt : P.location_en}</span>
              </div>
            </div>
          </div>

          <div style={s.footer}>
            <span>© {new Date().getFullYear()} {P.name}</span>
            <span>{lang === "pt" ? "construído com html + mono" : "built with html + mono"}</span>
          </div>
        </div>
      </div>

      {termOpen && (
        <TerminalOverlay theme={theme} lang={lang}
          onClose={() => setTermOpen(false)}
          onToggleTheme={toggleTheme}
          onToggleLang={toggleLang}
          onNav={navFromTerm} />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Portfolio />);
