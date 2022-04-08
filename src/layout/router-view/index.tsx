import { FC } from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'

import { StorageUtil } from 'src/utils/storage.util'
import { getIsAuthenticated } from 'src/store/selectors/auth'
import { routes } from 'src/router'
import { AUTH_FALLBACK_KEY } from 'src/constants'
import { useAppSelector } from 'src/hooks/redux'
import { generate } from 'src/router/generate'
import { IRouterOption } from 'src/router/interface'
import Styles from './style.module.scss'

const AuthRoute: FC<{
  path: string
  exact?: boolean
  component: IRouterOption['component']
}> = (props) => {
  const location = useLocation()
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  if (isAuthenticated) {
    return (
      <Route
        path={props.path}
        exact={props.exact}
        component={props.component}
      />
    )
  }

  StorageUtil.setItem(AUTH_FALLBACK_KEY, `${location.pathname}${location.search}`)
  return <Redirect to={generate('login')}/>
}

const RoutesSwitch = (
  <Switch>
    {Array.ensure(routes).map(item => {
      if (item.meta?.requireAuth) {
        return <AuthRoute key={item.path} {...item}/>
      }
      return (
        <Route
          key={item.path}
          path={item.path}
          exact={item.exact}
          component={item.component}
        />
      )
    })}
  </Switch>
)

export const RouterView: FC = props => {
  const isAuthenticated = useAppSelector(getIsAuthenticated)

  return (
    <section className={Styles.routerView}>
      {isAuthenticated !== null && RoutesSwitch}
    </section>
  )
}
