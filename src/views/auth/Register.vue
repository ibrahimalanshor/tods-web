<template>
  <auth>
    <div class="max-w-[400px] w-full">
      <h1 class="font-bold text-3xl mb-4 text-center uppercase tracking-tight">
        Register
      </h1>

      <div class="">
        <ui-form-item label="Name" placeholder="Name" />
        <ui-form-item label="Email" placeholder="Email" />
        <ui-form-item label="Password" placeholder="Password" />
        <ui-button color="primary" block class="mb-2">Sign Up</ui-button>
        <ui-button block class="mb-3">
          <span class="flex items-center space-x-2">
            <icon>
              <logo-google-icon />
            </icon>
            <span>Sign Up Using Google</span>
          </span>
        </ui-button>
        <p class="text-center">
          Already have account?
          <ui-link :href="{ name: 'Login' }" label="Login Here" />
        </p>
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
