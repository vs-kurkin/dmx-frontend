import type { DMXState } from '@/store/modules/dmx'
import type { SettingsState } from '@/store/modules/settings'
import type { StatusState } from '@/store/modules/status'
import type { UniverseState } from '@/store/modules/universe'
import type { StorageFacade } from '@/store/plugins/localStorage'
import type { SocketAdapter } from '@/store/plugins/websocket'
import type { ActionContext, Store as VuexStore } from 'vuex'

export interface State {
  connected: boolean;
  dmx: DMXState;
  error: string;
  settings: SettingsState;
  status: StatusState;
  universe: UniverseState;
}

export type Store<S = Store> = VuexStore<S> & {
  socket?: SocketAdapter;
  storage?: StorageFacade;
};

export type Context<S = State, R = State> = ActionContext<S, R>;

export interface ChannelInterface {
  amount?: number;
  default?: number;
  max?: number;
  min?: number;
  steps?: number[];
  title?: string;
  type?: string;
  value: number;
}

// noinspection JSUnusedGlobalSymbols
export interface DeviceInterface {
  channels: ChannelInterface[];
  mode: string;
  model: string;
  vendor: string;
}

// noinspection JSUnusedGlobalSymbols
export interface DriverOptions {
  baudRate?: number;
  dataBits?: number;
  host?: string;
  interval?: number;
  path: string;
  port?: string;
  stopBits?: number;
  universe?: number;
}
