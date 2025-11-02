import chroma, {Color} from "chroma-js";
import {base62ToBigInt, bigIntToBase62} from "@common/helpers/base62.helper";
import {PaletteStyle, PaletteStyles} from "@palettes/models/palette-style.model";
import {Palette} from "@palettes/models/palette.model";


export function paletteIdFromPalette(palette: Palette): string {
  const colors: Color[] = [
    palette.color0.color,
    palette.color1.color,
    palette.color2.color,
    palette.color3.color,
    palette.color4.color
  ];

  return paletteIdFromColors(colors, palette.style);
}


/////
// Erstellt eine Palette-ID aus 5 Farben
// Format: [StyleIndex][ColorData in Base62]
//  * - Erste Stelle: Style-Index (0-9)
//  * - Rest: Alle RGB-Werte (5 * 3 Bytes = 15 Bytes) als Base62
/////
export function paletteIdFromColors(colors: Color[], style: PaletteStyle): string {
  if (colors.length !== 5) {
    throw new Error('Exactly 5 colors required');
  }

  console.log("style: ", style, "")
  const styleIndex = PaletteStyles.indexOf(style);
  if (styleIndex === -1) {
    throw new Error(`Unknown palette style: ${style}`);
  }

  // Sammle alle RGB-Werte (0-255) in einem Array
  const bytes: number[] = [];
  colors.forEach(color => {
    const [r, g, b] = color.rgb();
    bytes.push(Math.round(r), Math.round(g), Math.round(b));
  });

  // Konvertiere 15 Bytes in eine große Zahl
  let bigNumber = 0n;
  bytes.forEach(byte => {
    bigNumber = bigNumber * 256n + BigInt(byte);
  });

  // Konvertiere zu Base62
  return `${styleIndex}${bigIntToBase62(bigNumber)}`;
}


/**
 * Stellt die 5 Farben aus einer Palette-ID wieder her
 */
export function colorsFromPaletteId(id: string): Color[] {
  if (id.length !== 21) {
    throw new Error("Palette ID must be 11 characters long");
  }

  const colorData = id.substring(1);

  // Konvertiere Base62 zurück zu BigInt
  const bigNumber = base62ToBigInt(colorData);

  // Extrahiere 15 Bytes
  const bytes: number[] = [];
  let remaining = bigNumber;

  for (let i = 0; i < 15; i++) {
    bytes.unshift(Number(remaining % 256n));
    remaining = remaining / 256n;
  }

  const colors: Color[] = [];
  for (let i = 0; i < 15; i += 3) {
    const color = chroma.rgb(bytes[i], bytes[i + 1], bytes[i + 2]);
    colors.push(color);
  }

  return colors;
}


/**
 * Extrahiert den PaletteStyle aus einer Palette-ID
 */
export function styleFromPaletteId(id: string): PaletteStyle {
  if (!id || id.length < 21) {
    throw new Error('Invalid palette ID: too short');
  }

  // Erste Stelle ist der Style-Index
  const styleIndex = parseInt(id[0], 10);

  if (isNaN(styleIndex) || styleIndex < 0 || styleIndex >= PaletteStyles.length) {
    throw new Error(`Invalid style index in palette ID: ${id[0]}`);
  }

  return PaletteStyles[styleIndex];
}
