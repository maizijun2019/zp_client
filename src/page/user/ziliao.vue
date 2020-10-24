<template>
  <div>
     <div class="user_rig_a">
          <div class="user_rig_a_top">
            <div class="user_rig_a_top_li" :class="index==0?'user_rig_a_top_li_on':''" @click="tanFn(0)">基础资料</div>
            <div class="user_rig_a_top_li" :class="index==1?'user_rig_a_top_li_on':''"  @click="tanFn(1)">认证资料</div>
            <div class="user_rig_a_top_li" :class="index==2?'user_rig_a_top_li_on':''"  @click="tanFn(2)">账号资料</div>
          </div>
          <div class="user_rig_a_cen">
            <router-view/>
          </div>
        </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        index:0
      }
    },
    created(){
      let that=this;
       if(this.$route.name=='UserZiLiaoRen' || this.$route.name=='UserZiLiaoRenTian')
            {
              that.index=1;
            }
            else if(this.$route.name=='UserZiLiaoJiben'){
              that.index=0;
            }
            else if(this.$route.name=='UserZiLiaoZhangHao'){
              that.index=2;
            }
    },
    methods:{
        tanFn(num)
      {
        this.index=num;
        var that=this;
        if(num==0)
        {
          that.$router.push({name:'UserZiLiaoJiben'})
        }
        else if(num==1)
        {
          that.$router.push({name:'UserZiLiaoRen'})
        }
         else if(num==2)
        {
          that.$router.push({name:'UserZiLiaoZhangHao'})
        }
      }
    },
    components:{

    },
    watch:{
    }
  }
</script>

<style scoped>
.user_rig_a_top{
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
}
.user_rig_a_top_li{
  width: 20%;
  height: 45px;
  text-align: center;
  color: #666666;
  font-weight: bold;
  font-size: 14px;
  line-height: 45px;
  cursor: pointer;
}
.user_rig_a_top_li:active
{
  background-color: #3399ff !important;
  color: white !important;
}
.user_rig_a_top_li:hover{
 background-color: #eaf5ff; 
  color: #666666;
}
.user_rig_a_top_li_on{
  background-color: #3399ff !important;
  color: white !important;
}
</style>