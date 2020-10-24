<template>
  <div class="Cenhig">
    <img src="@/assets/img/bgimg.png" class="loginblimg">
    <div class="loginbox cenbox">
      <div class="cenbox_zi">
        <div class="cenbox_zi_a">一个平台，所有的托管</div>
        <div class="loginge"></div>
        <div class="loginge"></div>
        <div class="cenbox_zi_b">您永远的服务资源顾问</div>
        <div class="loginge"></div>
        <div class="cenbox_zi_b">为您提供专业的咨询服务</div>
        <div class="loginge"></div>
        <div class="loginge"></div>
        <div class="cenbox_zi_a">一个平台，所有的托管</div>
        <div class="baikuai"></div>
      </div>
      <div class="cenbox_cen login" v-if='x_f==0'>
        <div class="cenbox_in">
          <input type="text" placeholder="账号" v-model='ti_data.name'>
        </div>
        <div class="cenbox_in">
          <input type="password" placeholder="密码" v-model='ti_data.password'>
        </div>
        <div class="lo_tishi" v-if="tishi.ti_f">{{tishi.ti_text}}</div>
        <div class="cenbox_btn">
          <div class="loginbtn" @click="dengluFn">登录账号</div>
        </div>
         <div class="cenbox_bot"><i>忘记密码？</i><router-link :to="{name:'Reg'}" class='cenbox_bot_sp'>注册</router-link></div>
        <!-- <div class="cenbox_bot"><span>忘记密码？</span><span @click="qieFn(1)">注册</span></div> -->
      </div>
      
      <div class="cenbox_cen regbox" v-if='x_f==1'>
        <div class="cenbox_in">
          <input type="text" placeholder="账号">
        </div>
        <div class="cenbox_in">
          <input type="number" placeholder="手机号">
        </div>
        <div class="cenbox_in">
          <input type="password" placeholder="密码(只包含字母和数字且长度不小于8)">
        </div>
        <div class="cenbox_in">
          <input type="password" placeholder="密码(只包含字母和数字且长度不小于8)">
        </div>
        <div class="cenbox_in cenbox_in_d">
          <input type="text" placeholder="验证码" v-model='ti_data.validate'><span v-if='!yan_f' @click="faYanFn">获取短信验证码</span><i v-if='yan_f'>已发送(<em>{{y_time}}s</em>)</i>
        </div>
        <div class="lo_tishi" v-if="tishi.ti_f">{{tishi.ti_text}}</div>
        <div class="cenbox_btn">
          <div class="loginbtn" @click="dengluFn">注册账号</div>
          <!-- <img src="@/assets/img/cezhubtn.png" alt=""> -->
        </div>
        <div class="cenbox_bot"><span>已有账号？</span><router-link :to="{name:'Login'}" class='cenbox_bot_sp' @click="qieFn(0)">登录</router-link></div>
      </div>
    </div>
       <div class='footbot'>Copyright ©浙江中普科技咨询有限公司</div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        x_f:0,
        yan_f:false,
        y_time:60,
        ti_data:{
          name:null,
          password:null,
        },
        tishi:{
          ti_f:false,
          ti_text:null
        }
      }
    },
    created(){
    },
    methods:{
      dengluFn(){
        let that=this;
        let data_=that.ti_data;
        if(!data_.password || !data_.name)
        {
          that.tishi.ti_f=true;
          that.tishi.ti_text='请填写完整';
        }
        else{
          that.tishi.ti_f=false;
          that.Com.request({
            username:data_.name,
            password:data_.password,
          },'consumer/login',function(res){
            if(res.error_code==0)
            {
              that.$message({
                message: '登录成功',
                type: 'success',
                duration:1500,
                onClose:function(){
                  // that.$store.commit('Info',res.userInfo)
                  // let weiinfo_={
                  //   username:res.userInfo.username
                  // }
                  // that.gongCan.GongGetUserInfo(weiinfo_);
                  // -----type为2的时候,
                  if(that.$route.query.type==2)
                  {
                    that.$router.push({name:'Index'})
                  }
                  // type为3,返回服务详情
                  else if(that.$route.query.type==3)
                  {
                    that.$router.push({name:'FuWuXiangQing',query:{'pid':that.$route.query.id}})
                  }
                  else{
                    that.$router.push({name:'User',query:{'login':1}})
                  }
                }
              });
            }
            else{
              that.$message({
                message: res.error_message,
                type: 'error',
                duration:1500,
                onClose:function(){
                  // that.$emit('userinfoFn',that.ti_data.name);
                }
              });
            }
          })
        }
      }
    },
    components:{}
  }
