<script setup lang="ts" type="tsx">
import NavigationMenu from '@/components/common/NavigationMenu.vue'
import SettingsBar from '@/components/settings/SettingsPanel.vue'
import { State, Store, StoreKey } from '@/store'
import { applySettings, setupPrimeVue } from '@/store/plugins/gui'
import { PrimeIcons } from 'primevue/api'
import Button from 'primevue/button'
import { usePrimeVue } from 'primevue/config'
import ConfirmDialog from 'primevue/confirmdialog'
import DynamicDialog from 'primevue/dynamicdialog'
import Toast from 'primevue/toast'
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useStore } from 'vuex'

const store: Store<State> = useStore<State>(StoreKey)
const { key } = store.state.settings.theme
const showSettings = ref(false)
const styleSheetPath = `themes/${key}/theme.css`

setupPrimeVue(usePrimeVue(), 'theme_style')
applySettings(store.state.settings)
</script>

<template>
  <header>
    <link :href="styleSheetPath" rel="stylesheet" id="theme_style">
  </header>

  <div :class="store.state.settings.inputStyle === 'filled' && 'p-input-filled'">
    <NavigationMenu>
      <template #end>
        <Button
          type="button"
          :icon=PrimeIcons.COG
          @click="showSettings = true"
        />
      </template>
    </NavigationMenu>

    <SettingsBar
      v-model:show="showSettings"
      ref="settings"
      position="right"
    />

    <DynamicDialog />
    <ConfirmDialog />

    <RouterView />

    <Toast position="bottom-left" />
  </div>
</template>
