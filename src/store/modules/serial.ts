import { addUniverse, deleteAllUniverses, deleteUniverse, getDrivers, getUniverses } from '@/api/dmx.ts'
import { getDevices, type SerialDevice } from '@/api/serial.ts'
import type { Context, Store } from '@/store'

export type DeviceMap = Map<string, SerialDevice>;

export type SerialState = {
  current: string | void;
  universes: string[];
  devices: DeviceMap;
  drivers: string[];
};

export type UniversePayload = {
  device: SerialDevice,
  driver: string
}

const DEVICES: DeviceMap = new Map()
const DRIVERS: string[] = []

const loadDevices = async () => {
  const devices = await getDevices()

  if (Array.isArray(devices)) {
    DEVICES.clear()

    devices.forEach((device) => {
      DEVICES.set(device.serialNumber, device)
    })
  }
}

const loadDrivers = async () => {
  const drivers = await getDrivers()

  if (Array.isArray(drivers)) {
    DRIVERS.length = 0
    DRIVERS.push(...drivers)
  }
}

export default {
  state: {
    universes: [],
    current: null,
    devices: DEVICES,
    drivers: DRIVERS
  },

  mutations: {
    universes(state: SerialState, list: string[]) {
      state.universes.length = 0
      state.universes.push(...list)
    },

    current(state: SerialState, name: string) {
      state.current = name
    },
  },

  actions: {
    async updateSerial() {
      await Promise.all([
        loadDevices(),
        loadDrivers()
      ])
    },

    async addUniverse(
      this: Store,
      { state }: Context<SerialState>,
      payload: UniversePayload,
    ) {
      if (payload == null) {
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

      this.commit('universes', state.universes.concat(payload.device.serialNumber))
    },

    async deleteAllUniverses(this: Store, { state }: Context<SerialState>) {
      if (!state.universes.length) {
        return
      }

      await deleteAllUniverses()

      this.commit('universes', [])
      this.commit('current', null)
    },

    async deleteUniverse(
      this: Store,
      { state }: Context<SerialState>,
      id: string,
    ) {
      if (!state.universes.some((universe) => universe === id)) {
        throw new Error(`Missing universe "${id}"`)
      }

      await deleteUniverse(id)

      this.commit('universes', state.universes.filter((universe) => universe !== id))

      if (state.current === id) {
        this.commit('current', null)
      }
    },

    async initUniverses(this: Store) {
      const universes = await getUniverses()

      this.commit('universes', universes)
    },

    async setCurrentUniverse(
      this: Store,
      { state }: Context<SerialState>,
      id: string,
    ) {
      if (state.current === id) {
        return
      }

      this.commit('current', id)
    },
  }
}
