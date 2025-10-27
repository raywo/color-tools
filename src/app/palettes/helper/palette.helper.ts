import {Color} from 'chroma-js';
import {PaletteStyle, PaletteStyles} from '@palettes/models/palette-style.model';
import {generateVibrantBalanced} from '@palettes/helper/vibrant-palette.helper';
import {generateMutedAnalogSplit} from '@palettes/helper/muted-analog-split-palette.helper';
import {generateHighContrast} from '@palettes/helper/high-contrast-palette.helper';
import {randomBetween} from '@common/helpers/random.helper';


export function generateRandomPalette(): Color[] {
  const randomIndex = Math.floor(randomBetween(0, PaletteStyles.length));
  const randomStyle = PaletteStyles[randomIndex];

  return generatePalette(randomStyle);
}


export function generatePalette(style: PaletteStyle, seedHue?: number): Color[] {
  switch (style) {
    case 'vibrant-balanced':
      return generateVibrantBalanced(seedHue);
    case 'muted-analog-split':
      return generateMutedAnalogSplit(seedHue);
    case 'high-contrast':
      return generateHighContrast(seedHue);
  }
}
