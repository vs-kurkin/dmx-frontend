<script lang="ts" setup type="tsx">
import { getStore } from '@/store'
import type { DeviceIndex } from '@dmx-cloud/dmx-types'
import { computed, onMounted, ref } from 'vue'

const store = getStore()

const index = ref<DeviceIndex>()
const list = computed(() => store.state.device.list)

onMounted(() => store.dispatch('device/init'))
</script>

<template>
  <div class="flex mt-3">
    <DeviceList
      v-model="list"
      v-model:selected="index"
    />
    <DeviceCard
      v-model="list[index]"
      @update:model-value="(device) => { index = list.indexOf(device) }"
    />
  </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
.p-orderlist-item .list-item-remove {
  visibility: hidden;
}

.p-orderlist-item:hover .list-item-remove {
  visibility: visible;
}

:deep(.p-orderlist-list) {
  max-height: unset;
  overflow: auto;
  padding: 0;
}

:deep(.p-orderlist-controls) {
  display: none;
}
</style>
