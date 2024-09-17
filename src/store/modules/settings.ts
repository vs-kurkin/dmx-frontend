import type themes from '@/configs/themes'
import { type Context } from '@/store'
import { storage } from '@/store/plugins/localStorage'

export type SettingScale = -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5;
export type SettingInput = 'filled' | 'outlined';

export type SettingTheme = keyof typeof themes
export interface SettingsState {
  theme: SettingTheme;
  scale: SettingScale;
  input: SettingInput;
}

interface Ctx extends Context<SettingsState> {}

export const STORAGE_KEY_THEME = 'settings.theme'
export const STORAGE_KEY_SCALE = 'settings.scale'
export const STORAGE_KEY_INPUT = 'settings.input'

export const SCALE_MIN = -5
export const SCALE_MAX = 5

export const DEFAULT_THEME = 'viva-dark'

export const DEFAULT_INPUT = 'outlined'
export const DEFAULT_SCALE = 0


export default {
  namespaced: true,

  state: {
    theme: storage.pull<SettingTheme>(STORAGE_KEY_THEME) ?? DEFAULT_THEME,
    scale: storage.pull<SettingScale>(STORAGE_KEY_SCALE) ?? DEFAULT_SCALE,
    input: storage.pull<SettingInput>(STORAGE_KEY_INPUT) ?? DEFAULT_INPUT,
  } as SettingsState,

  mutations: {
    theme(state: SettingsState, name: SettingTheme) {
      state.theme = name

      storage.push<SettingTheme>(STORAGE_KEY_THEME, name)
    },

    scale(state: SettingsState, value: SettingScale) {
      state.scale = value

      storage.push<SettingScale>(STORAGE_KEY_SCALE, value)
    },

    input(state: SettingsState, style: SettingInput) {
      state.input = style

      storage.push<SettingInput>(STORAGE_KEY_INPUT, style)
    },
  },

  actions: {
    theme({ commit }: Ctx, name: SettingTheme) {
      commit('theme', name)
    },

    scale({ commit }: Ctx, scale: SettingScale) {
      commit('scale', scale)
    },

    input({ commit }: Ctx, style: SettingInput) {
      commit('input', style)
    },
  },
}
