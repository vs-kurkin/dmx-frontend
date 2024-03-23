import modules from '@/store/modules'
import type { DMXState } from '@/store/modules/dmx.ts'
import type { SerialState } from '@/store/modules/serial.ts'
import type { SettingsState } from '@/store/modules/settings.ts'
import type { StatusState } from '@/store/modules/status.ts'

import plugins from '@/store/plugins'
import type { StorageFacade } from '@/store/plugins/localStorage.ts'
import type { SocketAdapter } from '@/store/plugins/websocket.ts'
import { type InjectionKey } from 'vue'

import { type ActionContext, createStore, Store as VuexStore } from 'vuex'

export type State = {
  connected: boolean;
  dmx: DMXState;
  error: string;
  settings: SettingsState;
  status: StatusState;
  serial: SerialState;
}

export interface Store<S=State> extends VuexStore<S> {
  socket?: SocketAdapter;
  storage?: StorageFacade;
}

// noinspection JSUnusedGlobalSymbols
export type Context<S = State, R = State> = ActionContext<S, R>;

export default createStore({
  plugins,
  modules,
})

export const StoreKey: InjectionKey<Store> = Symbol()
