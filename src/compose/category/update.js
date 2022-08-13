import { category as categoryApi } from '@/api';
import { useLoading, useError } from '@/store';
import { handleError } from '@/helpers';

export default () => {
  const loading = useLoading();
  const error = useError();

  const updateCategory = async (id, body) => {
    loading.start('update-category');
    error.reset('update-category');

    try {
      await categoryApi.update(id, body);
    } catch (err) {
      error.handle('update-category', err);
    } finally {
      loading.stop('update-category');
    }
  };

  return { updateCategory };
};
