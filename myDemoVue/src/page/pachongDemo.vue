<template>
  <el-main>
    <el-button type="primary" class="loginBtn" @click="dataFormSubmit()">爬虫->黄金ETF当前持仓
    </el-button>
    <el-button type="primary" class="loginBtn" @click="dataFormSubmit2()">爬虫->登陆
    </el-button>
    <div class="demo-image">
      <el-image style="width: 100px; height: 30px" :src="urlImage" fit="contain"></el-image>
      <el-input style="width: 12.5rem;" type="text" v-model="yzm" auto-complete="off" placeholder="请输入验证码"></el-input>
    </div>
    <el-button type="primary" class="loginBtn" @click="dataFormSubmit3()">爬虫->抓取
    </el-button>
    <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" highlight-current-row>
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="净仓" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.jingcheng }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总金额" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="增减" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.zhengjian }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top:15px;">
      <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5,10,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
      </el-pagination>
    </div>
    <span>姓名:{{ username }}</span>
    <span>邮箱:{{ email }}</span>
    <span>单位:{{ deptName }}</span>
    <span>部门ID:{{ deptId }}</span>
    <span>部门名称:{{ name }}</span>
  </el-main>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        deptName: '',
        deptId: '',
        name: '',
        yzm:'',
        urlImage:'http://localhost:8181/test//yzm.jpg',
        tableData: [],
        currentPage: 1, // 当前页码
        pageSize: 5 // 每页的数据条数
      };
    },
    methods: {
      handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      dataFormSubmit() {
        this.tableData = [];
        this.$http({
          url: this.$http.adornUrl('test/test5.action'),
          method: 'post',
          data: this.$http.adornData({})
        }).then(({
          data
        }) => {
          if (data != '') {
            this.tableData = data
          }
        })
      },
      dataFormSubmit2() {
        if(this.yzm == ''){
          alert("验证码不能为空")
          return;
        }
        this.$http({
          url: this.$http.adornUrl('test/test6.action'),
          method: 'post',
          data: this.$http.adornData({
            'yzm' : this.yzm
          })
        }).then(({
          data
        }) => {
          if (data != '') {
            this.username = data.page.list[0].username
            this.email = data.page.list[0].email
            this.deptName = data.page.list[0].deptName
          }
        })
      },
      dataFormSubmit3() {
        this.$http({
          url: this.$http.adornUrl('test/test7.action'),
          method: 'post',
          data: this.$http.adornData({})
        }).then(({
          data
        }) => {
          if (data != '') {
            debugger;

            this.deptId = data[0].deptId
            this.name = data[0].name
          }
        })
      }
    }
  }
</script>

<style>
</style>
