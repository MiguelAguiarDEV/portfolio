const STORAGE_KEY = "preferredLanguage";
const SUPPORTED_LANGS = ["es", "en"];

const translations = {
    es: {
        "nav.sections": "Secciones",
        "nav.about": "Sobre mi",
        "nav.projects": "Proyectos",
        "lang.toggle.label": "ES",
        "lang.toggle.aria": "Cambiar idioma a ingles",
        "about.title": "Sobre mi",
        "about.description":
            "Soy Miguel Santiesteban, un estudiante de Ingenieria Informatica de 22 anos de las Islas Canarias, Espana. Me especializo en desarrollo backend y disfruto crear proyectos desde cero, resolver problemas complejos y aprender de forma continua.",
        "about.downloadCv": "Descargar CV",
        "about.downloadCv.href": "/cv-miguel-santiesteban-aguiar-esp.pdf",
        "about.contact": "Contacto",
        "about.contact.aria": "Contactar por correo",
        "about.stack": "Tecnologias",
        "about.topProjects": "Proyectos destacados",
        "projects.title": "Repositorios de GitHub",
        "project.videoFallback": "Tu navegador no soporta video.",
        "project.carousel.prev": "Anterior",
        "project.carousel.next": "Siguiente",
        "project.button.live": "Ver demo",
        "project.button.repo": "Repositorio",
        "project.noPreview": "Sin vista previa",
        "project.battleship.name": "Battleship vs AI",
        "project.battleship.description":
            "Batalla de hundir la flota contra un bot en JavaScript con logica basica de IA.",
        "project.clipsync.name": "Clip Sync",
        "project.clipsync.description":
            "Sincroniza el portapapeles entre dispositivos usando WebSocket y HTTP.",
        "project.csvAnalyzer.name": "CSV Analyzer TFG",
        "project.csvAnalyzer.description":
            "Herramienta para analizar ficheros CSV grandes como trabajo de fin de grado.",
        "project.profileRepo.name": "Perfil de GitHub",
        "project.profileRepo.description":
            "Codigo fuente del README y configuraciones de mi perfil en GitHub.",
        "project.pdfUtility.name": "PDF Utility",
        "project.pdfUtility.description":
            "Coleccion de utilidades web ligeras para trabajar con documentos PDF.",
        "project.portfolio.name": "Portfolio",
        "project.portfolio.description":
            "Sitio personal construido con Astro para mostrar experiencia y proyectos.",
        "project.queater.name": "Queater",
        "project.queater.description":
            "Prototipo de gestion de colas y pedidos con enfoque en tiempo real.",
        "project.vulca.name": "Vulca Torneos",
        "project.vulca.description":
            "Plataforma para gestionar torneos y resultados con stack TypeScript.",
        "chip.backend": "Backend",
        "chip.canary": "Islas Canarias",
        "chip.remote": "Remoto",
        "chip.csStudent": "Estudiante de informatica",
        "chip.bilingual": "Ingles / Espanol",
    },
    en: {
        "nav.sections": "Sections",
        "nav.about": "About",
        "nav.projects": "Projects",
        "lang.toggle.label": "EN",
        "lang.toggle.aria": "Switch language to Spanish",
        "about.title": "About me",
        "about.description":
            "I am Miguel Santiesteban, a 22 year old Computer Science student from the Canary Islands, Spain. I focus on backend development and enjoy building projects from scratch, solving hard problems, and learning continuously.",
        "about.downloadCv": "Download CV",
        "about.downloadCv.href": "/cv-miguel-santiesteban-aguiar-eng.pdf",
        "about.contact": "Contact",
        "about.contact.aria": "Contact via email",
        "about.stack": "Stack",
        "about.topProjects": "Top projects",
        "projects.title": "GitHub repositories",
        "project.videoFallback": "Your browser does not support video.",
        "project.carousel.prev": "Previous",
        "project.carousel.next": "Next",
        "project.button.live": "Live",
        "project.button.repo": "Repo",
        "project.noPreview": "No preview available",
        "project.battleship.name": "Battleship vs AI",
        "project.battleship.description":
            "A JavaScript battleship duel against a simple AI opponent.",
        "project.clipsync.name": "Clip Sync",
        "project.clipsync.description":
            "Cross device clipboard sync powered by WebSocket and HTTP.",
        "project.csvAnalyzer.name": "CSV Analyzer TFG",
        "project.csvAnalyzer.description":
            "Large CSV inspection toolkit created for my final degree project.",
        "project.profileRepo.name": "GitHub Profile",
        "project.profileRepo.description":
            "Source for my GitHub profile README and shared configs.",
        "project.pdfUtility.name": "PDF Utility",
        "project.pdfUtility.description":
            "Lightweight web helpers to manipulate PDF documents.",
        "project.portfolio.name": "Portfolio",
        "project.portfolio.description":
            "Personal site built with Astro to showcase work and skills.",
        "project.queater.name": "Queater",
        "project.queater.description":
            "Queue and order management prototype focused on realtime flows.",
        "project.vulca.name": "Vulca Torneos",
        "project.vulca.description":
            "Tournament management platform built with a TypeScript stack.",
        "chip.backend": "Backend",
        "chip.canary": "Canary Islands",
        "chip.remote": "Remote",
        "chip.csStudent": "CS student",
        "chip.bilingual": "English / Spanish",
    },
};

