<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图 -->
      <el-card>
        <!-- 添加角色按钮区域 -->
        <el-row>
          <el-col>
            <el-button type="primary"  @click="addDialogVisible = true">添加角色</el-button>
          </el-col>
        </el-row>
        <el-table :data="rolesList" border stripe>
          <!-- 展开列 -->
          <el-table-column  type="expand">
            <template slot-scope="scope">
              <el-row :class="['bdbottom', i1===0? 'bdtop':'','vcenter']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
                <!-- 渲染一级权限 -->
                <el-col :span="5">
                  <el-tag  >
                  {{ item1.authName }}
                  <i class="el-icon-caret-right"></i>
                  </el-tag>
                </el-col>

                <!-- 渲染二级和三级权限 -->
                <el-col :span="19">
                  <el-row :class="[i2 === 0? '':'bdtop','vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                    <el-col :span="6">
                      <el-tag type="success">
                      <i class="el-icon-caret-right"></i>

                      {{ item2.authName }}
                      </el-tag>
                    </el-col>
                    <el-col :span="18">
                      <el-tag closable type="warning" :class="[i3 === 0? '':'bdtop']" v-for="(item3, i3) in item2.children" :key="item3.id" @close="removeRightByid(scope.row, item3.id)">{{item3.authName}}</el-tag>
                    </el-col>
                  </el-row>
                </el-col>

              </el-row>
              <pre>
              <!-- {{ scope.row }} -->
              </pre>
            </template>
          </el-table-column>
          <!-- 索引列  -->
          <el-table-column  type="index" label="#"></el-table-column>
          <el-table-column  label="角色名称" prop="roleName"></el-table-column>
          <el-table-column  label="角色描述" prop="roleDesc"></el-table-column>
          <el-table-column label='操作'> 
            <template slot-scope="scope">
              <!-- 修改用户 -->
              <el-button type="primary" size="mini" @click="showeditrulesdialog(scope.row.id)" icon="el-icon-edit">编辑</el-button>
              <!-- 删除用户 -->
              <el-button type="danger" size="mini" @click='delrulesUser(scope.row.id)' icon="el-icon-delete">删除</el-button>
              <el-button type="warning" size="mini" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 添加权限人员表单 -->
      <el-dialog title="添加权限人员" :visible.sync="addDialogVisible" width="40%" @close="addDialogclosed">
        
        <el-form
          :model="addrolesForm"
          :rules="addroleFormrules"
          ref="ruleFormRef"
          label-width="100px"
        >
          <el-form-item label="角色名称" prop="roleName" >
            <el-input v-model="addrolesForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="addrolesForm.roleDesc"></el-input>
          </el-form-item>
          
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addrolesUser"
            >确 定</el-button
          >
        </span>
      </el-dialog> 
      <!-- 编辑权限人员 -->
      <!-- roles/:id -->
      
      <el-dialog title="编辑权限人员" :visible.sync="editdialogvisible" width="40%" @click="editdialogclose">
        
        <el-form
          :model="editrolesform"
          :rules="addroleFormrules"
          ref="editrolesformRef"
          label-width="100px"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="editrolesform.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="editrolesform.roleDesc"></el-input>
          </el-form-item>
          
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editdialogvisible = false">取 消</el-button>
          <el-button type="primary" @click="editrolesUser"
            >确 定</el-button
          >
        </span>
      </el-dialog>
          <!-- 分配权限的对话框 -->
      <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%" @close="setRightDialogClosed">
        <!-- 树形控件 -->
        <el-tree :data="rightslist" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setRightDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="allotRights">确 定</el-button>
        </span>
      </el-dialog> 

    </div>
</template>

<script>

