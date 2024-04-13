import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { YYRequestConfig, YYRequestInterceptors } from './type';

//拦截器:蒙版Loading/token/修改配置

/*
  两个难点:
  1.拦截器进行精细控制
  >全局拦截器
  >实例拦截器
  >单次请求拦截器
  2.响应结果的类型处理(泛型)
*/

class YYRequest {
  instance: AxiosInstance;
  interceptorsObj?: YYRequestInterceptors;
  //request =>axios的实例
  constructor(config: YYRequestConfig) {
    //把请求配置类型换成自己的接口 就可以定义interceptors属性
    //axios.create创建一个实例
    this.instance = axios.create(config);
    this.interceptorsObj = config.interceptors;
    //每个instance实例都添加拦截器
    //类拦截器 :只需要在类中对axios.create()创建的实例调用interceptors下的两个拦截器即可
    //request 添加请求全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        //loading/token
        console.log('全局请求成功的拦截');
        return config;
      },
      (err: any) => {
        console.log('全局请求失败的拦截');
        return err;
      }
    );

    //使用实例拦截器
    //针对特定的yyRequest实例添加拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    );
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    );
    //全局响应拦截器放到最后是为了保证最后执行
    //response 添加响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        //loading/token
        console.log('全局响应成功的拦截');
        return res.data;
        //将请求结果中的.data进行返回,跟.data同级的属性我们基本是不需要的
      },
      (err) => {
        console.log('全局响应失败的拦截');
        return err;
      }
    );

    //拦截器的执行顺序为 实例请求->类请求->实例响应->类响应
  }

  //封装网络请求的方法
  //请求者决定返回的是什么类型 所以用泛型
  request<T>(config: YYRequestConfig): Promise<T> {
    //单次请求的成功拦截处理
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }
          //将结果resolve返回出去
          resolve(res);
        })
        .catch((err) => {
          return err;
        });
    });
  }

  get<T = any>(config: YYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }
  post<T = any>(config: YYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }
  delete<T = any>(config: YYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }
  patch<T = any>(config: YYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' });
  }
}

export default YYRequest;
