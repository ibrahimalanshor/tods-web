export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/Setting.vue'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue'),
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: () => import('@/views/auth/ForgotPassword.vue'),
  },
  {
    path: '/verification',
    name: 'Verification Email',
    component: () => import('@/views/auth/VerificationEmail.vue'),
  },
  {
    path: '/reset-password',
    name: 'Reset Password',
    component: () => import('@/views/auth/ResetPassword.vue'),
  },
  {
    path: '/category',
    component: () => import('@/layouts/Empty.vue'),
    meta: {
      navKey: 'category',
      requireAuth: true,
    },
    children: [
      {
        path: '',
        name: 'All Category',
        component: () => import('@/views/category/All.vue'),
      },
      {
        path: ':id',
        name: 'Todo Category',
        component: () => import('@/views/category/Todo.vue'),
      },
    ],
  },
  {
    path: '/todo',
    component: () => import('@/layouts/Empty.vue'),
    meta: {
      navKey: 'todo',
      requireAuth: true,
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
          navKey: 'late-todo',
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
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
];
