/**
 * authenticate mock
 */

export const genProfile = () => ({
  id: 1,
  name: 'admin',
  username: 'admin',
  email: 'admin@email.com',
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString()
})

export const authSuccessData = () => ({
  tokenType: 'Bearer',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicmVkaXNLZXkiLCJ2YWx1ZSI6ImtpbWFuLWNtcy1iYWNrZW5kOmNyZWRlbnRpYWxzOmFkbWluOjIwMjE6MDc6MDI6ODdhYTllNGItZGViNi00NTY2LTg4MjEtZjc1ZjVkMTVhMjkzOjVjMzMzNzM4LWU3MTctNGE5MS1hZTJjLTJkMDI2NDIzMDRiNiIsImlhdCI6MTYyNTIyMDk2MX0.jMazzA5z3JUaeHrRI78WDDXESXylFvKHr9miOKTr7P8',
  tokenExpireAt: new Date().getTime() + (604800 * 1000),
  tokenExpireIn: 604800,
  refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidG9rZW5JZCIsInZhbHVlIjoiNWMzMzM3MzgtZTcxNy00YTkxLWFlMmMtMmQwMjY0MjMwNGI2IiwiaWF0IjoxNjI1MjIwOTYxfQ.V1457W2dulrZxgIA4d5IuhmuA68QUShBtHdQm8QwuE8',
  refreshTokenExpireAt: new Date().getTime() + (31536000 * 1000),
  refreshTokenExpireIn: 31536000,
  credentials: genProfile()
})
