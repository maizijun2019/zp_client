<template>
 <div class='pu-kong pijiexiang'>
    <div class="HuiGe"></div>
    <div class="cen-width pijiexiang_cen">
      <div class="YeLi">
        <router-link :to="{name:'FuWu'}" class="YeLi_li">服务项目</router-link>
        <i class="el-icon-arrow-left"></i>
        <router-link :to="{name:'PiPei'}" class="YeLi_li">精准匹配</router-link>
        <i class="el-icon-arrow-left"></i>
        <router-link :to="{name:'PiPeiJieGuo'}" class="YeLi_li">匹配结果</router-link>
        <i class="el-icon-arrow-left YeLi_i_on"></i>
        <router-link :to="{name:'PiPeiJieGuo'}" class="YeLi_li YeLi_li_on">查看详情</router-link>
      </div>
    </div>
    <div class="pijiexiangcen">

    </div>
    <div class="HuiGe"></div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        
      }
    },
    created(){
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
      })
    },
    methods:{
      
    },
    components:{

    }
  }
</script>

<style scoped>
.pijiexiang{
  background-color: #f3f3f3;
}
.pijiexiang_cen{
  background-color: white;
}
.pijiexiangcen{
  padding: 20px;
  box-sizing: border-box;
}
</style>