interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_BASE_URL: string
  readonly VITE_SOCKET_HOST: string
  readonly VITE_SOCKET_PORT: string
  readonly VITE_API_HOST: string
  readonly VITE_API_PORT: string
  readonly VITE_API_PROTOCOL: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}
