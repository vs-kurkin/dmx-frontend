import { storage } from '@/store/plugins/localStorage'
import type { Context, Store } from '@/store/types'


export interface SettingsState {
  theme: ThemePayload,
  scale: string,
}

export interface ThemePayload {
  key: string
  name: string
}

export const STORAGE_KEY_THEME = 'theme'
export const STORAGE_KEY_SCALE = 'scale'

export const DEFAULT_THEME_PAYLOAD = {
  key: 'viva-dark',
  name: 'Viva Dark',
}

export default {
  state: {
    theme: storage.pull<ThemePayload>(STORAGE_KEY_THEME) ?? DEFAULT_THEME_PAYLOAD,
    scale: storage.pull<string>(STORAGE_KEY_SCALE),
  },

  mutations: {
    theme(state: SettingsState, payload: ThemePayload) {
      state.theme = payload

      storage.push<ThemePayload>(STORAGE_KEY_THEME, payload)
    },

    scale(state: SettingsState, value: string) {
      state.scale = value

      storage.push<string>(STORAGE_KEY_SCALE, value)
    },
  },

  actions: {
    setTheme(this: Store, ctx: Context, payload: ThemePayload) {
      this.commit('theme', payload)
    },

    setScale(this: Store, ctx: Context, value: string) {
      this.commit('scale', value)
    },
  },
}
