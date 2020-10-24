<template>
  <div class="licen">
    <div class="li">注册时间：{{ctime}}</div>
    <div class="li">上次登录时间：{{date}}</div>
    <div class="li">上次登录ip：{{ip}}</div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        ctime:null,
        ip:null,
        date:null,
      }
    },
    created(){
      let that=this;
      that.Com.request('','customers/index/lastLogin',function(res){
        that.ctime=res.data.ctime;
        that.date=res.data.date;
        that.ip=res.data.ip;
      })
    },
    methods:{
      
    },
    components:{

    }
  }
</script>

<style scoped>
.licen{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 50px;
  box-sizing: border-box;
}
.li{
min-width: 250px;
margin-top: 15px;
color: #666666;
}
</style>