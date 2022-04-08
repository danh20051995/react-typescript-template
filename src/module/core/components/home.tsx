import { FC, useCallback } from 'react'
import { useAppDispatch } from 'src/hooks/redux'
import { AUTH_LOGOUT } from 'src/store/types'

export const Home: FC = props => {
  const dispatch = useAppDispatch()

  const logout = useCallback(() => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    if (confirm('Are you sure you want to logout?')) {
      dispatch({ type: AUTH_LOGOUT })
    }
  }, [dispatch])

  return (
    <>
      <div className="home-page">Welcome</div>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default Home
