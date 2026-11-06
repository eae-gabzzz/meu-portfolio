const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];
$("#year").textContent = new Date().getFullYear();
const projectDialog = $("#projectDialog");
const terminalOutput = $("#terminalOutput");
let activeProject = null;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
requestAnimationFrame(() => document.body.classList.add("is-ready"));

// Mobile navigation
const menu = $(".menu-toggle"), nav = $(".nav");
menu.setAttribute("aria-expanded", "false");
menu.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(isOpen));
  updateMenuLabel();
});
$$(".nav a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
  updateMenuLabel();
}));
addEventListener("keydown", event => {
  if (event.key === "Escape") {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    updateMenuLabel();
  }
});

// Theme switch: dark by default; preference is remembered in this browser.
const themeButton = $("#themeToggle");
const savedTheme = localStorage.getItem("gb-theme");
if (savedTheme === "light") document.body.classList.add("light");
function updateThemeIcon(){ $(".theme-icon").textContent = document.body.classList.contains("light") ? "☾" : "☼"; }
updateThemeIcon();
themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("gb-theme", document.body.classList.contains("light") ? "light" : "dark");
  updateThemeIcon();
});

// Bilingual interface. Portuguese is the default.
const translations = {
  en: {
    nav_about:"About",nav_skills:"Stack",nav_exp:"Experience",nav_projects:"Projects",nav_terminal:"Terminal",nav_education:"Education",nav_contact:"Contact ↗",menu_open:"Open menu",menu_close:"Close menu",language_toggle:"Change language",theme_toggle:"Toggle theme",dialog_close:"Close project details",page_title:"Gabriel Balbino Malaquias — Portfolio",
    hero_eyebrow:"DEVELOPMENT • AUTOMATION • AI",hero_availability:"OPEN TO OPPORTUNITIES",hero_hi:"Hello, I'm",hero_desc:"Software Engineering student, curious about technology and motivated by turning real challenges into digital solutions.",hero_btn1:"Explore projects",hero_btn2:"Let's talk",hero_status:"Building useful things",hero_location:"BRAZIL",hero_building:"ALWAYS BUILDING",hero_country_label:"LOCATION",hero_country:"BRAZIL",loader_status:"PREPARING EXPERIENCE",profile_status_label:"Status:",profile_status:"Open to opportunities",profile_focus_label:"Focus:",profile_focus:"Software Engineering",profile_interest_label:"Interest:",profile_interest:"AI & Automation",terminal_online:"SYSTEM ONLINE",terminal_ready:"PROFILE LOADED",scroll:"SCROLL TO EXPLORE",
    label_about:"ABOUT ME",about_title:"Curiosity that<br><em>turns into creation.</em>",about_p1:"I'm Gabriel Balbino Malaquias, a Software Engineering student at UniCesumar and a procurement professional at Everest Engenharia. My path combines hands-on experience, process thinking and a passion for technology.",about_p2:"I like learning by building: exploring programming, automation, data analysis and artificial intelligence to create tools that solve real problems. I also enjoy <strong>vibe coding</strong> — turning ideas into prototypes, testing quickly and improving the solution.",stat_degree:"Software Engineering student",stat_projects:"Personal projects",stat_learning:"Always learning",
    label_skills:"STACK & TOOLS",skills_title:"Technology to<br><em>bring ideas to life.</em>",skills_desc:"Knowledge I've been studying and applying in projects. This list reflects my current learning journey — always learning and improving.",skill_code:"Development",skill_data:"Data & applications",skill_ai:"AI & productivity",skill_tools:"Tools",skill_note:"Skills at different levels of practice. I prefer to be transparent about what I'm learning rather than invent proficiency percentages.",category_programming:"PROGRAMMING",category_web:"WEB DEVELOPMENT",category_data:"DATA & ANALYSIS",category_apps:"APPLICATIONS & APIS",category_tools:"TOOLS",category_ai:"AI & PRODUCTIVITY",
    skill_python:"Programming and building solutions.",skill_c:"Programming fundamentals.",skill_js:"Interactivity for web experiences.",skill_html:"Structuring web pages.",skill_css:"Styling and composing interfaces.",skill_pandas:"Data analysis and manipulation.",skill_streamlit:"Interactive applications with Python.",skill_git:"Project version control.",skill_github:"Repositories and collaboration.",skill_excel:"Spreadsheets and data organization.",skill_word:"Documents and text editing.",skill_powerpoint:"Presentations and visual communication.",skill_powerbi:"Data visualization and analysis.",skill_apis:"Integration between applications.",skill_ai_title:"Artificial Intelligence",skill_ai_desc:"Exploring AI tools.",skill_vibe:"Prototyping and evolving ideas.",skill_automation_title:"Automation",skill_automation:"Improving tasks and processes.",skill_genai:"Google generative tools.",skill_prompting:"Creating and refining instructions.",skill_vscode:"Development environment.",skill_office_title:"Office Suite",skill_office:"Productivity tools.",
    label_exp:"EXPERIENCE",experience_kicker:"REAL-WORLD EXPERIENCE",exp_title:"Real experience.<br><em>Solution mindset.</em>",exp_desc:"My professional experience strengthens skills that also matter in software development: analysis, communication, negotiation and continuous improvement.",job_period:"FEB 11, 2026 — DEC 7, 2026",job_role:"Young Apprentice · Procurement",job_summary:"Working with procurement processes related to road infrastructure and telecommunications, contacting suppliers, requesting quotes, negotiating and supporting demands from different projects.",previous_job_period:"FEB 2, 2024 — DEC 22, 2025",previous_job_role:"Administrative Assistant",previous_job_summary:"Supported school administration with organizational routines, document control, internal process follow-up and day-to-day departmental activities.",win1_title:"Strategic negotiation",win1_desc:"Compared quotes, negotiated counteroffers and helped secure a much better final condition than the initial proposal for a materials purchase.",win2_title:"Information management",win2_desc:"Followed up with approximately 120 suppliers in a survey related to Brazil's Tax Reform.",win3_title:"Freight optimization",win3_desc:"Suggested consolidating small, recurring deliveries into a single shipment, an idea adopted to reduce logistics costs.",win4_title:"Initiative",win4_desc:"Helped source and negotiate gifts for the company's workplace safety event, coordinating alternatives with suppliers.",
    label_projects:"PROJECTS",projects_title:"Different problems.<br><em>Solutions in progress.</em>",projects_desc:"Personal projects that show my interest in building useful applications, exploring AI and experimenting with new ideas.",state_built:"BUILT",state_personal:"PERSONAL PROJECT",state_experiment:"EXPERIMENT",bia_desc:"An application to explore sales data in CSV and Excel using natural language and generative AI.",bia_mock_title:"What are the numbers<br>telling us?",bia_mock_prompt:"› Ask about your sales...",finance_title:"Finance App",finance_desc:"A personal app to track finances and organize everyday financial information.",finance_tag_1:"App",finance_tag_2:"Data",finance_tag_3:"Organization",env_title:"Environment Management Control",env_desc:"A tool to track and organize environment management and related information.",env_tag_1:"Management",env_tag_2:"Control",env_tag_3:"Software",environment_mock_1:"ENVIRONMENT 01",environment_mock_2:"ENVIRONMENT 02",environment_mock_3:"ENVIRONMENT 03",human_title:"Human or Artificial Intelligence?",human_desc:"An interactive experiment designed to identify whether content or an answer was created by a person or by AI.",human_tag_1:"AI",human_tag_2:"Classification",human_tag_3:"Experiment",phb_desc:"A digital presence project for a dental clinic, focused on presenting services and the browsing experience.",phb_mock_title:"PHB / DENTAL CLINIC",phb_mock_slogan:"Your smile,<br>our care.",phb_mock_values:"HEALTH · TRUST · WELL-BEING",project_note:"These descriptions are brief. As projects become public, I'll add demos, repositories and technical details.",project_details:"View details",project_details_kicker:"PROJECT / DETAILS",dialog_scope:"Project goal",dialog_approach:"How it was developed",dialog_technology:"Technologies listed",dialog_more:"More information",dialog_pending:"No further information or demo links have been provided yet.",
    terminal_label:"INTERACTIVE TERMINAL",terminal_title:"A little about me,<br><em>straight from the terminal.</em>",terminal_desc:"Try a command. The terminal responds with information from this portfolio.",terminal_welcome:"Terminal ready. Type <code>help</code> to see available commands.",terminal_placeholder:"Enter a command...",terminal_input_aria:"Terminal command",terminal_suggestions_aria:"Suggested terminal commands",terminal_run:"Run",terminal_try:"TRY:",terminal_unknown:"Unknown command. Type help to see the available commands.",terminal_help:"Available commands: help, whoami, about, projects, skills, contact.",terminal_identity:"Gabriel Balbino Malaquias.",terminal_about:"Software Engineering student interested in software development, artificial intelligence, automation, technology and data analysis.",terminal_projects:"Projects: BIA — Balbino IA; Finance App; Environment Management Control; Human or AI?; Doutor PHB.",terminal_skills:"Python, C, JavaScript, HTML, CSS, Pandas, Streamlit, Git, GitHub, Excel, Word, PowerPoint, Power BI, APIs, AI, Vibe Coding and automation.",terminal_contact:"WhatsApp: +55 11 99610-0032 · Instagram: @iae_gabzzz · LinkedIn: /in/gbzzz · GitHub: @eae-gabzzz",
    label_education:"EDUCATION",education_title:"Building my<br><em>foundation every day.</em>",education_desc:"Academic education and additional courses supporting my growth in technology and professional skills.",degree_period:"2026 — IN PROGRESS",degree_title:"Software Engineering",degree_detail:"UniCesumar · Undergraduate degree",languages_label:"LANGUAGES",languages_title:"Portuguese and basic English",languages_detail:"Portuguese · English (basic)",language_level:"BASIC ENGLISH",ongoing:"IN PROGRESS",completed:"COMPLETED",cert_title:"Courses & certificates",cert_ai:"AI Programming with ChatGPT",cert_excel:"Basic Excel",cert_admin:"Administrative Assistant",cert_marketing:"Basic Marketing and Administration",cert_safety:"Workplace Safety — Transversal Competency",cert_ethics:"Ethics in Artificial Intelligence",cert_circular:"Circular Economy",course_listed:"ADDITIONAL COURSE",
    label_contact:"CONTACT",contact_overline:"OPPORTUNITIES · COLLABORATIONS · IDEAS",contact_title:"Let's turn<br><em>ideas into projects.</em>",contact_desc:"I'm open to opportunities, connections and projects in technology, software development, data and automation.",cv_download:"DOWNLOAD CV",cv_available:"My CV is ready to download.",cv_unavailable:"The CV PDF is unavailable.",back_top:"BACK TO TOP ↑",back_top_aria:"Back to top"
  }
};
const langButton = $("#langToggle");
let lang = localStorage.getItem("gb-language") === "en" ? "en" : "pt";
function updateMenuLabel(){
  const isOpen = nav.classList.contains("open");
  const key = isOpen ? "menu_close" : "menu_open";
  menu.setAttribute("aria-label", lang === "pt" ? (isOpen ? "Fechar menu" : "Abrir menu") : translations.en[key]);
}
updateMenuLabel();
const portuguese = {};
$$("[data-i18n]").forEach(el => portuguese[el.dataset.i18n] = el.innerHTML);
const portugueseAria = {};
$$("[data-i18n-aria]").forEach(el => portugueseAria[el.dataset.i18nAria] = el.getAttribute("aria-label"));
const portuguesePlaceholders = {};
$$("[data-i18n-placeholder]").forEach(el => portuguesePlaceholders[el.dataset.i18nPlaceholder] = el.getAttribute("placeholder"));
function setLanguage(nextLanguage) {
  lang = nextLanguage;
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  langButton.innerHTML = lang === "pt" ? "PT <span>/</span> EN" : "EN <span>/</span> PT";
  $$("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const value = lang === "pt" ? portuguese[key] : translations.en[key];
    if (value !== undefined) el.innerHTML = value;
  });
  $$("[data-i18n-aria]").forEach(el => {
    const key = el.dataset.i18nAria;
    const value = lang === "pt" ? portugueseAria[key] : translations.en[key];
    if (value !== undefined) el.setAttribute("aria-label", value);
  });
  $$("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const value = lang === "pt" ? portuguesePlaceholders[key] : translations.en[key];
    if (value !== undefined) el.setAttribute("placeholder", value);
  });
  const description = lang === "pt"
    ? "Portfólio de Gabriel Balbino Malaquias — desenvolvimento, automação, dados e inteligência artificial."
    : "Gabriel Balbino Malaquias' portfolio — software development, automation, data and artificial intelligence.";
  $('meta[name="description"]').setAttribute("content", description);
  $('meta[property="og:description"]').setAttribute("content", description);
  document.title = lang === "pt" ? "Gabriel Balbino — Portfólio" : translations.en.page_title;
  updateMenuLabel();
  resetTyping();
  resetTerminal();
  if (projectDialog.open && activeProject) renderProjectDetails(activeProject);
  localStorage.setItem("gb-language", lang);
}
langButton.addEventListener("click", () => setLanguage(lang === "pt" ? "en" : "pt"));

