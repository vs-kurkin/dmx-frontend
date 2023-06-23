<script setup lang="ts" type="tsx">
import Steps from 'primevue/steps'

const steps = [{
  label: 'Select device',
}, {
  label: 'Select driver',
}]
</script>

<template>
  <Steps
    :model="steps"
    readonly
    class="w-full"
  />
</template>
