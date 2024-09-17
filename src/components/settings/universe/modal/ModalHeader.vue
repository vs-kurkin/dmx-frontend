<script lang="ts" setup type="tsx">
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { inject, type Ref } from 'vue'

const dialogRef = inject('dialogRef') as Ref<DynamicDialogInstance>

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
  <Stepper
    v-model:active-step="dialogRef.data.step"
    :model="steps"
    class="w-full"
    readonly
  />
</template>

<style scoped>

</style>
