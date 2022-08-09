<template>
  <ui-modal title="New Category" v-model:visible="categoryModalVisible">
    <template #toggle>
      <ui-button title="New Category" color="primary" />
    </template>

    <ui-alert
      class="mb-4"
      :color="alert.color"
      :text="alert.message"
      :visible="alert.visible"
      v-on:close="handleAlertClose"
    />

    <category-form
      :errors="formError"
      v-model="categoryBody"
      v-on:submit="handleFormSubmit"
    />

    <template #footer>
      <ui-button
        color="primary"
        v-on:click="handleFormSubmit"
        :disabled="loading.get('create-category')"
        >Save</ui-button
      >
      <ui-button v-on:click="hideCategoryModal">Cancel</ui-button>
    </template>
  </ui-modal>
</template>

<script setup>
import { watch, computed, reactive, inject } from 'vue';
import { UiButton, UiModal, UiAlert } from '@/components/ui';
import { CategoryForm } from '@/components/category';
import {
  useCategoryModal,
  useCategoryForm,
  useCategoryCreate,
} from '@/compose/category';
import { useError, useLoading, useToast } from '@/store';
import { HandledError } from '@/utils';
import { useAlert } from '@/compose/ui';

const emitter = inject('emitter');
const loading = useLoading();
const error = useError();

const { categoryModalVisible, showCategoryModal, hideCategoryModal } =
  useCategoryModal();
const { categoryBody, setCategoryBody, resetCategoryBody } = useCategoryForm();
const { createCategory } = useCategoryCreate();
const { alert, showAlert, hideAlert } = useAlert();

const formError = computed(() => {
  return error.get('create-category')?.errors ?? {};
});

const handleFormSubmit = async () => {
  try {
    await createCategory(categoryBody.value);

    emitter.emit('refresh-category', { msg: 'Category Created' });

    hideCategoryModal();
  } catch (err) {
    if (!(err instanceof HandledError)) {
      showAlert('something error');
    }
  }
};

const handleAlertClose = () => {
  hideAlert();
};

watch(categoryModalVisible, () => {
  error.reset('create-category');
  loading.stop('create-category');

  hideAlert();

  resetCategoryBody();
});
</script>
