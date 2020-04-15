<template>
  <div class="userlist tableData">
    <div class="userList" v-show="!isCoupon">
      <el-row class="top-box">
        <el-input
          class="search-input"
          placeholder="客户名称"
          prefix-icon="el-icon-search"
          v-model="searchValue"
        >
        </el-input>
        <el-button type="primary" @click="searchClick">搜索</el-button>
        <el-button type="success" @click="showDialog">分配优惠券</el-button>
      </el-row>
      <el-table border :data="userList">
        <el-table-column label="客户名称" prop="nickName"> </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.headImg" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="积分" prop="integral"> </el-table-column>
        <el-table-column label="电话号码" prop="telNumber"> </el-table-column>
        <el-table-column label="用户身份" prop="identity"> </el-table-column>
        <el-table-column label="创建时间" prop="createTime"> </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="gotoOrder(scope.row.nickName)"
              >订单</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="showCoupon(scope.row.id, scope.row.nickName)"
              >优惠券</el-button
            >
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
    <el-dialog
      title="分配优惠券"
      :visible.sync="dialogVisible"
      width="45%"
      append-to-body
    >
      <el-select v-model="couponId" placeholder="请选择" class="select-coupon">
        <el-option
          :label="item.name"
          :value="item.id"
          v-for="item in couponListAll"
          :key="item.id"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confrimAdd">确 定</el-button>
      </span>
    </el-dialog>
    <couponUser
      :userId="userId"
      :couponListAll="couponListAll"
      :userName="userName"
      v-show="isCoupon"
      v-on:cancel="showUserList"
    ></couponUser>
  </div>
</template>

<script>
import { getUserList, getCouponList, distributionCoupon } from "@/request/api";
import couponUser from "./components/coupon.vue";
export default {
  name: "userlist",
  data() {
    return {
      dialogVisible: false,
      couponId: "",
      couponListAll: [],
      pageIndex: 1,
      pageSize: 10,
      searchValue: "",
      loading: false,
      userList: [],
      userName: "",
      userId: "",
      isCoupon: false,
      total: 0
    };
  },
  components: {
    couponUser
  },
  methods: {
    currentChange(index) {
      this.pageIndex = index;
      this.getUserList();
    },
    showDialog() {
      this.couponId = "";
      this.dialogVisible = true;
    },
    showCoupon(id, name) {
      this.userId = id;
      this.userName = name;
      this.isCoupon = true;
    },
    showUserList() {
      this.isCoupon = false;
    },
    getCouponList() {
      getCouponList({
        pageIndex: 1,
        pageSize: 999
      })
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.couponListAll = res.data.resultObject.list;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getUserList() {
      if (this.loading) return false;
      this.loading = true;
      getUserList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        searchValue: this.searchValue
      })
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.userList = res.data.resultObject.list;
          }
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    searchClick() {
      this.getUserList();
    },
    gotoOrder(name) {
      this.$router.push({
        path: "/orderlist",
        query: { name: encodeURIComponent(name) }
      });
    },
    distributionCoupon() {
      if (this.loading) return false;
      this.loading = true;
      distributionCoupon({
        couponTemplateId: this.couponId,
        userIds: ""
      })
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.$message({
              message: "分配成功",
              type: "success"
            });
            this.dialogVisible = false;
            this.couponId = "";
          } else {
            this.$message({
              message: "分配失败",
              type: "warning"
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    confrimAdd() {
      this.$confirm("确定给所有用户分配该优惠券？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.distributionCoupon();
      });
    }
  },
  mounted() {
    this.getCouponList();
    this.getUserList();
  }
};
</script>

<style lang="less">
.userlist {
  .top-box {
    margin-bottom: 10px;
    .search-input {
      width: 200px;
      margin-right: 10px;
    }
    .select-box {
      margin-right: 10px;
    }
  }
  img {
    width: 80px;
    height: 80px;
  }
  .formPagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
}
</style>
