<template>
  <div class="edit-product">
    <el-form :model="productForm" :rules="rules" ref="productForm" label-width="140px" class="demo-productForm">
        <el-form-item label="商品名称" prop="prodName">
            <el-input v-model="productForm.prodName"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="prodDesc">
            <el-input v-model="productForm.prodDesc"></el-input>
        </el-form-item>
        <el-form-item label="商品类别" prop="categoryId">
            <el-select v-model="productForm.categoryId" placeholder="请选择">
                <el-option :label="item.catogeryName" :value="item.id" v-for="item in categorysList" :key="item.id"></el-option>
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
        <el-form-item label="单位" prop="unit">
            <el-select v-model="productForm.unit" placeholder="请选择">
            <el-option label="斤" value="1"></el-option>
            <el-option label="份" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商品类型" prop="prodType">
            <el-select v-model="productForm.prodType" placeholder="请选择">
            <el-option label="类型一" value="1"></el-option>
            <el-option label="类型二" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商品主图" prop="mainImg">
            <el-upload
                class="avatar-uploader"
                action="/api/file/fileUpload"
                :data="{type: 'P'}"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="productForm.mainImg" :src="productForm.mainImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="商品副图" prop="fileList">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :limit="3"
                :auto-upload="false"
                :file-list="fileList"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('productForm')">{{btnTxt}}</el-button>
            <el-button @click="resetForm('productForm')">取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>  
<script>
  import { getListCategorys, addProduct, updateProduct } from '@/request/api'
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        categorysList: [], // 商品类别
        btnTxt: '立即创建',
        fileList: [],
        productForm: {
          prodDesc: '', // 商品描述
          prodName: '', // 商品名称
          details: '',
          prodType: '',
          isShowOnIndex: '',
          unit: '',
          mainImg: '/static/images/potato.png',
          secondImg: ['/static/images/potato.png']
        },
        rules: {
          prodName: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
          ],
          prodDesc: [
            { required: true, message: '请输入商品描述', trigger: 'blur' },
            { min: 1, max: 8, message: '长度在 1 到 12 个字符', trigger: 'blur' }
          ],
          mainImg: [
            { required: true, message: '请上传主图', trigger: 'change' }
          ],
          categoryId: [
            { required: true, message: '请选择商品类别', trigger: 'change' }
          ],
          secondImg: [
            { type: 'array', required: true, message: '请至少上传一张', trigger: 'change' }
          ],
          isShowOnIndex: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          unit: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          prodType: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          details: [
            { required: true, message: '请填写商品详情', trigger: 'blur' }
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
                this.productForm = {
                    id: this.formItem['id'],
                    prodName: this.formItem['prodName'],
                    prodDesc: this.formItem['prodDesc'],
                    isShowOnIndex: this.formItem['isShowOnIndex'],
                    details: this.formItem['details'],
                    mainImg: this.formItem['mainImg'] || '/static/images/potato.png',
                    categoryId: this.formItem['categoryId'],
                    unit: this.formItem['unit'],
                    prodType: this.formItem['prodType'],
                    secondImg: this.formItem['secondImg']
                };
                let arr = this.formItem['secondImg'] ? this.formItem['secondImg'].split() : ['/static/images/potato.png']
                this.fileList = []
                for (let i = 0; i < arr.length; i++) {
                    this.fileList.push({name: i, url: arr[i]})
                }
                console.log(this.fileList)
            } else {
                this.btnTxt = '立即创建'
                this.fileList = []
                this.$refs['categoryForm'].resetFields();
            }
        }
    },
    methods: {
      getListCategorys() {
        if (this.loading) return false
        this.loading = true
        getListCategorys().then((res)=>{
            this.loading = false
            if (res.status === 200 && res.data.resultCode === '000001') {
              this.categorysList = res.data.resultObject
            }
        }).catch((error)=>{
            this.loading = false
        })
      },
      addProduct () {
        if (this.loading) return false
        this.loading = true
        addProduct({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        }).then((res)=>{
            this.loading = false
            if (res.status === 200 && res.data.resultCode === '000001') {
              this.categorysList = res.data.resultObject.list
            }
        }).catch((error)=>{
            this.loading = false
        })
      },
      updateProduct () {
        if (this.loading) return false
        this.loading = true
        let obj = Object.assign({}, this.productForm)
        obj.secondImg = []
        for (let i = 0; i < this.fileList.length; i++) {
            obj.secondImg.push(this.fileList[i].url)
        }
        obj.secondImg = obj.secondImg.join()
        updateProduct(obj).then((res)=>{
            this.loading = false
            this.$message({
                message: "修改成功",
                type: "success"
            });
            this.resetForm('productForm')
        }).catch((error)=>{
            this.loading = false
        })
      },
      submitForm(formName) {
        console.log(this.productForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // if (this.productForm.id) {
            //   this.updateProduct()
            // } else {
            //   this.addProduct()
            // }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.productForm = {
          prodDesc: '', // 商品描述
          prodName: '', // 商品名称
          details: '',
          prodType: '',
          isShowOnIndex: '',
          unit: '',
          mainImg: '',
          secondImg: []
        },
        this.$refs[formName].resetFields();
        this.$emit('cancel')
      },
      handleAvatarSuccess(res, file) {
        console.log(res, file)
        this.productForm.mainImg = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    created () {
      this.getListCategorys()
    }
  }
</script>

<style lang="scss">
.edit-product{
    margin-top: 10px;
    .el-form{
        max-width: 600px;
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
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