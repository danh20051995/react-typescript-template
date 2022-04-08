type ArgumentTypes<F extends (...args: any[]) => any> = F extends (...args: infer A) => any ? A : never

interface ArrayConstructor {
  ensure<T = any>(array: T | T[], defaults?: T[]): T[]
}

interface ObjectConstructor {
  isObject(obj?: any): boolean
  ensure<T = { [key: string]: any }>(obj?: any, defaultVal?: { [key: string]: any }): T
}
