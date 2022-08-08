<template>
  <auth>
    <div class="max-w-[400px] w-full">
      <h1 class="font-bold text-3xl mb-4 text-center uppercase tracking-tight">
        Register
      </h1>

      <ui-alert
        class="mb-4"
        color="danger"
        :text="registerAlert.message"
        :visible="registerAlert.visible"
        v-on:close="handleAlertClose"
      />

      <form v-on:submit.prevent="handleSubmitRegister">
        <ui-form-item
          label="Name"
          placeholder="Name"
          v-model="body.name"
          :status="formError.name ? 'error' : ''"
          :feedback="formError.name?.msg"
        />
        <ui-form-item
          label="Email"
          placeholder="Email"
          v-model="body.email"
          :status="formError.email ? 'error' : ''"
          :feedback="formError.email?.msg"
        />
        <ui-form-item
          type="password"
          label="Password"
          placeholder="Password"
          v-model="body.password"
          :status="formError.password ? 'error' : ''"
          :feedback="formError.password?.msg"
        />
        <ui-button
          type="submit"
          color="primary"
          block
          class="mb-2"
          :disabled="loading.get('register')"
          >Sign Up</ui-button
        >
        <ui-button block class="mb-3" type="button">
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
      </form>
    </div>
  </auth>
</template>

<script setup>
import { computed } from 'vue';
import { Auth } from '@/layouts';
import {
  UiFormItem,
  UiButton,
  UiCheckbox,
  UiLink,
  UiAlert,
} from '@/components/ui';
import { Icon } from '@vicons/utils';
import { LogoGoogle as LogoGoogleIcon } from '@vicons/ionicons5';
import { useError, useLoading, useToast } from '@/store';
import { useRegister } from '@/compose/auth';
import { HandledError } from '@/utils';
import { useRouter } from 'vue-router';

const router = useRouter();
const error = useError();
const loading = useLoading();
const toast = useToast();
const { body, register } = useRegister();

const registerAlert = computed(() => {
  return {
    visible: error.get('register')?.status === 401,
    message: error.get('register')?.errors,
  };
});
const formError = computed(() => {
  return error.get('register')?.errors ?? {};
});

const handleSubmitRegister = async () => {
  try {
    await register();

    error.reset('register');
    router.push({ name: 'Home' });
  } catch (err) {
    if (!(err instanceof HandledError)) {
      toast.show('something error');
    }
  }
};
const handleAlertClose = () => {
  error.reset('register');
};
</script>