// Typing headline
const phrases = {
  pt: ["Desenvolvedor em formação", "Engenharia de Software", "Inteligência Artificial", "Automação de processos", "Desenvolvimento Web", "Análise de dados"],
  en: ["Developer in training", "Software Engineering", "Artificial Intelligence", "Process automation", "Web development", "Data analysis"]
};
let phrase = 0, char = 0, deleting = false;
let typingTimer;
function resetTyping(){
  phrase = 0;
  char = 0;
  deleting = false;
  clearTimeout(typingTimer);
  if (reducedMotion) {
    $("#typed").textContent = phrases[lang][0];
    return;
  }
  typeLoop();
}
function typeLoop(){
  const text = phrases[lang][phrase];
  $("#typed").textContent = text.slice(0, char);
  if (!deleting && char < text.length) { char++; typingTimer = setTimeout(typeLoop, 65); }
  else if (!deleting) { deleting = true; typingTimer = setTimeout(typeLoop, 1500); }
  else if (char > 0) { char--; typingTimer = setTimeout(typeLoop, 28); }
  else { deleting = false; phrase = (phrase+1)%phrases[lang].length; typingTimer = setTimeout(typeLoop, 350); }
}
resetTyping();
setLanguage(lang);

function resetTerminal() {
  terminalOutput.replaceChildren();
  const welcome = document.createElement("p");
  welcome.textContent = lang === "pt"
    ? "Terminal pronto. Digite help para ver os comandos."
    : translations.en.terminal_welcome.replace("<code>", "").replace("</code>", "");
  terminalOutput.append(welcome);
}

