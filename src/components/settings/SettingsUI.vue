<script lang="ts" setup type="tsx">
import { type Store, StoreKey } from '@/store'
import type { ScaleValue } from '@/store/modules/settings.ts'
import { DEFAULT_INPUT_STYLE, SCALE_MAX, SCALE_MIN } from '@/store/modules/settings.ts'
import { PrimeIcons } from 'primevue/api'
import Button from 'primevue/button'
import ToggleButton from 'primevue/togglebutton'
import { type Ref, ref, watch } from 'vue'
import { useStore } from 'vuex'

const store: Store = useStore(StoreKey)

const scale: Ref<ScaleValue> = ref(store.state.settings.scale)
watch(scale, (scale: ScaleValue) => {
  store.dispatch('setScale', scale)
})

const inputStyle: Ref<boolean> = ref(store.state.settings.inputStyle === DEFAULT_INPUT_STYLE)
const changeInputStyle = (flag: boolean) => {
  store.dispatch('setInputStyle', flag ? 'outlined' : 'filled')
}
</script>

<template>
  <h3>UI Settings:</h3>

  <div class="overflow-y-auto max-h-20rem">
    <div class="p-inputgroup mb-1">
      <div class="p-inputgroup-addon text-color w-full justify-content-start">Scale:</div>
      <Button
        :disabled="scale === SCALE_MIN"
        :icon=PrimeIcons.MINUS
        class="border-noround-right border-round min-w-min w-2"
        outlined
        size="small"
        @click="scale--"
      />
      <div class="border-primary border-top-1 border-bottom-1 flex">
        <span class="text-color-secondary p-button-label p-2 m-auto">{{ scale }}</span>
      </div>
      <Button
        :disabled="scale === SCALE_MAX"
        :icon=PrimeIcons.PLUS
        class="min-w-min w-2"
        outlined
        size="small"
        @click="scale++"
      />
    </div>

    <div class="p-inputgroup mb-1">
      <div class="p-inputgroup-addon text-color w-full justify-content-start">Input style:</div>
      <ToggleButton
        v-model="inputStyle"
        class="p-button-sm border-round border-noround-left p-button-outlined min-w-min"
        off-label="Filled"
        on-label="Outlined"
        @update:model-value="changeInputStyle" />
    </div>
  </div>
</template>
