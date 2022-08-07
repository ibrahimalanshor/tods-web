import { defineStore } from 'pinia';

export default defineStore('auth', {
  persist: true,
  state: () => ({
    isLogin: false,
    accessToken: null,
    refreshToken: null,
  }),
  actions: {
    login: function (accessToken, refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.isLogin = true;
    },
  },
});
