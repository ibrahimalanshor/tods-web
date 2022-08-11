<template>
  <datepicker
    class="block w-full border px-3 py-2 rounded hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600"
    :class="[statusClass]"
    v-model="selected"
  />
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import Datepicker from 'vue3-datepicker';

const props = defineProps({
  modelValue: Date,
  status: String,
});
const emit = defineEmits(['update:modelValue']);

const selected = ref(props.modelValue);

const statusClass = computed(() => {
  const statuses = {
    normal: '',
    error: 'border-danger-500 hover:border-danger-400 focus:ring-danger-200',
  };

  return statuses[props.status ?? 'normal'];
});

watch(
  () => props.modelValue,
  () => {
    selected.value = props.modelValue;
  }
);

watch(selected, () => {
  emit('update:modelValue', selected.value);
});
</script>
