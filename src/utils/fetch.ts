// noinspection JSUnusedGlobalSymbols

import { baseHost, basePort, baseProtocol } from '@/configs/fetch'

// Base URL type
export type Url = URL | string
// HTTP Request options
export type Options = RequestInit
// HTTP Request results
export type Result<T> = Promise<T | void>

export type Sender = (url: Url, options?: Options) => Promise<Response>
export type Handler = <T>(response: Response) => Result<T> | void

// Default URL for requests
const BASE_URL = `${baseProtocol}//${baseHost}:${basePort}`


// Callback of error handling
export const errorHandler: Handler = async <T>(response: Response): Result<T> => {
  if (!response.ok) {
    throw new Error(response.statusText)
  }
}

// Callback of JSON data processing for HTTP request results
export const jsonParse: Handler = async <T>(response: Response): Result<T> =>
  response.ok ? await response.json() as T : await errorHandler<T>(response)

// Function of send HTTP request
export const sender: Sender = async (url: Url = '', options?: RequestInit): Promise<Response> =>
  await fetch(new URL(url, BASE_URL), options)

// Controller of HTTP request
export const target = (defaults?: Options, handler: Handler = errorHandler) =>
  async <T>(url: Url = '', options?: Options): Result<T> =>
    await handler<T>(await sender(url, { ...defaults, ...options }))

// Function of configuration HTTP request
export const setup = (base = '', handler: Handler = errorHandler) =>
  async <T>(path = '', options?: Options): Result<T> =>
    await target(options, handler)<T>(base + path)


export const GET = { method: 'GET' }
export const POST = { method: 'POST' }
export const PUT = { method: 'PUT' }
export const PATCH = { method: 'PATCH' }
export const DELETE = { method: 'DELETE' }


export const get = target(GET)
export const post = target(POST)
export const put = target(PUT)
export const patch = target(PATCH)
export const del = target(DELETE)
