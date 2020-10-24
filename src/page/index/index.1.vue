<template>
  <div class="index-index">
    <div class="cen-width">
      <!-- <div class="blimg">
        <div class="lun_img">
          <img class="blimg_img" src="@/assets/img/banner.png">
        </div>
      </div> -->
      <!-- <div class="tb"></div> -->
      <div class="infobox">
        <el-tabs type="border-card">
          <el-tab-pane label="所有信息">
            <div class="searbox">
              <div class="searbox_lef">
                <div class="searbox_lef_in"><img src="@/assets/img/7.png"><input type="text" placeholder="输入关键字搜索"></div>
                <div class="searbox_lef_btn">搜索</div>
              </div>
              <div class="searbox_rig"><img src="@/assets/img/6.png"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="企业信息">企业信息</el-tab-pane>
          <el-tab-pane label="知识产权">知识产权</el-tab-pane>
          <el-tab-pane label="创新载体">创新载体</el-tab-pane>
          <el-tab-pane label="政策信息">政策信息</el-tab-pane>
        </el-tabs>
      </div>
      <!-- 统计 -->
      <div class="tongbox">
        <div class='tongboxli'>
          <div class="tongboxli_">165646w+</div>
          <div class="tongboxli_b">解决各类申请问题累计</div>
        </div>
        <div class='tongboxli'>
          <div class="tongboxli_">165646w+</div>
          <div class="tongboxli_b">挽回用户经济损失</div>
        </div>
        <div class='tongboxli'>
          <div class="tongboxli_">165646w+</div>
          <div class="tongboxli_b">比传统方式平均节约</div>
        </div>
      </div>
      <!-- -类别-- -->
      <div class="leibox pu-kong">
        <div class="leiboxli" :class="addLeiIndex==1?'leiboxli_on':''" @mousemove="addLeiIndex=1" @mouseleave="addLeiIndex=0">
          <div class='leiboxliimg'>
            <img class="tu_w" src="@/assets/img/1.png"><img class="tu_x" src="@/assets/img/11.png">
          </div>
          <div class="leiboxli_name">专利</div>
          <div class="leiboxli_btn">查看详情</div>
        </div>
        <div class="leiboxli" :class="addLeiIndex==2?'leiboxli_on':''" @mousemove="addLeiIndex=2" @mouseleave="addLeiIndex=0">
          <div class='leiboxliimg'>
            <img class="tu_w" src="@/assets/img/2.png"><img class="tu_x" src="@/assets/img/22.png">
          </div>
          <div class="leiboxli_name">科技专项</div>
          <div class="leiboxli_btn">查看详情</div>
        </div>
        <div class="leiboxli" :class="addLeiIndex==3?'leiboxli_on':''" @mousemove="addLeiIndex=3" @mouseleave="addLeiIndex=0">
          <div class='leiboxliimg'>
            <img class="tu_w" src="@/assets/img/3.png"><img class="tu_x" src="@/assets/img/33.png">
          </div>
          <div class="leiboxli_name">高新技术企业</div>
          <div class="leiboxli_btn">查看详情</div>
        </div>
        <div class="leiboxli" :class="addLeiIndex==4?'leiboxli_on':''" @mousemove="addLeiIndex=4" @mouseleave="addLeiIndex=0">
          <div class='leiboxliimg'>
            <img class="tu_w" src="@/assets/img/4.png"><img class="tu_x" src="@/assets/img/44.png">
          </div>
          <div class="leiboxli_name">版权</div>
          <div class="leiboxli_btn">查看详情</div>
        </div>
        <div class="leiboxli leiboxli_l" :class="addLeiIndex==5?'leiboxli_on':''" @mousemove="addLeiIndex=5" @mouseleave="addLeiIndex=0">
          <div class='leiboxliimg'>
            <img class="tu_w" src="@/assets/img/5.png"><img class="tu_x" src="@/assets/img/55.png">
          </div>
          <div class="leiboxli_name">政府专项补贴</div>
          <div class="leiboxli_btn">查看详情</div>
        </div>
      </div>
      <!-- 公告 -->
      <div class="gonggaobox pu-kong">
        <div class="gonggaoboxli">
        最新公告：<span>dsssssssssssss</span>
        </div>
        <div class="gonggaoboxli gongmore">
          更多
          <span class="el-icon-arrow-right"></span>
        </div>
      </div>
      <!-- 活动 -->
      <div class="huobox pu-kong">
        <div class="huoleft">
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="huorig">
          <div class="huorig_tab">
            <el-tabs value="first" stretch>
              <el-tab-pane label="行业咨询" name="first">
                <div class="huo_tabbox">
                  <div class="huo_tabbox_lef">哒哒哒哒哒哒多多多多多多多多多多多多多多多多多多多多多多多多多多多多v</div>
                  <div class="huo_tabbox_rig">20-4545</div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="案情播报" name="second">案情播报</el-tab-pane>
              <el-tab-pane label="知识文库" name="third">知识文库</el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
    <!-- 项目 -->
    <div class="xiangbox">
      <div class="tit">热门项目</div>
      <div class="xiangbox_cen_">
        <div class="xiangbox_cen"  :style="{transform:'translateX('+xiang.xiangyi_x+'px)'}">
          <div class="xiangbox_cenli pu-ying">
            <div class="xiangbox_cenli_tit">s哒哒哒哒111哒哒多多多</div>
            <div class="xiangbox_cenli_time">55555</div>
            <div class="xiangbox_cenli_line"></div>
            <div class="xiangbox_cenli_cen">
              <div class="xiangbox_cenli_cen_">
                1
              </div>
            </div>
          </div>

          <div class="xiangbox_cenli pu-ying">
            <div class="xiangbox_cenli_tit">s哒哒哒哒222哒哒多多多</div>
            <div class="xiangbox_cenli_time">55555</div>
            <div class="xiangbox_cenli_line"></div>
            <div class="xiangbox_cenli_cen">
              <div class="xiangbox_cenli_cen_">
                1
              </div>
            </div>
          </div>

          <div class="xiangbox_cenli pu-ying">
            <div class="xiangbox_cenli_tit">s哒哒哒哒333哒哒多多多</div>
            <div class="xiangbox_cenli_time">55555</div>
            <div class="xiangbox_cenli_line"></div>
            <div class="xiangbox_cenli_cen">
              <div class="xiangbox_cenli_cen_">
                1
              </div>
            </div>
          </div>

          <div class="xiangbox_cenli pu-ying">
            <div class="xiangbox_cenli_tit">s哒哒哒444哒哒哒多多多</div>
            <div class="xiangbox_cenli_time">55555</div>
            <div class="xiangbox_cenli_line"></div>
            <div class="xiangbox_cenli_cen">
              <div class="xiangbox_cenli_cen_">
                1
              </div>
            </div>
          </div>

          <div class="xiangbox_cenli pu-ying">
            <div class="xiangbox_cenli_tit">s哒哒哒555哒哒哒多多多</div>
            <div class="xiangbox_cenli_time">55555</div>
            <div class="xiangbox_cenli_line"></div>
            <div class="xiangbox_cenli_cen">
              <div class="xiangbox_cenli_cen_">
                1
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rigbtn">
        <img @click="xiangFn('left')" v-if="xiang.img_xs[0]" src="@/assets/img/more.png">
        <img @click="xiangFn('right')" v-if="xiang.img_xs[1]"  src="@/assets/img/more.png">
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{ 
        addLeiIndex:0,
        xiang:{
          xiangyi_x:0,
          kuai_index:0,
          img_xs:[false,true]
        }
      }
    },
    created(){ 
    },
    methods:{
      xiangFn(name){
        let that=this;
        let xiangbox_cen=document.getElementsByClassName('xiangbox_cen');
        let xiangbox_cen_=document.getElementsByClassName('xiangbox_cen_');
        let li_=document.getElementsByClassName('xiangbox_cenli');//块
        let width_d=xiangbox_cen.clientWidth||xiangbox_cen.offsetWidth;//总长
        let width_x=xiangbox_cen_[0].clientWidth||xiangbox_cen_[0].offsetWidth;//显示区域
        let num_x=parseInt(width_x/300);//当前最多显示多少块
        let li_num=li_.length;//块总数

        let x_index;
        if(name=='left')
        {
          x_index=that.xiang.kuai_index-num_x;
        }
        else{
          x_index=that.xiang.kuai_index+num_x;
        }
        if(x_index<=li_num && x_index>=0)
        {
          that.xiang.kuai_index=x_index;
          that.xiang.xiangyi_x=-li_[that.xiang.kuai_index].offsetLeft+20;
        }
          console.log(x_index+num_x)
          console.log(li_num)
        if(x_index+num_x<=li_num)
        {
          that.xiang.img_xs[1]=true;
        }
        else{
          that.xiang.img_xs[1]=false;
        }
        if(x_index-num_x>=0)
        {
          that.xiang.img_xs[0]=true;
        }
        else{
          that.xiang.img_xs[0]=false;
        }
      }
    },
    components:{     

    }
  }
