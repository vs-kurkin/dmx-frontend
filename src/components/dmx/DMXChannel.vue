<script setup lang="ts" type="tsx">
import { State, Store, StoreKey } from '@/store'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import Slider from 'primevue/slider'
import { Ref, ref } from 'vue'
import { useStore } from 'vuex'

export interface Props {
  address: number
  amount?: number | void
  default?: number
  disabled?: boolean
  max?: number
  min?: number
  steps?: number[] | void
  title?: string | void
}

const emit = defineEmits<{
  update: [channel: number, value: number]
}>()

const props: Props = withDefaults<Props>(defineProps<Props>(), {
  amount: undefined,
  default: 0,
  disabled: false,
  max: 255,
  min: 0,
  steps: undefined,
  title: undefined,
})

const store: Store<State> = useStore<State>(StoreKey)

const channel: Ref<number[]> = ref(store.state.dmx.channel)

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
  width: 2.6rem;
  text-align: center;
}

.channel-number {
  margin-bottom: 1rem;
  width: 2.5rem;
  min-width: 2.5rem;
  height: 2rem;
  text-align: center;
  padding: 0;
  display: inline;
  box-shadow: none !important;
}

.channel-value {
  margin-top: 1.7rem;
}

:deep(.p-slider):hover {
  background-color: #9eade6c9;
}

:deep(.p-slider-vertical .p-slider-handle) {
  width: 2.7rem;
  height: 2rem;
  left: 0 !important;
  margin-left: -1.15rem !important;
  margin-bottom: -1.5rem !important;
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
