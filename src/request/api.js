import { get, post } from './request.js' //导入axios实例文件中方法

let bsae_api = process.env.BASE_URL

console.log(bsae_api)

// 分页查询商品列表-可带商品名称模糊查询
export const getListProducts = (param) =>{
    return get(`api/product/listProducts`, param);
}

// 增加商品
export const addProduct = (param) =>{
    return post(`api/product/addProduct`, param); 
}

// 更新商品
export const updateProduct = (param) =>{
    return post(`api/product/updateProduct`, param); 
}

// 下架商品
export const deleteProduct = (param) =>{
    return post(`api/product/lowerShelf`, param); 
}

// 查询类别列表
export const getListCategorys = () =>{
    return get(`api/category/listCategorys`); 
}

// 类别增加
export const addCategory = (param) =>{
    return post(`api/category/addCategory`, param); 
}

// 类别修改
export const updateCategory = (param) =>{
    return post(`api/category/updateCategory`, param); 
}

// 类别删除
export const deleteCategory = (param) =>{
    return post(`api/category/delete`, param, {'content-type': 'application/x-www-form-urlencoded'}); 
}

// 查询规格列表
export const getListSpecsByProdId = (param) =>{
    return get(`api/spec/ListSpecsByProdId`, param); 
}

// 增加规格
export const addSpecInventory = (param) =>{
    return post(`api/spec/addSpecInventory`, param); 
}

// 订单列表
export const getOrderList = (param) =>{
    return get(`api/orderInfo/listOrderListVO`, param); 
}

// 用户列表
export const getUserList = (param) =>{
    return get(`api/user/listUser`, param); 
}

// 查询优惠券模板列表
export const getCouponList = (param) =>{
    return get(`api/couponTemplate/couponTemplate`, param); 
}

// 新增优惠券模板
export const addCouponTemplate = (param) =>{
    return post(`api/couponTemplate/addCouponTemplate`, param); 
}

// 删除优惠券模板
export const deleteCouponTemplate = (param) =>{
    return post(`api/couponTemplate`, param); 
}
