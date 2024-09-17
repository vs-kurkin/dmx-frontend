<script lang="ts" setup type="tsx">
import { getStore } from '@/store'

const store = getStore()
</script>

<template>
  <DMXController :disabled="store.state.status.connected === false" />
</template>
