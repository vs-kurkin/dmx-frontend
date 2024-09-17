import { DELETE, GET, HEADER_JSON, jsonParse, PATCH, POST, target } from '@/utils/fetch'
import type { Device, DeviceIndex, DeviceList } from '@dmx-cloud/dmx-types'

const device = target('device', jsonParse)

export const getList = () =>
  device<DeviceList>('', GET)

export const addDevice = (newDevice: Device) =>
  device<number>(`/`, {
    ...POST,
    ...HEADER_JSON,
    body: JSON.stringify(newDevice),
  })

export const updateDevice = (index: DeviceIndex, newDevice: Device) =>
  device<number>(`/${index}`, {
    ...PATCH,
    ...HEADER_JSON,
    body: JSON.stringify(newDevice),
  })

export const removeDevice = (index: DeviceIndex) =>
  device<number>(`/${index}`, {
    ...DELETE,
    ...HEADER_JSON,
  })

export const setList = (list: DeviceList) =>
  device<DeviceList>('/', {
    ...PATCH,
    ...HEADER_JSON,
    body: JSON.stringify(list),
  })
