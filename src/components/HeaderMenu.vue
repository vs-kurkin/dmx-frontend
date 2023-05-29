<script setup lang='ts'>
import { PrimeIcons } from 'primevue/api'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import { ref } from 'vue'

const menu = ref()
const items = ref([
  {
    label: 'Dashboard',
    icon: PrimeIcons.HOME,
    url: '/dashboard',
  },
  {
    label: 'Devices',
    icon: PrimeIcons.SUN,
    url: '/devices',
  },
  {
    label: 'Desk',
    icon: PrimeIcons.SLIDERS_V,
    url: '/desk',
  },
  {
    label: 'Playground',
    icon: PrimeIcons.PLAY,
    url: '/desk',
  },
])

const toggle = (event: UIEvent) => {
  menu.value.toggle(event)
}
</script>

<template>
  <Menubar :model='items' class='w-full'>
    <template #end>
      <Button type='button' @click='toggle' icon='pi pi-cog' aria-haspopup='true' aria-controls='overlay_menu' />
      <Menu ref='menu' id='overlay_menu' :model='items' :popup='true' />
      <Toast />
    </template>
  </Menubar>
</template>

<style scoped>

</style>
