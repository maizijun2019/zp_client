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
          <input type="text" placeholder="账号">
        </div>
        <div class="cenbox_in">
          <input type="password" placeholder="密码">
        </div>
        <div class="cenbox_btn">
          <div class="loginbtn">登录账号</div>
          <!-- <img src="@/assets/img/dengbtn.png" alt=""> -->
        </div>
         <div class="cenbox_bot"><span>忘记密码？</span><router-link :to="{name:'Reg'}" class='cenbox_bot_sp'>注册</router-link></div>
        <!-- <div class="cenbox_bot"><span>忘记密码？</span><span @click="qieFn(1)">注册</span></div> -->
      </div>
      
      <div class="cenbox_cen regbox" v-if='x_f==1'>
        <div class="cenbox_in">
          <input type="text" placeholder="账号" v-model='ti_data.name'>
        </div>
        <div class="cenbox_in">
          <input type="password" placeholder="密码(只包含字母和数字且长度不小于8)" v-model='ti_data.password_a'>
        </div>
        <div class="cenbox_in">
          <input type="password" placeholder="密码(只包含字母和数字且长度不小于8)" v-model='ti_data.password_b'>
        </div>
        <div class="cenbox_in">
          <input type="number" placeholder="手机号" v-model='ti_data.phone'>
        </div>
        <!-- <div class="cenbox_in cenbox_in_d">
          <input type="text" placeholder="验证码" v-model='ti_data.validate'><span v-if='!yan_f' @click="faYanFn">获取短信验证码</span><i v-if='yan_f'>已发送(<em>{{y_time}}s</em>)</i>
        </div> -->
        <!-- <div class="leibox">
          <div class="leiboxli" :class="ti_data.is_operators==0?'leiboxli_on':''" @click="leiboxFn(0)">
            <span><i></i></span>个人用户
          </div>
          <div class="leiboxli" :class="ti_data.is_operators==1?'leiboxli_on':''"  @click="leiboxFn(1)">
            <span><i></i></span>服务商用户
          </div>
        </div> -->
        <div class="lo_tishi" v-if="tishi.ti_f">{{tishi.ti_text}}</div>
        <div class="cenbox_btn">
          <div class="loginbtn JBtn" @click="dengluFn">注册账号</div>
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
        x_f:1,
        yan_f:false,
        y_time:60,
        ti_data:{
          name:null,
          phone:null,
          password_a:null,
          password_b:null,
          validate:null,
          is_operators:-1
        },
        tishi:{
          ti_f:false,
          ti_text:null
        }
      }
    },
    created(){
       document.title="中普云·注册";
    },
    methods:{
      leiboxFn(type){
        this.ti_data.is_operators=type;
      },
      // 获取验证码
      faYanFn(){
        let that=this;
        if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.ti_data.phone)) || this.ti_data.phone.length!=11){ 
          that.tishi.ti_f=true;
          that.tishi.ti_text='请输入正确的手机号';
        } 
        else{
          that.Com.request({
            phone:that.ti_data.phone
          },'login/index/sendVerificationCode',function(res){
            if(res.result=='success')
            {
              that.$message({
                message: '发送成功',
                type: 'success',
                duration:1500,
                onClose:function(){
                }
              });
              that.tishi.ti_f=false;
              that.yan_f=true;
              var time_fn=setInterval(function(){
                that.y_time--;
                if(that.y_time==-1)
                {
                  that.yan_f=false;
                  that.y_time=60;
                  clearInterval(time_fn);
                }
              },1000)
            }
            else{
              that.$message({
                message: '发送失败，请重新发送',
                type: 'error',
                duration:1500,
                onClose:function(){
                }
              });
            }
          })
        }
      },
      // ----提交注册
      dengluFn(){
        let that=this;
        let data_=that.ti_data;
        if(!data_.password_a || !data_.name || !data_.phone || !data_.password_b)
        {
          that.tishi.ti_f=true;
          that.tishi.ti_text='请填写完整';
        }
        else if(data_.password_a != data_.password_b)
        {
          that.tishi.ti_f=true;
          that.tishi.ti_text='2次密码不一致';
        }
        else if(data_.name.length<4)
        {
          that.tishi.ti_f=true;
          that.tishi.ti_text='账号不能少于4个字符';
        }
        else if(data_.password_a.length>25 || data_.password_a.length<4)
        {
          that.tishi.ti_f=true;
          that.tishi.ti_text='请设置4-25位字符长度的密码';
        }
        else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.ti_data.phone)) || this.ti_data.phone.length!=11){ 
          that.tishi.ti_f=true;
          that.tishi.ti_text='请输入正确的手机号';
        } 
        // else if(data_.is_operators==-1)
        // {
        //   that.tishi.ti_f=true; 
        //   that.tishi.ti_text=`请选择，是‘个人用户’，还是‘服务商用户’`;
        // }
        else{
          that.tishi.ti_f=false;
          that.Com.request({
            username:data_.name,
            password:data_.password_a,
            phone:data_.phone,
            check_password:data_.password_b,
          },'consumer/register',function(res){
            if(res.error_code==0)
            {
              that.$message({
                message: '注册成功',
                type: 'success',
                duration:1500,
                onClose:function(){
                  that.$store.commit('Info',{
                    username:that.ti_data.username
                  })
                  // that.$emit('userinfoFn',that.ti_data.name);
                  // let weiinfo_={
                  //   username:data_.name
                  // }
                  // that.gongCan.GongGetUserInfo(weiinfo_);
                  that.$router.push({name:'User',query:{'login':1}})
                }
              });
            }
            else{
              that.$message({
                message:res.error_message,
                type: 'error',
                duration:2000,
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
.leibox{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top:15px;
}
.leiboxli{
  display: flex;
  align-items: center;
  cursor: pointer;
}
.leiboxli_on i{
  background-color: #5c9eff;
}
.leiboxli:hover{
  color: #5c9eff;
}
.leiboxli span{
  width: 15px;
  height: 15px;
  border: thin solid #ddd;
  padding: 2px;
  box-sizing: border-box;
  display: block;
  margin-right: 5px;
  border-radius: 50%;
}
.leiboxli i{
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.lo_tishi{
  margin: 10px 0;
  text-align: center;
  color: red;
  font-size: 12px;
}
.el-menu-item{
  border: none !important;
  height: 200px !important;
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
.loginbtn{
  margin: auto;
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
    margin-top: 10px;
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