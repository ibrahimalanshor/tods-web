import { auth as authApi } from '@/api';
import { useLoading, useAuth } from '@/store';

export default () => {
  const auth = useAuth();
  const loading = useLoading();

  const logout = async () => {
    loading.start('logout');

    try {
      await authApi.logout(auth.token.refreshToken);
    } catch (err) {
    } finally {
      auth.logout();
      loading.stop('logout');
    }
  };

  return { logout };
};
