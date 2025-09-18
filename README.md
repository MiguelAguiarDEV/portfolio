# Portfolio Miguel Santiesteban

Repositorio del portfolio personal de Miguel Santiesteban. La experiencia es una single page sin scroll nativo: cada seccion ocupa exactamente la altura de la viewport y se intercambia mediante transiciones tipo wipe controladas por JavaScript.

## Tabla de contenido
- [Vision general](#vision-general)
- [Caracteristicas clave](#caracteristicas-clave)
- [Stack y dependencias](#stack-y-dependencias)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Navegacion y ciclo de vida de una seccion](#navegacion-y-ciclo-de-vida-de-una-seccion)
- [Guia de estilos y layout](#guia-de-estilos-y-layout)
- [Variables de entorno](#variables-de-entorno)
- [Scripts disponibles](#scripts-disponibles)
- [Desarrollo local](#desarrollo-local)
- [Roadmap funcional](#roadmap-funcional)

## Vision general
- Una unica pagina (`src/pages/index.astro`) orquesta todo el sitio y monta las secciones mediante componentes.
- Cada seccion es un `<Section />` de `src/layout/Section.astro`, que encapsula animaciones clip-path, z-index y estado (active/last/wiped).
- La navegacion ocurre sin scroll: el `NavBar` (`src/components/NavBar.astro`) construye botones dinamicos, resalta la seccion activa y expone `window.setActiveSection` para cambiar de vista.
- `FormContainer` (`src/components/FormContainer.astro`) provee un portal en la esquina superior derecha para overlays o formularios sin romper la composicion full-screen.

## Caracteristicas clave
- **Transiciones wipe** mediante CSS variables (`--x-displacement`, `--wipe-angle`, `--static-x-offset`) controladas en `Section.astro`.
- **Navegacion dinamica**: el `NavBar` busca nodos con id `section-*`, crea botones, anima un highlight flotante y sincroniza estado con la seccion activa.
- **Controles de depuracion** opcionales (`SectionControls.astro`) para ajustar offsets, angulos y z-index en tiempo real. Se activan con la prop `showMenu` de `<Section />`.
- **Contenido modular**: cada seccion funcional vive en `src/components/sections/`. Ejemplo principal: `About.astro` demuestra un layout complejo con grid, chips y `ProjectCard` reutilizable.
- **WYSIWYG de proyectos**: `ProjectCard.astro` renderiza sliders de imagen/video con controles, dots y gestos `pointer`.

## Stack y dependencias
- [Astro 5](https://astro.build/) como framework principal.
- [Tailwind CSS 4](https://tailwindcss.com/) via plugin oficial Vite (`@tailwindcss/vite`) y utilidades custom en `global.css`.
- [Lucide Astro](https://www.npmjs.com/package/lucide-astro) para iconos SVG.
- [@fontsource/poppins](https://fontsource.org/fonts/poppins) para tipografia.
- [@vercel/analytics](https://vercel.com/docs/analytics) para telemetria opcional en produccion.

Requiere Node.js 18 o superior.

## Estructura de carpetas
```
src/
├─ pages/
│  └─ index.astro            # Punto de entrada; monta NavBar, FormContainer y secciones
├─ layout/
│  ├─ Container.astro        # Wrapper con glassmorphism; usa la clase base .container
│  └─ Section.astro          # Layout full-screen + animaciones clip-path (core visual)
├─ components/
│  ├─ NavBar.astro           # Header fijo, highlight animado y botones dinamicos
│  ├─ FormContainer.astro    # Portal para formularios flotantes
│  ├─ ProjectCard.astro      # Tarjetas con slider multimedia y CTAs Live/Repo
│  ├─ SectionControls.astro  # Panel de depuracion (opcional)
│  └─ sections/
│      ├─ About.astro        # Layout principal con grid, chips y ProjectCard
│      ├─ Experience.astro   # Placeholder para experiencia profesional
│      ├─ Projects.astro     # Placeholder para backlog de proyectos
│      ├─ Skills.astro       # Placeholder de skills
│      └─ Contact.astro      # Placeholder de contacto
└─ styles/
   └─ global.css             # Importa Tailwind, define layout global y estilos compartidos
```

Activos estaticos en `public/` (logos, foto de perfil, texturas y recursos multimedia).

## Navegacion y ciclo de vida de una seccion
1. El script inline en `index.astro` expone `window.setActiveSection` y calcula ids a partir del nombre (`section-{slug}`).
2. `Section.astro` marca la seccion inicial con `itsFirst={true}`, aplicando clases `wiped active` para que nazca visible.
3. Al cambiar de seccion:
   - Se limpia `active`/`last` en todas las secciones.
   - La seccion saliente pasa a `last` (z-index alto) hasta terminar la animacion.
   - La seccion entrante agrega `play-wipe`; cuando finaliza la animacion se vuelve a `wiped` (estado estable full viewport).
4. `NavBar.astro` observa el DOM, reconstruye botones y mueve el highlight segun el boton activo.

## Guia de estilos y layout
- Todas las secciones heredan de `.section` (`Section.astro`) y usan `height: 100%` dentro de `main#app-main`, que a su vez ocupa `100dvh`. No existe scroll global; cualquier overflow debe manejarse con contenedores internos (`overflow-auto`).
- Utilizar la utilidad `.layout-constrained` para respetar `max-width` y paddings definidos en `:root` (`global.css`).
- `Container.astro` aplica estilos glassmorphism (blur, bordes, sombra). Puedes extender via `class` (`class:list` acepta utilidades Tailwind o clases propias).
- Las clases compartidas (`.chip`, `.btn-primary`, `.btn-secondary`, etc.) viven en `About.astro` por ahora; se recomienda extraerlas a un CSS compartido segun evolucione el diseno.
- Tailwind esta disponible globalmente; las clases utilitarias se mezclan con CSS tradicional. Mantener coherencia con unidades relativas (`rem`, `%`, `dvh`).

### Crear una nueva seccion
```astro
---
import Section from "@/layout/Section.astro";
import Container from "@/layout/Container.astro";
---

<Section sectionName="Nombre" bgColor="#123456" zIndex={15}>
  <Container class="!h-auto !p-6">
    <!-- Contenido -->
  </Container>
</Section>
```
- `sectionName` debe ser unico; define el id (`section-nombre`) y la etiqueta del boton en el nav.
- `bgColor` setea el color base de la seccion (acepta cualquier valor CSS valido).
- Puedes habilitar `showMenu` para renderizar `SectionControls` y ajustar variables en vivo durante el desarrollo.

## Variables de entorno
Duplicar `.env.example` en `.env` y ajustar segun necesidad:

| Variable | Descripcion |
| --- | --- |
| `ENABLE_NOISE` | Habilita texturas de ruido globales (si estan implementadas en efectos futuros). |
| `ENABLE_WIPE_NOISE` | Anade ruido en la transicion wipe. |
| `ENABLE_SECTION_NOISE` | Activa ruido sobre la seccion activa. |
| `ENABLE_WIPE_SAME_COLOR` | Fuerza el mismo color entre wipe y seccion. |
| `ENABLE_NOISE_ANIMATION` | Anima ruido global. |
| `ENABLE_WIPE_NOISE_ANIMATION` | Anima ruido durante el wipe. |
| `ENABLE_SECTION_NOISE_ANIMATION` | Anima ruido en la seccion activa. |

Ademas, `About.astro` lee variables publicas:
- `PUBLIC_CONTACT_EMAIL` para el enlace `mailto` en los CTAs.
- `PUBLIC_CV_URL` para el boton "Download CV".
Si no se definen, usan valores por defecto.

## Scripts disponibles
| Comando | Descripcion |
| --- | --- |
| `npm install` | Instala dependencias. |
| `npm run dev` | Arranca el servidor de desarrollo (`localhost:4321`). |
| `npm run build` | Genera el sitio estatico en `dist/`. |
| `npm run preview` | Sirve el build estatico. |
| `npm run astro ...` | Acceso directo al CLI de Astro. |

## Desarrollo local
1. Instalar dependencias: `npm install`.
2. Copiar `.env.example` a `.env` y ajustar flags o valores publicos.
3. Ejecutar `npm run dev` y abrir `http://localhost:4321`.
4. El build de produccion se crea con `npm run build`. Validar con `npm run preview` antes de desplegar.

## Roadmap funcional
- Completar contenido real para `Experience`, `Projects`, `Skills` y `Contact`.
- Extraer estilos compartidos (chips, botones, grids) a un modulo comun.
- Afinar la navegacion en dispositivos moviles (breakpoints, hamburguesa, gestos).
- Integrar datos de proyectos desde un origen estructurado (JSON, CMS o coleccion Astro).
- Incorporar efectos de ruido y animaciones controlados por las flags `.env`.
