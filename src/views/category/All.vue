<template>
  <app>
    <ui-skeleton class="h-20" v-if="loading.get('get-category')" />
    <template v-else>
      <ui-error-state v-if="errorState" />
      <template v-else>
        <div class="flex items-center justify-between mb-4">
          <h1 class="font-bold text-2xl">All Category</h1>
          <category-list-action :filter="filter" v-on:filter="handleFilter" />
        </div>
        <category-list :categories="categories?.rows ?? []" />
      </template>
    </template>
  </app>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, inject } from 'vue';
import { App } from '@/layouts';
import { UiSkeleton, UiErrorState } from '@/components/ui';
import { CategoryList } from '@/components/category';
import { CategoryListAction } from '@/components/category/list';
import { useCategoryList } from '@/compose/category';
import { useLoading, useToast } from '@/store';
import { HandledError } from '@/utils';

const emitter = inject('emitter');
const loading = useLoading();
const toast = useToast();
const { categories, filter, getCategories } = useCategoryList();

const errorState = ref(false);

const setCategories = async () => {
  try {
    await getCategories();
  } catch (err) {
    if (!(err instanceof HandledError)) {
      errorState.value = true;
    }
  }
};

const handleFilter = ({ sort, order }) => {
  filter.sort = sort;
  filter.order = order;

  setCategories();
};

emitter.on('refresh-category', (e) => {
  toast.show(e.msg, 'success');

  filter.sort = '';
  filter.order = '';

  setCategories();
});

onBeforeMount(() => {
  loading.start('get-category');
});

onMounted(() => {
  setCategories();
});
</script>
