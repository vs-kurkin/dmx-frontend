<script setup lang="ts" type="tsx">
import { StoreKey } from '@/store'
import { State, Store } from '@/store/types'
import { usePrimeVue } from 'primevue/config'
import { MenuItem } from 'primevue/menuitem'
import PanelMenu from 'primevue/panelmenu'
import { useStore } from 'vuex'

export type Props = {
  linkId: string
}

const props = defineProps<Props>()
const { changeTheme } = usePrimeVue()

const store: Store<State> = useStore<State>(StoreKey)

const command = ({ item }) => {
  const {
    key,
    label: name,
  } = item

  changeTheme(store.state.settings.theme.key, key, props.linkId)

  store.dispatch('setTheme', {
    key,
    name,
  })
}

const items: MenuItem[] = [{
  label: 'Bootstrap',
  items: [{
    label: 'Light Blue',
    key: 'bootstrap4-light-blue',
    command,
  }, {
    label: 'Light Purple',
    key: 'bootstrap4-light-purple',
    command,
  }, {
    label: 'Dark Blue',
    key: 'bootstrap4-dark-blue',
    command,
  }, {
    label: 'Dark Purple',
    key: 'bootstrap4-dark-purple',
    command,
  }],
}, {
  label: 'Material Design Compact',
  items: [{
    label: 'Light Indigo',
    key: 'mdc-light-indigo',
    command,
  }, {
    label: 'Light Deep Purple',
    key: 'mdc-light-deeppurple',
    command,
  }, {
    label: 'Dark Indigo',
    key: 'mdc-dark-indigo',
    command,
  }, {
    label: 'Dark Deep Purple',
    key: 'mdc-dark-deeppurple',
    command,
  }],
}, {
  label: 'Tailwind',
  items: [{
    label: 'Tailwind Light',
    key: 'tailwind-light',
    command,
  }],
}, {
  label: 'Fluent UI',
  items: [{
    label: 'Blue',
    key: 'fluent-light',
    command,
  }],
}, {
  label: 'Misc',
  items: [{
    label: 'Soho Light',
    key: 'soho-light',
    command,
  }, {
    label: 'Soho Dark',
    key: 'soho-dark',
    command,
  }, {
    label: 'Viva Light',
    key: 'viva-light',
    command,
  }, {
    label: 'Viva Dark',
    key: 'viva-dark',
    command,
  }, {
    label: 'Mira',
    key: 'mira',
    command,
  }, {
    label: 'Nano',
    key: 'nano',
    command,
  }],
}]
</script>

<template>
  <h3 class="mb-2 mt-4"><span class="pi pi-palette mr-2" />Theme ({{ store.state.settings.theme.name }}):</h3>

  <PanelMenu :model="items" />
</template>