const terminalMessages = {
  pt: {
    help: "Comandos disponíveis: help, whoami, about, projects, skills, contact.",
    whoami: "Gabriel Balbino Malaquias.",
    about: "Estudante de Engenharia de Software interessado em desenvolvimento de software, inteligência artificial, automação, tecnologia e análise de dados.",
    projects: "Projetos: BIA — Balbino IA; Aplicativo de Finanças; Controle de Gestão de Ambiente; Humano ou IA?; Doutor PHB.",
    skills: "Python, C, JavaScript, HTML, CSS, Pandas, Streamlit, Git, GitHub, Excel, Word, PowerPoint, Power BI, APIs, IA, Vibe Coding e automação.",
    contact: "WhatsApp: +55 11 99610-0032 · Instagram: @iae_gabzzz · LinkedIn: /in/gbzzz · GitHub: @eae-gabzzz",
    unknown: "Comando desconhecido. Digite help para consultar os comandos disponíveis."
  },
  en: {
    help: translations.en.terminal_help,
    whoami: translations.en.terminal_identity,
    about: translations.en.terminal_about,
    projects: translations.en.terminal_projects,
    skills: translations.en.terminal_skills,
    contact: translations.en.terminal_contact,
    unknown: translations.en.terminal_unknown
  }
};

