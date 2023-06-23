import { type InjectionKey } from 'vue'
import { createStore } from 'vuex'
import modules from './modules'
import plugins from './plugins'
import type { State, Store } from './types'

export default createStore<State>({
  plugins,
  modules,
})

export const StoreKey: InjectionKey<Store> = Symbol()

export type { State, Store }
