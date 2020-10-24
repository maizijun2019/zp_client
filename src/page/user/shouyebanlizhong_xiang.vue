<template>
  <div>
    <div class="YeLi" v-if='type==0'>

      <span><router-link :to="{name:'UserIndexBanZhong'}">首页</router-link></span><i class="el-icon-arrow-left"></i><span><router-link :to="{name:'UserIndexBanZhong'}">办理中项目</router-link></span><i class="el-icon-arrow-left YeLi_i_on"></i><span class="YeLi_sp_on">订单详情</span>
    </div>
    <div class="YeLi" v-if='type==1'>

      <span><router-link :to="{name:'UserIndexBanZhong'}">首页</router-link></span><i class="el-icon-arrow-left"></i><span><router-link :to="{name:'UserIndexDaiShen'}">待审核项目</router-link></span><i class="el-icon-arrow-left YeLi_i_on"></i><span class="YeLi_sp_on">订单详情</span>
    </div>
    <div class="YeLi" v-if='type==2'>

      <span><router-link :to="{name:'UserIndexBanZhong'}">首页</router-link></span><i class="el-icon-arrow-left"></i><span><router-link :to="{name:'UserIndexKeBan'}">可办理项目</router-link></span><i class="el-icon-arrow-left YeLi_i_on"></i><span class="YeLi_sp_on">订单详情</span>
    </div>
    <div class="YeLi" v-if='type==3'>

      <span><router-link :to="{name:'UserIndexBanZhong'}">首页</router-link></span><i class="el-icon-arrow-left"></i><span><router-link :to="{name:'UserIndexKePi'}">可匹配项目</router-link></span><i class="el-icon-arrow-left YeLi_i_on"></i><span class="YeLi_sp_on">订单详情</span>
    </div>
    <div class="YeLi" v-if='type==4'>

      <span><router-link :to="{name:'UserIndexBanZhong'}">首页</router-link></span><i class="el-icon-arrow-left"></i><span><router-link :to="{name:'UserIndexWanCheng'}">已完成项目</router-link></span><i class="el-icon-arrow-left YeLi_i_on"></i><span class="YeLi_sp_on">订单详情</span>
    </div>
    <div class='XiangBox'>
      <div class="XiangBoxcen">
        <div class='XiangBox_top'>
          <div class="XiangBox_toptit">订单信息</div>
        </div>
        <div class="XiangBox_cen">
          <div class="XiangBox_cen_li" v-for="(value, key) in dataXian_c">
            <div class='XiangBox_cen_li_name'>{{key}}：</div>
            <div class="XiangBox_cen_licen">{{value}}</div>
          </div>
          <div class="XiangBox_cen_li XiangBox_cen_li_d" v-for="(value, key) in dataXian_d">
            <div class='XiangBox_cen_li_name'>{{key}}：</div>
            <div class="XiangBox_cen_licen">{{value}}</div>
          </div>
