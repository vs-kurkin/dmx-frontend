<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Menubar from 'primevue/menubar'
import TabMenu from 'primevue/tabmenu'

const items = ref([
  {
    label: 'File',
    icon: 'pi pi-fw pi-file',
    items: [],
  },
  {
    label: 'Edit',
    icon: 'pi pi-fw pi-pencil',
    items: [],
  },
  {
    label: 'Users',
    icon: 'pi pi-fw pi-user',
    items: [],
  },
  {
    label: 'Quit',
    icon: 'pi pi-fw pi-power-off',
  },
])
</script>

<template>
  <header>
    <link rel="stylesheet" href="https://unpkg.com/primeflex@^3/primeflex.css">
    <Menubar :model="items" class="m-2" />
    <TabMenu :model="items" />
  </header>

  <RouterView />
</template>

<style scoped></style>
