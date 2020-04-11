<template>
  <div class="coupon-form">
    <el-form :model="couponForm" :rules="rules" ref="couponForm" label-width="140px" class="demo-couponForm">
        <el-form-item label="优惠券名称" prop="name">
            <el-input v-model="couponForm.name"></el-input>
        </el-form-item>
        <el-form-item label="优惠券面额" prop="denomination">
            <el-input v-model="couponForm.denomination" onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"></el-input>
        </el-form-item>
        <el-form-item label="有效期" prop="date">
            <el-date-picker v-model="couponForm.date" @change="dateChange" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" type="datetimerange" :picker-options="pickerOptions" start-placeholder="生效时间" end-placeholder="失效时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="使用规则">
            <el-input type="textarea" v-model="couponForm.ruleDesc"></el-input>
        </el-form-item>
        <el-form-item label="优惠券类型" prop="type">
            <el-select v-model="couponForm.type" placeholder="请选择">
                <el-option label="价格限制" value="1"></el-option>
                <el-option label="产品限制" value="2"></el-option>
                <el-option label="商品类别限制" value="3"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="最低限制金额" v-show="couponForm.type == '1'">
            <el-input v-model="couponForm.limitPrice" onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('couponForm')">{{btnTxt}}</el-button>
            <el-button @click="resetForm('couponForm')">取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>  
<script>
  import { addCouponTemplate } from '@/request/api'
  export default {
    data() {
      return {
        loading: false,
        btnTxt: '立即创建',
        couponForm: {
          date: '',
          name: '',
          effTime: '',
          expTime: '',
          denomination: '',
          limitPrice: '',
          limitProductId: '',
          ruleDesc: '',
          type: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入优惠券名称', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
          denomination: [
            { required: true, message: '请输入优惠券面额', trigger: 'blur' },
          ],
          date: [
            { required: true, message: '请选择生效时间', trigger: 'change' },
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'change' },
          ]
        },
        pickerOptions: {
            disabledDate(time) {
              return time.getTime() < Date.now();
            }
        }
      };
    },
    props:{
        formItem:Object
    },
    watch: {
        formItem () {
            this.$refs['couponForm'].resetFields();
        }
    },
    methods: {
      submitForm(formName) {
        console.log(this.couponForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addCouponTemplate()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      dateChange (date) {
        this.couponForm.effTime = date[0]
        this.couponForm.expTime = date[1]
      },
      addCouponTemplate() {
        if (this.loading) return false
        this.loading = true
        addCouponTemplate({
            denomination: parseFloat(this.couponForm.denomination),
            effTime: this.couponForm.effTime,
            expTime: this.couponForm.expTime,
            limitPrice: this.couponForm.limitPrice ? parseFloat(this.couponForm.limitPrice) : '',
            name: this.couponForm.name,
            ruleDesc: this.couponForm.ruleDesc,
            type: this.couponForm.type,
            limitProductId: this.couponForm.limitProductId
        }).then((res)=>{
            this.loading = false
            if (res.status === 200 && res.data.resultCode === '000001') {
                this.$message({
                    message: "创建成功",
                    type: "success"
                });
                this.resetForm('couponForm')
            } else {
                this.$message({
                    message: "创建失败",
                    type: "warning"
                });
            }
        }).catch((error)=>{
            this.loading = false
            this.$message({
                message: "创建失败",
                type: "warning"
            });
        })
      },
      resetForm(formName) {
        this.couponForm = {
          id: '',
          name: '',
          effTime: '',
          expTime: '',
          denomination: '',
          limitPrice: '',
          limitProductId: '',
          ruleDesc: '',
          type: ''
        }
        this.$refs[formName].resetFields();
        this.$emit('cancel')
      },
    }
  }
</script>

<style lang="scss">
.coupon-form{
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