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
            <el-table-column prop="specDesc" label="规格描述"></el-table-column>
            <el-table-column prop="originalPrice" label="原价"></el-table-column>
            <el-table-column prop="presentPrice" label="现价"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <span>{{scope.row.status == '1' ? '正常订购' : '已售完'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="showEditDialog(scope.row, scope.$index)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" @click="clickDeleteBtn(scope.$index, scope.row.id)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog
          title="编辑规格"
          :visible.sync="dialogVisible"
          width="45%"
          append-to-body	>
          <el-form :model="editForm" :rules="rules" ref="specForm" label-width="80px" class="spec-form-inline">
            <el-form-item label="规格描述" prop="specDesc">
                <el-input v-model="editForm.specDesc"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="editForm.status" placeholder="请选择">
                <el-option label="正常订购" value="1"></el-option>
                <el-option label="已售完" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="原价" prop="originalPrice">
                <el-input v-model="editForm.originalPrice" onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"></el-input>
            </el-form-item>
            <el-form-item label="现价" prop="presentPrice">
                <el-input v-model="editForm.presentPrice" onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateSpec">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
  import { getListSpecsByProdId, addSpecInventory, deleteSpec, updateSpec } from '@/request/api'
  export default {
    data() {
      return {
        dialogVisible: false,
        specList: [],
        loading: false,
        specForm: {
          status: '1',
          specDesc: '',
          originalPrice: '',
          presentPrice: '',
          productId: ''
        },
        editIndex: -1,
        editForm: {
          id: '',
          status: '',
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
      showEditDialog (data, index) {
        this.editForm = Object.assign({}, data)
        this.editIndex = index
        this.dialogVisible = true
      },
      updateSpec () {
        if (this.loading) return false
        this.loading = true
        let param = this.editForm
        param.originalPrice = parseFloat(param.originalPrice)
        param.presentPrice = parseFloat(param.presentPrice)
        updateSpec(param).then((res)=>{
            this.loading = false
            if (res.status === 200 && res.data.resultCode === '000001') {
              this.getListSpecsByProdId()
              this.resetForm('specForm')
              this.dialogVisible = false
            } else {
              this.$message({
                message: "创建失败",
                type: "warning"
              });
            }
        }).catch((error)=>{
            this.loading = false
        })
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
               this.specList.push({
                 id: res.data.resultObject.id,
                 productId: res.data.resultObject.productId,
                 specDesc: res.data.resultObject.specDesc,
                 originalPrice: res.data.resultObject.originalPrice,
                 presentPrice: res.data.resultObject.presentPrice,
                 status: res.data.resultObject.status,
                 inventory: res.data.resultObject.inventory
               })
               this.resetForm('specForm')
            } else {
              this.$message({
                message: "创建失败",
                type: "warning"
              });
            }
        }).catch((error)=>{
            this.loading = false
        })
      },
      clickDeleteBtn (index, id) {
        this.$confirm("确定删除该规格？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.deleteSpec(index, id)
        });
      },
      deleteSpec (index, id) {
        if (this.loading) return false
        this.loading = true
        deleteSpec({
          specId: id
        }).then((res)=>{
          this.loading = false
          if (res.status === 200 && res.data.resultCode === '000001') {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.specList.splice(index, 1)
            this.total -= 1
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