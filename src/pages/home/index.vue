<template>
  <div class="home-container">
    <el-row :gutter="20" class="mat15">
      <el-col :span="6">
        <el-card shadow="always" class="card-box">
          <div class="num">{{ data.currentOrderNum || 0 }}</div>
          <div class="text">今日订单量</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="card-box">
          <div class="num">¥{{ data.currentDayMoney || "0" }}</div>
          <div class="text">今日营业额</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="card-box">
          <div class="num">¥{{ data.currentMonthMoney || "0" }}</div>
          <div class="text">月营业额</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="card-box">
          <div class="num">¥{{ data.totalMoney || "0" }}</div>
          <div class="text">总营业额</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mat15">
      <el-col :span="6">
        <el-card shadow="always" class="card-box">
          <div class="num">{{ data.newUserNum || 0 }}</div>
          <div class="text">新用户数量</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="card-box">
          <div class="num">{{ data.totalUserNum || 0 }}</div>
          <div class="text">总用户量</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="card-box">
          <div class="num">{{ data.orderUserNum || 0 }}</div>
          <div class="text">下单用户数量</div>
        </el-card>
      </el-col>
      <el-col :span="6" @click.native="gotoOrder">
        <el-card shadow="always" class="card-box pointer">
          <div class="num">{{ data.waitDeliverOrderNum || 0 }}</div>
          <div class="text">待发货订单数量</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mat15">
      <el-col :span="6" @click.native="gotoComment">
        <el-card shadow="always" class="card-box pointer">
          <div class="num">{{ data.waitCheckComment || 0 }}</div>
          <div class="text">待审核评论数</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getIndexNum } from "@/request/api";

export default {
  name: "home",
  data() {
    return {
      data: {}
    };
  },
  created() {
    this.getIndexNum();
  },
  methods: {
    getIndexNum() {
      getIndexNum()
        .then(res => {
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.data = res.data.resultObject;
          } else {
            this.$message.error(res.data.resultObject);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("查询失败");
        });
    },
    gotoComment() {
      console.log(this.$router);
      this.$router.push({
        path: "/comment"
      });
    },
    gotoOrder() {
      this.$router.push({
        path: "/orderlist",
        query: { status: 2 } // 待发货
      });
    }
  }
};
</script>

<style lang="less">
.home-container {
  .card-box {
    text-align: center;
    padding: 10px;
    .num {
      font-size: 32px;
      margin-bottom: 20px;
      color: #38b8db;
    }
    .text {
      font-size: 14px;
    }
  }
  .mat15 {
    margin-top: 15px;
  }
  .pointer {
    cursor: pointer;
  }
}
</style>
