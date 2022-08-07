<template>
  <div class="fixed top-5 left-0 w-full flex" v-if="props.modelValue">
    <div
      class="mx-auto min-w-[200px] border bg-danger-100 text-danger-800 border-danger-200 px-4 py-3 rounded flex items-center justify-between space-x-4"
    >
      <span>
        <slot>{{ props.text }}</slot>
      </span>
      <button class="flex" v-on:click="handleClose">
        <close-icon />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Close as CloseIcon } from '@/components/icon';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  text: String,
});
const emit = defineEmits(['update:modelValue']);

const handleClose = () => emit('update:modelValue', false);
</script>
