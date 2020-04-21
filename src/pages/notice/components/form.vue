<template>
  <div class="edit-notices">
    <el-form
      :model="noticeForm"
      :rules="rules"
      ref="noticeForm"
      label-width="140px"
      class="demo-noticeForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="noticeForm.title" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          v-model="noticeForm.content"
          type="textarea"
          maxlength="1000"
          :autosize="{ minRows: 10, maxRows: 10 }"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('noticeForm')">{{
          btnTxt
        }}</el-button>
        <el-button @click="resetForm('noticeForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addNotice } from "@/request/api";
export default {
  data() {
    return {
      loading: false,
      btnTxt: "立即创建",
      noticeForm: {
        title: "",
        content: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            min: 1,
            max: 1000,
            message: "长度在 1 到 1000 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    formItem: Object
  },
  watch: {
    formItem() {
      this.btnTxt = "立即创建";
      this.$refs["noticeForm"].resetFields();
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addNotice();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addNotice() {
      if (this.loading) return false;
      this.loading = true;
      addNotice(this.noticeForm)
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.$message({
              message: "创建成功",
              type: "success"
            });
            this.resetForm("noticeForm");
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    resetForm(formName) {
      this.noticeForm = {
        title: "",
        content: ""
      };
      this.$refs[formName].resetFields();
      this.$emit("cancel");
    }
  }
};
</script>

<style lang="less">
.edit-notices {
  margin-top: 10px;
  .el-form {
    max-width: 600px;
  }
}
</style>
