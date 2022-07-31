<template>
  <app>
    <div class="flex items-center justify-between mb-4">
      <h1 class="font-bold text-2xl">All Todo</h1>
      <home-action />
    </div>
    <todo-list />
  </app>
</template>

<script setup>
import { App } from '@/layouts';
import { HomeAction } from '@/components/home';
import { TodoList } from '@/components/todo';
</script>
