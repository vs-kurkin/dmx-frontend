import { GET, jsonParse, setup } from '@/plugins/fetch'
import { type SerialDevice } from '@/store/modules/universe'

const serial = setup('serial', jsonParse)


export const getDevices = () =>
  serial<SerialDevice[]>('', GET)
