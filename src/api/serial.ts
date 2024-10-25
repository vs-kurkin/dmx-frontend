import { GET, jsonParse, target } from '@/utils/fetch'
import type { SerialDrivers, SerialList } from '@dmx-cloud/dmx-types'

const serial = target('serial', jsonParse)

/**
 * Returns a list of serial port info objects.\
 */
export const getList = () =>
  serial<SerialList>('', GET)

/**
 * Returns a list of supported serial drivers.
 */
export const getDrivers = () =>
  serial<SerialDrivers>('/drivers', GET)
