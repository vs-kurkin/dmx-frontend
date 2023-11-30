<script setup lang="ts" type="tsx">
import DMXController from '@/components/dmx/DMXController.vue'
import { type State, type Store, StoreKey } from '@/store'
import { useStore } from 'vuex'

const store: Store<State> = useStore<State>(StoreKey)
</script>

<template>
  <DMXController :disabled="store.state.status.connected === false" />
</template>

