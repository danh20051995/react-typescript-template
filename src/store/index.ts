import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { browserHistory } from 'src/router/history'
import { reducers } from './reducers'
import { saga } from './saga'

const initialStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const middleware = composeWithDevTools(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(browserHistory)
    )
  )

  const _s = createStore(
    reducers,
    {},
    middleware
  )

  sagaMiddleware.run(saga)
  return _s
}

export const store = initialStore()

export type TAppState = ReturnType<typeof store.getState>

export type TAppDispatch = typeof store.dispatch

export type TSelectorResult<T> = (state: TAppState) => T

export default store
