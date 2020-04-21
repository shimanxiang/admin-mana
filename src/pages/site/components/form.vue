<template>
  <div class="edit-sites">
    <el-form
      :model="siteForm"
      :rules="rules"
      ref="siteForm"
      label-width="140px"
      class="demo-siteForm"
    >
      <el-form-item label="站点负责人" prop="name">
        <el-input v-model="siteForm.name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="telephone">
        <el-input v-model.number="siteForm.telephone" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="所在省份" prop="code1">
        <el-input v-model="siteForm.code1"></el-input>
      </el-form-item>
      <el-form-item label="所在市" prop="code2">
        <el-input v-model="siteForm.code2"></el-input>
      </el-form-item>
      <el-form-item label="所在区/县" prop="code3">
        <el-input v-model="siteForm.code3"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="addressDetails">
        <el-input v-model="siteForm.addressDetails" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('siteForm')">{{
          btnTxt
        }}</el-button>
        <el-button @click="resetForm('siteForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addSites } from "@/request/api";
export default {
  data() {
    return {
      loading: false,
      btnTxt: "立即创建",
      siteForm: {
        addressDetails: "",
        code1: "",
        code2: "",
        code3: "",
        name: "",
        telephone: ""
      },
      rules: {
        addressDetails: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        code1: [
          { required: true, message: "请输入所在省份", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        code2: [
          { required: true, message: "请输入所在市", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        code3: [
          { required: true, message: "请输入所在区/县", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入负责人名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "请输入电话号码", trigger: "blur" }
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
      this.$refs["siteForm"].resetFields();
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addSites();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addSites() {
      if (this.loading) return false;
      this.loading = true;
      addSites(this.siteForm)
        .then(res => {
          this.loading = false;
          if (res.status === 200 && res.data.resultCode === "000001") {
            this.$message({
              message: "创建成功",
              type: "success"
            });
            this.resetForm("siteForm");
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    resetForm(formName) {
      this.siteForm = {
        addressDetails: "",
        code1: "",
        code2: "",
        code3: "",
        name: "",
        telephone: ""
      };
      this.$refs[formName].resetFields();
      this.$emit("cancel");
    }
  }
};
</script>

<style lang="less">
.edit-sites {
  margin-top: 10px;
  .el-form {
    max-width: 600px;
  }
}
</style>
