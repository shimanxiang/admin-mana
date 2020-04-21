<template>
  <div class="site tableData">
    <div class="siteList" v-show="!isForm">
      <el-row class="top-box">
        <el-button type="success" icon="el-icon-plus" @click="addBtnClick"
          >新增站点</el-button
        >
      </el-row>
      <el-table border :data="siteList">
        <el-table-column label="站点负责人" prop="name"> </el-table-column>
        <el-table-column label="联系方式" prop="telephone"> </el-table-column>
        <el-table-column label="所在省份" prop="code1"> </el-table-column>
        <el-table-column label="所在市" prop="code1"> </el-table-column>
        <el-table-column label="所在区/县" prop="code1"> </el-table-column>
        <el-table-column label="详细地址" prop="addressDetails">
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
    </div>
    <formList
      v-show="isForm"
      :formItem="formItem"
      v-on:cancel="closeForm"
    ></formList>
  </div>
</template>

<script>
import { getListSites, deleteSize } from "@/request/api";
import formList from "./components/form.vue";
export default {
  name: "site",
  data() {
    return {
      isForm: false,
      formItem: {},
      loading: false,
      siteList: []
    };
  },
  components: {
    formList
  },
  methods: {
    closeForm() {
      this.getListSites();
      this.isForm = false;
    },
    gotoProduct(id) {
      this.$router.push({
        path: "/product",
        query: { id: id }
      });
    },
    getListSites() {
      if (this.loading) return false;
      this.loading = true;
      getListSites()
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.siteList = res.data.resultObject;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    delList(index, id) {
      if (this.loading) return false;
      this.loading = true;
      deleteSize({
        siteId: id
      })
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.siteList.splice(index, 1);
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
    this.getListSites();
  }
};
</script>

<style lang="less">
.site {
  .top-box {
    margin-bottom: 10px;
  }
}
</style>
