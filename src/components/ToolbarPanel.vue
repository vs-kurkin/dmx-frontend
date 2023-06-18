<script setup lang="ts" type="tsx">
import SettingsBar from '@/components/SettingsBar.vue'
import { PrimeIcons } from 'primevue/api'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const showSettings = ref(false)

const items = ref([
  {
    label: 'Dashboard',
    icon: PrimeIcons.HOME,
    route: 'dashboard',
  },
  {
    label: 'Devices',
    icon: PrimeIcons.SUN,
    route: 'dashboard',
  },
  {
    label: 'Desk',
    icon: PrimeIcons.SLIDERS_V,
    route: 'desk',
  },
  {
    label: 'Playground',
    icon: PrimeIcons.PLAY,
    route: 'dashboard',
  },
])
</script>

<template>
  <Menubar :model="items" class="w-full">
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
        @click="showSettings = true"
      />
    </template>
  </Menubar>

  <RouterView />

  <SettingsBar
    ref="settings"
    v-model:show="showSettings"
    position="right"
  />
</template>

<style scoped></style>
