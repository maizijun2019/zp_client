<template>
  <div class="HeardBox">
    <div class="top pu-kong">
      <div class="topcen cen-width">
        <div class="topcenli"><img src="@/assets/img/tel.png">联系电话：264</div>
        <div class="topcenli">
          <img src="@/assets/img/8.png">
          <div v-if='!userinfo'>
            <router-link :to="{name:'Login'}" class='topcenli_sp'>登录</router-link>
          |<router-link :to="{name:'Reg'}" class='topcenli_sp'>注册</router-link>
          </div>
          <div v-if='userinfo' class='userbox'> 
            <span>{{userinfo.username}}</span>
            <span class="tuichu_btn" @click="tuiFn">退出</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bot pu-kong">
      <div class="botcen cen-width">
        <div class="botli">
          <div class="botli_"><img src="@/assets/img/logo.png"></div>
          <div class="botli_ botli_w">当前位置：<wei-zhi></wei-zhi></div>
        </div>
        <div class="botli botli_b">
          <el-menu :default-active="tan_x_f" text-color="#666666" active-text-color="#5c9eff" class="el-menu-demo" mode="horizontal" :class="login_li_f?'login_li':''">

            <el-menu-item index="1"><router-link :to="{name:'Index'}" class="a_div">网站首页</router-link></el-menu-item>
            <el-menu-item index="2"><router-link :to="{name:'FuWu'}" class="a_div">服务项目</router-link></el-menu-item>
            <el-menu-item index="3"><router-link :to="{name:'XiaZai'}" class="a_div">书式下载</router-link></el-menu-item>

            <el-menu-item index="4"><router-link :to="{name:'XinWen'}" class="a_div">新闻资讯</router-link></el-menu-item>
            <el-menu-item index="5"><router-link :to="{name:'Guanyu'}" class="a_div">关于我们</router-link></el-menu-item>
            <el-menu-item index="6"><router-link :to="{name:'User'}" class="a_div">个人中心</router-link></el-menu-item>

          </el-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeiZhi from '../components/weizhi.vue'
  export default{
    data(){
      return{
        login_li_f:false,
        tan_x_f:'1',
        userinfoData:null,
      }
    },
    props: ['userinfo_data'],
    created(){
        let that=this;
        this.lupanFN();
        this.Com.loginFNPan(function(res){
        if(res.error_code==0)
        {
          that.$store.commit("Info", res.data);
        }
        else{
        }
      })
    },
    methods:{
      // 退出登录
      tuiFn(){
        let that=this;
        this.$alert('', '确定退出登录？', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
        that.$confirm('确定退出登录？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          that.Com.request({},'login/index/loginOut',function(res){
            if(res.result=='success')
            {
              that.$store.commit('Info',null)
              that.$message({
                message: '退出成功',
                type: 'success',
                duration:1500,
                onClose:function(){
                  that.userinfoData='';
                  that.$router.push({name:'Login',})
                  that.$store.commit("Info", null);
                }
              });
            }
            else{
              that.$message({
                message:res.error_message,
                type: 'error',
              });
            }
          })
        }).catch(() => {
          
        });
      },
      // 路由判断
      lupanFN(){
        let that=this;
        if(this.$route.name=='Reg' || this.$route.name=='Login')
          {
            that.login_li_f=true;
          }
          else{
            that.login_li_f=false;
          }
          if(this.$route.name=='Index')
          {
            that.tan_x_f='1';
          }
          else if(this.$route.name=='PiPei')
          {
            that.tan_x_f='2';
          }
          else if(this.$route.name=='FuWu')
          {
            that.tan_x_f='2';
          }
          else if(this.$route.name=='FuWuXiangQing')
          {
            that.tan_x_f='2';
          }
          else if(this.$route.name=='XiaZai')
          {
            that.tan_x_f='3';
          }
          else if(this.$route.name=='XinWen')
          {
            that.tan_x_f='4';
          }
          else if(this.$route.name=='XinWenXiang')
          {
            that.tan_x_f='4';
          }
          else if(this.$route.name=='Guanyu')
          {
            that.tan_x_f='5';
          }
          else if(this.$route.matched.length>2 && this.$route.matched[2].name=='User')
          {
            that.tan_x_f='6';
          }
          else if(this.$route.matched.length>2 && this.$route.matched[2].name=='FuWu')
          {
            that.tan_x_f='2';
          }
      }
    },
    computed: {
      userinfo(){
        return this.$store.state.info;
      }
    },
    watch: {
  　　'$route':{
        handler(route)
        {
          let that=this;
          this.lupanFN();
          if(route.name=='Reg' || route.name=='Login')
          {
            that.login_li_f=true;
          }
          else{
            that.login_li_f=false;
          }
        }
  　　},
      userinfo_data:{ 
        handler(newVal,oldVal)
        {
          let that=this
          that.userinfoData=newVal;
        }
      },
    },
    components:{WeiZhi}
  }
</script>

<style scoped>
.a_div{
  width: 100%;
  height: 100%;
  display:inline-block;
}
/* ------------ */
.login_li .is-active{
  border: none !important;
  color: rgb(102, 102, 102) !important;
}
.top{
  width: 100%;
  height:40px;
  background-color:#3399ff; 
}
.topcen{
  display:flex;
  align-items: center;
  justify-content: space-between;
  line-height: 40px;
  color: white;
}
.topcenli{
  display: flex;
  align-items: center;
}
.topcenli img{
  height:15px;
  margin-right:10px;
}
.topcenli_sp{
  margin: 0 10px;
  cursor: pointer;
  color: white;
  font-size: 14px;
}
.topcenli_sp:hover{
  text-decoration: underline;
}
.bot{
  background-color: white;
  padding: 10px 0;
  box-sizing: border-box;
}
.botcen{
  display:flex;
  align-items: center;
  justify-content: space-between;
}
.botli_ img{
  height:35px;
  margin-bottom: 10px;
}
.botli_w{
  display:flex;
  align-items: center;
  color: #999999;
  font-size: 12px;
}
.userbox span:nth-child(1){
  margin-right: 20px;
}
.tuichu_btn{
  cursor: pointer;
}
.tuichu_btn:hover
{
  text-decoration: underline;
  text-shadow: 0 0 3px #ddd;
}
</style>