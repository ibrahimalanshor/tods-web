<template>
  <app>
    <ui-skeleton v-if="loading.get('view-category')" />

    <template v-else>
      <ui-error-state
        :title="errorState.title"
        :text="errorState.text"
        v-if="errorState.visible"
      />
      <template v-else>
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-4">
            <router-link :to="{ name: 'All Category' }" class="flex">
              <icon size="20">
                <back-icon />
              </icon>
            </router-link>
            <h1 class="font-bold text-2xl">{{ category.name }}</h1>
          </div>
          <todo-list-action
            :filter="filter"
            :filter-items="{ category: false }"
            :form="{ category }"
            v-on:filter="handleFilter"
          />
        </div>
        <template v-if="!loading.get('get-todo')">
          <todo-list :todos="todos?.rows ?? []" />
        </template>
        <ui-skeleton v-else />
      </template>
    </template>
  </app>
</template>

<script setup>
import { onMounted, onBeforeMount, inject, reactive } from 'vue';
import { Icon } from '@vicons/utils';
import { ArrowBackOutline as BackIcon } from '@vicons/ionicons5';
import { App } from '@/layouts';
import { UiSkeleton, UiErrorState } from '@/components/ui';
import { TodoListAction } from '@/components/todo/list';
import { TodoList } from '@/components/todo';
import { useLoading, useToast, useError } from '@/store';
import { useCategoryView } from '@/compose/category';
import { useTodoList } from '@/compose/todo';
import { HandledError } from '@/utils';
import { useRoute, useRouter } from 'vue-router';

const emitter = inject('emitter');
const router = useRouter();
const route = useRoute();
const loading = useLoading();
const error = useError();
const toast = useToast();

const { category, viewCategory } = useCategoryView();
const { todos, filter, getTodos } = useTodoList();
const errorState = reactive({
  visible: false,
  title: '',
  text: '',
});

const setCategory = async () => {
  try {
    await viewCategory(route.params.id);

    setTodos();
  } catch (err) {
    if (err instanceof HandledError) {
      if (
        error.get('view-category')?.status === 404 ||
        error.get('view-category')?.status === 403
      ) {
        errorState.visible = true;
        errorState.title = error.get('view-category')?.message;
        errorState.text = error.get('view-category')?.errors;
      }
    } else {
      errorState.visible = true;
      errorState.title = '';
      errorState.text = '';
    }
  }
};
const setTodos = async () => {
  try {
    if (filter.done === null) {
      filter.done = false;
    }

    filter.categoryId = category.value;

    await getTodos();
  } catch (err) {
    if (!(err instanceof HandledError)) {
      errorState.visible = true;
      errorState.title = '';
      errorState.text = '';
    }
  }
};

const handleFilter = ({ sort, order, done, due }) => {
  filter.sort = sort;
  filter.order = order;
  filter.done = done;
  filter.due = due;

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
  filter.late = null;

  setTodos();
});

onBeforeMount(() => {
  loading.start('get-todo');
});

onMounted(() => {
  setCategory();
});
</script>
