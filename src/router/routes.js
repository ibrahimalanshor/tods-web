export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/todo',
    component: () => import('@/layouts/Empty.vue'),
    meta: {
      navKey: 'todo',
    },
    children: [
      {
        path: '',
        name: 'All Todo',
        component: () => import('@/views/todo/All.vue'),
        meta: {
          navKey: 'all-todo',
          parent: 'todo',
        },
      },
      {
        path: 'done',
        name: 'Done Todo',
        component: () => import('@/views/todo/Done.vue'),
        meta: {
          navKey: 'done-todo',
          parent: 'todo',
        },
      },
      {
        path: 'due',
        name: 'Due Todo',
        component: () => import('@/views/todo/Due.vue'),
        meta: {
          navKey: 'due-todo',
          parent: 'todo',
        },
      },
      {
        path: 'late',
        name: 'Late Todo',
        component: () => import('@/views/todo/Late.vue'),
        meta: {
          navKey: 'todo-all',
          parent: 'todo',
        },
      },
      {
        path: 'ongoing',
        name: 'Ongoing Todo',
        component: () => import('@/views/todo/Ongoing.vue'),
        meta: {
          navKey: 'ongoing-todo',
          parent: 'todo',
        },
      },
    ],
  },
];
