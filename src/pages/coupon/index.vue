<template>
  <div class="coupon tableData">
    <div class="couponList" v-show="!isForm">
      <el-row class="top-box">
        <el-button type="success" icon="el-icon-plus" @click="addBtnClick"
          >新增优惠券</el-button
        >
      </el-row>
      <el-table border :data="couponList">
        <el-table-column label="名称" prop="name"> </el-table-column>
        <el-table-column label="优惠额度" prop="denomination">
        </el-table-column>
        <el-table-column label="使用规则">
          <template slot-scope="scope">
            <pre>{{ scope.row.ruleDesc }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="生效时间" prop="effTime"> </el-table-column>
        <el-table-column label="失效时间" prop="expTime"> </el-table-column>
        <el-table-column label="优惠券类型">
          <template slot-scope="scope">
            <span>{{
              scope.row.type == "1"
                ? "价格限制"
                : scope.row.type == "2"
                ? "产品限制"
                : "商品类别限制"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最低限制金额" prop="limitPrice">
        </el-table-column>
        <el-table-column label="限制商品名称" prop="limitProductName">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="delList(scope.$index, scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="formPagination"
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="currentChange"
      ></el-pagination>
    </div>
    <couponForm
      v-show="isForm"
      :formItem="formItem"
      v-on:cancel="closeForm"
    ></couponForm>
  </div>
</template>

<script>
import { getCouponList, deleteCouponTemplate } from "@/request/api";
import couponForm from "./components/couponForm.vue";
export default {
  name: "coupon",
  data() {
    return {
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      isForm: false,
      formItem: {},
      loading: false,
      couponList: []
    };
  },
  components: {
    couponForm
  },
  methods: {
    currentChange(index) {
      this.pageIndex = index;
      this.getCouponList();
    },
    closeForm() {
      this.getCouponList();
      this.isForm = false;
    },
    delList(index, id) {
      this.$confirm("此操作将永久删除，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.deleteCouponTemplate(index, id);
      });
    },
    getCouponList() {
      if (this.loading) return false;
      this.loading = true;
      getCouponList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.couponList = res.data.resultObject.list;
            this.total = res.data.resultObject.total;
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    addBtnClick() {
      this.formItem = {};
      this.isForm = true;
    },
    deleteCouponTemplate(index, id) {
      if (this.loading) return false;
      this.loading = true;
      deleteCouponTemplate({
        couponTemplateId: id
      })
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.couponList.splice(index, 1);
            this.total -= 1;
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    }
  },
  mounted() {
    this.getCouponList();
  }
};
</script>

<style lang="less">
.coupon {
  .top-box {
    margin-bottom: 10px;
  }
  .formPagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
}
</style>
