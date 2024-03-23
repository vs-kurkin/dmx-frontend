import type { Store } from '@/store'
import { type PrimeVueConfiguration, usePrimeVue } from 'primevue/config'
import { watch } from 'vue'

type PrimeVue = ReturnType<typeof usePrimeVue>;
type Theme = string;
type Scale = number;
type InputStyle = PrimeVueConfiguration['inputStyle'];

type Settings = {
  theme: Theme
  scale: Scale
  inputStyle: InputStyle
}

export const THEME_LINK_ID = 'theme_css'

let primeVue: PrimeVue
let currentSettings: Settings

export const setupPrimeVue = (instance: PrimeVue) => {
  primeVue = instance
}

const setScale = (value: Scale) => {
  document.documentElement.style.fontSize = `${1 + value / 10}rem`
}

const setInputStyle = (inputStyle: InputStyle) => {
  primeVue.config.inputStyle = inputStyle
}

const setTheme = (name: Theme) => {
  if (currentSettings.theme) {
    primeVue.changeTheme(currentSettings.theme, name, THEME_LINK_ID)
  }
}

export const applySettings = (settings: Settings) => {
  setTheme(settings.theme)
  setScale(settings.scale)
  setInputStyle(settings.inputStyle)

  currentSettings = { ...settings }
}

export default (store: Store) => {
  const {settings} = store.state

  currentSettings = { ...settings }

  watch(settings, applySettings)
}
