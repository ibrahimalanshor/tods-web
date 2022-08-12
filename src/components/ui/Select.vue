<template>
  <select
    class="block bg-white w-full border px-3 py-2 rounded hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-200 appearance-none dark:bg-gray-800 dark:border-gray-700"
    v-model="value"
    v-on:change="handleChange"
  >
    <option
      v-for="(option, key) in props.options"
      :key="key"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: null,
  options: Array,
});
const emit = defineEmits(['update:modelValue', 'change']);

const value = ref(props.modelValue);

const handleChange = (e) => {
  emit('update:modelValue', e.target.value);
  emit('change', e.target.value);
};

watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue;
  }
);
</script>
