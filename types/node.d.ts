declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production'
    readonly PORT: string
    readonly REACT_APP_API_DNS: string
    readonly [key: string]: string
  }
}
