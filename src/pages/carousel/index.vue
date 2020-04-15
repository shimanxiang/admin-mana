<template>
  <div class="carousels tableData">
    <div class="carouselsList" v-show="!isForm">
      <el-row class="top-box">
        <el-button type="success" icon="el-icon-plus" @click="addBtnClick"
          >新增轮播图</el-button
        >
      </el-row>
      <el-table border :data="carouselsList">
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.image" alt="" srcset="" />
          </template>
        </el-table-column>
        <el-table-column label="跳转路径" prop="url"> </el-table-column>
        <el-table-column label="轮播类型">
          <template slot-scope="scope">
            <span>{{ scope.row.type == "P" ? "商品" : "公告" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="序号" prop="sort"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status == "1" ? "生效" : "失效" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220px">
          <template slot-scope="scope">
            <el-button size="mini" @click="showForm(scope.$index)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              v-show="scope.row.status == '1'"
              @click="updateStatus(scope.$index, scope.row.id, '0')"
              >失效</el-button
            >
            <el-button
              size="mini"
              type="primary"
              v-show="scope.row.status == '0'"
              @click="updateStatus(scope.$index, scope.row.id, '1')"
              >生效</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="clickDelBtn(scope.$index, scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <carouselForm
      v-show="isForm"
      :formItem="formItem"
      v-on:cancel="closeForm"
    ></carouselForm>
  </div>
</template>

<script>
import {
  getListCarousels,
  updateCarouselStatus,
  deleteCarousel
} from "@/request/api";
import carouselForm from "./components/form.vue";
export default {
  name: "carousels",
  data() {
    return {
      status: "",
      isForm: false,
      formItem: {},
      loading: false,
      carouselsList: []
    };
  },
  components: {
    carouselForm
  },
  methods: {
    showForm(index) {
      this.formItem = this.carouselsList[index];
      this.isForm = true;
    },
    closeForm() {
      this.getListCarousels();
      this.isForm = false;
    },
    updateStatus(index, id, status) {
      if (this.loading) return false;
      this.loading = true;
      updateCarouselStatus({
        id: id,
        status: status
      })
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.carouselsList[index].status = status;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    clickDelBtn(index, id) {
      this.$confirm("确定删除该轮播图？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.deleteCarousel(index, id);
      });
    },
    deleteCarousel(index, id) {
      if (this.loading) return false;
      this.loading = true;
      deleteCarousel({
        id: id
      })
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.carouselsList.splice(index, 1);
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getListCarousels() {
      if (this.loading) return false;
      this.loading = true;
      getListCarousels({
        status: this.status
      })
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.carouselsList = res.data.resultObject;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    addBtnClick() {
      this.formItem = {};
      this.isForm = true;
    }
  },
  mounted() {
    this.getListCarousels();
  }
};
</script>

<style lang="less">
.carousels {
  .top-box {
    margin-bottom: 10px;
  }
  img {
    width: 40px;
    height: 40px;
  }
}
</style>
