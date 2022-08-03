import { ref } from 'vue';

export default () => {
  const logoutModalVisible = ref(false);
  const profileDropdownItems = [
    {
      key: 'profile',
      text: 'Profile',
      to: 'Profile',
    },
    {
      key: 'setting',
      text: 'Setting',
      to: 'Setting',
      divider: true,
    },
    {
      key: 'logout',
      text: 'Logout',
      class: 'text-red-500',
    },
  ];

  const showLogoutModal = () => (logoutModalVisible.value = true);
  const hideLogoutModal = () => (profileDropdownVisible.value = false);

  return {
    logoutModalVisible,
    profileDropdownItems,
    showLogoutModal,
    hideLogoutModal,
  };
};
