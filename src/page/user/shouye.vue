<template>
  <div>
    <div class="user_rig_a">
          <div class="user_rig_a_top">
            <router-link :to="{name:'UserIndexBanZhong'}" class="user_rig_a_top_li" :class="index==0?'user_rig_a_top_li_on':''">办理中项目({{nums.inHandlingCount>99?'99+':nums.inHandlingCount}})</router-link>
            <router-link :to="{name:'UserIndexKeBan'}" class="user_rig_a_top_li" :class="index==2?'user_rig_a_top_li_on':''">可办理项目({{nums.canHandelCount>99?'99+':nums.canHandelCount}})</router-link>
            <router-link :to="{name:'UserIndexKePi'}" class="user_rig_a_top_li" :class="index==3?'user_rig_a_top_li_on':''">可匹配项目({{nums.matchingCount>99?'99+':nums.matchingCount}})</router-link>
            <router-link :to="{name:'UserIndexWanCheng'}" class="user_rig_a_top_li" :class="index==4?'user_rig_a_top_li_on':''">已完成项目({{nums.completeCount>99?'99+':nums.completeCount}})</router-link>
            <div class="user_rig_a_top_li_"><input type="text" placeholder="搜索项目"></div>
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
        index:0,
        nums:{
          inHandlingCount:0,
          toBeAuditedCount:0,
          canHandelCount:0,
          matchingCount:0,
          completeCount:0,
        }
      }
    },
    created(){
      let that=this;
      if(this.$route.name=='UserIndexBanZhong')
      {
        that.index=0;
      }
      else if(this.$route.name=='UserIndexDaiShen'){
        that.index=1;
      }
      else if(this.$route.name=='UserIndexKeBan'){
        that.index=2;
      }
      else if(this.$route.name=='UserIndexKePi'){
        that.index=3;
      }
      else if(this.$route.name=='UserIndexWanCheng'){
        that.index=4;
      };
      this.getNums();
    },
    methods:{
      // 获取当前分别项目的数量
      getNums()
      {
        let that=this;
        that.Com.request({
          },'personalCenter/Index/countOrders',function(res){
          if(res.result=='success')
          {
            that.nums=res;
          }
        })
      }
    },
    watch: {
  　　'$route':{
        handler(route)
        {
          let that=this;
          that.getNums();
          if(route.name=='UserIndexBanZhong')
          {
            that.index=0;
          }
          else if(route.name=='UserIndexDaiShen'){
            that.index=1;
          }
          else if(route.name=='UserIndexKeBan'){
            that.index=2;
          }
          else if(this.$route.name=='UserIndexKePi'){
            that.index=3;
          }
          else if(this.$route.name=='UserIndexWanCheng'){
            that.index=4;
          }
        }
  　　},
    },
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
.user_rig_a_top_li_{
  width: 20%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  box-sizing: border-box;

}
.user_rig_a_top_li_ input{
  border: none;
  border: 1px solid #eee;
width: 100%;
border-radius: 50px;
    line-height: 30px;
    height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 12px;
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