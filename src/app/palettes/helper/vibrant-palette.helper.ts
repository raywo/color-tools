import {randomBetween} from '@common/helpers/random.helper';
import {Color} from 'chroma-js';
import {triad} from '@common/helpers/hue.helper';
import {fromHsl} from '@common/helpers/colorFromHsl.helper';
import {vary} from '@palettes/helper/number.helper';
import {clamp01} from '@common/helpers/hsl.helper';


/**
 * Generates a set of vibrant and balanced colors based on a given hue or
 * a random seed hue.
 *
 * @param {number} [seedHue] - The hue value to base the color generation on.
 *                             If omitted, a random value is used.
 * @return {Color[]} An array of generated colors, with vibrant and
 *                   complementary characteristics.
 */
export function generateVibrantBalanced(seedHue?: number): Color[] {
  const h0 = seedHue ?? randomBetween(0, 360);
  const tri = triad(h0);
  const baseS = 0.75;
  const baseL = 0.52;

  const accents = tri.map(h => fromHsl({
    h: vary(h, 6),
    s: clamp01(vary(baseS, 0.10)),
    l: clamp01(vary(baseL, 0.08))
  }));

  // Helle, gedämpfte Ergänzungstöne
  const light1 = fromHsl({
    h: vary(h0 + 60, 8),
    s: clamp01(vary(0.35, 0.10)),
    l: clamp01(vary(0.78, 0.06))
  });

  const light2 = fromHsl({
    h: vary(h0 - 20, 8),
    s: clamp01(vary(0.30, 0.08)),
    l: clamp01(vary(0.70, 0.06))
  });

  return [...accents, light1, light2];
}
