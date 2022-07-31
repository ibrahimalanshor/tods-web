import { defineStore } from 'pinia';

export default defineStore('sidebar', {
  state: () => ({
    isCollapsed: true,
  }),
  actions: {
    show: function () {
      this.isCollapsed = false;
    },
    hide: function () {
      this.isCollapsed = true;
    },
    toggle: function () {
      this.isCollapsed = !this.isCollapsed;
    },
  },
});
