import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface YYRequestInterceptors {
  //请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;

  //响应拦截
  responseInterceptors?: <T = AxiosResponse>(config: T) => T;
  responseInterceptorsCatch?: (err: any) => any;
}

//定义好基础的拦截器后，我们需要改造我们传入的参数的类型，因为axios提供的AxiosRequestConfig是不允许我们传入拦截器的，所以说我们自定义了RequestConfig，让其继承与AxiosRequestConfig   更具有可扩展性
export interface YYRequestConfig extends AxiosRequestConfig {
  //给AxiosRequestConfig新增一个interceptors属性 类型为YYRequestInterceptors
  //扩展Axios请求配置的类型
  //可选
  interceptors?: YYRequestInterceptors;
}
