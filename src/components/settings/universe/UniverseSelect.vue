<script lang="ts" setup type="tsx">
import ModalBody from '@/components/settings/universe/modal/ModalBody.vue'
import ModalHeader from '@/components/settings/universe/modal/ModalHeader.vue'
import { getStore } from '@/store'
import type { DeviceIndex } from '@dmx-cloud/dmx-types'
import { PrimeIcons } from '@primevue/core/api'
import Select from 'primevue/select'
import { useConfirm } from 'primevue/useconfirm'
import { useDialog } from 'primevue/usedialog'
import { computed, markRaw, reactive, ref, toValue } from 'vue'

const store = getStore()
const confirm = useConfirm()
const dialog = useDialog()

const current = ref(store.state.serial.current)
const universes = computed(() => store.state.serial.universes)
const devices = computed(() => store.state.serial.devices)

const tooltip = (value: string) => ({
  value,
  showDelay: 500,
  hideDelay: 100,
})

const getDeviceName = (id: DeviceIndex = toValue(current)) => devices.value.get(id)?.friendlyName

const deleteSerial = async (index: DeviceIndex) => {
  await store.dispatch('serial/remove', index)
  await store.dispatch('dmx/reset')
}

const changeSerial = async (index: DeviceIndex) => {
  await store.dispatch('serial/select', index)

  if (index == null) {
    await store.dispatch('dmx/reset')
  } else {
    await store.dispatch('dmx/pull', index)
  }
}

const updateSerial = async () => {
  await store.dispatch('serial/pull')
}


const add = async () => {
  dialog.open(ModalBody, {
    data: reactive({
      step: 0,
    }),
    props: {
      closable: false,

      closeOnEscape: false,
      dismissableMask: true,
      draggable: false,
      modal: true,
    },
    templates: {
      header: markRaw(ModalHeader),
    },
  })
}

const remove = (event: MouseEvent, id: DeviceIndex) => {
  event.stopPropagation()

  confirm.require({
    accept: () => {
      deleteSerial(id)
    },
    acceptClass: 'p-button-danger',
    acceptIcon: PrimeIcons.CHECK,
    header: `Delete ${id}`,
    icon: PrimeIcons.INFO_CIRCLE,
    message: 'Do you want to delete this universe?',
    rejectIcon: PrimeIcons.TIMES,
  })
}

updateSerial()

</script>

<template>
  <SocketListener />

  <InputGroup>
    <Button
      v-tooltip.bottom="tooltip('Add universe')"
      :icon="PrimeIcons.PLUS"
      :outlined="universes.length !== 0"
      class="bg-primary-reverse"
      severity="primary"
      size="small"
      @click="add"
    />

    <Select
      v-model="current"
      :input-class="`${universes.length ? current ? 'text-green-200' : 'text-orange-200' : `text-disabled`}`"
      :option-label="() => getDeviceName() ?? 'No connection'"
      :options="universes"
      :placeholder="universes.length ? 'No connection' : 'No universes'"
      :show-clear="current != null"
      checkmark
      class="border-right-none border-left-none border-top-2 border-bottom-2 max-w-18rem sm:text-sm"
      panel-class="border-noround-top"
      @change="({ value }) => changeSerial(value)"
    >
      <template #option="{ option }">
        <div class="flex justify-content-between align-items-center gap-1">
          {{ getDeviceName(option) }}
          <Button
            :icon="PrimeIcons.TRASH"
            class="flex ml-2 w-1 h-2rem"
            severity="danger"
            size="small"
            style="font-size: 2rem"
            text
            @click="(event) => remove(event, option)"
          />
        </div>
      </template>
    </Select>

    <slot name="after" />
  </InputGroup>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
:deep(.p-listbox-list) {
  padding: 0 !important;
}

:deep(.p-listbox-item) {
  margin: 0 !important;
  padding: 0.5rem !important;
}
</style>
