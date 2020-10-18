import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
const app = createApp(App)
import * as Icons from 

let icons: any = Icons
console.log(icons);


createApp(App).use(store).use(router).mount('#app')
