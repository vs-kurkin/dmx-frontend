<script setup lang="ts" type="tsx">
import themes from '@/configs/themes.json'
import { State, Store, StoreKey } from '@/store'
import { MenuItem } from 'primevue/menuitem'
import PanelMenu from 'primevue/panelmenu'
import { useStore } from 'vuex'


export interface ThemeList {
  [group: string]: string
}

export interface ThemeGroup {
  [group: string]: ThemeList
}

const store: Store<State> = useStore<State>(StoreKey)

const command = ({ item }) => {
  const {
    key: group,
    label,
  } = item
  const key = themes[group][label]
  const name = `${group}/${label}`

  store.dispatch('setTheme', {
    key,
    name,
  })
}

const items: MenuItem[] = Object
  .keys(themes as ThemeGroup)
  .map((key: string): MenuItem => ({
    label: key,
    items: Object
      .keys(themes[key] as ThemeList)
      .map((label: string): MenuItem => ({
        label,
        key,
        command,
      })),
  }))
</script>

<template>
  <div class="flex justify-content-between align-items-center">
    <h3>Skin:</h3>
    <span class="text-sm p-text-secondary">{{ store.state.settings.theme.name }}</span>
  </div>

  <PanelMenu :model="items" />
</template>
