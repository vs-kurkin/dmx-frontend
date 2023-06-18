<script setup lang="ts" type="tsx">
import AddUniverseDialog from '@/components/modal/UniverseContent.vue'
import UniverseHeader from '@/components/modal/UniverseHeader.vue'
import UniverseSelect from '@/components/universe/UniverseList.vue'
import { StoreKey } from '@/store'
import { State, Store } from '@/store/types'
import Button from 'primevue/button'
// noinspection ES6UnusedImports
import Toast from 'primevue/toast'
import { useConfirm } from 'primevue/useconfirm'
import { useDialog } from 'primevue/usedialog'
import { useToast } from 'primevue/usetoast'
import { markRaw, ref } from 'vue'
import { useStore } from 'vuex'


const dialog = useDialog()
const confirm = useConfirm()
const toast = useToast()

const store: Store<State> = useStore<State>(StoreKey)
const universes = ref<string[]>(store.state.universe.list)

const deleteAllUniverses = () => {
  confirm.require({
    message: 'Do you want to delete all universes?',
    accept: () => store
      .dispatch('deleteAllUniverses')
      .catch(error => toast.add({
        severity: 'error',
        summary: 'Error universes delete',
        detail: error,
        life: 2000,
      })),
    header: 'Confirm delete',
    acceptIcon: 'pi pi-check',
    rejectIcon: 'pi pi-times',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
  })
}

const addUniverse = async () => {
  dialog.open(AddUniverseDialog, {
    props: {
      closable: false,
      draggable: false,
      dismissableMask: true,
      modal: true,
      closeOnEscape: true,
    },
    templates: {
      header: markRaw(UniverseHeader),
    },
  })
}

const updateUniverses = () => store
  .dispatch('updateUniverses')
  .catch(error => toast.add({
    severity: 'error',
    summary: 'Error update universes',
    detail: error,
    life: 2000,
  }))

const tooltip = (value: string) => ({
  value,
  showDelay: 500,
  hideDelay: 100,
})

updateUniverses()
</script>

<template>
  <h3 class="mb-2">
    <span class="pi pi-wrench mr-2" />
    {{ universes.length ? 'Select universe:' : 'Universe:' }}
  </h3>

  <UniverseSelect />

  <div class="flex flex-row flex-nowrap gap-2 mt-3 relative">
    <Button
      v-tooltip.bottom="tooltip('Add universe')"
      icon="pi pi-plus"
      class="flex"
      severity="success"
      @click="addUniverse"
    />

    <Button
      v-tooltip.bottom="tooltip('Update list')"
      icon="pi pi-sync"
      class="flex"
      @click="updateUniverses"
    />

    <Button
      v-tooltip.left="tooltip('Delete all')"
      :disabled="universes.length === 0"
      icon="pi pi-trash"
      class="flex right-0 absolute"
      severity="danger"
      @click="deleteAllUniverses"
    />
  </div>

  <Toast position="bottom-left" />
</template>
