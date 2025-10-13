import type { Props as ProjectItemProps } from "@/components/ProjectItem.astro";

// Projects are ordered manually. The first 3 projects are featured as "Top Projects"
export const projects: ProjectItemProps[] = [
    {
        name: "Vulca Torneos",
        nameKey: "project.vulca.name",
        description:
            "Tournament management platform built with a TypeScript stack.",
        descriptionKey: "project.vulca.description",
        slides: [],
        stack: ["TypeScript", "Next.js"],
        repoUrl: "https://github.com/MiguelAguiarDEV/vulca-torneos",
    },
    {
        name: "Queater",
        nameKey: "project.queater.name",
        description:
            "Queue and order management prototype focused on realtime flows.",
        descriptionKey: "project.queater.description",
        slides: [],
        stack: ["TypeScript"],
        repoUrl: "https://github.com/MiguelAguiarDEV/queater",
    },
    {
        name: "Clip Sync",
        nameKey: "project.clipsync.name",
        description:
            "Cross-device clipboard sync powered by WebSocket and HTTP.",
        descriptionKey: "project.clipsync.description",
        slides: [],
        stack: ["Go", "WebSocket"],
        repoUrl: "https://github.com/MiguelAguiarDEV/clip-sync",
    },
    {
        name: "CSV Analyzer TFG",
        nameKey: "project.csvAnalyzer.name",
        description:
            "Large CSV inspection toolkit created for my final degree project.",
        descriptionKey: "project.csvAnalyzer.description",
        slides: [],
        stack: ["TypeScript"],
        repoUrl: "https://github.com/MiguelAguiarDEV/csv-analyzer-tfg",
    },
    {
        name: "Battleship vs AI",
        nameKey: "project.battleship.name",
        description:
            "Battleship duel against a JavaScript bot with basic AI logic.",
        descriptionKey: "project.battleship.description",
        slides: [],
        stack: ["JavaScript"],
        repoUrl: "https://github.com/MiguelAguiarDEV/battleship-vs-ai",
    },
    {
        name: "PDF Utility",
        nameKey: "project.pdfUtility.name",
        description:
            "Lightweight web helpers to manipulate PDF documents.",
        descriptionKey: "project.pdfUtility.description",
        slides: [],
        stack: ["HTML"],
        repoUrl: "https://github.com/MiguelAguiarDEV/pdf-utility",
    },
    {
        name: "Portfolio",
        nameKey: "project.portfolio.name",
        description:
            "Personal site built with Astro to showcase work and skills.",
        descriptionKey: "project.portfolio.description",
        slides: [],
        stack: ["Astro", "TypeScript"],
        repoUrl: "https://github.com/MiguelAguiarDEV/portfolio",
    },
    {
        name: "GitHub Profile",
        nameKey: "project.profileRepo.name",
        description:
            "Source for my GitHub profile README and shared configuration.",
        descriptionKey: "project.profileRepo.description",
        slides: [],
        stack: [],
        repoUrl: "https://github.com/MiguelAguiarDEV/MiguelAguiarDEV",
    },
];

