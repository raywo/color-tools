export function inRgbRange(this: void, value: number | null): value is number {
  if (value === null) return false;

  return value >= 0 && value <= 255;
}

export function inHslAngleRange(this: void, value: number | null): value is number {
  if (value === null) return false;

  return value >= 0 && value <= 360;
}

export function inHslPercentRange(this: void, value: number | null): value is number {
  if (value === null) return false;

  return value >= 0 && value <= 100;
}
