import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuth } from '@/store';
import authApi from './auth.js';

export default () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  const router = useRouter();
  const auth = useAuth();

  if (auth.isLogin) {
    instance.defaults.headers.common['Authorization'] = auth.token.accessToken;
  }

  instance.interceptors.request.use(async (config) => {
    if (auth.isLogin && Date.now() > auth.decoded.exp * 1000) {
      try {
        const res = await authApi.refreshToken(auth.token.refreshToken);

        auth.refreshToken(res.data);
        config.headers['Authorization'] = res.data;
      } catch (err) {
        auth.logout();

        router.push({ name: 'Login' });
      }
    }

    return config;
  });

  return instance;
};
