import { SyntheticEvent } from 'react'

/**
 * @param {Event|SyntheticEvent} e
 */
export const preventDefault = (e: Event|SyntheticEvent) => {
  e.preventDefault()
}

/**
 * @param {Event|SyntheticEvent} e
 */
export const stopPropagation = (e: Event|SyntheticEvent) => {
  e.stopPropagation()
}
