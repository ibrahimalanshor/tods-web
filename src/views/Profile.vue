<template>
  <app>
    <div v-if="loading.get('get-profile')">
      <ui-skeleton class="h-10 mb-4" />
      <ui-skeleton class="h-40" />
    </div>
    <template v-else>
      <ui-error-state v-if="errorState" />

      <form v-on:submit.prevent="handleFormSubmit" v-else>
        <h1 class="font-bold text-2xl mb-4">Profile</h1>

        <ui-form-item
          label="Name"
          placeholder="Name"
          v-model="profileBody.name"
          :status="formError?.name ? 'error' : ''"
          :feedback="formError?.name?.msg"
        />
        <ui-form-item
          label="Email"
          placeholder="Email"
          v-model="profile.email"
          disabled
        />
        <ui-form-item
          type="password"
          label="Password"
          placeholder="Password"
          v-model="profileBody.password"
          :status="formError?.password ? 'error' : ''"
          :feedback="formError?.password?.msg"
        />
        <ui-form-item
          type="password"
          label="Password Confirmation"
          placeholder="Password Confirmation"
          v-model="profileBody.password_confirmation"
          :status="formError?.password_confirmation ? 'error' : ''"
          :feedback="formError?.password_confirmation?.msg"
        />

        <ui-button
          type="submit"
          color="primary"
          :disabled="loading.get('update-profile')"
          >Save</ui-button
        >
      </form>
    </template>
  </app>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { App } from '@/layouts';
import {
  UiFormItem,
  UiButton,
  UiSkeleton,
  UiErrorState,
} from '@/components/ui';
import { useLoading, useError, useToast } from '@/store';
import {
  useProfileGet,
  useProfileUpdate,
  useProfileForm,
} from '@/compose/profile';
import { HandledError } from '@/utils';

const loading = useLoading();
const error = useError();
const toast = useToast();
const { profile, getProfile } = useProfileGet();
const { updateProfile } = useProfileUpdate();
const { profileBody, setProfileBody } = useProfileForm();

const errorState = ref(false);
const formError = computed(() => error.get('update-profile')?.errors ?? {});

const setProfile = async () => {
  try {
    await getProfile();

    setProfileBody({
      name: profile.value.name,
    });
  } catch (err) {
    if (!(err instanceof HandledError)) {
      errorState.value = true;
    }
  }
};

const handleFormSubmit = async () => {
  try {
    await updateProfile(profileBody.value);

    toast.show('Profile Updated', 'success');
  } catch (err) {
    if (!(err instanceof HandledError)) {
      toast.show('something error');
    }
  }
};

onBeforeMount(() => {
  loading.start('get-profile');
});

onMounted(() => {
  setProfile();
});
</script>
