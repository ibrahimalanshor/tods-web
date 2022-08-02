<template>
  <div class="mb-2 flex items-center justify-between">
    <ui-checkbox
      :label="props.todo.name"
      v-on:check="handleCheckTodo"
      v-model="done"
    >
      <template #label="{ checked, label }">
        <span :class="checked ? 'line-through text-gray-500' : ''">{{
          label
        }}</span>
      </template>
    </ui-checkbox>
    <button class="text-danger-500" v-on:click="handleDeleteTodo">
      <icon>
        <trash-icon />
      </icon>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@vicons/utils';
import { TrashOutline as TrashIcon } from '@vicons/ionicons5';
import { UiCheckbox } from '@/components/ui';

const props = defineProps({
  todo: Object,
});
const emit = defineEmits(['check-todo', 'delete-todo']);

const done = ref(props.todo.done);

const handleCheckTodo = (checked) =>
  emit('check-todo', {
    todo: props.todo,
    checked,
  });
const handleDeleteTodo = () => emit('delete-todo', props.todo);
</script>
