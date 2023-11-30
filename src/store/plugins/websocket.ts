import { host, options, port } from '@/configs/websocket'
import type { Store } from '@/store/types'
import { io, Socket } from 'socket.io-client'
import type { MutationPayload } from 'vuex'

export const EVENT_CONNECT = 'connect'
export const EVENT_DISCONNECT = 'disconnect'
export const EVENT_ERROR = 'error'
export const EVENT_SOCKET_ERROR = 'connect_error'
export const EVENT_EXCEPTION = 'exception'

export type EventData = unknown;
export type SocketEvent = string;
export type StoreEvent = string;

export type EventListener<D> = (data: D) => void;

export type EventEmitter<E, D> = (
  event: E,
  ...args: D[]
) => void;

export type MutationHandler<P> = (payload: P) => void;

export class SocketAdapter {
  private socket: Socket
  private store: Store

  constructor(socket: Socket, store: Store) {
    this.socket = socket
    this.store = store
  }

  connect() {
    this.socket.connect()

    return this
  }

  disconnect() {
    this.socket.disconnect()

    return this
  }

  // noinspection JSUnusedGlobalSymbols
  async emitStore<D = EventData>(event: StoreEvent, data: D) {
    await this.store.dispatch(event, data)

    return this
  }

  async emitSocket<D = EventData>(event: SocketEvent, data: D) {
    this.socket.emit(event, data)

    return this
  }

  onSocket<D>(event: SocketEvent, listener: EventListener<D>) {
    this.socket.on(event, listener)

    return this
  }

  onStore<D>(event: StoreEvent, listener: EventListener<D>) {
    const handler: MutationHandler<MutationPayload> = mutation =>
      event === mutation.type && listener(mutation.payload)

    this.store.subscribe(handler)

    return this
  }

  pipeSocket<T, D = void>(
    source: SocketEvent,
    target: T,
    emitter: EventEmitter<T, D>,
  ) {
    const listener: EventListener<D> = payload => emitter(target, payload)

    return this.onSocket(source, listener)
  }

  // noinspection JSUnusedGlobalSymbols
  pipeStore<T, D = void>(
    source: StoreEvent,
    target: T,
    emitter: EventEmitter<T, D>,
  ) {
    const listener: EventListener<D> = payload => emitter(target, payload)

    return this.onStore(source, listener)
  }
}

export default (store: Store) => {
  const socket: Socket = io(`${host}:${port}`, options)

  store.socket = new SocketAdapter(socket, store)
};
