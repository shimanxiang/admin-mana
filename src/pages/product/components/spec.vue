<template>
    <div class="product-spec">
        <el-page-header class="spec-header" @back="goBack" content="商品规格">
        </el-page-header>
        <div class="spec-title">添加规格</div>
        <el-form :inline="true" :model="specForm" :rules="rules" ref="specForm" label-width="100px" class="spec-form-inline">
            <el-form-item label="规格描述" prop="specDesc">
                <el-input v-model="specForm.specDesc"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="specForm.status" placeholder="请选择">
                <el-option label="正常订购" value="1"></el-option>
                <el-option label="已售完" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="原价" prop="originalPrice">
                <el-input v-model="specForm.originalPrice" onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"></el-input>
            </el-form-item>
            <el-form-item label="现价" prop="presentPrice">
                <el-input v-model="specForm.presentPrice" onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"></el-input>
            </el-form-item>
            <el-form-item class="spec-btn">
                <el-button type="primary" @click="submitForm('specForm')">新增</el-button>
                <el-button @click="resetForm('specForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="spec-title">规格列表</div>
        <el-table :data="specList" border>
            <el-table-column prop="province" label="规格描述"></el-table-column>
            <el-table-column prop="originalPrice" label="原价"></el-table-column>
            <el-table-column prop="presentPrice" label="现价"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
  import { getListSpecsByProdId, addSpecInventory } from '@/request/api'
  export default {
    data() {
      return {
        specList: [],
        loading: false,
        specForm: {
          status: '1',
          specDesc: '',
          originalPrice: '',
          presentPrice: '',
          productId: ''
        },
        rules: {
          specDesc: [
            { required: true, message: '请输入规格描述', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
          ],
          originalPrice: [
            { required: true, message: '请输入原价', trigger: 'blur' }
          ],
          presentPrice: [
            { required: true, message: '请输入现价', trigger: 'blur' }
          ]
        }
      };
    },
    props:{
      prodId:String
    },
    watch: {
        prodId () {
            if (this.prodId) {
                this.specForm.productId = this.prodId
                this.getListSpecsByProdId()
            }
        }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addSpecInventory()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      goBack () {
        this.$emit('cancel')
      },
      getListSpecsByProdId () {
        if (this.loading) return false
        this.loading = true
        getListSpecsByProdId({
            prodId: this.prodId
        }).then((res)=>{
            this.loading = false
            if (res.status === 200 && res.data.resultCode === '000001') {
              this.specList = res.data.resultObject
            } else {
              this.specList = []
            }
        }).catch((error)=>{
            this.specList = []
            this.loading = false
        })
      },
      addSpecInventory () {
        if (this.loading) return false
        this.loading = true
        let param = this.specForm
        param.originalPrice = parseFloat(param.originalPrice)
        param.presentPrice = parseFloat(param.presentPrice)
        addSpecInventory(param).then((res)=>{
            this.loading = false
            if (res.status === 200 && res.data.resultCode === '000001') {
              // this.specList = res.data.resultObject
            } else {
              // this.specList = []
            }
        }).catch((error)=>{
            this.loading = false
        })
      }
    }
  }
</script>

<style lang="scss">
.product-spec{
    .spec-form-inline{
        width: 700px;
    }
    .spec-title{
        margin: 20px 0px;
        font-weight: bold;
    }
    .spec-btn{
        margin-left: 100px;
    }
    .spec-header{
        margin: 10px 0 30px 0;
    }
    .el-page-header__content {
        font-size: 15px;
    }
}
</style>