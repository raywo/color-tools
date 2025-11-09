import ColorNamer from "color-namer";
import {Color} from "chroma-js";


export function colorName(color: Color): string {
  const names = ColorNamer(color.hex());
  const allColors = Object.values(names)
    .flat()
    .sort((a, b) => a.distance - b.distance);

  if (!allColors.length) return "Unknown";

  const bestOverall = allColors[0];

  const pantoneList = names.pantone;
  const bestPantone = pantoneList.length ?
    pantoneList.sort((a, b) => a.distance - b.distance)[0]
    : undefined;

  if (bestPantone && bestPantone.distance <= bestOverall.distance + 5) {
    return bestPantone.name;
  }

  return bestOverall.name;
}
