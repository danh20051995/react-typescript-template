/**
 * Object.ensure polyfill
 */

import { IObject } from 'src/interfaces'

export const isObject = (obj?: any): boolean => Boolean(obj && typeof obj === 'object' && !Array.isArray(obj))

export const ensure = <T = IObject>(obj?: any, defaultVal?: IObject): T => {
  return isObject(obj)
    ? obj
    : isObject(defaultVal)
      ? defaultVal
      : {}
}

if (!Object.isObject) {
  Object.isObject = isObject
}

if (!Object.ensure) {
  Object.ensure = ensure
}
