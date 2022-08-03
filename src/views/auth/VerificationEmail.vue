<template>
  <auth>
    <div class="max-w-[400px] w-full text-center">
      <h1 class="font-bold text-3xl mb-4 text-center">Register Success</h1>
      <p class="leading-loose">
        We have send verification link to your email, click that link to
        activate your account
      </p>
    </div>
  </auth>
</template>

<script setup>
import { Auth } from '@/layouts';
import { UiFormItem, UiButton, UiCheckbox, UiLink } from '@/components/ui';
import { Icon } from '@vicons/utils';
import { LogoGoogle as LogoGoogleIcon } from '@vicons/ionicons5';
</script>
