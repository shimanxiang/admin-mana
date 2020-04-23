<template>
  <div class="order-confirm">
    <el-page-header class="order-header" @back="goBack" content="订单详情">
    </el-page-header>
    <el-card>
      <div class="order-info">
        <div class="title">订单信息</div>
        <div>创建时间：{{ orderInfo.createTime }}</div>
        <div>订单编号：{{ orderInfo.orderId }}</div>
        <div>支付流水号：{{ orderInfo.transactionId }}</div>
        <div>订单状态：{{ orderInfo.orderStatusDesc }}</div>
        <div>支付时间： {{ orderInfo.payTime }}</div>
        <div>实际支付金额：{{ orderInfo.wxPayMoney }}</div>
        <div>包装费：{{ orderInfo.packingCharges }}</div>
        <div>配送费：{{ orderInfo.distributionFee }}</div>
        <div>
          优惠金额：{{ orderInfo.couponDenomination || "未使用任何优惠" }}
        </div>
        <div>总费用(不包含配送费 打包费)：{{ orderInfo.totalFee }}</div>
        <div>
          订单实际总价(商品价+打包费+配送费-优惠券金额)：{{
            orderInfo.orderFee
          }}
        </div>
        <div>使用积分数：{{ orderInfo.integral }}</div>
        <div>送货方式：{{ orderInfo.deleveryTypeDesc }}</div>
        <div>配送时间：{{ orderInfo.userDeliveryTime }}</div>
        <div v-if="orderInfo.site">
          自提站点负责人：{{ orderInfo.site.name }}
        </div>
        <div v-if="orderInfo.site">
          自提站点电话：{{ orderInfo.site.telephone }}
        </div>
        <div v-if="orderInfo.site">
          自提站点地址：{{ orderInfo.site.code1 }}{{ orderInfo.site.code2
          }}{{ orderInfo.site.code3 }}{{ orderInfo.site.addressDetails }}
        </div>
        <div v-if="orderInfo.address">
          收货人姓名：{{ orderInfo.address.name }}
        </div>
        <div v-if="orderInfo.address">
          收货人电话：{{ orderInfo.address.telephone }}
        </div>
        <div v-if="orderInfo.address">
          收货地址：{{ orderInfo.address.code1 }}{{ orderInfo.address.code2
          }}{{ orderInfo.address.code3 }}{{ orderInfo.address.addressDetails }}
        </div>
      </div>
      <div class="title mrt10">购买商品信息</div>
      <el-table :data="orderInfo.prodItemList" border>
        <el-table-column prop="prodName" label="商品名称"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img :src="scope.row.image" alt="" srcset="" />
          </template>
        </el-table-column>
        <el-table-column prop="prodTypeDesc" label="商品类型"></el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
        <el-table-column prop="num" label="数量"></el-table-column>
        <el-table-column prop="specDesc" label="规格描述"></el-table-column>
        <el-table-column prop="fee" label="总费用"></el-table-column>
      </el-table>
      <div v-if="orderInfo.user" class="order-info">
        <div class="title mrt10">下单客户信息</div>
        <div>
          头像：<el-avatar
            size="medium"
            :src="orderInfo.user.headImg"
          ></el-avatar>
        </div>
        <div>姓名：{{ orderInfo.user.nickName }}</div>
        <div>电话：{{ orderInfo.user.telNumber }}</div>
        <div>身份：{{ orderInfo.user.identity }}</div>
        <div>积分：{{ orderInfo.user.integral }}</div>
      </div>
      <div
        v-if="orderInfo.comments && orderInfo.comments.length > 0"
        class="order-comment"
      >
        <div class="title mrt10">评论信息</div>
        <div
          class="comment-list"
          v-for="(item, index) in orderInfo.comments"
          :key="item.id"
        >
          <div>
            <el-avatar size="medium" :src="orderInfo.user.headImg"></el-avatar>
            <div class="username">{{ item.userName }}</div>
            <div class="createTime">{{ item.createTime }}</div>
          </div>
          <div class="comment-content">
            {{ item.content }}
          </div>
          <div class="comment-btn" v-if="!item.answer">
            <el-button
              type="primary"
              size="mini"
              @click="showDialog(item.id, index)"
              >回复</el-button
            >
          </div>
          <div class="reply-comment" v-else>
            {{ item.answer }}
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog
      title="回复评论"
      :visible.sync="dialogVisible"
      width="45%"
      append-to-body
    >
      <el-form
        :model="commentForm"
        :rules="rules"
        ref="commentForm"
        label-width="80px"
        class="spec-form-inline"
      >
        <el-form-item label="回复内容" prop="content">
          <el-input v-model="commentForm.content" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="replyComment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getOrderDetailInfo, responseComment } from "@/request/api";
export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      commentIndex: -1,
      orderInfo: {},
      commentId: "",
      commentForm: {
        content: ""
      },
      rules: {
        content: [
          { required: true, message: "请输入回复内容", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    orderId: String
  },
  watch: {
    orderId() {
      if (this.orderId) {
        this.getOrderDetailInfo();
      }
    }
  },
  methods: {
    showDialog(id, index) {
      this.commentForm.content = "";
      this.commentId = id;
      this.commentIndex = index;
      this.dialogVisible = true;
    },
    replyComment() {
      if (this.loading) return false;
      this.loading = true;
      responseComment({
        answer: this.commentForm.content,
        commentId: this.commentId
      })
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.dialogVisible = false;
            this.orderInfo.comments[
              this.commentIndex
            ].answer = this.commentForm.content;
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    getOrderDetailInfo() {
      if (this.loading) return false;
      this.loading = true;
      getOrderDetailInfo({
        orderId: this.orderId
      })
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.orderInfo = res.data.resultObject;
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    goBack() {
      this.$emit("cancel");
    }
  }
};
</script>
<style lang="less">
.order-confirm {
  font-size: 14px;
  color: #222222;
  .title {
    margin: 5px auto 20px auto;
    font-weight: bold;
  }
  img {
    width: 40px;
    height: 40px;
  }
  .order-info {
    div {
      margin-bottom: 15px;
    }
  }
  .order-comment {
    .comment-list {
      margin-bottom: 15px;
    }
    .username {
      display: inline-block;
      height: 40px;
      vertical-align: top;
      line-height: 40px;
      margin-left: 10px;
    }
    .createTime {
      float: right;
      line-height: 40px;
      color: #ccc;
    }
    .comment-content {
      margin-left: 45px;
    }
    .comment-btn {
      text-align: right;
      margin: 10px 0;
    }
    .reply-comment {
      background: #f5f5f5;
      border-radius: 6px;
      padding: 10px;
      margin-left: 45px;
      margin-top: 10px;
    }
  }
  .order-header {
    margin: 10px 0 10px 0;
  }
  .el-page-header__content {
    font-size: 15px;
  }
  .mrt10 {
    margin-top: 30px;
  }
}
</style>
