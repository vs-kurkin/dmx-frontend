import { GET, jsonParse, target } from '@/utils/fetch'
import type { SerialDrivers, SerialList } from '@dmx-cloud/dmx-types'

const serial = target('serial', jsonParse)

export const getList = () =>
  serial<SerialList>('', GET)

export const getDrivers = () =>
  serial<SerialDrivers>('/drivers', GET)
