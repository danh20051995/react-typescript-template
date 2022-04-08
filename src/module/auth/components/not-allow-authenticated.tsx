import { FC, ReactNode, useEffect } from 'react'
import { useAppSelector } from 'src/hooks/redux'
import { generate } from 'src/router/generate'
import { browserHistory } from 'src/router/history'
import { getIsAuthenticated } from 'src/store/selectors'

export const NotAllowAuthenticated: FC<{ children?: ReactNode }> = (props) => {
  const isAuthenticated = useAppSelector(getIsAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      browserHistory.push(generate('home'))
    }
  }, [isAuthenticated])

  return <>{props.children}</>
}
