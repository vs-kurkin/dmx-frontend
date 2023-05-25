<script setup lang="ts" type="module">
import HeaderMenu from "@/components/HeaderMenu.vue";
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <link rel="stylesheet" href="https://unpkg.com/primeflex@^3/primeflex.css" />
    <HeaderMenu />
  </header>

  <RouterView />
</template>

<style scoped></style>
