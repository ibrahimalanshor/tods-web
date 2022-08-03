<template>
  <ui-modal title="Edit Category" v-model:visible="categoryModalVisible">
    <template #toggle>
      <slot name="toggle" />
    </template>

    <category-form v-model="categoryBody" />

    <template #footer>
      <ui-button color="primary">Save</ui-button>
      <ui-button v-on:click="hideCategoryModal">Cancel</ui-button>
    </template>
  </ui-modal>
</template>

<script setup>
import { watch } from 'vue';
import { UiButton, UiModal } from '@/components/ui';
import { CategoryForm } from '@/components/category';
import { useCategoryModal, useCategoryForm } from '@/compose/category';

const props = defineProps({
  modelValue: Boolean,
  category: Object,
});
const emit = defineEmits(['update:modelValue']);

const { categoryModalVisible, showCategoryModal, hideCategoryModal } =
  useCategoryModal(props.modelValue);
const { categoryBody, setCategoryBody } = useCategoryForm(props.category);

watch(
  () => props.modelValue,
  () => {
    categoryModalVisible.value = props.modelValue;
  }
);

watch(
  () => props.category,
  () => {
    setCategoryBody(props.category);
  }
);

watch(categoryModalVisible, () =>
  emit('update:modelValue', categoryModalVisible.value)
);
</script>
