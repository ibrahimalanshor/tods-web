<template>
  <ui-modal
    header-class="border-b-0 pb-2"
    content-class="pt-0"
    :footer="false"
    v-model:visible="todoModalVisible"
  >
    <template #toggle>
      <slot name="toggle" />
    </template>

    <template #title>
      <h2 class="text-xl font-bold">{{ todo?.name ?? 'Detail Todo' }}</h2>
    </template>

    <ui-skeleton v-if="loading.get('view-todo')" />
    <template v-else>
      <ui-alert
        class="mb-2 mt-1"
        :color="alert.color"
        :text="alert.message"
        :visible="alert.visible"
        :closable="false"
      />
      <div v-if="!alert.visible">
        <p class="leading-loose mb-2">
          {{ todo.description ?? 'No Description' }}
        </p>

        <hr class="my-3 dark:border-gray-700" />
        <todo-detail-sub-todo
          :sub-todos="todo.children"
          :form-errors="createSubTodoErrors"
          v-on:submit-sub-todo="handleSubmitSubTodo"
          v-on:check-sub-todo="handleCheckSubTodo"
          v-on:delete-sub-todo="handleDeleteSubTodo"
        />
        <hr class="my-3 dark:border-gray-700" />

        <div class="flex flex-wrap">
          <div class="w-full mb-2">
            <span class="block font-bold mb-1">Category</span>
            <span>{{ todo.category?.name ?? 'No Category' }}</span>
          </div>
          <div class="w-1/2 mb-2">
            <span class="block font-bold mb-1">Created At</span>
            <span>{{ date.format(todo.createdAt) }}</span>
          </div>
          <div class="w-1/2 mb-2">
            <span class="block font-bold mb-1">Due Date</span>
            <span>{{ todo.due ? date.format(todo.due) : '-' }}</span>
          </div>
          <div class="w-1/2">
            <span class="block font-bold mb-1">Status</span>
            <ui-badge :color="getStatusColor" :label="getStatusLabel" />
          </div>
          <div class="w-1/2">
            <span class="block font-bold mb-1">Done At</span>
            <span>{{ todo.doneAt ? date.format(todo.doneAt) : '-' }}</span>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <ui-button color="danger">Detail</ui-button>
      <ui-button v-on:click="hideTodoModal">Cancel</ui-button>
    </template>
  </ui-modal>
</template>

<script setup>
import { watch, computed } from 'vue';
import dayjs from 'dayjs';
import {
  UiButton,
  UiModal,
  UiBadge,
  UiAlert,
  UiSkeleton,
} from '@/components/ui';
import { TodoDetailSubTodo } from '@/components/todo/detail';
import { SubTodoItem } from '@/components/todo/sub-todo';
import { useTodoModal } from '@/compose/todo';
import { date } from '@/utils';
import { HandledError } from '@/utils';
import { useAlert } from '@/compose/ui';
import { useLoading, useError } from '@/store';
import {
  useTodoView,
  useTodoCreate,
  useTodoUpdateDone,
  useTodoDelete,
} from '@/compose/todo';

const props = defineProps({
  modelValue: Boolean,
  todo: Object,
});
const emit = defineEmits(['update:modelValue']);

const loading = useLoading();
const error = useError();
const { alert, showAlert, hideAlert } = useAlert();
const { todoModalVisible, showTodoModal, hideTodoModal } = useTodoModal(
  props.modelValue
);
const { todo, viewTodo } = useTodoView();
const { createTodo } = useTodoCreate();
const { updateTodoDone } = useTodoUpdateDone();
const { deleteTodo } = useTodoDelete();

const getStatusLabel = computed(() => {
  if (todo.value.done) return 'Done';
  if (dayjs().isAfter(dayjs(todo.value.due))) return 'Late';

  return 'Unfinished';
});
const getStatusColor = computed(() => {
  if (todo.value.done) return 'success';
  if (dayjs().isAfter(dayjs(todo.value.due))) return 'danger';

  return 'primary';
});
const createSubTodoErrors = computed(() => error.get('create-todo')?.errors);

const setTodo = async () => {
  try {
    await viewTodo(props.todo.id);
  } catch (err) {
    if (!(err instanceof HandledError)) {
      showAlert('something error');
    }
  }
};

const handleSubmitSubTodo = async (body) => {
  try {
    await createTodo({
      ...body,
      parentId: todo.value.id,
    });

    setTodo();
  } catch (err) {
    if (!(err instanceof HandledError)) {
      showAlert('something error');
    }
  }
};
const handleCheckSubTodo = async ({ todo, checked: done }) => {
  try {
    await updateTodoDone(todo.id, done);

    setTodo();
  } catch (err) {
    if (!(err instanceof HandledError)) {
      showAlert('something error');
    }
  }
};
const handleDeleteSubTodo = async (todo) => {
  try {
    await deleteTodo(todo.id);

    setTodo();
  } catch (err) {
    if (!(err instanceof HandledError)) {
      showAlert('something error');
    }
  }
};

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      setTodo();
    }

    todoModalVisible.value = props.modelValue;
  }
);

watch(todoModalVisible, () => {
  error.reset('create-todo');
  loading.stop('create-todo');
  loading.stop('view-todo');

  hideAlert();

  emit('update:modelValue', todoModalVisible.value);
});
</script>
