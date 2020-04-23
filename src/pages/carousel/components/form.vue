<template>
  <div class="carousels-form">
    <el-form
      :model="carouselForm"
      :rules="rules"
      ref="carouselForm"
      label-width="140px"
      class="demo-carouselForm"
    >
      <el-form-item label="轮播图片" prop="image">
        <el-upload
          class="avatar-uploader"
          :action="uploadPath"
          :data="{ type: 'C' }"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="carouselForm.image"
            :src="carouselForm.image"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="序号">
        <el-input v-model.number="carouselForm.sort"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="carouselForm.status" placeholder="请选择">
          <el-option label="生效" value="1"></el-option>
          <el-option label="失效" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="轮播类型" prop="type">
        <el-select v-model="carouselForm.type" placeholder="请选择">
          <el-option label="商品" value="P"></el-option>
          <el-option label="公告" value="N"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="跳转商品" v-show="carouselForm.type == 'P'">
        <el-autocomplete
          v-model="queryStr"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入搜索关键字"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="跳转通知" v-show="carouselForm.type == 'N'">
        <el-select
          v-model="queryStr"
          placeholder="请选择"
          @change="noticeChange"
        >
          <el-option
            :label="item.title"
            :value="item.id"
            v-for="item in noticeList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('carouselForm')">{{
          btnTxt
        }}</el-button>
        <el-button @click="resetForm('carouselForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  addCarousel,
  updateCarousel,
  getListProducts,
  queryAllNotices
} from "@/request/api";
export default {
  data() {
    return {
      uploadPath:
        process.env.NODE_ENV === "production"
          ? process.env.BASE_URL + "/file/fileUpload"
          : "/api/file/fileUpload",
      loading: false,
      btnTxt: "立即创建",
      queryStr: "",
      productList: [],
      noticeList: [],
      carouselForm: {
        image: "",
        id: "",
        url: "",
        status: "",
        sort: "",
        type: "",
        subId: ""
      },
      rules: {
        image: [{ required: true, message: "请上传轮播图", trigger: "change" }],
        type: [{ required: true, message: "请选择轮播类型", trigger: "change" }]
      }
    };
  },
  props: {
    formItem: Object
  },
  watch: {
    formItem() {
      if (this.formItem["id"]) {
        this.btnTxt = "确认修改";
        this.carouselForm = {
          id: this.formItem["id"],
          type: this.formItem["type"],
          sort: this.formItem["sort"],
          status: this.formItem["status"],
          image: this.formItem["image"]
        };
      } else {
        this.btnTxt = "立即创建";
        this.$refs["carouselForm"].resetFields();
      }
    }
  },
  methods: {
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
    getListProducts(cb) {
      if (this.loading) return false;
      this.loading = true;
      getListProducts({
        pageIndex: 1,
        pageSize: 1000,
        prodName: this.queryStr
      })
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.productList = [];
            for (let i = 0; i < res.data.resultObject.list.length; i++) {
              const element = res.data.resultObject.list[i];
              this.productList.push({
                value: element.prodName,
                id: element.id
              });
            }
            cb();
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    querySearchAsync(queryString, cb) {
      if (queryString) {
        this.queryStr = queryString;
        this.getListProducts(() => {
          cb(this.productList);
        });
      }
    },
    handleSelect(item) {
      this.carouselForm.url = "/pages/goodDetail/main?id=" + item.id;
      this.carouselForm.subId = item.id;
    },
    noticeChange(val) {
      this.carouselForm.url = "/pages/notice/main?id=" + val;
      this.carouselForm.subId = val;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.carouselForm.id) {
            this.updateCarousel();
          } else {
            this.addCarousel();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addCarousel() {
      if (this.loading) return false;
      this.loading = true;
      addCarousel({
        image: this.carouselForm.image,
        url: this.carouselForm.url,
        type: this.carouselForm.type,
        sort: this.carouselForm.sort,
        status: this.carouselForm.status,
        subId: this.carouselForm.subId
      })
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.$message({
              message: "创建成功",
              type: "success"
            });
            this.resetForm("carouselForm");
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    updateCarousel() {
      if (this.loading) return false;
      this.loading = true;
      updateCarousel({
        id: this.carouselForm.id,
        image: this.carouselForm.image,
        url: this.carouselForm.url,
        type: this.carouselForm.type,
        sort: this.carouselForm.sort,
        status: this.carouselForm.status,
        subId: this.carouselForm.subId
      })
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.resetForm("carouselForm");
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    resetForm(formName) {
      this.carouselForm = {
        id: "",
        sort: "",
        status: "",
        type: "",
        url: "",
        image: "",
        subId: ""
      };
      this.queryStr = "";
      this.$refs[formName].resetFields();
      this.$emit("cancel");
    },
    handleAvatarSuccess(res) {
      this.carouselForm.image = res;
    },
    beforeAvatarUpload(file) {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg"
      ) {
        this.$message.error("只能上传图片文件");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  },
  mounted() {
    this.queryAllNotices();
  }
};
</script>

<style lang="less">
.carousels-form {
  margin-top: 10px;
  .el-form {
    max-width: 600px;
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
}
</style>
