import { getValues } from '@/api/dmx.ts'
import type { Context, Store } from '@/store'

export type ChannelPayload = {
  id: string;
  channel: number;
  value: number;
};

export type BulkChannelPayload = number[];

export interface DMXState {
  channel: number[];
}

export default {
  state: {
    channel: new Array(513).fill(0),
  },

  mutations: {
    channel(state: DMXState, payload: ChannelPayload) {
      state.channel[payload.channel] = payload.value
    },

    channels(state: DMXState, values: BulkChannelPayload) {
      state.channel.length = 0
      state.channel.push(0, ...values)
    },
  },

  actions: {
    async updateChannel(this: Store, _ctx: Context, payload: ChannelPayload) {
      await this.socket?.emitSocket('update', payload)

      this.commit('channel', payload)
    },

    async getAllChannelValues(this: Store, _ctx: Context, name: string) {
      const values = await getValues(name)

      this.commit('channels', values)
    },

    resetAllChannelValues(this: Store) {
      this.commit('channels', new Array(512).fill(0))
    },
  },
}


