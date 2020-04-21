<template>
  <div class="notices tableData">
    <div class="noticeList" v-show="!isForm">
      <el-row class="top-box">
        <el-button type="success" icon="el-icon-plus" @click="addBtnClick"
          >新增通知</el-button
        >
      </el-row>
      <el-table border :data="noticeList">
        <el-table-column label="发布者名称" prop="adminName"> </el-table-column>
        <el-table-column label="通知标题" prop="title"> </el-table-column>
        <el-table-column label="通知内容">
          <template slot-scope="scope">
            <pre>{{ scope.row.content }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="createTime"> </el-table-column>
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
    </div>
    <formList
      v-show="isForm"
      :formItem="formItem"
      v-on:cancel="closeForm"
    ></formList>
  </div>
</template>

<script>
import { queryAllNotices, deleteNotice } from "@/request/api";
import formList from "./components/form.vue";
export default {
  name: "notices",
  data() {
    return {
      isForm: false,
      formItem: {},
      loading: false,
      noticeList: []
    };
  },
  components: {
    formList
  },
  methods: {
    closeForm() {
      this.queryAllNotices();
      this.isForm = false;
    },
    gotoProduct(id) {
      this.$router.push({
        path: "/product",
        query: { id: id }
      });
    },
    queryAllNotices() {
      if (this.loading) return false;
      this.loading = true;
      queryAllNotices()
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.noticeList = res.data.resultObject;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    delList(index, id) {
      if (this.loading) return false;
      this.loading = true;
      deleteNotice({
        noticeId: id
      })
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.noticeList.splice(index, 1);
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch(() => {
          this.$message.error("删除失败");
          this.loading = false;
        });
    },
    addBtnClick() {
      this.formItem = {};
      this.isForm = true;
    }
  },
  mounted() {
    this.queryAllNotices();
  }
};
</script>

<style lang="less">
.notices {
  .top-box {
    margin-bottom: 10px;
  }
}
</style>
