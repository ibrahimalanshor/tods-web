<template>
  <ui-collapse>
    <template #label>
      <h3 class="font-bold text-lg cursor-pointer">Sub Todo</h3>
    </template>

    <sub-todo-item
      v-for="(subTodo, key) in props.subTodos ?? []"
      :key="key"
      :todo="subTodo"
      v-on:check-todo="handleCheckTodo"
      v-on:delete-todo="handleDeleteTodo"
    />
    <ui-input size="sm" placeholder="Add Sub Todo, Press Enter" />
  </ui-collapse>
</template>

<script setup>
import { UiInput, UiCollapse } from '@/components/ui';
import { SubTodoItem } from '@/components/todo/sub-todo';

const props = defineProps({
  subTodos: Array,
});

const handleCheckTodo = (val) => console.log('check todo : ', val);
const handleDeleteTodo = (val) => console.log('delete todo : ', val);
</script>
