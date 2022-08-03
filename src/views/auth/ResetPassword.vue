<template>
  <auth>
    <div class="max-w-[400px] w-full">
      <h1 class="font-bold text-3xl mb-4 text-center uppercase tracking-tight">
        Reset Password
      </h1>

      <div class="">
        <ui-form-item label="New Password" placeholder="New Password" />
        <ui-form-item
          label="New Password Confirmation"
          placeholder="New Password Confirmation"
        />
        <ui-button color="primary" block class="mb-2">Reset Password</ui-button>
      </div>
    </div>
  </auth>
</template>

<script setup>
import { Auth } from '@/layouts';
import { UiFormItem, UiButton, UiCheckbox, UiLink } from '@/components/ui';
import { Icon } from '@vicons/utils';
import { LogoGoogle as LogoGoogleIcon } from '@vicons/ionicons5';
</script>
