<template>
  <div>
    <div
      class="flex items-center justify-between"
      :class="isCollapse ? 'mb-2' : ''"
      v-on:click="handleClick"
    >
      <slot name="label">
        <span>{{ props.label }}</span>
      </slot>
      <button class="flex">
        <chevron-down :class="isCollapse ? 'rotate-180' : ''" />
      </button>
    </div>

    <slot v-if="isCollapse" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { ChevronDown } from '@/components/icon';

const props = defineProps({
  label: String,
  visible: {
    type: Boolean,
    default: false,
  },
});

const isCollapse = ref(props.visible);

const handleClick = () => {
  isCollapse.value = !isCollapse.value;
};

watch(
  () => props.visible,
  () => {
    isCollapse.value = props.visible;
  }
);
</script>
