<template>
  <ui-modal
    title="Confirm Logout"
    content="Logout from your account"
    :toggle="false"
    v-model:visible="logoutModalVisible"
  >
    <template #footer>
      <div v-on:click="handleLogoutModalConfirm">
        <slot name="confirm">
          <ui-button color="danger" :disabled="loading.get('logout')"
            >Logout</ui-button
          >
        </slot>
      </div>
      <div v-on:click="handleLogoutModalCancel">
        <slot name="cancel">
          <ui-button>Cancel</ui-button>
        </slot>
      </div>
    </template>
  </ui-modal>
</template>

<script setup>
import { watch } from 'vue';
import { UiButton, UiModal } from '@/components/ui';
import { useLogoutModal } from '@/compose/navbar';
import { useLogout } from '@/compose/auth';
import { useLoading } from '@/store';
import { useRouter } from 'vue-router';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible']);

const router = useRouter();
const loading = useLoading();
const { logoutModalVisible, showLogoutModal, hideLogoutModal } =
  useLogoutModal();
const { logout } = useLogout();

const handleLogoutModalConfirm = async () => {
  try {
    await logout();

    router.push({ name: 'Login' });
  } catch (err) {}
};
const handleLogoutModalCancel = () => {
  hideLogoutModal();
};

watch(
  () => props.visible,
  () => {
    logoutModalVisible.value = props.visible;
  }
);

watch(logoutModalVisible, () => {
  emit('update:visible', logoutModalVisible.value);
});
</script>
