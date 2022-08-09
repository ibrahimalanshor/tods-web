<template>
  <div class="fixed top-5 left-0 w-full flex z-30" v-if="props.modelValue">
    <div
      class="mx-auto border px-4 py-3 rounded cursor-pointer"
      :class="[getColorClass]"
      v-on:click="handleClose"
    >
      <span>
        <slot>{{ props.text }}</slot>
      </span>
    </div>
  </div>
</template>

<script setup>
import { watch, computed } from 'vue';
import { Close as CloseIcon } from '@/components/icon';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  text: String,
  color: String,
});
const emit = defineEmits(['update:modelValue']);

const getColorClass = computed(() => {
  const colors = {
    primary: 'bg-primary-100 text-primary-800 border-primary-200',
    success: 'bg-success-100 text-success-800 border-success-200',
    danger: 'bg-danger-100 text-danger-800 border-danger-200',
  };

  return colors[props.color ?? 'primary'];
});

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      setTimeout(() => handleClose(), 2000);
    }
  }
);

const handleClose = () => emit('update:modelValue', false);
</script>
