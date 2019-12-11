<template>
  <el-container class="home-container">
    <!--头部区域-->
    <el-header>
      <div>
        <img src="../assets/user.jpg" alt />
        <span>AutoTestManage</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!--左边栏-->
      <el-aside width="200px">
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409fff"
          unique-opened
          router
          default-active="/cases"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-management"></i>
              <span>测试管理</span>
            </template>
            <el-menu-item index="/cases">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>测试用例</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/plan">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>测试任务</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/report">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>测试报告</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--主题区域-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () {
    this.getIndex()
  },
  methods: {
    async getIndex () {
      const { data: res } = await this.$http.get('/index')
      this.user = res.user_name
    },
    logout () {
      this.$http.get('/logout')
      window.sessionStorage.clear()
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #00a65a;
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }

  img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: #ddd;
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}
</style>
