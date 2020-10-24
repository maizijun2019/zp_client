<template>
  <div class="pipei pu-kong">
    <div class="HuiGe"></div>
    <div class="cen-width">
      <div class="YeLi">
         <router-link :to="{name:'FuWu'}" class="YeLi_li">服务项目</router-link>
        <i class="el-icon-arrow-left YeLi_i_on"></i>
        <router-link :to="{name:'PiPei'}" class="YeLi_li YeLi_i_on">精准匹配</router-link>
      </div>
      <div class="YeCen">
        <div class="YeDaLi"><div></div>快速匹配<span @click="xianFn('all')" v-if='!xian'>全部</span><span v-if='xian' @click="xianFn">收起</span></div>
        <div class="pi_gongs" :class="xian?'':'pi_gongs_on'">
          <div class="pi_gongs_li pi_gongs_li_a" v-for="(item,index) in gongsi"  v-if="gongsi" @click="gongxuanFn(index,item.industry,item.id)">
            <div class="pi_gongs_li_img"><img :src="img_url+item.logo_image_path" :onerror="defaultImg"></div>
            <div class="pi_gongs_li_name">{{item.enterprise_name}}</div>
          </div>
           <router-link :to="{name:'PiPeiAddGong'}" class="gongsibox_btn" v-if="!gongsi">添加公司</router-link>
        </div>
        <div v-loading="loading" class="pitian_cen">
          <div class="pitian" v-if="formData.c_id && !loading">
            <div class="TanBox">
              <div class="tantop">
                  <div class='tancen' :class="tancen_b_f?'tancen_b':''">
                    <div class="TanBox_li TanBox_li_fen TanBox_li_hang">
                              <div class="TanBox_li_lef">所属行业：</div>
                                <label class="TanBox_li_rig TanBox_li_rig_se">
                                  <el-select v-model="formData.h_id" filterable placeholder="请选择" @change='getTian($event)'>
                                    <el-option
                                      v-for="item in hangYeAll"
                                      :key="item.id"
                                      :label="item.name"
                                      :value="item.id">
                                    </el-option>
                                  </el-select>
                                </label>
                            </div>

                    <div class="TanBox_li" v-if='inData' v-for='(item,index) in inData'>
                      <div class="TanBox_li_lef">{{item.name}}：</div>
                      <label class="TanBox_li_rig TanBox_li_rig_se">
                          <input type="text" v-model="formData.inputIds[item.id]" class="in_in">
                        <div class="TanBox_li_rig_rig">{{item.unit_name}}</div>
                      </label>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="JBtn pibtn" v-if="formData.c_id && !loading" @click="pipeiFn">开始匹配</div>
        </div>
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
        xian:false,
        gongsi:null,
        img_url:null,
        defaultImg:'this.src="' + require('../../assets/img/gongsimo.png') + '"',
        gongData:null,
        inData:null,
        
        formData:{
          h_id:null,
          c_id:null,
          inputIds:{},
        },
        inData:null,
        tancen_b_f:false,
        h_id_yi:{
          name:null,
          id:null
        },
        gai_h_id:null,
        hangYeAll:[],
        loading:false
      }
    },
    created(){
      let that=this;
      this.img_url=this.gongCan.imgUrl;
      this.getGongSis();
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
      // 收起展开公司
      xianFn(f)
      {
        let that=this;
        if(f=='all')
        {
          that.xian=true;
        }
        else{
          that.xian=false;
        }
      },
      // 获取公司数据
          getGongSis(){
            let that=this;
            that.gongsi=null;
            this.Com.request('','customers/index/authenticationData',function(res){
              if(res.result=='success')
              {
                that.gongsi=res.allData;
              }
            })
          },
          // 选择公司
          gongxuanFn(index,hid,cid){
            let that=this;
            that.loading=true;
            $(".pi_gongs_li").removeClass("pi_gongs_li_on");
            $(".pi_gongs_li").eq(index).addClass("pi_gongs_li_on");
            
            let h_id=hid;
            this.formData.c_id=cid;
            this.formData.h_id=h_id;
            this.h_id_yi.id=h_id;
            this.getHang();
            this.getTian(h_id);
          },
          // 开始匹配
          pipeiFn(){
            let that=this;
            this.Com.request({
              enterprise_id:that.formData.c_id,
              industry_id:that.formData.h_id,
              propertyid:that.formData.inputIds
            },'orders/Orders/intelligentMatching',function(res){
              if(res.reuslt=='success')
              {
                 that.$router.push({name:'PiPeiJieGuo',query:{'code':res.code}})
              }
            })
          },

           querySearch(queryString, cb) {
        // var restaurants = this.hangYeAll
        // let yous=this.hangYeAll
        // var data=[];
        // var that=this;
        // if(that.formData.hangye){
        //   for(let i=0;i<yous.length;i++)
        //   {
        //     data[i]={"value":hangYeAll.}
        //   }
        // }
        cb(data);
      },
      handleSelect(res)
      {
      },
      // 获取行业
      getHang(){
        let that=this;
        this.Com.request({
          },'customers/index/getIndustry',function(res){
          if(res.result=='success')
          {
            that.hangYeAll=res.data;
          }
        })
      },
      //获取填写资料
      getTian(hid){
        let that=this;
        let hid_=hid;
        $("input").val('');
        this.Com.request({industry_id:parseInt(hid)},'customers/index/getAuthenticationDataFillIn',function(res){
          if(res.result=='success')
          {
            let data_=res.data;
            that.formData.h_id=res.industry_id;
            that.h_id_yi.name=res.industry;
            that.inData=res.data;
            if(data_>5)
            {
              that.tancen_b_f=true;
            }
            that.formData.inputIds={};
            for(let i=0;i<data_.length;i++)
            {
              that.formData.inputIds[data_[i].id]=null;
              if(i==data_.length-1 && hid_==that.h_id_yi.id)
              {
                that.Com.request({
                    id:that.formData.c_id
                    },'customers/index/getCompanyInfo',function(res){
                    if(res.result=='success')
                    {
                      let data_=res.data;
                      for(let i=0;i<data_.length;i++)
                      {
                        Vue.set(that.formData.inputIds,data_[i].id, data_[i].value);
                        $(".in_in").eq(i).val(data_[i].value);
                        // that.formData.inputIds[data_[i].id]=data_[i].value;
                      }
                    }
                })
              }
            }
            that.loading=false;
          }
        });
      }
    },
    components:{

    }
  }
