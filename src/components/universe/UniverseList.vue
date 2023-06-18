<script setup lang="ts" type="tsx">
import UniverseListener from '@/components/universe/UniverseListener.vue'
import { StoreKey } from '@/store'
import { State, Store } from '@/store/types'
import Button from 'primevue/button'
import Listbox, { ListboxChangeEvent } from 'primevue/listbox'
import { useConfirm } from 'primevue/useconfirm'
import { ref } from 'vue'
import { useStore } from 'vuex'

const store: Store<State> = useStore<State>(StoreKey)
const confirm = useConfirm()

const universe = ref<string>(store.state.universe.current)
const universes = ref<string[]>(store.state.universe.list)


const deleteUniverse = async (event: PointerEvent, name: string) => {
  event.stopPropagation()

  confirm.require({
    message: 'Do you want to delete this universe?',
    accept: () => store.dispatch('deleteUniverse', name),
    header: `Delete ${name}`,
    acceptIcon: 'pi pi-check',
    rejectIcon: 'pi pi-times',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
  })
}

const changeUniverse = ({value}: ListboxChangeEvent) => {
  store.dispatch('setCurrentUniverse', value)

  if (value == null) {
    store.dispatch('resetAllChannelValues')
  } else {
    store.dispatch('getAllChannelValues', value)
  }
}
</script>

<template>
  <UniverseListener />

  <Listbox
    v-model="universe"
    :options="universes"
    :disabled="!universes.length"
    empty-message="No universes"
    class="w-auto"
    @change="changeUniverse"
  >
    <template #option="{ option }">
      <div class="flex justify-content-between align-items-center">
        {{ option }}
        <Button
          icon="pi pi-times"
          severity="danger"
          size="small"
          class="flex ml-2 w-1 h-2rem"
          text
          @click="event => deleteUniverse(event, option)"
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
