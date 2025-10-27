export const PaletteStyles = [
  "vibrant-balanced",
  "muted-analog-split",
  "high-contrast"
] as const;

export type PaletteStyle = typeof PaletteStyles[number];
