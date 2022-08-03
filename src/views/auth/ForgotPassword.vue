<template>
  <auth>
    <div class="max-w-[400px] w-full">
      <h1 class="font-bold text-3xl mb-4 text-center uppercase tracking-tight">
        Forgot Password
      </h1>

      <div class="">
        <ui-form-item label="Email" placeholder="Email" />
        <ui-button color="primary" block class="mb-2"
          >Send Reset Password Link</ui-button
        >
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
