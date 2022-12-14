<template>
  <ui-modal title="New Todo" v-model:visible="todoModalVisible">
    <template #toggle>
      <ui-button title="New Todo" size="sm" color="primary" />
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
        :disabled="loading.get('create-todo')"
        >Save</ui-button
      >
      <ui-button v-on:click="hideTodoModal">Cancel</ui-button>
    </template>
  </ui-modal>
</template>

<script setup>
import { computed, inject, watch } from 'vue';
import { UiButton, UiModal, UiAlert } from '@/components/ui';
import { TodoForm } from '@/components/todo';
import { useTodoModal, useTodoForm, useTodoCreate } from '@/compose/todo';
import { useAlert } from '@/compose/ui';
import { useError, useLoading } from '@/store';
import { HandledError } from '@/utils';

const emitter = inject('emitter');
const error = useError();
const loading = useLoading();

const { alert, showAlert, hideAlert } = useAlert();
const { todoModalVisible, showTodoModal, hideTodoModal } = useTodoModal();
const { todoBody, setTodoBody, resetTodoBody } = useTodoForm();
const { createTodo } = useTodoCreate();

const formError = computed(() => error.get('create-todo')?.errors ?? {});

const handleFormSubmit = async () => {
  try {
    await createTodo(todoBody.value);

    emitter.emit('refresh-todo', { msg: 'Todo Created' });

    hideTodoModal();
  } catch (err) {
    if (!(err instanceof HandledError)) {
      showAlert('something error');
    }
  }
};
const handleAlertClose = () => hideAlert();

watch(todoModalVisible, () => {
  error.reset('create-todo');
  loading.stop('create-todo');

  hideAlert();
  resetTodoBody();
});
</script>
