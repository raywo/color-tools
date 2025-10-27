import chroma, {Color} from 'chroma-js';
import {inRgbRange} from './range.helper';


const RGB_PATTERN = /^rgb\((\d{1,3})[,\s+]\s*(\d{1,3})[,\s+]\s*(\d{1,3})\)$/;
const HSL_PATTERN = /^hsl\(\s*(\d+(?:\.\d+)?)(?:\s*deg)?\s*(?:,|\s)\s*(?:(\d+(?:\.\d+)?%)|(\d+(?:\.\d+)?))\s*(?:,|\s)\s*(?:(\d+(?:\.\d+)?%)|(\d+(?:\.\d+)?))\s*\)$/;


export function isHex(this: void, value: string): boolean {
  const hex = value.startsWith("#") ? value.slice(1) : value;
  const validLengths = [3, 6, 8];
  const hexPattern = /^[0-9A-Fa-f]+$/;

  return validLengths.includes(hex.length) && hexPattern.test(hex);
}


export function isRgb(this: void, value: string): boolean {
  return RGB_PATTERN.test(value);
}

export function isHsl(this: void, value: string): boolean {
  return HSL_PATTERN.test(value);
}


export function colorFrom(this: void, value: string | null): Color | null {
  if (!value) return null;

  if (isHex(value)) {
    return chroma(value);
  }

  if (isRgb(value)) {
    return handleRgb(value);
  }

  if (isHsl(value)) {
    return handleHsl(value);
  }

  return null;
}


function handleRgb(value: string): Color | null {
  const matches = value.match(RGB_PATTERN);

  if (!matches) return null;

  const [_, redS, greenS, blueS] = matches;
  const red = Number(redS);
  const green = Number(greenS);
  const blue = Number(blueS);

  if (!inRgbRange(red) || !inRgbRange(green) || !inRgbRange(blue)) return null;

  return chroma([red, green, blue]);
}


function handleHsl(value: string): Color | null {
  const matches = value.match(HSL_PATTERN);

  if (!matches) return null;

  const [_, angle, saturationPercent, saturationDec, luminancePercent, luminanceDec] = matches;

  const hue = Number(angle);
  let saturation = 0;
  let luminance = 0;

  if (saturationPercent) {
    saturation = Number(saturationPercent.replace("%", "")) / 100;
  } else if (saturationDec) {
    saturation = Number(saturationDec);
  }

  if (luminancePercent) {
    luminance = Number(luminancePercent.replace("%", "")) / 100;
  } else if (luminanceDec) {
    luminance = Number(luminanceDec);
  }

  return chroma.hsl(hue, saturation, luminance);
}
