import type { ActionContext } from 'vuex'
import type { Adapter } from '@/store/plugins/websocket'
import type { UniverseState } from '@/store/modules/universe'

export interface State {
  universe: UniverseState
  connected: boolean
  error: string
}

export type Store = Store<State> & {
  socket: Adapter
}

export type Context<S=State, R=State> = ActionContext<S, R>

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
