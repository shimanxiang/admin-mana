const menus = [{
        path: '/',
        name: '首页',
        meta: true,
        icon: 'el-icon-house',
    },
    {
        path: '/listManage',
        name: '商品管理',
        icon: 'el-icon-document',
        children: [{
            path: '/product',
            name: '商品模块'
        },{
            path: '/category',
            name: '商品类别'
        }],
    },
    {
        path: '/coupon',
        name: '优惠券管理',
        icon: 'el-icon-postcard',
    },
    {
        path: '/orderlist',
        name: '订单列表',
        icon: 'el-icon-shopping-cart-2'
        // children: [{
        //     path: '/orderlist',
        //     name: '订单列表'
        // }],
    },
    {
        path: '/user',
        name: '用户列表',
        icon: 'el-icon-user',
    }
]

export default menus;