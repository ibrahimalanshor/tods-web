<template>
  <app>
    <h1 class="font-bold text-2xl mb-4">Setting</h1>

    <ui-form-item label="Theme" placeholder="Theme">
      <ui-select :options="themeOptions" v-model="body.selected" />
    </ui-form-item>

    <ui-button color="primary">Save</ui-button>
  </app>
</template>

<script setup>
import { ref } from 'vue';
import { App } from '@/layouts';
import { UiFormItem, UiSelect, UiButton } from '@/components/ui';

const body = ref({
  selected: '',
});
const themeOptions = [
  {
    value: '',
    label: 'Default System',
  },
  {
    value: 'dark',
    label: 'Dark',
  },
  {
    value: 'light',
    label: 'Light',
  },
];
</script>
