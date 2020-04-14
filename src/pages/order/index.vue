<template>
  <div class="orderlist tableData">
    <div class="orderList" v-show="!isDetail">
      <el-row class="top-box">
        <el-input
          class="search-input"
          placeholder="订单号/客户名称"
          prefix-icon="el-icon-search"
          v-model="searchValue">
        </el-input>
        <el-select v-model="status" placeholder="请选择" class="select-box">
            <el-option label="全部" value=""></el-option>
            <el-option label="待支付" value="1"></el-option>
            <el-option label="待发货" value="2"></el-option>
            <el-option label="待收货" value="3"></el-option>
            <el-option label="待评价" value="4"></el-option>
            <el-option label="已完成" value="5"></el-option>
        </el-select>
        <el-button type="primary" @click="searchClick">搜索</el-button>
      </el-row>
       <el-table border :data="orderList">
        <el-table-column
          label="订单号"
          prop="orderInfoId">
        </el-table-column>
        <el-table-column
          label="客户名称"
          prop="nickName">
        </el-table-column>
        <el-table-column
          label="订单数量"
          prop="num"
          width="50px">
        </el-table-column>
        <el-table-column
          label="订单状态">
          <template slot-scope="scope">
            <span>{{statusObj[scope.row.status]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="总价"
          prop="totalfee">
        </el-table-column>
        <el-table-column
          label="实际付款"
          prop="payfee">
        </el-table-column>
        <el-table-column
          label="优惠金额"
          prop="couponFee">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="showDetail(scope.row.orderInfoId)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="formPagination"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
    ></el-pagination>
    </div>
    <detail v-show="isDetail" :orderId="orderId" v-on:cancel="closeForm"></detail>
  </div>
</template>

<script>
import { getOrderList } from '@/request/api'
import detail from './components/detail.vue'
export default {
  name: "orderlist",
  components:{
    detail
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      searchValue: '',
      isDetail: false,
      statusObj: {
        '1': '待支付',
        '2': '待发货',
        '3': '待收货',
        '4': '待评价',
        '5': '已完成'
      },
      status: '', // 状态-展示 1-待支付 、2-待发货 、3-待收获、4-待评价
      loading: false,
      orderList: [],
      total: 0,
      orderId: ''
    };
  },
  methods: {
    showDetail (id) {
      this.orderId = id
      this.isDetail = true
    },
    currentChange(index) {
      this.pageIndex = index
      this.getOrderList()
    },
    closeForm() {
      this.isDetail = false
    },
    getOrderList() {
      if (this.loading) return false
      this.loading = true
      getOrderList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        searchValue: this.searchValue,
        status: this.status
      }).then((res)=>{
        this.loading = false
        if (res.status === 200 && res.data.resultCode === '000001') {
          this.orderList = res.data.resultObject.list
          this.total = res.data.resultObject.total
        }
      }).catch((error)=>{
        this.loading = false
      })
    },
    searchClick () {
      this.getOrderList()
    }
  },
  mounted () {
    console.log(this.$route)
    if (this.$route.query.name) {
      this.searchValue = decodeURIComponent(this.$route.query.name)
    }
    this.getOrderList()
  }
};
</script>

<style lang="scss">
.orderlist {
  .top-box{
    margin-bottom: 10px;
    .search-input{
      width: 200px;
      margin-right: 10px;
    }
    .select-box{
        margin-right: 10px;
    }
  }
  .formPagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
}
</style>

