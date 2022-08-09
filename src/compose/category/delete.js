import { category as categoryApi } from '@/api';
import { useLoading, useError } from '@/store';
import { handleError } from '@/helpers';

export default () => {
  const loading = useLoading();
  const error = useError();

  const deleteCategory = async (id) => {
    loading.start('delete-category');
    error.reset('delete-category');

    try {
      await categoryApi.delete(id);
    } catch (err) {
      handleError('delete-category', err);
    } finally {
      loading.stop('delete-category');
    }
  };

  return { deleteCategory };
};
