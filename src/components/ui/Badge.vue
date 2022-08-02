<template>
  <span
    class="border px-2 py-0.5 text-sm rounded inline-block"
    :class="[getColorClass]"
  >
    <slot>{{ props.label }}</slot>
  </span>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  label: String,
  color: String,
});

const getColorClass = computed(() => {
  const colors = {
    primary: 'bg-primary-100 text-primary-800 border-primary-200',
    success: 'bg-success-100 text-success-800 border-success-200',
    danger: 'bg-danger-100 text-danger-800 border-danger-200',
  };

  return colors[props.color ?? 'primary'];
});
</script>
