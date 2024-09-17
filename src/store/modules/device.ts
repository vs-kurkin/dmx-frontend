import { addDevice, getList, removeDevice, setList, updateDevice } from '@/api/device'
import type { Context } from '@/store'
import type { ChannelList, Device, DeviceIndex, DeviceList } from '@dmx-cloud/dmx-types'

export interface DeviceState {
  list: DeviceList
}

type Ctx = Context<DeviceState>

export default {
  namespaced: true,

  state: {
    list: [],
  },

  mutations: {
    list(state: DeviceState, list: DeviceList) {
      state.list = list
    }
  },

  actions: {
    async init({ commit }: Ctx) {
      const list = await getList()

      commit('list', list)
    },

    async add({ state, commit }: Ctx, device: Device) {
      if (device == null) {
        throw new Error('No device')
      }

      await addDevice(device)

      commit('list', state.list.concat(device))
    },

    async remove({ state, commit }: Ctx, index: DeviceIndex) {
      if (!(index in state.list)) {
        throw new Error('Invalid index')
      }

      await removeDevice(index)

      commit('list', state.list.filter((_: Device, i: DeviceIndex) => i !== index))
    },

    async update({ state, commit }: Ctx, { index, device }: { index: DeviceIndex, device: Device }) {
      await updateDevice(index, device)

      state.list[index] = device

      commit('list', state.list)
    },

    async set({ commit }: Ctx, list: DeviceList) {
      await setList(list)

      commit('list', list)
    },

    async setChannels({ state, commit }: Ctx, { index, channels }: { index: DeviceIndex, channels: ChannelList }) {
      const device: Device = state.list[index]

      device.channels = channels

      await updateDevice(index, device)

      commit('list', state.list)
    }
  }
}
