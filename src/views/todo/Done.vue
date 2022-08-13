<template>
  <app>
    <ui-skeleton class="h-20" v-if="loading.get('get-todo')" />
    <template v-else>
      <ui-error-state v-if="errorState" />
      <template v-else>
        <div class="flex items-center justify-between mb-4">
          <h1 class="font-bold text-2xl">Done Todo</h1>
          <todo-list-action
            :filter="filter"
            :filter-items="{ status: false, due: false }"
            :create-button="false"
            v-on:filter="handleFilter"
          />
        </div>
        <todo-list :todos="todos?.rows ?? []" />
      </template>
    </template>
  </app>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, inject } from 'vue';
import { App } from '@/layouts';
import { UiSkeleton, UiErrorState } from '@/components/ui';
import { TodoListAction } from '@/components/todo/list';
import { TodoList } from '@/components/todo';
import { useLoading, useToast } from '@/store';
import { useTodoList } from '@/compose/todo';
import { HandledError } from '@/utils';

const emitter = inject('emitter');
const loading = useLoading();
const toast = useToast();

const { todos, filter, getTodos } = useTodoList();

const errorState = ref(false);

const setTodos = async () => {
  try {
    filter.done = true;

    await getTodos();
  } catch (err) {
    if (!(err instanceof HandledError)) {
      errorState.value = true;
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

  filter.sort = '';
  filter.order = '';
  filter.categoryId = null;

  setTodos();
});

onBeforeMount(() => {
  loading.start('get-todo');
});

onMounted(() => {
  setTodos();
});
</script>
