<template>
  <ui-modal title="Edit Todo" v-model:visible="todoModalVisible">
    <template #toggle>
      <slot name="toggle" />
    </template>

    <todo-form v-model="todoBody" />

    <template #footer>
      <ui-button color="primary">Save</ui-button>
      <ui-button v-on:click="hideTodoModal">Cancel</ui-button>
    </template>
  </ui-modal>
</template>

<script setup>
import { watch } from 'vue';
import { UiButton, UiModal } from '@/components/ui';
import { TodoForm } from '@/components/todo';
import { useTodoModal, useTodoForm } from '@/compose/todo';

const props = defineProps({
  modelValue: Boolean,
  todo: Object,
});
const emit = defineEmits(['update:modelValue']);

const { todoModalVisible, showTodoModal, hideTodoModal } = useTodoModal(
  props.modelValue
);
const { todoBody, setTodoBody } = useTodoForm(props.todo);

watch(
  () => props.modelValue,
  () => {
    todoModalVisible.value = props.modelValue;
  }
);

watch(
  () => props.todo,
  () => {
    setTodoBody({
      ...props.todo,
      category: props.todo.category?.name,
    });
  }
);

watch(todoModalVisible, () =>
  emit('update:modelValue', todoModalVisible.value)
);
</script>
