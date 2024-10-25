<script lang="ts" setup>
import InputField from '@/components/common/InputField.vue'
import CreateChannel from '@/components/device/CreateChannel.vue'
import { getStore } from '@/store'
import { awaitErrorHandler } from '@/utils/helpers'
import type { Device } from '@dmx-cloud/dmx-types'
import { PrimeIcons } from '@primevue/core/api'
import type { DynamicDialogCloseOptions } from 'primevue/dynamicdialogoptions'
import { type InputTextProps } from 'primevue/inputtext'
import { useConfirm } from 'primevue/useconfirm'
import { useDialog } from 'primevue/usedialog'
import { useToast } from 'primevue/usetoast'
import { computed, ref, watch } from 'vue'

const dialog = useDialog()
const confirm = useConfirm()
const toast = useToast()

const device = defineModel<Device>({ required: true })
const emit = defineEmits<{ update: [Device] }>()
const store = getStore()
const list = computed(() => store.state.device.list)

const index = ref(0)
const isInvalid = ref(true)
const isChanged = ref(false)
const changed = ref<Device>(null)

const validateInput = (el: InputTextProps): void => {
  isInvalid.value = el?.invalid ?? false
}

const reset = () => {
  changed.value = { ...device.value }
  isChanged.value = false
  isInvalid.value = false
}

const updateDevice = async () => {
  if (index.value in list.value) {
    try {
      await store.dispatch('device/update', {
        index: index.value,
        device: changed.value,
      })
      emit('update', device.value)
    } catch (error) {
      awaitErrorHandler(toast, 'Failed to update device')(error as Error)
    }
  }
}

const removeDevice = async () => {
  confirm.require({
    async accept() {
      try {
        await store.dispatch('device/remove', index.value)
      } catch (error) {
        awaitErrorHandler(toast, 'Failed to remove device')(error as Error)
      }
    },
    acceptClass: 'p-button-danger',
    acceptIcon: PrimeIcons.CHECK,
    header: 'Delete device',
    icon: PrimeIcons.INFO_CIRCLE,
    message: `Do you want to delete device "${device.value.name}"?`,
    rejectIcon: PrimeIcons.TIMES,
  })
}

const createChannel = () => {
  const currentDevice = changed.value

  dialog.open(CreateChannel, {
    data: currentDevice,
    onClose({ data }: DynamicDialogCloseOptions) {
      if (data) {
        store.dispatch('device/setChannels', {
            index: index.value,
            channels: [...(currentDevice.channels ?? []), data],
          })
          .catch(awaitErrorHandler(toast, 'Failed to add channel'))
      }
    },
    props: {
      closable: true,
      closeOnEscape: true,
      dismissableMask: true,
      draggable: false,
      header: 'Add channel',
      modal: true,
    },
  })
}

watch(device, (newDevice) => {
  if (newDevice) {
    reset()
    index.value = list.value.indexOf(newDevice)
  }
})

watch(changed, () => {
  isChanged.value = JSON.stringify(device.value) !== JSON.stringify(changed.value)
}, { deep: true })
</script>

<template>
  <div class="device-card flex flex-column flex-wrap gap-2 w-full ml-3">
    <Card class="border-primary-900 border-1">
      <template #title>
        <div
          v-if="device"
          class="flex flex-row align-self-stretch m-3"
        >
          <div class="flex-grow-1 font-normal text-lg text-color-secondary">
            Info:
          </div>
          <div class="flex gap-2">
            <Button
              :disabled="isInvalid || !isChanged"
              icon="pi pi-save"
              label="Save"
              severity="success"
              size="small"
              @click="updateDevice"
            />
            <Button
              :disabled="!isChanged"
              icon="pi pi-refresh"
              label="Reset"
              severity="secondary"
              size="small"
              @click="reset"
            />
            <Button
              icon="pi pi-trash"
              label="Delete"
              severity="danger"
              size="small"
              @click="removeDevice"
            />
          </div>
        </div>
      </template>

      <template #content>
        <div v-if="device">
          <div class="flex flex-column align-items-stretch align-content-stretch flex-wrap gap-1 w-6 min-w-fit">
            <InputField
              v-model="changed.name"
              :validate="validateInput"
              label="Name:"
            />
            <InputField
              v-model="changed.vendor"
              label="Vendor:"
            />
            <InputField
              v-model="changed.model"
              label="Model:"
            />
          </div>

          <Divider />
          <div class="text-color-secondary text-lg">
            Channels:
          </div>
          <ChannelList
            v-model="changed.channels"
            @update="updateDevice"
          />

          <div class="text-center mt-3">
            <Button
              icon="pi pi-plus"
              label="Add channel"
              raised
              severity="primary"
              size="small"
              @click="createChannel"
            />
          </div>
        </div>

        <div
          v-else
          class="empty-message gap-1 flex justify-content-center align-items-center"
        >
          <span class="pi pi-arrow-circle-left" />
          <span>Select device</span>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
:deep(.p-card-content) {
  margin: 1rem
}

:deep(.p-card-content),
:deep(.p-card-body) {
  line-height: 2rem;
  padding: 0;
}

.empty-message {
  text-align: center;
}
</style>
