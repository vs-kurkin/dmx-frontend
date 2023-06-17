<script setup lang="ts" type="tsx">
import SocketListener from '@/components/SocketListener.vue'
import { StoreKey } from '@/store'
import { EVENT_CONNECT, EVENT_DISCONNECT } from '@/store/plugins/websocket.js'
import { State, Store } from '@/store/types'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { useStore } from 'vuex'

const store: Store<State> = useStore<State>(StoreKey)
const toast = useToast()

const onConnect = async () => {
  await store.dispatch(EVENT_CONNECT)

  toast.add({
    severity: 'success',
    summary: 'Device connected',
    life: 2000,
  })
}

const onDisconnect = async error => {
  await store.dispatch(EVENT_DISCONNECT)

  toast.add({
    severity: 'warn',
    summary: 'Device disconnected',
    detail: error,
    life: 2000,
  })
}

const onError = error => toast.add({
  summary: 'Connection error',
  detail: error,
  severity: 'error',
  life: 3000,
})
</script>

<template>
  <SocketListener
    listen-type="current"
    @connect="onConnect"
    @disconnect="onDisconnect"
    @error="onError"
    @exception="onError"
  />

  <Toast position="bottom-left" />
</template>
