export interface Social {
    name: string;
    url: string;
    icon: string;
    ariaLabel: string;
}

export const socials: Social[] = [
    {
        name: "GitHub",
        url: "https://github.com/MiguelAguiarDEV",
        icon: "github",
        ariaLabel: "Visitar perfil de GitHub"
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com/in/miguelaguiardev",
        icon: "linkedin",
        ariaLabel: "Visitar perfil de LinkedIn"
    },
    {
        name: "Email",
        url: "mailto:contact@miguelaguiar.dev",
        icon: "email",
        ariaLabel: "Enviar un correo electrónico"
    }
];
