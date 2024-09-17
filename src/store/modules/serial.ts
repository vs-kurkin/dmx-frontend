import { addUniverse, deleteAllUniverses, deleteUniverse, getUniverses } from '@/api/dmx'
import { getDrivers, getList } from '@/api/serial'
import type { Context } from '@/store'
import type { Serial, SerialDevices, SerialDriver, SerialDrivers, SerialID, SerialList, SerialProperty, SerialUniverses } from '@dmx-cloud/dmx-types'

export type SerialState = {
  current: SerialName | void;
  universes: SerialUniverses;
  devices: SerialDevices;
  drivers: SerialDrivers;
};

type Ctx = Context<SerialState>
type SerialName = SerialProperty<'friendlyName'>

export type UniversePayload = {
  device: Serial,
  driver: SerialDriver
}

export default {
  namespaced: true,

  state: {
    universes: [],
    current: undefined,
    devices: new Map,
    drivers: [],
  },

  mutations: {
    universes(state: SerialState, list: SerialList) {
      state.universes.length = 0
      state.universes.push(...list)
    },

    drivers(state: SerialState, list: SerialDrivers) {
      state.drivers = Array.from(list)
    },

    devices(state: SerialState, list: SerialList) {
      if (Array.isArray(list)) {
        list.forEach((serial) => {
          state.devices.set(serial.serialNumber, serial)
        })
      }
    },

    current(state: SerialState, name: SerialName) {
      state.current = name
    },
  },

  actions: {
    async init({ dispatch }: Ctx) {
      await Promise.all([
        dispatch('loadDevices'),
        dispatch('loadDrivers'),
      ])
    },

    async pull({ commit, dispatch }: Ctx) {
      await dispatch('init')

      const universes = await getUniverses()

      commit('universes', universes)
    },

    async add({ state, commit }: Ctx, payload: UniversePayload) {
      if (payload?.device == null) {
        throw new Error('Universe id must be defined')
      }

      if (payload.device.path == null) {
        throw new Error('Universe path must be defined')
      }

      if (state.universes.includes(payload.device.serialNumber)) {
        throw new Error(`Universe with id ${payload.device.serialNumber} already exists`)
      }

      await addUniverse({
        id: payload.device.serialNumber,
        path: payload.device.path,
        driver: payload.driver,
      })

      commit('universes', state.universes.concat(payload.device.serialNumber))
    },

    async remove({ state, commit }: Ctx, id: SerialID) {
      if (!state.universes.some((universe: SerialID) => universe === id)) {
        throw new Error(`Missing universe "${id}"`)
      }

      await deleteUniverse(id)

      commit('universes', state.universes.filter((universe: SerialID) => universe !== id))

      if (state.current === id) {
        commit('current', undefined)
      }
    },

    async clear({ state, commit }: Ctx) {
      if (!state.universes.length) {
        return
      }

      await deleteAllUniverses()

      commit('universes', [])
      commit('current', undefined)
    },

    async loadDevices({ commit }: Ctx) {
      const devices = await getList()

      commit('devices', devices)
    },

    async loadDrivers({ commit }: Ctx) {
      const drivers = await getDrivers()

      commit('drivers', drivers)
    },

    select({ state, commit }: Ctx, id: SerialName | void) {
      if (state.current !== id) {
        commit('current', id)
      }
    },
  },
}
