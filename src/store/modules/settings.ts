import type { Context, Store } from '@/store'
import { storage } from '@/store/plugins/localStorage.ts'

export type ScaleValue = -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5;
export type InputStyle = 'filled' | 'outlined';

export type Theme<T = unknown> = T[keyof T]
export interface SettingsState {
  theme: Theme;
  scale: ScaleValue;
  inputStyle: InputStyle;
}

export const STORAGE_KEY_THEME = 'settings.theme'
export const STORAGE_KEY_SCALE = 'settings.scale'
export const STORAGE_KEY_INPUT_STYLE = 'settings.inputStyle'

export const SCALE_MIN = -5
export const SCALE_MAX = 5

export const DEFAULT_THEME = 'viva-dark'

export const DEFAULT_INPUT_STYLE = 'outlined'
export const DEFAULT_SCALE = 0

export default {
  state: {
    theme: storage.pull<Theme>(STORAGE_KEY_THEME) ?? DEFAULT_THEME,
    scale: storage.pull<ScaleValue>(STORAGE_KEY_SCALE) ?? DEFAULT_SCALE,
    inputStyle: storage.pull<InputStyle>(STORAGE_KEY_INPUT_STYLE) ?? DEFAULT_INPUT_STYLE,
  },

  mutations: {
    theme(state: SettingsState, name: Theme) {
      state.theme = name

      storage.push<Theme>(STORAGE_KEY_THEME, name)
    },

    scale(state: SettingsState, value: ScaleValue) {
      state.scale = value

      storage.push<ScaleValue>(STORAGE_KEY_SCALE, value)
    },

    inputStyle(state: SettingsState, inputStyle: InputStyle) {
      state.inputStyle = inputStyle

      storage.push<InputStyle>(STORAGE_KEY_INPUT_STYLE, inputStyle)
    },
  },

  actions: {
    setTheme(this: Store, _ctx: Context, name: Theme) {
      this.commit('theme', name)
    },

    setScale(this: Store, _ctx: Context, scale: ScaleValue) {
      this.commit('scale', scale)
    },

    setInputStyle(this: Store, _ctx: Context, inputStyle: InputStyle) {
      this.commit('inputStyle', inputStyle)
    },
  },
}
