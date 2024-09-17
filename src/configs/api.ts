export const {
  VITE_API_HOST: apiHost = location.hostname,
  VITE_API_PORT: apiPort = location.port,
  VITE_API_PROTOCOL: apiProtocol = location.protocol,
} = import.meta.env
