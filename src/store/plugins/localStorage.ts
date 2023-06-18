import type { Store } from '@/store/types'

export interface StorageFacade {
  pull: <T>(key: string) => T
  push: <T>(key: string, value: T) => void
}

export const storage = {
  pull<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key))
  },

  push<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  },
}

export default (store: Store) => {
  store.storage = storage
};
