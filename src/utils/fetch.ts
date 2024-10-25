import { apiHost, apiPort, apiProtocol } from '@/configs/api'

export type Options = RequestInit
export type Sender = <T>(url: string, options?: Options) => Promise<T>
export type Handler = <T>(response: Response) => Promise<T>

// Default URL for requests
const BASE_URL = `${apiProtocol}//${apiHost}:${apiPort}`

export const CONTENT_TYPE_JSON = { 'Content-Type': 'application/json' }

export const HEADER_JSON = {
  headers: CONTENT_TYPE_JSON,
}

// Callback of error handling
export const errorHandler: Handler = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.text() as T
}

// JSON data processing callback
export const jsonParse: Handler = async <T>(response: Response): Promise<T> =>
  response.ok ? await response.json() as T : errorHandler<T>(response)

// Function to send HTTP requests
export const request: Sender = async <T>(url = '', options?: Options): Promise<T> =>
  await fetch(new URL(url, BASE_URL), options) as T

// HTTP request controller
export const createSender = <R>(defaultOptions?: Options, handler: Handler = errorHandler): Sender =>
  async <T=R>(url = '', options?: Options): Promise<T> =>
    handler<T>(await request(url, { ...defaultOptions, ...options }))

// Function of configuration HTTP request
export const target = (base = '', handler: Handler = errorHandler): Sender =>
  async <T>(path = '', options?: Options): Promise<T> =>
    createSender<T>(options, handler)(`${base}${path}`)


export const GET: Options = { method: 'GET' }
export const POST: Options = { method: 'POST' }
export const PUT: Options = { method: 'PUT' }
export const PATCH: Options = { method: 'PATCH' }
export const DELETE: Options = { method: 'DELETE' }


export const get = createSender(GET)
export const post = createSender(POST)
export const put = createSender(PUT)
export const patch = createSender(PATCH)
export const del = createSender(DELETE)

