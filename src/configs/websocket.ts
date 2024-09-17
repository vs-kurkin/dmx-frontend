import type { ManagerOptions, SocketOptions } from 'socket.io-client'

export const {
  VITE_SOCKET_HOST: wsHost = location.hostname,
  VITE_SOCKET_PORT: wsPort = location.port,
} = import.meta.env

export const PATH = '/ws'

export const options: Partial<ManagerOptions & SocketOptions> = {
  path: PATH,
  autoConnect: false,
  transports: ['websocket'],
  ackTimeout: 1000 * 60,
  reconnectionDelay: 1000 * 60 * 5,
}
