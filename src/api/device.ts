import { DELETE, GET, HEADER_JSON, jsonParse, PATCH, POST, target } from '@/utils/fetch'
import type { Device, DeviceIndex, DeviceList } from '@dmx-cloud/dmx-types'

const device = target('device', jsonParse)

/**
 * Retrieve the list of devices.
 */
export const getList = () =>
  device<DeviceList>('', GET)

/**
 * Add a new device to the device list.
 */
export const addDevice = (newDevice: Device) =>
  device<number>(`/`, {
    ...POST,
    ...HEADER_JSON,
    body: JSON.stringify(newDevice),
  })

/**
 * Update a device in the device list.
 */
export const updateDevice = (index: DeviceIndex, newDevice: Device) =>
  device<number>(`/${index}`, {
    ...PATCH,
    ...HEADER_JSON,
    body: JSON.stringify(newDevice),
  })

/**
 * Delete a device from the device list.
 */
export const removeDevice = (index: DeviceIndex) =>
  device<number>(`/${index}`, {
    ...DELETE,
    ...HEADER_JSON,
  })

/**
 * Replace the entire list of devices with a new list.
 */
export const setList = (list: DeviceList) =>
  device<DeviceList>('/', {
    ...PATCH,
    ...HEADER_JSON,
    body: JSON.stringify(list),
  })
