<template>
  <div class="ziliaotab">
    <div class='tancen'>
      <div class='tabcen_li'>
        <div class="tabcen_li_name">当前密码：</div><input type="password" v-model="formData.password">
      </div>
       <div class='tabcen_li'>
        <div class="tabcen_li_name">新密码：</div><input type="password" v-model="formData.newpassword" @change="miJianFn">
      </div>
       <div class='tabcen_li'>
        <div class="tabcen_li_name">再次输入新密码：</div><input type="password" v-model="newpassword_b" @change="miJianFn">
        <span class='cuosp' v-if="cuo.pass_c_f">*2次密码不一致</span>
      </div>
      <div class='tabcen_li'>
        <div class="tabcen_li_name">手机号：</div><input type="text" v-model="formData.phone"><span v-if='tan_f' class="tanbtn_fa">已发送({{yan_s}}s)</span><span class="tanbtn" v-if='!tan_f' @click="yanFn">点击发送</span>
      </div>
      <div class='tabcen_li'>
        <div class="tabcen_li_name">手机验证码：</div><input type="text" v-model="formData.validate">
      </div>
    </div>
    <div class="JBtn addbtn" @click="tiFn">确认提交</div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        tan_f:false,
        yan_s:6,
        formData:{
          password:null,
          newpassword:null,
          phone:null,
          validate:null,
        },
        newpassword_b:null,
        cuo:{
          pass_c_f:false
        }
      }
    },
    created(){
      
    },
    methods:{
      // ---验证码
      yanFn()
      {
        let that=this;
        if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(that.formData.phone)) || that.formData.phone.length!=11 || !that.formData.phone.length){ 
          that.$message({
            message:'请输入正确的手机号',
            type: 'error',
          });
        } 
        else{
          that.tan_f=true;
          that.yan_s=60;
          let time_in=setInterval(function(){
            that.yan_s=that.yan_s-1;
            if( that.yan_s==-1)
            {
              clearInterval(time_in);
              that.tan_f=false;
            }
          },1000)
        }
      },
      //确定修改
      tiFn(){
        let that=this;
        if(!that.formData.password || !that.formData.validate || !that.formData.newpassword || !that.formData.phone)
        {
          that.$message({
            message:'请填写完整',
            type: 'error',
            duration:'1500'
          });
        }
        else if(that.cuo.pass_c_f){
          that.$message({
            message:'新密码2次输入不一致',
            type: 'error',
            duration:'1500'
          });
        }
        else{
          that.Com.request(that.formData,'login/index/changePwd',function(res){
            if(res.result=='success')
            {
              that.$message({
                message:"修改成功",
                type: 'success',
            duration:'1500'
              });
            }
            else{
              that.$message({
                message:res.error_message,
                type: 'error',
            duration:'1500'
              }); 
            }
          })
        }
      },
      // 密码重复输入检测
      miJianFn(){
        let that=this;
        if(that.formData.newpassword && that.newpassword_b)
        {
          if(that.formData.newpassword!=that.newpassword_b)
          {
            that.cuo.pass_c_f=true;
          }
          else{
            that.cuo.pass_c_f=false;
          }
        }
      }
    },
    components:{

    }
  }
</script>

<style scoped>
.cuosp{
  color:red;
  margin-left: 20px;
}
.upbox{
  position: relative;
}
.upbox img{
  width: 90px;
  cursor: pointer;
}
.addbtn{
  position:absolute;
  bottom: 120px;
  left:50%;
  transform: translateX(-50%);
}
.upbox input{
  position:absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 99;
  cursor: pointer;
}
.tancen{
  box-sizing: border-box;
  padding-top: 120px;
}
.tabcen_li input
{
  flex:initial;
  width: 200px !important;
}
.ziliaotab{
  position: relative;
  height: 650px;
}
.ziliaotab .tabcen_li{
  width:435px;
}
.tanbtn{
  background-color: #3399ff;
  text-align: center;
  width: 80px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  color: white;
  border-radius: 3px;
  font-size: 12px;
  margin-left: 20px;
}
.tanbtn:hover{
  box-shadow: 1px 2px 3px -1px #aaa, 0 0 10px 1px #0d69c5 inset;
}
.tanbtn_fa{
  background-color: #f3f3f3;
  color: #999999;
}
.tabcen_li_name{
  width: 110px !important;
}
</style>