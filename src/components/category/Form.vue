<template>
  <form>
    <ui-form-item
      label="Name"
      type="text"
      id="name"
      placeholder="Name"
      v-model="body.name"
    />
  </form>
</template>

<script setup>
import { reactive } from 'vue';
import { UiFormItem } from '@/components/ui';

const props = defineProps({
  modelValue: Object,
});
const emit = defineEmits(['update:modelValue']);

const body = reactive({
  name: props.modelValue?.name ?? null,
});
</script>
