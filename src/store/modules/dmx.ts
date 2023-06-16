import { Context, Store } from '@/store/types'

export type ChannelPayload = {
  name: string,
  channel: number,
  value: number,
}

export interface BulkChannelPayload {
  readonly [key: number]: number
}

export interface State {
  channel: Map<number, number>
}

export default {
  namespaced: true,

  state: {
    channel: new Array(513).fill(0),
  },

  mutations: {
    channel(state: State, { channel, value }: ChannelPayload) {
      state.channel[channel] = value
    },
  },

  actions: {
    update(this: Store, ctx: Context, payload: ChannelPayload) {
      if (this.state.dmx.channel[payload.channel] === payload.value/* || state.universe.get(universe) == null*/) {
        return
      }

      this.socket.emitSocket('update', payload)

      this.commit('dmx/channel', payload)
    }
  },
}


