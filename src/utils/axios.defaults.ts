import axios from 'axios'

/**
 * axios config
 */
if (process.env.REACT_APP_API_DNS) {
  axios.defaults.baseURL = process.env.REACT_APP_API_DNS
}
