import { FC } from 'react'

export const InternalServerError: FC = props => (
  <div className="error-text">
    <h1 className="error-title">
      Woops!
      <br/>
      Something went wrong :(
    </h1>
    <h2 className="error-subtitle">
      Have you tried turning it off and on again?
    </h2>
  </div>
)

export default InternalServerError
