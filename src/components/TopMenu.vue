<script setup lang="ts" type="tsx">
import SettingsBar from '@/components/SettingsBar.vue'
import { PrimeIcons } from 'primevue/api'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import { ref } from 'vue'

const items = ref([
  // {
  //   label: 'Dashboard',
  //   icon: PrimeIcons.HOME,
  //   route: 'desk',
  // },
  // {
  //   label: 'Devices',
  //   icon: PrimeIcons.SUN,
  //   route: 'desk',
  // },
  {
    label: 'Desk',
    icon: PrimeIcons.SLIDERS_V,
    route: 'desk',
  },
  // {
  //   label: 'Playground',
  //   icon: PrimeIcons.PLAY,
  //   route: 'desk',
  // },
])

const showSettings = ref(false)
</script>

<template>
  <Menubar
    :model="items"
    class="w-full"
  >
    <template #item="{ item }">
      <router-link :to="item.route">
        <Button
          text
          :icon="item.icon"
          :label="item.label ?? ''"
        />
      </router-link>
    </template>

    <template #end>
      <Button
        type="button"
        icon="pi pi-cog"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        @click="showSettings = true"
      />

      <SettingsBar
        ref="settings"
        v-model:show="showSettings"
        position="right"
      />
    </template>
  </Menubar>
</template>

<style scoped></style>
