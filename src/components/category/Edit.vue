<template>
  <ui-modal title="Edit Category" v-model:visible="categoryModalVisible">
    <template #toggle>
      <slot name="toggle" />
    </template>

    {{ categoryBody }}

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
        :disabled="loading.get('update-category')"
        >Save</ui-button
      >
      <ui-button v-on:click="hideCategoryModal">Cancel</ui-button>
    </template>
  </ui-modal>
</template>

<script setup>
import { watch, inject, reactive, computed } from 'vue';
import { UiButton, UiModal, UiAlert } from '@/components/ui';
import { CategoryForm } from '@/components/category';
import {
  useCategoryModal,
  useCategoryForm,
  useCategoryUpdate,
} from '@/compose/category';
import { useError, useLoading, useToast } from '@/store';
import { HandledError } from '@/utils';
import { useAlert } from '@/compose/ui';

const props = defineProps({
  modelValue: Boolean,
  category: Object,
});
const emit = defineEmits(['update:modelValue']);

const emitter = inject('emitter');
const loading = useLoading();
const error = useError();

const { categoryModalVisible, showCategoryModal, hideCategoryModal } =
  useCategoryModal(props.modelValue);
const { categoryBody, setCategoryBody, resetCategoryBody } = useCategoryForm();
const { updateCategory } = useCategoryUpdate();
const { alert, showAlert, hideAlert } = useAlert();

const formError = computed(() => {
  return error.get('update-category')?.errors ?? {};
});

const handleFormSubmit = async () => {
  try {
    await updateCategory(props.category.id, categoryBody.value);

    emitter.emit('refresh-category', { msg: 'Category Updated' });

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

watch(
  () => props.modelValue,
  () => {
    categoryModalVisible.value = props.modelValue;
  }
);

watch(categoryModalVisible, () => {
  error.reset('update-category');
  loading.stop('update-category');

  setCategoryBody({
    name: props.category.name,
  });

  hideAlert();
  emit('update:modelValue', categoryModalVisible.value);
});
</script>
