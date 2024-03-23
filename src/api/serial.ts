import { GET, jsonParse, setup } from '@/utils/fetch'

export interface SerialDevice {
  path: string;
  manufacturer: string;
  serialNumber: string;
  pnpId: string;
  friendlyName: string;
  vendorId: string;
  productId: string;
}

const serial = setup('serial', jsonParse)

export const getDevices = () =>
  serial<SerialDevice[]>('', GET)
