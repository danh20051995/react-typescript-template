import { FC } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { store } from './store'
import { browserHistory } from './router/history'
import { AppLayout } from './layout'

const App: FC = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <AppLayout/>
    </Router>
  </Provider>
)

export default App
