<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>

      <el-card>
        <el-row>
          <el-col>
            <el-button type="primary" @click="showaddcatedialog">添加分类</el-button>
          </el-col>
        </el-row>

        <!-- 绑定数据 -->
        <!-- 指定列的定义 -->
        <!-- 取消复选框 -->
        <!-- 取消展开行 -->
        <!-- 显示数据索引 -->
        <!-- 设置数据索引名称 -->
        <!-- 纵向的边框 -->

        <!-- 表格 -->
        <tree-table
        :data="catelist"
        :columns="columns"
        :selection-type="false" 
        :expand-type="false"
        show-index
        index-text="#"
        border
        class="treetable"
        >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen"></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <!-- 排序 -->
        <template slot="paixu" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" v-else-if="scope.row.cat_level === 1" type="success">二级</el-tag>
          <el-tag size="mini" v-else type="warning">三级</el-tag>

        </template>
        <template slot="opt">
          <el-button size="mini" type="primary" icon="el-icon-deit">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>

        </template>

        </tree-table>

        <!-- 分页区域 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryinfo.pagenum"
          :page-sizes="[3, 5, 10, 15]"
          :page-size="queryinfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>

      </el-card>

      <!-- 添加分类的对话框 -->
      <el-dialog
        title="添加分类"
        :visible.sync="addcatedialogVisible"
        width="30%"
        @close="addCatedialogclosed"
        >
        <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="addCateForm.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级名称">
            <!-- option用来指定数据源 -->
            <!-- props用来指定配置对象 -->
            <!-- 级联选择器 -->
            <el-cascader
              v-model="selectedKeys"
              :options="parentCateList"
              :props="{ value: 'cat_id', label: 'cat_name',  children: 'children',checkStrictly: true, expandTrigger: 'hover'}"
              clearable
              @change="parentCatchanged">
            </el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addcatedialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addcate">确 定</el-button>
        </span>
      </el-dialog>

    </div>
</template>

<script>

export default {
    data() {
        return {
          // 查询条件
          queryinfo: {
            type: 3,
            pagenum: 1,
            pagesize: 5
          },

          // 商品分类数据列表默认为空
          catelist: [],
          total:0,
          // 为table指定列的定义
          columns:[
            {
              label:'分类名称',
              prop: 'cat_name'

            },
            {
              label: '是否有效',
              // 将当前列定义为模板列
              type: 'template',
              // 表示这一列使用模板的名称
              template: 'isok'
            },
            {
              label: '排序',
              // 将当前列定义为模板列
              type: 'template',
              // 表示这一列使用模板的名称
              template: 'paixu'
            },
            {
              label: '操作',
              // 将当前列定义为模板列
              type: 'template',
              // 表示这一列使用模板的名称
              template: 'opt'
            }
            
            
          ],
          // 控制添加分类对话框的显示与隐藏
          addcatedialogVisible: false,
          // 添加分类的表单对象
          addCateForm: {
            // 将要添加分类的名称
            cat_name: '',
            cat_pid: 0,
            // 分类默认添加一级
            cat_level: 0
          },
          // 将要添加分类的表单的验证规则
          addCateFormRules: {

            cat_name: [
              { required: true, message: '请输入分类名称', trigger: 'blur' }
            ]



          },
          // 父级分类的列表
          parentCateList: [],
          // 指定级联选择器的配置对象
          // cascaderProps:[
          //   {
          //     value: 'cat_id',
          //     label: 'cat_name',
          //     children: 'children'
          //   }
          // ],
          // 选中的父级分类的id数组
          selectedKeys: []
          

        };
    },
    created() {

      this.getCatelist()

    },
    mounted() {

    },
    methods: {
      // 获取商品分类数据
      async getCatelist(){
        const {data: res} = await this.$http.get('categories', {params: this.queryinfo})

        if (res.meta.status !== 200){
          return this.$message.error('获取商品分类列表失败！')
        }

        console.log(res.data)
        // 把数据列表赋值给catalist
        this.catelist = res.data.result
        // 把数据总数赋值给total
        this.total = res.data.total

      },
      // 监听pageSize页码大小变化，传递值重新渲染
      handleSizeChange(newSize){
        this.queryinfo.pagesize = newSize
        this.getCatelist()
      },
      // 监听pagenum改变
      handleCurrentChange(newPage){
        this.queryinfo.pagenum = newPage
        this.getCatelist()

      },
      // 点击按钮显示添加分类对话框
      showaddcatedialog(){
        // 先获取父级分类在展示对话框
        this.getParentCateList()
        this.addcatedialogVisible = true
      },
      // 获取父级分类列表
      async getParentCateList() {
        const { data: res } = await this.$http.get('categories', {
          params: { type: 2 }
        })

        if (res.meta.status !== 200) {
          return this.$message.error('获取父级分类数据失败！')
        }

        console.log(res.data)
        this.parentCateList = res.data
      },

      parentCatchanged(){
        console.log(this.selectedKeys)
        // 如果selectedKeys>0说明有选中父级分类，反之没有选中
        if (this.selectedKeys.length >0){
          this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length -1]
          
          // 为当前分类的等级赋值
          this.addCateForm.cat_level = this.selectedKeys.length
          // return
        } else {
          // 父级分类的id
          this.addCateForm.cat_pid = 0
          // 为当前分类的等级赋值
          this.addCateForm.cat_level = 0
        }
      },
      // 点击按钮，添加新的分类
      addcate(){
        // console.log(this.addCateForm)
        this.$refs.addCateFormRef.validate(async valid => {
          if (!valid) return
          const { data: res } = await this.$http.post('categories',this.addCateForm)

          if (res.meta.status !== 201){
            return this.$message.error('添加分类失败！')
          }

          this.$message.success('添加分类成功！')
          this.getCatelist()
          this.addcatedialogVisible = false
        })


      },
      // 监听对话框关闭事件
      addCatedialogclosed(){

        // 清空表单
        this.$refs.addCateFormRef.resetFields()
        this.selectedKeys = []
        this.addCateForm.cat_level = 0
        this.addCateForm.cat_pid = 0



      }

    }
  };
</script>

<style scoped lang="less">
.treetable{
  margin-top: 15px;
}
.el-cascader{
  width: 100%;
  // height: 300px;
}

</style>
