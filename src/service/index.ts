import { localCache } from '@/utils/cache';
import { BASE_URL, TIME_OUT } from './config';
import YYRequest from './request';
import { LOGIN_TOKEN } from '@/global/constants';

const yyRequest = new YYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  //实例拦截器
  interceptors: {
    //每一个请求都自动携带token
    requestInterceptors: (config) => {
      // 每一个请求都自动携带token
      const token = localCache.getCache(LOGIN_TOKEN);
      if (config.headers && token) {
        // 类型缩小
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
  }
});

export default yyRequest;
