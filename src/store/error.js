import { defineStore } from 'pinia';

export default defineStore('error', {
  state: () => ({
    errors: {},
  }),
  actions: {
    add: function (name, errors) {
      this.errors[name] = errors;
    },
    reset: function (name) {
      this.errors[name] = {};
    },
  },
});