const terminalForm = $("#terminalForm");
const terminalInput = $("#terminalInput");
terminalForm.addEventListener("submit", event => {
  event.preventDefault();
  const command = terminalInput.value.trim().toLowerCase();
  if (!command) return;

  const prompt = document.createElement("p");
  prompt.className = "terminal-command";
  prompt.textContent = `> ${command}`;
  const response = document.createElement("p");
  response.className = "terminal-response";
  response.textContent = terminalMessages[lang][command] || terminalMessages[lang].unknown;
  terminalOutput.append(prompt, response);
  while (terminalOutput.children.length > 25) terminalOutput.firstElementChild.remove();
  terminalInput.value = "";
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
});

$$(".terminal-suggestions button[data-command]").forEach(button => {
  button.addEventListener("click", () => {
    terminalInput.value = button.dataset.command;
    terminalForm.requestSubmit();
    terminalInput.focus();
  });
});

function renderProjectDetails(project) {
  const title = project.querySelector(".project-info h3").textContent.trim();
  const description = project.querySelector(".project-info > p").textContent.trim();
  $("#dialogTitle").textContent = title;
  $("#dialogScope").textContent = description;
  $("#dialogApproach").textContent = project.dataset.project === "bia"
    ? (lang === "pt"
      ? "Aplicação em Python com Pandas, Streamlit e integração com inteligência artificial."
      : "Python application using Pandas, Streamlit and an artificial intelligence integration.")
    : (lang === "pt"
      ? "Detalhes de implementação ainda não informados."
      : "Implementation details have not been provided yet.");
  $("#dialogVisual").replaceChildren(project.querySelector(".project-visual").cloneNode(true));
  const tags = $("#dialogTags");
  tags.replaceChildren();
  if (project.dataset.project === "bia" || project.dataset.project === "phb") {
    project.querySelectorAll(".project-info .tags span").forEach(tag => {
      const item = document.createElement("span");
      item.textContent = tag.textContent;
      tags.append(item);
    });
  } else {
    const note = document.createElement("p");
    note.className = "dialog-note";
    note.textContent = lang === "pt"
      ? "As tecnologias específicas deste projeto ainda não foram informadas."
      : "Specific technologies for this project have not been provided yet.";
    tags.append(note);
  }
}

