import { TYPE } from '@/utils/constants'
import type { ChannelType } from '@dmx-cloud/dmx-types'
import type { ToastServiceMethods } from 'primevue/toastservice'

export const getChannelType = (type: ChannelType): string => TYPE[type]

export const errorHandler = (toast: ToastServiceMethods) => (summary: string, detail = '') =>
  toast.add({
    summary,
    detail,
    severity: 'error',
    life: 2000,
  })

export const awaitErrorHandler = (toast: ToastServiceMethods, title = 'Error') => (reason: Error) => errorHandler(toast)(title, reason.message)
