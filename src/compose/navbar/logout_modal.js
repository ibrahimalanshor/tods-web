import { ref } from 'vue';

export default () => {
  const logoutModalVisible = ref(false);

  const showLogoutModal = () => (logoutModalVisible.value = true);
  const hideLogoutModal = () => (logoutModalVisible.value = false);

  return { logoutModalVisible, showLogoutModal, hideLogoutModal };
};
