import { DELETE, GET, jsonParse, POST, setup } from '@/utils/fetch'

export type Driver =
  | 'null'
  | 'socketio'
  | 'dmx4all'
  | 'enttec-usb-dmx-pro'
  | 'enttec-open-usb-dmx'
  | 'dmxking-ultra-dmx-pro'
  | 'artnet'
  | 'bbdmx'
  | 'sacn';

export type UniverseOptions = {
  id: string
  path: string
  driver: string
}

const dmx = setup('dmx', jsonParse)

export const getDrivers = () =>
  dmx<Driver>('/drivers', GET)

export const getUniverses = () =>
  dmx<string[]>('', GET)

export const addUniverse = (options: UniverseOptions) =>
  dmx<void>('', {
    ...POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  })

export const deleteUniverse = (id: string) =>
  dmx<void>(`/${id}`, DELETE)

export const deleteAllUniverses = () =>
  dmx<void>('', DELETE)

export const getValues = (id: string) =>
  dmx<number[]>(`/${id}/values/`, GET)
