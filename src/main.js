import { createApp } from 'vue';
import { createPinia } from 'pinia';
import vClickOutside from 'click-outside-vue3';
import App from './App.vue';
import router from './router';
import './main.css';
import 'vue-select/dist/vue-select.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vClickOutside);

app.mount('#app');
