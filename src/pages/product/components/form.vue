<template>
  <div class="edit-product">
    <el-form
      :model="productForm"
      :rules="rules"
      ref="productForm"
      label-width="140px"
      class="demo-productForm"
    >
      <el-form-item label="商品名称" prop="prodName">
        <el-input v-model="productForm.prodName"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="prodDesc">
        <el-input v-model="productForm.prodDesc"></el-input>
      </el-form-item>
      <el-form-item label="商品类别" prop="categoryId">
        <el-select v-model="productForm.categoryId" placeholder="请选择">
          <el-option
            :label="item.catogeryName"
            :value="item.id"
            v-for="item in categorysList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品详情" prop="details">
        <el-input type="textarea" v-model="productForm.details"></el-input>
      </el-form-item>
      <el-form-item label="是否在首页显示" prop="isShowOnIndex">
        <el-select v-model="productForm.isShowOnIndex" placeholder="请选择">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品类型" prop="prodType">
        <el-select v-model="productForm.prodType" placeholder="请选择">
          <el-option
            :label="item.name"
            :value="item.value"
            v-for="item in productType"
            :key="item.code + item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品状态" prop="status" v-show="!formItem['id']">
        <el-select v-model="productForm.status" placeholder="请选择">
          <el-option
            :label="item.name"
            :value="item.value"
            v-for="item in productStatus"
            :key="item.code + item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品主图" prop="mainImg">
        <el-upload
          class="avatar-uploader"
          action="/api/file/fileUpload"
          :data="{ type: 'P' }"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="productForm.mainImg"
            :src="productForm.mainImg"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品副图" prop="fileList">
        <el-upload
          action="/api/file/fileUpload"
          list-type="picture-card"
          :data="{ type: 'P' }"
          :limit="3"
          :file-list="productForm.fileList"
          :on-success="handlePictureCardSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('productForm')">{{
          btnTxt
        }}</el-button>
        <el-button @click="resetForm('productForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  getListCategorys,
  addProduct,
  updateProduct,
  getProductType,
  getProductStatus
} from "@/request/api";
export default {
  data() {
    return {
      categorysList: [], // 商品类别
      btnTxt: "立即创建",
      productType: [],
      productStatus: [],
      productForm: {
        categoryId: "",
        prodDesc: "", // 商品描述
        prodName: "", // 商品名称
        details: "",
        prodType: "",
        status: "",
        isShowOnIndex: "",
        mainImg: "",
        secondImg: "",
        fileList: []
      },
      rules: {
        prodName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" }
        ],
        prodDesc: [
          { required: true, message: "请输入商品描述", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 1 到 12 个字符", trigger: "blur" }
        ],
        mainImg: [{ required: true, message: "请上传主图", trigger: "change" }],
        categoryId: [
          { required: true, message: "请选择商品类别", trigger: "change" }
        ],
        fileList: [
          {
            type: "array",
            required: true,
            message: "请至少上传一张",
            trigger: "change"
          }
        ],
        isShowOnIndex: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        prodType: [{ required: true, message: "请选择", trigger: "change" }],
        status: [{ required: true, message: "请选择", trigger: "change" }],
        details: [
          { required: true, message: "请填写商品详情", trigger: "blur" }
        ]
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
        this.productForm = {
          id: this.formItem["id"],
          prodName: this.formItem["prodName"],
          prodDesc: this.formItem["prodDesc"],
          isShowOnIndex: this.formItem["isShowOnIndex"],
          details: this.formItem["details"],
          mainImg: this.formItem["mainImg"],
          categoryId: this.formItem["categoryId"],
          prodType: this.formItem["prodType"],
          status: this.formItem["status"],
          secondImg: this.formItem["secondImg"]
        };
        let arr = this.formItem["secondImg"];
        this.productForm.fileList = [];
        for (let i = 0; i < arr.length; i++) {
          this.productForm.fileList.push({ name: i, url: arr[i] });
        }
      } else {
        this.btnTxt = "立即创建";
        this.$refs["productForm"].resetFields();
      }
    }
  },
  methods: {
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
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    getProductType() {
      getProductType({
        code: "PROD_TYPE"
      })
        .then(res => {
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.productType = res.data.resultObject;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getProductStatus() {
      getProductStatus({
        code: "PROD_STATUS"
      })
        .then(res => {
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.productStatus = res.data.resultObject;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addProduct() {
      if (this.loading) return false;
      this.loading = true;
      addProduct(this.productForm)
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.loading = false;
            this.$message({
              message: "创建成功",
              type: "success"
            });
            this.resetForm("productForm");
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    updateProduct() {
      if (this.loading) return false;
      this.loading = true;
      let obj = Object.assign({}, this.productForm);
      obj.secondImg = [];
      for (let i = 0; i < this.productForm.fileList.length; i++) {
        obj.secondImg.push(this.productForm.fileList[i].url);
      }
      obj.secondImg = obj.secondImg.join();
      updateProduct(obj)
        .then(res => {
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.loading = false;
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.resetForm("productForm");
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.productForm.id) {
            this.updateProduct();
          } else {
            this.addProduct();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      (this.productForm = {
        categoryId: "",
        prodDesc: "", // 商品描述
        prodName: "", // 商品名称
        details: "",
        prodType: "",
        status: "",
        isShowOnIndex: "",
        mainImg: "",
        secondImg: "",
        fileList: []
      }),
        console.log("resetForm", this.$refs[formName]);
      this.$refs[formName].resetFields();
      this.$emit("cancel");
    },
    handleAvatarSuccess(res) {
      this.productForm.mainImg = res;
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
    },
    handlePictureCardSuccess(res, file) {
      this.productForm.fileList.push({
        name: file.name,
        url: res
      });
      this.productForm.secondImg = [];
      for (let i = 0; i < this.productForm.fileList.length; i++) {
        this.productForm.secondImg.push(this.productForm.fileList[i].url);
      }
      this.productForm.secondImg = this.productForm.secondImg.join();
    }
  },
  created() {
    this.getListCategorys();
    this.getProductType();
    this.getProductStatus();
  }
};
</script>

<style lang="less">
.edit-product {
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
