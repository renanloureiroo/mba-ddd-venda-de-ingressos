import { AsyncLocalStorage } from 'async_hooks'

export const txStorage = new AsyncLocalStorage<unknown>()
