<script lang="ts" setup type="tsx">
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import Steps from 'primevue/steps'
import { inject, type Ref } from 'vue'

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')

const steps = [
  {
    label: 'Select device',
  },
  {
    label: 'Select driver',
  },
]
</script>

<template>
  <Steps
    v-model:active-step="dialogRef.data.step"
    :model="steps"
    class="w-full"
    readonly
  />
</template>

<style scoped>

</style>
