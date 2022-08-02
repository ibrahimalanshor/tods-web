<template>
  <div class="rounded border border-b-0">
    <todo-item
      v-for="(todo, key) in todos"
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

const todos = [
  {
    name: 'Finish Semester Antara',
    description:
      'Standar Enkripsi Data adalah algoritme kunci simetris untuk enkripsi data elektroni',
    done: false,
    due: new Date('2022-08-20T07:00:00'),
    category: {
      id: 1,
      name: 'School',
    },
    doneAt: null,
    createdAt: new Date('2022-08-02T07:00:00'),
    children: [
      {
        name: 'KRS-an',
        done: true,
      },
      {
        name: 'UTS',
        done: true,
      },
      {
        name: 'UAS',
        done: false,
      },
    ],
  },
  {
    name: 'Cook for Dinner',
    description: null,
    done: false,
    due: new Date('2022-08-01T08:00:00'),
    category: null,
    doneAt: null,
    createdAt: new Date('2022-08-01T07:00:00'),
  },
  {
    name: 'Backend Roadmap',
    description: null,
    done: false,
    due: null,
    category: {
      id: 2,
      name: 'Roadmap',
    },
    doneAt: null,
    createdAt: new Date('2022-07-21T07:00:00'),
  },
  {
    name: 'Get Works',
    description: null,
    done: true,
    due: null,
    category: null,
    doneAt: new Date('2022-08-01T07:00:00'),
    createdAt: new Date('2022-07-11T07:00:00'),
  },
];
</script>
