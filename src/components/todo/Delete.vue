<template>
  <ui-modal title="Delete Todo" v-model:visible="todoModalVisible">
    <template #toggle>
      <slot name="toggle" />
    </template>

    <p>Confirm delete todo</p>

    <template #footer>
      <ui-button color="danger">Delete</ui-button>
      <ui-button v-on:click="hideTodoModal">Cancel</ui-button>
    </template>
  </ui-modal>
</template>

<script setup>
import { watch } from 'vue';
import { UiButton, UiModal } from '@/components/ui';
import { useTodoModal } from '@/compose/todo';

const props = defineProps({
  modelValue: Boolean,
  todo: Object,
});
const emit = defineEmits(['update:modelValue']);

const { todoModalVisible, showTodoModal, hideTodoModal } = useTodoModal(
  props.modelValue
);

watch(
  () => props.modelValue,
  () => {
    todoModalVisible.value = props.modelValue;
  }
);

watch(todoModalVisible, () =>
  emit('update:modelValue', todoModalVisible.value)
);
</script>
