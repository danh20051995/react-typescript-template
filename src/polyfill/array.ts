/**
 * Array.ensure polyfill
 */

export const ensure = <T = any>(val: T | T[], defaults?: T[]): T[] => {
  if (Array.isArray(val)) {
    return val
  }

  if (Array.isArray(defaults)) {
    return defaults
  }

  return [val]
}

if (!Array.ensure) {
  Array.ensure = ensure
}
