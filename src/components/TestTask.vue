<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>测试管理</el-breadcrumb-item>
        <el-breadcrumb-item>测试任务</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
        <el-row :gutter="10" stripe  height="250">
             <el-col :span="2">
                <el-button type="primary" size="mini" >新增任务</el-button>
            </el-col>
            <el-col :span="2">
                 <el-button type="primary" size="mini">添加版本</el-button>
            </el-col>
            <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="4"><span>当前版本：V-3990902432</span></el-col>
        </el-row>
         <el-table :data="taskList" >
            <el-table-column label="tId" prop="id" width="70px"></el-table-column>
            <el-table-column label="任务名称" prop="name"  width="150px"></el-table-column>
            <el-table-column label="描述" prop="remark"  width="250px"></el-table-column>
            <el-table-column label="执行时间" prop="task"></el-table-column>
            <el-table-column label="最新报告" prop="report" width="400px"></el-table-column>
            <el-table-column label="操作" width="120px">
              <template >
                <el-button type="primary" icon="el-icon-edit" size="mini" ></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
              </template>
            </el-table-column>
        </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      taskList: []
    }
  },
  created () {
    this.getTaskList()
  },
  methods: {
    async getTaskList () {
      const { data: res } = await this.$http.get('/task_list')
      if (res.code !== 200) return this.$msg.error('查询列表失败')
      this.taskList = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.grid-content {
    border-radius: 4px;
    min-height: 52px;
  }
</style>