export default {
    data() {
      return {
        rolesList: [],
        addDialogVisible: false,
        editdialogvisible: false,
              // 控制分配权限对话框的显示与隐藏
        setRightDialogVisible: false,
        // 所有权限的数据
        rightslist: [],
        addrolesForm: {
          roleName:'',
          roleDesc:''

        },
              // 树形控件的属性绑定对象
        treeProps: {
          label: 'authName',
          children: 'children'
        },
        editrolesform: {

        },
        addroleFormrules: {
            roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          roleDesc: [
            { required: true, message: '请输入角色描述', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ]

        },
                // 默认选中的节点Id值数组
        defKeys: [],
        // 当前即将分配权限的角色id
        roleId: ''

      };
    },
    created() {
      this.getRloesList()

    },
    mounted() {

    },
    methods: {
      async getRloesList(){
        const {data: res} = await this.$http.get('roles')
        console.log(res)
        if (res.meta.status !== 200){
          return this.$message.error('获取角色列表失败！')
        }
        this.rolesList = res.data

      },
      // 添加
      addrolesUser(){
        this.$refs.ruleFormRef.validate(async valid => {
          // console.log(valid)
          if (!valid) return
          const {data: res} = await this.$http.post('roles', this.addrolesForm)
          if (res.meta.status !== 201){
            this.$message.error('添加权限人员失败！')
          }
          this.$message.success('添加权限人员成功！')
          this.addDialogVisible = false
          this.getRloesList()

        })

      },
      // 添加框关闭清空
      addDialogclosed(){
        this.$refs.ruleFormRef.resetFields()
      },
      // 展示修改框
      async showeditrulesdialog(id){
        const { data: res} = await this.$http.get('roles/' + id)
        console.log(res)
        if (res.meta.status !== 200){
          return this.$message.error('查询用户信息失败！')
        }

        this.editrolesform = res.data


        this.editdialogvisible = true
        // console.log(id)
      },
      // 修改框关闭清空
      editdialogclose(){
        this.$refs.editrolesformRef.resetFields()
      },
      // 修改
      editrolesUser(){
        this.$refs.editrolesformRef.validate(async valid => {
          if (!valid) return
          const {data: res} = await this.$http.put('roles/' +this.editrolesform.roleId, {
            roleName: this.editrolesform.roleName,
            roleDesc: this.editrolesform.roleDesc
            
          })

          if (res.meta.status !== 200){
            return this.$message.error('更新权限人员失败！')
          }
          this.editdialogvisible = false
          this.getRloesList()
          this.$message.success('更新权限人员成功！')

        })

       
      },
      // 删除、
      async delrulesUser(id){
        // console.log(id)
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
        const {data: res} = await this.$http.delete('roles/' +id)
        if (res.meta.status !== 200){
          return this.$message.error('删除权限用户失败！')
        }
        this.$message.success('删除权限用户成功！')
        this.getRloesList()
      },
      async removeRightByid(role, rightId){
        const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).catch(err => err)
        // 确认删除字符串confirm
        // 取消删除字符串cancel
        // console.log(confirmResult)

        if (confirmResult !== 'confirm'){
          return this.$message.info('已经取消了删除！')
        }
        // console.log('确认了删除')
        const { data: res } = await this.$http.delete(
          `roles/${role.id}/rights/${rightId}`
        )
        if (res.meta.status !== 200){
          return this.$message.error('删除权限失败！')
        }
        // this.$message.success('删除权限成功！')
              // this.getRolesList()
        role.children = res.data

      },
       // 点击为角色分配权限
      async allotRights() {
        const keys = [
          ...this.$refs.treeRef.getCheckedKeys(),
          ...this.$refs.treeRef.getHalfCheckedKeys()
        ]

        const idStr = keys.join(',')

        const { data: res } = await this.$http.post(
          `roles/${this.roleId}/rights`,
          { rids: idStr }
        )

        if (res.meta.status !== 200) {
          return this.$message.error('分配权限失败！')
        }

        this.$message.success('分配权限成功！')
        this.getRloesList()
        
        this.setRightDialogVisible = false
      },
          // 监听分配权限对话框的关闭事件
      setRightDialogClosed() {
        this.defKeys = []
      },
          // 展示分配权限的对话框
      async showSetRightDialog(role) {
        this.roleId = role.id
        // 获取所有权限的数据
        const { data: res } = await this.$http.get('rights/tree')

        if (res.meta.status !== 200) {
          return this.$message.error('获取权限数据失败！')
        }

        // 把获取到的权限数据保存到 data 中
        this.rightslist = res.data
        console.log(this.rightslist)

        // 递归获取三级节点的Id
        this.getLeafKeys(role, this.defKeys)

        this.setRightDialogVisible = true
      },
          // 通过递归的形式，获取角色下所有三级权限的id，并保存到 defKeys 数组中
      getLeafKeys(node, arr) {
        // 如果当前 node 节点不包含 children 属性，则是三级节点
        if (!node.children) {
          return arr.push(node.id)
        }

        node.children.forEach(item => this.getLeafKeys(item, arr))
      }



     
    }
  };
</script>

<style scoped lang="less">
.el-tag{
  margin: 7px;
}
.bdtop{
  border-top: 1px solid #eee;
}
.bdbottom{
  border-bottom: 1px solid #eee;
}
.vcenter{
  display: flex;
  align-items: center;
}

</style>