$$(".project-details-btn").forEach(button => {
  button.addEventListener("click", () => {
    activeProject = button.closest(".project");
    renderProjectDetails(activeProject);
    projectDialog.showModal();
  });
});

$(".dialog-close").addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("cancel", event => {
  event.preventDefault();
  projectDialog.close();
});
projectDialog.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    event.preventDefault();
    projectDialog.close();
  }
});
projectDialog.addEventListener("click", event => {
  if (event.target === projectDialog) projectDialog.close();
});
projectDialog.addEventListener("close", () => {
  activeProject = null;
});

const cvButton = $("#cvDownload");
const cvStatus = $("#cvStatus");
cvButton.addEventListener("click", () => {
  if (cvButton.dataset.cvReady !== "true") {
    cvStatus.textContent = lang === "pt" ? portuguese.cv_unavailable : translations.en.cv_unavailable;
    return;
  }
  const download = document.createElement("a");
  download.href = "assets/cv/gabriel-balbino-cv.pdf";
  download.download = "gabriel-balbino-cv.pdf";
  document.body.append(download);
  download.click();
  download.remove();
  cvStatus.textContent = lang === "pt" ? "Download iniciado." : "Download started.";
});

// Reveal content as it enters the viewport and mark the active section in navigation.
const revealTargets = $$(".section-label, .section-head, .about-layout, .skill-card, .job-card, .project, .education-grid, .cert, .contact-wrap > *, .terminal-intro, .interactive-terminal");
revealTargets.forEach(el => el.classList.add("reveal"));
if (reducedMotion) {
  $$(".reveal").forEach(el => el.classList.add("visible"));
} else {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
  }), {threshold:.12});
  $$(".reveal").forEach(el => observer.observe(el));
}

