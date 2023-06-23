import gui from '@/store/plugins/gui'
import LocalStorage from './localStorage'
import webSocket from './websocket'

export default [
  gui,
  LocalStorage,
  webSocket,
]
