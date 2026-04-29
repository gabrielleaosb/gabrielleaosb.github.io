// Shared data for all 3 portfolio variations — dados reais do repo gabrielleaosb.github.io
const PORTFOLIO = {
  name: "Gabriel Leão",
  full_name: "Gabriel Leão Salles Bagetti",
  handle: "gabrielleaosb",
  role_pt: "Desenvolvedor de Software",
  role_en: "Software Developer",
  subrole_pt: "Backend & IA",
  subrole_en: "Backend & AI",
  location_pt: "Maceió, Alagoas — BR",
  location_en: "Maceió, Alagoas — BR",
  email: "gabrielleaosb@gmail.com",
  github: "https://github.com/gabrielleaosb",
  github_handle: "gabrielleaosb",
  linkedin: "https://linkedin.com/in/gabriellsbagetti",
  linkedin_handle: "gabriellsbagetti",
  whatsapp: "https://wa.me/5582991487729",
  status_pt: "Disponível para oportunidades",
  status_en: "Available for opportunities",

  hero_desc_pt: "Backend Python com foco em APIs, automações e sistemas web que resolvem operação real. Trabalho principalmente com arquitetura prática, persistência, integrações e IA aplicada ao produto.",
  hero_desc_en: "Python backend developer focused on APIs, automations and web systems that solve real operational problems. I work mainly with practical architecture, persistence, integrations and AI applied to products.",

  stats: [
    { num: "7º", pt: "Período — SI / CESMAC", en: "Semester — IS / CESMAC" },
    { num: "3+", pt: "Anos Desenvolvendo", en: "Years Developing" },
    { num: "5+", pt: "Projetos Concluídos", en: "Projects Completed" },
    { num: "∞",  pt: "Vontade de Aprender",  en: "Will to Learn" },
  ],

  about_pt: [
    "Sou desenvolvedor Python com foco em backend e sistemas web. Gosto de construir APIs, integrar serviços e pensar em como as peças de uma aplicação se conectam — do banco de dados à lógica de negócio.",
    "Tenho explorado IA aplicada dentro de projetos reais — trabalhando com LLMs, automações e agentes. É uma área que cada vez mais faz parte do que construo.",
    "Curso Sistemas de Informação no CESMAC (7º período) e estou sempre construindo algo novo. Cada projeto é uma oportunidade de resolver um problema de verdade.",
  ],
  about_en: [
    "I'm a Python developer focused on backend and web systems. I enjoy building APIs, integrating services and thinking about how the parts of an application fit together — from the database to business logic.",
    "I've been exploring applied AI in real projects — working with LLMs, automations and agents. It's an area that increasingly shapes what I build.",
    "Currently studying Information Systems at CESMAC (7th semester) and always building something new. Every project is a chance to solve a real problem.",
  ],

  skills: [
    {
      id: "backend",
      title_pt: "Back-End",
      title_en: "Backend Systems",
      desc_pt: "APIs, autenticação, integrações e regras de negócio para sistemas web reais.",
      desc_en: "APIs, authentication, integrations and business logic for real web systems.",
      tags: ["Python", "FastAPI", "Django", "DRF", "Flask", "REST APIs", "JWT", "Celery"],
    },
    {
      id: "ai",
      title_pt: "IA Aplicada",
      title_en: "Applied AI",
      desc_pt: "LLMs, automações e fluxos orientados por IA aplicados a produtos e operações.",
      desc_en: "LLMs, automations and AI-driven workflows applied to products and operations.",
      tags: ["LangChain", "LLMs", "Ollama", "Llama 3", "Agents", "Automation"],
    },
    {
      id: "db",
      title_pt: "Dados & Persistência",
      title_en: "Data & Persistence",
      desc_pt: "Modelagem, persistência e evolução de schema para aplicações transacionais.",
      desc_en: "Modeling, persistence and schema evolution for transactional applications.",
      tags: ["PostgreSQL", "MySQL", "MongoDB", "SQLAlchemy Async", "Alembic", "Redis", "SQLite"],
    },
    {
      id: "frontend",
      title_pt: "Front-End de Suporte",
      title_en: "Frontend Support",
      desc_pt: "Interfaces para dar forma ao produto, com foco em clareza, responsividade e integração com APIs.",
      desc_en: "Interfaces that shape the product, focused on clarity, responsiveness and API integration.",
      tags: ["React 18", "Vite", "TailwindCSS", "JavaScript", "HTML", "CSS"],
    },
    {
      id: "devops",
      title_pt: "Entrega & Qualidade",
      title_en: "Delivery & Quality",
      desc_pt: "Deploy, containers, testes e fluxo de entrega com foco em manutenção prática.",
      desc_en: "Deploy, containers, tests and delivery flow focused on practical maintenance.",
      tags: ["Docker", "Docker Compose", "Caddy", "Git", "CI/CD", "Pytest", "Integration Tests", "Bash"],
    },
  ],

  projects: [
    {
      id: "nucleo-zero-gestao",
      n: "01",
      name: "Núcleo Zero Gestão",
      year: "2026",
      meta_pt: "Sistema Interno · FastAPI · PostgreSQL",
      meta_en: "Internal System · FastAPI · PostgreSQL",
      status_pt: "Em Produção",
      status_en: "Production",
      statusKind: "live",
      color: "slate",
      tags: ["React 18", "Vite", "TailwindCSS", "FastAPI", "PostgreSQL", "SQLAlchemy Async", "Alembic", "JWT", "Docker Compose", "Caddy"],
      desc_pt: "Sistema interno de gestão desenvolvido para a Núcleo Zero, centralizando projetos, tarefas e operação em um único produto. Arquitetado com FastAPI, PostgreSQL, SQLAlchemy async, JWT com refresh token e deploy via Docker Compose, atende uma operação real com módulos como kanban, agenda, fórum, orçamento, Gantt, EAP, horas, notificações e busca global.",
      desc_en: "Internal management system built for Núcleo Zero, centralizing projects, tasks and operations in a single product. Architected with FastAPI, PostgreSQL, async SQLAlchemy, JWT with refresh token and Docker Compose deployment, it supports a real operation with modules such as kanban, agenda, forum, budgeting, Gantt, WBS, time tracking, notifications and global search.",
      highlights_pt: [
        "Auth JWT com access e refresh token",
        "Migrations e persistência com Alembic + PostgreSQL",
        "Deploy com Docker Compose, Caddy e fluxo operacional em VPS",
      ],
      highlights_en: [
        "JWT auth with access and refresh token",
        "Migrations and persistence with Alembic + PostgreSQL",
        "Deployment with Docker Compose, Caddy and VPS operational flow",
      ],
      links: [
        { label_pt: "Acessar Login", label_en: "Access Login", url: "https://gestao.nucleozero.com.br" },
      ],
    },
    {
      id: "emenu",
      n: "02",
      name: "e-Menu Virtual",
      year: "2026",
      meta_pt: "SaaS Multi-tenant · PHP · MySQL",
      meta_en: "Multi-tenant SaaS · PHP · MySQL",
      status_pt: "SaaS",
      status_en: "SaaS",
      statusKind: "live",
      color: "orange",
      tags: ["PHP", "MySQL", "Bootstrap 5", "jQuery", ".htaccess", "Multi-tenant"],
      desc_pt: "Plataforma SaaS para cardápios digitais de múltiplos restaurantes em um único domínio. Estruturei a aplicação em modelo multi-tenant com isolamento por restaurante, painel administrativo, CRUD completo e rotas amigáveis em hospedagem compartilhada.",
      desc_en: "SaaS platform for digital menus of multiple restaurants on a single domain. I structured the application around a multi-tenant model with tenant isolation, admin panel, full CRUD and friendly routes on shared hosting.",
      highlights_pt: [
        "Arquitetura multi-tenant com isolamento por restaurante",
        "CRUD administrativo completo no mesmo domínio",
        "Rotas amigáveis com .htaccess em hospedagem compartilhada",
      ],
      highlights_en: [
        "Multi-tenant architecture with tenant isolation",
        "Complete admin CRUD on the same domain",
        "Friendly routes with .htaccess on shared hosting",
      ],
      links: [
        { label_pt: "Ver Site", label_en: "View Site", url: "https://emenuvirtual.com.br/site" },
        { label_pt: "Admin Login", label_en: "Admin Login", url: "https://emenuvirtual.com.br", ghost: true },
      ],
    },
    {
      id: "ai-analyst",
      n: "03",
      name: "AI Analyst",
      year: "2025",
      meta_pt: "IA Local · Análise de Dados · Django",
      meta_en: "Local AI · Data Analysis · Django",
      status_pt: "Open Source",
      status_en: "Open Source",
      statusKind: "oss",
      color: "purple",
      tags: ["Django", "LangChain", "Llama 3", "Ollama", "Pandas", "Celery", "REST API"],
      desc_pt: "Plataforma Django para análise automatizada de datasets CSV com IA local. Combinei processamento assíncrono, API REST e geração de insights com Llama 3 via Ollama para manter dados sensíveis na própria máquina do usuário.",
      desc_en: "Django platform for automated CSV dataset analysis with local AI. I combined asynchronous processing, REST API and insight generation with Llama 3 through Ollama to keep sensitive data on the user's own machine.",
      highlights_pt: [
        "Processamento assíncrono para análises em background",
        "Integração de LLM local via Ollama + Llama 3",
        "Privacidade preservada com execução local dos dados",
      ],
      highlights_en: [
        "Asynchronous processing for background analysis",
        "Local LLM integration through Ollama + Llama 3",
        "Privacy preserved with local data execution",
      ],
      links: [
        { label_pt: "Ver no GitHub", label_en: "View on GitHub", url: "https://github.com/gabrielleaosb/ai_analyst" },
      ],
    },
    {
      id: "knucklebones",
      n: "04",
      name: "Knucklebones",
      year: "2026",
      meta_pt: "Web Game · P2P em Tempo Real · JavaScript",
      meta_en: "Web Game · Real-time P2P · JavaScript",
      status_pt: "Live",
      status_en: "Live",
      statusKind: "live",
      color: "red",
      tags: ["JavaScript", "HTML/CSS", "PeerJS", "P2P", "Game Logic"],
      desc_pt: "Jogo de dados estratégico com partidas P2P em tempo real direto no navegador. O foco foi desenhar lógica de jogo, sincronização entre jogadores e uma experiência leve sem depender de backend dedicado.",
      desc_en: "Strategic dice game with real-time P2P matches directly in the browser. The focus was designing game logic, player synchronization and a lightweight experience without relying on a dedicated backend.",
      highlights_pt: [
        "Sincronização P2P em tempo real no navegador",
        "Lógica de jogo autoral e sistema de pontuação próprio",
        "Experiência sem backend dedicado para jogar imediatamente",
      ],
      highlights_en: [
        "Real-time P2P synchronization in the browser",
        "Original game logic and custom scoring system",
        "No dedicated backend required to start playing",
      ],
      links: [
        { label_pt: "Jogar Agora", label_en: "Play Now", url: "https://kbones.xyz/" },
      ],
    },
    {
      id: "lt-manager",
      n: "05",
      name: "LT Manager",
      year: "2025",
      meta_pt: "Web App · WebSockets · Full Stack",
      meta_en: "Web App · WebSockets · Full Stack",
      status_pt: "Em Desenvolvimento",
      status_en: "In Development",
      statusKind: "wip",
      color: "amber",
      tags: ["Flask", "Canvas API", "WebSockets", "Real-time", "JavaScript"],
      desc_pt: "Plataforma para RPG de mesa online em tempo real, com canvas interativo, salas e sessões ao vivo. O projeto explora comunicação em tempo real, organização full stack e modelagem de uma experiência colaborativa mais complexa.",
      desc_en: "Platform for playing tabletop RPG online in real time, with interactive canvas, rooms and live sessions. The project explores real-time communication, full-stack organization and modeling a more complex collaborative experience.",
      highlights_pt: [
        "Comunicação em tempo real com WebSockets",
        "Canvas interativo para sessões e mapas",
        "Modelagem de salas, personagens e sessão colaborativa",
      ],
      highlights_en: [
        "Real-time communication with WebSockets",
        "Interactive canvas for sessions and maps",
        "Modeling of rooms, characters and collaborative sessions",
      ],
      links: [
        { label_pt: "Ver no GitHub", label_en: "View on GitHub", url: "https://github.com/gabrielleaosb/LT-Manager" },
      ],
    },
    {
      id: "discord-bot",
      n: "06",
      name: "Discord RPG Bot",
      year: "2024",
      meta_pt: "Bot Assíncrono · MongoDB · Python",
      meta_en: "Async Bot · MongoDB · Python",
      status_pt: "Hobby",
      status_en: "Hobby",
      statusKind: "hobby",
      color: "discord",
      tags: ["Python", "Discord.py", "MongoDB", "Motor (Async)", "JSON"],
      desc_pt: "Bot para Discord com economia, progressão e batalhas de personagens, construído em Python assíncrono com MongoDB. O projeto exigiu modelagem de estado, comandos interativos e persistência para uma base de funcionalidades relativamente ampla.",
      desc_en: "Discord bot with economy, progression and character battles, built with asynchronous Python and MongoDB. The project required state modeling, interactive commands and persistence for a relatively broad feature set.",
      highlights_pt: [
        "Bot assíncrono com persistência em MongoDB",
        "Modelagem de economia, progressão e combate",
        "Conjunto amplo de comandos e estado de jogador",
      ],
      highlights_en: [
        "Asynchronous bot with MongoDB persistence",
        "Modeling of economy, progression and combat",
        "Broad command set and player state management",
      ],
      links: [
        { label_pt: "Ver no GitHub", label_en: "View on GitHub", url: "https://github.com/gabrielleaosb/JubaBot" },
      ],
    },
  ],

  courses: [
    { platform: "Udemy", status_pt: "Completo", status_en: "Completed", name: "Django & Django REST Framework", author: "Luiz Otávio Miranda", done: true },
    { platform: "Udemy", status_pt: "Completo", status_en: "Completed", name: "Análise de Dados com Python e Pandas", author: "Dalton Peixoto", done: true },
    { platform: "Udemy", status_pt: "Completo", status_en: "Completed", name: "O Curso Completo de Banco de Dados e SQL", author: "Catalogo Cursos Online", done: true },
  ],

  education: [
    {
      period: "2022 → 2026",
      title: "Sistemas de Informação",
      title_en: "Information Systems",
      sub_pt: "CESMAC — Centro de Estudos Superiores de Maceió · 7º Período · Noturno",
      sub_en: "CESMAC — Centro de Estudos Superiores de Maceió · 7th Semester · Evening",
      badge_pt: "Em Andamento",
      badge_en: "In Progress",
      current: true,
    },
  ],

  // Terminal filesystem (shared with v1 and v2)
  fs: {
    "README.md":    "Desenvolvedor Python • Backend & IA\nMaceió, AL — Brasil\n$ help",
    "about.txt":    "Python, backend, IA aplicada.\n3+ anos construindo. SI / CESMAC 7º período.",
    "projects/":    null,
    "skills.json":  '{"backend":"Python/Django","ai":"LangChain/Ollama","db":"PostgreSQL+Mongo"}',
    "contact.yml":  "email: gabrielleaosb@gmail.com\ngithub: gabrielleaosb\nwhatsapp: +55 82 99148-7729",
    "experience/":  null,
    "education/":   null,
  },
};

