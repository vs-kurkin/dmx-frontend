<script lang="ts" setup type="tsx">
import { getStore } from '@/store'
import { DEFAULT_INPUT, SCALE_MAX, SCALE_MIN, type SettingScale } from '@/store/modules/settings'
import { PrimeIcons } from '@primevue/core/api'
import { ref, watch } from 'vue'

const store = getStore()

const scale = ref(store.state.settings.scale)
const isOutlined = ref(store.state.settings.input === DEFAULT_INPUT)

watch(scale, (scale: SettingScale) => {
  store.dispatch('settings/scale', scale)
})

const changeInputStyle = (isOutlined: boolean) => {
  store.dispatch('settings/input', isOutlined ? 'outlined' : 'filled')
}
</script>

<template>
  <h3>UI Settings:</h3>

  <div class="overflow-y-auto max-h-20rem">
    <div class="p-inputgroup mb-1">
      <div class="p-inputgroup-addon text-color w-full justify-content-start">
        Scale:
      </div>
      <Button
        :disabled="scale === SCALE_MIN"
        :icon="PrimeIcons.MINUS"
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
        :icon="PrimeIcons.PLUS"
        class="min-w-min w-2"
        outlined
        size="small"
        @click="scale++"
      />
    </div>

    <div class="p-inputgroup mb-1">
      <div class="p-inputgroup-addon text-color w-full justify-content-start">
        Input style:
      </div>
      <ToggleButton
        v-model="isOutlined"
        class="p-button-sm border-round border-noround-left p-button-outlined min-w-min"
        off-label="Filled"
        on-label="Outlined"
        @update:model-value="changeInputStyle"
      />
    </div>
  </div>
</template>
