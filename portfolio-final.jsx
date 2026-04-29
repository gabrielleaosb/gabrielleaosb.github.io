// Final version - V3 Editorial + Terminal overlay easter egg + redesigned Projects section
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
// Terminal Overlay (easter egg - activated by ` or Ctrl+K)
// =================================================================
function TerminalOverlay({ theme, lang, onClose, onToggleTheme, onToggleLang, onNav, initialCommand }) {
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
      `* ${P.name} - ${lang === "pt" ? P.role_pt : P.role_en}`,
      `* ${lang === "pt" ? "Terminal interativo. Digite" : "Interactive terminal. Type"} 'help' ${lang === "pt" ? "ou" : "or"} 'ls'.`,
      `* ESC ${lang === "pt" ? "para fechar" : "to close"}.`,
      ``,
    ]}]);
  }, [lang]);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  React.useEffect(() => {
    if (initialCommand) {
      runCmd(initialCommand);
      setInput("");
    }
  }, [initialCommand]);

  const commands = {
    help: () => [
      `${lang === "pt" ? "Comandos" : "Commands"}:`,
      ``,
      `  about, skills, projects, edu, contact`,
      `  ls          ${lang === "pt" ? "listar secoes" : "list sections"}`,
      `  goto <sec>  ${lang === "pt" ? "navegar ate secao" : "scroll to section"}`,
      `  open <id>   ${lang === "pt" ? "abrir projeto" : "open project"}`,
      `  whoami      ${lang === "pt" ? "quem sou" : "who am I"}`,
      `  theme       ${lang === "pt" ? "alternar tema" : "toggle theme"}`,
      `  lang        ${lang === "pt" ? "alternar idioma" : "toggle language"}`,
      `  sudo        ${lang === "pt" ? "tente" : "try it"}`,
      `  clear       ${lang === "pt" ? "limpar" : "clear"}`,
      `  exit        ${lang === "pt" ? "fechar terminal" : "close terminal"}`,
      ``,
    ],
    ls: () => [`about  skills  projects  edu  contact`, ``],
    whoami: () => [
      `${P.name} - ${lang === "pt" ? P.role_pt : P.role_en}`,
      `* ${lang === "pt" ? P.location_pt : P.location_en}`,
      `* ${lang === "pt" ? P.status_pt : P.status_en}`,
      ``,
    ],
    about: () => [
      ``,
      ...(lang === "pt" ? P.about_pt : P.about_en).flatMap(p => [p, ``]),
    ],
    skills: () => {
      const renderSkillLine = (g) => {
        const title = lang === "pt" ? (g.title_pt || g.group) : (g.title_en || g.group);
        const items = g.tags || g.items || [];
        return `  ${title.padEnd(18)} ${items.join(" | ")}`;
      };
      const out = [``];
      P.skills.forEach(g => out.push(renderSkillLine(g)));
      out.push(``);
      return out;
    },
    projects: () => {
      const out = [``];
      P.projects.forEach((p, i) => {
        const badge = p.status === "wip" ? `[dev] ${t.in_dev}` : `[live] ${t.view_live}`;
        out.push(`  ${String(i + 1).padStart(2, "0")}. ${p.name.padEnd(22)} ${p.year}  ${badge}`);
        out.push(`      ${lang === "pt" ? p.tagline_pt : p.tagline_en}`);
        out.push(``);
      });
      return out;
    },
    edu: () => {
      const out = [``];
      P.education.forEach(e => {
        out.push(`  ${e.title}`);
        out.push(`  ${e.sub} | ${e.period}`);
        out.push(``);
      });
      out.push(`  ${t.courses}:`);
      P.courses.forEach(c => out.push(`    * ${c.name} (${c.platform})`));
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
    theme: () => { onToggleTheme(); return [`> theme -> ${theme === "dark" ? "light" : "dark"}`, ``]; },
    lang: () => { onToggleLang(); return [`> lang -> ${lang === "pt" ? "en" : "pt"}`, ``]; },
    clear: () => { setHistory([]); return null; },
    exit: () => { onClose(); return null; },
    sudo: () => [`${lang === "pt" ? "voce nao esta no sudoers. este incidente sera reportado." : "you are not in the sudoers file. this incident will be reported."}`, ``],
    "sudo rm -rf /": () => [`nice try :)`, ``],
    "hello": () => [`${lang === "pt" ? "oi!" : "hey there!"}`, ``],
    "hi": () => [`${lang === "pt" ? "oi!" : "hey there!"}`, ``],
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

    if (verb === "goto" && rest[0]) {
      const sec = rest[0];
      const valid = ["about", "skills", "projects", "edu", "contact"];
      if (valid.includes(sec)) {
        onNav(sec);
        setHistory(h => [...h, { type: "out", lines: [`-> ${sec}`, ``] }]);
        return;
      }
      setHistory(h => [...h, { type: "out", lines: [`${lang === "pt" ? "secao invalida" : "invalid section"}: ${sec}`, ``] }]);
      return;
    }
    if (verb === "open" && rest[0]) {
      const proj = P.projects.find(p => p.id === rest[0] || p.name.toLowerCase().includes(rest[0]));
      if (proj) {
        if (proj.link) window.open(proj.link, "_blank");
        setHistory(h => [...h, { type: "out", lines: [proj.link ? `-> ${proj.link}` : `${lang === "pt" ? "sem link ainda" : "no link yet"}`, ``] }]);
        return;
      }
      setHistory(h => [...h, { type: "out", lines: [`${lang === "pt" ? "projeto nao encontrado" : "project not found"}: ${rest[0]}`, ``] }]);
      return;
    }

    const fn = commands[lower] || commands[verb];
    if (!fn) {
      setHistory(h => [...h, { type: "out", lines: [`${lang === "pt" ? "comando nao encontrado" : "command not found"}: ${verb}`, `${lang === "pt" ? "digite" : "type"} 'help'`, ``] }]);
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
      fontFamily: "'JetBrains Mono', monospace", fontSize: 14.5, lineHeight: 1.65,
    },
    termHead: {
      padding: "10px 14px", borderBottom: `1px solid ${T.hair}`,
      display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: T.muted,
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
      color: T.text, fontFamily: "inherit", fontSize: 14.5 },
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
            {P.handle}@portfolio - zsh
          </div>
          <div style={{ fontSize: 11, color: T.muted, letterSpacing: 1 }}>ESC close</div>
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
              <div key={`${i}-${j}`} style={s.line}>{l || " "}</div>
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
// Project Card (redesigned - rich hover with ASCII preview)
// =================================================================
function LegacyProjectCard({ p, idx, lang, T, theme, t, onOpenTerm, isMobile }) {
  const [hover, setHover] = React.useState(false);
  const primaryLink = p.link;

  const visuals = {
    "nucleo-zero-gestao": ["  /api/projects      200", "  /api/tasks         200", "  /api/reports       200", "  jwt.refresh()      ok", "  alembic upgrade    ok", "  caddy -> fastapi   ok"],
    "emenu":       ["????????????????????????", "?  $ ./menu --start    ?", "?  > appetizers   [12] ?", "?  > mains        [24] ?", "?  > desserts     [08] ?", "?  > order via whatsapp?", "????????????????????????"],
    "ai-analyst":  ["  import pandas as pd", "  from langchain import *", "", "  df = read_csv(...)", "  insight = llm(df)", "  ? plot.show()"],
    "knucklebones":["       ?????   ?????", "       ? ? ?   ? ? ?", "       ?????   ?????", "   roll d20: 17 + 3", "   ? crit near-miss ?"],
    "lt-manager":  ["  ?? character ??????", "  ? name:  aranel   ?", "  ? class: ranger   ?", "  ? hp:    34/40    ?", "  ? ac:    16       ?", "  ???????????????????"],
    "discord-bot": ["  > /ping",  "  ? pong 42ms", "  > /play lofi", "  ? ? now playing...", "  > /moderate @user", "  ? ? action logged"],
  };
  const art = visuals[p.id] || visuals["emenu"];

  const openPrimaryLink = () => {
    if (primaryLink) window.open(primaryLink, "_blank");
  };

  const onCardKeyDown = (e) => {
    if (!primaryLink) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openPrimaryLink();
    }
  };

  const s = {
    card: {
      position: "relative",
      border: `1px solid ${hover ? T.hair2 : T.hair}`,
      background: hover ? T.cardBg : "transparent",
      padding: isMobile ? "20px 16px" : "24px 28px",
      display: "grid",
      gridTemplateColumns: isMobile ? "40px 1fr" : "48px 1fr 240px",
      gap: isMobile ? 14 : 24,
      alignItems: "stretch",
      transition: "border-color 0.2s, background 0.2s",
      marginBottom: -1,
      cursor: p.link ? "pointer" : "default",
      overflow: "hidden",
    },
    num: {
      fontSize: 12, color: T.muted, letterSpacing: 2, paddingTop: 4,
      display: "flex", flexDirection: "column", gap: 8,
    },
    numBig: { fontSize: isMobile ? 20 : 26, color: T.accent, fontWeight: 500, letterSpacing: 0 },
    main: { display: "flex", flexDirection: "column", gap: 10, minWidth: 0 },
    titleRow: { display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" },
    name: { fontSize: isMobile ? 18 : 24, fontWeight: 500, color: T.accent, letterSpacing: "-0.01em",
      fontFamily: "'Geist Mono', 'JetBrains Mono', monospace" },
    yearInline: { fontSize: 12, color: T.muted, letterSpacing: 2 },
    statusBadge: (kind) => ({
      display: "inline-flex", alignItems: "center", gap: 6,
      fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase",
      padding: "3px 9px", border: `1px solid ${T.chipBd}`,
      color: kind === "wip" ? T.muted : (kind === "live" || kind === "saas" ? T.accent : T.dim),
    }),
    statusDot: (kind) => ({
      width: 5, height: 5, borderRadius: "50%",
      background: kind === "wip" ? T.muted : (kind === "live" || kind === "saas" ? T.accent : T.dim),
      animation: kind === "wip" ? "blink 1.4s ease-in-out infinite" : "none",
    }),
    tag: { fontSize: 14, color: T.muted, lineHeight: 1.65, marginTop: 2,
      maxWidth: 520 },
    highlights: { display: "flex", flexDirection: "column", gap: 5, marginTop: 2 },
    highlight: {
      fontSize: 12.5, color: T.text, lineHeight: 1.6, maxWidth: 560,
      display: "flex", gap: 8, alignItems: "flex-start",
    },
    highlightMark: { color: T.muted, flex: "0 0 auto" },
    tagsRow: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 },
    tag2: { fontSize: 11.5, color: T.muted, padding: "3px 8px",
      border: `1px solid ${T.chipBd}`, background: T.chipBg, letterSpacing: 0.5 },
    preview: {
      background: T.bg2,
      border: `1px solid ${hover ? T.hair2 : T.hair}`,
      padding: "12px 14px",
      fontSize: 11.5, lineHeight: 1.55,
      color: hover ? T.text : T.muted,
      fontFamily: "'JetBrains Mono', monospace",
      whiteSpace: "pre", overflow: "hidden",
      position: "relative",
      transition: "border-color 0.2s, color 0.2s",
    },
    previewScan: {
      position: "absolute", left: 0, right: 0, height: "40%",
      background: `linear-gradient(to bottom, transparent, ${theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"}, transparent)`,
      animation: "scan 3s linear infinite",
      pointerEvents: "none",
    },
    actions: { display: "flex", gap: 10, marginTop: 10, fontSize: 12,
      color: T.muted, letterSpacing: 1.5, textTransform: "uppercase" },
    action: { cursor: "pointer", borderBottom: `1px dashed ${T.chipBd}`,
      paddingBottom: 1, transition: "color 0.2s, border-color 0.2s",
      background: "transparent", borderTop: "none", borderLeft: "none", borderRight: "none",
      font: "inherit", textTransform: "inherit", letterSpacing: "inherit" },
    arrow: {
      position: "absolute", right: 12, top: 12,
      fontSize: 18, color: hover ? T.accent : T.muted,
      transition: "transform 0.25s, color 0.2s",
      transform: hover ? "translate(2px, -2px)" : "translate(0, 0)",
    },
  };

  return (
    <div style={s.card}
         role={primaryLink ? "link" : undefined}
         tabIndex={primaryLink ? 0 : undefined}
         aria-label={primaryLink ? `${p.name} - ${lang === "pt" ? "abrir projeto" : "open project"}` : undefined}
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
         onKeyDown={onCardKeyDown}
         onClick={openPrimaryLink}>
      <div style={s.num}>
        <span style={s.numBig}>{String(idx+1).padStart(2, "0")}</span>
        <span>/{String(PORTFOLIO.projects.length).padStart(2, "0")}</span>
      </div>
      <div style={s.main}>
        <div style={s.titleRow}>
          <span style={s.name}>{p.name}</span>
          <span style={s.yearInline}>{p.year}</span>
          <span style={s.statusBadge(p.statusKind)}>
            <span style={s.statusDot(p.statusKind)}></span>
            {lang === "pt" ? p.status_pt : p.status_en}
          </span>
        </div>
        <div style={s.tag}>{lang === "pt" ? p.tagline_pt : p.tagline_en}</div>
        <div style={{ fontSize: 13, color: T.dim, lineHeight: 1.65, maxWidth: 520 }}>
          {lang === "pt" ? p.desc_pt : p.desc_en}
        </div>
        {!!((lang === "pt" ? p.highlights_pt : p.highlights_en) || []).length && (
          <div style={s.highlights}>
            {(lang === "pt" ? p.highlights_pt : p.highlights_en).map((item, i) => (
              <div key={i} style={s.highlight}>
                <span style={s.highlightMark}>+</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
        <div style={s.tagsRow}>
          {p.tags.map((tg, i) => <span key={i} style={s.tag2}>{tg}</span>)}
        </div>
        <div style={s.actions}>
          {p.links && p.links[0] && (
            <button type="button" style={{...s.action, color: hover ? T.accent : T.muted}}
                    onClick={(e) => { e.stopPropagation(); openPrimaryLink(); }}>
              {lang === "pt" ? p.links[0].label_pt : p.links[0].label_en} ?
            </button>
          )}
          <button type="button" style={s.action}
                  onClick={(e) => { e.stopPropagation(); onOpenTerm(`open ${p.id}`); }}>
            $ open {p.id}
          </button>
        </div>
      </div>
      {!isMobile && (
        <div style={s.preview}>
          <div style={s.previewScan}></div>
          {art.join("\n")}
        </div>
      )}
      <span style={s.arrow}>?</span>
    </div>
  );
}

function DenseProjectCard({ p, idx, lang, T, theme, t, onOpenTerm, isMobile }) {
  const [hover, setHover] = React.useState(false);
  const primaryLink = p.link;
  const primaryLabel = p.links && p.links[0]
    ? (lang === "pt" ? p.links[0].label_pt : p.links[0].label_en)
    : (lang === "pt" ? "Abrir projeto" : "Open project");
  const highlights = (lang === "pt" ? p.highlights_pt : p.highlights_en) || [];

  const visuals = {
    "nucleo-zero-gestao": ["  /api/projects      200", "  /api/tasks         200", "  /api/reports       200", "  jwt.refresh()      ok", "  alembic upgrade    ok", "  caddy -> fastapi   ok"],
    "emenu":       ["  tenant: restaurante-a", "  menu.create()       ok", "  category.sort()     ok", "  slug.resolve()      ok", "  /site/cardapio      200"],
    "ai-analyst":  ["  df = read_csv(...)", "  queue.enqueue(job)", "  llm.local_insight()", "  chart.render()      ok", "  privacy: local only"],
    "knucklebones":["  peer.connect()", "  sync.turn(state)", "  score.recalculate()", "  no_server = true", "  play.now()"],
    "lt-manager":  ["  room.join(ws)", "  canvas.sync()", "  session.state()", "  initiative.order()", "  gm.broadcast()"],
    "discord-bot": ["  /roll epic", "  player.save()", "  coins += daily", "  battle.resolve()", "  mongo.write()"],
  };
  const art = visuals[p.id] || visuals["emenu"];

  const openPrimaryLink = () => {
    if (primaryLink) window.open(primaryLink, "_blank");
  };

  const s = {
    card: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      border: `1px solid ${hover ? T.hair2 : T.hair}`,
      background: hover ? T.cardBg : T.bg,
      padding: isMobile ? "18px" : "22px",
      transition: "border-color 0.2s, background 0.2s, transform 0.2s",
      transform: hover ? "translateY(-2px)" : "translateY(0)",
      overflow: "hidden",
    },
    top: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      marginBottom: 14,
    },
    index: {
      display: "flex",
      alignItems: "baseline",
      gap: 10,
      minWidth: 0,
    },
    numBig: {
      fontSize: isMobile ? 24 : 30,
      color: T.accent,
      fontWeight: 500,
      letterSpacing: "-0.04em",
      fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
      lineHeight: 1,
    },
    numSmall: {
      fontSize: 11,
      color: T.muted,
      letterSpacing: 2,
      textTransform: "uppercase",
    },
    statusBadge: (kind) => ({
      display: "inline-flex", alignItems: "center", gap: 6,
      fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase",
      padding: "3px 9px", border: `1px solid ${T.chipBd}`,
      color: kind === "wip" ? T.muted : (kind === "live" || kind === "saas" ? T.accent : T.dim),
      background: T.chipBg,
    }),
    statusDot: (kind) => ({
      width: 5, height: 5, borderRadius: "50%",
      background: kind === "wip" ? T.muted : (kind === "live" || kind === "saas" ? T.accent : T.dim),
      animation: kind === "wip" ? "blink 1.4s ease-in-out infinite" : "none",
    }),
    previewWrap: {
      position: "relative",
      minHeight: isMobile ? 118 : 132,
      border: `1px solid ${hover ? T.hair2 : T.hair}`,
      background: T.bg2,
      padding: isMobile ? "12px" : "14px 16px",
      marginBottom: 18,
      overflow: "hidden",
      transition: "border-color 0.2s, color 0.2s",
    },
    previewScan: {
      position: "absolute", left: 0, right: 0, height: "40%",
      background: `linear-gradient(to bottom, transparent, ${theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"}, transparent)`,
      animation: "scan 3s linear infinite",
      pointerEvents: "none",
    },
    preview: {
      whiteSpace: "pre",
      overflow: "hidden",
      fontSize: 11.5,
      lineHeight: 1.55,
      color: hover ? T.text : T.muted,
      fontFamily: "'JetBrains Mono', monospace",
      margin: 0,
    },
    body: { display: "flex", flexDirection: "column", flex: 1, minWidth: 0 },
    header: { marginBottom: 14 },
    metaRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 },
    year: { fontSize: 11, color: T.muted, letterSpacing: 2, textTransform: "uppercase", flex: "0 0 auto" },
    name: {
      fontSize: isMobile ? 20 : 24,
      fontWeight: 500,
      color: T.accent,
      letterSpacing: "-0.02em",
      fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
      lineHeight: 1.15,
      margin: "0 0 10px",
    },
    tagline: { fontSize: 13, color: T.muted, lineHeight: 1.65, margin: 0 },
    desc: { fontSize: 13, color: T.text, lineHeight: 1.7, margin: "0 0 14px", maxWidth: 560 },
    highlights: {
      listStyle: "none",
      display: "grid",
      gap: 8,
      margin: "0 0 16px",
      padding: "14px 0 0",
      borderTop: `1px solid ${T.hair}`,
    },
    highlight: {
      fontSize: 12.5, color: T.text, lineHeight: 1.6,
      display: "flex", gap: 8, alignItems: "flex-start",
    },
    highlightMark: { color: T.muted, flex: "0 0 auto" },
    tagsRow: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: "auto", paddingTop: 10 },
    tag: {
      fontSize: 11.5, color: T.muted, padding: "3px 8px",
      border: `1px solid ${T.chipBd}`, background: T.chipBg, letterSpacing: 0.5,
    },
    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      marginTop: 16,
      paddingTop: 14,
      borderTop: `1px solid ${T.hair}`,
    },
    actions: {
      display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center",
      fontSize: 12, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase",
    },
    action: {
      cursor: "pointer",
      padding: "0 0 2px",
      transition: "color 0.2s, border-color 0.2s",
      background: "transparent",
      borderTop: "none", borderLeft: "none", borderRight: "none",
      borderBottom: `1px dashed ${T.chipBd}`,
      font: "inherit", textTransform: "inherit", letterSpacing: "inherit",
      color: T.muted,
    },
    arrow: { fontSize: 16, color: hover ? T.accent : T.muted, transition: "color 0.2s" },
  };

  return (
    <article style={s.card}
             aria-labelledby={`project-${p.id}`}
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}>
      <div style={s.top}>
        <div style={s.index}>
          <span style={s.numBig}>{String(idx+1).padStart(2, "0")}</span>
          <span style={s.numSmall}>/ {String(PORTFOLIO.projects.length).padStart(2, "0")}</span>
        </div>
        <span style={s.statusBadge(p.statusKind)}>
          <span style={s.statusDot(p.statusKind)}></span>
          {lang === "pt" ? p.status_pt : p.status_en}
        </span>
      </div>

      <div style={s.previewWrap} aria-hidden="true">
        <div style={s.previewScan}></div>
        <pre style={s.preview}>{art.join("\n")}</pre>
      </div>

      <div style={s.body}>
        <header style={s.header}>
          <div style={s.metaRow}>
            <span style={s.year}>{p.year}</span>
            <span style={s.year}>{lang === "pt" ? p.tagline_pt : p.tagline_en}</span>
          </div>
          <h3 id={`project-${p.id}`} style={s.name}>{p.name}</h3>
          <p style={s.tagline}>{lang === "pt" ? p.tagline_pt : p.tagline_en}</p>
        </header>

        <p style={s.desc}>{lang === "pt" ? p.desc_pt : p.desc_en}</p>

        {!!highlights.length && (
          <ul style={s.highlights}>
            {highlights.map((item, i) => (
              <li key={i} style={s.highlight}>
                <span style={s.highlightMark}>+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div style={s.tagsRow}>
          {p.tags.map((tg, i) => <span key={i} style={s.tag}>{tg}</span>)}
        </div>

        <footer style={s.footer}>
          <div style={s.actions}>
            {p.links && p.links[0] && (
              <button type="button" style={{ ...s.action, color: hover ? T.accent : T.muted }}
                      aria-label={`${primaryLabel} ${p.name}`}
                      onClick={openPrimaryLink}>
                {primaryLabel} ?
              </button>
            )}
            <button type="button" style={s.action}
                    aria-label={`Open ${p.id} in terminal`}
                    onClick={() => onOpenTerm(`open ${p.id}`)}>
              $ open {p.id}
            </button>
          </div>
          <span style={s.arrow}>?</span>
        </footer>
      </div>
    </article>
  );
}

function ProjectCard({ p, idx, lang, T, theme, onOpenProject, isMobile }) {
  const [hover, setHover] = React.useState(false);
  const highlights = ((lang === "pt" ? p.highlights_pt : p.highlights_en) || []).slice(0, 2);
  const visibleTags = (p.tags || []).slice(0, 3);
  const fullDesc = lang === "pt" ? p.desc_pt : p.desc_en;
  const summary = fullDesc.length > 150 ? `${fullDesc.slice(0, 147)}...` : fullDesc;
  const tones = {
    "nucleo-zero-gestao": { line: "#8fb3ff", soft: "rgba(143,179,255,0.10)" },
    "emenu": { line: "#f0a45b", soft: "rgba(240,164,91,0.10)" },
    "ai-analyst": { line: "#86c7a0", soft: "rgba(134,199,160,0.10)" },
    "knucklebones": { line: "#d98989", soft: "rgba(217,137,137,0.10)" },
    "lt-manager": { line: "#d7c27a", soft: "rgba(215,194,122,0.10)" },
    "discord-bot": { line: "#88a6ff", soft: "rgba(136,166,255,0.10)" },
  };
  const tone = tones[p.id] || { line: T.accent, soft: T.chipBg };
  const visuals = {
    "nucleo-zero-gestao": ["  /api/tasks         200", "  jwt.refresh()      ok", "  deploy:vps         ok"],
    "emenu": ["  tenant.resolve()", "  menu.publish()     ok", "  /site/cardapio     200"],
    "ai-analyst": ["  queue.enqueue()", "  ollama.generate()", "  privacy: local"],
    "knucklebones": ["  peer.connect()", "  sync.turn()", "  no server"],
    "lt-manager": ["  room.join(ws)", "  canvas.sync()", "  state.persist()"],
    "discord-bot": ["  /roll epic", "  battle.resolve()", "  mongo.write()"],
  };
  const art = visuals[p.id] || visuals["emenu"];

  const openDetails = () => onOpenProject(p);
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openDetails();
    }
  };

  const s = {
    card: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
      padding: isMobile ? "18px" : "20px",
      border: `1px solid ${hover ? T.hair2 : T.hair}`,
      background: hover ? T.cardBg : T.bg,
      boxShadow: hover ? `inset 0 0 0 1px ${tone.line}` : "none",
      transition: "border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s",
      transform: hover ? "translateY(-2px)" : "translateY(0)",
      cursor: "pointer",
      overflow: "hidden",
    },
    topLine: { position: "absolute", top: 0, left: 0, right: 0, height: 2, background: tone.line, opacity: 0.9 },
    top: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 14 },
    index: { display: "flex", alignItems: "baseline", gap: 10 },
    numBig: {
      fontSize: isMobile ? 24 : 28,
      color: T.accent,
      fontWeight: 500,
      letterSpacing: "-0.04em",
      fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
      lineHeight: 1,
    },
    numSmall: { fontSize: 11, color: T.muted, letterSpacing: 2, textTransform: "uppercase" },
    status: {
      display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, letterSpacing: 1.5,
      textTransform: "uppercase", padding: "3px 9px", border: `1px solid ${T.chipBd}`,
      background: tone.soft, color: T.text,
    },
    statusDot: { width: 5, height: 5, borderRadius: "50%", background: tone.line },
    previewWrap: {
      position: "relative", minHeight: isMobile ? 84 : 92, border: `1px solid ${T.hair}`,
      background: T.bg2, padding: "12px 14px", marginBottom: 14, overflow: "hidden",
    },
    previewScan: {
      position: "absolute", left: 0, right: 0, height: "40%",
      background: `linear-gradient(to bottom, transparent, ${theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"}, transparent)`,
      animation: "scan 3s linear infinite", pointerEvents: "none",
    },
    preview: {
      whiteSpace: "pre", overflow: "hidden", fontSize: 11.5, lineHeight: 1.55,
      color: hover ? T.text : T.muted, fontFamily: "'JetBrains Mono', monospace", margin: 0,
    },
    body: { display: "flex", flexDirection: "column", gap: 12, flex: 1 },
    meta: { display: "flex", justifyContent: "space-between", gap: 12, fontSize: 11, color: T.muted, letterSpacing: 2, textTransform: "uppercase" },
    name: {
      fontSize: isMobile ? 20 : 23, fontWeight: 500, color: T.accent, letterSpacing: "-0.02em",
      fontFamily: "'Geist Mono', 'JetBrains Mono', monospace", lineHeight: 1.15, margin: 0,
    },
    summary: { fontSize: 13, color: T.text, lineHeight: 1.7, margin: 0 },
    highlights: { listStyle: "none", display: "grid", gap: 7, margin: 0, padding: 0 },
    highlight: { display: "flex", gap: 8, fontSize: 12.5, color: T.muted, lineHeight: 1.55 },
    highlightMark: { color: tone.line, flex: "0 0 auto" },
    tags: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: "auto", paddingTop: 6 },
    tag: { fontSize: 11, color: T.muted, padding: "3px 8px", border: `1px solid ${T.chipBd}`, background: T.chipBg, letterSpacing: 0.5 },
    footer: {
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
      marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.hair}`,
      fontSize: 12, color: T.muted, letterSpacing: 1.4, textTransform: "uppercase",
    },
  };

  return (
    <article style={s.card}
             role="button"
             tabIndex={0}
             aria-labelledby={`project-${p.id}`}
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
             onClick={openDetails}
             onKeyDown={onKeyDown}>
      <span style={s.topLine}></span>
      <div style={s.top}>
        <div style={s.index}>
          <span style={s.numBig}>{String(idx+1).padStart(2, "0")}</span>
          <span style={s.numSmall}>/ {String(PORTFOLIO.projects.length).padStart(2, "0")}</span>
        </div>
        <span style={s.status}>
          <span style={s.statusDot}></span>
          {lang === "pt" ? p.status_pt : p.status_en}
        </span>
      </div>
      <div style={s.previewWrap} aria-hidden="true">
        <div style={s.previewScan}></div>
        <pre style={s.preview}>{art.join("\n")}</pre>
      </div>
      <div style={s.body}>
        <div style={s.meta}>
          <span>{p.year}</span>
          <span>{lang === "pt" ? p.tagline_pt : p.tagline_en}</span>
        </div>
        <h3 id={`project-${p.id}`} style={s.name}>{p.name}</h3>
        <p style={s.summary}>{summary}</p>
        {!!highlights.length && (
          <ul style={s.highlights}>
            {highlights.map((item, i) => (
              <li key={i} style={s.highlight}>
                <span style={s.highlightMark}>+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        <div style={s.tags}>
          {visibleTags.map((tg, i) => <span key={i} style={s.tag}>{tg}</span>)}
        </div>
        <footer style={s.footer}>
          <span>{lang === "pt" ? "Ver detalhes" : "View details"}</span>
          <span>?</span>
        </footer>
      </div>
    </article>
  );
}

function ProjectModal({ project, lang, T, theme, onClose }) {
  const primaryLabel = project.links && project.links[0]
    ? (lang === "pt" ? project.links[0].label_pt : project.links[0].label_en)
    : (lang === "pt" ? "Abrir projeto" : "Open project");
  const highlights = (lang === "pt" ? project.highlights_pt : project.highlights_en) || [];
  const visuals = {
    "nucleo-zero-gestao": ["  /api/projects      200", "  /api/tasks         200", "  /api/reports       200", "  jwt.refresh()      ok", "  alembic upgrade    ok", "  caddy -> fastapi   ok"],
    "emenu": ["  tenant.resolve()", "  menu.publish()     ok", "  category.sort()    ok", "  /site/cardapio     200"],
    "ai-analyst": ["  queue.enqueue()", "  ollama.generate()", "  insight.persist()", "  privacy: local"],
    "knucklebones": ["  peer.connect()", "  sync.turn()", "  score.update()", "  no server"],
    "lt-manager": ["  room.join(ws)", "  canvas.sync()", "  session.state()", "  gm.broadcast()"],
    "discord-bot": ["  /roll epic", "  player.save()", "  battle.resolve()", "  mongo.write()"],
  };
  const art = (visuals[project.id] || visuals["emenu"]).join("\n");

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const openPrimaryLink = () => {
    if (project.link) window.open(project.link, "_blank");
  };

  const s = {
    backdrop: {
      position: "fixed", inset: 0, zIndex: 90, background: "rgba(0,0,0,0.58)",
      backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    },
    modal: {
      width: "min(980px, 100%)", maxHeight: "90vh", overflowY: "auto", background: T.bg, color: T.text,
      border: `1px solid ${T.hair2}`,
      boxShadow: theme === "dark" ? "0 30px 80px rgba(0,0,0,0.6)" : "0 30px 80px rgba(0,0,0,0.15)",
    },
    head: {
      display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16,
      padding: "20px 22px", borderBottom: `1px solid ${T.hair}`,
    },
    headMeta: { display: "grid", gap: 8 },
    overline: { fontSize: 11, color: T.muted, letterSpacing: 2, textTransform: "uppercase" },
    title: {
      fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 500, color: T.accent, letterSpacing: "-0.03em",
      lineHeight: 1.05, fontFamily: "'Geist Mono', 'JetBrains Mono', monospace", margin: 0,
    },
    close: {
      background: "transparent", border: `1px solid ${T.chipBd}`, color: T.text, padding: "8px 12px",
      cursor: "pointer", font: "inherit", letterSpacing: 1.5, textTransform: "uppercase",
    },
    body: { display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(280px, 0.8fr)", gap: 0 },
    main: { padding: "22px" },
    side: { padding: "22px", borderLeft: `1px solid ${T.hair}`, background: T.bg2 },
    intro: { fontSize: 15, color: T.text, lineHeight: 1.8, margin: "0 0 20px" },
    sectionLabel: { fontSize: 11, color: T.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 },
    highlights: { listStyle: "none", display: "grid", gap: 10, margin: "0 0 24px", padding: 0 },
    highlight: { display: "flex", gap: 10, fontSize: 13, color: T.text, lineHeight: 1.65 },
    tags: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 },
    tag: { fontSize: 11.5, color: T.muted, padding: "4px 9px", border: `1px solid ${T.chipBd}`, background: T.chipBg, letterSpacing: 0.5 },
    actions: { display: "flex", gap: 10, flexWrap: "wrap" },
    action: {
      padding: "11px 16px", border: `1px solid ${T.chipBd}`, background: "transparent", color: T.text,
      cursor: "pointer", font: "inherit", letterSpacing: 1.5, textTransform: "uppercase",
    },
    actionPrimary: {
      padding: "11px 16px", border: `1px solid ${T.accent}`, background: T.accent, color: T.bg,
      cursor: "pointer", font: "inherit", letterSpacing: 1.5, textTransform: "uppercase",
    },
    preview: {
      border: `1px solid ${T.hair}`, background: T.bg, padding: "16px", whiteSpace: "pre", overflow: "hidden",
      fontSize: 12, lineHeight: 1.6, color: T.text, fontFamily: "'JetBrains Mono', monospace", margin: "0 0 18px",
    },
    statGrid: { display: "grid", gap: 12 },
    statRow: { display: "grid", gap: 4, paddingBottom: 12, borderBottom: `1px solid ${T.hair}` },
    statKey: { fontSize: 11, color: T.muted, letterSpacing: 2, textTransform: "uppercase" },
    statVal: { fontSize: 13, color: T.text, lineHeight: 1.6 },
  };

  return (
    <div style={s.backdrop} onClick={onClose}>
      <article style={s.modal} onClick={(e) => e.stopPropagation()} aria-labelledby={`modal-${project.id}`}>
        <header style={s.head}>
          <div style={s.headMeta}>
            <span style={s.overline}>{project.year} / {lang === "pt" ? project.status_pt : project.status_en}</span>
            <h2 id={`modal-${project.id}`} style={s.title}>{project.name}</h2>
            <span style={s.overline}>{lang === "pt" ? project.tagline_pt : project.tagline_en}</span>
          </div>
          <button type="button" style={s.close} onClick={onClose}>
            {lang === "pt" ? "Fechar" : "Close"}
          </button>
        </header>
        <div style={s.body}>
          <div style={s.main}>
            <p style={s.intro}>{lang === "pt" ? project.desc_pt : project.desc_en}</p>
            {!!highlights.length && (
              <>
                <div style={s.sectionLabel}>{lang === "pt" ? "Pontos principais" : "Key points"}</div>
                <ul style={s.highlights}>
                  {highlights.map((item, i) => (
                    <li key={i} style={s.highlight}>
                      <span>+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div style={s.sectionLabel}>{lang === "pt" ? "Stack usada" : "Stack used"}</div>
            <div style={s.tags}>
              {(project.tags || []).map((tg, i) => <span key={i} style={s.tag}>{tg}</span>)}
            </div>
            <div style={s.actions}>
              {project.link && (
                <button type="button" style={s.actionPrimary} onClick={openPrimaryLink}>
                  {primaryLabel}
                </button>
              )}
            </div>
          </div>
          <aside style={s.side}>
            <pre style={s.preview}>{art}</pre>
            <div style={s.statGrid}>
              <div style={s.statRow}>
                <span style={s.statKey}>{lang === "pt" ? "Ano" : "Year"}</span>
                <span style={s.statVal}>{project.year}</span>
              </div>
              <div style={s.statRow}>
                <span style={s.statKey}>{lang === "pt" ? "Status" : "Status"}</span>
                <span style={s.statVal}>{lang === "pt" ? project.status_pt : project.status_en}</span>
              </div>
              <div style={s.statRow}>
                <span style={s.statKey}>{lang === "pt" ? "Categoria" : "Category"}</span>
                <span style={s.statVal}>{lang === "pt" ? project.tagline_pt : project.tagline_en}</span>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}

// =================================================================
// Mobile hook
// =================================================================
function useIsMobile() {
  const [mobile, setMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return mobile;
}

// =================================================================
// Main Portfolio
// =================================================================
function Portfolio() {
  const [theme, setTheme] = React.useState("dark");
  const [lang, setLang] = React.useState("pt");
  const [termOpen, setTermOpen] = React.useState(false);
  const [termInitialCommand, setTermInitialCommand] = React.useState("");
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [now, setNow] = React.useState(new Date());
  const scrollRef = React.useRef(null);
  const isMobile = useIsMobile();

  const T = THEMES[theme];
  const t = I18N[lang];
  const P = PORTFOLIO;

  React.useEffect(() => {
    document.documentElement.classList.toggle("light-theme", theme === "light");
  }, [theme]);

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault(); openTerminal();
      } else if (e.key === "`" && !termOpen) {
        if (document.activeElement && ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
        e.preventDefault(); openTerminal();
      } else if (e.key === "Escape" && termOpen) {
        closeTerminal();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [termOpen]);

  const toggleTheme = () => setTheme(x => x === "dark" ? "light" : "dark");
  const toggleLang = () => setLang(x => x === "pt" ? "en" : "pt");
  const openTerminal = (command = "") => {
    setTermInitialCommand(command);
    setTermOpen(true);
  };
  const closeTerminal = () => {
    setTermOpen(false);
    setTermInitialCommand("");
  };
  const openProjectModal = (project) => setSelectedProject(project);
  const closeProjectModal = () => setSelectedProject(null);

  const scrollTo = (id) => {
    const el = scrollRef.current?.querySelector(`[data-sec="${id}"]`);
    const container = scrollRef.current;
    if (el && container) {
      const top = el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 24;
      container.scrollTo({ top, behavior: "smooth" });
    }
  };

  const navFromTerm = (sec) => { scrollTo(sec); closeTerminal(); };

  const clock = now.toLocaleTimeString(lang === "pt" ? "pt-BR" : "en-US", { hour12: false });

  const s = {
    root: {
      height: "100vh", background: T.bg, color: T.text,
      fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace",
      fontSize: 15, lineHeight: 1.7,
      display: "flex", flexDirection: "column",
      transition: "background 0.3s, color 0.3s",
    },
    top: {
      position: "sticky", top: 0, zIndex: 20,
      padding: isMobile ? "10px 16px" : "12px 32px",
      borderBottom: `1px solid ${T.hair}`,
      display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: T.muted,
      letterSpacing: 1, textTransform: "uppercase", background: T.bg,
      backdropFilter: "blur(12px)",
    },
    brand: { color: T.text, letterSpacing: 1.5 },
    navLinks: {
      display: isMobile ? "none" : "flex",
      gap: 22, marginLeft: "auto", marginRight: 18,
    },
    navLink: {
      cursor: "pointer", color: T.muted, transition: "color 0.15s",
      background: "transparent", border: "none", padding: 0, font: "inherit", textTransform: "inherit",
    },
    chips: { display: "flex", gap: 6, alignItems: "center", marginLeft: isMobile ? "auto" : 0 },
    chip: { padding: "4px 10px", border: `1px solid ${T.chipBd}`, cursor: "pointer",
      fontSize: 11, color: T.text, background: T.chipBg, letterSpacing: 1,
      fontFamily: "inherit" },
    termHint: {
      padding: "4px 10px", border: `1px solid ${T.chipBd}`, cursor: "pointer",
      fontSize: 11, color: T.muted, background: "transparent",
      display: isMobile ? "none" : "flex", alignItems: "center", gap: 8, letterSpacing: 1,
      fontFamily: "inherit",
    },
    kbd: {
      padding: "1px 5px", border: `1px solid ${T.chipBd}`,
      fontSize: 10, color: T.text, background: T.chipBg,
    },

    scroll: { flex: 1, overflowY: "auto", minHeight: 0 },
    inner: { maxWidth: 1040, margin: "0 auto", padding: isMobile ? "48px 20px 80px" : "72px 32px 120px" },
    hero: { borderBottom: `1px solid ${T.hair}`, paddingBottom: isMobile ? 40 : 64, marginBottom: isMobile ? 48 : 72 },
    heroMeta: { display: "flex", gap: 18, fontSize: 12, color: T.muted,
      textTransform: "uppercase", letterSpacing: 2, marginBottom: 40, alignItems: "center",
      flexWrap: "wrap" },
    heroHello: { fontSize: 13, color: T.muted, letterSpacing: 2,
      textTransform: "uppercase", marginBottom: 24 },
    heroName: {
      fontSize: isMobile ? "clamp(42px, 14vw, 72px)" : "clamp(52px, 8.5vw, 112px)",
      fontWeight: 500, lineHeight: 1,
      letterSpacing: "-0.035em", color: T.accent, marginBottom: 28,
      fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
    },
    heroRole: {
      fontSize: isMobile ? "clamp(16px, 4vw, 20px)" : "clamp(20px, 2.4vw, 26px)",
      color: T.muted, marginBottom: 40, fontWeight: 400, letterSpacing: "-0.01em",
    },
    heroRoleHL: { color: T.text },
    heroDesc: { fontSize: 16, lineHeight: 1.85, color: T.text, maxWidth: 640, marginBottom: 36 },
    heroCtaRow: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" },
    heroCta: {
      padding: "12px 22px", border: `1px solid ${T.accent}`, color: T.bg,
      background: T.accent, fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
      cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.2s",
    },
    heroCta2: {
      padding: "12px 22px", border: `1px solid ${T.chipBd}`, color: T.text,
      fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
      cursor: "pointer", background: "transparent", fontFamily: "inherit",
    },
    heroStatus: { display: "inline-flex", alignItems: "center", gap: 10, fontSize: 12,
      color: T.muted, letterSpacing: 2, textTransform: "uppercase" },
    statusDot: { width: 7, height: 7, borderRadius: "50%", background: T.accent,
      animation: "blink 2s ease-in-out infinite" },
    heroProofs: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(4, minmax(0, 1fr))",
      gap: 10,
      marginTop: 30,
      maxWidth: 920,
    },
    heroProof: {
      border: `1px solid ${T.hair}`,
      background: T.cardBg,
      padding: isMobile ? "12px 14px" : "14px 16px",
      display: "grid",
      gap: 6,
      minHeight: 72,
    },
    heroProofK: { fontSize: 11, color: T.muted, letterSpacing: 2, textTransform: "uppercase" },
    heroProofV: { fontSize: 13.5, color: T.text, lineHeight: 1.45 },

    section: { marginBottom: isMobile ? 64 : 96, paddingTop: 8 },
    secLabel: { fontSize: 11, color: T.muted, letterSpacing: 3, textTransform: "uppercase",
      marginBottom: 16, display: "flex", alignItems: "center", gap: 14 },
    secLabelNum: { color: T.accent },
    secLine: { flex: 1, height: 1, background: T.hair },
    secTitle: {
      fontSize: isMobile ? "clamp(24px, 6vw, 32px)" : "clamp(31px, 4vw, 42px)",
      fontWeight: 500, color: T.accent, marginBottom: 40, letterSpacing: "-0.02em",
      fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
    },

    aboutGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr",
      gap: isMobile ? 32 : 52,
    },
    aboutPara: { fontSize: 16, lineHeight: 1.85, marginBottom: 20, color: T.text },
    infoBox: { border: `1px solid ${T.hair}`, background: T.cardBg },
    infoRow: { display: "grid", gridTemplateColumns: "110px 1fr", padding: "14px 18px",
      borderBottom: `1px solid ${T.hair}`, fontSize: 14.5 },
    infoKey: { color: T.muted, textTransform: "uppercase", fontSize: 11.5, letterSpacing: 1.5 },
    infoVal: { color: T.text, wordBreak: "break-word" },

    skillRow: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "150px 1fr",
      gap: isMobile ? 10 : 24,
      padding: "20px 0",
      borderBottom: `1px solid ${T.hair}`,
      alignItems: "start",
    },
    skillGroup: { color: T.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: 2, paddingTop: 4 },
    skillItems: { display: "flex", flexWrap: "wrap", gap: 8 },
    skillChip: { padding: "5px 11px", border: `1px solid ${T.chipBd}`, fontSize: 13.5,
      color: T.text, background: T.chipBg },

    projectsHeader: { display: "flex", justifyContent: "space-between", alignItems: "baseline",
      marginBottom: 32, flexWrap: "wrap", gap: 12 },
    projectsHint: { fontSize: 12, color: T.muted, letterSpacing: 1.5, textTransform: "uppercase" },
    projList: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
      gridAutoRows: "1fr",
      gap: 16,
      alignItems: "stretch",
    },


    eduGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: isMobile ? 36 : 48,
    },
    eduLabel: { fontSize: 11, color: T.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 },
    eduItem: { padding: "14px 0", borderBottom: `1px solid ${T.hair}` },
    eduTitle: { fontSize: 15.5, color: T.text, marginBottom: 3 },
    eduSub: { fontSize: 12.5, color: T.muted },

    contactBox: { border: `1px solid ${T.hair}`, background: T.cardBg, padding: isMobile ? 20 : 32 },
    contactRow: {
      display: "flex", flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? 4 : 16,
      padding: "14px 0",
      borderBottom: `1px solid ${T.hair}`,
      alignItems: isMobile ? "flex-start" : "baseline",
    },
    contactKey: { color: T.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: 2, width: isMobile ? "auto" : 110 },
    contactVal: { color: T.text, fontSize: 15.5 },

    footer: { marginTop: isMobile ? 64 : 96, paddingTop: 32, borderTop: `1px solid ${T.hair}`,
      fontSize: 12, color: T.muted, letterSpacing: 1.5, display: "flex",
      justifyContent: "space-between", flexWrap: "wrap", gap: 20 },
  };

  const projectsHintText = lang === "pt"
    ? "Pressione ` ou Ctrl+K para abrir o terminal"
    : "Press ` or Ctrl+K to open the terminal";
  const heroProofs = lang === "pt"
    ? [
        { k: "Foco", v: "APIs, integracoes e automacoes com Python" },
        { k: "Base", v: "FastAPI, Django, PostgreSQL e SQLAlchemy" },
        { k: "Entrega", v: "Sistemas reais em producao e projetos open source" },
        { k: "Extra", v: "IA aplicada quando ela melhora o produto" },
      ]
    : [
        { k: "Focus", v: "APIs, integrations and automations with Python" },
        { k: "Core", v: "FastAPI, Django, PostgreSQL and SQLAlchemy" },
        { k: "Delivery", v: "Real systems in production and open source projects" },
        { k: "Extra", v: "Applied AI when it improves the product" },
      ];

  return (
    <div style={s.root}>
      {/* Top Nav */}
      <header style={s.top}>
        <span style={s.brand}>{P.handle}</span>
        <span style={{ color: T.dim }}>//</span>
        {!isMobile && <span>{clock}</span>}
        <nav style={s.navLinks} aria-label={lang === "pt" ? "Navegacao principal" : "Primary navigation"}>
          <button type="button" style={s.navLink} onClick={() => scrollTo("about")}>{t.nav_about}</button>
          <button type="button" style={s.navLink} onClick={() => scrollTo("skills")}>{t.nav_skills}</button>
          <button type="button" style={s.navLink} onClick={() => scrollTo("projects")}>{t.nav_projects}</button>
          <button type="button" style={s.navLink} onClick={() => scrollTo("edu")}>{t.nav_edu}</button>
          <button type="button" style={s.navLink} onClick={() => scrollTo("contact")}>{t.nav_contact}</button>
        </nav>
        <div style={s.chips}>
          <button type="button" style={s.termHint} onClick={() => openTerminal()}>
            <span style={{ opacity: 0.6 }}>{">_"}</span>
            <span style={s.kbd}>Ctrl+K</span>
          </button>
          <button type="button" style={s.chip} onClick={toggleLang}>{lang.toUpperCase()}</button>
          <button
            type="button"
            style={s.chip}
            onClick={toggleTheme}
            aria-label={lang === "pt" ? "Alternar tema" : "Toggle theme"}
          >
            {theme === "dark" ? "theme: dark" : "theme: light"}
          </button>
        </div>
      </header>

      {/* Content */}
      <main id="content" style={s.scroll} ref={scrollRef}>
        <div style={s.inner}>
          {/* Hero */}
          <section style={s.hero} aria-label={lang === "pt" ? "Apresentacao" : "Introduction"}>
            <div style={s.heroMeta}>
              <span>portfolio / 2026</span>
              <span style={{ color: T.dim }}>/</span>
              <span>{lang === "pt" ? P.location_pt : P.location_en}</span>
              {!isMobile && <><span style={{ color: T.dim }}>/</span><span>v1.0</span></>}
            </div>
            <div style={s.heroHello}>{t.hello}</div>
            <h1 style={s.heroName}>{P.name}.</h1>
            <div style={s.heroRole}>
              <span style={s.heroRoleHL}>{lang === "pt" ? P.role_pt : P.role_en}</span>
              <span style={{ color: T.dim }}> / {t.intro_role}</span>
            </div>
            <div style={s.heroDesc}>
              {lang === "pt" ? P.hero_desc_pt : P.hero_desc_en}
            </div>
            <div style={s.heroCtaRow}>
              <button style={s.heroCta} onClick={() => scrollTo("projects")}>
                {t.cta_primary} ->
              </button>
              <button style={s.heroCta2} onClick={() => scrollTo("contact")}>
                {t.cta_secondary}
              </button>
              <span style={{...s.heroStatus, marginLeft: isMobile ? 0 : 12}}>
                <span style={s.statusDot}></span>
                <span>{lang === "pt" ? P.status_pt : P.status_en}</span>
              </span>
            </div>
            <div style={s.heroProofs}>
              {heroProofs.map((item, i) => (
                <div key={i} style={s.heroProof}>
                  <span style={s.heroProofK}>{item.k}</span>
                  <span style={s.heroProofV}>{item.v}</span>
                </div>
              ))}
            </div>
          </section>

          {/* About */}
          <section style={s.section} data-sec="about" id="about" aria-label={t.about_title}>
            <div style={s.secLabel}>
              <span style={s.secLabelNum}>01</span>
              <span>- {t.about_title}</span>
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
          </section>

          {/* Skills */}
          <section style={s.section} data-sec="skills" id="skills" aria-label={t.skills_title}>
            <div style={s.secLabel}>
              <span style={s.secLabelNum}>02</span>
              <span>- {t.skills_title}</span>
              <span style={s.secLine}></span>
            </div>
            <div>
              {P.skills.map((g, i) => (
                <div key={i} style={s.skillRow}>
                  <div style={s.skillGroup}>{lang === "pt" ? (g.title_pt || g.group) : (g.title_en || g.group)}</div>
                  <div style={s.skillItems}>
                    {(g.tags || g.items || []).map((it, j) => <span key={j} style={s.skillChip}>{it}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section style={s.section} data-sec="projects" id="projects" aria-label={t.projects_title}>
            <div style={s.secLabel}>
              <span style={s.secLabelNum}>03</span>
              <span>- {t.projects_title} ({String(P.projects.length).padStart(2, "0")})</span>
              <span style={s.secLine}></span>
            </div>
            <div style={s.projectsHeader}>
              <h2 style={s.secTitle}>{t.projects_title}</h2>
              {!isMobile && <span style={s.projectsHint}>{projectsHintText}</span>}
            </div>
            <div style={s.projList}>
              {P.projects.map((p, i) => (
                <ProjectCard key={p.id} p={p} idx={i} lang={lang} T={T}
                  theme={theme} onOpenProject={openProjectModal} isMobile={isMobile} />
              ))}
            </div>

          </section>

          {/* Education */}
          <section style={s.section} data-sec="edu" id="edu" aria-label={t.edu_title}>
            <div style={s.secLabel}>
              <span style={s.secLabelNum}>04</span>
              <span>- {t.edu_title}</span>
              <span style={s.secLine}></span>
            </div>
            <div style={s.eduGrid}>
              <div>
                <div style={s.eduLabel}>{t.edu_title}</div>
                {P.education.map((e, i) => (
                  <div key={i} style={s.eduItem}>
                    <div style={s.eduTitle}>{e.title}</div>
                    <div style={s.eduSub}>{e.sub} | {e.period}</div>
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
          </section>

          {/* Contact */}
          <section style={s.section} data-sec="contact" id="contact" aria-label={t.contact_title}>
            <div style={s.secLabel}>
              <span style={s.secLabelNum}>05</span>
              <span>- {t.contact_title}</span>
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
          </section>

          <footer style={s.footer}>
            <span>(c) {new Date().getFullYear()} {P.name}</span>
            <span>{lang === "pt" ? "construido com html + mono" : "built with html + mono"}</span>
          </footer>
        </div>
      </main>

      {selectedProject && (
        <ProjectModal project={selectedProject} lang={lang} T={T} theme={theme}
          onClose={closeProjectModal} />
      )}

      {termOpen && (
        <TerminalOverlay theme={theme} lang={lang}
          onClose={closeTerminal}
          onToggleTheme={toggleTheme}
          onToggleLang={toggleLang}
          onNav={navFromTerm}
          initialCommand={termInitialCommand} />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Portfolio />);
