<template>
  <div class="rounded border border-b-0 dark:border-gray-700">
    <template v-if="categories.length">
      <category-item
        v-for="(category, key) in props.categories"
        :key="key"
        :category="category"
        v-on:edit-category="handleEditCategory"
        v-on:delete-category="handleDeleteCategory"
      />

      <category-edit
        :category="editCategoryModal.category"
        v-model="editCategoryModal.visible"
      />
      <category-delete
        :category="deleteCategoryModal.category"
        v-model="deleteCategoryModal.visible"
      />
    </template>

    <div v-else>
      <div class="border-b px-4 py-3 dark:border-gray-700">Category Empty</div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import CategoryItem from './Item.vue';
import CategoryEdit from './Edit.vue';
import CategoryDelete from './Delete.vue';

const props = defineProps({
  categories: Array,
});

const editCategoryModal = reactive({
  visible: false,
  category: null,
});
const deleteCategoryModal = reactive({
  visible: false,
  category: null,
});

const handleEditCategory = (category) => {
  editCategoryModal.category = category;
  editCategoryModal.visible = true;
};
const handleDeleteCategory = (category) => {
  deleteCategoryModal.category = category;
  deleteCategoryModal.visible = true;
};
</script>
