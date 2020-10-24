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
                <div class="searbox_lef_in"><img src="@/assets/img/7.png"><input type="text" v-model="soutext[0]" placeholder="输入关键字搜索"></div>
                <div class="searbox_lef_btn" @click="souInfoFn(0)">搜索</div>
              </div>
              <div class="searbox_rig"><img src="@/assets/img/6.png"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="专利">
            <div class="searbox">
              <div class="searbox_lef">
                <div class="searbox_lef_in"><img src="@/assets/img/7.png"><input type="text" v-model="soutext[1]" placeholder="输入关键字搜索"></div>
                <div class="searbox_lef_btn"  @click="souInfoFn(1)">搜索</div>
              </div>
              <div class="searbox_rig"><img src="@/assets/img/6.png"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="商标">
            <div class="searbox">
              <div class="searbox_lef">
                <div class="searbox_lef_in"><img src="@/assets/img/7.png"><input type="text" v-model="soutext[2]" placeholder="输入关键字搜索"></div>
                <div class="searbox_lef_btn"  @click="souInfoFn(2)">搜索</div>
              </div>
              <div class="searbox_rig"><img src="@/assets/img/6.png"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="版权">
            <div class="searbox">
              <div class="searbox_lef">
                <div class="searbox_lef_in"><img src="@/assets/img/7.png"><input type="text" v-model="soutext[3]" placeholder="输入关键字搜索"></div>
                <div class="searbox_lef_btn"  @click="souInfoFn(3)">搜索</div>
              </div>
              <div class="searbox_rig"><img src="@/assets/img/6.png"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="项目">
            <div class="searbox">
              <div class="searbox_lef">
                <div class="searbox_lef_in"><img src="@/assets/img/7.png"><input type="text" v-model="soutext[4]" placeholder="输入关键字搜索"></div>
                <div class="searbox_lef_btn"  @click="souInfoFn(4)">搜索</div>
              </div>
              <div class="searbox_rig"><img src="@/assets/img/6.png"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="两化融合">
            <div class="searbox">
              <div class="searbox_lef">
                <div class="searbox_lef_in"><img src="@/assets/img/7.png"><input type="text" v-model="soutext[5]" placeholder="输入关键字搜索"></div>
                <div class="searbox_lef_btn"  @click="souInfoFn(5)">搜索</div>
              </div>
              <div class="searbox_rig"><img src="@/assets/img/6.png"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="财务">
            <div class="searbox">
              <div class="searbox_lef">
                <div class="searbox_lef_in"><img src="@/assets/img/7.png"><input type="text" v-model="soutext[6]" placeholder="输入关键字搜索"></div>
                <div class="searbox_lef_btn"  @click="souInfoFn(6)">搜索</div>
              </div>
              <div class="searbox_rig"><img src="@/assets/img/6.png"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="服务商">
            <div>
              <shang></shang>
              <!-- <div class="searbox_lef">
                <div class="searbox_lef_in"><img src="@/assets/img/7.png"><input type="text" v-model="shangTxt" placeholder="输入关键字搜索"></div>
                <div class="searbox_lef_btn"  @click="shangsouFn">搜索</div>
              </div>
              <div class="searbox_rig"><img src="@/assets/img/6.png"></div> -->
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 统计 -->
      <!-- <div class="tongbox">
        <div class='tongboxli'>
          <div class="tongboxli_">{{shujuData.problemCumulative}}</div>
          <div class="tongboxli_b">解决各类申请问题累计</div>
        </div>
        <div class='tongboxli'>
          <div class="tongboxli_">{{shujuData.economicsLoss}}</div>
          <div class="tongboxli_b">挽回用户经济损失</div>
        </div>
        <div class='tongboxli'>
          <div class="tongboxli_">{{shujuData.averageSave}}</div>
          <div class="tongboxli_b">比传统方式平均节约</div>
        </div>
      </div> -->
      <div class="numBox pu-kong">
        <div class="numBoxli numBoxli_a pu-ying">
          <div class="numBoxli_tit">
            <img src="@/assets/img/num1.png">企业数量(家)
          </div>
          <div class="numBoxli_cen">
            <div class="numBoxli_cenli">
              <div class="numBoxli_cenli_num"><span>{{shujuData&&shujuData.enterpriseCount?shujuData.enterpriseCount:'0'}}</span></div>
            </div>
          </div>
        </div>
        <div class="numBoxli numBoxli_b pu-ying">
          <div class="numBoxli_tit">
            <img src="@/assets/img/num2.png">项目数量(项)
          </div>
          <div class="numBoxli_cen">
            <div class="numBoxli_cenli">
              <div class="numBoxli_cenli_num"><span>{{shujuData&&shujuData.projectCount?shujuData.projectCount:'0'}}</span></div>
            </div>
          </div>
        </div>
        <div class="numBoxli numBoxli_c pu-ying">
          <div class="numBoxli_tit">
            <img src="@/assets/img/num3.png">补贴资金(元)
          </div>
          <div class="numBoxli_cen">
            <div class="numBoxli_cenli">
              <div class="numBoxli_cenli_num"><span>{{shujuData&&shujuData.cashCount?shujuData.cashCount:'0'}}</span></div>
            </div>
          </div>
        </div>
        <div class="numBoxli numBoxli_d pu-ying">
          <div class="numBoxli_tit">
            <img src="@/assets/img/num4.png">税收优惠(元)
          </div>
          <div class="numBoxli_cen">
            <div class="numBoxli_cenli">
              <div class="numBoxli_cenli_num"><span>{{shujuData&&shujuData.TaxPreferencesCount?shujuData.TaxPreferencesCount:'0'}}</span></div>
            </div>
          </div>
        </div>
        <div class="numBoxli numBoxli_e pu-ying">
          <div class="numBoxli_tit">
            <img src="@/assets/img/num6.png">知识产权(件)
          </div>
          <div class="numBoxli_cen">
            <div class="numBoxli_cenli">
              <div class="numBoxli_cenli_num"><span>{{shujuData&&shujuData.knowledgeCount?shujuData.knowledgeCount:'0'}}</span></div>
            </div>
          </div>
        </div>
        <div class="numBoxli numBoxli_f pu-ying">
          <div class="numBoxli_tit">
            <img src="@/assets/img/num5.png">技术服务(元)
          </div>
          <div class="numBoxli_cen">
            <div class="numBoxli_cenli">
              <div class="numBoxli_cenli_num"><span>{{shujuData&&shujuData.tech_serveCount?shujuData.tech_serveCount:'0'}}</span></div>
            </div>
          </div>
        </div>
      </div>
         <!-- 公告 -->
      <div class="gonggaobox pu-kong">
        <div class="gonggaoboxli">
        最新公告：<span v-if='gongData' @click="wenDianFn(gongData.id)">{{gongData.title}}</span>
        </div>
        <router-link :to="{name:'XinWen'}" class="gonggaoboxli gongmore">
          更多<span class="el-icon-arrow-right"></span>
        </router-link>
        <!-- <div class="gonggaoboxli gongmore">
        </div> -->
      </div>
      <!-- -类别-- -->
      <div class="leibox pu-kong">
        <div class="leiboxli" :class="addLeiIndex==1?'leiboxli_on':''" @mousemove="addLeiIndex=1" @mouseleave="addLeiIndex=0">
          <div class='leiboxliimg'>
            <img class="tu_w" src="@/assets/img/70.png"><img class="tu_x" src="@/assets/img/71.png">
          </div>
          <div class="leiboxli_div">
            <router-link :to="{name:'FuWu',query:{'type':1}}" class='leiboxli_name'>专利</router-link>
            <router-link :to="{name:'FuWu',query:{'type':2}}" class='leiboxli_name'>商标</router-link>
            <router-link :to="{name:'FuWu',query:{'type':3}}" class='leiboxli_name'>版权</router-link>
          </div>
          <!-- <div class="leiboxli_name">专利</div> -->
          <!-- <router-link :to="{name:'FuWu',query:{'type':1}}" class='leiboxli_btn'>查看详情</router-link> -->
        </div>
        <div class="leiboxli" :class="addLeiIndex==2?'leiboxli_on':''" @mousemove="addLeiIndex=2" @mouseleave="addLeiIndex=0">
          <div class='leiboxliimg'>
            <img class="tu_w" src="@/assets/img/66.png"><img class="tu_x" src="@/assets/img/67.png">
          </div>
          <router-link :to="{name:'FuWu',query:{'type':2}}" class='leiboxli_name'>政府项目</router-link>
        </div>
        <div class="leiboxli" :class="addLeiIndex==3?'leiboxli_on':''" @mousemove="addLeiIndex=3" @mouseleave="addLeiIndex=0">
          <div class='leiboxliimg'>
            <img class="tu_w" src="@/assets/img/60.png"><img class="tu_x" src="@/assets/img/61.png">
          </div>
          <router-link :to="{name:'FuWu',query:{'type':3}}" class='leiboxli_name'>标准认证</router-link>
        </div>
        <div class="leiboxli" :class="addLeiIndex==4?'leiboxli_on':''" @mousemove="addLeiIndex=4" @mouseleave="addLeiIndex=0">
          <div class='leiboxliimg'>
            <img class="tu_w" src="@/assets/img/68.png"><img class="tu_x" src="@/assets/img/69.png">
          </div>
          <router-link :to="{name:'FuWu',query:{'type':4}}" class='leiboxli_name'>科技成果</router-link>
        </div>
        <div class="leiboxli" :class="addLeiIndex==5?'leiboxli_on':''" @mousemove="addLeiIndex=5" @mouseleave="addLeiIndex=0">
          <div class='leiboxliimg'>
            <img class="tu_w" src="@/assets/img/64.png"><img class="tu_x" src="@/assets/img/65.png">
          </div>
          <router-link :to="{name:'FuWu',query:{'type':5}}" class='leiboxli_name'>人才</router-link>
        </div>
        <div class="leiboxli leiboxli_l" :class="addLeiIndex==6?'leiboxli_on':''" @mousemove="addLeiIndex=6" @mouseleave="addLeiIndex=0">
          <div class='leiboxliimg'>
            <img class="tu_w" src="@/assets/img/62.png"><img class="tu_x" src="@/assets/img/63.png">
          </div>
          <router-link :to="{name:'FuWu',query:{'type':6}}" class='leiboxli_name'>财税咨询</router-link>
        </div>
      </div>
      <!-- 活动 -->
      <div class="huobox pu-kong">
        <div class="huoleft">
          <el-carousel>
            <el-carousel-item v-if='gonglunDatas' v-for="item in gonglunDatas" :key="item.id">
              <div class="huoleft_cen" @click="wenDianFn(item.id)">
                <img :src="xin_url+item.imgs">
                <div class="_huoleft_cen_tit">{{item.title}}</div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="huorig">
          <div class="huorig_tab">
            <el-tabs value="0" stretch>
              <!-- <el-tab-pane :label="item.name" :name="item.type" v-for='item in xinType'> -->
              <el-tab-pane :label="xinType[item.type]" v-if='item.totalNum>0' :name="item.id" v-for='item in xinData'>
                <div class="huo_tabbox" v-for='(itemb,index) in item.data' v-if='index < 5' @click="wenDianFn(itemb.id)">
                  <div class="huo_tabbox_lef">{{itemb.title}}</div>
                  <div class="huo_tabbox_rig">{{itemb.create_at}}</div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="huobox_more"><router-link :to="{name:'XinWen'}">查看所有</router-link></div>
        </div>
      </div>
    </div>
    <!-- 项目 -->
    <div class="xiangbox" v-if='reData'>
      <div class="tit">热门项目</div>
      <div class="xiangbox_cen_">
        <div class="xiangbox_cen"  :style="{transform:'translateX('+xiang.xiangyi_x+'px)'}">
          <div class="xiangbox_cenli pu-ying" v-for="item in reData" @click="rexiangFn(item.id)">
            <div class="xiangbox_cenli_tit">{{item.name}}</div>
            <div class="xiangbox_cenli_time" v-if="item.ctime">{{item.ctime}}</div>
            <div class="xiangbox_cenli_time" v-if="!item.ctime" style="opacity: 0;">1111</div>
            <div class="xiangbox_cenli_line"></div>
            <div class="xiangbox_cenli_cen">
              <div class="xiangbox_cenli_cen_">
                【{{item.type}}】<span>{{item.province}}-{{item.region}}</span></br>
              </div>
              <div class="xiangbox_cenli_cen_li">{{item.ps}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="rigbtn">
        <img @click="xiangFn('left')" v-if="xiang.img_xs[0]" src="@/assets/img/rig.png">
        <img @click="xiangFn('right')" v-if="xiang.img_xs[1]"  src="@/assets/img/more.png">
      </div>
    </div>
  </div>
</template>

<script>
  import shang from '../../components/shanghu.vue'
  export default{
    data(){
      return{ 
        addLeiIndex:0,
        xiang:{
          xiangyi_x:0,
          kuai_index:0,
          img_xs:[false,true]
        },
        reData:null,
        xinData:null,
        xinType:{},
        gonglunDatas:null,
        gonglunImgUrl:null,
        rehua_f:false,
        gongData:null,
        shujuData:null,
        xin_url:null,
        soutext:['','','','','','','','','',''],//搜索参数
        shangTxt:''//商户搜索参数
      }
    },
    created(){ 
      // 热门项目
      let that=this;
      this.gonglunImgUrl=this.gongCan.indexlunImgUrl;
      this.xin_url=this.gongCan.xinImgUrl;
      this.Com.request('','homePage/index/hotProject',function(res){
        that.reData=res.data;
      })
      // 新闻tab
      this.Com.request('','news/Index/getNewsListTypeDis',function(res){
        that.xinData=res.data;
        for(let i=0;i<res.newstype.length;i++)
        {
          that.xinType[res.newstype[i].type]=res.newstype[i].name;
        }
        that.gonglunDatas=res.showData.data;
      })
      // 最新公告
      this.Com.request('','news/Index/getNewsList',function(res){
        that.gongData=res.data[0];
      })
      // 数据
      this.Com.request('','homepage/Index/dataCount',function(res){
          that.shujuData=res;
          let data_=res;
          if(data_.TaxPreferencesCount>99999){
            data_.TaxPreferencesCount=(data_.TaxPreferencesCount/100000).toFixed(2)+'W'
          }
          if(data_.cashCount>99999){
            data_.cashCount=(data_.cashCount/100000).toFixed(2)+'W'
          }
      })
    },
    methods:{
      // 商户搜索 
      shangsouFn(){
        this.Com.request({
          operator_name
        },'homePage/index/operatorsQuery',function(res){
          that.xinData=res.data;
          for(let i=0;i<res.newstype.length;i++)
          {
            that.xinType[res.newstype[i].type]=res.newstype[i].name;
          }
          that.gonglunDatas=res.showData.data;
        })
      },
      //快速搜索
      souInfoFn(index){
        let that=this;
        let sertxt=this.soutext[index];
        this.$router.push({name:'FuWu',params:{'type':index,'sertxt':sertxt}})
      },
      // -----
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
        if(x_index==-1){
          x_index=0;
        }
        if(x_index<=li_num && x_index>=0)
        {
          that.xiang.kuai_index=x_index;
          that.xiang.xiangyi_x=-li_[that.xiang.kuai_index].offsetLeft+20;
        }
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
      },
      // 选择热门项目
      rexiangFn(id)
      {
this.$router.push({name:'FuWuXiangQing',query:{'pid':id}})
      },
      // 选择新闻
      wenDianFn(id)
      {
this.$router.push({name:'XinWenXiang',query:{'id':id}})
      }
    },
    components:{shang}
  }
