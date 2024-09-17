import type { State } from '@/store'
import gui from '@/store/plugins/gui'
import LocalStorage from '@/store/plugins/localStorage'
import sse from '@/store/plugins/sse'
import ws from '@/store/plugins/ws'
import type { Plugin } from 'vuex'

export default [gui, sse, ws, LocalStorage] as Plugin<State>[]
