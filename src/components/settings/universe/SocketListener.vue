<script lang="ts" setup type="tsx">
import SocketProvider from '@/components/common/SocketProvider.vue'
import { type Store, StoreKey } from '@/store'
import { EVENT_CONNECT, EVENT_DISCONNECT } from '@/store/plugins/websocket.ts'
// noinspection ES6UnusedImports
import 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { useStore } from 'vuex'

const store: Store = useStore(StoreKey)
const toast = useToast()

const onConnect = async () => {
  await store.dispatch(EVENT_CONNECT)

  toast.add({
    severity: 'success',
    summary: 'Device connected',
    life: 2000,
  })
}

const onDisconnect = async (error: unknown) => {
  await store.dispatch(EVENT_DISCONNECT)

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
    listen-type="current"
    @connect="onConnect"
    @disconnect="onDisconnect"
    @error="onError"
    @exception="onError"
  />
</template>
