import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { authSuccessData } from './auth.mock'

const mock = new MockAdapter(axios)

mock.onPost('/auth/login').reply((config) => {
  config.data = JSON.parse(config.data)
  if (config.data.username === 'admin' && config.data.password === 'admin') {
    const data = authSuccessData()
    return [200, data, {
      authorization: `${data.tokenType} ${data.token}`
    }]
  }

  return [400, { message: 'Invalid credentials!' }]
})

mock.onGet('/auth/profile').reply((config) => {
  const { tokenType, token, credentials } = authSuccessData()
  if (config?.headers?.authorization === `${tokenType} ${token}`) {
    return [200, credentials]
  }

  return [401, { message: 'Unauthorized' }]
})

mock.onPost('/auth/refresh').reply(() => {
  const data = authSuccessData()
  return [200, data, {
    authorization: `${data.tokenType} ${data.token}`
  }]
})

mock.onDelete('/auth/logout').reply(204)
