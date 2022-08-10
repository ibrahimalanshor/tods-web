<template>
  <div
    class="border px-4 py-3 rounded flex items-center justify-between space-x-4"
    :class="[getColorClass]"
    v-if="props.visible"
  >
    <span>
      <slot>{{ props.text }}</slot>
    </span>
    <button class="flex" v-on:click="handleClose" v-if="props.closable">
      <close-icon />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Close as CloseIcon } from '@/components/icon';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  text: null,
  color: String,
  closable: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['close']);

const getColorClass = computed(() => {
  const colors = {
    primary: 'bg-primary-100 text-primary-800 border-primary-200',
    success: 'bg-success-100 text-success-800 border-success-200',
    danger: 'bg-danger-100 text-danger-800 border-danger-200',
  };

  return colors[props.color ?? 'primary'];
});

const handleClose = () => emit('close', false);
</script>
