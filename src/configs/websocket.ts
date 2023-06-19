import type { ManagerOptions, SocketOptions } from 'socket.io-client'

export const {
  VITE_SOCKET_PORT: host = location.hostname,
  VITE_SOCKET_HOST: port = location.port,
} = import.meta.env

export const options: Partial<ManagerOptions & SocketOptions> = {
  path: '/ws',
  autoConnect: false,
  transports: ['websocket'],
  ackTimeout: 1000 * 60,
  reconnectionDelay: 1000 * 60 * 5,
}