</script>

<style scoped>
.lo_tishi{
  margin: 10px 0;
  text-align: center;
  color: red;
  font-size: 12px;
}
/* --- */
.baikuai{
  background-color: white;
  width: 13px;
  height: 5px;
  margin-top: 120px;
}
.cenbox_zi_a{
  color: white;
}
.loginge{
  height:10px;
  width: 100%;
}
.cenbox_zi_b{
  color: white;
  font-size: 20px;
  font-weight: bold;
}
.footbot{
  background-color:#333333;
  text-align: center;
  font-size: 12px;
  line-height: 35px;
  color: #f5f5f5;
}
.loginblimg{
  position:absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  z-index: -1;
}
.footboxtop{
  display: none !important;
}
.loginbtn{
  width: 120px;
  text-align: center;
  margin: auto;
  border-radius: 50px;
	background: -webkit-linear-gradient(to right ,#25c9ff, #047ef5);
  background: -o-linear-gradient(to right ,#25c9ff, #047ef5);
  background: -moz-linear-gradient(to right ，#25c9ff,#047ef5); 
  background: linear-gradient(to right ,#25c9ff,#047ef5);
  color: #e9f1f9;
  font-size: 12px;
  line-height: 32px;
  box-shadow:0 10px 15px -10px #047ef5;
  cursor: pointer;
}
.loginbtn:hover{
  box-shadow:0 10px 15px -8px #777777;
}
.Cenhig{
  min-height: calc(100vh - 166px);
  position: relative;
}
.blimg{
  display: none !important;
}
.cenbox{
  min-height: calc(100vh - 166px);
  display: flex;
  align-items: center;
  justify-content:space-around;
}
.cenbox_cen{
  background-color: white;
  padding: 50px;
  box-sizing: border-box;
  width: 330px;
  position: relative;
  margin: 20px 0;
  margin-right: 100px;
}
.cenbox_in{
  width: 100%;
    margin-top: 30px;
}
.cenbox_in input{
  border: none;
  width: 100%;
  line-height: 35px;
  padding: 0 10px;
  box-sizing:border-box;
  font-size: 12px;
  border-bottom: 1px solid #ddd;
}
.cenbox_in:nth-child(1)
{
  margin-top: 0 !important;
}
.cenbox_btn{
  text-align: center;
  margin: 20px 0;
  margin-top:40px;
}
.login .cenbox_btn{
  margin-top: 60px !important;
  margin-bottom: 30px !important;
}
.cenbox_btn img{
  width: 120px;
  cursor: pointer;
}
.cenbox_bot{
  text-align: center;
}
.login .cenbox_bot i{
    font-size: 12px;
}
.login .cenbox_bot span{
  color:#5c9eff;
  font-size: 12px;
  cursor: pointer;
}
.login .cenbox_bot span:hover{
  text-decoration: underline;
}
.cenbox_bot span:nth-child(1)
{
  margin-right: 20px;
}
::-webkit-input-placeholder { /* WebKit browsers */
    color: #999;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #999;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #999;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #999;
}
.cenbox_in_d{
  position: relative;
}
.cenbox_in_d span{
  cursor: pointer;
  color:#5c9eff;
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 0;
  line-height: 35px;
  display: inline-block;
  width: 100px;
  text-align: right;
}
.cenbox_in_d i{
  color:#999999;
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 0;
  line-height: 35px;
  display: inline-block;
  width: 100px;
  text-align: right;
  cursor: default;
}
.cenbox_in_d span:hover{
  color: #176ce8;
}
.cenbox_in_d input{
  padding-right: 100px;
  box-sizing: border-box;
}
.regbox{
  width: 330px !important;
}
.regbox .cenbox_bot span{
  font-size: 12px;
  color: #999;
}
.cenbox_bot_sp{
  color:#5c9eff !important;
      cursor: pointer;
      font-size: 12px;
}
.cenbox_bot_sp:hover{
  color: #176ce8 !important;
  text-decoration: underline;
}
</style>