<div class="XiangBox_cen_li XiangBox_cen_li_d" v-for="(value, key,index) in dataXian_d_">
            <div class='XiangBox_cen_li_name'>{{key}}：</div>
            <div class="XiangBox_cen_licen">{{value}} <span :class="dabiaoData['dabiaoF'][index]=='达标'?'datxt':'weidatxt'">{{dabiaoData['dabiaoF'][index]}}</span><i>{{dabiaoData['biaozhun'][index]}}</i></div>
            <div v-if="dabiaoData[index]==0">111</div>
          </div>
          <div class="XiangBox_cen_li" v-for="(value, key) in dataXian_b">
            <div class='XiangBox_cen_li_name'>{{key}}：</div>
            <div class="XiangBox_cen_licen">{{value}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class='XiangBox' v-if="jincheng">
      <div class="XiangBoxcen">
        <div class='XiangBox_top'>
          <div class="XiangBox_toptit">项目进程</div>
        </div>
        <!-- <div class="XiangBox_cen XiangBox_cen_jin">{{jincheng}}</div> -->
        <div class='XiangBox_cen'>
          <div class="LiuChengbox">
            <div class="LiuChengbox_li" v-if='liuData' v-for='item in liuData'>
              <div class="LiuChengbox_li_lef">
                <div class="LiuChengbox_li_lef_top">{{liuAll[item]}}</div>
                <div class="LiuChengbox_li_lef_bot" :class="item.approval_state==0?'LiuChengbox_li_lef_bot_red':''">{{item.proposal?'('+item.proposal+')':''}}</div>
              </div>
              <div class="LiuChengbox_li_rig">→</div>
            </div>
            <div class="LiuChengbox_li">
              <div class="LiuChengbox_li_lef">
                <div class="LiuChengbox_li_lef_top">{{jincheng}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class='XiangBox' v-if="p_id">
      <div class="XiangBoxcen">
        <div class='XiangBox_top'>
          <div class="XiangBox_toptit">选择公司</div>
          <div class='gongsibox'>
                <div class='gongsiboxs'>
                  <div class="gongsili" :class="xuan_f[index]?'gongsili_on':''" v-for='(item,index) in gongsi' @click="gongxuanFn(index,item.id)">
                    <div class="gongsili_cen">
                      <div class="gongsili_cen_top">
                        <div class="gongsili_centop_img"><img :src="img_url+item.logo_image_path" :onerror="defaultImg"></div>
                        <div class='gongsili_centop_cen'>
                          <div class="gongsili_centop_cen_name">{{item.enterprise_name}}</div>
                          <div class="gongsili_centop_cen_tel">电话：{{item.telephone}}</div>
                          <div class='gongsili_cen_bot'>所属行业：{{item.name}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>

      </div>
      <div></div>
    </div>
    <div class="xuangong" v-if="p_id">选择下单公司：{{xuan}}</div>
    <div class="tanbox" v-if='p_id'>
      <div class="tanbox_li"><input type="text" placeholder="请填写联系人姓名" v-model="tanData.name"></div>
      <div class="tanbox_li"><input type="text" placeholder="请填写联系人电话" v-model="tanData.tel"></div>
    </div>
      <div class="JBtn xiabtn" @click="xiaFn" v-if="p_id">下单</div>
  </div>
</template>

<script>
import Vue from 'vue'

  export default{
    data(){
      return{
        type:null,
        o_id:null,
        p_id:null,
        dataXian_c:{},
        dataXian_d:{},
        dataXian_b:{},
        dataXian_d_:{},
        jincheng:null,
        gongsi:null,
        xuan_f:[],
        xuan:"未选",
        img_url:null,
        defaultImg:'this.src="' + require('../../assets/img/gongsimo.png') + '"',
        liuData:null,//当前流程
        liuAll:null,//全部流程
        // order_sta:{
        //   1:'下单',
        //   2:'领导审批',
        //   1000:'驳回',
        //   3:'主管分配',
        //   4:'负责人撰写并提交',
        //   5:'主管审核',
        //   6:'领导审核',
        // }
        tanData:{
          name:null,
          tel:null
        },
        dabiaoData:{
          dabiaoF:[],
          biaozhun:[],
        },
      }
    },
    created(){
      let that=this;
      let o_id=this.$route.query.oid;
      let p_id=this.$route.query.pid;
      this.type=this.$route.query.type;
      this.img_url=this.gongCan.imgUrl;
      if(o_id)
      {
        that.o_id=that.$route.query.oid;
        that.Com.request({
            order_id:that.o_id
            },'personalCenter/Index/queryOrder',function(res){
            if(res.result=='success')
            {
              Vue.set(that.dataXian_c,'订单id',res.data[0].order_id);
              Vue.set(that.dataXian_c,'项目名称',res.data[0].title);
  
              Vue.set(that.dataXian_d,'下单时间',res.data[0].orderTime);
              that.dataXian_d['下单时间']=res.data[0].orderTime;
              that.dataXian_d['订单更新时间']=res.data[0].UpdateTime;
              Vue.set(that.dataXian_b,'备注',res.data[0].PS?res.data[0].ps:'无');
              that.jincheng=res.data[0].state_message;
              // that.dabiaoData=res.data[0].attribute;
              for(let i=0;i<res.data[0].key.length;i++)
              {
                that.dataXian_d_[res.data[0].key[i]]=res.data[0].value[i]+res.data[0].unit_name[i];
              }
              for(let i=0;i<res.data[0].key.length;i++)
              {
                if(res.data[0].attribute[i][3]==0)
                {
                  that.dabiaoData['dabiaoF'].push('未达标');
                }
                else{
                  that.dabiaoData['dabiaoF'].push('达标');
                }
                if(res.data[0].attribute[i][4])
                {
                  that.dabiaoData['biaozhun'].push('('+res.data[0].attribute[i][4]+'：'+res.data[0].attribute[i][5]+res.data[0].attribute[i][6]+')');
                }
                else{
                  res.data[0].attribute[i][4]=''
                }
              }
              that.Com.request({
                  order_id:res.data[0].order_id
                  },'orders/Orders/getFlowSteps',function(res){
                  if(res.result=='success')
                  {
                    that.liuData=res.steps[0].flows.split(',');
                    let alldata=res.flowsnames;
                    let liuAll_={};
                    for(let i=0;i<alldata.length;i++)
                    {
                      liuAll_[alldata[i].id]=alldata[i].name;
                    }
                    that.liuAll=liuAll_;
                  }
                })
            }
          })

      }
      if(p_id)
      {
        that.getGongSis();
        that.p_id=that.$route.query.pid;
        that.Com.request({
            pro_id:that.p_id
            },'personalCenter/Index/queryOrder',function(res){
            if(res.result=='success')
            {
              Vue.set(that.dataXian_c,'项目名称',res.data[0].name);
              Vue.set(that.dataXian_d,'地址',res.data[0].province+res.data[0].city+res.data[0].region);
              Vue.set(that.dataXian_d,'注册时间',res.data[0].ctime);
              Vue.set(that.dataXian_d,'行业',res.data[0].industryname);
              Vue.set(that.dataXian_d,'项目分类',res.data[0].type);
              Vue.set(that.dataXian_b,'备注',res.data[0].ps?res.data[0].ps:'无');
              for(let i=0;i<res.data[0].key.length;i++)
              {
                that.dataXian_d[res.data[0].key[i]]=res.data[0].value[i]+res.data[0].unit_name[i];
              }
            }
          })
      }
    },
    methods:{
      // 获取公司数据
          getGongSis(){
            let that=this;
            that.gongsi_b=null;
            that.gongsi=null;
            this.Com.request('','customers/index/authenticationData',function(res){
              if(res.result=='success')
              {
                that.gongsi=res.allData;
                for(var i=0;i<that.gongsi.length;i++)
                {
                  that.xuan_f[i]=false;
                }
              }
            })
          },
          // 选择公司
          gongxuanFn(index,id)
          {
            this.c_id=id;
            let that=this;
            if(this.xuan_f[index]==false)
            {
            for(var i=0;i<that.gongsi.length;i++)
                {
                  that.xuan_f[i]=false;
                }
              that.xuan_f[index]=true;
              that.xuan=that.gongsi[index].enterprise_name;
                Vue.set(that.xuan_f,index,true);
            }
            else{
            this.c_id=null;
              that.xuan_f[index]=false;
              that.xuan="未选";
                Vue.set(that.xuan_f,index,false);
            }
          },
          // 下单
      xiaFn(){
        let that=this;
        let c_id_=this.c_id;
        if(!c_id_)
        {
            that.$message({
                message: '请选择公司',
                type: 'error',
                duration:1500,
                onClose:function(){
                }
              });
        }
        else if(!that.tanData.name)
        {
            that.$message({
                message: '请填写联系人姓名',
                type: 'error',
                duration:1500,
                onClose:function(){
                }
              });
        }
        else if(!that.tanData.tel)
        {
            that.$message({
                message: '请填写联系人电话',
                type: 'error',
                duration:1500,
                onClose:function(){
                }
              });
        }
        else{
             that.Com.request({
              enterpriseid:c_id_,
              projectid:that.p_id,
              contact1:that.tanData.name,
              phone1:that.tanData.tel,
              },'orders/orders/placingOrder',function(res){
              if(res.result=='success')
              {
                that.$message({
                  message: '下单成功',
                  type: 'success',
                  duration:1500,
                  onClose:function(){
                    that.$router.go(-1);
                  }
                });
              }
            })
        }
      }
    },
    components:{

    }
  }
</script>

<style scoped>
.tanbox{
  position: relative;
  display:flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.tanbox_li input{
  position: relative;
      border: none;
    border: 1px solid #ddd;
    width: 250px;
    line-height: 30px;
    padding: 0 5px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 13px;
}
.tanbox_li:nth-child(2){
  margin-left: 50px;
}
/* -- */
.xuangong{
  text-align: center;
}
.LiuChengbox_li_lef_top{
  background-color: #b2e0ff;
  padding:4px 10px;
  font-size: 14px;
  margin-bottom: 5px;
}
.gongsili_on .gongsili_cen{
  background-color: #b2e0ff !important;
}
.xiabtn{
  margin: auto;
  margin-top: 50px;
}
.XiangBoxcen{
  position: relative;
  padding: 20px;
  box-sizing: border-box;
}
.XiangBox_top{
  border-bottom: 1px solid #ddd;
}
.XiangBox_toptit{
  background-color: #3399ff;
  color:white;
  font-size: 13px;
  text-align: center;
  line-height:28px;
  padding: 0 20px;
  padding-right: 25px;
  display: inline-block;
  position: relative;
  overflow: hidden;
}
.XiangBox_toptit::after
{
  background-color: white;
  content: '';
  position:absolute;
  right: 0;
  transform: rotate(45deg) translate(-25px,-20px);
  width: 3px;
  height: 100px;
}
.XiangBox_cen{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.XiangBox_cen_li{
  width: 100%;
  margin-top: 15px;
  display: flex;
  align-items: baseline;
}
.XiangBox_cen_li_name{
  color: #999999;
}
.XiangBox_cen_licen{
  color: #666666;
}
.XiangBox_cen_licen span{
  font-size: 12px;
  margin-left: 8px;
}
.XiangBox_cen_licen .datxt{
  color: #3399ff;
}
.XiangBox_cen_licen .weidatxt{
  color: red;
}
.XiangBox_cen_licen i{
  font-size: 12px;
  margin-left: 8px;
}
.XiangBox_cen_li_d{
  width: 50%;
}
.XiangBox_cen_jin{
  margin-top: 20px;
  font-size: 26px;
}
/* --- */
.gongsibox{
  flex: 1;
  width: 100%;
  overflow-y: scroll;
  min-width: 50px;
}
.gongsiboxs{
  display: flex;
  align-items: center;
}
.gongsili{
  margin-right: 20px;
  margin-bottom: 20px;
  margin-top: 10px;
  cursor: pointer;
}
.gongsili:hover .gongsili_cen
{
  box-shadow: 0 0 3px #b2e0ff;
  background-color: #b2e0ff !important;
}
.gongsili_cen{
  background-color: #e5f5ff;
  padding: 10px;
  box-sizing: border-box;
  width:250px;
}
.gongsili_cen_top{
  display: flex;
  align-items: center;
}
.gongsili_centop_img{
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.gongsili_centop_img img{
  width: 100%;
  height: 100%;
}
.gongsili_centop_cen div{
  font-size: 12px;
  color: #666666;
}
.gongsili_centop_cen_tel{
  margin-top: 5px;
  color: #888888;
}
.gongsili_cen_bot{
  font-size: 12px;
  color: #666666;
  margin-top: 5px;
}
</style>