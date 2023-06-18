import { DELETE, GET, jsonParse, POST, setup } from '@/plugins/fetch'

export type Driver =
  'null'
  | 'socketio'
  | 'dmx4all'
  | 'enttec-usb-dmx-pro'
  | 'enttec-open-usb-dmx'
  | 'dmxking-ultra-dmx-pro'
  | 'artnet'
  | 'bbdmx'
  | 'sacn'

export type UniverseOptions = {
  name: string
  path: string
  driver: string
}

const serial = setup('dmx', jsonParse)

export const getDrivers = () =>
  serial<Driver>('/drivers', GET)

export const getUniverses = () =>
  serial<string[]>('', GET)

export const addUniverse = (options: UniverseOptions) =>
  serial<void>('', {
    ...POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  })

export const deleteUniverse = (name: string) =>
  serial<void>(`/${name}`, DELETE)

export const deleteAllUniverses = () =>
  serial<void>('', DELETE)

export const getValues = (name: string) =>
  serial<number[]>(`/${name}/values/`, GET)
