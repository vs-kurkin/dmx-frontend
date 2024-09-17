import type { StoreProject } from '@/store'
import { type PrimeVueConfiguration, type usePrimeVue } from 'primevue/config'
import { watch } from 'vue'

type PrimeVue = ReturnType<typeof usePrimeVue>;
type Theme = string;
type Scale = number;
type Input = PrimeVueConfiguration['inputVariant'];

type Settings = {
  theme: Theme
  scale: Scale
  input: Input
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

const setInputStyle = (name: Input) => {
  primeVue.config.inputVariant = name
}

const setTheme = (name: Theme) => {
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
