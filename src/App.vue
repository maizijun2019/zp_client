<template>
  <div id="app" :class="ping" @scroll="huadong">
    <div class="topfixed" v-if="topfixed_f">
      <div class="topfixed_logo">
        <img src="@/assets/img/logo1.png" @click="xianbiaofn">
        </div>
      <div class="topfixed_Cen">
        <!-- <div class="topfixed_tab">
          <router-link to="/index" class="topfixed_tab_li">网站首页</router-link>
          <router-link to="/women" class="topfixed_tab_li">关于我们</router-link>
        </div> -->
        <div class="topfixed_user" v-if='!userinfo'>
          <router-link to="/login" class='topfixed_user_sp'>登录</router-link>|
          <router-link to="/reg" class='topfixed_user_sp'>注册</router-link>
        </div>
        <div v-if='userinfo' class='topfixed_user'> 
            <span>{{userinfo.username}}</span>
            <span class="tuichu_btn" @click="tuiFn">退出</span>
          </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      ping:"ping_zhong",
      topfixed_f:false,
    }
  },
    created(){ 
      document.title="中普云";
      var that=this;
      if(document.body.clientWidth>1400)
      {
        that.ping='ping_da';
      }
      else{
        that.ping='ping_zhong';
      }
          // if(document.body.clientWidth<700)
          // {
          //   let win_url=window.location.href;
          //   let urls=win_url.split('manage_dist/');
          //   window.location.href=urls[0]+"manage_dist/ph/"+urls[1];
          // }
    },
  mounted () {
    var that=this;
    window.onresize = () => {
      if(document.body.clientWidth>1400)
      {
        that.ping='ping_da';
      }
      else{
        that.ping='ping_zhong';
      }
      // if(document.body.clientWidth<700)
      // {
      //   let win_url=window.location.href;
      //       let urls=win_url.split('manage_dist/');
      //       window.location.href=urls[0]+"manage_dist/ph/"+urls[1];
      // }
    }
  },
    methods:{
      huadong(e){
        let gao=e.target.scrollTop;
        let that=this;
        if(gao>100)
        {
          that.topfixed_f=true
        }
        else{
          that.topfixed_f=false
        }
      },
      // 点击小标题
      xianbiaofn(){
        $("#app").animate({scrollTop:0},100);
        this.$router.push({path:'/index'});
      },
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
              that.$message({
                message: '退出成功',
                type: 'success',
                duration:1500,
                onClose:function(){
                  that.$router.push({path:'/login',});
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
    },
    computed: {
      userinfo(){
        return this.$store.state.info;
      }
    },
  //   watch: {
  //     '$route':{
  //       handler(route)
  //       {
  //         let that=this;
  //         // $("#app").animate({scrollTop:0},10);
  //         if(that.$route.query.login==1 || route.name=='Reg' || route.name=='Login')
  //         {
  //           let getuser=setInterval(function(){
  //             if(that.gongCan.GongUserInfo.username==-1)
  //             {
  //               that.userinfoData=null;
  //               clearInterval(getuser);
  //             }
  //             else if(that.gongCan.GongUserInfo.username!=0 && that.gongCan.GongUserInfo.username!=-1)
  //             {
  //               that.userinfoData=that.gongCan.GongUserInfo.username;
  //               clearInterval(getuser);
  //             }
  //           },100)
  //         }
  //       }
  // 　　},
  //   },
}
</script>

<style>
.topfixed_logo{
  cursor: pointer;
}
body,html{
  position: relative;
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #555555;
  position: relative;
  height: 100%;
  overflow-y: scroll;
  min-width: 900px;
}
.topfixed{
  position:fixed;
  width: 100%;
  height: 40px;
  background-color: #3399ff;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
}
.topfixed_Cen{
  display: flex;
  align-items: center;
}
.topfixed_tab{
  display:flex;
  align-items: center;
}
.topfixed_tab_li{
  color: white;
  margin: 0 20px;
  cursor: pointer;
}
.topfixed_tab_li:hover{
  text-decoration: underline;
}
.topfixed_user{
  margin-left: 50px;
  color: white;
}
.topfixed_user_sp{
  color: white;
  cursor: pointer;
  margin: 0 10px;
  font-size: 14px;
}
.topfixed_user_sp:hover{
  text-decoration: underline;
}
.topfixed_logo img{
  height: 20px;
}
.tuichu_btn{
  cursor: pointer;
  margin-left: 10px;
}
.tuichu_btn:hover
{
  text-decoration: underline;
  text-shadow: 0 0 3px #ddd;
}
</style>
