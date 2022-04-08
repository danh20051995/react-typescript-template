import axios, { AxiosResponse } from 'axios'
import { IUserModel } from 'src/interfaces'
import { authSuccessData, genProfile } from 'src/utils/auth.mock'

export class AuthApi {
  static _prefix = '/auth'

  static login = (payload: Pick<IUserModel, 'username' | 'password'>): Promise<AxiosResponse<ReturnType<typeof authSuccessData>>> => axios.post(`${AuthApi._prefix}/login`, payload)
  static logout = (): Promise<AxiosResponse<unknown>> => axios.delete(`${AuthApi._prefix}/logout`)
  static profile = (): Promise<AxiosResponse<ReturnType<typeof genProfile>>> => axios.get(`${AuthApi._prefix}/profile`)
}
