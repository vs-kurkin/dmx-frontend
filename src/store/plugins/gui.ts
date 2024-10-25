import type { StoreProject } from '@/store'
import { type PrimeVueConfiguration, type usePrimeVue } from 'primevue/config'
import { watch } from 'vue'

type PrimeVue = ReturnType<typeof usePrimeVue>;
type ThemeSetting = string;
type ScaleSetting = number;
type InputSetting = PrimeVueConfiguration['inputVariant'];

type Settings = {
  theme: ThemeSetting
  scale: ScaleSetting
  input: InputSetting
}

export const THEME_LINK_ID = 'theme_css'

let primeVue: PrimeVue
let currentSettings: Settings

export const setupPrimeVue = (instance: PrimeVue) => {
  primeVue = instance
}

const setScale = (value: ScaleSetting) => {
  document.documentElement.style.fontSize = `${1 + value / 10}rem`
}

const setInputStyle = (name: InputSetting) => {
  primeVue.config.inputVariant = name
}

const setTheme = (name: ThemeSetting) => {
  if (currentSettings.theme) {
    primeVue.config.theme = name
  }
}

export const applySettings = (settings: Settings) => {
  setTheme(settings.theme)
  setScale(settings.scale)
  setInputStyle(settings.input)

  currentSettings = { ...settings }
}

export default (store: StoreProject) => {
  const {settings} = store.state

  currentSettings = { ...settings }

  watch(settings, applySettings)
}
