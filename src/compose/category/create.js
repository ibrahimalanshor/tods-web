import { category as categoryApi } from '@/api';
import { useLoading, useError } from '@/store';
import { handleError } from '@/helpers';

export default () => {
  const loading = useLoading();
  const error = useError();

  const createCategory = async (body) => {
    loading.start('create-category');
    error.reset('create-category');

    try {
      await categoryApi.create(body);
    } catch (err) {
      error.handle('create-category', err);
    } finally {
      loading.stop('create-category');
    }
  };

  return { createCategory };
};
