<script lang="ts" setup type="tsx">
import { getStore } from '@/store'
import 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const store = getStore()
const toast = useToast()

const onConnect = async () => {
  await store.dispatch('status/connect')

  toast.add({
    severity: 'success',
    summary: 'Device connected',
    life: 2000,
  })
}

const onDisconnect = async (error: unknown) => {
  await store.dispatch('status/disconnect')

  toast.add({
    severity: 'warn',
    summary: 'Device disconnected',
    detail: error,
    life: 2000,
  })
}

const onError = (error: string) => toast.add({
  summary: 'Connection error',
  detail: error,
  severity: 'error',
  life: 3000,
})
</script>

<template>
  <SocketProvider
    store-model="serial/current"
    @connect="onConnect"
    @disconnect="onDisconnect"
    @error="onError"
    @exception="onError"
  />
</template>
