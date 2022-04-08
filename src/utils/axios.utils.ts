/**
 * @typedef {import('axios').AxiosError} AxiosError
 */

import { AxiosError } from 'axios'
import { browserHistory } from 'src/router/history'

/**
 * Get axios response error message
 * @param {AxiosError} error
 * @return {string}
 */
export const getApiErrorMessage = (error: AxiosError) => {
  try {
    if (error.response && typeof error.response === 'object') {
      const response = error.response
      return (
        response.data &&
        (
          response.data.message ||
          response.data.error ||
          JSON.stringify(response.data, null, 2)
        )
      )
    }

    return typeof error === 'string' ? error : JSON.stringify(error, null, 2)
  } catch (err) {
    console.log({ err })
    return String(error)
  }
}

/**
 * Get axios response error message
 * @param {AxiosError} error
 */
export const navigateByAxiosError = (error: AxiosError) => {
  const status = error.response?.status
  browserHistory.push(`/${status}`)
}
