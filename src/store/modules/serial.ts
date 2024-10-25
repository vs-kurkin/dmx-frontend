import { addUniverse, deleteAllUniverses, deleteUniverse, getUniverses } from '@/api/dmx'
import { getDrivers, getList } from '@/api/serial'
import type { Context } from '@/store'
import type { Serial, SerialDevices, SerialDriver, SerialDrivers, SerialID, SerialList, SerialProperty, SerialUniverses } from '@dmx-cloud/dmx-types'

export type SerialState = {
  current?: SerialName;
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
    universes: [] as SerialUniverses,
    current: undefined,
    devices: new Map<SerialID, Serial>(),
    drivers: [] as SerialDrivers,
  },

  mutations: {
    universes(state: SerialState, list: SerialList) {
      state.universes = [...list]
    },

    drivers(state: SerialState, list: SerialDrivers) {
      state.drivers = Array.from(list)
    },

    devices(state: SerialState, list: SerialList) {
      if (Array.isArray(list)) {
        list.forEach(serial => state.devices.set(serial.serialNumber, serial))
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
      const { device } = payload

      if (!device) {throw new Error('Universe id must be defined')}
      if (!device.path) {throw new Error('Universe path must be defined')}

      if (state.universes.includes(device.serialNumber)) {
        throw new Error(`Universe with id ${device.serialNumber} already exists`)
      }

      await addUniverse({
        id: device.serialNumber,
        path: device.path,
        driver: payload.driver,
      })

      commit('universes', [...state.universes, device.serialNumber])
    },

    async remove({ state, commit }: Ctx, id: SerialID) {
      if (!state.universes.includes(id)) {
        throw new Error(`Missing universe "${id}"`)
      }

      await deleteUniverse(id)

      commit('universes', state.universes.filter((universe: SerialID) => universe !== id))

      if (state.current === id) {
        commit('current', undefined)
      }
    },

    async clear({ state, commit }: Ctx) {
      if (state.universes.length === 0) {
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

    select({ state, commit }: Ctx, id?: SerialName) {
      if (state.current !== id) {
        commit('current', id)
      }
    },
  },
}
