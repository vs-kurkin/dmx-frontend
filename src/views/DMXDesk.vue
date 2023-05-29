<script setup lang='ts'>
import DMXChannel from '@/components/DMXChannel.vue'
import Paginator from 'primevue/paginator'
import ScrollPanel from 'primevue/scrollpanel'
import { ref } from 'vue'

const total = ref(512)
const rows = ref(12)
const links = ref(7)
const first = ref(0)

const onChangePage = (state: any) => {
  rows.value = state.rows
  first.value = state.first
}
</script>

<template>
  <div>
    <ScrollPanel class='mt-3'>
      <div class='flex w-max m-auto mt-2'>
        <DMXChannel :channel='first + channel' v-for='channel in Math.min(rows, total - first)' />
      </div>
    </ScrollPanel>

    <Paginator
      :first='first'
      :rows='rows'
      :totalRecords='total'
      :pageLinkSize='links'
      :rowsPerPageOptions='[12, 24, 36, 48]'
      @page='onChangePage'
      class='w-max m-auto'
    />
  </div>
</template>

<style scoped></style>
