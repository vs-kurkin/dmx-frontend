<script lang="ts" setup>
import { TYPES } from '@/utils/constants'
import { getChannelType } from '@/utils/helpers'
import type { Channel, ChannelList } from '@dmx-cloud/dmx-types'
import Select from 'primevue/select'
import { onMounted, ref } from 'vue'

const emit = defineEmits<{
  'update': []
}>()

const channels = defineModel<ChannelList>({
  required: true,
  default: () => [],
})

const editing = ref<unknown[]>([])

const deleteChannel = async ({ index }: { index: number}) => {
  channels.value.splice(index, 1)
  editing.value = []

  emit('update')
}

const saveChannel = async ({ index, newData }: { index: number, newData: Channel}) => {
  channels.value[index] = newData
  editing.value = []

  emit('update')
}


onMounted(() => {
  console.log(channels.value)
  editing.value = []
})
</script>

<template>
  <DataTable
    v-model="channels"
    v-model:editing-rows="editing"
    :value="channels"
    class="mt-4 flex-grow-1 line-height-2"
    edit-mode="row"
    row-hover
    scrollable
    size="small"
    striped-rows
    @row-edit-init="editing = [editing.pop()]"
    @rew-edit-cancel="editing = []"
    @row-edit-save="saveChannel"
  >
    <template #empty>
      <div class="text-center">
        <div class="pi pi-exclamation-circle" />
        There are no channels for the device, first you need:
      </div>
    </template>

    <Column
      class="w-1rem h-2rem m-0 p-1 line-height-2 vertical-align-middle"
      expander
      header=""
    />

    <Column
      body-class="h-2rem m-0 p-1 align-items-center align-content-center line-height-2 vertical-align-middle"
      class="w-1rem"
      field="type"
      header=""
    >
      <template #editor="{data}">
        <Select
          v-model="data.type"
          :options="TYPES"
          class="w-5rem"
          input-class="w-3rem line-height-2 h-2rem vertical-align-middle"
        >
          <template #value="{value}">
            <div :class="`pi pi-${getChannelType(value)} w-full`" />
          </template>

          <template #option="{option}">
            <div :class="`pi pi-${getChannelType(option)} mr-1`" />
            {{ option }}
          </template>
        </Select>
      </template>
      <template #body="{data}">
        <div :class="`pi pi-${getChannelType(data?.type)} ml-3 vertical-align-middle line-height-2`" />
      </template>
    </Column>

    <Column
      body-class="m-0 p-0 align-items-center line-height-2 vertical-align-middle"
      field="name"
      header="Name"
    >
      <template #editor="{data}">
        <InputText
          v-model="data.name"
          :invalid="!data.name"
          class="h-min p-1 pl-2 pr-2 ml-1 vertical-align-top"
        />
      </template>
      <template #body="{data}">
        <div class="ml-3">
          {{ data.name }}
        </div>
      </template>
    </Column>

    <Column
      body-class="w-4rem text-center m-0 p-1 line-height-2 vertical-align-middle"
      field="default"
      header="Default"
    >
      <template #editor="{data}">
        <InputNumber
          v-model="data.default"
          :invalid="data.default == null"
          :max="data.max"
          :min="data.min"
          input-class="w-3rem h-max p-1 text-center"
        />
      </template>
      <template #body="{data}">
        {{ data.default }}
      </template>
    </Column>

    <Column
      body-class="w-4rem text-center m-0 p-1 line-height-2 vertical-align-middle"
      field="min"
      header="Min"
    >
      <template #editor="{data}">
        <InputNumber
          v-model="data.min"
          :invalid="data.min == null"
          :max="data.max"
          input-class="w-3rem h-max p-1 text-center"
        />
      </template>
      <template #body="{data}">
        {{ data.min }}
      </template>
    </Column>

    <Column
      body-class="w-4rem text-center m-0 p-1 line-height-2 vertical-align-middle"
      field="max"
      header="Max"
    >
      <template #editor="{data}">
        <InputNumber
          v-model="data.max"
          :invalid="data.max == null"
          :min="data.min"
          input-class="w-3rem h-max p-1 text-center"
        />
      </template>
      <template #body="{data}">
        {{ data.max }}
      </template>
    </Column>

    <Column
      :row-editor="true"
      body-class="w-6rem line-height-2 text-left m-0 p-1 vertical-align-middle"
    />

    <Column
      body-class="w-3rem line-height-2 text-left m-0 p-1 vertical-align-middle"
      header=""
    >
      <template #editor="item">
        <Button
          class="w-2rem h-2rem active:border-0"
          icon="pi pi-trash"
          rounded
          severity="danger"
          size="small"
          text
          @click="() => deleteChannel(item)"
        />
      </template>
      <template #body />
    </column>

    <template #expansion="{data}">
      <DataTable
        :value="data.steps"
        striped-rows
      />
    </template>
  </DataTable>
</template>

<style scoped>

</style>
