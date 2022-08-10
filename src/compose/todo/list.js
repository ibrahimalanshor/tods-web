import { ref, reactive } from 'vue';
import { useLoading } from '@/store';
import { todo as todoApi } from '@/api';

export default () => {
  const todos = ref({});
  const filter = reactive({
    sort: null,
    order: null,
    status: null,
    due: null,
    late: null,
    categoryId: null,
  });

  const loading = useLoading();

  const getTodos = async () => {
    loading.start('get-todo');

    try {
      const res = await todoApi.get(filter);

      todos.value = res.data;
    } catch (err) {
      throw err;
    } finally {
      loading.stop('get-todo');
    }
  };

  return { todos, filter, getTodos };
};
