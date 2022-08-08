import { defineStore } from 'pinia';

export default defineStore('loading', {
  state: () => ({
    items: {},
  }),
  getters: {
    get: (state) => (name) => state.items[name],
  },
  actions: {
    start: function (name) {
      this.items[name] = true;
    },
    stop: function (name) {
      this.items[name] = false;
    },
  },
});
