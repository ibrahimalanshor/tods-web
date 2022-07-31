<template>
  <ui-dropdown
    :items="profileDropdownItems"
    position="right"
    space="medium"
    v-on:item-click="handeProfileDropdownItemClick"
  >
    <template #toggle>
      <button class="flex items-center">
        <icon size="24">
          <profile-icon />
        </icon>
      </button>
    </template>
  </ui-dropdown>
  <logout-modal v-model:visible="logoutModalVisible" />
</template>

<script setup>
import { PersonCircleOutline as ProfileIcon } from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
import { UiDropdown } from '@/components/ui';
import { useProfileDropdown } from '@/compose/navbar';
import LogoutModal from './LogoutModal.vue';

const {
  profileDropdownVisible,
  profileDropdownItems,
  logoutModalVisible,
  showLogoutModal,
  hideLogoutModal,
} = useProfileDropdown();

const handeProfileDropdownItemClick = (item) => {
  if (item.key === 'logout') {
    showLogoutModal();
  }
};
</script>
