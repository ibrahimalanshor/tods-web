<template>
  <div class="mb-3">
    <label :for="$attrs.id" class="block mb-2">{{ props.label }}</label>
    <slot>
      <ui-input
        :type="$attrs.type"
        :id="$attrs.id"
        :placeholder="$attrs.placeholder"
        :status="props.status"
        v-model="value"
      />
    </slot>
    <span
      class="text-sm block mt-1 text-gray-500"
      :class="[getFeedbackStatusClass]"
      v-if="props.feedback"
      >{{ props.feedback }}</span
    >
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import UiInput from './Input.vue';

const props = defineProps({
  modelValue: String,
  label: String,
  status: String,
  feedback: String,
});
const emit = defineEmits(['update:modelValue']);

const value = ref(props.modelValue);

const getFeedbackStatusClass = computed(() => {
  const statuses = {
    normal: '',
    error: 'text-danger-500',
  };

  return statuses[props.status ?? 'normal'];
});

watch(value, () => {
  emit('update:modelValue', value.value);
});
</script>
