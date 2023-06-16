<script setup lang="ts" type="tsx">
import { useStore } from 'vuex'
import {
  EVENT_CONNECT,
  EVENT_DISCONNECT, EVENT_ERROR,
  EVENT_EXCEPTION,
  EVENT_SOCKET_ERROR,
} from '@/store/plugins/websocket'
import { StoreKey } from '@/store'
import type { State, Store } from '@/store/types'

export interface Props {
  listenType: string
}

const emit = defineEmits<{
  connect: []
  disconnect: [string]
  error: [string]
  exception: [string]
}>()

const { socket }: Store = useStore<State>(StoreKey)

const props = defineProps<Props>()

socket.onStore(props.listenType, name => {
  if (name) {
    socket.connect()
  } else {
    socket.disconnect()
  }
})

socket.pipeSocket(EVENT_CONNECT, EVENT_CONNECT, emit)
socket.pipeSocket(EVENT_DISCONNECT, EVENT_DISCONNECT, emit)
socket.pipeSocket(EVENT_SOCKET_ERROR, EVENT_SOCKET_ERROR, emit)
socket.pipeSocket(EVENT_EXCEPTION, EVENT_ERROR, emit)
</script>

<template>{{}}</template>
