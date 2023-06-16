<script setup lang="ts" type="tsx">
import type { Store } from '@/store/types'
import { ref } from 'vue'
import { useStore } from 'vuex'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Slider from 'primevue/slider'
import { StoreKey } from '@/store'

export interface Props {
  address: number
  title?: string
  default?: number
  max?: number
  min?: number
  amount?: number
  steps?: number[]
  disabled?: boolean
}

const emit = defineEmits<{
  update: [channel: number, value: number]
}>()

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  min: 0,
  max: 255,
  default: 0,
  disabled: false,
})

const store: Store = useStore(StoreKey)

const value = ref(store.state.dmx.channel[props.address])

const onChange = async (value: number) => {
  await store.dispatch('dmx/update', {
    channel: props.address,
    value,
  })

  emit('update', props.address, value)
}

const onReset = async () => {
  await onChange(0)

  value.value = 0
}
</script>

<template>
  <div class="channel-wrapper m-1">
    <Button
      v-tooltip.top="{
        value: title ?? `Reset channel ${address}`,
        showDelay: 500,
        hideDelay: 100,
      }"
      text
      outlined
      :disabled="disabled || value === 0"
      class="channel-number"
      @click="onReset"
    >
      {{ address }}
    </Button>

    <Slider
      v-model="value"
      :min="min"
      :max="max"
      :disabled="disabled"
      orientation="vertical"
      class="h-20rem m-auto w-2 channel-slider"
      @change="onChange"
    />

    <InputNumber
      v-model="value"
      :min="min"
      :max="max"
      :disabled="disabled"
      class="channel-value"
      input-class="w-1 text-center"
    />
  </div>
</template>

<style scoped>
.channel-wrapper {
  width: 45px;
  text-align: center;
}

.channel-number {
  margin-bottom: 14px;
  width: 2.5rem;
  height: 2rem;
  text-align: center;
  padding: 0;
  display: inline;
}

.channel-value {
  margin-top: 28px;
}

:deep(.p-slider):hover {
  background-color: #9eade6c9;
}

:deep(.p-slider-vertical .p-slider-handle) {
  width: 2.7rem;
  height: 2rem;
  left: 0 !important;
  margin-left: -18px;
  margin-bottom: -24px;
  border-radius: 0.4em;
  border-width: 1px;
}

:deep(.p-inputtext) {
  padding: 2px;
}

:deep(.p-inputtext):hover {
  border-color: rgba(158, 173, 230, 0.79);
}
</style>
