import { ref } from 'vue';
import { useLoading } from '@/store';
import { category as categoryApi } from '@/api';

export default () => {
  const categories = ref({});

  const loading = useLoading();

  const getCategories = async () => {
    loading.start('get-category');

    try {
      const res = await categoryApi.get();

      categories.value = res.data;
    } catch (err) {
      throw err;
    } finally {
      loading.stop('get-category');
    }
  };

  return { categories, getCategories };
};
