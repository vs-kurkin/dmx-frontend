<script lang="ts" setup type="tsx">
import { TYPES } from '@/utils/constants'
import { getChannelType } from '@/utils/helpers'
import type { Channel } from '@dmx-cloud/dmx-types'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import Select from 'primevue/select'

import { inject, type Ref, ref } from 'vue'

const channel = ref<Channel>({
  name: '',
  min: 0,
  max: 255,
  type: 'mode',
  value: 0,
  default: 0,
  amount: 0,
  steps: [],
})

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')

const createChannel = async () => {
  if (!dialogRef) {
    return
  }

  dialogRef.value.close(channel.value)
}

</script>

<template>
  <div class="flex gap-3 mt-4">
    <FloatLabel>
      <Select
        id="type"
        v-model="channel.type"
        :options="TYPES"
        class="w-5rem"
      >
        <template #value="{value}">
          <div class="flex align-items-center justify-content-start">
            <div :class="`pi pi-${getChannelType(value)} mr-2`" />
            <div>{{ channel.type }}</div>
          </div>
        </template>

        <template #option="{option}">
          <div :class="`pi pi-${getChannelType(option)} mr-1`" />
          {{ option }}
        </template>
      </Select>
      <label for="type">Type</label>
    </FloatLabel>

    <FloatLabel>
      <InputText
        id="name"
        v-model="channel.name"
        :invalid="!channel.name"
        autocomplete="off"
        autofocus
        type="text"
      />
      <label for="name">Name</label>
    </FloatLabel>

    <FloatLabel>
      <InputNumber
        id="default"
        v-model="channel.default"
        :invalid="channel.default == null"
        :max="channel.max"
        :min="channel.min"
        input-class="w-5rem"
      />
      <label for="default">Default</label>
    </FloatLabel>

    <FloatLabel>
      <InputNumber
        id="min"
        v-model="channel.min"
        :invalid="channel.min == null"
        :max="channel.max"
        :min="0"
        input-class="w-5rem"
      />
      <label for="min">Min</label>
    </FloatLabel>

    <FloatLabel>
      <InputNumber
        id="max"
        v-model="channel.max"
        :invalid="channel.max == null"
        :max="255"
        :min="channel.min"
        input-class="w-5rem"
      />
      <label for="max">Max</label>
    </FloatLabel>
  </div>

  <div class="flex justify-content-end gap-3 mt-5">
    <Button
      label="Save"
      severity="success"
      @click="createChannel"
    />

    <Button
      label="Cancel"
      severity="secondary"
      @click="() => dialogRef?.close()"
    />
  </div>
</template>
