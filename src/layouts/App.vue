<template>
  <navbar />
  <sidebar />
  <main class="absolute left-0 md:left-[300px] p-4 md:p-6">
    <slot />
  </main>
</template>

<script setup>
import { Navbar } from '@/components/layout';
import { Sidebar } from '@/components/layout';
</script>
