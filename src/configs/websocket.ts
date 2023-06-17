import type { ManagerOptions, SocketOptions } from 'socket.io-client'

export const host = import.meta.env.VITE_SOCKET_HOST || window.location.hostname
export const port = import.meta.env.VITE_SOCKET_PORT || window.location.port

export const options: Partial<ManagerOptions & SocketOptions> = {
  path: '/ws',
  autoConnect: false,
  transports: ['websocket'],
  ackTimeout: 1000 * 60,
  reconnectionDelay: 1000 * 60 * 5,
}
