<script lang="ts" setup type="tsx">
import { getStore } from '@/store'
import { TYPE, TYPES } from '@/utils/constants'
import Slider from 'primevue/slider'
import { ref } from 'vue'

export interface Props {
  address: number;
  disabled?: boolean;
}

const emit = defineEmits<{
  update: [channel: number, value: number];
}>()

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const store = getStore()

const channel = ref(store.state.dmx.channel)

const updateChannel = async (value: number) => {
  if (channel.value[props.address] === value) {
    return
  }

  await store.dispatch('dmx/update', {
    id: store.state.serial.current,
    channel: props.address,
    value,
  })

  emit('update', props.address, value)
}

const resetChannel = () => updateChannel(0)
</script>

<template>
  <div class="channel-wrapper m-1">
    <Button
      :icon="TYPE[TYPES[address]]"
      class="border-1 mb-2"
      outlined
      size="small"
      title=""
    />

    <Button
      v-tooltip.top="{
        value: `Reset channel ${address}`,
        showDelay: 500,
        hideDelay: 100,
      }"
      :disabled="disabled || channel[props.address] === 0"
      class="channel-number"
      outlined
      text
      @click="resetChannel"
    >
      {{ address }}
    </Button>

    <Slider
      key=""
      v-model="channel[props.address]"
      :disabled="disabled"
      :max="255"
      :min="0"
      class="h-20rem m-auto w-2 channel-slider"
      orientation="vertical"
      @update:model-value="updateChannel"
    />

    <InputNumber
      v-model="channel[props.address]"
      :disabled="disabled"
      :input-id="String(props.address)"
      :max="255"
      :min="0"
      class="channel-value"
      input-class="w-1 text-center"
      @update:model-value="updateChannel"
    />
  </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
.channel-wrapper {
  text-align: center;
  width: 2.6rem;
}

.channel-number {
  box-shadow: none !important;
  display: inline;
  height: 2rem;
  margin-bottom: 1rem;
  min-width: 2.5rem;
  padding: 0;
  text-align: center;
  width: 2.5rem;
}

.channel-value {
  margin-top: 1.7rem;
}

:deep(.p-slider):hover {
  background-color: #9eade6c9;
}

:deep(.p-slider-vertical .p-slider-handle) {
  border-radius: 0.4em;
  border-width: 1px;
  height: 2rem;
  left: 0 !important;
  margin-bottom: -1.5rem !important;
  margin-left: -1.15rem !important;
  width: 2.7rem;
}

:deep(.p-inputtext) {
  padding: 2px;
}

:deep(.p-inputtext):hover {
  border-color: rgba(158, 173, 230, 0.79);
}
</style>
