import type { ManagerOptions, SocketOptions } from 'socket.io-client'

export const {
  VITE_SOCKET_HOST: host = location.hostname,
  VITE_SOCKET_PORT: port = location.port,
} = import.meta.env

export type WebSocketOptions = Partial<ManagerOptions & SocketOptions>

export const options: WebSocketOptions = {
  path: '/ws',
  autoConnect: false,
  transports: ['websocket'],
  ackTimeout: 1000 * 60,
  reconnectionDelay: 1000 * 60 * 5,
}
