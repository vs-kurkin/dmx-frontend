<script lang="ts" setup type="tsx">
import { type Store, StoreKey } from '@/store'
import {
  EVENT_CONNECT,
  EVENT_DISCONNECT,
  EVENT_ERROR,
  EVENT_EXCEPTION,
  EVENT_SOCKET_ERROR,
} from '@/store/plugins/websocket.ts'
import { useStore } from 'vuex'

export interface Props {
  listenType: string;
}

const emitter = defineEmits<{
  connect: [];
  disconnect: [string];
  error: [string];
  exception: [string];
}>()

const { socket }: Store = useStore(StoreKey)

const props = defineProps<Props>()

socket?.onStore<string>(props.listenType, name => {
  if (name) {
    socket.connect()
  } else {
    socket.disconnect()
  }
})

socket?.pipeSocket<'connect'>(EVENT_CONNECT, EVENT_CONNECT, emitter)
socket?.pipeSocket<'disconnect', string>(EVENT_DISCONNECT, EVENT_DISCONNECT, emitter)
socket?.pipeSocket<'error', string>(EVENT_SOCKET_ERROR, EVENT_ERROR, emitter)
socket?.pipeSocket<'exception', string>(EVENT_EXCEPTION, EVENT_EXCEPTION, emitter)
</script>

<template>{{}}</template>
