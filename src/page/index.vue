<template>
  <div>
    <!-- 主页外层 -->
    <div class="blimg">
      <div class="lun_img">
        <el-carousel>
          <el-carousel-item if='lunData' v-for="item in lunData">
            <!-- <img class="blimg_img" src="@/assets/img/banner.png"> -->
            <img class="blimg_img" :src="gonglunImgUrl+item.path" :onerror="defaultImg">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <router-view class="cendiv"/>
    <foot></foot>
  </div>
</template>

<script>
import heard from '../components/heard.vue'
import foot from '../components/foot.vue'
  export default{
    data(){
      return{
        lunData:null,
        imgUrl:null,
        defaultImg:'this.src="' + require('../assets/img/banner.png') + '"',
      }
    },
    created(){
      let that=this;
      this.gonglunImgUrl=this.gongCan.dalunImgUrl;
      this.Com.request('','homePage/index/getBanner',function(res){
        that.lunData=res.data;
      })
    },
    methods:{
      
      },
    components:{
      
      },
      components:{heard,foot},
  }
</script>

<style>
.cendiv{
  position: relative;
  z-index: 10;
}
.blimg{
  position:relative;
  top: 0;
  left: 0;
  width: 100%;
  width: 100%;
  height:40vw;
  /* max-height:550px; */
  min-height: 360px;
}
.lun_img{
    width: 100%;
  height: 100%;
}
.blimg_img{
  width: 100%;
  height: 100%;
}
</style>