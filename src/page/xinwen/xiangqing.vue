<template>
<div class="xinxiang pu-kong">
    <div class="HuiGe"></div>
    <div class="cen-width">
        <div class="YeLi">
          <!-- <span><router-link to="/xinwen">新闻资讯</router-link></span><i class="el-icon-arrow-left YeLi_i_on"></i><span class="YeLi_sp_on">新闻详情</span> -->
          <i class="el-icon-arrow-left YeLi_i_on"></i><span class="YeLi_sp_on" @click="fanhuiFn">返回上一页</span>
        </div>
      <div class="cenbox" v-if='wenData'>
        <div class="wentit">{{wenData.title}}</div>
        <div class="wendate">{{wenData.create_time_text}}</div>
        <div class="wencenter">{{wenData.content}}</div>
        <!-- <div class="filtit" v-if='files'>相关附件，点击下载：</div>
        <div class="flili" v-if='files' v-for='item in files'><a class='' :href="item.url">{{item.name}}</a></div> -->
      </div>
    </div>
    <div class="HuiGe"></div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        wenData:null,
        files:null,
      } 
    },
    created(){
      let that=this;
      let fil_url=this.gongCan.filrUrl;
      let id_=this.$route.query.id;
      this.Com.request({
        news_id:id_
      },'news/info',function(res){
        that.wenData=res;

        // if(res.fujian)
        // {
        //   let fil_=res.fujian;
        //   let file_=[];
        //   fil_=fil_.split('||');
        //   for(var i=0;i<fil_.length;i++)
        //   {
        //     let f_=fil_[i].split(';');
        //     file_[i]={
        //       'name':f_[0],
        //       'url':fil_url+f_[1],
        //     }
        //   }
        //   that.files=file_;
        // }
      })
    },
    methods:{
      // 返回上一页
      fanhuiFn(){
        this.$router.go(-1);
      }
    },
    components:{

    }
  }
</script>

<style scoped>
.xinxiang{
  background-color: #f3f3f3;
}
.cen-width{
  background-color: white;
  min-height: 600px;
}
.cenbox{
  padding:20px 30px;
  box-sizing:border-box;
}
.wentit{
  text-align: center;
  font-weight: bold;
  font-size: 30px;
}
.wendate{
  margin-top: 10px;
  color: #777777;
  text-align: center;
}
.wencenter{
  margin-top: 20px;
  margin-bottom: 30px;
}
.flili{
  margin-top:10px;
}
</style>