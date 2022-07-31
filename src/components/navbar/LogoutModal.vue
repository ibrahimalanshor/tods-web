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
          <ui-button color="danger">Logout</ui-button>
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

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible']);
const { logoutModalVisible, showLogoutModal, hideLogoutModal } =
  useLogoutModal();

const handleLogoutModalConfirm = () => {
  console.log('process logout');

  hideLogoutModal();
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
