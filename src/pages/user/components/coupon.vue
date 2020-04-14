<template>
  <div class="coupon tableData">
    <el-page-header class="spec-header" @back="goBack" :content="headerTxt">
    </el-page-header>
    <div class="couponList">
      <div class="coupon-title">分配优惠券</div>
      <el-row class="top-box">
        <el-select v-model="couponId" placeholder="请选择" class="select-coupon">
            <el-option :label="item.name" :value="item.id" v-for="item in couponListAll" :key="item.id"></el-option>
        </el-select>
        <el-button type="primary" @click="clickCouponBtn">确定</el-button>
      </el-row>
       <div class="coupon-title">优惠券列表</div>
       <el-table border :data="couponList">
        <el-table-column
          label="名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="使用规则">
          <template slot-scope="scope">
            <pre>{{ scope.row.ruleDesc }}</pre>
          </template>
        </el-table-column>
        <el-table-column
          label="生效时间"
          prop="effTime">
        </el-table-column>
        <el-table-column
          label="失效时间"
          prop="expTime">
        </el-table-column>
        <el-table-column
          label="优惠券类型">
          <template slot-scope="scope">
            <span>{{scope.row.type == '1' ? '价格限制' : scope.row.type == '2' ? '产品限制' : '商品类别限制'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否已删除">
          <template slot-scope="scope">
            <span>{{scope.row.isDel == '1' ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="最低限制金额"
          prop="limitPrice">
        </el-table-column>
        <el-table-column
          label="限制商品名称"
          prop="limitProductName">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getListUserCouponByUserId, distributionCoupon } from '@/request/api'
export default {
  name: "couponUser",
  props:{
    userId:String,
    userName:String,
    couponListAll: Array
  },
  data() {
    return {
      headerTxt: '优惠券',
      couponId: '',
      loading: false,
      couponList: []
    };
  },
  watch: {
    userId () {
        if (this.userId) {
          if (this.userName) {
            this.headerTxt = this.userName + '的优惠券'
          }
          this.getListUserCouponByUserId()
        }
    }
  },
  methods: {
    getListUserCouponByUserId() {
      if (this.loading) return false
      this.loading = true
      getListUserCouponByUserId({
        userId: this.userId,
      }).then((res)=>{
        this.loading = false
        if (res.status === 200 && res.data.resultCode === '000001') {
          this.couponList = []
          this.couponList = res.data.resultObject
        }
      }).catch((error)=>{
        this.loading = false
      })
    },
    distributionCoupon () {
      if (this.loading) return false
      this.loading = true
      distributionCoupon({
        couponTemplateId: this.couponId,
        userIds: this.userId,
      }).then((res)=>{
        this.loading = false
        if (res.status === 200 && res.data.resultCode === '000001') {
          this.getListUserCouponByUserId()
          this.$message({
            message: "分配成功",
            type: "success"
          });
        } else {
            this.$message({
                message: "分配失败",
                type: "warning"
            });
        }
      }).catch((error)=>{
        this.loading = false
        this.$message({
            message: "分配失败",
            type: "warning"
        });
      })
    },
    clickCouponBtn () {
      this.distributionCoupon()
    },
    goBack () {
      this.$emit('cancel')
    },
  }
};
</script>

<style lang="scss">
.coupon {
  .top-box{
    margin-bottom: 10px;
  }
  .coupon-title{
    margin: 20px 0px;
    font-weight: bold;
  }
  .formPagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
  .spec-header{
    margin: 10px 0 30px 0;
  }
  .el-page-header__content {
    font-size: 15px;
  }
  .select-coupon{
    margin-right: 10px;
  }
}
</style>

