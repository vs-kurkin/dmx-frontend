<script setup lang="ts" type="tsx">
import { StoreKey } from '@/store'
import type { State, Store } from '@/store/types'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import Slider from 'primevue/slider'
import { ref } from 'vue'
import { useStore } from 'vuex'

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

const store: Store<State> = useStore<State>(StoreKey)

const channel = ref(store.state.dmx.channel)

let currentValue: number = store.state.dmx.channel[props.address]

const updateChannel = async (value: number) => {
  if (currentValue === value) {
    return
  }
  await store.dispatch('updateChannel', {
    name: store.state.universe.current,
    channel: props.address,
    value,
  })

  emit('update', props.address, value)

  currentValue = value
}

const resetChannel = () => updateChannel(0)
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
      :disabled="disabled || channel[props.address] === 0"
      class="channel-number"
      @click="resetChannel"
    >
      {{ address }}
    </Button>

    <Slider
      v-model="channel[props.address]"
      :min="min"
      :max="max"
      :disabled="disabled"
      orientation="vertical"
      class="h-20rem m-auto w-2 channel-slider"
      @update:model-value="updateChannel"
    />

    <InputNumber
      v-model="channel[props.address]"
      :min="min"
      :max="max"
      :disabled="disabled"
      class="channel-value"
      input-class="w-1 text-center"
      @update:model-value="updateChannel"
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
  margin-left: -18px !important;
  margin-bottom: -24px !important;
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
