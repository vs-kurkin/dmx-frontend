<script lang="ts" setup type="tsx">
import { type Store, StoreKey } from '@/store'
import { PrimeIcons } from 'primevue/api'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import Slider from 'primevue/slider'
import { type Ref, ref } from 'vue'
import { useStore } from 'vuex'

export interface Props {
  address: number;
  amount?: number | void;
  default?: number;
  disabled?: boolean;
  max?: number;
  min?: number;
  steps?: number[] | void;
  title?: string | void;
}

const emit = defineEmits<{
  update: [channel: number, value: number];
}>()

const props: Props = withDefaults(defineProps<Props>(), {
  default: 0,
  disabled: false,
  max: 255,
  min: 0,
})

const store: Store = useStore(StoreKey)

const channel: Ref<number[]> = ref(store.state.dmx.channel)
const current: Ref<number> = ref(channel.value[props.address])

store.socket?.onSocket('dmx', (data) => {
  console.log(data)
})

/*watch(store.state.dmx.channel, (state: SettingsState) => {

})*/

const updateChannel = async (value: number) => {
  if (current.value === value) {
    return
  }

  current.value = value

  await store.dispatch('updateChannel', {
    id: store.state.serial.current,
    channel: props.address,
    value,
  })

  emit('update', props.address, value)
}

const resetChannel = () => updateChannel(0)

const list = [
  '',
  'strobe',
  'rotate',
  'color',
  'display',
  'laser',
  'lamp',
  'head',
  'mode',
]

const TYPE = {
  strobe: PrimeIcons.BOLT,
  rotate: PrimeIcons.REFRESH,
  color: PrimeIcons.PALETTE,
  display: PrimeIcons.DESKTOP,
  laser: PrimeIcons.SHARE_ALT,
  lamp: PrimeIcons.SUN,
  head: PrimeIcons.EYE,
  mode: PrimeIcons.LIST,
}
</script>

<template>
  <div class="channel-wrapper m-1">
    <Button
      :icon="TYPE[list[address] || 0]"
      class="border-1 mb-2"
      outlined
      size="small"
      title="Strobe"
    />
    <Button
      v-tooltip.top="{
        value: title ?? `Reset channel ${address}`,
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
      v-model="channel[props.address]"
      :disabled="disabled"
      :max="max"
      :min="min"
      class="h-20rem m-auto w-2 channel-slider"
      orientation="vertical"
      @update:model-value="updateChannel"
    />

    <InputNumber
      v-model="channel[props.address]"
      :disabled="disabled"
      :input-id="String(props.address)"
      :max="max"
      :min="min"
      class="channel-value"
      input-class="w-1 text-center"
      @update:model-value="updateChannel"
    />
  </div>
</template>

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
