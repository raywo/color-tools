import {Color} from 'chroma-js';
import {fromHsl} from '@common/helpers/colorFromHsl.helper';
import {vary} from '@palettes/helper/number.helper';
import {clamp01} from '@common/helpers/hsl.helper';
import {complement} from '@common/helpers/hue.helper';


/**
 * Generates a high-contrast color palette based on a seed hue or a
 * randomly selected hue.
 *
 * @param {number} [seedHue] - An optional base hue value in degrees (0-360)
 *                             used to generate the color palette. If not
 *                             provided, a random hue is used.
 * @return {Color[]} An array of high-contrast Color objects representing a
 *                   color palette, including vibrant accents, deep tones,
 *                   and near-white.
 */
export function generateHighContrast(seedHue?: number): Color[] {
  const h0 = seedHue ?? Math.random() * 360;

  // Akzent 1 (vibrant)
  const accent1 = fromHsl({
    h: vary(h0, 5),
    s: clamp01(vary(1.0, 0.0)), // maximal
    l: clamp01(vary(0.50, 0.04))
  });

  // Akzent 2 (komplementär, vibrant bis leicht dunkler)
  const accent2 = fromHsl({
    h: vary(complement(h0), 6),
    s: clamp01(vary(1.0, 0.0)),
    l: clamp01(vary(0.50, 0.06))
  });

  // Tiefer Near-Black
  const deep = fromHsl({
    h: vary(h0 + 20, 10),
    s: clamp01(vary(0.08, 0.05)),
    l: clamp01(vary(0.15, 0.03))
  });

  // Satter dunkler Nebenakzent (kühl/blaulastig in Vorlage)
  const darkAccent = fromHsl({
    h: vary(h0 + 220, 10),
    s: clamp01(vary(0.45, 0.10)),
    l: clamp01(vary(0.32, 0.06))
  });

  // Sehr helles Near-White
  const nearWhite = fromHsl({
    h: vary(h0 + 200, 8),
    s: clamp01(vary(1.0, 0.0)),
    l: clamp01(vary(0.96, 0.02))
  });

  return [accent1, accent2, darkAccent, deep, nearWhite];
}
