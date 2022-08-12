<template>
  <div
    class="border-b px-4 py-3 flex items-center justify-between dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer can-open-detail"
    v-on:click="handleClickCategory"
  >
    <span class="can-open-detail">{{ props.category.name }}</span>
    <div class="flex items-center space-x-2">
      <button class="text-primary-500" v-on:click="handleEditCategory">
        <icon size="20">
          <edit-icon />
        </icon>
      </button>
      <button class="text-danger-500" v-on:click="handleDeleteCategory">
        <icon size="20">
          <delete-icon />
        </icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@vicons/utils';
import {
  CreateOutline as EditIcon,
  TrashOutline as DeleteIcon,
} from '@vicons/ionicons5';
import { UiDropdown, UiLink } from '@/components/ui';
import { useRouter } from 'vue-router';

const props = defineProps({
  category: Object,
});
const emit = defineEmits([
  'check-category',
  'show-category',
  'edit-category',
  'delete-category',
]);

const router = useRouter();

const handleEditCategory = () => emit('edit-category', props.category);
const handleDeleteCategory = () => emit('delete-category', props.category);
const handleClickCategory = (e) => {
  if (e.target.classList.contains('can-open-detail')) {
    router.push({ name: 'Todo Category', params: { id: props.category.id } });
  }
};
</script>
