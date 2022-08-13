<template>
  <ui-toast :color="toast.color" :text="toast.text" v-model="toast.isVisible" />
  <loading-bar />
  <router-view />
</template>

<script setup>
import { UiToast } from '@/components/ui';
import { LoadingBar } from '@/components/layout';
import { useToast } from '@/store';

const toast = useToast();
</script>
