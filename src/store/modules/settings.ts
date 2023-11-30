import { storage } from '@/store/plugins/localStorage'
import type { Context, Store } from '@/store/types'

export type ScaleValue = -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5;
export type InputStyle = 'filled' | 'outlined';
export type RippleEffect = boolean;

export interface SettingsState {
  theme: ThemePayload;
  scale: ScaleValue;
  inputStyle: InputStyle;
  rippleEffect: RippleEffect;
}

export interface ThemePayload {
  key: string;
  name: string;
}

export const STORAGE_KEY_THEME = 'settings.theme'
export const STORAGE_KEY_SCALE = 'settings.scale'
export const STORAGE_KEY_INPUT_STYLE = 'settings.inputStyle'
export const STORAGE_KEY_RIPPLE = 'settings.ripple'

export const SCALE_MIN = -5
export const SCALE_MAX = 5

export const DEFAULT_THEME_PAYLOAD: ThemePayload = {
  key: 'viva-dark',
  name: 'Viva/Dark',
}

export const DEFAULT_INPUT_STYLE = 'outlined'
export const DEFAULT_SCALE = 0
export const DEFAULT_RIPPLE_EFFECT = true

export default {
  state: {
    theme:
      storage.pull<ThemePayload>(STORAGE_KEY_THEME) ?? DEFAULT_THEME_PAYLOAD,
    scale: storage.pull<ScaleValue>(STORAGE_KEY_SCALE) ?? DEFAULT_SCALE,
    inputStyle:
      storage.pull<InputStyle>(STORAGE_KEY_INPUT_STYLE) ?? DEFAULT_INPUT_STYLE,
    rippleEffect:
      storage.pull<RippleEffect>(STORAGE_KEY_RIPPLE) ?? DEFAULT_RIPPLE_EFFECT,
  },

  mutations: {
    theme(state: SettingsState, payload: ThemePayload) {
      state.theme = payload

      storage.push<ThemePayload>(STORAGE_KEY_THEME, payload)
    },

    scale(state: SettingsState, value: ScaleValue) {
      state.scale = value

      storage.push<ScaleValue>(STORAGE_KEY_SCALE, value)
    },

    inputStyle(state: SettingsState, inputStyle: InputStyle) {
      state.inputStyle = inputStyle

      storage.push<InputStyle>(STORAGE_KEY_INPUT_STYLE, inputStyle)
    },

    rippleEffect(state: SettingsState, enabled: RippleEffect) {
      state.rippleEffect = enabled

      storage.push<RippleEffect>(STORAGE_KEY_RIPPLE, enabled)
    },
  },

  actions: {
    setTheme(this: Store, _ctx: Context, payload: ThemePayload) {
      this.commit('theme', payload)
    },

    setScale(this: Store, _ctx: Context, scale: ScaleValue) {
      this.commit('scale', scale)
    },

    setInputStyle(this: Store, _ctx: Context, inputStyle: InputStyle) {
      this.commit('inputStyle', inputStyle)
    },

    setRippleEffect(this: Store, _ctx: Context, enabled: RippleEffect) {
      this.commit('rippleEffect', enabled)
    },
  },
}
