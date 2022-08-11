<template>
  <div class="rounded border border-b-0 dark:border-gray-700">
    <template v-if="todos.length">
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
    </template>

    <div
      class="px-4 py-3 border-b dark:bg-gray-800 dark:border-gray-700"
      v-else
    >
      Todo Empty
    </div>
  </div>
</template>

<script setup>
import { reactive, inject } from 'vue';
import TodoItem from './Item.vue';
import TodoEdit from './Edit.vue';
import TodoDelete from './Delete.vue';
import TodoDetail from './Detail.vue';
import { HandledError } from '@/utils';
import { useToast } from '@/store';
import { useTodoUpdateDone } from '@/compose/todo';

const props = defineProps({
  todos: Array,
});

const emitter = inject('emitter');
const toast = useToast();

const { updateTodoDone } = useTodoUpdateDone();

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

const handleCheckTodo = async ({ todo, checked: done }) => {
  try {
    await updateTodoDone(todo.id, done);

    emitter.emit('refresh-todo');
  } catch (err) {
    if (!(err instanceof HandledError)) {
      toast.show('something error');
    }
  }
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
