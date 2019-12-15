<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>测试管理</el-breadcrumb-item>
        <el-breadcrumb-item>测试用例</el-breadcrumb-item>
        </el-breadcrumb>
      <el-card class="box-card">
        <el-row :gutter="20" stripe  height="250">
             <el-col :span="4">
                <el-button type="primary" size="mini" @click="addDialogVisible = true">新增</el-button>
            </el-col>
            <el-col :span="14"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6">
                <el-input placeholder="请输入内容" class="input-with-select" size="mini" v-model="queryInfo.keyword" clearable @clear="getCaseList" >
                    <el-button slot="append" icon="el-icon-search" @click="getCaseList"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-table :data="caseList" >
            <el-table-column label="CaseId" prop="id" width="100px"></el-table-column>
            <el-table-column label="模块" prop="module"  width="130px"></el-table-column>
            <el-table-column label="类名" prop="clazz"></el-table-column>
            <el-table-column label="方法" prop="method"></el-table-column>
            <el-table-column label="描述" prop="remark" width="400px"></el-table-column>
            <el-table-column label="操作" width="120px">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeCaseById(scope.row.id)"></el-button>
              </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </el-card>
      <!-- 新增用例对话框-->
      <el-dialog
        title="新增用例"
        :visible.sync="addDialogVisible"
        width="35%"
        @close="addDialogClose">
        <el-form ref="addFormRef" :model="addForm" label-width="70px" :rules="addFormRules">
          <el-form-item label="模块" prop="module">
            <el-input v-model="addForm.module"></el-input>
          </el-form-item>
          <el-form-item label="类名" prop="clazz">
            <el-input v-model="addForm.clazz"></el-input>
          </el-form-item>
          <el-form-item label="方法" prop="method">
            <el-input v-model="addForm.method"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="remark">
            <el-input v-model="addForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCase" >保 存</el-button>
        </span>
      </el-dialog>

      <!-- 修改用例对话框-->
      <el-dialog
        title="编辑用例"
        :visible.sync="editDialogVisible"
        width="40%"
        @close="editDialogClose">
        <el-form ref="editFormRef" :model="editForm" label-width="70px" :rules="addFormRules">
          <el-form-item label="模块" prop="module">
            <el-input v-model="editForm.module"></el-input>
          </el-form-item>
          <el-form-item label="类名" prop="clazz">
            <el-input v-model="editForm.clazz"></el-input>
          </el-form-item>
          <el-form-item label="方法" prop="method">
            <el-input v-model="editForm.method"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="remark">
            <el-input v-model="editForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCase" >保 存</el-button>
        </span>
      </el-dialog>

     </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        keyword: '',
        pagenum: 1,
        pagesize: 10
      },
      caseList: [],
      total: 0,
      // 控制新增用例对话框
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        module: '',
        clazz: '',
        method: '',
        remark: ''
      },
      editForm: {},
      addFormRules: {
        module: [
          { required: true, message: '请输入用例模块', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 6 到 50 个字符', trigger: 'blur' }
        ],
        clazz: [
          { required: true, message: '请输入用例所属类', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 6 到 50 个字符', trigger: 'blur' }
        ],
        method: [
          { required: true, message: '请输入方法名', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 6 到 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getCaseList()
  },
  methods: {
    async getCaseList () {
      const { data: res } = await this.$http.get('case_list', { params: this.queryInfo })
      if (res.code !== 200) return this.$msg.error('获取用例列表失败')
      this.caseList = res.data.case_li
      this.total = res.data.total
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getCaseList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getCaseList()
    },
    addDialogClose () {
      this.$refs.addFormRef.resetFields()
    },
    editDialogClose () {
      this.$refs.editFormRef.resetFields()
    },
    addCase () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('saveCase', this.addForm)
        if (res.code !== 200) return this.$msg.error('添加用例失败')
        this.$msg.success('添加用例成功')
        this.addDialogVisible = false
        this.getCaseList()
      })
    },
    async showEditDialog (id) {
      this.editDialogVisible = true
      const { data: res } = await this.$http.get('get_case_by_id?id=' + id)
      if (res.code !== 200) return this.$msg.error('查询用例信息失败')
      this.editForm = res.data
    },
    async editCase () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('saveCase', this.editForm)
        if (res.code !== 200) return this.$msg.error('用例信息编辑失败')
        this.$msg.success('用例信息编辑成功')
        this.editDialogVisible = false
        this.getCaseList()
      })
    },
    async removeCaseById (id) {
      // 弹框提示
      const confirmResult = await this.$confirm('此操作将删除该用例, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$msg.info('已取消删除')
      const { data: res } = await this.$http.delete('delete_case?id=' + id)
      if (res.code !== 200) return this.$msg.error('删除失败')
      this.$msg.success('删除成功')
      this.getCaseList()
    }
  }
}
</script>

<style lang="less" scoped>
.grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
