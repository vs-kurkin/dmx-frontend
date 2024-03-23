interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly BASE_URL: string
  readonly VITE_SOCKET_HOST: string
  readonly VITE_SOCKET_PORT: string
  readonly VITE_API_HOST: string
  readonly VITE_API_PORT: string
  readonly VITE_API_PROTOCOL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
