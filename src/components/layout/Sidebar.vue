<template>
  <aside
    class="w-[300px] fixed top-0 h-full border-r pt-16 bg-white z-10"
    :class="sidebar.isCollapsed ? 'left-full md:left-0' : 'left-0'"
  >
    <div class="overflow-x-auto h-full">
      <sidebar-nav
        :navs="navs"
        :active="activeNav"
        :show="showNav"
        v-on:item-click="handleItemClick"
      />
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import {
  AlbumsOutline as CategoryIcon,
  BrowsersOutline as TodoIcon,
  SettingsOutline as AllTodoIcon,
  PersonOutline as UserIcon,
} from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
import { SidebarNav } from '@/components/sidebar/render';
import { useSidebar } from '@/store';

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
            key: 'all',
            icon: AllTodoIcon,
            label: 'All',
          },
          {
            icon: UserIcon,
            label: 'Future',
          },
        ],
      },
      {
        key: 'category',
        icon: CategoryIcon,
        label: 'Category',
      },
    ],
  },
];

const sidebar = useSidebar();
const activeNav = ref([]);
const showNav = ref([]);

const handleItemClick = (item) => console.log(item);
</script>
