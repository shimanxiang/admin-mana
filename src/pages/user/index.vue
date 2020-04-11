<template>
  <div class="userlist tableData">
    <div class="userList">
      <el-row class="top-box">
        <el-input
          class="search-input"
          placeholder="客户名称"
          prefix-icon="el-icon-search"
          v-model="searchValue">
        </el-input>
        <el-button type="primary" @click="searchClick">搜索</el-button>
      </el-row>
       <el-table border :data="userList">
        <el-table-column
          label="客户名称"
          prop="nickName">
        </el-table-column>
        <el-table-column
          label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.headImg" alt="">
          </template>
        </el-table-column>
        <el-table-column
          label="积分"
          prop="integral">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime">
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
        class="formPagination"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script>
import { getUserList } from '@/request/api'
export default {
  name: "userlist",
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      searchValue: '',
      loading: false,
      userList: [],
      total: 0
    };
  },
  methods: {
    currentChange(index) {
      this.pageIndex = index
      this.getUserList()
    },
    getUserList() {
      if (this.loading) return false
      this.loading = true
      getUserList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        searchValue: this.searchValue,
      }).then((res)=>{
        this.loading = false
        if (res.status === 200 && res.data.resultCode === '000001') {
          this.userList = res.data.resultObject.list
        }
      }).catch((error)=>{
        this.loading = false
      })
    },
    searchClick () {
      this.getUserList()
    }
  },
  mounted () {
    this.getUserList()
  }
};
</script>

<style lang="scss">
.userlist {
  .top-box{
    margin-bottom: 10px;
    .search-input{
      width: 200px;
      margin-right: 10px;
    }
    .select-box{
        margin-right: 10px;
    }
  }
  img{
    width: 80px;
    height: 80px;
  }
  .formPagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
}
</style>

