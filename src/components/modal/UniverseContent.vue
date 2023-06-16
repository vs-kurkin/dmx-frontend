<script setup lang="ts" type="tsx">
import { getDevices } from '@/api/serial'
import { StoreKey } from '@/store'
import Button from 'primevue/button'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import Listbox from 'primevue/listbox'
import { useToast } from 'primevue/usetoast'
import { inject, onMounted, Ref, ref } from 'vue'
import { useStore } from 'vuex'

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef');
const store = useStore(StoreKey)
const toast = useToast()

const drivers = ref<string[]>(store.state.universe.drivers)
const devices = ref()
const device = ref()
const driver = ref()


const addUniverse = async () => {
  try {
    await store.dispatch('addUniverse', {
      name: device.value.friendlyName,
      path: device.value.path,
      driver: driver.value,
    })

    dialogRef.value.close()

    successHandler('Success to add device')
  } catch (error) {
    errorHandler('Failed to add device', (error as Error).message)
  }
}

const refreshData = async () => {
  device.value = driver.value = null

  try {
    devices.value = await getDevices()

    await store.dispatch('updateDrivers')
  } catch (error) {
    errorHandler('Failed to refresh data', (error as Error).message)
  }
}

onMounted(refreshData)

const successHandler = (summary: string) => toast.add({
  summary,
  severity: 'success',
  life: 3000,
})

const errorHandler = (summary: string, detail: string) => toast.add({
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
      :options="devices"
      option-label="friendlyName"
      data-key="serialNumber"
      empty-message="No devices available"
      class="flex"
      list-style="height:200px"
    />
    <Listbox
      v-model="driver"
      :options="drivers"
      :disabled="device == null"
      empty-message="No supported drivers"
      class="flex"
      list-style="height:200px"
    />
  </div>

  <div class="flex gap-2 mt-4 relative">
    <Button
      label="Cancel"
      icon="pi pi-times"
      severity="secondary"
      @click="dialogRef.close"
    />

    <Button
      label="Refresh"
      icon="pi pi-refresh"
      @click="refreshData"
    />

    <Button
      label="Add"
      icon="pi pi-check"
      severity="success"
      class="absolute right-0"
      :disabled="!device || !driver"
      @click="addUniverse"
    />
  </div>
</template>
