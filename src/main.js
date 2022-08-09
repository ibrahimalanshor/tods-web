import { createApp } from 'vue';
import { createPinia } from 'pinia';
import mitt from 'mitt';
import vClickOutside from 'click-outside-vue3';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';
import './main.css';
import 'vue-select/dist/vue-select.css';

const app = createApp(App);
const pinia = createPinia();
const emitter = mitt();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(vClickOutside);

app.provide('emitter', emitter);

app.mount('#app');
