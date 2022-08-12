<template>
  <aside
    class="w-[300px] fixed top-0 h-full border-r pt-16 bg-white z-10 dark:bg-gray-800 dark:border-r-gray-700"
    :class="sidebar.isCollapsed ? 'left-full md:left-0' : 'left-0'"
  >
    <div class="overflow-x-auto h-full">
      <sidebar-nav :navs="navs" :active="activeNav" :show="showNav" />
    </div>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue';
import {
  AlbumsOutline as CategoryIcon,
  BrowsersOutline as TodoIcon,
  FolderOutline as AllTodoIcon,
  PersonOutline as UserIcon,
  CalendarOutline as CalendarIcon,
  CheckboxOutline as DoneIcon,
  FlagOutline as LateIcon,
  TodayOutline as TodayIcon,
} from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
import { SidebarNav } from '@/components/sidebar/render';
import { useSidebar } from '@/store';
import { useRoute } from 'vue-router';

const navs = [
  {
    title: 'Menu',
    items: [
      {
        key: 'todo',
        icon: TodoIcon,
        label: 'Todo',
        children: [
          {
            key: 'all-todo',
            icon: AllTodoIcon,
            to: 'All Todo',
            label: 'All',
          },
          {
            key: 'done-todo',
            icon: DoneIcon,
            to: 'Done Todo',
            label: 'Done',
          },
          {
            key: 'due-todo',
            icon: TodayIcon,
            to: 'Due Todo',
            label: 'Due Today',
          },
          {
            key: 'late-todo',
            icon: LateIcon,
            to: 'Late Todo',
            label: 'Late',
          },
        ],
      },
      {
        key: 'category',
        icon: CategoryIcon,
        to: 'All Category',
        label: 'Category',
      },
    ],
  },
];

const sidebar = useSidebar();
const route = useRoute();
const activeNav = ref(route.matched.map((path) => path.meta.navKey));
const showNav = ref(route.matched.map((path) => path.meta.navKey));

watch(route, () => {
  sidebar.hide();
});
</script>
