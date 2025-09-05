export type Pola = "blue" | "green" | "yellow" | "orange" | "magenta";

export const palette: Record<Pola, string> = {
  blue: "#0063D3",
  green: "#00A35C",
  yellow: "#FFD200",
  orange: "#FF5F00",
  magenta: "#E6007E",
};

export const order: Pola[] = ["blue", "green", "yellow", "orange", "magenta"];
