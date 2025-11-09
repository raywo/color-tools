import {PaletteStyle} from '@palettes/models/palette-style.model';
import {generateVibrantBalanced} from '@palettes/helper/vibrant-palette.helper';
import {generateMutedAnalogSplit} from '@palettes/helper/muted-analog-split-palette.helper';
import {generateHighContrast} from '@palettes/helper/high-contrast-palette.helper';
import {Palette} from "@palettes/models/palette.model";


export function generatePalette(style: PaletteStyle, seedHue?: number): Palette {
  switch (style) {
    case 'vibrant-balanced':
      return generateVibrantBalanced(seedHue);
    case 'muted-analog-split':
      return generateMutedAnalogSplit(seedHue);
    case 'high-contrast':
      return generateHighContrast(seedHue);
    default:
      return generateMutedAnalogSplit(seedHue);
  }
}
