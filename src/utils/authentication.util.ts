import { StorageUtil } from './storage.util'

const tokenKey = '_tk'
const refreshTokenKey = '_rftk'

const config = {
  token: StorageUtil.getItem(tokenKey),
  refreshToken: StorageUtil.getItem(refreshTokenKey)
}

/**
 * Get token
 * @return {string}
 */
export function getToken(isRefresh = false) {
  return isRefresh
    ? config.refreshToken
    : config.token
}

/**
 * Set token
 * @param {string} token
 */
export function setToken(token?: string, refreshToken?: string) {
  if (token) {
    config.token = token
    StorageUtil.setItem(tokenKey, token)
  }
  if (refreshToken) {
    config.refreshToken = refreshToken
    StorageUtil.setItem(refreshTokenKey, refreshToken)
  }
}

/**
 * Remove storage item
 */
export function clear() {
  if (config.token) {
    config.token = ''
    StorageUtil.removeItem(tokenKey)
  }
  if (config.refreshToken) {
    config.refreshToken = ''
    StorageUtil.removeItem(refreshTokenKey)
  }
}

export class AuthenticationUtil {
  static getToken = getToken
  static setToken = setToken
  static clear = clear
  static get tokenKey() {
    return tokenKey
  }

  static get refreshTokenKey() {
    return refreshTokenKey
  }
}
