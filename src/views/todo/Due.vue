<template>
  <app>
    <div class="flex items-center justify-between mb-4">
      <h1 class="font-bold text-2xl">Due Today Todo</h1>
      <todo-list-action
        :filter="filter"
        :filter-items="{ status: false, due: false }"
        :create-button="false"
        v-on:filter="handleFilter"
      />
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
    filter.done = false;
    filter.due = new Date();

    await getTodos();
  } catch (err) {
    if (!(err instanceof HandledError)) {
      toast.show('something error');
    }
  }
};

const handleFilter = ({ sort, order, categoryId }) => {
  filter.sort = sort;
  filter.order = order;
  filter.categoryId = categoryId;

  setTodos();
};

emitter.on('refresh-todo', (e) => {
  if (e?.msg) {
    toast.show(e.msg, 'success');
  }

  setTodos();
});

onBeforeMount(() => {
  loading.start('get-todo');
});

onMounted(() => {
  setTodos();
});
</script>