const clampLanguage = (value) =>
    SUPPORTED_LANGS.includes(value) ? value : SUPPORTED_LANGS[0];

const readStoredLanguage = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return clampLanguage(stored);
        }
    } catch (error) {
        console.warn("Unable to read language preference", error);
    }
    return null;
};

const persistLanguage = (value) => {
    try {
        localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
        console.warn("Unable to persist language preference", error);
    }
};

const detectBrowserLanguage = () => {
    const candidates = [];
    if (navigator.languages && navigator.languages.length > 0) {
        candidates.push(...navigator.languages);
    }
    if (navigator.language) {
        candidates.push(navigator.language);
    }
    for (const candidate of candidates) {
        if (typeof candidate !== "string") continue;
        const lower = candidate.toLowerCase();
        if (lower.startsWith("es")) return "es";
    }
    return "en";
};

const getInitialLanguage = () => {
    return readStoredLanguage() ?? detectBrowserLanguage();
};

const applyTranslations = (lang) => {
    const dictionary = translations[lang];
    if (!dictionary) return;

    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;

    document.querySelectorAll("[data-i18n-key]").forEach((element) => {
        const key = element.dataset.i18nKey;
        if (!key) return;
        const value = dictionary[key];
        if (typeof value === "undefined") return;
        if (element.dataset.i18nHtml === "true") {
            element.innerHTML = value;
        } else {
            element.textContent = value;
        }
    });

    document.querySelectorAll("[data-i18n-attr-aria-label]").forEach((element) => {
        const key = element.dataset.i18nAttrAriaLabel;
        if (!key) return;
        const value = dictionary[key];
        if (typeof value === "undefined") return;
        element.setAttribute("aria-label", value);
    });

    document.querySelectorAll("[data-i18n-attr-href]").forEach((element) => {
        const key = element.dataset.i18nAttrHref;
        if (!key) return;
        const value = dictionary[key];
        if (typeof value === "undefined") return;
        element.setAttribute("href", value);
    });

    const toggle = document.querySelector("[data-lang-toggle]");
    if (toggle) {
        const label = dictionary["lang.toggle.label"] ?? lang.toUpperCase();
        toggle.textContent = label;
    }
};

const init = () => {
    let currentLang = getInitialLanguage();

    const setLanguage = (lang, persist = true) => {
        currentLang = clampLanguage(lang);
        applyTranslations(currentLang);
        if (persist) {
            persistLanguage(currentLang);
        }
    };

    setLanguage(currentLang, true);

    const toggle = document.querySelector("[data-lang-toggle]");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
        const next = currentLang === "es" ? "en" : "es";
        setLanguage(next, true);
    });
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
    init();
}
