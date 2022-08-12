<template>
  <div>
    <ui-skeleton class="h-8" v-if="loading.get('get-category')" />
    <template v-else>
      <div class="flex flex-wrap gap-2" v-if="categories?.rows?.length">
        <ui-button
          size="sm"
          :color="active === category.id ? 'primary' : ''"
          v-for="category in categories?.rows ?? []"
          :key="category.id"
          v-on:click="handleCategoryClick(category)"
          >{{ category.name }}</ui-button
        >
      </div>
      <ui-button size="sm" v-else>All</ui-button>
    </template>
  </div>
</template>

<script setup>
import { onMounted, onBeforeMount, inject, ref, watch } from 'vue';
import { UiButton, UiSkeleton } from '@/components/ui';
import { useLoading } from '@/store';
import { useCategoryList } from '@/compose/category';
import { HandledError } from '@/utils';

const emit = defineEmits(['error', 'click']);

const loading = useLoading();
const { categories, filter, getCategories } = useCategoryList();

const active = ref(null);

const setCategories = async () => {
  try {
    filter.sort = 'todoCount';
    filter.limit = 5;
    filter.hasTodo = true;

    await getCategories();
  } catch (err) {
    if (!(err instanceof HandledError)) {
      emit('error');
    }
  }
};

const handleCategoryClick = (category) => {
  active.value = category.id === active.value ? null : category.id;
};

watch(active, () => {
  emit('click', active);
});

onBeforeMount(() => {
  loading.start('get-category');
});

onMounted(() => {
  setCategories();
});
</script>
