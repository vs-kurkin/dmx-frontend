import type { State, Store } from '@/store'
import type { InputStyle, RippleEffect, ScaleValue, SettingsState, ThemePayload } from '@/store/modules/settings'
import { watch } from 'vue'

let primeVue, linkId, previous

const setScale = (scale: ScaleValue) => {
  document.documentElement.style.fontSize = 1 + (scale / 10) + 'rem'
}

const setRipple = (enabled: RippleEffect) => {
  primeVue.config.ripple = enabled
}

const setInputStyle = (inputStyle: InputStyle) => {
  primeVue.config.inputStyle = inputStyle
}

const setTheme = (theme: ThemePayload, previous = theme) => {
  primeVue.changeTheme(previous.key, theme.key, linkId)
}

export const setupPrimeVue = (instance, id: string) => {
  primeVue = instance
  linkId = id
}

export const applySettings = (settings: SettingsState, previous?: SettingsState) => {
  previous && setTheme(settings.theme, previous.theme)

  setScale(settings.scale)
  setInputStyle(settings.inputStyle)
  setRipple(settings.rippleEffect)
}

export default (store: Store<State>) => {
  const settings: SettingsState = store.state.settings

  previous = { ...settings }

  watch(settings, (state: SettingsState) => {
    applySettings(state, previous)

    previous = { ...state }
  })
};