</script>

<style scoped>
.pitian_cen{
  min-height: 350px;
}
.gongsibox_btn{
    text-align: center;
    cursor: pointer;
    background-color: #e5f5ff;
    color: #3366ff;
    width: 90px;
    height: 35px;
    margin-top: 20px;
    line-height: 35px;
    display: block;
}
.pibtn{
  margin: auto;
  margin-top: 50px;
}
/* TanBox */
.topbox a{
  color: #3399ff;
}
.tancen_b{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.tancen_li{
  display: inline-block;
  width: 50%;
  min-height: 350px;
}
.TanBox_li{
  display: flex;
  width: 300px;
  align-items: center;
  margin: auto;
  margin-top: 15px;
}
.TanBox_li_lef{
  font-size: 12px;
  color: #888888;
  margin-right: 15px;
  min-width:60px;
}
.TanBox_li_rig{
  display: flex;
  align-items: center;
  flex: 1;
  height: 30px;
  border: 2px solid #f3f3f3;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}
.TanBox_li_rig select ,.TanBox_li_rig input{
  border: none;
  flex: 1;
  padding: 0 10px;
  box-sizing: border-box;
  min-width: 20px;
}
.TanBox_li_rig_rig{
  background-color: #f3f3f3;
  z-index: 5;
  height: 30px;
  text-align: center;
  line-height: 30px;
  padding: 0 10px;
  white-space:nowrap;
  box-sizing: border-box;
  	-webkit-user-select:none;
		   -moz-user-select:none;
		   -ms-user-select:none;
		   user-select:none;
}
.TanBox_li_rig_se{
  position: relative;
}
.TanBox_li_rig_se select{
  position:absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 10;
}
/* tancen_li */
.tancen{
  padding: 0 12px;
  box-sizing: border-box;
  text-align: center;
}
/* ---- */
.pitian .TanBox_li_rig{
  max-width: 200px;
}
.cen-width{
  background-color: white;
  min-height: 500px;
  min-height: 600px;
}
.pipei{
  background-color: #f3f3f3;
}
.YeCen{
  padding:15px 20px;
  padding-bottom: 50px;
  box-sizing: border-box;
}
.YeDaLi{
  display:flex;
  color: #333333;
  font-size: 15px;
  font-weight: bold;
  align-items: center;
  position: relative;
}
.YeDaLi div{
  width: 3px;
  height: 15px;
  background-color: #333333;
  margin-right:20px;
}
.YeDaLi span{
  position:absolute;
  right: 0;
  font-weight: normal !important;
  color: #3399ff;
  cursor: pointer;
}
.YeDaLi span:hover
{
  text-decoration: underline;
}
.pi_gongs{
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  box-sizing:border-box;
  padding-bottom: 20px;
  flex-wrap: wrap;
}
.pi_gongs_on{
  height: 90px;
  overflow: hidden;
}
.pi_gongs_li{
  display: flex;
  align-items:flex-end;
  background-color: #e5f5ff;
  width:250px;
  flex-wrap: nowrap;
  margin-right: 10px;
  margin-top: 20px;
  cursor: pointer;
}
.pi_gongs_li_on{
  background-color: #b2e0ff !important;
}
.pi_gongs_li:hover{
  background-color: #b2e0ff !important;
}
.pi_gongs_li_img{
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.pi_gongs_li_img img{
  width: 100%;
  height: 100%;
}
.pi_gongs_li_name{
  flex: 1;
  color:#666666;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space:nowrap;
  padding-bottom: 5px;
  box-sizing: border-box;
}
</style>