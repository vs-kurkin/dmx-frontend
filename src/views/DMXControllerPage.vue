<script setup lang="ts" type="tsx">
import DMXUniverse from '@/components/DMXUniverse.vue'
import { StoreKey } from '@/store'
import { Store } from '@/store/types'
import { useStore } from 'vuex'

const store: Store = useStore(StoreKey)
</script>

<template>
  <DMXUniverse :disabled="store.state.status.connected === false" />
</template>

