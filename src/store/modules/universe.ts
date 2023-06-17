import { addUniverse, deleteAllUniverses, deleteUniverse, getDrivers, getUniverses } from '@/api/dmx'
import type { Context, Store } from '@/store/types'

export type UniverseState = {
  current: string | null
  list: string[]
  drivers: string[]
  connected: boolean
}

export interface SerialDevice {
  path: string,
  manufacturer: string,
  serialNumber: string,
  pnpId: string,
  friendlyName: string,
  vendorId: string,
  productId: string
}

export type UniversePayload = {
  name: string
  path: string
  driver: string
}

export default {
  state: {
    list: [],
    drivers: [],
    current: null,
  },

  mutations: {
    list(state: UniverseState, list: string[]) {
      state.list.length = 0
      state.list.push(...list)
    },

    drivers(state: UniverseState, list: string[]) {
      state.drivers.length = 0
      state.drivers.push(...list)
    },

    current(state: UniverseState, name: string | null) {
      state.current = name
    },
  },
  actions: {
    async setCurrentUniverse(this: Store, { state }: Context<UniverseState>, name: string) {
      if (state.current === name) {
        return
      }

      this.commit('current', name)
    },

    async updateUniverses(this: Store) {
      const list = await getUniverses()

      this.commit('list', list)
    },

    async updateDrivers(this: Store) {
      const list = await getDrivers()

      this.commit('drivers', list)
    },

    async addUniverse(this: Store, { state }: Context<UniverseState>, payload: UniversePayload) {
      if (payload == null || payload.name == null) {
        throw new Error('Device must be defined')
      }

      if (payload.path == null) {
        throw new Error('Path must be defined')
      }

      if (state.list.includes(payload.name)) {
        throw new Error(`Universe for device ${payload.name} already exists`)
      }

      if (!state.drivers.includes(payload.driver)) {
        throw new Error(`Unknown driver "${payload.driver}"`)
      }

      await addUniverse(payload)

      this.commit('list', state.list.concat(payload.name))
    },

    async deleteUniverse(this: Store, { state }: Context<UniverseState>, name: string) {
      if (!state.list.includes(name)) {
        throw new Error(`Missing universe "${name}"`)
      }

      await deleteUniverse(name)

      this.commit('list', state.list.filter(item => item !== name))

      if (state.current === name) {
        this.commit('current', null)
      }
    },

    async deleteAllUniverses(this: Store, { state }: Context<UniverseState>) {
      if (!state.list.length) {
        return
      }

      await deleteAllUniverses()

      this.commit('list', [])
      this.commit('current', null)
    }
  },
}
