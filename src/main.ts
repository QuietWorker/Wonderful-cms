import { createApp } from 'vue';
import './assets/css/index.less';
import 'normalize.css';

import App from './App.vue';
import router from './router';
import store from './store';
//引入全局图标
import icons from '@/global/register-icons';

//按需引入ELementPlus 用到哪个组件再引入

const app = createApp(App);
app.use(icons);
app.use(store); //这里要放在引入router前 确保路由映射添加完成再去调用router添加路由
app.use(router);
app.mount('#app');
