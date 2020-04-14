<template>
  <div class="edit-category">
    <el-form :model="categoryForm" :rules="rules" ref="categoryForm" label-width="140px" class="demo-categoryForm">
        <el-form-item label="类别名称" prop="catogeryName">
            <el-input v-model="categoryForm.catogeryName"></el-input>
        </el-form-item>
        <el-form-item label="序号">
            <el-input v-model.number="categoryForm.sort"></el-input>
        </el-form-item>
        <el-form-item label="是否在首页显示">
            <el-select v-model="categoryForm.isShowOnIndex" placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="展示类别">
            <el-select v-model="categoryForm.showType" placeholder="请选择">
                <el-option label="不显示" value="0"></el-option>
                <el-option label="横向" value="1"></el-option>
                <el-option label="竖向" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="状态">
            <el-select v-model="categoryForm.status" placeholder="请选择">
                <el-option label="生效" value="1"></el-option>
                <el-option label="失效" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('categoryForm')">{{btnTxt}}</el-button>
            <el-button @click="resetForm('categoryForm')">取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>  
<script>
  import { addCategory, updateCategory } from '@/request/api'
  export default {
    data() {
      return {
        loading: false,
        btnTxt: '立即创建',
        categoryForm: {
          id: '',
          catogeryName: '',
          sort: '',
          isShowOnIndex: '',
          status: '',
          sort: '',
          showType: ''
        },
        rules: {
          catogeryName: [
            { required: true, message: '请输入类型名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    props:{
        formItem:Object
    },
    watch: {
        formItem () {
            if (this.formItem['id']) {
                this.btnTxt = '确认修改'
                this.categoryForm = {
                    id: this.formItem['id'],
                    catogeryName: this.formItem['catogeryName'],
                    isShowOnIndex: this.formItem['isShowOnIndex'],
                    showType: this.formItem['showType'],
                    sort: this.formItem['sort'],
                    status: this.formItem['status']
                };
            } else {
                this.btnTxt = '立即创建'
                this.$refs['categoryForm'].resetFields();
            }
        }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.categoryForm.id) {
              this.updateCategory()
            } else {
              this.addCategory()
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addCategory() {
        if (this.loading) return false
        this.loading = true
        addCategory({
            catogeryName: this.categoryForm.catogeryName,
            isShowOnIndex: this.categoryForm.isShowOnIndex,
            showType: this.categoryForm.showType,
            sort: this.categoryForm.sort,
            status: this.categoryForm.status
        }).then((res)=>{
            this.loading = false
            if (res.status === 200 && res.data.resultCode === '000001') {
                this.$message({
                    message: "创建成功",
                    type: "success"
                });
                this.resetForm('categoryForm')
            }
        }).catch((error)=>{
            this.loading = false
        })
      },
      updateCategory () {
        if (this.loading) return false
        this.loading = true
        updateCategory({
            id: this.categoryForm.id,
            catogeryName: this.categoryForm.catogeryName,
            isShowOnIndex: this.categoryForm.isShowOnIndex,
            showType: this.categoryForm.showType,
            sort: this.categoryForm.sort,
            status: this.categoryForm.status
        }).then((res)=>{
            this.loading = false
            if (res.status === 200 && res.data.resultCode === '000001') {
                this.$message({
                    message: "修改成功",
                    type: "success"
                });
                this.resetForm('categoryForm')
            }
        }).catch((error)=>{
            this.loading = false
        })
      },
      resetForm(formName) {
        this.categoryForm = {
          id: '',
          catogeryName: '',
          sort: '',
          isShowOnIndex: '',
          status: '',
          sort: '',
          showType: ''
        }
        this.$refs[formName].resetFields();
        this.$emit('cancel')
      },
    }
  }
</script>

<style lang="scss">
.edit-category{
    margin-top: 10px;
    .el-form{
        max-width: 600px;
    }
}
</style>