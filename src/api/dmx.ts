import { DELETE, GET, HEADER_JSON, jsonParse, POST, target } from '@/utils/fetch'
import type { SerialDriver, SerialID, SerialUniverses } from '@dmx-cloud/dmx-types'

export type UniverseOptions = {
  id: SerialID
  path: string
  driver: SerialDriver
}

const dmx = target('dmx', jsonParse)

export const getUniverses = () =>
  dmx<SerialUniverses>('', GET)

export const addUniverse = (options: UniverseOptions) =>
  dmx<void>('', {
    ...POST,
    ...HEADER_JSON,
    body: JSON.stringify(options),
  })

export const deleteUniverse = (id: SerialID) =>
  dmx<void>(`/${id}`, DELETE)

export const deleteAllUniverses = () =>
  dmx<void>('', DELETE)

export const getValues = (id: SerialID) =>
  dmx<number[]>(`/${id}/values/`, GET)
