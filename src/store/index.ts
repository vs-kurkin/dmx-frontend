import { type InjectionKey } from 'vue'
import { createStore } from 'vuex'
import modules from './modules'
import plugins from './plugins'
import type { State, Store } from './types'

const store: Store<State> = createStore<State>({
  plugins,
  modules,
})

export default store

export const StoreKey: InjectionKey<Store> = Symbol()
