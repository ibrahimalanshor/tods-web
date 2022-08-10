<template>
  <select
    class="block bg-white w-full border px-3 py-2 rounded hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-200 appearance-none"
    v-model="value"
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
const emit = defineEmits(['update:modelValue']);

const value = ref(props.modelValue);

watch(value, () => {
  emit('update:modelValue', value.value);
});

watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue;
  }
);
</script>
