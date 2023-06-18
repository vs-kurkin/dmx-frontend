import { io, Socket } from 'socket.io-client';
import { host, port, options } from '@/configs/websocket';
import type { Store } from '@/store/types';

export const EVENT_CONNECT = 'connect';
export const EVENT_DISCONNECT = 'disconnect';
export const EVENT_ERROR = 'error';
export const EVENT_SOCKET_ERROR = 'connect_error';
export const EVENT_EXCEPTION = 'exception';

export class SocketAdapter {
  private socket: Socket;
  private store: Store;

  constructor(socket, store) {
    this.socket = socket;
    this.store = store;
  }

  connect() {
    this.socket.connect()
  }

  disconnect() {
    this.socket.disconnect()
  }

  emitStore<T=void>(type, payload): Promise<T> | void {
    return this.store.dispatch(type, payload)
  }

  emitSocket(event, payload) {
    return this.socket.emit(event, payload)
  }

  onSocket(event, listener) {
    return this.socket.on(event, listener);
  }

  onStore(type, listener) {
    const check = value => value === type;
    const handler = ({ type, payload }) => check(type) && listener(payload);

    return this.store.subscribe(handler);
  }

  pipeSocket(event, type = event, listener = this.emitStore) {
    const handler = payload => listener(type, payload);

    return this.onSocket(event, handler);
  }

  pipeStore(type, event = type, listener = this.emitSocket) {
    const handler = payload => listener(event, payload);

    return this.onStore(type, handler);
  }
}


export default (store: Store) => {
  const socket: Socket = io(`${host}:${port}`, options);

  store.socket = new SocketAdapter(socket, store);
};
