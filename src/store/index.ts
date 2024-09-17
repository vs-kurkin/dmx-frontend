import modules from '@/store/modules'
import type { DeviceState } from '@/store/modules/device'
import type { DMXState } from '@/store/modules/dmx'
import type { SerialState } from '@/store/modules/serial'
import type { SettingsState } from '@/store/modules/settings'
import type { StatusState } from '@/store/modules/status'
import plugins from '@/store/plugins'
import { type StorageFacade } from '@/store/plugins/localStorage'
import { type SocketAdapter } from '@/store/plugins/ws'
import { type InjectionKey } from 'vue'
import { type ActionContext, createStore, type Store, useStore } from 'vuex'

export interface StoreExtends {
  socket: SocketAdapter
  storage: StorageFacade
  sse: EventSource
}

export interface State {
  dmx: DMXState;
  serial: SerialState;
  settings: SettingsState;
  status: StatusState;
  device: DeviceState;
}

export type StoreProject = Store<State> & StoreExtends
export type StoreKey = InjectionKey<StoreProject>
export type Context<S> = ActionContext<S, State>

export const key = Symbol() as StoreKey
export const store = createStore<State>({ modules, plugins }) as StoreProject

export const getStore = () => useStore<State>(key) as StoreProject
// TODO:
// export const getState = (namespace: keyof typeof store.state): typeof store.state[typeof namespace] => store.state[namespace]
