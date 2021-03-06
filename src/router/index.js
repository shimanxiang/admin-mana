import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const IndexLoadPage = () =>
  import(/* webpackChunkName: "Index" */ "@/pages/index/Index.vue");
const HomeLoadPage = () =>
  import(/* webpackChunkName: "Index" */ "@/pages/home/index.vue");
const LoginLoadPage = () =>
  import(/* webpackChunkName: "Login" */ "@/pages/login/Login.vue");
const SettingLoadPage = () =>
  import(/* webpackChunkName: "setting" */ "@/pages/setting/setting.vue");
const ProductListPage = () =>
  import(/* webpackChunkName: "List" */ "@/pages/product/index.vue");
const CategoryListPage = () =>
  import(/* webpackChunkName: "List" */ "@/pages/category/index.vue");
const OrderListPage = () =>
  import(/* webpackChunkName: "order" */ "@/pages/order/index.vue");
const UserListPage = () =>
  import(/* webpackChunkName: "user" */ "@/pages/user/index.vue");
const CouponPage = () =>
  import(/* webpackChunkName: "coupon" */ "@/pages/coupon/index.vue");
const CarouselPage = () =>
  import(/* webpackChunkName: "carousel" */ "@/pages/carousel/index.vue");
const SitePage = () =>
  import(/* webpackChunkName: "carousel" */ "@/pages/site/index.vue");
const NoticePage = () =>
  import(/* webpackChunkName: "carousel" */ "@/pages/notice/index.vue");
const NotFoundPage = () =>
  import(/* webpackChunkName: "List" */ "@/pages/404.vue");
const CommentPage = () =>
  import(/* webpackChunkName: "List" */ "@/pages/comment/index.vue");
let commonComponents = [
  {
    path: "/",
    component: IndexLoadPage,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: "/",
        component: HomeLoadPage
      },
      {
        path: "/product",
        component: ProductListPage
      },
      {
        path: "/category",
        component: CategoryListPage
      },
      {
        path: "/orderlist",
        component: OrderListPage
      },
      {
        path: "/user",
        component: UserListPage
      },
      {
        path: "/coupon",
        component: CouponPage
      },
      {
        path: "/comment",
        component: CommentPage
      },
      {
        path: "/site",
        component: SitePage
      },
      {
        path: "/notice",
        component: NoticePage
      },
      {
        path: "/carousel",
        component: CarouselPage
      },
      {
        path: "/setting",
        component: SettingLoadPage
      }
    ]
  },
  {
    path: "/login",
    component: LoginLoadPage
  },
  { path: "*", component: NotFoundPage }
];

const router = new Router({
  mode: "history",
  base: process.env.NODE_ENV === "production" ? "/dist/" : "/",
  routes: commonComponents
});

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (sessionStorage.getItem("isLogin")) {
      next();
    } else {
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
});

export default router;
