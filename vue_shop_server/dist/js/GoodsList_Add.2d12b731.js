(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["GoodsList_Add"],{1996:function(e,t,a){"use strict";var r=a("67c5"),n=a.n(r);n.a},"4f9b":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("商品管理")]),a("el-breadcrumb-item",[e._v("添加商品")])],1),a("el-card",[a("el-alert",{attrs:{title:"添加商品信息",type:"info",center:"","show-icon":"",closable:!1}}),a("el-steps",{attrs:{space:200,active:e.activeIndex-0,"finish-status":"success","align-center":""}},[a("el-step",{attrs:{title:"基本信息"}}),a("el-step",{attrs:{title:"商品参数"}}),a("el-step",{attrs:{title:"商品属性"}}),a("el-step",{attrs:{title:"商品图片"}}),a("el-step",{attrs:{title:"商品内容"}}),a("el-step",{attrs:{title:"完成"}})],1),a("el-form",{ref:"addFormRef",attrs:{model:e.addForm,rules:e.addFormRules,"label-width":"100px","label-position":"top"}},[a("el-tabs",{attrs:{"tab-position":"left","before-leave":e.beforeTabLeave},on:{"tab-click":e.tabClicked},model:{value:e.activeIndex,callback:function(t){e.activeIndex=t},expression:"activeIndex"}},[a("el-tab-pane",{attrs:{label:"基本信息",name:"0"}},[a("el-form-item",{attrs:{label:"商品名称",prop:"goods_name"}},[a("el-input",{model:{value:e.addForm.goods_name,callback:function(t){e.$set(e.addForm,"goods_name",t)},expression:"addForm.goods_name"}})],1),a("el-form-item",{attrs:{label:"商品价格",prop:"goods_price"}},[a("el-input",{attrs:{type:"number"},model:{value:e.addForm.goods_price,callback:function(t){e.$set(e.addForm,"goods_price",t)},expression:"addForm.goods_price"}})],1),a("el-form-item",{attrs:{label:"商品重量",prop:"goods_weight"}},[a("el-input",{attrs:{type:"number"},model:{value:e.addForm.goods_weight,callback:function(t){e.$set(e.addForm,"goods_weight",t)},expression:"addForm.goods_weight"}})],1),a("el-form-item",{attrs:{label:"商品数量",prop:"goods_number"}},[a("el-input",{attrs:{type:"number"},model:{value:e.addForm.goods_number,callback:function(t){e.$set(e.addForm,"goods_number",t)},expression:"addForm.goods_number"}})],1),a("el-form-item",{attrs:{label:"商品分类",prop:"goods_cat"}},[a("el-cascader",{attrs:{"expand-trigger":"hover",options:e.catelist,props:e.cateProps},on:{change:e.handleChange},model:{value:e.addForm.goods_cat,callback:function(t){e.$set(e.addForm,"goods_cat",t)},expression:"addForm.goods_cat"}})],1)],1),a("el-tab-pane",{attrs:{label:"商品参数",name:"1"}},e._l(e.manyTableData,(function(t){return a("el-form-item",{key:t.attr_id,attrs:{label:t.attr_name}},[a("el-checkbox-group",{model:{value:t.attr_vals,callback:function(a){e.$set(t,"attr_vals",a)},expression:"item.attr_vals"}},e._l(t.attr_vals,(function(e,t){return a("el-checkbox",{key:t,attrs:{label:e,border:""}})})),1)],1)})),1),a("el-tab-pane",{attrs:{label:"商品属性",name:"2"}},e._l(e.onlyTableData,(function(t){return a("el-form-item",{key:t.attr_id,attrs:{label:t.attr_name}},[a("el-input",{model:{value:t.attr_vals,callback:function(a){e.$set(t,"attr_vals",a)},expression:"item.attr_vals"}})],1)})),1),a("el-tab-pane",{attrs:{label:"商品图片",name:"3"}},[a("el-upload",{attrs:{action:e.uploadURL,"on-preview":e.handlePreview,"on-remove":e.handleRemove,"list-type":"picture",headers:e.headerObj,"on-success":e.handleSuccess}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1),a("el-tab-pane",{attrs:{label:"商品内容",name:"4"}},[a("quill-editor",{model:{value:e.addForm.goods_introduce,callback:function(t){e.$set(e.addForm,"goods_introduce",t)},expression:"addForm.goods_introduce"}}),a("el-button",{staticClass:"btnAdd",attrs:{type:"primary"},on:{click:e.add}},[e._v("添加商品")])],1)],1)],1)],1),a("el-dialog",{attrs:{title:"图片预览",visible:e.previewVisible,width:"50%"},on:{"update:visible":function(t){e.previewVisible=t}}},[a("img",{staticClass:"previewImg",attrs:{src:e.previewPath,alt:""}})])],1)},n=[],o=(a("c740"),a("4160"),a("a15b"),a("a434"),a("ac1f"),a("1276"),a("159b"),a("96cf"),a("1da1")),s=a("60bb"),i=a.n(s),l={data:function(){return{activeIndex:"0",addForm:{goods_name:"",goods_price:0,goods_weight:0,goods_number:0,goods_cat:[],pics:[],goods_introduce:"",attrs:[]},addFormRules:{goods_name:[{required:!0,message:"请输入商品名称",trigger:"blur"}],goods_price:[{required:!0,message:"请输入商品价格",trigger:"blur"}],goods_weight:[{required:!0,message:"请输入商品重量",trigger:"blur"}],goods_number:[{required:!0,message:"请输入商品数量",trigger:"blur"}],goods_cat:[{required:!0,message:"请选择商品分类",trigger:"blur"}]},catelist:[],cateProps:{label:"cat_name",value:"cat_id",children:"children"},manyTableData:[],onlyTableData:[],uploadURL:"http://127.0.0.1:8888/api/private/v1/upload",headerObj:{Authorization:window.sessionStorage.getItem("token")},previewPath:"",previewVisible:!1}},created:function(){this.getCateList()},methods:{getCateList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("categories");case 2:if(a=t.sent,r=a.data,200===r.meta.status){t.next=6;break}return t.abrupt("return",e.$message.error("获取商品分类数据失败！"));case 6:e.catelist=r.data;case 7:case"end":return t.stop()}}),t)})))()},handleChange:function(){3!==this.addForm.goods_cat.length&&(this.addForm.goods_cat=[])},beforeTabLeave:function(e,t){if("0"===t&&3!==this.addForm.goods_cat.length)return this.$message.error("请先选择商品分类！"),!1},tabClicked:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,r,n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if("1"!==e.activeIndex){t.next=11;break}return t.next=3,e.$http.get("categories/".concat(e.cateId,"/attributes"),{params:{sel:"many"}});case 3:if(a=t.sent,r=a.data,200===r.meta.status){t.next=7;break}return t.abrupt("return",e.$message.error("获取动态参数列表失败！"));case 7:r.data.forEach((function(e){e.attr_vals=0===e.attr_vals.length?[]:e.attr_vals.split(" ")})),e.manyTableData=r.data,t.next=19;break;case 11:if("2"!==e.activeIndex){t.next=19;break}return t.next=14,e.$http.get("categories/".concat(e.cateId,"/attributes"),{params:{sel:"only"}});case 14:if(n=t.sent,o=n.data,200===o.meta.status){t.next=18;break}return t.abrupt("return",e.$message.error("获取静态属性失败！"));case 18:e.onlyTableData=o.data;case 19:case"end":return t.stop()}}),t)})))()},handlePreview:function(e){this.previewPath=e.response.data.url,this.previewVisible=!0},handleRemove:function(e){var t=e.response.data.tmp_path,a=this.addForm.pics.findIndex((function(e){return e.pic===t}));this.addForm.pics.splice(a,1)},handleSuccess:function(e){var t={pic:e.data.tmp_path};this.addForm.pics.push(t)},add:function(){var e=this;this.$refs.addFormRef.validate(function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(a){var r,n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a){t.next=2;break}return t.abrupt("return",e.$message.error("请填写必要的表单项！"));case 2:return r=i.a.cloneDeep(e.addForm),r.goods_cat=r.goods_cat.join(","),e.manyTableData.forEach((function(t){var a={attr_id:t.attr_id,attr_value:t.attr_vals.join(" ")};e.addForm.attrs.push(a)})),e.onlyTableData.forEach((function(t){var a={attr_id:t.attr_id,attr_value:t.attr_vals};e.addForm.attrs.push(a)})),r.attrs=e.addForm.attrs,t.next=9,e.$http.post("goods",r);case 9:if(n=t.sent,o=n.data,201===o.meta.status){t.next=13;break}return t.abrupt("return",e.$message.error("添加商品失败！"));case 13:e.$message.success("添加商品成功！"),e.$router.push("/goods");case 15:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}},computed:{cateId:function(){return 3===this.addForm.goods_cat.length?this.addForm.goods_cat[2]:null}}},d=l,c=(a("1996"),a("2877")),u=Object(c["a"])(d,r,n,!1,null,"4a42d49c",null);t["default"]=u.exports},"67c5":function(e,t,a){},c740:function(e,t,a){"use strict";var r=a("23e7"),n=a("b727").findIndex,o=a("44d2"),s=a("ae40"),i="findIndex",l=!0,d=s(i);i in[]&&Array(1)[i]((function(){l=!1})),r({target:"Array",proto:!0,forced:l||!d},{findIndex:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}}),o(i)},cb38:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("商品管理")]),a("el-breadcrumb-item",[e._v("商品列表")])],1),a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},on:{clear:e.getGoodsList},model:{value:e.queryInfo.query,callback:function(t){e.$set(e.queryInfo,"query",t)},expression:"queryInfo.query"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getGoodsList},slot:"append"})],1)],1),a("el-col",{attrs:{span:4}},[a("el-button",{attrs:{type:"primary"},on:{click:e.goAddpage}},[e._v("添加商品")])],1)],1),a("el-table",{attrs:{data:e.goodslist,border:"",stripe:""}},[a("el-table-column",{attrs:{type:"index"}}),a("el-table-column",{attrs:{label:"商品名称",prop:"goods_name"}}),a("el-table-column",{attrs:{label:"商品价格(元)",prop:"goods_price",width:"95px"}}),a("el-table-column",{attrs:{label:"商品重量",prop:"goods_weight",width:"70px"}}),a("el-table-column",{attrs:{label:"创建时间",prop:"add_time",width:"140px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e._f("dateFormat")(t.row.add_time))+" ")]}}])}),a("el-table-column",{attrs:{label:"操作",width:"130px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"}}),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(a){return e.removeById(t.row.goods_id)}}})]}}])})],1),a("el-pagination",{attrs:{"current-page":e.queryInfo.pagenum,"page-sizes":[5,10,15,20],"page-size":e.queryInfo.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total,background:""},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},n=[],o=(a("96cf"),a("1da1")),s={data:function(){return{queryInfo:{query:"",pagenum:1,pagesize:10},goodslist:[],total:0}},created:function(){this.getGoodsList()},methods:{getGoodsList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("goods",{params:e.queryInfo});case 2:if(a=t.sent,r=a.data,200===r.meta.status){t.next=6;break}return t.abrupt("return",e.$message.error("获取商品列表失败！"));case 6:e.$message.success("获取商品列表成功！"),e.goodslist=r.data.goods,e.total=r.data.total;case 9:case"end":return t.stop()}}),t)})))()},handleSizeChange:function(e){this.queryInfo.pagesize=e,this.getGoodsList()},handleCurrentChange:function(e){this.queryInfo.pagenum=e,this.getGoodsList()},removeById:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var r,n,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$confirm("此操作将永久删除该商品, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((function(e){return e}));case 2:if(r=a.sent,"confirm"===r){a.next=5;break}return a.abrupt("return",t.$message.info("已经取消删除！"));case 5:return a.next=7,t.$http.delete("goods/".concat(e));case 7:if(n=a.sent,o=n.data,200===o.meta.status){a.next=11;break}return a.abrupt("return",t.$message.error("删除失败！"));case 11:t.$message.success("删除成功！"),t.getGoodsList();case 13:case"end":return a.stop()}}),a)})))()},goAddpage:function(){this.$router.push("/goods/add")}}},i=s,l=a("2877"),d=Object(l["a"])(i,r,n,!1,null,"71d2e33a",null);t["default"]=d.exports}}]);
//# sourceMappingURL=GoodsList_Add.2d12b731.js.map