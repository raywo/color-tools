import chroma, {Color} from "chroma-js";
import {base62ToBigInt, bigIntToBase62} from "@common/helpers/base62.helper";
import {PaletteStyle, PaletteStyles, randomStyle} from "@palettes/models/palette-style.model";
import {Palette} from "@palettes/models/palette.model";
import {paletteName} from "@palettes/helper/palette-name.helper";
import {paletteColorFrom} from "@palettes/models/palette-color.model";


/**
 * Generates a unique palette ID based on the colors and style of the
 * provided palette.
 *
 * @param {Palette} palette - The palette object containing color and style data.
 * @return {string} A unique identifier for the given palette.
 */
export function paletteIdFromPalette(palette: Palette): string {
  const colors: Color[] = [
    palette.color0.color,
    palette.color1.color,
    palette.color2.color,
    palette.color3.color,
    palette.color4.color,
    palette.color0.startingColor,
    palette.color1.startingColor,
    palette.color2.startingColor,
    palette.color3.startingColor,
    palette.color4.startingColor,
  ];

  return paletteIdFromColors(colors, palette.style);
}


/**
 * Generates a palette object from a given palette ID.
 *
 * The function restores color and style details associated with the ID
 * to construct the palette. If the style cannot be derived from the ID,
 * a random style is used instead.
 *
 * @param {string} id - The unique identifier of the palette to restore.
 * @return {Palette} An object containing the restored palette information
 *                   including colors, style, and name.
 * @throws {Error} If the provided palette ID is not restorable.
 */
export function paletteFromId(id: string): Palette {
  if (!isRestorable(id)) {
    throw new Error("Palette ID is not restorable");
  }

  const colors = colorsFromPaletteId(id);
  let style = randomStyle();

  try {
    style = styleFromPaletteId(id);
  } catch (err: unknown) {
    const error = err as Error;
    console.info("Style not found. Using random style.", error.message);
  }

  return {
    id: id,
    name: paletteName(style, colors[0]),
    style,
    color0: paletteColorFrom(colors[0], "color0", colors[5]),
    color1: paletteColorFrom(colors[1], "color1", colors[6]),
    color2: paletteColorFrom(colors[2], "color2", colors[7]),
    color3: paletteColorFrom(colors[3], "color3", colors[8]),
    color4: paletteColorFrom(colors[4], "color4", colors[9]),
  } as Palette;
}


/**
 * Determines if a palette with the given ID can be restored.
 *
 * @param {string} id - The unique identifier of the palette.
 * @return {boolean} True if the palette is restorable, otherwise false.
 */
export function isRestorable(id: string): boolean {
  try {
    colorsFromPaletteId(id);
    return true;
  } catch (err) {
    return false;
  }
}


/**
 * Generates a unique palette ID based on an array of colors and a specified
 * palette style.
 *
 * This ID will start with a style index and then contain a base62-encoded
 * representation of the RGB values of the colors and starting colors.
 *
 * @param {Color[]} colors - An array of 10 Color objects used to define the
 *                           palette. The first five colors represent the actual
 *                           colors, while the last five represent the starting
 *                           colors.
 * @param {PaletteStyle} style - The style of the palette, which must be a
 *                               valid member of the `PaletteStyles` array.
 * @return {string} A unique string identifier for the palette, constructed
 *                  using the colors and style.
 * @throws {Error} If the number of colors is not exactly 10 or if the
 *                 specified style is invalid.
 */
function paletteIdFromColors(colors: Color[], style: PaletteStyle): string {
  if (colors.length !== 10) {
    throw new Error('Exactly 10 colors required');
  }

  const styleIndex = PaletteStyles.indexOf(style);
  if (styleIndex === -1) {
    throw new Error(`Unknown palette style: ${style}`);
  }

  // Collect all RGB values of all colors. Each rgb value is a byte.
  const bytes: number[] = [];
  colors.forEach(color => {
    const [r, g, b] = color.rgb();
    bytes.push(Math.round(r), Math.round(g), Math.round(b));
  });

  // Convert all bytes to a single big integer
  let bigNumber = 0n;
  bytes.forEach(byte => {
    bigNumber = bigNumber * 256n + BigInt(byte);
  });

  return `${styleIndex}${bigIntToBase62(bigNumber)}`;
}


/**
 * Decodes a palette ID to extract an array of colors.
 *
 * @param {string} id - A string representing the palette ID. The ID must be
 *                      at least 41 characters long.
 * @return {Color[]} An array of Color objects derived from the given palette ID.
 * @throws {Error} Throws an error if the palette ID is shorter than 41 characters.
 */
function colorsFromPaletteId(id: string): Color[] {
  if (id.length < 40 || id.length > 42) {
    throw new Error("Palette ID must be at least 41 characters long! Actual length: " + id.length);
  }

  // Omit style index
  const colorData = id.substring(1);
  const bigNumber = base62ToBigInt(colorData);

  const bytesToRead = 30;
  const bytes: number[] = [];
  let remaining = bigNumber;

  for (let i = 0; i < bytesToRead; i++) {
    bytes.unshift(Number(remaining % 256n));
    remaining = remaining / 256n;
  }

  const colors: Color[] = [];
  for (let i = 0; i < bytesToRead; i += 3) {
    const color = chroma.rgb(bytes[i], bytes[i + 1], bytes[i + 2]);
    colors.push(color);
  }

  return colors;
}


/**
 * Retrieves the style associated with the given palette ID.
 * The palette ID is expected to start with a valid style index.
 * Throws an error if the ID is invalid or the style index is out of range.
 *
 * @param {string} id - The unique palette ID used to determine the style. Must
 *                      be exactly 42 characters long.
 * @return {PaletteStyle} The style object corresponding to the provided
 *                        palette ID.
 */
function styleFromPaletteId(id: string): PaletteStyle {
  if (!id || id.length < 41 || id.length > 42) {
    throw new Error("Invalid palette ID: incorrect length: " + id.length);
  }

  // Erste Stelle ist der Style-Index
  const styleIndex = parseInt(id[0], 10);

  if (isNaN(styleIndex) || styleIndex < 0 || styleIndex >= PaletteStyles.length) {
    throw new Error(`Invalid style index in palette ID: ${id[0]}`);
  }

  return PaletteStyles[styleIndex];
}