// ──────────────────────────────────────────────────────────
// Compatibility shim: inject legacy field names that
// portfolio-final.jsx / portfolio-v*.jsx expect.
// ──────────────────────────────────────────────────────────

// skills: provide group/items aliases
PORTFOLIO.skills.forEach(s => {
  s.group = s.title_en;
  s.items = s.tags;
});

// projects: provide tagline, link, status aliases
PORTFOLIO.projects.forEach(p => {
  p.tagline_pt = p.meta_pt;
  p.tagline_en = p.meta_en;
  p.status = p.statusKind === "wip" ? "wip" : "live";
  p.link = (p.links && p.links[0] && p.links[0].url) || null;
});

// education: provide sub alias
PORTFOLIO.education.forEach(e => {
  e.sub = e.sub_pt;
});

// experience stub (no data in real portfolio — leave empty)
if (!PORTFOLIO.experience) PORTFOLIO.experience = [];

window.PORTFOLIO = PORTFOLIO;

// ──────────────────────────────────────────────────────────
// I18N — UI strings for v1/v2/v3/final
// ──────────────────────────────────────────────────────────
const I18N = {
  pt: {
    nav_about: "sobre",
    nav_skills: "stack",
    nav_projects: "projetos",
    nav_edu: "formação",
    nav_contact: "contato",
    hello: "Olá, sou",
    intro_role: "backend & IA",
    cta_primary: "Ver projetos",
    cta_secondary: "Entre em contato",
    about_title: "Sobre",
    skills_title: "Stack técnica",
    projects_title: "Projetos selecionados",
    edu_title: "Formação",
    contact_title: "Contato",
    courses: "Cursos",
    view_live: "Ver ao vivo",
    in_dev: "Em desenvolvimento",
  },
  en: {
    nav_about: "about",
    nav_skills: "stack",
    nav_projects: "projects",
    nav_edu: "education",
    nav_contact: "contact",
    hello: "Hi, I'm",
    intro_role: "backend & AI",
    cta_primary: "View projects",
    cta_secondary: "Get in touch",
    about_title: "About",
    skills_title: "Technical stack",
    projects_title: "Selected projects",
    edu_title: "Education",
    contact_title: "Contact",
    courses: "Courses",
    view_live: "View live",
    in_dev: "In development",
  },
};

window.I18N = I18N;