</script>
<style scope>
/* 项目 */
.rigbtn{
  text-align: center;
  height: 80px;
}
.rigbtn img{
  width: 60px;
  margin-top: 10px;
  cursor: pointer;
}
.rigbtn img:hover{
  border: 1px solid red
}
.xiangbox_cenli:nth-child(1)
{
  margin-left: 0 !important;
}
.xiangbox_cenli{
  background-color: white;
  padding: 15px;
  box-sizing: border-box;
  width: 300px;
  margin-left: 20px;
  min-width: 300px;
  display: inline-block;
}
.xiangbox_cenli_tit{
  color: #333333;
  margin-bottom: 7px;
  font-size: 15px;
}
.xiangbox_cenli_time{
  font-size: 11px;
  color: #666666;
}
.xiangbox_cenli_line{
  height: 1px;
  width: 50px;
  background-color: #5c9eff;
  margin: 15px 0;
}
.xiangbox_cenli_cen{
  min-height: 60px;
}
.xiangbox_cenli_cen_{
  font-size: 13px;
  color: #666666;
  	overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp:3;
line-height: 20px;
letter-spacing:1px;
-webkit-box-orient: vertical;
}
.xiangbox_cen{
    padding: 0 20px;
  box-sizing: border-box;
  white-space:nowrap;
  width: -webkit-fit-content;
        width: -moz-fit-content;
        width: fit-content;
        transition: transform 0.5s ease-in;
}
.xiangbox_cen::after
{
  content:"";
  clear: both;
  display:block;
}
.xiangbox_cen_{
  overflow: hidden;
      padding: 10px 0;
  box-sizing: border-box;
}
.xiangbox{
  background-color:#f3f3fd;
  padding: 20px 0;
  box-sizing: border-box;
}
.tit{
  color: #666666;
  line-height: 40px;
  text-align: center;
}
/* -------------- */
.leibox{
  position: relative;
  width: 100%;
  height: 210px;
}
.leiboxli{
  width: -moz-calc(20% - 16px); 
	width: -webkit-calc(20% - 16px);
	width: calc(20% - 16px);
  margin-right:20px;
  box-shadow:0 0 5px 1px #ddd;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  box-sizing: border-box;
  float: left;
}
.leiboxli_l
{
  margin-right: 0 !important;
}
.leibox::after{
  content: "";
  clear: both;
  display:block;
}
.leiboxli .tu_x{
  display: none;
}
.leiboxli_btn{
  background-color: white;
  color: #5c9eff;
  border-radius: 20px;
  width: 70px;
  line-height: 25px;
  margin-top: 20px;
  font-size: 11px;
  cursor: pointer;
}
.leiboxli .leiboxli_btn{
  display:none;
}
.leiboxli_name{
  color: #5c9eff;
  font-size: 14px;
  margin-top: 10px;
}
.leiboxli_on .leiboxli_btn{
 display:inline-block;
}
.leiboxli_on{
  background-color: #5c9eff;
}
.leiboxli_on .leiboxli_name{
  color: white;
}
.leiboxli_on .tu_x{
  display: inline-block;
}
.leiboxli_on .tu_w{
  display:none;
}
/*  */
.blimg{
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
}
.blimg_img{
  width: 100%;
  height:40vw;
  max-height:550px;
}
.tb{
  position: relative;
  height: -moz-calc(40vw - 40px); 
	height: -webkit-calc(40vw - 40px);
	 height: calc(40vw - 40px);
}
/* tanbox */
.infobox{
  position: relative;
  padding: 0 50px;
  box-sizing: border-box;
  margin-top: -42px;
} 
.infobox .el-tabs--border-card{
  border: none !important;
}
.infobox .el-tabs__nav .is-top{
  background-color: white;
  color: #5c9eff;
  font-size: 12px;
  width: 20%;
  text-align: center;
}
.infobox .el-tabs__nav{
  width:100%;
  background-color:white;
}
.infobox .el-tabs__nav .is-active{
  color: white !important;
   background-color: #5c9eff !important;
   position:relative;
}
.infobox .el-tabs__nav .is-active::after{
  contain: "1111";
  display: block;
  background-color: red;
  position: relative;
  width: 20px;
  height: 10px;
  bottom: -10px;
}
.searbox{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.searbox_rig{
  width: 40px;
  margin-left: 15px;
}
.searbox_rig img{
  width: 100%;
}
.searbox_lef{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
  box-sizing: border-box;
  margin-left: 40px;
}
.searbox_lef_in{
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}
.searbox_lef_in input{
  border: none;
  width: 100%;
  flex: 1;
  margin-left:10px;
  font-size: 14px;
  line-height: 27px;
}
::-webkit-input-placeholder { /* WebKit browsers */
    color:    #999;
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
.searbox_lef_in img{
  height: 20px;
}
.searbox_lef_btn{
  cursor: pointer;
  background-color: #5c9eff;
  color: white;
  text-align: center;
  width: 70px;
  line-height: 25px;
  font-size: 12px;
}
/* tongbox */
.tongbox{
  padding: 0 50px;
  display: flex;
  align-items: center;
  margin: 30px 0;
}
.tongboxli{
      width: 33.333%;
    text-align: center;
    height: 120px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.tongboxli_{
  font-weight: bold;
  font-size: 30px;
}
.tongboxli_b{
  font-size: 12px;
  color: #666666;
  margin-top: 20px;
}
/* leibox */
/* gonggaobox */
.gonggaobox{
  background-color: #f4f4f4;
  color: #333333;
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 100%;
  margin: 25px 0;
  padding: 10px;
  box-sizing: border-box;
  justify-content: space-between
}
.gonggaoboxli{
  display: flex;
  align-items: center;
  font-size: 14px;
}
.gonggaoboxli span{
  color: #5c9eff;
  font-size: 14px;
  margin-left: 20px;
}
.gongmore{
  cursor: pointer;
  color: #5c9eff;
}
/* 活动 */
.huo_tabbox{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  line-height: 35px;
  min-width: 100%;
}
.huo_tabbox_lef{
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-right: 20px;
  font-size: 14px;
  padding-left: 10px;
  box-sizing: border-box;
}
.huobox{
  width: 100%;
  display: flex;
  font-size: 14px;
  margin-bottom:50px;
}
.huoleft{
    width: 350px;
    height: 250px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
.el-carousel{
  height: 220px !important;
}
.el-carousel__container
{
  height: 200px !important;
}
.huorig_tab .el-tabs__nav-wrap{
  width: 300px;
}
.huorig_tab .el-tabs__header
{
  padding: 0 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    margin-bottom: 0 !important;
}
.huorig{
  flex: 1;
  margin-left: 20px;
  box-sizing: border-box;
  min-width: 100px;
}
</style>