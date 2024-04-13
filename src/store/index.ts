import { createPinia } from 'pinia';
import type { App } from 'vue';
import useLoginStore from './login/login';

const pinia = createPinia();

function registerStore(app: App<Element>) {
  //1.use的pinia
  app.use(pinia);
  //2.加载本地的数据
  const loginStore = useLoginStore();
  loginStore.loadLocalCacheAction(); //这里的方法没加() 让我找了一天的bug
}

export default registerStore;
