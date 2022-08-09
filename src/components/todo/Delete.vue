<template>
  <ui-modal title="Delete Todo" v-model:visible="todoModalVisible">
    <template #toggle>
      <slot name="toggle" />
    </template>

    <ui-alert
      class="mb-4"
      :color="alert.color"
      :text="alert.message"
      :visible="alert.visible"
      v-on:close="handleAlertClose"
    />

    <p>Confirm delete todo</p>

    <template #footer>
      <ui-button
        color="danger"
        v-on:click="handleDeleteTodo"
        :disabled="loading.get('delete-todo')"
        >Delete</ui-button
      >
      <ui-button v-on:click="hideTodoModal">Cancel</ui-button>
    </template>
  </ui-modal>
</template>

<script setup>
import { watch, inject } from 'vue';
import { UiButton, UiModal, UiAlert } from '@/components/ui';
import { useTodoModal, useTodoDelete } from '@/compose/todo';
import { HandledError } from '@/utils';
import { useLoading } from '@/store';
import { useAlert } from '@/compose/ui';

const props = defineProps({
  modelValue: Boolean,
  todo: Object,
});
const emit = defineEmits(['update:modelValue']);

const emitter = inject('emitter');
const loading = useLoading();

const { todoModalVisible, showTodoModal, hideTodoModal } = useTodoModal(
  props.modelValue
);
const { deleteTodo } = useTodoDelete();
const { alert, showAlert, hideAlert } = useAlert();

const handleDeleteTodo = async () => {
  try {
    await deleteTodo(props.todo.id);

    emitter.emit('refresh-todo', { msg: 'Todo Deleted' });

    hideTodoModal();
  } catch (err) {
    if (!(err instanceof HandledError)) {
      showAlert('something error');
    }
  }
};

const handleAlertClose = () => {
  hideAlert();
};

watch(
  () => props.modelValue,
  () => {
    todoModalVisible.value = props.modelValue;
  }
);

watch(todoModalVisible, () => {
  hideAlert();
  emit('update:modelValue', todoModalVisible.value);
});
</script>
