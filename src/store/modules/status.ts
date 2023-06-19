import type { UniverseState } from '@/store/modules/universe'
import type { Context, Store } from '@/store/types'


export interface StatusState {
  connected: boolean
}

export default {
  state: {
    connected: false,
  },

  mutations: {
    connected(state: UniverseState, flag: boolean) {
      state.connected = flag
    },
  },

  actions: {
    connect(this: Store, { state }: Context) {
      if (state.connected === false) {
        this.commit('connected', true)
      }
    },

    disconnect(this: Store, { state }: Context) {
      if (state.connected) {
        this.commit('connected', false)
      }
    },
  },
}
