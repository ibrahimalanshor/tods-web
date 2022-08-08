<template>
  <auth>
    <div class="max-w-[400px] w-full">
      <h1 class="font-bold text-3xl mb-4 text-center uppercase tracking-tight">
        Login
      </h1>

      <ui-alert
        class="mb-4"
        color="danger"
        :text="loginAlert.message"
        :visible="loginAlert.visible"
        v-on:close="handleAlertClose"
      />

      <form v-on:submit.prevent="handleSubmitLogin">
        <ui-form-item
          label="Email"
          placeholder="Email"
          v-model="body.email"
          :status="formError.email ? 'error' : ''"
          :feedback="formError.email?.msg"
        />
        <ui-form-item
          label="Password"
          type="password"
          placeholder="Password"
          v-model="body.password"
          :status="formError.password ? 'error' : ''"
          :feedback="formError.password?.msg"
        />
        <div class="flex justify-between mb-3">
          <ui-checkbox label="Remember Me" />
          <ui-link
            :href="{ name: 'Forgot Password' }"
            label="Forgot Password"
          />
        </div>
        <ui-button
          type="submit"
          color="primary"
          block
          class="mb-2"
          :disabled="loading.get('login')"
          >Sign In</ui-button
        >
        <ui-button type="button" block class="mb-3">
          <span class="flex items-center space-x-2">
            <icon>
              <logo-google-icon />
            </icon>
            <span>Sign In Using Google</span>
          </span>
        </ui-button>
        <p class="text-center">
          Doesn't have account?
          <ui-link :href="{ name: 'Register' }" label="Register Here" />
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
import { useLogin } from '@/compose/auth';
import { HandledError } from '@/utils';
import { useRouter } from 'vue-router';

const router = useRouter();
const error = useError();
const loading = useLoading();
const toast = useToast();
const { body, login } = useLogin();

const loginAlert = computed(() => {
  return {
    visible: error.get('login')?.status === 401,
    message: error.get('login')?.errors,
  };
});
const formError = computed(() => {
  return error.get('login')?.errors ?? {};
});

const handleSubmitLogin = async () => {
  try {
    await login();

    error.reset('login');
    router.push({ name: 'Home' });
  } catch (err) {
    if (!(err instanceof HandledError)) {
      toast.show('something error');
    }
  }
};
const handleAlertClose = () => {
  error.reset('login');
};
</script>
