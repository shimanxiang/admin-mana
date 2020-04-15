<template>
  <div class="categorys tableData">
    <div class="categorysList" v-show="!isForm">
      <el-row class="top-box">
        <el-button type="success" icon="el-icon-plus" @click="addBtnClick"
          >新增类别</el-button
        >
      </el-row>
      <el-table border :data="categorysList">
        <el-table-column label="类别名称" prop="catogeryName">
        </el-table-column>
        <el-table-column label="是否显示在首页">
          <template slot-scope="scope">
            <span>{{ scope.row.isShowOnIndex == "1" ? "是" : "否" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="展示类别">
          <template slot-scope="scope">
            <span>{{
              scope.row.showType == "1"
                ? "横向"
                : scope.row.showType == "2"
                ? "竖向"
                : "不显示"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="序号" prop="sort"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status == "1" ? "生效" : "失效" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showForm(scope.$index)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              v-show="scope.row.status == '1'"
              @click="delList(scope.$index, scope.row.id, '0')"
              >失效</el-button
            >
            <el-button
              size="mini"
              type="danger"
              v-show="scope.row.status == '0'"
              @click="delList(scope.$index, scope.row.id, '1')"
              >生效</el-button
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
import { getListCategorys, updateCategoryStatus } from "@/request/api";
import formList from "./components/form.vue";
export default {
  name: "categorys",
  data() {
    return {
      isForm: false,
      formItem: {},
      loading: false,
      categorysList: []
    };
  },
  components: {
    formList
  },
  methods: {
    showForm(index) {
      this.formItem = this.categorysList[index];
      this.isForm = true;
    },
    closeForm() {
      this.getListCategorys();
      this.isForm = false;
    },
    delList(index, id, status) {
      this.updateCategoryStatus(index, id, status);
    },
    getListCategorys() {
      if (this.loading) return false;
      this.loading = true;
      getListCategorys()
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.categorysList = res.data.resultObject;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    addBtnClick() {
      this.formItem = {};
      this.isForm = true;
    },
    updateCategoryStatus(index, id, status) {
      if (this.loading) return false;
      this.loading = true;
      updateCategoryStatus({
        id: id,
        status: status
      })
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.categorysList[index].status = status;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.getListCategorys();
  }
};
</script>

<style lang="less">
.categorys {
  .top-box {
    margin-bottom: 10px;
  }
}
</style>
