<script lang="ts" setup type="tsx">
import ModalBody from '@/components/settings/universe/modal/ModalBody.vue'
import ModalHeader from '@/components/settings/universe/modal/ModalHeader.vue'
import UniverseSelect from '@/components/settings/universe/UniverseSelect.vue'
import { type Store, StoreKey } from '@/store'
import { PrimeIcons } from 'primevue/api'
import Button from 'primevue/button'
import { useConfirm } from 'primevue/useconfirm'
import { useDialog } from 'primevue/usedialog'
import { useToast } from 'primevue/usetoast'
import { markRaw, reactive, ref } from 'vue'
import 'primevue/toast'
import { useStore } from 'vuex'

const store: Store = useStore(StoreKey)

const universes = ref<string[]>(store.state.serial.universes)
const dialog = useDialog()
const confirm = useConfirm()
const toast = useToast()

const updateUniverses = () => store.dispatch('initUniverses')

const deleteAllUniverses = () => {
  confirm.require({
    message: 'Do you want to delete all universes?',
    accept: () =>
      store.dispatch('deleteAllUniverses').catch((error) =>
        toast.add({
          severity: 'error',
          summary: 'Error universes delete',
          detail: error,
          life: 2000,
        }),
      ),
    header: 'Confirm delete',
    acceptIcon: PrimeIcons.CHECK,
    rejectIcon: PrimeIcons.TIMES,
    icon: PrimeIcons.CIRCLE,
    acceptClass: 'p-button-danger',
  })
}

const addUniverse = async () => {
  dialog.open(ModalBody, {
    props: {
      closable: false,
      draggable: false,
      dismissableMask: true,
      modal: true,
      closeOnEscape: false,
    },
    data: reactive({
      step: 0,
    }),
    templates: {
      header: markRaw(ModalHeader),
    },
  })
}

const tooltip = (value: string) => ({
  value,
  showDelay: 500,
  hideDelay: 100,
})

updateUniverses()
</script>

<template>
  <h3 class="mt-0">
    {{ universes.length ? "Select universe:" : "Universe:" }}
  </h3>

  <UniverseSelect />

  <div class="flex flex-nowrap gap-2 mt-2 relative">
    <Button
      v-tooltip.bottom="tooltip('Add universe')"
      :icon="PrimeIcons.PLUS"
      class="flex"
      severity="success"
      @click="addUniverse"
    />

    <Button
      v-tooltip.bottom="tooltip('Update list')"
      :icon="PrimeIcons.SYNC"
      class="flex"
      @click="updateUniverses"
    />

    <Button
      v-tooltip.left="tooltip('Delete all')"
      :disabled="universes.length === 0"
      :icon="PrimeIcons.TRASH"
      class="flex right-0 absolute"
      severity="danger"
      @click="deleteAllUniverses"
    />
  </div>
</template>
