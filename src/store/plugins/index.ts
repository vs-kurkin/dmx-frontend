import gui from '@/store/plugins/gui.ts'
import LocalStorage from '@/store/plugins/localStorage.ts'
import webSocket from '@/store/plugins/websocket.ts'

/** @type {import('vuex').ModuleTree<exports>} */
export default [
  gui,
  LocalStorage,
  webSocket,
]
