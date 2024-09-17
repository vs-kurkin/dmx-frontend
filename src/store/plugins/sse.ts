import { url } from '@/configs/sse'
import type { StoreProject } from '@/store'

export default (store: StoreProject) => {
  const SSE = new EventSource(url)

  SSE.addEventListener('update', (event: MessageEvent) => {
    const data = JSON.parse(event.data) ?? {}
    const channels = data[store.state.serial.current]

    if (channels != null) {
      store.commit('dmx/channels', channels)
    }
  });
}
