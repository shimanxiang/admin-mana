const menus = [
  {
    path: "/",
    name: "首页",
    meta: true,
    icon: "el-icon-house"
  },
  {
    path: "/listManage",
    name: "商品管理",
    icon: "el-icon-document",
    meta: true,
    children: [
      {
        path: "/product",
        name: "商品模块"
      },
      {
        path: "/category",
        name: "商品类别"
      }
    ]
  },
  {
    path: "/coupon",
    name: "优惠券管理",
    meta: true,
    icon: "el-icon-postcard"
  },
  {
    path: "/carousel",
    name: "轮播图管理",
    meta: true,
    icon: "el-icon-picture-outline"
  },
  {
    path: "/orderlist",
    name: "订单列表",
    meta: true,
    icon: "el-icon-shopping-cart-2"
    // children: [{
    //     path: '/orderlist',
    //     name: '订单列表'
    // }],
  },
  {
    path: "/comment",
    name: "评论审核",
    meta: true,
    icon: "el-icon-chat-line-square"
  },
  {
    path: "/user",
    name: "用户列表",
    meta: true,
    icon: "el-icon-user"
  },
  {
    path: "/site",
    name: "站点管理",
    meta: true,
    icon: "el-icon-location-outline"
  },
  {
    path: "/notice",
    name: "通知管理",
    meta: true,
    icon: "el-icon-alarm-clock"
  }
];

export default menus;
