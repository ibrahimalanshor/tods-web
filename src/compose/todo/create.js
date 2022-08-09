import { todo as todoApi } from '@/api';
import { useLoading, useError } from '@/store';
import { handleError } from '@/helpers';

export default () => {
  const loading = useLoading();
  const error = useError();

  const createTodo = async (body) => {
    loading.start('create-todo');
    error.reset('create-todo');

    try {
      await todoApi.create({
        ...body,
        categoryId: body.categoryId?.id,
      });
    } catch (err) {
      handleError('create-todo', err);
    } finally {
      loading.stop('create-todo');
    }
  };

  return { createTodo };
};
