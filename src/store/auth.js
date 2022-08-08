import { defineStore } from 'pinia';
import jwtDecode from 'jwt-decode';

export default defineStore('auth', {
  persist: true,
  state: () => ({
    isLogin: false,
    token: {
      accessToken: null,
      refreshToken: null,
    },
  }),
  getters: {
    decoded: function (state) {
      return jwtDecode(state.token.accessToken);
    },
    expire: function (state) {
      return Date.now() > this.decoded.exp * 1000;
    },
  },
  actions: {
    login: function (accessToken, refreshToken) {
      this.token.accessToken = accessToken;
      this.token.refreshToken = refreshToken;
      this.isLogin = true;
    },
    refreshToken: function (accessToken) {
      this.token.accessToken = accessToken;
    },
    logout: function () {
      this.token.accessToken = null;
      this.token.refreshToken = null;
      this.isLogin = false;
    },
  },
});
