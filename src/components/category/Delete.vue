<template>
  <ui-modal title="Delete Category" v-model:visible="categoryModalVisible">
    <template #toggle>
      <slot name="toggle" />
    </template>

    <ui-alert
      class="mb-4"
      :color="alert.color"
      :text="alert.message"
      :visible="alert.visible"
      v-on:close="handleAlertClose"
    />

    <p>Confirm delete category</p>

    <template #footer>
      <ui-button
        color="danger"
        v-on:click="handleDeleteCategory"
        :disabled="loading.get('delete-category')"
        >Delete</ui-button
      >
      <ui-button v-on:click="hideCategoryModal">Cancel</ui-button>
    </template>
  </ui-modal>
</template>

<script setup>
import { watch, inject, reactive } from 'vue';
import { UiButton, UiModal, UiAlert } from '@/components/ui';
import { useCategoryModal, useCategoryDelete } from '@/compose/category';
import { HandledError } from '@/utils';
import { useLoading } from '@/store';
import { useAlert } from '@/compose/ui';

const props = defineProps({
  modelValue: Boolean,
  category: Object,
});
const emit = defineEmits(['update:modelValue']);

const emitter = inject('emitter');
const loading = useLoading();

const { categoryModalVisible, showCategoryModal, hideCategoryModal } =
  useCategoryModal(props.modelValue);
const { deleteCategory } = useCategoryDelete();
const { alert, showAlert, hideAlert } = useAlert();

const handleAlertClose = () => {
  hideAlert();
};

const handleDeleteCategory = async () => {
  try {
    await deleteCategory(props.category.id);

    emitter.emit('refresh-category', { msg: 'Category Deleted' });

    hideCategoryModal();
  } catch (err) {
    if (!(err instanceof HandledError)) {
      showAlert('something error');
    }
  }
};

watch(
  () => props.modelValue,
  () => {
    categoryModalVisible.value = props.modelValue;
  }
);

watch(categoryModalVisible, () => {
  hideAlert();
  emit('update:modelValue', categoryModalVisible.value);
});
</script>
