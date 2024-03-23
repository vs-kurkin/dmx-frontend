<script lang="ts" setup type="tsx">
import themes from '@/configs/themes.json'
import { type Store, StoreKey } from '@/store'
import type { Theme } from '@/store/modules/settings.ts'
import Listbox from 'primevue/listbox'
import { ref } from 'vue'
import { useStore } from 'vuex'

type ThemeName = keyof typeof themes
type ThemeKey = Theme<typeof themes>

const store: Store = useStore(StoreKey)
const name = store.state.settings.theme as ThemeName
const list = Object.keys(themes) as ThemeName[]
const selected = ref<ThemeName>(list.find((key) => themes[key] === name) as ThemeName)

const changeTheme = (value: ThemeName | void) => {
  if (value) {
    selected.value = value
    store.dispatch('setTheme', themes[value] as ThemeKey)
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
    @update:modelValue="changeTheme" />
</template>
