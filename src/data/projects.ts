import type { Props as ProjectItemProps } from "@/components/ProjectItem.astro";

export const projects: ProjectItemProps[] = [
    {
        name: "TaskFlow API",
        nameKey: "project.taskflow.name",
        description:
            "Servicio de orquestación de tareas basado en eventos, construido con TypeScript y Redis Streams.",
        descriptionKey: "project.taskflow.description",
        slides: [
            { kind: "image", src: "/img/projects/p1-1.jpg", alt: "TaskFlow API overview" },
            { kind: "image", src: "/img/projects/p1-2.jpg", alt: "TaskFlow API workers" },
            {
                kind: "video",
                poster: "/img/projects/p1-cover.jpg",
                sources: [
                    { src: "/video/projects/p1-demo.mp4", type: "video/mp4" },
                ],
            },
        ],
        stack: ["TypeScript", "Node.js", "Redis"],
        liveUrl: "#",
        repoUrl: "#",
    },
    {
        name: "ShopWave Dashboard",
        nameKey: "project.shopwave.name",
        description:
            "Panel de ventas en tiempo real con caché adaptable y gestión granular de roles.",
        descriptionKey: "project.shopwave.description",
        slides: [
            { kind: "image", src: "/img/projects/p2-1.jpg", alt: "ShopWave dashboard list" },
            { kind: "image", src: "/img/projects/p2-2.jpg", alt: "ShopWave dashboard filters" },
        ],
        stack: ["Next.js", "PostgreSQL"],
        repoUrl: "#",
    },
    {
        name: "SkyLog Analytics",
        nameKey: "project.skylog.name",
        description:
            "Suite ligera de analítica para flotas IoT con sincronización offline-first.",
        descriptionKey: "project.skylog.description",
        slides: [
            { kind: "image", src: "/img/projects/p3-1.jpg", alt: "SkyLog analytics charts" },
        ],
        stack: ["React", "SQLite"],
        liveUrl: "#",
    },
];
