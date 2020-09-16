<template>
  <div>
    <!-- 面包屑导航列表 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->

    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
         <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
        </el-input>

        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">
            添加用戶</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userstatechange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showeditdialog(scope.row.id)"
             
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserByid(scope.row.id)"
            ></el-button>
            <!-- 分配角色 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="allotRoles(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogclosed">
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="ruleFormRef"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editdialogvisible"
      width="50%"
      @click="editdialogclose"
    >
      <el-form :model="editform" :rules="editformRules" ref="editformRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editform.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editform.email" ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editform.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogvisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="allotdialogVisible"
      width="50%"
      >
      <div>
        <p>当前的用户: {{ allotinfo.username }}</p>
        <p>当前的角色: {{ allotinfo.role_name}}</p>
        <p>分配新角色：
          <el-select v-model="selectRoleId" placeholder="请选择">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allotdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveroleinfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 验证邮箱规则
    var checkemail = (rules,value,cb) => {
      const regemail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regemail.test(value)){
        // 合法邮箱
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }

    var checkmobile = (rules,value,cb) => {
      const regmobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regmobile.test(value)){
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }

    // 验证手机号规则
    // var checkmobile = () => {}
    return {
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        pagesize: 2
      },
      userlist: [],
      total: 0,
      //   控制添加用户框的显示与隐藏
      addDialogVisible: false,
      // 添加用户号的数据表单
      addForm: {
        username: '',
        password:'',
        email:'',
        mobile:''
      },
      // 添加表单验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },{validator: checkemail, trigger:'blur'}
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },{validator: checkmobile, trigger:'blur'}
        ]
      },
       //   控制修改用户框的显示与隐藏
      editdialogvisible: false,
      editform: {

      },
      editformRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },{validator: checkemail, trigger:'blur'}

        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },{validator: checkmobile, trigger:'blur'}

        ]

      },
      allotdialogVisible: false,
      allotinfo: {},
      rolelist:[],
      selectRoleId:''
    }
  },
  created() {
    this.getUserList()
  },
  mounted() {},
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.userlist = res.data.users
      this.total = res.data.total
      console.log(res)
    },
    // 监听pagesize值改变事件
    handleSizeChange(newsize) {
      // console.log(newsize)
      this.queryInfo.pagesize = newsize
      this.getUserList()
    },
    // 监听页码值改变事件
    handleCurrentChange(newpage) {
      console.log(newpage)
      this.queryInfo.pagenum = newpage
      this.getUserList()
    },
    // 监听state开关变化
    async userstatechange(userinfo) {
      console.log(userinfo)
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      )
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('更新用户状态失败！')
      }
      this.$message.success('更新用户状态成功！')
    },
    // 监听对话框关闭事件
    addDialogclosed(){
      this.$refs.ruleFormRef.resetFields()
    },
    // 点击按键添加用户
    addUser(){
      this.$refs.ruleFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201){
          this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功！')
        this.addDialogVisible = false
        this.getUserList()

      })
    },
    async showeditdialog(id){
      const { data: res} = await this.$http.get('users/' + id)
      console.log(res)
      if (res.meta.status !== 200){
        return this.$message.error('查询用户信息失败！')
      }

      this.editform = res.data


      this.editdialogvisible = true
      // console.log(id)
    },
    // 监听修改对话框关闭事件
    editdialogclose(){
      this.$refs.editformRef.resetFields()
    },
    // 修改用户信息预验证
    editUser(){
      
      this.$refs.editformRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return
        // 发起请求、
        const { data: res} = await this.$http.put('users/' +this.editform.id, {
          email: this.editform.email,
          mobile: this.editform.mobile
        })

        if (res.meta.status !== 200){
          return this.$message.error('更新用户信息失败！')
        }
        // 关闭对话框
        this.editdialogvisible = false
        // 刷新数据列表
        this.getUserList()
        // 提示修改成功
        this.$message.success('更新用户信息成功！')

      
      })

    },
    async removeUserByid(id){
      // console.log(id)
      // 询问用户是否删除
       const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).catch(err => err)
      // 确认删除字符串confirm
      // 取消删除字符串cancel
      console.log(confirmResult)

      if (confirmResult !== 'confirm'){
        return this.$message.info('已经取消了删除！')
      }
      // console.log('确认了删除')
      const {data: res} = await this.$http.delete('users/' + id)

      if (res.meta.status !==200){
        return this.$message.error('删除用户失败！')
      }

      this.$message.success('删除用户成功！')
      this.getUserList()

    },
    async allotRoles(allotinfo){
      this.allotinfo = allotinfo

      // 在展示之前获取角色列表
      const { data: res } = await this.$http.get('roles')

      if (res.meta.status !== 200){
        return this.$message.error('获取角色列表失败！')
      }

      this.rolelist = res.data
      this.allotdialogVisible = true
    },
    async saveroleinfo(){
      if (!this.selectRoleId){
        return this.$message.error('请选择要更新的角色')
      }

      const {data: res} = await this.$http.put(`users/${ this.allotinfo.id }/role`, { rid: this.selectRoleId })
      if (res.meta.status !== 200){
        return this.$message.error('更新角色列表失败！')
      }

      this.$message.success('更新角色列表成功！')
      this.getUserList()
      this.allotdialogVisible = false
    }
  }
}
</script>

<style scoped lang="less">

</style>
