<template>
  <button
    type="button"
    class="border rounded hover:bg-gray-100 focus:ring-2 focus:outline-none flex items-center space-x-2 disabled:opacity-50"
    :class="[
      sizeClass,
      colorClass,
      props.block ? 'w-full text-center justify-center' : '',
    ]"
  >
    <slot name="icon" />
    <span
      ><slot>{{ props.title }}</slot></span
    >
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  size: String,
  color: String,
  block: {
    type: Boolean,
    default: false,
  },
});

const sizeClass = computed(() => {
  const sizes = {
    normal: 'px-4 py-2',
    sm: 'px-3 py-1.5 text-sm',
    xs: 'px-2 py-1 text-xs',
  };

  return sizes[props.size ?? 'normal'];
});

const colorClass = computed(() => {
  const colors = {
    normal: 'bg-white hover:bg-gray-100 focus:ring-primary-200',
    primary:
      'bg-primary-500 text-white border-primary-500 hover:bg-primary-600 focus:bg-primary-600 focus:ring-primary-200',
    danger:
      'bg-danger-500 text-white border-danger-500 hover:bg-danger-600 focus:bg-danger-600 focus:ring-danger-200',
  };

  return colors[props.color ?? 'normal'];
});
</script>
