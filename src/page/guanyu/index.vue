<template>
  <div class="guanyuwomen">
    <div class="cen-width pu-kong qitaye">
      <div class="cenbox">
        <div class="cen_left pu-ying">
          <div class="cen_left_tit"><img src="@/assets/img/left-bg.png"><span></span>关于我们</div>

          <div class="cen_left_li" v-if='fenlists' v-for='(item,index) in fenlists' @click="liFn(item.id,index)" :class="li_index==index?'cen_left_li_on':''">{{item.type}}</div>

          <!-- <div class="cen_left_li" @click="liFn(0)" :class="li_index==0?'cen_left_li_on':''">企业介绍</div>
          <div class="cen_left_li" @click="liFn(1)" :class="li_index==1?'cen_left_li_on':''">联系我们</div> -->
        </div>
        <div class="cen_right">
          <!-- <div class='cen_right_li pu-ying' :class="li_index==0?'cen_right_li_on':''">
            <div class="cen_right_li_">浙江中普科技咨询有限公司，成立于2005年，是国家工信部两化融合管理体系贯标咨询服务机构、企业知识产权管理规范贯标辅导机构、国家知识产权局专利代理机构、国家工商总局备案代理机构，温州市重点科技中介服务机构、温州市软件行业协会副会长单位、温州市中小企业服务机构理事单位，温州市高新技术企业协会会员单位。</div>
            <div class="cen_right_li_">公司现有中高级工程师、专利工程师、专利代理人、中高级会计师、农民技师等中高级专业人才50余人，拥有一支长期从事知识产权服务、科技项目服务与法务维权服务等工作的专业代理人队伍。  公司内设“五部一中心”，分别为办公室、商标部、专利部、商务部、项目部、政策研究中心。近年来，公司在工商代理、知识产权、工业发展、科技项目、成果转化、技术转移、人才引进、创新基金、火炬计划、研究中心、研究院、示范企业、高新技术企业、可研报告、法务维权等方面等积累了丰富的经验，先后为温州中小企业提供各类服务项目5000余件，为企业提供咨询3万多次。“专业诚信、务实创新”的理念为企业获得到了更多的发展机会，获得客户的一致好评。 公司与复旦大学、浙江大学、温州大学、浙江工贸职业技术学院、温州科技职业学院、温职业技术学院、北航温州研究院等高等院校建立了良好合作关系。公司负责人翁晓燕女士被聘为温州知识产权学院优秀企业指导师。</div>
            <div class="cen_right_li_">浙江中普，与您建立合作关系的那一刻起，将自动成为您永久的服务咨询顾问。您成功路上，有我更精彩！</div>
          </div>

          <div class='cen_right_li pu-ying' :class="li_index==1?'cen_right_li_on':''">
            <div class="cen_right_li_map"></div>
            <div class="cen_right_li_">地址：温州高新技术产业开发区</div>
            <div class="cen_right_li_">联系电话：0577-89887858</div>
            <div class="cen_right_li_">手机：13185856868</div>
            <div class="cen_right_li_">邮箱：1804028393@qq.com</div>
          </div> -->

          <div class='cen_right_li pu-ying cen_right_li_on'>
            {{dataCon}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        li_index:0,
        dataCon:null,
        fenlists:null
      }
    },
    created(){
      let that=this;
      that.Com.request('','homePage/index/aboutUs',function(res){
        that.fenlists=res.data;
        that.liFn(res.data[0].id,0);
      })
    },
    methods:{
      // liFn(index)
      // {
      //   this.li_index=index;
      // }
      liFn(id,index)
      {
        let that=this;
        this.li_index=index;
        that.Com.request({
          id:id
        },'homePage/index/aboutUsType',function(res){
          that.dataCon=res.data[0].text;
        })
      }
    },
    components:{

    }
  }
</script>

<style scoped>
.cen_right_li_{
  margin-top: 20px;
  font-size: 14px;
  text-indent:30px;
  line-height: 25px;
  letter-spacing:1px;
}
.cen_right_li_:nth-child(1)
{
  margin-top: 0 !important;
}
.cen_right_li_map{
  width: 100%;
  height: 400px;
  background-color: red;
}
.cenbox,.cen_right_li{
  min-height: 600px;
}
</style>