<template>
  <div
    class="border-b px-4 py-3 flex items-center justify-between dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer can-open-detail"
    v-on:click="handleDetailTodo"
  >
    <ui-checkbox
      :label="props.todo.name"
      :checked="props.todo.done"
      v-on:check="handleCheckTodo"
      v-model="done"
    >
      <template #label="{ checked, label }">
        <span
          class="cursor-pointer can-open-detail"
          :class="
            checked ? 'line-through text-gray-500 dark:text-gray-400' : ''
          "
          >{{ label }}</span
        >
      </template>
    </ui-checkbox>
    <div class="flex items-center space-x-2">
      <button class="text-primary-500" v-on:click="handleEditTodo">
        <icon size="20">
          <edit-icon />
        </icon>
      </button>
      <button class="text-danger-500" v-on:click="handleDeleteTodo">
        <icon size="20">
          <delete-icon />
        </icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@vicons/utils';
import {
  CreateOutline as EditIcon,
  TrashOutline as DeleteIcon,
} from '@vicons/ionicons5';
import { UiCheckbox, UiDropdown } from '@/components/ui';

const props = defineProps({
  todo: Object,
});
const emit = defineEmits([
  'check-todo',
  'show-todo',
  'edit-todo',
  'delete-todo',
]);

const done = ref(props.todo.done);

const handleCheckTodo = (checked) =>
  emit('check-todo', {
    todo: props.todo,
    checked,
  });
const handleEditTodo = () => emit('edit-todo', props.todo);
const handleDeleteTodo = () => emit('delete-todo', props.todo);
const handleDetailTodo = (e) => {
  if (e.target.classList.contains('can-open-detail')) {
    emit('show-todo', props.todo);
  }
};

const todoActionItems = [
  {
    key: 'edit',
    text: 'Edit',
    onClick: handleEditTodo,
  },
  {
    key: 'delete',
    text: 'Delete',
    onClick: handleDeleteTodo,
  },
];
</script>
