import type { DMXState } from '@/store/modules/dmx'
import type { StatusState } from '@/store/modules/status'
import type { UniverseState } from '@/store/modules/universe'
import type { Adapter } from '@/store/plugins/websocket'
import type { ActionContext, Store as VuexStore } from 'vuex'

export interface State {
  universe: UniverseState
  connected: boolean
  error: string
  dmx: DMXState
  status: StatusState
}

export type Store<S = Store> = VuexStore<S> & {
  socket?: Adapter
}

export type Context<S = State, R = State> = ActionContext<S, R>

export interface ChannelInterface {
  title?: string;
  value: number;
  type?: string;
  default?: number;
  min?: number;
  max?: number;
  amount?: number;
  steps?: number[];
}

export interface DeviceInterface {
  vendor: string
  model: string
  mode: string
  channels: ChannelInterface[]
}

export interface DriverOptions {
  path: string
  baudRate?: number
  dataBits?: number
  stopBits?: number
  universe?: number
  interval?: number
  host?: string
  port?: string
}
