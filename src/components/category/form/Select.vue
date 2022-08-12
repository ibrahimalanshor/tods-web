<template>
  <ui-select-search
    label="name"
    :options="categories?.rows ?? []"
    :placeholder="props.placeholder"
    :status="props.status"
    :loading="loading.get('get-category')"
    :filterable="false"
    v-model="selected"
    v-on:open="handleOpen"
    v-on:search="handleSearch"
    v-on:change="handleChange"
  />
</template>

<script setup>
import { ref, watch } from 'vue';
import { UiSelectSearch } from '@/components/ui';
import { useCategoryList } from '@/compose/category';
import { HandledError } from '@/utils';
import { useLoading, useToast } from '@/store';
import { debounce } from '@/utils';

const props = defineProps({
  modelValue: null,
  placeholder: {
    type: String,
    default: 'Select Category',
  },
  status: String,
});
const emit = defineEmits(['update:modelValue', 'change']);

const loading = useLoading();
const toast = useToast();
const { categories, filter, getCategories } = useCategoryList();

const selected = ref(props.modelValue);
const setCategories = async () => {
  try {
    await getCategories();
  } catch (err) {
    if (!(err instanceof HandledError)) {
      toast.show('something error');
    }
  }
};
const setCategoriesDebounce = debounce(setCategories);

const handleOpen = () => {
  setCategories();
};

const handleSearch = (val) => {
  filter.name = val;

  setCategoriesDebounce();
};

const handleChange = () => {
  emit('update:modelValue', selected.value);
  emit('change', selected.value);
};

watch(
  () => props.modelValue,
  () => {
    selected.value = props.modelValue;
  }
);
</script>
