<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>测试管理</el-breadcrumb-item>
        <el-breadcrumb-item>测试用例</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
        <div v-for="o in 4" :key="o" class="text item">
        </div>
        </el-card>
     </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
</style>
