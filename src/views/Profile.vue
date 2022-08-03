<template>
  <app>
    <h1 class="font-bold text-2xl mb-4">Profile</h1>

    <ui-form-item label="Name" placeholder="Name" />
    <ui-form-item label="Username" placeholder="Username" />
    <ui-form-item label="Password" placeholder="Password" />
    <ui-form-item
      label="Password Confirmation"
      placeholder="Password Confirmation"
    />

    <ui-button color="primary">Save</ui-button>
  </app>
</template>

<script setup>
import { App } from '@/layouts';
import { UiFormItem, UiButton } from '@/components/ui';
</script>
