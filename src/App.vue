<script lang="ts" setup type="tsx">
import NavigationMenu from '@/components/common/NavigationMenu.vue'
import { getStore } from '@/store'
import { setupPrimeVue, THEME_LINK_ID } from '@/store/plugins/gui'
import { usePrimeVue } from '@primevue/core'
import ConfirmDialog from 'primevue/confirmdialog'
import DynamicDialog from 'primevue/dynamicdialog'
import Toast from 'primevue/toast'
import { RouterView } from 'vue-router'

const store = getStore()

const { theme, input } = store.state.settings
const styleSheetPath = `themes/${theme}/theme.css`

setupPrimeVue(usePrimeVue())
</script>

<template>
  <header>
    <link
      :id="THEME_LINK_ID"
      :href="styleSheetPath"
      rel="stylesheet"
    >
  </header>

  <div :class="`${input === 'filled' ? 'p-input-filled' : ''} app-container`">
    <NavigationMenu />
    <RouterView />
    <DynamicDialog />
    <ConfirmDialog />
    <Toast position="bottom-left" />
  </div>
</template>
