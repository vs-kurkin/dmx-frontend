<template>
  <OrderList
    :ref="deviceList"
    :model-value="list"
    class="align-items-start"
    meta-key-selection
    selection-mode="single"
    striped-rows
    @reorder="update"
    @update:selection="select"
  >
    <template #header>
      <div class="flex gap-2 justify-content-between align-items-center">
        <div class="flex-grow-1 text-lg">
          Devices:
        </div>

        <div class="flex-shrink-0 flex gap-1">
          <Button
            class="active:border-0"
            icon="pi pi-plus"
            label="Add"
            severity="primary"
            size="small"
            @click="create"
          />
        </div>
      </div>
    </template>

    <template #item="{ item: { name, channels }, index }">
      <div class="flex flex-nowrap align-items-center justify-content-between h-4rem w-20rem">
        <div class="flex flex-column flex-nowrap">
          <span class="font-bold overflow-hidden max-w-18rem">{{ name }}</span>
          <div class="flex align-items-center gap-2">
            <i class="pi pi-tag text-sm" />
            <span>{{ channels?.length ?? 0 }}</span>
          </div>
        </div>

        <div class="flex-column flex align-content-center justify-content-between">
          <Button
            v-show="index > 0"
            class="list-item-remove w-2rem h-2rem active:border-0"
            icon="pi pi-angle-up"
            text
            @click="(event) => moveUp(event, index)"
          />
          <Button
            v-show="index < list.length - 1"
            class="list-item-remove w-2rem h-2rem active:border-0"
            icon="pi pi-angle-down"
            text
            @click="(event) => moveDown(event, index)"
          />
        </div>
      </div>
    </template>
  </OrderList>
</template>

<script lang="ts" setup>
import CreateDevice from '@/components/device/CreateDevice.vue'
import { store } from '@/store'
import { awaitErrorHandler } from '@/utils/helpers'
import type { Device, DeviceIndex, DeviceList } from '@dmx-cloud/dmx-types'
import type { DynamicDialogCloseOptions } from 'primevue/dynamicdialogoptions'
import OrderList, { type OrderListReorderEvent } from 'primevue/orderlist'
import { useDialog } from 'primevue/usedialog'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'

const toast = useToast()
const dialog = useDialog()

const deviceList = ref<InstanceType<typeof OrderList> | null>(null)

const list = defineModel<DeviceList>({
  required: true,
})

const selected = defineModel<DeviceIndex>('selected', {
  required: false,
})

const emit = defineEmits<{
  'update:selected': DeviceIndex
  'update:list': DeviceList
}>()

const update = ({ value }: OrderListReorderEvent) => {
  store.dispatch('device/set', value)
}

const select = ([event]: DeviceList) => {
  const index = list.value.indexOf(event)

  if (index < 0 || index === selected.value) {
    return
  }

  // focus(index)
  emit('update:selected', index)
}

const focus = (index: DeviceIndex) => {
  if (deviceList.value) {
    deviceList.value.changeFocusedOptionIndex(index)
    deviceList.value.findFocusedItem()?.click()
  }
}

const create = () => {
  dialog.open(CreateDevice, {
    props: {
      closable: true,
      draggable: false,
      dismissableMask: true,
      modal: true,
      closeOnEscape: true,
      header: 'Create new device',
    },
    async onClose(options: DynamicDialogCloseOptions) {
      if (options?.data as Device) {
        store.dispatch('device/add', options.data)
          .catch(awaitErrorHandler(toast, 'Failed to add device'))
      }
    },
  })
}

const moveUp = (event: MouseEvent, index: DeviceIndex) => {
  event.stopPropagation()

  selected.value = index - 1

  deviceList.value?.moveUp()
  focus(index)
}

const moveDown = (event: MouseEvent, index: DeviceIndex) => {
  event.stopPropagation()

  selected.value = index + 1

  deviceList.value?.moveDown()
  focus(index)
}
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
:deep(.p-listbox-list-container) {
  height: min-content !important;
  max-height: 100% !important;
}
</style>
