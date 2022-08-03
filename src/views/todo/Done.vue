<template>
  <app>
    <div class="flex items-center justify-between mb-4">
      <h1 class="font-bold text-2xl">Done Todo</h1>
      <todo-list-action />
    </div>
    <todo-list :todos="todos" />
  </app>
</template>

<script setup>
import { App } from '@/layouts';
import { TodoListAction } from '@/components/todo/list';
import { TodoList } from '@/components/todo';

const todos = [
  {
    name: 'Get Works',
    description: null,
    done: true,
    due: null,
    category: null,
    doneAt: new Date('2022-08-01T07:00:00'),
    createdAt: new Date('2022-07-11T07:00:00'),
  },
];
</script>
