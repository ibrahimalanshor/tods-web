<template>
  <app>
    <div class="flex items-center justify-between mb-4">
      <h1 class="font-bold text-2xl">All Category</h1>
      <category-list-action />
    </div>
    <template v-if="!loading.get('get-category')">
      <category-list :categories="categories.rows" />
    </template>
  </app>
</template>

<script setup>
import { onMounted, onBeforeMount, inject } from 'vue';
import { App } from '@/layouts';
import { CategoryList } from '@/components/category';
import { CategoryListAction } from '@/components/category/list';
import { useCategoryList } from '@/compose/category';
import { useLoading, useToast } from '@/store';

const emitter = inject('emitter');
const loading = useLoading();
const toast = useToast();
const { categories, getCategories } = useCategoryList();

const setCategories = async () => {
  try {
    await getCategories();
  } catch (err) {
    console.log(err);
  }
};

emitter.on('category-created', (e) => {
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
