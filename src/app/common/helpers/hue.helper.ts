import {hueWrap} from './hsl.helper';


/**
 * Calculates the complementary hue of the given hue by adding 180 degrees
 * and wrapping within the acceptable range.
 *
 * @param {number} h - The original hue to find the complement for.
 * @return {number} The complementary hue wrapped within the acceptable range.
 */
export function complement(h: number): number {
  return hueWrap(h + 180);
}


/**
 * Generates a triad of hues based on the given hue value.
 *
 * @param {number} h - The base hue value, typically in the range [0, 360).
 * @return {number[]} An array containing three hue values: the base hue,
 *                     and two hues offset by +120 and -120 degrees, respectively,
 *                     each wrapped within the valid hue range.
 */
export function triad(h: number): number[] {
  return [hueWrap(h), hueWrap(h + 120), hueWrap(h - 120)];
}


/**
 * Calculates the split-complementary colors of a given hue.
 *
 * @param {number} h - The base hue in degrees, typically within the range 0-360.
 * @param {number} [splitDeg=30] - The degree of split offset for the complementary hues.
 * @return {number[]} An array containing two split-complementary hues in degrees.
 */
export function splitComplement(h: number, splitDeg: number = 30): number[] {
  return [hueWrap(h + 180 - splitDeg), hueWrap(h + 180 + splitDeg)];
}


/**
 * Generates an array of hues distributed evenly within a specified range.
 *
 * @param {number} h - The central hue value around which the range is calculated.
 * @param {number} [rangeDeg=30] - The width of the range in degrees.
 * @param {number} [count=3] - The number of hues to generate within the range.
 * @return {number[]} An array of hue values evenly distributed within the specified range.
 */
export function analogRange(h: number, rangeDeg: number = 30, count: number = 3): number[] {
  const start = h - rangeDeg / 2;
  const step = rangeDeg / Math.max(1, count - 1);

  return Array.from({length: count}, (_, i) => hueWrap(start + i * step));
}
