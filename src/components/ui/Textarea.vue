<template>
  <textarea
    class="block w-full border px-3 py-2 rounded hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600"
    v-model="value"
  />
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(['update:modelValue']);

const value = ref(props.modelValue);

watch(value, () => {
  emit('update:modelValue', value.value);
});
</script>
