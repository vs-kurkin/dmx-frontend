<script lang="ts" setup type="tsx">
import { type PageState } from 'primevue/paginator'
import { ref } from 'vue'

export interface Props {
  disabled: boolean
}


const props = defineProps<Props>()

const total = ref(512)
const rows = ref(24)
const first = ref(0)
const count = ref(rows)

const onChangePage = (state: PageState) => {
  rows.value = state.rows
  first.value = state.first
  count.value = Math.min(rows.value, total.value - state.first)
}
</script>

<template>
  <ScrollPanel class="mt-3">
    <div class="flex w-max m-auto mt-2">
      <DMXChannel
        v-for="address in count"
        :key="first + address"
        :address="first + address"
        :disabled="props.disabled"
      />
    </div>
  </ScrollPanel>

  <div class="text-center">
    <Paginator
      :first="first"
      :page-link-size="1"
      :rows="24"
      :rows-per-page-options="[12, 24, 36, 48]"
      :total-records="total"
      class="inline-block"
      @page="onChangePage"
    />
  </div>
</template>

<style scoped></style>
