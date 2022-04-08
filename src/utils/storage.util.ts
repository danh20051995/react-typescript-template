let _storage: Storage = window.sessionStorage
// let _storage: Storage = window.localStorage

/**
 * Get storage item
 */
export const getItem = (key: string) => {
  try {
    const val = _storage.getItem(key)
    return val ? JSON.parse(val) : undefined
  } catch (error) {
    console.error(error)
  }
}

/**
 * Set storage item
 */
export const setItem = (key: string, value?: any) => {
  return _storage.setItem(
    key,
    JSON.stringify(value)
  )
}

/**
 * Remove Storage item
 */
export const removeItem = (key: string) => {
  return _storage.removeItem(key)
}

export class StorageUtil {
  static getItem = getItem
  static setItem = setItem
  static removeItem = removeItem
  static useLocalStorage() {
    _storage = window.localStorage
  }

  static uesSessionStorage() {
    _storage = window.sessionStorage
  }
}
