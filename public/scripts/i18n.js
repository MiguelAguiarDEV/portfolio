const STORAGE_KEY = "preferredLanguage";
const SUPPORTED_LANGS = ["es", "en"];

const translations = {
    es: {
        "nav.sections": "Secciones",
        "nav.about": "Sobre mí",
        "nav.projects": "Proyectos",
        "lang.toggle.label": "ES",
        "lang.toggle.aria": "Cambiar idioma a inglés",
        "about.title": "Sobre mí",
        "about.description":
            "Soy Miguel Santiesteban, estudiante de Ingeniería Informática de 22 años en las Islas Canarias, España. Me especializo en desarrollo backend y disfruto crear proyectos desde cero, resolver problemas complejos y aprender de forma continua.",
        "about.downloadCv": "Descargar CV",
        "about.contact": "Contacto",
        "about.contact.aria": "Contactar por correo",
        "about.stack": "Tecnologías",
        "about.topProjects": "Proyectos destacados",
        "projects.title": "Proyectos destacados",
        "project.videoFallback": "Tu navegador no soporta video.",
        "project.carousel.prev": "Anterior",
        "project.carousel.next": "Siguiente",
        "project.button.live": "Ver demo",
        "project.button.repo": "Repositorio",
        "project.taskflow.name": "TaskFlow API",
        "project.taskflow.description":
            "Servicio de orquestación de tareas basado en eventos, construido con TypeScript y Redis Streams.",
        "project.shopwave.name": "ShopWave Dashboard",
        "project.shopwave.description":
            "Panel de ventas en tiempo real con caché adaptable y gestión granular de roles.",
        "project.skylog.name": "SkyLog Analytics",
        "project.skylog.description":
            "Suite ligera de analítica para flotas IoT con sincronización offline-first.",
        "chip.backend": "Backend",
        "chip.canary": "Islas Canarias",
        "chip.remote": "Remoto",
        "chip.csStudent": "Estudiante de informática",
        "chip.bilingual": "Inglés / Español",
    },
    en: {
        "nav.sections": "Sections",
        "nav.about": "About",
        "nav.projects": "Projects",
        "lang.toggle.label": "EN",
        "lang.toggle.aria": "Switch language to Spanish",
        "about.title": "About me",
        "about.description":
            "I'm Miguel Santiesteban, a 22-year-old Computer Science student from the Canary Islands, Spain. I specialize in backend development and love building projects from the ground up, solving hard problems, and learning continuously.",
        "about.downloadCv": "Download CV",
        "about.contact": "Contact",
        "about.contact.aria": "Contact via email",
        "about.stack": "Stack",
        "about.topProjects": "Top projects",
        "projects.title": "Top projects",
        "project.videoFallback": "Your browser does not support video.",
        "project.carousel.prev": "Previous",
        "project.carousel.next": "Next",
        "project.button.live": "Live",
        "project.button.repo": "Repo",
        "project.taskflow.name": "TaskFlow API",
        "project.taskflow.description":
            "Event-driven task orchestration service built with TypeScript and Redis streams.",
        "project.shopwave.name": "ShopWave Dashboard",
        "project.shopwave.description":
            "Realtime sales dashboard with adaptive caching and granular role management.",
        "project.skylog.name": "SkyLog Analytics",
        "project.skylog.description":
            "Lightweight analytics toolkit for IoT fleets with offline-first sync.",
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
