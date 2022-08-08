import { auth as authApi } from '@/api';
import { useAuth } from '@/store';

export default async (to, from) => {
  const auth = useAuth();

  if (auth.isLogin && auth.expire) {
    try {
      const res = await authApi.refreshToken(auth.token.refreshToken);

      auth.refreshToken(res.data);
    } catch (err) {
      auth.logout();

      return { name: 'Login' };
    }
  }
};
