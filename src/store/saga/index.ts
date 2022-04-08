import { all, fork } from 'redux-saga/effects'

import auth from './auth'

export const saga = function * () {
  yield all([
    fork(auth)
  ])
}
