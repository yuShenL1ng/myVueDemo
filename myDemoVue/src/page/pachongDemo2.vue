<template>
  <main>
    <el-button type="primary" class="loginBtn" @click="dataFormSubmit3()">爬虫->抓取
    </el-button>
    <span>部门ID:{{ deptId }}</span>
    <span>部门名称:{{ name }}</span>
  </main>
</template>

<script>
  export default {
    data() {
      return {
        deptId: '',
        name: '',

      };
    },
    methods: {
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
