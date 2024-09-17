<script lang="ts" setup>
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
import { computed, ref, toValue, watch, watchEffect } from 'vue'

const dialog = useDialog()
const confirm = useConfirm()
const toast = useToast()

const device = defineModel<Device>({
  required: true,
})

const emit = defineEmits<{
  update: [Device]
}>()

const store = getStore()
const list = computed(() => store.state.device.list)

const index = ref(0)
const isInvalid = ref(true)
const isChanged = ref(false)
const changed = ref<Device>(null)

const validate = (el: InputTextProps | null): void => {
  isInvalid.value = el?.invalid ?? isInvalid.value
}

const reset = () => {
  changed.value = { ...toValue(device) }
  isChanged.value = false
  isInvalid.value = false
}

const update = async () => {
  if (index.value in list.value) {
    await store.dispatch('device/update', {
      index: toValue(index),
      device: toValue(changed),
    })
      .catch(awaitErrorHandler(toast, 'Failed to update device'))

    emit('update', device.value)
  }
}

const remove = async () => {
  confirm.require({
    async accept() {
      await store.dispatch('device/remove', toValue(index))
        .catch(awaitErrorHandler(toast, 'Failed to remove device'))
    },
    acceptClass: 'p-button-danger',
    acceptIcon: PrimeIcons.CHECK,
    header: `Delete device`,
    icon: PrimeIcons.INFO_CIRCLE,
    message: `Do you want to delete device "${device.value.name}"?`,
    rejectIcon: PrimeIcons.TIMES,
  })
}

const createChannel = () => {
  const device = toValue(changed)

  dialog.open(CreateChannel, {
    data: device,
    onClose({ data }: DynamicDialogCloseOptions) {
      data && store.dispatch('device/setChannels', {
        index: toValue(index),
        channels: (device.channels ?? []).concat([data]),
      })
        .catch(awaitErrorHandler(toast, 'Failed to add channel'))
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

watchEffect(() => {
  if (device.value) {
    console.log('device', device.value)
    reset()

    index.value = list.value.indexOf(device.value)
  }
})

watch(changed, () => {
  isChanged.value = JSON.stringify(device.value) !== JSON.stringify(changed.value)
  console.log('changed', isChanged.value)
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
              @click="update"
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
              @click="remove"
            />
          </div>
        </div>
      </template>

      <template #content>
        <div v-if="device">
          <div class="flex flex-column align-items-stretch align-content-stretch flex-wrap gap-1 w-6 min-w-fit">
            <div class="flex flex-row justify-content-between align-items-center gap-5">
              <label><b>Name:</b></label>
              <InputText
                :ref="node => validate(node as InputTextProps)"
                v-model="changed.name"
                :invalid="!changed.name"
                class="w-20rem"
                name="name"
                size="small"
              />
            </div>

            <div class="flex flex-row justify-content-between align-items-center">
              <label><b>Vendor:</b></label>
              <InputText
                v-model="changed.vendor"
                class="w-20rem"
                name="vendor"
                size="small"
              />
            </div>

            <div class="flex flex-row justify-content-between align-items-center">
              <label><b>Model:</b></label>
              <InputText
                v-model="changed.model"
                class="w-20rem"
                name="model"
                size="small"
              />
            </div>
          </div>

          <Divider />
          <div class="text-color-secondary text-lg">
            Channels:
          </div>

          <ChannelList
            v-model="changed.channels"
            @update="update"
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

<!--suppress CssUnusedSymbol -->
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
