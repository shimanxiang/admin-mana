<template>
  <div class="comment tableData">
    <div class="commentList">
      <el-row class="top-box">
        <el-select v-model="status" placeholder="请选择" class="select-box">
          <el-option label="待审核" value="0"></el-option>
          <el-option label="通过" value="1"></el-option>
          <el-option label="未通过" value="2"></el-option>
        </el-select>
        <el-button type="primary" @click="searchClick">搜索</el-button>
      </el-row>
      <el-table border :data="commentList">
        <el-table-column label="评论者头像">
          <template slot-scope="scope">
            <el-avatar size="medium" :src="scope.row.userHeadImg"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="评论者昵称" prop="userName"> </el-table-column>
        <el-table-column label="订单编号" prop="orderInfoId"> </el-table-column>
        <el-table-column label="评论内容" prop="content"> </el-table-column>
        <el-table-column label="评分">
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.level"
              readonly
              disabled
              text-color="#ff9900"
            >
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column label="评论时间" prop="createTime"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.status == '1' || scope.row.status == '0'"
              size="mini"
              type="danger"
              @click="delList(scope.$index, scope.row.id, 2, '不通过')"
              >不通过</el-button
            >
            <el-button
              v-show="scope.row.status == '2' || scope.row.status == '0'"
              size="mini"
              type="primary"
              @click="delList(scope.$index, scope.row.id, 1, '通过')"
              >通过</el-button
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
  </div>
</template>

<script>
import { getComments, updateComment } from "@/request/api";
export default {
  name: "comment",
  data() {
    return {
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      formItem: {},
      loading: false,
      status: "0",
      commentList: []
    };
  },
  methods: {
    currentChange(index) {
      this.pageIndex = index;
      this.getComments();
    },
    delList(index, id, status, statusTxt) {
      this.$confirm("确定" + statusTxt + "该条评论？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.updateComment(index, id, status);
      });
    },
    searchClick() {
      this.getComments();
    },
    getComments() {
      if (this.loading) return false;
      this.loading = true;
      getComments({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        status: this.status
      })
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.total = res.data.resultObject.total;
            this.commentList = [];
            for (let i = 0; i < res.data.resultObject.list.length; i++) {
              res.data.resultObject.list[i].level = Number(
                res.data.resultObject.list[i].level
              );
              this.commentList.push(res.data.resultObject.list[i]);
            }
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    updateComment(index, id, status) {
      if (this.loading) return false;
      this.loading = true;
      updateComment({
        commentId: id,
        status: status
      })
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.commentList.splice(index, 1);
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
    this.getComments();
  }
};
</script>

<style lang="less">
.comment {
  .top-box {
    margin-bottom: 10px;
    .select-box {
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
