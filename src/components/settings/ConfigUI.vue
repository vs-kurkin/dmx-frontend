<script setup lang="ts" type="tsx">
import { type State, type Store, StoreKey } from '@/store'
import type { RippleEffect, ScaleValue } from '@/store/modules/settings'
import { DEFAULT_INPUT_STYLE, SCALE_MAX, SCALE_MIN } from '@/store/modules/settings'
import { PrimeIcons } from 'primevue/api'
import Button from 'primevue/button'
import ToggleButton from 'primevue/togglebutton'
import { type Ref, ref, watch } from 'vue'
import { useStore } from 'vuex'


const store: Store<State> = useStore<State>(StoreKey)

const scale: Ref<ScaleValue> = ref(store.state.settings.scale)
watch(scale, (scale: ScaleValue) => {
  store.dispatch('setScale', scale)
})

const inputStyle: Ref<boolean> = ref(store.state.settings.inputStyle === DEFAULT_INPUT_STYLE)
const changeInputStyle = (flag: boolean) => {
  store.dispatch('setInputStyle', flag ? 'outlined' : 'filled')
}

const ripple: Ref<RippleEffect> = ref(store.state.settings.rippleEffect)
const changeRippleEffect = (enabled: RippleEffect) => {
  store.dispatch('setRippleEffect', enabled)
}
</script>

<template>
  <h3>UI Options:</h3>

  <div class="overflow-y-auto max-h-20rem">
    <div class="p-inputgroup mb-1">
      <div class="p-inputgroup-addon text-color w-full justify-content-start">Scale:</div>
      <Button
        :icon=PrimeIcons.MINUS
        @click="scale--"
        :disabled="scale === SCALE_MIN"
        size="small"
        outlined
        class="border-noround-right border-round min-w-min w-2"
      />
      <div class="border-primary border-top-1 border-bottom-1 flex">
        <span class="text-color-secondary p-button-label p-2 m-auto">{{ scale }}</span>
      </div>
      <Button
        :icon=PrimeIcons.PLUS
        @click="scale++"
        :disabled="scale === SCALE_MAX"
        size="small"
        outlined
        class="min-w-min w-2"
      />
    </div>

    <div class="p-inputgroup mb-1">
      <div class="p-inputgroup-addon text-color w-full justify-content-start">Input style:</div>
      <ToggleButton
        v-model="inputStyle"
        on-label="Outlined"
        off-label="Filled"
        @update:model-value="changeInputStyle"
        class="p-button-sm border-round border-noround-left p-button-outlined min-w-min" />
    </div>

    <div class="p-inputgroup mb-1">
      <div class="p-inputgroup-addon text-color w-full justify-content-start">Ripple effect:</div>
      <ToggleButton
        v-model="ripple"
        on-label="On"
        off-label="Off"
        @update:model-value="changeRippleEffect"
        class="p-button-sm border-round border-noround-left p-button-outlined min-w-min" />
    </div>
  </div>
</template>
