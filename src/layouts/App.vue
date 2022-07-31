<template>
  <navbar />
  <sidebar />
  <main class="md:ml-[300px] p-4 md:p-6">
    <slot />
  </main>
</template>

<script setup>
import { Navbar } from '@/components/layout';
import { Sidebar } from '@/components/layout';
</script>
