<template>
  <app>
    <h1 class="font-bold text-2xl mb-4">Setting</h1>

    <form v-on:submit.prevent="handleSave">
      <ui-form-item label="Theme" placeholder="Theme">
        <ui-select :options="themeOptions" v-model="themeSelected" />
      </ui-form-item>

      <ui-button color="primary" type="submit">Save</ui-button>
    </form>
  </app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { App } from '@/layouts';
import { UiFormItem, UiSelect, UiButton } from '@/components/ui';
import { setTheme } from '@/helpers';

const themeSelected = ref(null);
const themeSystem = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'Dark'
  : 'Light';
const themeOptions = [
  {
    value: null,
    label: `Default System (${themeSystem})`,
  },
  {
    value: 'dark',
    label: `Dark`,
  },
  {
    value: 'light',
    label: 'Light',
  },
];

const handleSave = () => {
  if (themeSelected.value) {
    localStorage.setItem('theme', themeSelected.value);
  } else {
    localStorage.removeItem('theme');
  }

  setTheme();
};

onMounted(() => {
  const allowed = [null, 'dark', 'light'];
  const theme = localStorage.getItem('theme');

  themeSelected.value = allowed.includes(theme) ? theme : null;
});
</script>
