import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import store from 'src/store'
import { StorageUtil } from 'src/utils/storage.util'
import { AuthenticationUtil } from 'src/utils/authentication.util'
import {
  AUTH_GET_PROFILE,
  AUTH_SET_CREDENTIALS,
  AUTH_LOGOUT_SUCCESS
} from 'src/store/types'

/**
 * @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig
 * @typedef {import('axios').AxiosResponse} AxiosResponse
 */

const refreshTokenUrl = '/auth/refresh'

const getRefreshToken = () => AuthenticationUtil.getToken(true)

const clearCredentials = () => {
  AuthenticationUtil.clear()
  store.dispatch({ type: AUTH_LOGOUT_SUCCESS })
}

/**
 * @param {AxiosRequestConfig} config
 * @returns {AxiosRequestConfig}
 */
const injectAuthorization = (config: AxiosRequestConfig) => {
  const token = AuthenticationUtil.getToken()
  if (token && config.headers) {
    config.headers.authorization = `Bearer ${token}`
  }

  return config
}

/**
 * @param {AxiosResponse} response
 */
const cacheResponseToken = (response: AxiosResponse) => {
  const newAuthorization = response.headers?.authorization
  const { token, refreshToken } = response.data || {}
  if (newAuthorization && token && refreshToken) {
    AuthenticationUtil.setToken(token, refreshToken)
  }

  return response
}

/**
 * @param {string} url
 * @returns {boolean}
 */
const isRefreshRequest = (url?: string) => String(url).startsWith(refreshTokenUrl)

const _authProgress: {
  CACHE_MS: number
  INTERVAL_MS: number
  REFRESHING: boolean
  RESPONSE: AxiosResponse | null
  ERROR: AxiosError | null
} = {
  CACHE_MS: 10000,
  INTERVAL_MS: 100,
  REFRESHING: false,
  RESPONSE: null,
  ERROR: null
}

const awaitNotRefreshing = () => {
  if (!_authProgress.REFRESHING) {
    return true
  }

  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (!_authProgress.REFRESHING) {
        clearInterval(interval)
        resolve(true)
      }
    }, _authProgress.INTERVAL_MS)
  })
}

const handleErrorResponse = (error: AxiosError) => {
  // handler 401/clear session
  if (error.response && error.response.status === 401) {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      clearCredentials()
      throw error
    }

    return axios
      .post(refreshTokenUrl, { refreshJwt: refreshToken })
      .then(() => axios(injectAuthorization(error.config)))
      .catch(() => {
        clearCredentials()
        throw error
      })
  }

  throw error
}

/**
 * @param {AxiosRequestConfig} config
 * @returns {AxiosResponse}
 */
const handleNormalRequest = (config: AxiosRequestConfig) => {
  injectAuthorization(config)

  return axios
    .create(Object.assign(config, { adapter: defaultAdapter }))
    .request(config)
    .then(response => cacheResponseToken(response))
    .catch(handleErrorResponse)
}

/**
 * @param {AxiosRequestConfig} config
 * @returns {AxiosResponse}
 */
const handleRefreshToken = (config: AxiosRequestConfig) => {
  _authProgress.REFRESHING = true
  return axios
    .create(Object.assign(config, { adapter: defaultAdapter }))
    .request(config)
    .then(response => {
      _authProgress.RESPONSE = response
      _authProgress.REFRESHING = false
      setTimeout(() => {
        _authProgress.RESPONSE = null
      }, _authProgress.CACHE_MS)

      cacheResponseToken(response)
      return response
    })
    .catch(error => {
      _authProgress.ERROR = error
      _authProgress.REFRESHING = false
      setTimeout(() => {
        _authProgress.ERROR = null
      }, _authProgress.CACHE_MS)

      clearCredentials()
      throw error
    })
}

/**
 * Custom axios adapter for cache IPAY
 */
const defaultAdapter = axios.defaults.adapter
axios.defaults.adapter = async function (config) {
  /**
   * SECTION: normal request
   */
  if (_authProgress.REFRESHING) {
    await awaitNotRefreshing()
  }

  const isCallRefresh = isRefreshRequest(config.url)
  if (!isCallRefresh) {
    return handleNormalRequest(config)
  }

  /**
   * SECTION: refresh token request
   */
  if (_authProgress.RESPONSE) {
    return _authProgress.RESPONSE
  }

  if (_authProgress.ERROR) {
    throw _authProgress.ERROR
  }

  return handleRefreshToken(config)
}

// IIFE load profile & listen storage update
; (() => {
  /**
   * SECTION: initial user profile
   */
  const [token, refreshToken] = [
    AuthenticationUtil.getToken(),
    AuthenticationUtil.getToken(true)
  ]

  if (token) {
    store.dispatch({ type: AUTH_GET_PROFILE })
  } else if (refreshToken) {
    axios
      .post(refreshTokenUrl, { refreshJwt: refreshToken })
      .then(({ data }) => store.dispatch({
        type: AUTH_SET_CREDENTIALS,
        value: data.credentials
      }))
      .catch(() => clearCredentials())
  } else {
    clearCredentials()
  }

  /**
   * SECTION: sync storage from another tabs
   */
  window.addEventListener('storage', () => {
    // When token is removed, reset isAuthenticated in redux
    const token = StorageUtil.getItem(AuthenticationUtil.tokenKey)
    const refreshToken = StorageUtil.getItem(AuthenticationUtil.refreshTokenKey)
    if (!token && AuthenticationUtil.getToken()) {
      clearCredentials()
    }

    if (token) {
      AuthenticationUtil.setToken(token)
    }

    if (refreshToken) {
      AuthenticationUtil.setToken(undefined, refreshToken)
    }
  })
})()
