import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)

const IndexLoadPage = () => import( /* webpackChunkName: "Index" */ '@/pages/index/Index.vue');
const LoginLoadPage = () => import( /* webpackChunkName: "Login" */ '@/pages/login/Login.vue');
const LiseLoadPage = () => import( /* webpackChunkName: "List" */ '@/pages/listManage/List.vue');
const RichLoadPage = () => import( /* webpackChunkName: "List" */ '@/pages/richEdit/Rich.vue');
const SettingLoadPage = () => import( /* webpackChunkName: "List" */ '@/pages/setting/setting.vue');
const ProductListPage = () => import( /* webpackChunkName: "List" */ '@/pages/product/index.vue');
const CategoryListPage = () => import( /* webpackChunkName: "List" */ '@/pages/category/index.vue');
const OrderListPage = () => import( /* webpackChunkName: "List" */ '@/pages/order/index.vue');
const UserListPage = () => import( /* webpackChunkName: "List" */ '@/pages/user/index.vue');
const CouponPage = () => import( /* webpackChunkName: "List" */ '@/pages/coupon/index.vue');
const CarouselPage = () => import( /* webpackChunkName: "List" */ '@/pages/carousel/index.vue');
const NotFoundPage = () => import( /* webpackChunkName: "List" */ '@/pages/404.vue');

let commonComponents = [{
  path: '/',
  component: IndexLoadPage,
  children: [
    {
      path: '/listManage/list',
      component: LiseLoadPage
    },
    {
      path: '/product',
      component: ProductListPage
    }, {
      path: '/category',
      component: CategoryListPage
    },
    {
      path: '/orderlist',
      component: OrderListPage
    },
    {
      path: '/user',
      component: UserListPage
    },
    {
      path: '/coupon',
      component: CouponPage
    },
    {
      path: '/carousel',
      component: CarouselPage
    },
    {
      
      path: '/richEdit/rich',
      component: RichLoadPage
    }, {
      path: '/setting',
      component: SettingLoadPage
    }
  ],
}, {
  path: '/login',
  component: LoginLoadPage
}, { path: '*', component: NotFoundPage }]

const router = new Router({
  mode: 'history',
  routes: commonComponents
});

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (localStorage.getItem('isLogin')) {
      next();
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next();
  }
})


export default router