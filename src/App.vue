<script lang="ts" setup type="tsx">
import NavigationMenu from '@/components/common/NavigationMenu.vue'
import SettingsBar from '@/components/settings/SettingsPanel.vue'
import { type State, type Store, StoreKey } from '@/store'
import { setupPrimeVue, THEME_LINK_ID } from '@/store/plugins/gui.ts'
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
const { theme, inputStyle } = store.state.settings
const showSettings = ref(false)
const styleSheetPath = `themes/${theme}/theme.css`

setupPrimeVue(usePrimeVue())
</script>

<template>
  <header>
    <link :id="THEME_LINK_ID" :href="styleSheetPath" rel="stylesheet">
  </header>

  <div :class="inputStyle === 'filled' && 'p-input-filled'">
    <NavigationMenu>
      <template #end>
        <Button
          :icon=PrimeIcons.COG
          type="button"
          @click="showSettings = true"
        />
      </template>
    </NavigationMenu>

    <SettingsBar
      ref="settings"
      v-model:show="showSettings"
      position="right"
    />

    <DynamicDialog />
    <ConfirmDialog />

    <RouterView />

    <Toast position="bottom-left" />
  </div>
</template>
