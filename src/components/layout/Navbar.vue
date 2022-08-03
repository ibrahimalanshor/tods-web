<template>
  <nav
    class="bg-white h-16 flex items-center border-b relative z-20 sticky top-0 left-0"
  >
    <div class="w-full px-4 flex justify-between">
      <div class="flex items-center space-x-4">
        <sidebar-toggle />
        <router-link :to="{ name: 'Home' }">Home</router-link>
      </div>
      <div class="flex space-x-4 items-center">
        <new-todo-modal />
        <profile-dropdown />
      </div>
    </div>
  </nav>
</template>

<script setup>
import {
  ProfileDropdown,
  NewTodoModal,
  SidebarToggle,
} from '@/components/navbar';
</script>
