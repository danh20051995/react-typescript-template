import { IModel } from './model'

export interface IUserModel extends IModel {
  name?: string
  email?: string
  username?: string
  password?: string
}
