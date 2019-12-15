<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      <el-card class="box-card">
        <el-row :gutter="20" stripe  >
             <el-col :span="4">
                <el-button type="primary" size="mini">新增</el-button>
            </el-col>
            <el-col :span="14"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        <el-table :data="userList" height="250" >
            <el-table-column label="Uid" prop="user_id" width="100px"></el-table-column>
            <el-table-column label="用户名" prop="name"  width="150px"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="状态" prop="status">
              <template slot-scope="scope" >
                  <el-switch v-model="scope.row.status" @change="userStatusChange(scope.row)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
                <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            </el-table-column>
        </el-table>
      </el-card>
     </div>
</template>

<script>
export default {
  data () {
    return {
      userList: []
    }
  },

  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('/user')
      this.userList = res.data
    },
    async userStatusChange (userInfo) {
      console.log(userInfo)
      const { data: res } = await this.$http.put('/update_status', { 'user_id': userInfo.user_id, 'status': userInfo.status })
      if (res.code === 200) {
        return this.$msg.success('更新状态成功')
      }
      userInfo.status = !userInfo.status
      return this.$msg.error('更新状态失败')
    }
  }
}
</script>
.el-card {

}
<style lang="less" scoped>
.box-card {
    height: 100%;
}
</style>
