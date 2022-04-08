import { AuthRoutes } from 'src/module/auth/routes'
import { CoreRoutes } from 'src/module/core/routes'
import Notfound from 'src/module/core/components/404'
import { IRouterOption } from './interface'

export const routes: IRouterOption[] = [
  ...CoreRoutes,
  ...AuthRoutes,

  // last route handle 404 error
  {
    path: '*',
    component: Notfound
  }
]

export default routes
