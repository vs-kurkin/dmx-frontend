<script setup lang="ts">
import { ref } from 'vue'
import InputNumber from 'primevue/inputnumber'
import Slider from 'primevue/slider'
import type { Channel } from "@/types/DMX";

const props = withDefaults(defineProps<Channel>(), {
  channel: 0,
  value: 0,
  min: 0,
  max: 255,
})

const value = ref(props.value)
</script>

<template>
  <div class="wrapper m-1 text-center">
    <div
      class="m-2"
      v-tooltip.top="{
        value: label ?? `Channel ${channel}`,
        showDelay: 500,
        hideDelay: 100,
      }"
    >
      {{ channel }}
    </div>

    <Slider v-model="value" :min="min" :max="max" orientation="vertical" class="h-15rem m-auto" />

    <InputNumber v-model="value" :min="min" :max="max" class="mt-3" inputClass="w-1 text-center" />
  </div>
</template>

<style scoped>
.wrapper {
  width: 57px;
}
</style>
