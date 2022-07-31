import { ref } from 'vue';

export default () => {
  const profileDropdownVisible = ref(false);
  const logoutModalVisible = ref(false);
  const profileDropdownItems = [
    {
      key: 'profile',
      text: 'Profile',
    },
    {
      key: 'setting',
      text: 'Setting',
      divider: true,
    },
    {
      key: 'logout',
      text: 'Logout',
      class: 'text-red-500',
    },
  ];

  const showProfileDropdown = () => (profileDropdownVisible.value = true);
  const hideProfileDropdown = () => (profileDropdownVisible.value = false);
  const showLogoutModal = () => (logoutModalVisible.value = true);
  const hideLogoutModal = () => (profileDropdownVisible.value = false);

  return {
    profileDropdownVisible,
    logoutModalVisible,
    profileDropdownItems,
    showProfileDropdown,
    hideProfileDropdown,
    showLogoutModal,
    hideLogoutModal,
  };
};
