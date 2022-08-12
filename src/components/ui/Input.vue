<template>
  <input
    type="text"
    class="block w-full border px-3 py-2 rounded hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600"
    :class="[sizeClass, statusClass]"
    v-model="value"
    v-on:input="handleChange"
  />
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  modelValue: String,
  size: String,
  status: String,
});
const emit = defineEmits(['update:modelValue', 'change']);

const value = ref(props.modelValue);

const sizeClass = computed(() => {
  const sizes = {
    normal: 'px-3 py-2',
    sm: 'px-2 py-1.5 text-sm',
  };

  return sizes[props.size ?? 'normal'];
});

const statusClass = computed(() => {
  const statuses = {
    normal: '',
    error:
      'border-danger-500 hover:border-danger-400 focus:ring-danger-200 dark:border-danger-500 dark:hover:border-danger-600',
  };

  return statuses[props.status ?? 'normal'];
});

const handleChange = (e) => {
  emit('update:modelValue', e.target.value);
  emit('change', e.target.value);
};

watch(
  () => props.modelValue,
  () => (value.value = props.modelValue)
);
</script>
