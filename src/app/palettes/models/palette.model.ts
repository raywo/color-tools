import {genericPaletteColor, PaletteColor} from "@palettes/models/palette-color.model";


export const PALETTE_SLOTS = ["color0", "color1", "color2", "color3", "color4"] as const;

export type PaletteSlot = typeof PALETTE_SLOTS[number];


interface PaletteBasics {

  id: string;
  name: string;

}

export type Palette = PaletteBasics & Record<PaletteSlot, PaletteColor>;


export const EMPTY_PALETTE: Palette = {
  id: crypto.randomUUID(),
  name: "Empty palette",
  color0: genericPaletteColor("color0"),
  color1: genericPaletteColor("color1"),
  color2: genericPaletteColor("color2"),
  color3: genericPaletteColor("color3"),
  color4: genericPaletteColor("color4"),
};
