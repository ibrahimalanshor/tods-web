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
import { onMounted, onBeforeMount } from 'vue';
import { App } from '@/layouts';
import { CategoryList } from '@/components/category';
import { CategoryListAction } from '@/components/category/list';
import { useCategoryList } from '@/compose/category';
import { useLoading } from '@/store';

const loading = useLoading();
const { categories, getCategories } = useCategoryList();

const setCategories = async () => {
  try {
    await getCategories();
  } catch (err) {
    console.log(err);
  }
};

onBeforeMount(() => {
  loading.start('get-category');
});

onMounted(() => {
  setCategories();
});
</script>
