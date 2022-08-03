<template>
  <app>
    <div class="flex items-center justify-between mb-4">
      <h1 class="font-bold text-2xl">All Category</h1>
      <category-list-action />
    </div>
    <category-list :categories="categories" />
  </app>
</template>

<script setup>
import { App } from '@/layouts';
import { CategoryList } from '@/components/category';
import { CategoryListAction } from '@/components/category/list';

const categories = [
  {
    name: 'Works',
  },
  {
    name: 'Schools',
  },
  {
    name: 'Habbits',
  },
];
</script>
