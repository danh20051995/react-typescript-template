import { IRouterOption } from 'src/router/interface'
import Forbidden from './components/403'
import Notfound from './components/404'
import InternalServerError from './components/500'
import Home from './components/home'

export const CoreRoutes: IRouterOption[] = [
  {
    path: '/',
    name: 'home',
    exact: true,
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/403',
    exact: true,
    name: '403',
    component: Forbidden
  },
  {
    path: '/404',
    exact: true,
    name: '404',
    component: Notfound
  },
  {
    path: '/500',
    exact: true,
    name: '500',
    component: InternalServerError
  }
]
