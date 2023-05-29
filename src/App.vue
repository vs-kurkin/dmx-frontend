<script setup lang='ts'>
import HeaderMenu from '@/components/HeaderMenu.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <HeaderMenu />
  </header>

  <RouterView />
</template>

<style scoped></style>
