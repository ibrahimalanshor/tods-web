<template>
  <app>
    <div class="flex items-center justify-between mb-4">
      <h1 class="font-bold text-2xl">All Todo</h1>
      <todo-list-action :filter="filter" v-on:filter="handleFilter" />
    </div>
    <template v-if="!loading.get('get-todo')">
      <todo-list :todos="todos?.rows ?? []" />
    </template>
    <ui-skeleton v-else />
  </app>
</template>

<script setup>
import { onMounted, onBeforeMount, inject } from 'vue';
import { App } from '@/layouts';
import { UiSkeleton } from '@/components/ui';
import { TodoListAction } from '@/components/todo/list';
import { TodoList } from '@/components/todo';
import { useLoading, useToast } from '@/store';
import { useTodoList } from '@/compose/todo';
import { HandledError } from '@/utils';

const emitter = inject('emitter');
const loading = useLoading();
const toast = useToast();

const { todos, filter, getTodos } = useTodoList();

const setTodos = async () => {
  try {
    if (filter.done === null) {
      filter.done = false;
    }

    await getTodos();
  } catch (err) {
    if (!(err instanceof HandledError)) {
      toast.show('something error');
    }
  }
};

const handleFilter = ({ sort, order, done, due, categoryId }) => {
  filter.sort = sort;
  filter.order = order;
  filter.done = done;
  filter.due = due;
  filter.categoryId = categoryId;

  if (filter.done === 'late') {
    filter.late = new Date();
  } else {
    filter.late = null;
  }

  setTodos();
};

emitter.on('refresh-todo', (e) => {
  if (e?.msg) {
    toast.show(e.msg, 'success');
  }

  filter.sort = '';
  filter.order = '';
  filter.done = null;
  filter.due = null;
  filter.categoryId = null;
  filter.late = null;

  setTodos();
});

onBeforeMount(() => {
  loading.start('get-todo');
});

onMounted(() => {
  setTodos();
});
</script>
