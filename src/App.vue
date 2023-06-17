<script setup lang="ts" type="tsx">
import DynamicDialog from 'primevue/dynamicdialog'
import ConfirmDialog from 'primevue/confirmdialog'
import { RouterView } from 'vue-router'
import TopMenu from '@/components/TopMenu.vue'
</script>

<template>
  <header>
    <!--suppress JSUnresolvedLibraryURL -->
    <link
      href="https://unpkg.com/primeflex@3.3.1/primeflex.css"
      rel="stylesheet"
    >
    <TopMenu />
  </header>

  <RouterView />

  <DynamicDialog />
  <ConfirmDialog />
</template>
