import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import * as Icons from '@ant-design/icons-vue'


const app = createApp();
app.config.productionTip = false;

app.use(Antd);
let icons: any = Icons
console.log(icons);
for (let i in icons) {
    app.component(i, icons[i])
}


createApp(App).use(store).use(router).mount('#app')
