import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import * as Icons from '@ant-design/icons-vue';

const app = createApp(App);
app.use(store);
app.use(router).mount('#app');
app.use
const icons: any = Icons;
for (let i in icons) {
    app.component(i, icons[i]);
}