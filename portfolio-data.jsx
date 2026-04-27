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

  hero_desc_pt: "Desenvolvedor de Software especializado em Backend & IA. Construo sistemas web com Python e exploro IA aplicada em projetos reais.",
  hero_desc_en: "Software Developer specialized in Backend & AI. I build web systems with Python and explore applied AI in real projects.",

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
      title_en: "Back-End Development",
      desc_pt: "Arquitetura escalável com tarefas assíncronas, mensageria e design orientado a performance.",
      desc_en: "Scalable architecture with async tasks, messaging and performance-oriented design.",
      tags: ["Python", "Django", "DRF", "Flask", "FastAPI", "Celery", "Redis", "PHP"],
    },
    {
      id: "ai",
      title_pt: "IA & LLMs",
      title_en: "AI & LLMs",
      desc_pt: "Aplicações inteligentes com modelos de linguagem avançados, agentes autônomos e IA generativa.",
      desc_en: "Intelligent applications with advanced language models, autonomous agents and generative AI.",
      tags: ["LangChain", "LLMs", "Ollama", "Llama 3", "Agents", "Generative AI"],
    },
    {
      id: "db",
      title_pt: "Banco de Dados",
      title_en: "Databases",
      desc_pt: "Modelagem, otimização e integração de bancos relacionais e NoSQL para sistemas de alta disponibilidade.",
      desc_en: "Modeling, optimization and integration of relational and NoSQL databases for high-availability systems.",
      tags: ["PostgreSQL", "MySQL", "MongoDB", "SQL", "ORM", "SQLite"],
    },
    {
      id: "frontend",
      title_pt: "Front-End",
      title_en: "Front-End",
      desc_pt: "Interfaces modernas, responsivas e interativas com foco em experiência do usuário. Interface gráfica nativa com Flet (Python).",
      desc_en: "Modern, responsive and interactive interfaces focused on user experience. Native GUI with Flet (Python).",
      tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "Tailwind", "Flet", "Vue", "Next.js"],
    },
    {
      id: "data",
      title_pt: "Análise de Dados",
      title_en: "Data Analysis",
      desc_pt: "Engenharia, tratamento e visualização de dados com aplicação de IA para tomada de decisões.",
      desc_en: "Data engineering, processing and visualization with AI applied for decision-making.",
      tags: ["Pandas", "NumPy", "Matplotlib", "Plotly"],
    },
    {
      id: "devops",
      title_pt: "DevOps & Qualidade",
      title_en: "DevOps & Quality",
      desc_pt: "Controle de versão, CI/CD, testes automatizados unitários e de integração com foco em confiabilidade.",
      desc_en: "Version control, CI/CD, unit and integration automated tests focused on reliability.",
      tags: ["Git", "GitHub", "CI/CD", "Docker", "Pytest", "Selenium", "Bash"],
    },
  ],

  projects: [
    {
      id: "emenu",
      n: "01",
      name: "e-Menu Virtual",
      year: "2026",
      meta_pt: "Multi-tenant · PHP · Hospedagem Compartilhada",
      meta_en: "Multi-tenant · PHP · Shared Hosting",
      status_pt: "SaaS",
      status_en: "SaaS",
      statusKind: "live",
      color: "orange",
      tags: ["PHP", "MySQL", "Bootstrap 5", "jQuery", ".htaccess", "Multi-tenant"],
      desc_pt: "Plataforma SaaS para cardápios digitais de múltiplos restaurantes em um único domínio. Painel admin isolado por restaurante, CRUD completo e URLs amigáveis via .htaccess.",
      desc_en: "SaaS platform for digital menus of multiple restaurants on a single domain. Admin panel isolated per restaurant, full CRUD and friendly URLs via .htaccess.",
      links: [
        { label_pt: "Ver Site", label_en: "View Site", url: "https://emenuvirtual.com.br/site" },
        { label_pt: "Admin Login", label_en: "Admin Login", url: "https://emenuvirtual.com.br", ghost: true },
      ],
    },
    {
      id: "ai-analyst",
      n: "02",
      name: "AI Analyst",
      year: "2025",
      meta_pt: "IA · Análise de Dados · Django",
      meta_en: "AI · Data Analysis · Django",
      status_pt: "Open Source",
      status_en: "Open Source",
      statusKind: "oss",
      color: "purple",
      tags: ["Django", "LangChain", "Llama 3", "Ollama", "Pandas", "Celery", "REST API"],
      desc_pt: "Plataforma Django para análise automatizada de datasets CSV com IA local. Geração de insights via Llama 3 com processamento em background — seus dados nunca saem da máquina.",
      desc_en: "Django platform for automated CSV dataset analysis with local AI. Insight generation via Llama 3 with background processing — your data never leaves your machine.",
      links: [
        { label_pt: "Ver no GitHub", label_en: "View on GitHub", url: "https://github.com/gabrielleaosb/ai_analyst" },
      ],
    },
    {
      id: "knucklebones",
      n: "03",
      name: "Knucklebones",
      year: "2026",
      meta_pt: "Web Game · P2P · JavaScript",
      meta_en: "Web Game · P2P · JavaScript",
      status_pt: "Live",
      status_en: "Live",
      statusKind: "live",
      color: "red",
      tags: ["JavaScript", "HTML/CSS", "PeerJS", "P2P", "Game Logic"],
      desc_pt: "Jogo de dados estratégico inspirado no universo de Cult of the Lamb. Partidas P2P em tempo real sem servidor — mecânicas originais de pontuação, só abrir e jogar.",
      desc_en: "Strategic dice game inspired by the Cult of the Lamb universe. Real-time P2P matches with no server — original scoring mechanics, just open and play.",
      links: [
        { label_pt: "Jogar Agora", label_en: "Play Now", url: "https://kbones.xyz/" },
      ],
    },
    {
      id: "lt-manager",
      n: "04",
      name: "LT Manager",
      year: "2025",
      meta_pt: "Web App · Real-time · Full Stack",
      meta_en: "Web App · Real-time · Full Stack",
      status_pt: "Em Desenvolvimento",
      status_en: "In Development",
      statusKind: "wip",
      color: "amber",
      tags: ["Flask", "Canvas API", "WebSockets", "Real-time", "JavaScript"],
      desc_pt: "Plataforma para jogar RPG de mesa online em tempo real. Canvas interativo, sistema de personagens, salas e sessões ao vivo — base sólida e arquitetura bem definida.",
      desc_en: "Platform for playing tabletop RPG online in real time. Interactive canvas, character system, rooms and live sessions — solid base and well-defined architecture.",
      links: [
        { label_pt: "Ver no GitHub", label_en: "View on GitHub", url: "https://github.com/gabrielleaosb/LT-Manager" },
      ],
    },
    {
      id: "discord-bot",
      n: "05",
      name: "Discord RPG Bot",
      year: "2024",
      meta_pt: "Discord Bot · MongoDB · Python",
      meta_en: "Discord Bot · MongoDB · Python",
      status_pt: "Hobby",
      status_en: "Hobby",
      statusKind: "hobby",
      color: "discord",
      tags: ["Python", "Discord.py", "MongoDB", "Motor (Async)", "JSON"],
      desc_pt: "Bot de coleta e batalha de personagens para Discord. Roll com raridades, estrelas e poder, economia de moedas, daily, work, ranking e perfis — tudo com MongoDB e Python async.",
      desc_en: "Character collection and battle bot for Discord. Roll with rarities, stars and power, coin economy, daily, work, ranking and profiles — all with MongoDB and async Python.",
      links: [
        { label_pt: "Ver no GitHub", label_en: "View on GitHub", url: "https://github.com/gabrielleaosb/JubaBot" },
      ],
    },
  ],

  courses: [
    { platform: "Udemy", status_pt: "Completo", status_en: "Completed", name: "Django & Django REST Framework", author: "Luiz Otávio Miranda", done: true },
    { platform: "Udemy", status_pt: "Completo", status_en: "Completed", name: "Flet Essentials — Interface Gráfica com Python", author: "Dalton Peixoto", done: true },
    { platform: "Curso em Vídeo", status_pt: "Completo", status_en: "Completed", name: "Python Mundo 1, 2 e 3", author: "Gustavo Guanabara", done: true },
    { platform: "Udemy", status_pt: "Completo", status_en: "Completed", name: "Análise de Dados com Python e Pandas", author: "Dalton Peixoto", done: true },
    { platform: "Udemy", status_pt: "Completo", status_en: "Completed", name: "O Curso Completo de Banco de Dados e SQL", author: "Catalogo Cursos Online", done: true },
    { platform: "Udemy", status_pt: "Em Andamento", status_en: "In Progress", name: "Certificação Amazon AWS Cloud Practitioner", author: "Andre Iacono", done: false },
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
    {
      period: "2021",
      title: "Ensino Médio Completo",
      title_en: "High School Diploma",
      sub_pt: "Colégio Santa Úrsula · Maceió, Alagoas",
      sub_en: "Colégio Santa Úrsula · Maceió, Alagoas",
      badge_pt: "Concluído",
      badge_en: "Completed",
      current: false,
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
