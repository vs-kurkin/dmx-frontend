<script lang="ts" setup type="tsx">
import SocketListener from '@/components/settings/universe/SocketListener.vue'
import { type Store, StoreKey } from '@/store'
import type { DeviceMap } from '@/store/modules/serial.ts'
import { PrimeIcons } from 'primevue/api'
import Button from 'primevue/button'
import Listbox, { type ListboxChangeEvent } from 'primevue/listbox'
import { useConfirm } from 'primevue/useconfirm'
import { ref } from 'vue'
import { useStore } from 'vuex'

const store: Store = useStore(StoreKey)
const confirm = useConfirm()

const current = ref<string | void>(store.state.serial.current)
const universes = ref<string[]>(store.state.serial.universes)
const devices = ref<DeviceMap>(store.state.serial.devices)

const deleteUniverse = async (event: MouseEvent | PointerEvent, id: string) => {
  event.stopPropagation()

  confirm.require({
    message: 'Do you want to delete this universe?',
    accept: () => {
      store.dispatch('deleteUniverse', id)
      store.dispatch('resetAllChannelValues')
    },
    header: `Delete ${id}`,
    acceptIcon: PrimeIcons.CHECK,
    rejectIcon: PrimeIcons.TIMES,
    icon: PrimeIcons.INFO_CIRCLE,
    acceptClass: 'p-button-danger',
  })
}

const changeUniverse = ({ value: device }: ListboxChangeEvent) => {
  store.dispatch('setCurrentUniverse', device)

  if (device) {
    store.dispatch('getAllChannelValues', device)
  } else {
    store.dispatch('resetAllChannelValues')
  }
}
</script>

<template>
  <SocketListener />

  <Listbox
    v-model="current"
    :disabled="!universes.length"
    :options="universes"
    class="w-auto"
    empty-message="No universes"
    @change="changeUniverse"
  >
    <template #option="{ option }">
      <div class="flex justify-content-between align-items-center">
        {{ devices.get(option)?.friendlyName }}
        <Button
          :icon="PrimeIcons.TIMES"
          class="flex ml-2 w-1 h-2rem"
          severity="danger"
          size="small"
          text
          @click="(event) => deleteUniverse(event, option)"
        />
      </div>
    </template>
  </Listbox>
</template>

<style scoped>
:deep(.p-listbox-list) {
  padding: 0 !important;
}

:deep(.p-listbox-item) {
  margin: 0 !important;
  padding: 0.5rem !important;
}
</style>
