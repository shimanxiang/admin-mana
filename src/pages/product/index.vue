<template>
  <div class="product tableData">
    <div class="productList" v-show="compStatus == 0">
      <el-row class="top-box">
        <el-input
          class="search-input"
          placeholder="商品名称"
          prefix-icon="el-icon-search"
          v-model="prodName">
        </el-input>
        <el-button type="primary" @click="searchClick">搜索</el-button>
        <el-button type="success" icon="el-icon-plus" @click="addBtnClick">新增商品</el-button>
      </el-row>
      <el-table border :data="productList">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品副图片：">
                <img :src="item" alt="" srcset="" v-for="(item, index) in props.row.secondImg" :key="index">
              </el-form-item>
              <el-form-item label="是否在首页显示：">
                <span>{{ props.row.isShowOnIndex === '1' ? '是' : '否'}}</span>
              </el-form-item>
              <el-form-item label="商品类型：">
                <span>{{ props.row.prodTypeDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="prodName">
        </el-table-column>
        <el-table-column
          label="商品主图片"
          width="100px">
          <template slot-scope="scope">
            <img :src="scope.row.mainImg" alt="" srcset="">
          </template>
        </el-table-column>
        <el-table-column
          label="商品类别"
          prop="categoryName">
        </el-table-column>
        <el-table-column
          label="商品描述"
          prop="prodDesc">
        </el-table-column>
        <el-table-column
          label="已售"
          prop="sellCount"
          width="80px">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime">
        </el-table-column>
        <el-table-column
          label="操作"
          width="210px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="showSpec(scope.row.id)">规格</el-button>
            <el-button
              size="mini"
              @click="showForm(scope.$index)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              v-show="scope.row.status == '1'"
              @click="delList(scope.$index, scope.row.id)">下架</el-button>
            <el-button
              size="mini"
              type="danger"
              v-show="scope.row.status == '0'"
              @click="upperShelfProduct(scope.$index, scope.row.id)">上架</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="formPagination"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
      ></el-pagination>
    </div>
    <formList v-show="compStatus == 1" :formItem="formItem" v-on:cancel="closeForm"></formList>
    <specComp v-show="compStatus == 2" :prodId="prodId" v-on:cancel="closeSpec"></specComp>
  </div>
</template>

<script>
import { getListProducts, lowerShelfProduct, upperShelfProduct } from '@/request/api'
import formList from './components/form.vue'
import specComp from './components/spec.vue'
export default {
  name: "product",
  data() {
    return {
      compStatus: 0,
      formItem: {},
      prodId: '',
      loading: false,
      total: 0,
      prodName: '',
      pageSize: 10,
      pageIndex: 1,
      productList: []
    };
  },
  components:{
    formList, specComp
  },
  methods: {
    showForm(index) {
      this.compStatus = 1
      this.formItem = this.productList[index]
    },
    currentChange(index) {
      this.pageIndex = index
      this.getListProducts()
    },
    closeForm() {
      this.getListProducts()
      this.compStatus = 0
    },
    closeSpec () {
      this.compStatus = 0
    },
    showSpec (id) {
      this.compStatus = 2
      this.prodId = id
    },
    delList(index, id) {
      this.lowerShelfProduct(index, id)
    },
    lowerShelfProduct (index, id) {
      if (this.loading) return false
      this.loading = true
      lowerShelfProduct({
        prodId: id
      }).then((res)=>{
        this.loading = false
        if (res.status === 200 && res.data.resultCode === '000001') {
          this.$message({
            message: "下架成功",
            type: "success"
          });
          this.productList[index].status = '0'
        } else {
          this.$message({
            message: "下架失败",
            type: "error"
          });
        }
      }).catch((error)=>{
        this.loading = false
      })
    },
    upperShelfProduct (index, id) {
      if (this.loading) return false
      this.loading = true
      upperShelfProduct({
        prodId: id
      }).then((res)=>{
        this.loading = false
        if (res.status === 200 && res.data.resultCode === '000001') {
          this.$message({
            message: "上架成功",
            type: "success"
          });
          this.productList[index].status = '1'
        } else {
          this.$message({
            message: "上架失败",
            type: "error"
          });
        }
      }).catch((error)=>{
        this.loading = false
      })
    },
    getListProducts() {
      if (this.loading) return false
      this.loading = true
      getListProducts({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        prodName: this.prodName
      }).then((res)=>{
        this.loading = false
        if (res.status === 200 && res.data.resultCode === '000001') {
          for (let i = 0; i < res.data.resultObject.list.length; i++) {
            const element = res.data.resultObject.list[i];
            if (element.secondImg) {
              element.secondImg = element.secondImg.split(",")
            }
          }
          this.productList = res.data.resultObject.list
          this.total = res.data.resultObject.total
        }
      }).catch((error)=>{
        this.loading = false
      })
    },
    searchClick () {
      this.getListProducts()
    },
    addBtnClick () {
      this.formItem = {}
      this.compStatus = 1
    }
  },
  mounted () {
    this.getListProducts()
  }
};
</script>

<style lang="scss">
.product {
  .top-box{
    margin-bottom: 10px;
    .search-input{
      width: 200px;
      margin-right: 10px;
    }
  }
  .productList{
    .el-form-item{
      width: 50%;
    }
  }
  table{
    img{
      width: 50px;
      height: 50px;
    }
  }
  .formPagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
}
</style>

