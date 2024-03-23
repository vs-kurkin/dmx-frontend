<script lang="ts" setup type="tsx">
import type { SerialDevice } from '@/api/serial.ts'
import { type Store, StoreKey } from '@/store'
import type { DeviceMap } from '@/store/modules/serial.ts'
import { PrimeIcons } from 'primevue/api'
import Button from 'primevue/button'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import Listbox from 'primevue/listbox'
import { useToast } from 'primevue/usetoast'
import { inject, type Ref, ref, watch } from 'vue'
import { useStore } from 'vuex'

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
const store: Store = useStore(StoreKey)
const toast = useToast()

const devices = ref<DeviceMap>(store.state.serial.devices)
const drivers = ref<string[]>(store.state.serial.drivers)
const device = ref<SerialDevice>()
const driver = ref<string>()

watch(device, (value) => {
  dialogRef && (dialogRef.value.data.step = value ? 1 : 0)
})

const addUniverse = async () => {
  try {
    if (!device.value) {
      return
    }

    await store.dispatch('addUniverse', {
      device: device.value,
      driver: driver.value,
    })

    await store.dispatch('setCurrentUniverse', device.value.serialNumber)

    dialogRef?.value.close()
  } catch (error) {
    errorHandler('Failed to add device', (error as Error).message)

    throw error
  }
}

const refreshData = async () => {
  device.value = undefined
  driver.value = undefined

  await store.dispatch('updateSerial')
}

const errorHandler = (summary: string, detail: string) =>
  toast.add({
    summary,
    detail,
    severity: 'error',
    life: 2000,
  })
</script>

<template>
  <div class="flex gap-3 align-items-start flex-nowrap">
    <Listbox
      v-model="device"
      :options="Array.from(devices.values())"
      data-key="serialNumber"
      empty-message="No devices available"
      list-style="height: 230px"
      option-label="friendlyName"
    />

    <Listbox
      v-model="driver"
      :disabled="device == null"
      :options="drivers"
      empty-message="No supported drivers"
      list-style="height: 230px"
    />
  </div>

  <div class="flex gap-2 mt-4 relative">
    <Button
      :icon="PrimeIcons.TIMES"
      label="Cancel"
      severity="secondary"
      @click="dialogRef.close"
    />

    <Button :icon="PrimeIcons.REFRESH" label="Refresh" @click="refreshData" />

    <Button
      :disabled="!device || !driver"
      :icon="PrimeIcons.CHECK"
      class="absolute right-0"
      label="Add"
      severity="success"
      @click="addUniverse"
    />
  </div>
</template>

<style scoped>

</style>
