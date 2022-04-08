import { AxiosError } from 'axios'
import { takeLatest, put } from 'redux-saga/effects'
import { StorageUtil } from 'src/utils/storage.util'
import { notify } from 'src/utils/notify.util'
import { AuthenticationUtil } from 'src/utils/authentication.util'
import { getApiErrorMessage } from 'src/utils/axios.utils'
import { AUTH_FALLBACK_KEY } from 'src/constants'
import { AuthApi } from 'src/api'
import { browserHistory } from 'src/router/history'
import { generate } from 'src/router/generate'
import {
  AUTH_LOGIN,
  AUTH_SET_CREDENTIALS,
  AUTH_LOGOUT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_GET_PROFILE
} from '../types'

/**
 * Get user credentials with jwt
 */
function * getProfile(action: { type: typeof AUTH_GET_PROFILE }) {
  try {
    const { data } = yield AuthApi.profile()
    yield put({
      type: AUTH_SET_CREDENTIALS,
      value: data
    })
  } catch (error) {
    yield put({ type: AUTH_LOGOUT_SUCCESS })
  }
}

/**
 * Call login with user credentials
 * @param {object} action
 * @return {Redirect} Go home
 */
function * login(action: { type: typeof AUTH_LOGIN; payload: ArgumentTypes<typeof AuthApi.login>[0] }) {
  try {
    const { data } = yield AuthApi.login(action.payload)
    if (data.token) {
      const { credentials } = Object.ensure(data)
      yield put({
        type: AUTH_SET_CREDENTIALS,
        value: credentials
      })

      const toURL = StorageUtil.getItem(AUTH_FALLBACK_KEY)
      StorageUtil.removeItem(AUTH_FALLBACK_KEY)
      browserHistory.push(toURL || generate('home'))
    }

    notify({ message: 'Login successfully!' })
  } catch (error) {
    notify({
      type: 'error',
      message: getApiErrorMessage(error as AxiosError)
    })
  }
}

/**
 * Logout, redirect to home, clear credentials
 * @return {Redirect} Go home
 */
function * logout(action: { type: typeof AUTH_LOGOUT }) {
  try {
    yield AuthApi.logout()
  } catch (error) {
    notify({
      type: 'error',
      message: getApiErrorMessage(error as AxiosError)
    })
  } finally {
    yield put({ type: AUTH_LOGOUT_SUCCESS })
    yield AuthenticationUtil.clear()
    browserHistory.push(generate('home'))
  }
}

export type TAuthSagaAction = ArgumentTypes<typeof getProfile>[0]
  | ArgumentTypes<typeof login>[0]
  | ArgumentTypes<typeof logout>[0]

export const handler = function * () {
  yield takeLatest(AUTH_LOGIN, login)
  yield takeLatest(AUTH_LOGOUT, logout)
  yield takeLatest(AUTH_GET_PROFILE, getProfile)
}

export default handler
