<template>
  <ui-modal title="New Category" v-model:visible="categoryModalVisible">
    <template #toggle>
      <ui-button title="New Category" color="primary" />
    </template>

    <category-form />

    <template #footer>
      <ui-button color="primary">Save</ui-button>
      <ui-button v-on:click="hideCategoryModal">Cancel</ui-button>
    </template>
  </ui-modal>
</template>

<script setup>
import { UiButton, UiModal } from '@/components/ui';
import { CategoryForm } from '@/components/category';
import { useCategoryModal } from '@/compose/category';

const { categoryModalVisible, showCategoryModal, hideCategoryModal } =
  useCategoryModal();
</script>
