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
      <h2 class="text-xl font-bold">{{ props.todo?.name ?? 'Detail Todo' }}</h2>
    </template>

    <div>
      <p class="leading-loose mb-2">
        {{ props.todo.description ?? 'No Description' }}
      </p>

      <hr class="my-3" />
      <todo-detail-sub-todo :sub-todos="props.todo.children" />
      <hr class="my-3" />

      <div class="flex flex-wrap">
        <div class="w-full mb-2">
          <span class="block font-bold mb-1">Category</span>
          <span>{{ props.todo.category?.name ?? 'No Category' }}</span>
        </div>
        <div class="w-1/2 mb-2">
          <span class="block font-bold mb-1">Created At</span>
          <span>{{ date.format(props.todo.createdAt) }}</span>
        </div>
        <div class="w-1/2 mb-2">
          <span class="block font-bold mb-1">Due Date</span>
          <span>{{ props.todo.due ? date.format(props.todo.due) : '-' }}</span>
        </div>
        <div class="w-1/2">
          <span class="block font-bold mb-1">Status</span>
          <ui-badge :color="getStatusColor" :label="getStatusLabel" />
        </div>
        <div class="w-1/2">
          <span class="block font-bold mb-1">Done At</span>
          <span>{{
            props.todo.doneAt ? date.format(props.todo.doneAt) : '-'
          }}</span>
        </div>
      </div>
    </div>

    <template #footer>
      <ui-button color="danger">Detail</ui-button>
      <ui-button v-on:click="hideTodoModal">Cancel</ui-button>
    </template>
  </ui-modal>
</template>

<script setup>
import { watch, computed } from 'vue';
import dayjs from 'dayjs';
import { UiButton, UiModal, UiBadge } from '@/components/ui';
import { TodoDetailSubTodo } from '@/components/todo/detail';
import { SubTodoItem } from '@/components/todo/sub-todo';
import { useTodoModal } from '@/compose/todo';
import { date } from '@/utils';

const props = defineProps({
  modelValue: Boolean,
  todo: Object,
});
const emit = defineEmits(['update:modelValue']);

const { todoModalVisible, showTodoModal, hideTodoModal } = useTodoModal(
  props.modelValue
);

const getStatusLabel = computed(() => {
  if (props.todo.done) return 'Done';
  if (dayjs().isAfter(dayjs(props.todo.due))) return 'Late';

  return 'Unfinished';
});

const getStatusColor = computed(() => {
  if (props.todo.done) return 'success';
  if (dayjs().isAfter(dayjs(props.todo.due))) return 'danger';

  return 'primary';
});

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
