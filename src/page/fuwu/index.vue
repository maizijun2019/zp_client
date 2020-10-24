<template>
  <div class="FuWuBox pu-kong">
    <div class='fuwuge'></div>
    <div class="fuwubox cen-width">
      <div class="fuwubox_top">
        <div class="fuwubox_top_sear">
          <div class='SearBox'>
              <div class="SearBox_in"><img src="@/assets/img/7.png"><input type="text" placeholder="输入关键字" v-model="formData.str"></div>
              <div class="SearBox_btn" @click="sousuoFn">搜索</div><div @click="pipeidianFn" class="JBtn">精准匹配</div>
            </div>
            <!-- <div @click="pipeidianFn" class="JBtn">精准匹配</div> -->
        </div>
          <div class="fuwubox_resou">
            <div class="fuwubox_resou_lef">热搜：</div>
            <div class="fuwubox_resou_rig">
             <span v-for='item in remenData' v-if='item.key_word' @click='resouFn(item.key_word)'>{{item.key_word}}</span>
            </div>
           </div>

        <div class="fuwubox_wei">
          <wei-zhi v-on:adressdata="adressfn"></wei-zhi>
        </div>
        
        <div class="fuwubox_xiang">
      项目分类：<span :class="fenLeiF==0?'fuwubox_xiang_on':''" @click="fenFn('',0)">全部分类</span>
      <span :class="fenLeiF==1?'fuwubox_xiang_on':''" @click="fenFn('专利',1)">专利</span>
      <span :class="fenLeiF==2?'fuwubox_xiang_on':''" @click="fenFn('商标',2)">商标</span>
      <span :class="fenLeiF==3?'fuwubox_xiang_on':''" @click="fenFn('版权',3)">版权</span>
      <span :class="fenLeiF==4?'fuwubox_xiang_on':''" @click="fenFn('项目',4)">项目</span>
      <span :class="fenLeiF==5?'fuwubox_xiang_on':''" @click="fenFn('两化融合',5)">两化融合</span>
      <span :class="fenLeiF==6?'fuwubox_xiang_on':''" @click="fenFn('财务',6)">财务</span>
        </div>
      </div>
      <div class='fuwuge'></div>
      <div class="TableStyle fuwubox_bot" v-if="sousuo_f"  v-loading="loading">
        <el-table :data="tableData.datas" style="width: 100%">
          <el-table-column prop="name" label="项目名称">
            <template slot="header" slot-scope="scope">
              <div class='TabHearTop TabHearTop_a'><span class="TabHearTop_sp"></span>项目名称</div>
            </template>
            <template slot-scope="scope">
              <span style="margin-left:10px">{{scope.$index+1}}、</span>{{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column prop="type" label="项目分类"></el-table-column>
          <el-table-column prop="ctime" label="创建时间"></el-table-column>
          <el-table-column prop="projectid" label="操作" width='220'>
            <template slot-scope="scope">
              <div class="caobox">
                <router-link :to="{name:'FuWuXiangQing',query:{'pid':scope.row.id}}" class="xaingbtn">我要下单</router-link>
                <div class="xaingbtn BangBtn">
              <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=489261411&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:489261411:51" alt="点击咨询" title="点击咨询"/></a>
                  我要帮助
              </div>
                <router-link :to="{name:'FuWuXiangQing',query:{'pid':scope.row.id}}" class="xaingbtn">查看详情</router-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
      <div class="JiaZaiBox" v-if='jiazai_f'><img src="@/assets/img/load.gif">获取中..</div>
        <div class="PageBox" v-if="tableData.total>0">
          <el-pagination
            layout="prev, pager, next"
            :total="tableData.total" :current-page="formData.pageIndex" :page-size='tableData.pageSize' @size-change="fanFn"
              @current-change="fanFn" >
          </el-pagination>
        </div>
      </div>
      <input type="text" hidden v-model="addres">
    </div>
    <div class='fuwuge'></div>
  </div>
</template>

<script>
import WeiZhi from '../../components/weizhi.vue'
  export default{
    data(){
      return{
        fenLeiF:0,
         tableData:{
           datas:null,
           total:0,
           pageSize:9
         },
         formData:{
           str:null,
           city:'温州市',
           region:'瓯海区',
           pageIndex:1,
           type:null
         },
         sousuo_f:false,
         remenData:null,
         jiazai_f:false,
         loading:false
      }
    },
    created(){
      let that=this;
      let type_=this.$route.params.type;
      type_=type_?type_:this.$route.query.type
      let sertxt=this.$route.params.sertxt;
      if(type_)
      {
        let types=['','专利','商标','版权','项目','两化融合','财务'];
        that.formData.type=types[type_];
        this.fenLeiF=type_;
      }
      if(sertxt)
      {
        that.formData.str=sertxt;
      }
        this.sousuoFn();
        // 热搜获取
        that.Com.request('','homePage/index/hotSearch',function(res){
          that.remenData=res.data;
        })
    },
    methods:{
      // 精准匹配点击
      pipeidianFn:function(){
        let that=this;
          this.Com.loginFNPan(function(res){
          if(res.error_code==101)
          {
            that.$message({
                  message:"请先登录",
                  type: 'error',
                  duration:1500,
                  onClose:function(){
                    that.$router.push({name:'Login'})
            }
            });
          }
          else{
            that.$router.push({name:'PiPei'})
          }
        })
      },
      adressfn:function(res){
        this.formData.city=res.city;
        this.formData.region=res.district;
        this.formData.pageIndex=1;
        this.sousuoFn();
      },
      // 分类点击
      fenFn(name,index){
        this.fenLeiF=index;
        this.formData.type=name;
        this.formData.pageIndex=1;
        this.sousuoFn();
      },
      // 搜索
      sousuoFn(e){
        let that=this;
        this.loading=true;
        this.sousuo_f=true;
        that.Com.request(this.formData,'homePage/Index/keywordQueryProject',function(res){
          that.tableData.total=res.count;
          that.tableData.pageSize=res.pageSize;
          that.tableData.datas=null;
          that.tableData.datas=res.data;
          that.loading=false;
        })
      },
      // 翻页
      fanFn(e){
        this.formData.pageIndex=e;
        this.sousuoFn();
      },
      // 热搜
      resouFn(name)
      {
        this.formData.pageIndex=1;
        this.formData.str=name;
        this.sousuoFn();
      }
    },
    components:{WeiZhi},
    computed: {
      addres(){
        this.formData.city=this.$store.state.adress[1].id;
        this.formData.region=this.$store.state.adress[2].id;
        this.formData.pageIndex=1;
        this.formData.str=name;
        this.sousuoFn();
        return this.$store.state.adress;
      }
    },
  }
</script>

<style scoped>
.caobox{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.xaingbtn{
  color: #5c9eff;
}
.FuWuBox{
  background-color: #f3f3f3;
  min-height: 500px;
}
.fuwuge{
  width: 100%;
  background-color: #f3f3f3;
  height: 20px;
}
.fuwubox{
  width: 100%;
  background-color: white;
}
.fuwubox_top{
  padding:30px 20px;
  box-sizing: border-box;
  position: relative;
  background-color: white;
}
.fuwubox_top_sear{
  position: relative;
  display: flex;
  align-items: center;
}
.fuwubox_resou{
  display:flex;
  font-size: 14px;
  margin-top:30px;
  flex-wrap: wrap;
  align-items: flex-start;
}
.fuwubox_resou_rig{
  display:flex;
  align-items: center;
  font-size: 14px;
  flex-wrap: wrap;
  flex: 1;
}
.fuwubox_resou span{
  margin-left: 20px;
  color: #5c9eff;
  cursor: pointer;
  margin-bottom: 15px;
}
.fuwubox_resou span:hover
{
  text-decoration: underline;
}
.fuwubox_wei{
  margin: 20px 0;
}
/* -fuwubox_xiang */
.fuwubox_xiang{
  display:flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
}
.fuwubox_xiang span{
  cursor: pointer;
  display: block;
  padding: 7px 20px;
  background-color: #f3f3f3;
  color:#999999;
  margin-left: 20px;
  font-size: 12px;
    	-webkit-user-select:none;
		   -moz-user-select:none;
		   -ms-user-select:none;
		   user-select:none;
}
.fuwubox_xiang span:hover{
 box-shadow: 0 0 3px 1px #ddd;
}
.fuwubox_xiang_on{
  background-color: #5c9eff !important;
  color:white !important;
}
/* fuwubox_bot */
.fuwubox_bot{
  background-color: white;
  padding-bottom: 50px;
  box-sizing: border-box;
  min-height: 600px;
}
.PageBox{
  margin-top: 20px;
}
.fuwubox_bot .el-table__header .cell{
  font-weight: bold;
  color: #333333 !important;
  background-color: red;
}
.JBtn{
  position: relative;
  margin-left: 30px;
}
</style>