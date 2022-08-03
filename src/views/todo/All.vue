<template>
  <app>
    <div class="flex items-center justify-between mb-4">
      <h1 class="font-bold text-2xl">All Todo</h1>
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
    name: 'Finish Semester Antara',
    description:
      'Standar Enkripsi Data adalah algoritme kunci simetris untuk enkripsi data elektroni',
    done: false,
    due: new Date('2022-08-20T07:00:00'),
    category: {
      id: 1,
      name: 'School',
    },
    doneAt: null,
    createdAt: new Date('2022-08-02T07:00:00'),
    children: [
      {
        name: 'KRS-an',
        done: true,
      },
      {
        name: 'UTS',
        done: true,
      },
      {
        name: 'UAS',
        done: false,
      },
    ],
  },
  {
    name: 'Cook for Dinner',
    description: null,
    done: false,
    due: new Date('2022-08-01T08:00:00'),
    category: null,
    doneAt: null,
    createdAt: new Date('2022-08-01T07:00:00'),
  },
  {
    name: 'Backend Roadmap',
    description: null,
    done: false,
    due: null,
    category: {
      id: 2,
      name: 'Roadmap',
    },
    doneAt: null,
    createdAt: new Date('2022-07-21T07:00:00'),
  },
];
</script>
