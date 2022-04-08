import { FC } from 'react'
import { RouterView } from './router-view'
import Styles from './style.module.scss'

export const AppLayout: FC = props => {
  return (
    <div className={Styles.appLayout}>
      <main className={Styles.appLayoutContent}>
        <RouterView/>
      </main>
    </div>
  )
}
