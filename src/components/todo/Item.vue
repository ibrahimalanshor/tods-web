<template>
  <div class="border-b px-4 py-3 flex items-center justify-between">
    <ui-checkbox
      :label="props.todo.name"
      v-on:check="handleCheckTodo"
      v-model="done"
    >
      <template #label="{ checked, label }">
        <span
          class="cursor-pointer"
          :class="checked ? 'line-through text-gray-500' : ''"
          v-on:click="handleDetailTodo"
          >{{ label }}</span
        >
      </template>
    </ui-checkbox>
    <ui-dropdown position="right" space="small" :items="todoActionItems">
      <template #toggle>
        <button>
          <icon size="20">
            <action-icon />
          </icon>
        </button>
      </template>
    </ui-dropdown>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@vicons/utils';
import { EllipsisHorizontalOutline as ActionIcon } from '@vicons/ionicons5';
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
const handleDetailTodo = () => emit('show-todo', props.todo);

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
