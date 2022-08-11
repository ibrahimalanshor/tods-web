import { ref, reactive } from 'vue';
import { useLoading, useError } from '@/store';
import { category as categoryApi } from '@/api';

export default () => {
  const categories = ref({});
  const filter = reactive({
    sort: null,
    order: null,
    name: null,
    limit: null,
  });

  const loading = useLoading();
  const error = useError();

  const getCategories = async () => {
    loading.start('get-category');
    error.reset('get-category');

    try {
      const res = await categoryApi.get(filter);

      categories.value = res.data;
    } catch (err) {
      error.handle('view-category', err);
    } finally {
      loading.stop('get-category');
    }
  };

  return { categories, filter, getCategories };
};
