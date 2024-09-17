<script lang="ts" setup type="tsx">
import themes from '@/configs/themes'
import { getStore } from '@/store'
import type { SettingTheme } from '@/store/modules/settings'
import { ref } from 'vue'

type Themes = [keyof typeof themes]

const store = getStore()
const name = store.state.settings.theme
const list = Object.keys(themes) as Themes
const selected = ref(list.find(key => themes[key] === name))

const selectTheme = (value: SettingTheme | void) => {
  if (value) {
    store.dispatch('settings/theme', themes[value])

    selected.value = value
  }
}

</script>

<template>
  <div class="flex justify-content-between align-items-center">
    <h3>Theme:</h3>
    <span class="text-sm p-text-secondary">{{ selected }}</span>
  </div>

  <Listbox
    :model-value="selected"
    :options="list"
    @update:model-value="selectTheme"
  />
</template>
