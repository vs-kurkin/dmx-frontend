import { getValues } from '@/api/dmx'
import type { Context, StoreProject } from '@/store'
import type { ChannelList, SerialID } from '@dmx-cloud/dmx-types'

export type ChannelPayload = {
  id: SerialID;
  channel: number;
  value: number;
};

export type BulkChannelPayload = number[];

export interface DMXState {
  channel: ChannelList;
}

type Ctx = Context<DMXState>

export default {
  namespaced: true,

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
    update({ commit }: Ctx, payload: ChannelPayload) {
      const store = this as unknown as StoreProject;

      store.socket.emitSocket<ChannelPayload>('channel', payload)

      commit('channel', payload)
    },

    async pull({ commit }: Ctx, name: string) {
      const values = await getValues(name)

      commit('channels', values)
    },

    reset({ commit }: Ctx) {
      commit('channels', new Array(512).fill(0))
    },

    push({ commit }: Ctx, values: BulkChannelPayload) {
      commit('channels', values)
    },
  },
}