const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  $$(".nav a").forEach(link => link.classList.toggle("active", link.hash === `#${entry.target.id}`));
}), {rootMargin:"-35% 0px -55% 0px"});
$$("main section[id]").forEach(section => sectionObserver.observe(section));

// Reading progress
const backToTop = $(".back-to-top");
addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  $(".progress").style.width = `${max > 0 ? scrollY/max*100 : 0}%`;
  backToTop.classList.toggle("visible", scrollY > 560);
}, {passive:true});

// Keep the crosshair direct while easing the ring and halo behind it.
const finePointer = matchMedia("(pointer:fine)").matches;
const desktopPointer = matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1001px)").matches;
if (desktopPointer && !reducedMotion) {
  document.body.classList.add("custom-cursor");
  const dot = $(".cursor-dot"), ring = $(".cursor-ring");
  const glow = document.createElement("div");
  glow.className = "mouse-glow";
  document.body.append(glow);
  const interactiveSelector = "a, button, .project, .skill-card, [role='button'], input, select, textarea, summary";
  let x = innerWidth / 2, y = innerHeight / 2;
  let followerX = x, followerY = y, glowX = x, glowY = y;
  let started = false;

  addEventListener("pointermove", event => {
    if (event.pointerType !== "mouse") return;
    x = event.clientX;
    y = event.clientY;
    dot.style.setProperty("--cursor-x", x+"px");
    dot.style.setProperty("--cursor-y", y+"px");
    document.body.classList.add("cursor-visible");
    if (!started) {
      started = true;
      glow.classList.add("active");
      ring.classList.add("active");
    }

    const stage = $("#portraitStage");
    const bounds = stage.getBoundingClientRect();
    const localX = (x - bounds.left) / bounds.width;
    const localY = (y - bounds.top) / bounds.height;
    if (localX >= 0 && localX <= 1 && localY >= 0 && localY <= 1) {
      stage.style.setProperty("--pointer-x", `${(localX - .5) * 24}px`);
      stage.style.setProperty("--pointer-y", `${(localY - .5) * 20}px`);
    } else {
      stage.style.setProperty("--pointer-x", "0px");
      stage.style.setProperty("--pointer-y", "0px");
    }
  }, {passive:true});

  const animateCursor = () => {
    followerX += (x - followerX) * .18;
    followerY += (y - followerY) * .18;
    glowX += (x - glowX) * .07;
    glowY += (y - glowY) * .07;
    ring.style.setProperty("--cursor-x", followerX+"px");
    ring.style.setProperty("--cursor-y", followerY+"px");
    glow.style.transform = `translate3d(${glowX}px,${glowY}px,0) translate(-50%,-50%)`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  document.addEventListener("pointerover", event => {
    if (event.target instanceof Element && event.target.closest(interactiveSelector)) {
      ring.classList.add("hover");
    }
  });
  document.addEventListener("pointerout", event => {
    if (!(event.relatedTarget instanceof Element) || !event.relatedTarget.closest(interactiveSelector)) {
      ring.classList.remove("hover");
    }
  });
  document.documentElement.addEventListener("pointerleave", () => {
    document.body.classList.remove("cursor-visible");
    glow.classList.remove("active");
    ring.classList.remove("active");
    ring.classList.remove("hover");
    const stage = $("#portraitStage");
    stage.style.setProperty("--pointer-x", "0px");
    stage.style.setProperty("--pointer-y", "0px");
  });
  document.documentElement.addEventListener("pointerenter", () => {
    if (started) {
      glow.classList.add("active");
      ring.classList.add("active");
    }
  });
}

if (finePointer && !reducedMotion) {
  $$(".tilt-card, .project").forEach(card => {
    card.addEventListener("pointermove", event => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      card.style.transform = `perspective(900px) rotateX(${y * -3}deg) rotateY(${x * 4}deg) translateY(-3px)`;
      card.style.setProperty("--mx", `${(x + .5) * 100}%`);
      card.style.setProperty("--my", `${(y + .5) * 100}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
      card.style.removeProperty("--mx");
      card.style.removeProperty("--my");
    });
  });
}
