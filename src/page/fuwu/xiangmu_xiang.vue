<template>
<div class="xiang pu-kong">
    <div class="HuiGe"></div>
    <div class="cen-width">
      <div class="YeLi">

      <span><router-link :to="{name:'FuWu'}">服务项目</router-link></span><i class="el-icon-arrow-left YeLi_i_on"></i><span class="YeLi_sp_on">项目详情</span>
    </div>
      <div class="YeCen">
        <div class='XiangBox'>
          <div class="XiangBoxcen">
            <div class='XiangBox_top'>
              <div class="XiangBox_toptit">项目信息</div>
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
              <div class="XiangBox_cen_li" v-for="(value, key) in dataXian_b">
                <div class='XiangBox_cen_li_name'>{{key}}：</div>
                <div class="XiangBox_cen_licen">{{value}}</div>
              </div>
            </div>
          </div>


          <div class="XiangBoxcen" v-if='deng_f'>
            <div class='XiangBox_top'>
              <div class="XiangBox_toptit">选择公司</div>
            </div>
            <div class="XiangBox_cen">
              <div class='gongsibox'>
                <div class='gongsiboxs'>
                  <div v-if='!gongsi'>暂无添加公司..</div>
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
        </div>

        <div class='XiangBox' v-if="jincheng">
          <div class="XiangBoxcen">
            <div class='XiangBox_top'>
              <div class="XiangBox_toptit">项目进程</div>
            </div>
            <div class="XiangBox_cen XiangBox_cen_jin">{{jincheng}}</div>
          </div>
        </div>
    <div class="xuangong" v-if='deng_f'>选择下单公司：{{xuan}}</div>
    <div class="tanbox" v-if='deng_f'>
      <div class="tanbox_li"><input type="text" placeholder="请填写联系人姓名" v-model="tanData.name"></div>
      <div class="tanbox_li"><input type="text" placeholder="请填写联系人电话" v-model="tanData.tel"></div>
    </div>
    <div class="btnbox">
          <div class="JBtn xiabtn BangBtn">
            <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=489261411&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:489261411:51" alt="点击咨询" title="点击咨询"/></a>

                我要帮助
            </div>
        <div class="JBtn xiabtn xiabtn_" @click="xiaFn" v-if='deng_f'>下单</div>
    </div>
            <div class="tishitext" v-if='!deng_f'>
              <router-link :to="{name:'Login',query:{'id':p_id,type:3}}" class='topcenli_sp'>登录</router-link>
              之后进行下单</div>
      </div>
    </div>
    <div class="HuiGe"></div>
  </div>
</template>

<script>
import Vue from 'vue'

  export default{
    data(){
      return{
        o_id:null,
        p_id:null,
        dataXian_c:{},
        dataXian_d:{},
        dataXian_b:{},
        jincheng:null,
        gongsi:null,
        gongsi_b:null,
        defaultImg:'this.src="' + require('../../assets/img/gongsimo.png') + '"',
        img_url:null,
        c_id:null,
        xuan_f:[],
        deng_f:false,
        xuan:"未选",
        tanData:{
          name:null,
          tel:null
        }
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
      that.Com.request({
            order_id:that.o_id
            },'login/index/loginJudge',function(res){
            if(res.result=='success' && that.$route.query.pid)
            {
              that.getGongSis();
              that.deng_f=true;
            }
          })
      let o_id=this.$route.query.oid;
      let p_id=this.$route.query.pid;
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
              Vue.set(that.dataXian_b,'备注',res.data[0].PS);
              that.jincheng=res.data[0].state_message;
              for(let i=0;i<res.data[0].key.length;i++)
              {
                if(res.data[0].value[i])
                {
                  that.dataXian_d[res.data[0].key[i]]=res.data[0].value[i]+res.data[0].unit_name[i];
                }
                else{
                  that.dataXian_d[res.data[0].key[i]]='无';
                }
              }
            }
          })
      }
      if(p_id)
      {
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
              Vue.set(that.dataXian_b,'备注',res.data[0].ps);
              for(let i=0;i<res.data[0].key.length;i++)
              {
                that.dataXian_d[res.data[0].key[i]]=res.data[0].value[i]+res.data[0].unit_name[i];
              }
            }
          })
      }
    },
    methods:{
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
                    // that.$router.push({name:'FuWu'})
                  }
                });
              }
            })
        }
      },
      // 获取公司数据
          getGongSis(){
            let that=this;
            that.gongsi_b=null;
            that.gongsi=null;
            this.Com.request('','customers/index/authenticationData',function(res){
              if(res.result=='success')
              {
                that.gongsi=res.allData;
                that.gongsi_b=res.uncertifiedData;
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
.xiabtn_{
  margin-left: 50px;
}
.btnbox{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.tishitext{
  text-align: center;
  font-size: 12px;
  color: #999;
  margin-top: 30px;
  cursor: default;
}
.tishitext a{
color: #3399ff;
font-size: 12px;
margin-left: 5px;
}
.tishitext a:hover{
  text-decoration: underline !important;
}
.xuangong{
  text-align: center;
}
.YeCen{
  padding-bottom: 50px;
}
.gongsili_on .gongsili_cen{
  background-color: #b2e0ff !important;
}
.xiabtn{
  margin-top: 30px;
}
.xiang{
  background-color: #f3f3f3;
}
.cen-width{
  background-color: white;
  min-height: 500px;
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