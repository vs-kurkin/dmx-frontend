<script lang="ts" setup type="tsx">
import { getStore } from '@/store'
import { awaitErrorHandler, errorHandler } from '@/utils/helpers'
import type { Serial } from '@dmx-cloud/dmx-types'
import { PrimeIcons } from '@primevue/core/api'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { useToast } from 'primevue/usetoast'
import { computed, inject, type Ref, ref, watch } from 'vue'

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
const store = getStore()
const toast = useToast()

const devices = computed(() => store.state.serial.devices)
const drivers = computed(() => store.state.serial.drivers)
const device = ref<Serial>()
const driver = ref<string>()

watch(device, (value) => {
  if (dialogRef) {
    dialogRef.value.data.step = Number(Boolean(value))
  }
})

const addUniverse = async () => {
  try {
    if (!device.value) {
      return
    }

    await store.dispatch('serial/select', device.value)
    await store.dispatch('serial/add', {
      device: device.value,
      driver: driver.value,
    })

    dialogRef?.value.close()
  } catch (error) {
    errorHandler(toast)('Failed to add device', (error as Error).message)

    throw error
  }
}

const refreshData = async () => {
  device.value = undefined
  driver.value = undefined

  await store.dispatch('serial/init')
    .catch(awaitErrorHandler(toast, 'Failed to serial init'))
}
</script>

<template>
  <div class="flex gap-3 align-items-start flex-nowrap">
    <Listbox
      v-model="device"
      :options="[...devices.values()]"
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
      @click="dialogRef?.close"
    />

    <Button
      :icon="PrimeIcons.REFRESH"
      label="Refresh"
      @click="refreshData"
    />

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
