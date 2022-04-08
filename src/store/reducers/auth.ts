import { AUTH_SET_CREDENTIALS, AUTH_LOGOUT_SUCCESS, IAuthState, TAuthAction } from '../types'

export const initState: IAuthState = {
  isAuthenticated: null,
  credentials: {}
}

export const reducer = (state = initState, action: TAuthAction) => {
  switch (action.type) {
    case AUTH_SET_CREDENTIALS:
      return {
        ...state,
        isAuthenticated: true,
        credentials: action.value
      }
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        credentials: {}
      }
    default:
      return state
  }
}

export default reducer
