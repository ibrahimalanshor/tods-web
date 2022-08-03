<template>
  <ui-modal title="Delete Category" v-model:visible="categoryModalVisible">
    <template #toggle>
      <slot name="toggle" />
    </template>

    <p>Confirm delete category</p>

    <template #footer>
      <ui-button color="danger">Delete</ui-button>
      <ui-button v-on:click="hideCategoryModal">Cancel</ui-button>
    </template>
  </ui-modal>
</template>

<script setup>
import { watch } from 'vue';
import { UiButton, UiModal } from '@/components/ui';
import { useCategoryModal } from '@/compose/category';

const props = defineProps({
  modelValue: Boolean,
  category: Object,
});
const emit = defineEmits(['update:modelValue']);

const { categoryModalVisible, showCategoryModal, hideCategoryModal } =
  useCategoryModal(props.modelValue);

watch(
  () => props.modelValue,
  () => {
    categoryModalVisible.value = props.modelValue;
  }
);

watch(categoryModalVisible, () =>
  emit('update:modelValue', categoryModalVisible.value)
);
</script>
