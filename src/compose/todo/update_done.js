import { todo as todoApi } from '@/api';
import { useLoading, useError } from '@/store';
import { handleError } from '@/helpers';

export default () => {
  const loading = useLoading();
  const error = useError();

  const updateTodoDone = async (id, done) => {
    loading.start('update-done-todo');
    error.reset('update-done-todo');

    try {
      await todoApi.updateDone(id, done);
    } catch (err) {
      handleError('update-done-todo', err);
    } finally {
      loading.stop('update-done-todo');
    }
  };

  return { updateTodoDone };
};
