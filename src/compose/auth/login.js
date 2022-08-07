import { reactive, ref } from 'vue';
import { auth as authApi } from '@/api';
import { handleError } from '@/helpers';
import { useError, useLoading, useAuth } from '@/store';

export default () => {
  const body = reactive({
    email: null,
    password: null,
  });

  const auth = useAuth();
  const error = useError();
  const loading = useLoading();

  const login = async () => {
    error.reset('login');
    loading.start('login');

    try {
      const res = await authApi.login(body);

      auth.login(res.data.accessToken, res.data.refreshToken);
    } catch (err) {
      handleError('login', err);
    } finally {
      loading.stop('login');
    }
  };

  return { body, login };
};
