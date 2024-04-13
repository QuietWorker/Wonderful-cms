import { LOGIN_TOKEN } from '@/global/constants';
import { localCache } from '@/utils/cache';
import { createRouter, createWebHashHistory } from 'vue-router';
import { firstMenu } from '@/utils/mapMenu';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/Home.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
});

//导航守卫
//传入的是回调函数

//参数:to (跳转到的位置) /from(从哪里跳转过来)
//返回值: 返回值决定导航的路径

router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN);
  if (to.path.startsWith('/main') && !token) {
    //只有登录成功（token），才能真正的进入main页面
    return '/login';
  }
  // 如果是进入到main
  if (to.path === '/main') {
    return firstMenu?.url;
  }
});

export default router;
