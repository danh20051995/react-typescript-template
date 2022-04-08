import { createSelector } from 'reselect'
import { TAppState, TSelectorResult } from 'src/store'
import { IAuthState } from '../types'

export const getCredentials: TSelectorResult<IAuthState['credentials']> = createSelector(
  (state: TAppState) => state.auth,
  (auth: IAuthState) => auth.credentials
)

export const getIsAuthenticated: TSelectorResult<IAuthState['isAuthenticated']> = createSelector(
  (state: TAppState) => state.auth,
  (auth: IAuthState) => auth.isAuthenticated
)
