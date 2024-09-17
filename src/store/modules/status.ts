import type { Context } from '@/store'

export interface StatusState {
  connected: boolean
}

type Ctx = Context<StatusState>

export default {
  namespaced: true,
  state: {
    connected: false,
  },

  mutations: {
    connected(state: StatusState, flag: boolean) {
      state.connected = flag
    },
  },

  actions: {
    connect({ state, commit }: Ctx) {
      if (!state.connected) {
        commit('connected', true)
      }
    },

    disconnect({ state, commit }: Ctx) {
      if (state.connected) {
        commit('connected', false)
      }
    },
  },
}
