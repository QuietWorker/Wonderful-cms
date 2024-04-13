//1.区分开发环境和生产环境

//1.1用到哪个就注释掉另一个
// export const BASE_URL = 'http://123.207.32.32:5000';
// export const BASE_URL = 'http://123.207.32.32:8000';

//1.2
//vite提供的默认的环境变量
console.log(import.meta.env.MODE); //development
console.log(import.meta.env.DEV); //是否开发环境
console.log(import.meta.env.PROD); //是否生产环境 返回的都是布尔值

let BASE_URL = '';
if (import.meta.env.PROD) {
  //生产环境
  BASE_URL = 'http://123.207.32.32:5000';
} else {
  //开发环境
  BASE_URL = 'http://123.207.32.32:5000';
}

//1.3通过创建.env文件直接创建变量

export const TIME_OUT = 10000;
export { BASE_URL };
