import { get, post } from "./request.js"; //导入axios实例文件中方法

let baseUrl =
  process.env.NODE_ENV === "production" ? process.env.BASE_URL : "api";

// 分页查询商品列表-可带商品名称模糊查询
export const getListProducts = param => {
  return get(`${baseUrl}/product/listProducts`, param);
};

// 增加商品
export const addProduct = param => {
  return post(`${baseUrl}/product/addProduct`, param);
};

// 更新商品
export const updateProduct = param => {
  return post(`${baseUrl}/product/updateProduct`, param);
};

// 查询类别列表
export const getListCategorys = () => {
  return get(`${baseUrl}/category/listCategorys`);
};

// 类别增加
export const addCategory = param => {
  return post(`${baseUrl}/category/addCategory`, param);
};

// 类别修改
export const updateCategory = param => {
  return post(`${baseUrl}/category/updateCategory`, param);
};

// 查询规格列表
export const getListSpecsByProdId = param => {
  return get(`${baseUrl}/spec/ListSpecsByProdId`, param);
};

// 增加规格
export const addSpecInventory = param => {
  return post(`${baseUrl}/spec/addSpecInventory`, param);
};

// 删除规格
export const deleteSpec = param => {
  return post(`${baseUrl}/spec/deleteSpec`, param, {
    "content-type": "application/x-www-form-urlencoded"
  });
};

// 更新规格
export const updateSpec = param => {
  return post(`${baseUrl}/spec/updateSpec`, param);
};

// 订单列表
export const getOrderList = param => {
  return get(`${baseUrl}/orderInfo/listOrderListVO`, param);
};

// 用户列表
export const getUserList = param => {
  return get(`${baseUrl}/user/listUser`, param);
};

// 用户优惠券列表
export const getListUserCouponByUserId = param => {
  return get(`${baseUrl}/user/listUserCouponByUserId`, param);
};

// 查询优惠券模板列表
export const getCouponList = param => {
  return get(`${baseUrl}/couponTemplate/couponTemplate`, param);
};

// 新增优惠券模板
export const addCouponTemplate = param => {
  return post(`${baseUrl}/couponTemplate/addCouponTemplate`, param);
};

// 删除优惠券模板
export const deleteCouponTemplate = param => {
  return post(`${baseUrl}/couponTemplate`, param);
};

// 分配优惠券
export const distributionCoupon = param => {
  return post(`${baseUrl}/coupon`, param, {
    "content-type": "application/x-www-form-urlencoded"
  });
};

// 查询商品类型
export const getProductType = param => {
  return get(`${baseUrl}/dictionary/code`, param);
};

// 查询订单详情
export const getOrderDetailInfo = param => {
  return get(`${baseUrl}/orderInfo/orderDetailInfo`, param);
};

// 查询全部轮播图
export const getListCarousels = param => {
  return get(`${baseUrl}/carousel/listCarousels`, param);
};

// 增加轮播图
export const addCarousel = param => {
  return post(`${baseUrl}/carousel/addCarousel`, param);
};

// 删除轮播图
export const deleteCarousel = param => {
  return get(`${baseUrl}/carousel/deleteCarousel`, param);
};

// 更新轮播图
export const updateCarousel = param => {
  return post(`${baseUrl}/carousel/updateCarousel`, param);
};

// 修改轮播状态 失效 生效
export const updateCarouselStatus = param => {
  return post(`${baseUrl}/carousel/lowerShelf`, param);
};

// 登录
export const login = param => {
  return post(`${baseUrl}/admin/adminLogin`, param);
};

// 退出
export const loginOut = () => {
  return post(`${baseUrl}/admin/adminLoginOut`);
};

// 发货
export const deliver = param => {
  return post(`${baseUrl}/orderInfo/deliver`, param, {
    "content-type": "application/x-www-form-urlencoded"
  });
};

// 查询商品含有状态 PROD_STATUS
export const getProductStatus = param => {
  return get(`${baseUrl}/dictionary/code`, param);
};

// 下架商品
export const lowerShelfProduct = param => {
  return get(`${baseUrl}/product/lowerShelf`, param);
};

// 上架商品
export const upperShelfProduct = param => {
  return get(`${baseUrl}/product/upperShelf`, param);
};

// 类别生失效 0 失效 1 生效
export const updateCategoryStatus = param => {
  return post(`${baseUrl}/category/updateCategoryStatus`, param, {
    "content-type": "application/x-www-form-urlencoded"
  });
};
