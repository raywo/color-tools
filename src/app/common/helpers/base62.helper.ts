const BASE62_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Konvertiert eine Zahl in Base62
 */
function toBase62(num: number): string {
  if (num === 0) return '0';

  let result = '';

  while (num > 0) {
    result = BASE62_CHARS[num % 62] + result;
    num = Math.floor(num / 62);
  }

  return result;
}

/**
 * Konvertiert Base62 zurück in eine Zahl
 */
function fromBase62(str: string): number {
  let result = 0;

  for (let i = 0; i < str.length; i++) {
    result = result * 62 + BASE62_CHARS.indexOf(str[i]);
  }

  return result;
}

/**
 * BigInt zu Base62
 */
export function bigIntToBase62(num: bigint): string {
  if (num === 0n) return '0';

  let result = '';
  while (num > 0n) {
    result = BASE62_CHARS[Number(num % 62n)] + result;
    num = num / 62n;
  }
  return result;
}

/**
 * Base62 zu BigInt
 */
export function base62ToBigInt(str: string): bigint {
  let result = 0n;

  for (let i = 0; i < str.length; i++) {
    result = result * 62n + BigInt(BASE62_CHARS.indexOf(str[i]));
  }

  return result;
}
