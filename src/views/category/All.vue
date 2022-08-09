<template>
  <app>
    <div class="flex items-center justify-between mb-4">
      <h1 class="font-bold text-2xl">All Category</h1>
      <category-list-action :filter="filter" v-on:filter="handleFilter" />
    </div>
    <template v-if="!loading.get('get-category')">
      <category-list :categories="categories?.rows ?? []" />
    </template>
    <ui-skeleton class="h-20" v-else />
  </app>
</template>

<script setup>
import { onMounted, onBeforeMount, inject } from 'vue';
import { App } from '@/layouts';
import { UiSkeleton } from '@/components/ui';
import { CategoryList } from '@/components/category';
import { CategoryListAction } from '@/components/category/list';
import { useCategoryList } from '@/compose/category';
import { useLoading, useToast } from '@/store';
import { HandledError } from '@/utils';

const emitter = inject('emitter');
const loading = useLoading();
const toast = useToast();
const { categories, filter, getCategories } = useCategoryList();

const setCategories = async () => {
  try {
    await getCategories();
  } catch (err) {
    if (!(err instanceof HandledError)) {
      toast.show('something error');
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

  setCategories();
});

onBeforeMount(() => {
  loading.start('get-category');
});

onMounted(() => {
  setCategories();
});
</script>
