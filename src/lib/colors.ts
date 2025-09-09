// IDs numéricos para los colores en lugar de claves string
export type ColorId = 0 | 1 | 2 | 3 | 4;

// Nombres (etiquetas) asociados a cada id (mantiene compatibilidad semántica)
export const colorNames = [
  "blue",
  "green",
  "yellow",
  "orange",
  "magenta",
] as const;
export type ColorName = typeof colorNames[number];

// Paleta indexada por id
export const palette: string[] = [
  "#3658FF", // 0 blue
  "#B4D400", // 1 green
  "#c06835", // 3 orange
  "#911200", // 4 magenta
  "#161616", // 2 yellow
];

// Orden de iteración por id (explícito para claridad)
export const order: ColorId[] = [0, 1, 2, 3, 4];

// Helper: obtener nombre por id
export const nameOf = (id: ColorId): ColorName => colorNames[id];

// Helper: encontrar id por nombre (por si hay código legado / migraciones)
export const idOf = (name: ColorName): ColorId =>
  colorNames.indexOf(name) as ColorId;