</script>
<style scoped>
.huobox_more{
  text-align:right;
  color: #666;
  margin-top: 5px;
}
.huobox_more a{
  color: #666;
  font-size: 12px;
}
.huobox_more a:hover
{
  color: #409EFF;
}
.numBox{
  display: flex;
  align-items: center;
  margin-top: 25px;
}
.numBoxli{
  position: relative;
  padding:8px 12px;
  box-sizing: border-box;
  flex: 1;
  margin-left:20px;
}
.numBoxli_a{
  margin-left: 0;
}
.numBoxli_tit{
  display: flex;
  align-items:center;
  font-size: 15px;
}
.numBoxli_tit img
{
  width: 15px;
  margin-right: 5px;
}
.numBoxli_cen{
  display: flex;
  align-items: center;
  justify-content: center;
}
.numBoxli::before{
  width: 3px;
  height: 100%;
  content: '';
  position: absolute;
  left: 0;
  top: 0
}
.numBoxli_a::before{
  background-color: #5C9EFF;
}
.numBoxli_b::before{
  background-color: #FF9933;
}
.numBoxli_c::before{
  background-color: #FF6666;
}
.numBoxli_d::before{
  background-color: #33CC99;
}
.numBoxli_e::before{
  background-color: #506adb;
}
.numBoxli_f::before{
  background-color: #ff6b3a;
}
.numBoxli_a .numBoxli_cenli_num span{
  color: #5C9EFF;
}
.numBoxli_b .numBoxli_cenli_num span{
  color: #FF9933;
}.numBoxli_c .numBoxli_cenli_num span{
  color: #FF6666;
}
.numBoxli_d .numBoxli_cenli_num span{
  color: #33CC99;
}
.numBoxli_e .numBoxli_cenli_num span{
  color: #506adb;
}
.numBoxli_f .numBoxli_cenli_num span{
  color: #ff6b3a;
}
.numBoxli_cenli{
  text-align: center;
      margin-top: 10%;
    margin-bottom: 8%;
}
.numBoxli_cenli_num{
  color: #FF6600;
  margin-bottom: 3px;
  font-size: 25px;
}
.numBoxli_cenli_num span{
  font-size: 25px;
  /* color: #FF6600; */
  margin: 0 5px;
  margin-bottom: 3px;
}
.numBoxli_cenli_{
  font-size: 10px;
  color: #999999;
}
@media screen and (min-width:1620px){
			.xiangbox
			{
        padding-bottom: 100px !important;
      }
      .xiangbox .xiangbox_cen{
        margin:auto; 
      }
     .xiangbox .rigbtn{
       display: none;
      }
      .xiangbox .xiangbox_cen{
        transform: translateX(0) !important;
      }
    }
    .leiboxli_div{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
.huoleft_cen{
  position:relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.huoleft_cen img{
  position:absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
}
._huoleft_cen_tit{
  position:absolute;
  bottom:0px;
  left: 0;
  width:100%;
  background-color: rgba(0,0,0,0.3);
  color: white;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: height;
  padding:5px 10px;
  box-sizing:border-box;
  padding-bottom: 35px;
}
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
  opacity: 0.8;
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
  cursor: pointer;
}
.xiangbox_cenli:hover
{
  box-shadow: 0 0 3px 2px #409EFF;
  box-shadow: 0 2px 4px 0 rgba(64,158,255,0.4), 0 0 6px 0 rgba(64,158,255,0.7);
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
margin-top: -5px;
-webkit-box-orient: vertical;
}
.xiangbox_cenli_cen_li{
   font-size: 13px;
  color: #666666;
  	overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp:3;
line-height: 20px;
letter-spacing:1px;
-webkit-box-orient: vertical;
margin-top: 5px;
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
  width: -moz-calc((100% - 100px)/6); 
	width: -webkit-calc((100% - 100px)/6);
	width: calc((100% - 100px)/6);
  margin-right:20px;
  /* box-shadow:0 0 5px 1px #ddd; */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  box-sizing: border-box;
  float: left;
  /* cursor: pointer; */
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
  cursor: pointer;
}
.leiboxli_name:hover
{
  text-shadow: 0 0 3px #ddd;
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
/* .tb{
  position: relative;
  height: -moz-calc(40vw - 40px); 
	height: -webkit-calc(40vw - 40px);
	 height: calc(40vw - 40px);
} */
/* tanbox */
.infobox{
  position: relative;
  padding: 0 50px;
  box-sizing: border-box;
  margin-top: -40px;
} 
.infobox .el-tabs__nav-scroll{
  overflow: initial;
}
.infobox .el-tabs__nav-wrap{
  overflow: initial;
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
  border: none;
  margin: 0;
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
.infobox .el-tabs__nav .is-top:hover{
    color: white !important;
   background-color: #96c0fd !important;
}
.infobox .el-tabs__nav .is-top::after{
  content: "";
  bottom: -8px;
  display: block;
  position:absolute;
  width:0;
  height:0;
  border-width:8px 8px 0;
  border-style:solid;
  border-color:#5c9eff transparent transparent;
  left: 0;
  margin-left: 50%;
  transform: translateX(-50%);
  transition: all .3s cubic-bezier(.645,.045,.355,1);
  opacity: 0;
}
.infobox .el-tabs__nav .is-active::after{
  opacity: 1;
}
.infobox .el-tabs--border-card .el-tabs__content{
  padding-top: 40px;
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
  cursor: pointer;
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
  line-height: 42px;
  min-width: 100%;
  cursor: pointer;

}
.huo_tabbox:hover .huo_tabbox_lef{
  color: #409EFF;
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
.huoleft .el-carousel{
  height: 250px !important;
}
.huoleft .el-carousel__container
{
  height: 200px !important;
}
.huoleft .el-carousel__indicators{
  bottom: 0;
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