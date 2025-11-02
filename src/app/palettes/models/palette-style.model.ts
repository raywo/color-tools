import {randomBetween} from "@common/helpers/random.helper";


export const PaletteStyles = [
  "vibrant-balanced",
  "muted-analog-split",
  "high-contrast"
] as const;

export type PaletteStyle = typeof PaletteStyles[number];


export function randomStyle(): PaletteStyle {
  const randomIndex = Math.floor(randomBetween(0, PaletteStyles.length));

  return PaletteStyles[randomIndex];
}
