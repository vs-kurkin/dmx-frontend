import { DELETE, GET, HEADER_JSON, jsonParse, POST, target } from '@/utils/fetch'
import type { SerialDriver, SerialID, SerialUniverses } from '@dmx-cloud/dmx-types'

export type UniverseOptions = {
  id: SerialID
  path: string
  driver: SerialDriver
}

const dmx = target('dmx', jsonParse)

/**
 * Gets the list of universes from the DMX service.
 */
export const getUniverses = () =>
  dmx<SerialUniverses>('', GET)

/**
 * Adds a new universe to the DMX service.
 */
export const addUniverse = (options: UniverseOptions) =>
  dmx<void>('', {
    ...POST,
    ...HEADER_JSON,
    body: JSON.stringify(options),
  })

/**
 * Deletes a universe from the DMX service.
 */
export const deleteUniverse = (id: SerialID) =>
  dmx<void>(`/${id}`, DELETE)

/**
 * Deletes all universes from the DMX service.
 */
export const deleteAllUniverses = () =>
  dmx<void>('', DELETE)

/**
 * Gets the values of the DMX channels in the given universe.
 */
export const getValues = (id: SerialID) =>
  dmx<number[]>(`/${id}/values/`, GET)
