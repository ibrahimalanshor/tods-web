<template>
  <textarea
    class="block w-full border px-3 py-2 rounded hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600"
    v-model="value"
    v-on:input="handleChange"
  />
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(['update:modelValue'], 'change');

const value = ref(props.modelValue);

const handleChange = (e) => {
  emit('update:modelValue', e.target.value);
  emit('change', e.target.value);
};

watch(value, () => {
  emit('update:modelValue', value.value);
});
</script>
