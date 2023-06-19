// noinspection JSUnusedGlobalSymbols

import { baseHost, basePort } from '@/configs/fetch'

export type Url = URL | string
export type Options = RequestInit
export type Result<T> = Promise<T | void>

export type Sender = (url: Url, options?: Options) => Promise<Response>
export type Handler = <T>(response: Response) => Result<T>

const BASE_URL = `${baseHost}:${basePort}`

export const errorHandler: Handler = async <T>(response: Response): Result<T> => {
  if (!response.ok) {
    throw new Error(response.statusText)
  }
}

export const jsonParse: Handler = async <T>(response: Response): Result<T> => {
  if (response.ok) {
    return await response.json() as T
  }

  await errorHandler<T>(response)
}


export const sender: Sender = async (url: Url = '', options?: RequestInit): Promise<Response> =>
  await fetch(new URL(url, BASE_URL), options)


export const target = (defaults?: Options, handler = errorHandler) =>
  async <T>(url: Url = '', options?: Options): Result<T> =>
    await handler<T>(await sender(url, { ...defaults, ...options }))


export const setup = (base = '', handler = errorHandler) =>
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
