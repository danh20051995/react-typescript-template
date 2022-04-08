import { IUserModel } from 'src/interfaces/models'
import { TAuthSagaAction } from '../saga/auth'

/* authentication actions */
export const AUTH_LOGIN = Symbol('AUTH_LOGIN')
export const AUTH_GET_PROFILE = Symbol('AUTH_GET_PROFILE')
export const AUTH_SET_CREDENTIALS = Symbol('AUTH_SET_CREDENTIALS')
export const AUTH_LOGOUT = Symbol('AUTH_LOGOUT')
export const AUTH_LOGOUT_SUCCESS = Symbol('AUTH_LOGOUT_SUCCESS')

/**
 * state
 */
export interface IAuthState {
  isAuthenticated: boolean | null
  credentials: IUserModel
}

/**
 * actions
 */
export type TAuthAction = {
  type: typeof AUTH_SET_CREDENTIALS | typeof AUTH_LOGOUT_SUCCESS
  value?: IUserModel
} | TAuthSagaAction
