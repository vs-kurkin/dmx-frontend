import type { ChannelType, ChannelTypes } from '@dmx-cloud/dmx-types'
import { PrimeIcons } from '@primevue/core/api'
import type { MenuItem } from 'primevue/menuitem'

export const MAIN_MENU: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: PrimeIcons.HOME,
    route: { name: 'dashboard' },
  },
  {
    label: 'Devices',
    icon: PrimeIcons.SUN,
    route: { name: 'devices' },
  },
  {
    label: 'Controller',
    icon: PrimeIcons.SLIDERS_V,
    route: { name: 'controller' },
  },
  {
    label: 'Playground',
    icon: PrimeIcons.PLAY,
    route: { name: 'playground' },
  },
]

export const TYPE: Record<ChannelType, string> = {
  color: PrimeIcons.PALETTE,
  display: PrimeIcons.DESKTOP,
  head: PrimeIcons.EYE,
  lamp: PrimeIcons.SUN,
  laser: PrimeIcons.SHARE_ALT,
  mode: PrimeIcons.LIST,
  rotate: PrimeIcons.REFRESH,
  strobe: PrimeIcons.BOLT,
}

export const TYPES: ChannelTypes = Object.keys(TYPE)
