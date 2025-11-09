import {PaletteStyle} from "@palettes/models/palette-style.model";
import {Color} from "chroma-js";
import {colorName} from "@common/helpers/color-name.helper";


export function paletteName(style: PaletteStyle,
                            firstColor: Color): string {
  const styleName = style
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return `${styleName} – ${colorName(firstColor)}`
}
