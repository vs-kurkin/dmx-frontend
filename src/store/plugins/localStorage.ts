import type { Store } from '@/store/types'

export interface StorageFacade {
  pull: <T = unknown>(key: string) => T
  push: <T = unknown>(key: string, value: T) => void
}

export const storage = {
  pull<T = unknown>(key: string): T {
    return JSON.parse(localStorage.getItem(key))
  },

  push<T = unknown>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  clear(key: string) {
    localStorage.removeItem(key)
  },
}

export default (store: Store) => {
  store.storage = storage
};
