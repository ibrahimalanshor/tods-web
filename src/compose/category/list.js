import { ref, reactive } from 'vue';
import { useLoading } from '@/store';
import { category as categoryApi } from '@/api';

export default () => {
  const categories = ref({});
  const filter = reactive({
    sort: null,
    order: null,
  });

  const loading = useLoading();

  const getCategories = async () => {
    loading.start('get-category');

    try {
      const res = await categoryApi.get(filter);

      categories.value = res.data;
    } catch (err) {
      throw err;
    } finally {
      loading.stop('get-category');
    }
  };

  return { categories, filter, getCategories };
};
