<script setup lang="ts" type="tsx">
import ToolbarPanel from '@/components/ToolbarPanel.vue'
import { StoreKey } from '@/store'
import type { State, Store } from '@/store/types'
import ConfirmDialog from 'primevue/confirmdialog'
import DynamicDialog from 'primevue/dynamicdialog'
import { useStore } from 'vuex'

const store: Store<State> = useStore<State>(StoreKey)
const { key } = store.state.settings.theme
const styleSheetPath = `themes/${key}/theme.css`
</script>

<template>
  <header>
    <link href="primeflex.css" rel="stylesheet">
    <link :href="styleSheetPath" rel="stylesheet" id="theme_style">
  </header>

  <ToolbarPanel />
  <DynamicDialog />
  <ConfirmDialog />
</template>
