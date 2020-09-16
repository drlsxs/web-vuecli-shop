<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/luxury.jpg" alt />
        <span>luxury电商后台管理系统</span>
      </div>
      <el-button type="info" @click="quittologin">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="iscollapse ?'64px': '200px'">
          <div class="toggle_button" @click="togglecollapse">|||</div>
          <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#323744" text-color="#fff" active-text-color="#409EFF" :unique-opened="true" :collapse="iscollapse" :collapse-transition="false" router :default-active='activepath'>
            <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
              <!-- 一级菜单模板区域 -->
            <template slot="title">
                <!-- 图标 -->
              <i :class="iconobj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName }}</span>
            </template>
            <!-- 二级菜单区域 -->
           <el-menu-item :index="'/'+ subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="savenavstate('/'+ subItem.path)">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>{{subItem.authName}}</span>
                    </template>
           </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>   
export default {
  data() {
    return {
        iscollapse: false,
        activepath:'',
        // 左侧菜单数据
        menulist: [],
        iconobj: {
            125: 'iconfont icon-user',
            103: 'iconfont icon-tijikongjian',
            101: 'iconfont icon-shangpin',
            102: 'iconfont icon-danju',
            145: 'iconfont icon-baobiao'
        }
    }
  },
  created() {
      this.getMenuList()
      this.activepath = window.sessionStorage.getItem('activepath')
      
  },
  mounted() {},   
  methods: {  
    quittologin() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },    
    // 获取所有的菜单   
    async getMenuList() {
        const {data: res} = await this.$http.get('menus')
        console.log(res)   
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.menulist = res.data

    },
    // 点击按钮切换菜单折叠和展开
    togglecollapse(){
        this.iscollapse = !this.iscollapse

    },
    // 保存连接的激活状态
    savenavstate(activepath){
        window.sessionStorage.setItem('activepath', activepath)
        this.activepath = activepath
    }
  
  }
}
</script>

<style scoped lang="less">
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373c41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;  
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
  }
  img{

    width: 65px;
    height: 56px;

   
  }
  span {
    margin-left: 25px;
  }
}
.el-aside {
  background-color: #323744;
  .el-menu{
      border-right: none;
  }
  .toggle_button{
      background-color: #4a5064;
      color: #fff;
      text-align: center;
      cursor: pointer;
      font-size: 10px;
      line-height: 24px;
      letter-spacing: 0.2em;


  }
}
.el-main {
  background-color: #eaedf2;
}
.iconfont{
   margin-right: 10px;
}
</style>
