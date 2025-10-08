import type { Props as ProjectItemProps } from "@/components/ProjectItem.astro";

type ProjectEntry = ProjectItemProps & {
    updatedAt: string;
};

const allProjects: ProjectEntry[] = [
    {
        name: "Battleship vs AI",
        nameKey: "project.battleship.name",
        description:
            "Battleship duel against a JavaScript bot with basic AI logic.",
        descriptionKey: "project.battleship.description",
        slides: [],
        stack: ["JavaScript"],
        repoUrl: "https://github.com/MiguelAguiarDEV/battleship-vs-ai",
        updatedAt: "2025-09-18T17:25:14Z",
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
        updatedAt: "2025-09-28T08:00:48Z",
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
        updatedAt: "2025-08-22T22:52:20Z",
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
        updatedAt: "2025-03-29T17:29:34Z",
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
        updatedAt: "2025-09-18T17:26:16Z",
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
        updatedAt: "2025-09-29T22:49:29Z",
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
        updatedAt: "2025-09-18T17:14:30Z",
    },
    {
        name: "Vulca Torneos",
        nameKey: "project.vulca.name",
        description:
            "Tournament management platform built with a TypeScript stack.",
        descriptionKey: "project.vulca.description",
        slides: [],
        stack: ["TypeScript", "Next.js"],
        repoUrl: "https://github.com/MiguelAguiarDEV/vulca-torneos",
        updatedAt: "2025-09-29T23:21:00Z",
    },
];

const byUpdated = allProjects.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
);

export const projects: ProjectItemProps[] = byUpdated.map(({ updatedAt, ...rest }) => ({
    ...rest,
}));

