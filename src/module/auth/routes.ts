import { IRouterOption } from 'src/router/interface'
import { Login } from './components/login'

export const AuthRoutes: IRouterOption[] = [
  {
    path: '/login',
    component: Login,
    name: 'login',
    exact: true,
    meta: {
      requireAuth: false
    }
  }
]
