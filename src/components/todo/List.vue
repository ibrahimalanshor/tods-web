<template>
  <div class="rounded border border-b-0">
    <todo-item
      v-for="(todo, key) in props.todos"
      :key="key"
      :todo="todo"
      v-on:check-todo="handleCheckTodo"
      v-on:show-todo="handleShowTodo"
      v-on:edit-todo="handleEditTodo"
      v-on:delete-todo="handleDeleteTodo"
    />

    <todo-edit :todo="editTodoModal.todo" v-model="editTodoModal.visible" />
    <todo-delete
      :todo="deleteTodoModal.todo"
      v-model="deleteTodoModal.visible"
    />
    <todo-detail
      :todo="detailTodoModal.todo"
      v-model="detailTodoModal.visible"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import TodoItem from './Item.vue';
import TodoEdit from './Edit.vue';
import TodoDelete from './Delete.vue';
import TodoDetail from './Detail.vue';

const props = defineProps({
  todos: Array,
});

const editTodoModal = reactive({
  visible: false,
  todo: null,
});
const deleteTodoModal = reactive({
  visible: false,
  todo: null,
});
const detailTodoModal = reactive({
  visible: false,
  todo: null,
});

const handleCheckTodo = (val) => {
  console.log('check todo : ', val);
};
const handleShowTodo = (todo) => {
  detailTodoModal.todo = todo;
  detailTodoModal.visible = true;
};
const handleEditTodo = (todo) => {
  editTodoModal.todo = todo;
  editTodoModal.visible = true;
};
const handleDeleteTodo = (todo) => {
  deleteTodoModal.todo = todo;
  deleteTodoModal.visible = true;
};
</script>
