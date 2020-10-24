<template>
  <div class="footbox">
    <div class="footboxtop">
       <img class="footbox_bl" src="@/assets/img/foot_bg.png">
    <div class="cen-width">
      <div class="footboxcen">
        <div class="footboxcen_lef">
          <img src="@/assets/img/logo1.png">
          <div class="footboxcen_lef_kuai"></div>
        </div>
        <div class="footboxcen_cen">
          <ul class="footboxcen_cen_tit">
            <li class="footboxcen_cen_li" @click="liFn('Index')">网站首页</li>
            <li class="footboxcen_cen_li" @click="liFn('FuWu')">服务项目</li>
            <li class="footboxcen_cen_li" @click="liFn('XiaZai')">书式下载</li>
            <li class="footboxcen_cen_li" @click="liFn('XinWen')">新闻资讯</li>
            <li class="footboxcen_cen_li" @click="liFn('Guanyu')">关于我们</li>
            <li class="footboxcen_cen_li" @click="liFn('User')">个人中心</li>
          </ul>
          <div class="footboxcen_cen_bot">
            <div class="footboxcen_cen_bot_li">电话：-4464644545</div>
            <div class="footboxcen_cen_bot_li">传真：-4464644545</div>
            <div class="footboxcen_cen_bot_li">邮编：-4464644545</div>
            <div class="footboxcen_cen_bot_li">邮箱：-4464644545</div>
            <div class="footboxcen_cen_bot_li_ footboxcen_cen_bot_li_b">地址：-4464644545</div>
            <div class="footboxcen_cen_bot_li_">工作时间：-4464644545</div>

          </div>
        </div>
        <div class="footboxcen_rig">
          <div class="footboxcen_rig_li"><img src="@/assets/img/55.png"></div>
          <div class="footboxcen_rig_li">扫码关注</div>
        </div>
      </div>
    </div>
    </div>
    <div class='footbot' >
      <a href="http://www.beian.miit.gov.cn" style="color:white;font-size: 12px;">Copyright ©浙江中普科技咨询有限公司 浙ICP备17041278号</a>
    </div>
    <!-- <div class='footbot'>Copyright ©浙江中普科技咨询有限公司 浙ICP备17041278号</div> -->
  </div>
</template>

<script>
  export default{
    data(){
      return{
        
      }
    },
    created(){
      
    },
    methods:{
      liFn(res)
      {
        $("#app").animate({scrollTop:0},100);
        this.$router.push({name:res,})
      }
      
    },
    components:{

    }
  }
</script>

<style scoped>
.footboxcen_cen_bot{
  box-sizing: border-box;
}
.footboxcen_cen_bot_li_{
  width: 100%;
  color: #ffffff;
  font-size: 10px;
  margin-top: 5px;
}
.footboxcen_cen_bot_li_b{
  margin-top: 10px !important;
}
.footboxcen_cen_bot_li{
  display: inline-block;
  width: 40%;
  font-size: 10px;
  color: #ffffff;
  margin-bottom: 5px;
}
.footboxcen_cen_tit{
  position: relative;
  display: flex;
  align-items: center;
  justify-content:space-between;
}
.footboxcen_cen_li{
  cursor:pointer;
  font-size: 10px;
  color: #ffffff;
  line-height: 30px;
}
.footboxcen_cen{
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: 10px;
  box-sizing: border-box;
}
.footboxcen{
  display:flex;
  height: 170px;
  padding: 10px 20px;
  box-sizing: border-box;
}
.footboxcen_lef{
  width: 130px;
  position: relative;
  padding-bottom:10px;
  box-sizing: border-box;
}
.footboxcen_lef img{
  height: 30px;
}
.footboxcen_lef_kuai{
  position:absolute;
  left: 0;
  bottom: 10px;
  background-color: white;
  width: 20px;
  height: 5px;
}
/* footboxcen_rig */
.footboxcen_rig{
  width: 150px;
}
.footboxcen_rig_li{
  width: 100%;
  text-align: center;
  color: white;
  font-size: 10px;
  margin-top: 10px;
}
.footboxcen_rig_li img{
  width: 100px;
  margin-bottom: 10px;
}
/* ---------- */
.footbox{
    width: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
}
.footboxtop{
  width: 100%;
    height: 170px;
}
.footbox_bl{
  position:absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.footbot{
  background-color:#333333;
  text-align: center;
  font-size: 12px;
  line-height: 35px;
  color: #f5f5f5;
}
</style>