import { defineStore } from 'pinia';

export default defineStore('error', {
  state: () => ({
    errors: {},
  }),
  getters: {
    get: (state) => (name) => state.errors[name],
  },
  actions: {
    add: function (name, errors) {
      this.errors[name] = errors;
    },
    reset: function (name) {
      this.errors[name] = {};
    },
  },
});
