export const {
  VITE_API_HOST: baseHost = location.hostname,
  VITE_API_PORT: basePort = location.port,
  VITE_API_PROTOCOL: baseProtocol = location.protocol,
} = import.meta.env
