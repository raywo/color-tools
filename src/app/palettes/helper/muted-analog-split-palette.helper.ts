import {Color} from 'chroma-js';
import {fromHsl} from '@common/helpers/colorFromHsl.helper';
import {clamp01} from '@common/helpers/hsl.helper';
import {vary} from '@palettes/helper/number.helper';
import {analogRange, splitComplement} from '@common/helpers/hue.helper';


/**
 * Generates a muted analog split color palette based on a given seed hue or
 * a random hue if no seed is provided.
 *
 * @param {number} [seedHue] - Optional seed hue (in degrees) to generate the
 *                             color palette. If not provided, a random hue
 *                             is used.
 * @return {Color[]} An array of colors representing the muted analog split
 *                   palette, including neutral, analogous, pastel, and
 *                   complementary tones.
 */
export function generateMutedAnalogSplit(seedHue?: number): Color[] {
  const h0 = seedHue ?? Math.random() * 360;

  // Grauneutral
  const neutral = fromHsl({
    h: h0,
    s: clamp01(vary(0.06, 0.03)),
    l: clamp01(vary(0.34, 0.05))
  });

  // Analoger Block
  const analogs = analogRange(h0, 28, 2).map(h => fromHsl({
    h: vary(h, 5),
    s: clamp01(vary(0.20, 0.10)),
    l: clamp01(vary(0.50, 0.10))
  }));

  // Heller Pastell
  const pastel = fromHsl({
    h: vary(h0 + 20, 6),
    s: clamp01(vary(0.45, 0.10)),
    l: clamp01(vary(0.82, 0.05))
  });

  // Gegenpol (Split-Komplementär, dunkler und gedämpft)
  const [sc1] = splitComplement(h0, 28);
  const counter = fromHsl({
    h: vary(sc1, 6),
    s: clamp01(vary(0.18, 0.08)),
    l: clamp01(vary(0.42, 0.08))
  });

  return [neutral, analogs[0], pastel, counter, analogs[1]];
}
