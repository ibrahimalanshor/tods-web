<template>
  <div>
    <ui-error-state v-if="errorState" />
    <template v-else>
      <h1 class="font-bold text-2xl mb-4">Latest Todo</h1>
      <top-category
        class="mb-4"
        v-on:click="handleTopCategoryClick"
        v-on:error="handleTopCategoryError"
      />
      <template v-if="!loading.get('get-todo')">
        <todo-list :todos="todos?.rows ?? []" />
      </template>
      <ui-skeleton v-else />
    </template>
  </div>
</template>

<script setup>
import { onMounted, onBeforeMount, inject, ref } from 'vue';
import { UiSkeleton, UiErrorState } from '@/components/ui';
import { TodoList } from '@/components/todo';
import { useLoading, useToast } from '@/store';
import { useTodoList } from '@/compose/todo';
import { HandledError } from '@/utils';
import TopCategory from './TopCategory.vue';

const emitter = inject('emitter');
const loading = useLoading();
const toast = useToast();

const { todos, filter, getTodos } = useTodoList();

const errorState = ref(false);

const setTodos = async () => {
  try {
    filter.done = false;
    filter.limit = 10;

    await getTodos();
  } catch (err) {
    if (!(err instanceof HandledError)) {
      errorState.value = true;
    }
  }
};

const handleTopCategoryError = () => {
  errorState.value = true;
};
const handleTopCategoryClick = (category) => {
  filter.categoryId = category;

  setTodos();
};

emitter.on('refresh-todo', (e) => {
  if (e?.msg) {
    toast.show(e.msg, 'success');
  }

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
