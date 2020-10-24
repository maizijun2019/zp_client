<template>
  <div class="user">
    <div class='HuiGe'></div>
    <div  class="user_cen pu-kong cen-width">
      <div class="user_lef">
        <div class="user_lef_top">
          <img class="top_bimg" src="@/assets/img/9.png">
          <div class="user_img"><img class="" src="@/assets/img/himg.png"></div>
          <div class="user_lef_top_zi">您好</div>
          <div class="user_name" v-if="userinfo">{{userinfo.username}}</div>
          <div class="user_name" v-if="!userinfo">未登录</div>
        </div>
        <div class="user_lef_cen">
          <div class="user_lef_li" onselectstart="return false" :class="userlefIndex==0?'user_lef_li_on':''" @click="userlefFn(0,'UserShou')"><img class="" src="@/assets/img/21.png">中心首页</div>
          <div class="user_lef_li" onselectstart="return false" :class="userlefIndex==1?'user_lef_li_on':''" @click="userlefFn(1,'UserZiLiao')"><img class="" src="@/assets/img/23.png">{{userinfo&&userinfo.is_operators==1?'商户资料':'个人资料'}}</div>
          <div class="user_lef_li" onselectstart="return false" :class="userlefIndex==2?'user_lef_li_on':''" @click="userlefFn(2,'PiPei')"><img class="" src="@/assets/img/24.png">精准匹配</div>
          <div class="user_lef_li" onselectstart="return false" :class="userlefIndex==3?'user_lef_li_on':''" @click="userlefFn(3,'ZiliaoChuan')"><img class="" src="@/assets/img/19.png">资料上传</div>
          <div class="user_lef_li" onselectstart="return false" :class="userlefIndex==4?'user_lef_li_on':''" @click="userlefFn(4,'XiaDan')"><img class="" src="@/assets/img/18.png">我要下单</div>

          <div class="user_lef_li BangBtn">
            
            <img class="" src="@/assets/img/17.png">
             <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=489261411&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:489261411:51" alt="点击咨询" title="点击咨询"/></a>我要帮助
          </div>
          <div class="user_lef_li" :class="userlefIndex==5?'user_lef_li_on':''" @click="userlefFn(5,'UserXiuGaiMi')"><img class="" src="@/assets/img/26.png">修改密码</div>
        </div>
        <div class="JBtn tui_btn" @click="tuiFn">退出登录</div>
      </div>
      <div class="user_rig">
        <router-view/>
      </div>
    </div>
    <div class='HuiGe'></div>
  </div>
</template>

<script> 
  export default{
    data(){
      return{
        userlefIndex:0,
        // userinfo:null,
      }
    },
    created(){
       document.title="中普云";
      let that=this;
      this.luPan(this.$route.name);
      this.Com.loginFNPan(function(res){
        if(res.error_code!=0)
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
          // that.userinfo=res.data[0];
          that.$store.commit("Info", res.data);
        }
      })
    },
    methods:{
      // 分页跳转
      userlefFn(num,url){
        this.userlefIndex=num;
this.$router.push({name:url})
      },
      // 路由判断
      luPan(name)
      {
        let that=this;
        if(name=='UserShou')
        {
          that.userlefIndex=0;
        }
        else if(name=='UserXiuGaiMi'){
          that.userlefIndex=5;
        }
        else if(name=='UserZiLiao'){
          that.userlefIndex=1;
        }
        else if(name=='UserZiLiaoJiben'){
          that.userlefIndex=1;
        }
        else if(name=='UserZiLiaoRen'){
          that.userlefIndex=1;
        }
        else if(name=='UserZiLiaoZhangHao'){
          that.userlefIndex=1;
        }
        else if(name=='UserAddGongSi'){
          that.userlefIndex=1;
        }
        else if(name=='UserZiLiaoRenTian'){
          that.userlefIndex=1;
        }
        else if(name=='UserEditGongSi'){
          that.userlefIndex=1;
        }
else if(name=='ZiliaoChuan'){
          that.userlefIndex=3;
        }
        else if(name=='XiaDan'){
          that.userlefIndex=4;
        }
      },
      // 退出登录
      tuiFn(){
        let that=this;
        // this.$alert('', '确定退出登录？', {
        //   confirmButtonText: '确定',
        //   callback: action => {
        //     this.$message({
        //       type: 'info',
        //       message: `action: ${ action }`
        //     });
        //   }
        // });
        that.$confirm('确定退出登录？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          that.Com.request({},'consumer/logout',function(res){
            if(res.error_code==0)
            {
              that.$message({
                message: '退出成功',
                type: 'success',
                duration:1500,
                onClose:function(){
                  that.$router.push({name:'Login'})
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
    components:{

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
          this.luPan(this.$route.name);
        }
  　　}
    },
  }
</script>


<style scoped>
.tui_btn{
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
}
.user{
  background-color:#f3f3f3;
}
.user_cen{
  display: flex;
  align-items: center;
}
/* user_lef */
.user_lef{
  position: relative;
  width: 180px;
  background-color: white;
  margin-right: 20px;
  height: 700px;
}
.user_lef_top{
  position:relative;
  padding:10px 0;
}
.user_lef_top div{
  position: relative;
  z-index: 3;
  color: white;
  text-align: center;
  font-size: 13px;
}
.user_img{
}
.user_img img{
  border: 4px solid #81a2fd;
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.top_bimg{
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.user_lef_top_zi{
  margin: 5px 0;
  font-size: 12px !important;
}
.user_lef_li{
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #666666;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1px;
  cursor: pointer;
  height:50px;
}
.user_lef_li:hover
{
  background-color: #adcaf3;
}
.user_lef_li img{
  width: 17px;
  height: 17px;
  margin-right: 10px;
}
.user_lef_li_on{
  background-color: #e6f0fe;
}
/* --user_rig----- */
.user_rig{
  flex: 1;
  background-color: white;
  min-width: 20px;
  height: 700px;
}
</style>