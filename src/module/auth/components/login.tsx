import { ChangeEventHandler, FC, FormEventHandler, useCallback, useState } from 'react'
import { useAppDispatch } from 'src/hooks/redux'
import { AUTH_LOGIN } from 'src/store/types'
import { preventDefault } from 'src/utils/event.util'
import { NotAllowAuthenticated } from './not-allow-authenticated'

export const Login: FC = props => {
  const dispatch = useAppDispatch()
  const [formValues, setFormValues] = useState<{
    username?: string
    password?: string
  }>({})

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.persist()
    const { name, value } = e.target
    setFormValues(
      (prev) => ({
        ...prev,
        [name]: value
      })
    )
  }

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    preventDefault(e)
    dispatch({
      type: AUTH_LOGIN,
      payload: formValues
    })
  }, [formValues, dispatch])

  return (
    <NotAllowAuthenticated>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formValues.username || ''}
          onChange={handleChangeInput}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password || ''}
          onChange={handleChangeInput}
          required
        />

        <input
          type="submit"
          value="Login"
        />
      </form>
    </NotAllowAuthenticated>
  )
}
