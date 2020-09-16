<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col :span="8">
         <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getOrderList">
            <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
        </el-input>
        </el-col>
      </el-row>
      <!-- 订单列表数据 -->
      <el-table :data="orderlist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="order_pay">
          <template slot-scope="scope">
            <el-tag type="danger" size="mini" v-if="scope.row.order_pay === '0'"
              >未付款</el-tag
            >
            <el-tag type="success" size="mini" v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" prop="create_time">
          <template slot-scope="scope">
            {{ scope.row.create_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showchangeorderdialog"
            ></el-button>
            <el-button
              size="mini"
              type="success"
              icon="el-icon-location"
              @click="showprocessBox"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 点击修改对话框 -->
    <el-dialog
      title="修改订单"
      :visible.sync="changeorderdialogVisible"
      width="50%"
    >
      <el-form
        :model="changeorderForm"
        :rules="changeorderFormRules"
        ref="changeorderFormRef"
        label-width="100px"
      >
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            v-model="changeorderForm.address1"
            :options="cityData"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="changeorderForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeorderdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeorderdialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 展示物流进度对话框 -->
    <el-dialog
      title="添加"
      :visible.sync="processvisible"
      width="50%"
      >
      <el-timeline >
        <el-timeline-item
          v-for="(activity, index) in processinfo"
          :key="index"
          :timestamp="activity.time">
          {{activity.context}}
        </el-timeline-item>
      </el-timeline>
 
    </el-dialog>
  </div>
</template>

<script>
import cityData from './citydata.js'

export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      orderlist: [],
      changeorderdialogVisible: false,
      changeorderForm: {
        address1: '',
        address2: ''
      },
      changeorderFormRules: {
        address1: [
          { required: true, message: '请选择省市区县', trigger: 'blur' }
        ],
        address2: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ]
      },
      cityData,
      processvisible: false,
      processinfo: []
    }
  },
  created() {
    this.getOrderList()
  },
  mounted() {},
  methods: {
    async getOrderList() {
      const { data: res } = await this.$http.get('orders', {
        params: this.queryInfo
       
      })
     

      if (res.meta.status !== 200) {
        return this.$message.error('获取订单列表失败！')
      }

      // this.$message.success('获取订单成功！')
      console.log(res)
      this.total = res.data.total
      this.orderlist = res.data.goods
    },
    // 页码大小改变事件
    handleSizeChange(newSize) {
      // 把新的页码赋值给pagesize
      this.queryInfo.pagesize = newSize
      // 重新渲染数据
      this.getOrderList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrderList()
    },
    showchangeorderdialog() {
      this.changeorderdialogVisible = true
    },
    async showprocessBox(){
      const { data: res } = await this.$http.get('/kuaidi/1106975712662')
      if (res.meta.status !== 200){
        return this.$message.error('获取物流列表失败')
      }

      this.processinfo = res.data
      
      this.processvisible = true
      console.log(this.processinfo)
    }

  }
}
</script>

<style scoped lang="less">
@import '../../plugins/timeline/timeline.css';
@import '../../plugins/timeline-item/timeline-item.css';
</style>
