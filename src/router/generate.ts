import qs from 'qs'
import { routes } from '.'
import { alphabeticalSort } from 'src/helpers'
import { IObject } from 'src/interfaces'

/**
 * Replace route parameters with params.
 * @param {string} routePath
 * @param {object} params
 * @return {string}
 */
const getPathURL = (routePath: string, params: IObject) => {
  let url = routePath
  for (const key of Object.keys(params)) {
    url = url.replace(`:${key}`, params[key])
  }

  return url
}

/**
 * Generate route path with parameters by name | path
 * @param {string|[string, { [key in string]: string|number }]} options
 * @param {{ [key in string]: any }} queryParams
 * @return {string}
 */
export const generate = (
  options: string | [string, IObject],
  queryParams?: IObject
) => {
  let match = options
  let params = {}
  if (Array.isArray(options)) {
    [match, params = {}] = options
  }

  const route = routes.find(route => route.name === match || route.path === match)
  if (route) {
    const args = [
      getPathURL(route.path, params),
      qs.stringify(Object.ensure(queryParams), {
        arrayFormat: 'repeat',
        sort: alphabeticalSort
      })
    ].filter(str => !!str)

    return args.join('?')
  }

  // throw new Error(`Route '${match}' not exists.`)
  console.error(new Error(`Route '${match}' not exists.`))
  return '/'
}
