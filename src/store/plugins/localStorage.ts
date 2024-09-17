import type { StoreProject } from '@/store'

export interface StorageFacade {
  pull: <T = unknown>(key: string) => T
  push: <T = unknown>(key: string, value: T) => void
}

export const storage = {
  pull<T = unknown>(key: string): T {
    return JSON.parse(localStorage.getItem(key) as string) as T
  },

  push<T = unknown>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  clear(key: string) {
    localStorage.removeItem(key)
  },
}

export default (store: StoreProject) => {
  store.storage = storage
}
