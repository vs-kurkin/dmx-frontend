import type { Context, Store } from '@/store'

export interface StatusState {
  connected: boolean
}

export default {
  state: {
    connected: false,
  },

  mutations: {
    connected(state: StatusState, flag: boolean) {
      state.connected = flag
    },
  },

  actions: {
    connect(this: Store, { state }: Context) {
      if (!state.connected) {
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
