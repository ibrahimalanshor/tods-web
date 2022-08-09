<template>
  <ui-modal title="Edit Todo" v-model:visible="todoModalVisible">
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

    <todo-form
      :errors="formError"
      v-model="todoBody"
      v-on:submit="handleFormSubmit"
    />

    <template #footer>
      <ui-button
        color="primary"
        v-on:click="handleFormSubmit"
        :disabled="loading.get('update-todo')"
        >Save</ui-button
      >
      <ui-button v-on:click="hideTodoModal">Cancel</ui-button>
    </template>
  </ui-modal>
</template>

<script setup>
import { watch, inject, computed } from 'vue';
import { UiButton, UiModal, UiAlert } from '@/components/ui';
import { TodoForm } from '@/components/todo';
import { useTodoModal, useTodoForm, useTodoUpdate } from '@/compose/todo';
import { useAlert } from '@/compose/ui';
import { useError, useLoading } from '@/store';
import { HandledError } from '@/utils';

const props = defineProps({
  modelValue: Boolean,
  todo: Object,
});
const emit = defineEmits(['update:modelValue']);

const emitter = inject('emitter');
const error = useError();
const loading = useLoading();

const { todoModalVisible, showTodoModal, hideTodoModal } = useTodoModal(
  props.modelValue
);
const { todoBody, setTodoBody } = useTodoForm(props.todo);
const { updateTodo } = useTodoUpdate();
const { alert, showAlert, hideAlert } = useAlert();

const formError = computed(() => error.get('update-todo')?.errors ?? {});

const handleFormSubmit = async () => {
  try {
    await updateTodo(props.todo.id, todoBody.value);

    emitter.emit('refresh-todo', { msg: 'Todo Updated' });

    hideTodoModal();
  } catch (err) {
    if (!(err instanceof HandledError)) {
      showAlert('something error');
    }
  }
};
const handleAlertClose = () => hideAlert();

watch(
  () => props.modelValue,
  () => {
    todoModalVisible.value = props.modelValue;
  }
);

watch(todoModalVisible, () => {
  error.reset('update-todo');
  loading.stop('update-todo');

  setTodoBody({
    name: props.todo.name,
    description: props.todo.description,
    due: props.todo.due ? new Date(props.todo.due) : null,
    categoryId: props.todo.category?.name,
  });

  emit('update:modelValue', todoModalVisible.value);
  hideAlert();
});
</script>
