import { ref } from 'vue';
import { category as categoryApi } from '@/api';
import { useLoading, useError } from '@/store';

export default () => {
  const loading = useLoading();
  const error = useError();
  const category = ref({});

  const viewCategory = async (id) => {
    loading.start('view-category');
    error.reset('view-category');

    try {
      const res = await categoryApi.view(id);

      category.value = res.data;
    } catch (err) {
      error.handle('view-category', err);
    } finally {
      loading.stop('view-category');
    }
  };

  return { category, viewCategory };
};
