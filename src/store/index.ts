import { type InjectionKey } from 'vue';
import { createStore } from 'vuex';
import plugins from './plugins';
import modules from './modules';
import type { Store, State } from './types';

const store: Store<State> = createStore<State>({
  plugins,
  modules,
})

export default store

export const StoreKey: InjectionKey<Store> = Symbol();
