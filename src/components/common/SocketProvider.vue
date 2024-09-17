<script lang="ts" setup type="tsx">
import { getStore } from '@/store'
import { EVENT_CONNECT, EVENT_DISCONNECT, EVENT_ERROR, EVENT_EXCEPTION, EVENT_SOCKET_ERROR } from '@/store/plugins/ws'

export interface Props {
  storeModel: string;
}

const emitter = defineEmits<{
  connect: [];
  disconnect: [value: string];
  error: [value: string];
  exception: [value: string];
}>()

const props = defineProps<Props>()
const store = getStore()

store.socket.onStore<typeof props.storeModel>(props.storeModel, name => {
  if (name) {
    store.socket.connect()
  } else {
    store.socket.disconnect()
  }
})

store.socket.pipeSocket<'connect'>(EVENT_CONNECT, EVENT_CONNECT, emitter)
store.socket.pipeSocket<'disconnect', string>(EVENT_DISCONNECT, EVENT_DISCONNECT, emitter)
store.socket.pipeSocket<'error', string>(EVENT_SOCKET_ERROR, EVENT_ERROR, emitter)
store.socket.pipeSocket<'exception', string>(EVENT_EXCEPTION, EVENT_EXCEPTION, emitter)
</script>

<template>{{}}</template>
