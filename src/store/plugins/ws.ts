import { options, wsHost, wsPort } from '@/configs/websocket'
import type { StoreProject } from '@/store'
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

export type EventListener<P = EventData> = <D = P>(data: D) => void;

export type EventEmitter<E, D = EventData> = (event: E, ...args: D[]) => void;

export type MutationHandler<P> = (payload: P) => void;

export class SocketAdapter {
  private readonly socket: Socket
  private readonly store: StoreProject

  constructor(socket: Socket, store: StoreProject) {
    this.socket = socket
    this.store = store
  }

  connect(): SocketAdapter {
    this.socket.connect()

    return this
  }

  disconnect(): SocketAdapter {
    this.socket.disconnect()

    return this
  }

  async emitStore<D = EventData>(event: StoreEvent, data: D): Promise<SocketAdapter> {
    await this.store.dispatch(event, data)

    return this
  }

  emitSocket<D = EventData>(event: SocketEvent, data: D): SocketAdapter {
    this.socket.emit(event, data)

    return this
  }

  onSocket<D = EventData>(event: SocketEvent, listener: EventListener<D>): SocketAdapter {
    this.socket.on(event, listener)

    return this
  }

  onStore<D = EventData>(event: StoreEvent, listener: EventListener<D>): SocketAdapter {
    const handler: MutationHandler<MutationPayload> = ({ payload, type }) => event === type && listener<D>(payload as D)

    this.store.subscribe(handler)

    return this
  }

  pipeSocket<T = StoreEvent, D = EventData>(source: SocketEvent, target: T, emitter: EventEmitter<T, D>): SocketAdapter {
    const listener = ((data: D) => emitter(target, data)) as EventListener<D>

    return this.onSocket<D>(source, listener)
  }

  pipeStore<T = SocketEvent, D = EventData>(source: StoreEvent, target: T, emitter: EventEmitter<T, D>): SocketAdapter {
    const listener = ((data: D) => emitter(target, data)) as EventListener<D>

    return this.onStore<D>(source, listener)
  }
}

export default (store: StoreProject) => {
  const socket: Socket = io(`${wsHost}:${wsPort}`, options)

  store.socket = new SocketAdapter(socket, store)
}