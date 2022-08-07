<template>
  <ui-toast :text="toast.text" v-model="toast.isVisible" />
  <router-view />
</template>

<script setup>
import { UiToast } from '@/components/ui';
import { useToast } from '@/store';

const toast = useToast();
</script>
