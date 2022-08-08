<template>
  <form v-on:submit.prevent="handleFormSubmit">
    <ui-form-item
      label="Name"
      type="text"
      id="name"
      placeholder="Name"
      v-model="body.name"
      :status="errors.name ? 'error' : ''"
      :feedback="errors.name?.msg"
    />
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { UiFormItem } from '@/components/ui';

const props = defineProps({
  modelValue: Object,
  errors: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(['update:modelValue', 'submit']);

const body = reactive({
  name: props.modelValue?.name ?? null,
});

const handleFormSubmit = () => {
  emit('submit', body);
};

watch(
  body,
  () => {
    emit('update:modelValue', body);
  },
  { deep: true }
);
</script>
