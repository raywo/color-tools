import chroma, {Color} from "chroma-js";
import {ColorSpace} from "@common/models/color-space.model";
import {PaletteStyle} from "@palettes/models/palette-style.model";
import {Palette} from "@palettes/models/palette.model";
import {ColorTheme} from "@common/models/color-theme.model";
import {createShades, createTints} from "@common/helpers/tints-and-shades.helper";
import {generatePalette} from "@palettes/helper/palette.helper";


export type AppState = {
  // Converter related
  currentColor: Color;
  useAsBackground: boolean;
  correctLightness: boolean;
  useBezier: boolean;
  displayColorSpace: ColorSpace;
  tintColors: Color[];
  shadeColors: Color[];

  // Palette related
  paletteStyle: PaletteStyle;
  useRandomStyle: boolean;
  currentPalette: Palette;

  // Common
  colorTheme: ColorTheme;
}

const initialColor = chroma.random();

export const initialState: AppState = {
  currentColor: initialColor,
  useAsBackground: false,
  correctLightness: true,
  useBezier: true,
  displayColorSpace: "hsl",
  tintColors: createTints(initialColor, true, true),
  shadeColors: createShades(initialColor, true, true),

  paletteStyle: "muted-analog-split",
  useRandomStyle: false,
  currentPalette: generatePalette("muted-analog-split"),

  colorTheme: "system"
};
