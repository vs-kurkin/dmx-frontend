import type { ManagerOptions, SocketOptions } from 'socket.io-client'

export const host = '127.0.0.1:8081'

export const options: Partial<ManagerOptions & SocketOptions> = {
  path: '/ws',
  autoConnect: false,
  transports: ['websocket'],
  ackTimeout: 1000 * 60,
  reconnectionDelay: 1000 * 60 * 5
}
