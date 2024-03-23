<script lang="ts" setup type="tsx">
import { PrimeIcons } from 'primevue/api'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import type { MenuItem } from 'primevue/menuitem/MenuItem.d.ts'
import { type Ref, ref } from 'vue'

const items: Ref<MenuItem[]> = ref([
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
])
</script>

<template>
  <Menubar :model="items" class="w-full">
    <template #start>
      <slot name="start" />
    </template>

    <template #item="{ item }">
      <router-link :to="item.route">
        <Button :icon="item.icon" :label="String(item.label)" text />
      </router-link>
    </template>

    <template #end>
      <slot name="end" />
    </template>
  </Menubar>
</template>
