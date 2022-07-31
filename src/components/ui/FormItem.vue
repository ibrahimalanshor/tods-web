<template>
  <div class="mb-3">
    <label :for="$attrs.id" class="block mb-2">{{ props.label }}</label>
    <slot>
      <ui-input
        :type="$attrs.type"
        :id="$attrs.id"
        :placeholder="$attrs.placeholder"
        v-model="value"
      />
    </slot>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import UiInput from './Input.vue';

const props = defineProps({
  modelValue: String,
  label: String,
});
const emit = defineEmits(['update:modelValue']);

const value = ref(props.modelValue);

watch(value, () => {
  emit('update:modelValue', value.value);
});
</script>
