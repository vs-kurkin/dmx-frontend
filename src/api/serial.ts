import { GET, jsonParse, setup } from '@/plugins/fetch'
import { SerialDevice } from '@/store/modules/universe'

const serial = setup('serial', jsonParse)


export const getDevices = () =>
  serial<SerialDevice[]>('', GET)
