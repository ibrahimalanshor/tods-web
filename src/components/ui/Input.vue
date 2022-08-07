<template>
  <input
    type="text"
    class="block w-full border px-3 py-2 rounded hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-200"
    :class="[sizeClass, statusClass]"
    v-model="value"
  />
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  modelValue: String,
  size: String,
  status: String,
});
const emit = defineEmits(['update:modelValue']);

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
    error: 'border-danger-500 hover:border-danger-400 focus:ring-danger-200',
  };

  return statuses[props.status ?? 'normal'];
});

watch(value, () => {
  emit('update:modelValue', value.value);
});
</script>
