<template>
  <button class="flex items-center md:hidden">
    <icon size="20" v-on:click="sidebar.show()" v-if="sidebar.isCollapsed">
      <menu-icon />
    </icon>
    <icon size="20" v-on:click="sidebar.hide()" v-else>
      <close-icon />
    </icon>
  </button>
</template>

<script setup>
import { Icon } from '@vicons/utils';
import { Menu as MenuIcon, Close as CloseIcon } from '@vicons/ionicons5';
import { useSidebar } from '@/store';

const sidebar = useSidebar();
</script>
