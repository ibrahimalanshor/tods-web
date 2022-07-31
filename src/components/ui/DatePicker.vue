<template>
  <datepicker
    class="block w-full border px-3 py-2 rounded hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-200"
    v-model="selected"
  />
</template>

<script setup>
import { ref, watch } from 'vue';
import Datepicker from 'vue3-datepicker';

const props = defineProps({
  modelValue: Date,
});
const emit = defineEmits(['update:modelValue']);

const selected = ref(props.modelValue);

watch(selected, () => {
  emit('update:modelValue', selected.value);
});
</script>
