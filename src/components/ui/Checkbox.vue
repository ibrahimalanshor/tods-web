<template>
  <div class="flex items-center space-x-2">
    <icon
      class="cursor-pointer"
      :class="checked ? 'text-primary-500' : 'text-gray-300 dark:text-gray-600'"
      size="20"
      v-on:click="handleClick"
    >
      <checked-icon v-if="checked" />
      <unchecked-icon v-else />
    </icon>
    <slot name="label" :checked="checked" :label="props.label">
      <span>{{ props.label }}</span>
    </slot>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Icon } from '@vicons/utils';
import {
  SquareOutline as UncheckedIcon,
  Checkbox as CheckedIcon,
} from '@vicons/ionicons5';

const props = defineProps({
  modelValue: Boolean,
  label: String,
  checked: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'check']);

const checked = ref(props.modelValue ?? props.checked);

const handleClick = () => {
  checked.value = !checked.value;

  emit('check', checked.value);
};

watch(checked, () => {
  emit('update:modelValue', checked.value);
});
</script>
