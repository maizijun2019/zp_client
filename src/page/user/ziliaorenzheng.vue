<template>
    <div>
      <div class="YeCen">
        <div class="YeDaLi"><span></span>选择公司
        <div class="zhuli zhuli_on"><i></i>已填写资料</div>
        <div class="zhuli"><i></i>未填写资料</div>
        </div>
        <div class="pi_gongs">
          <div class="pi_gongs_li" v-for='item in gongData_yitian'>
            <div class="pi_gongs_li_img" @click="gongDianFn(item.enterprise_id,item.industry_id)">
              <img :src="img_url+item.logo_path" :onerror="defaultImg">
            </div>
             <div class="pi_gongs_li_cen" @click="gongDianFn(item.enterprise_id,item.industry_id)">
               <div>{{item.enterprise_name}}</div>
              <div class="pi_gongs_li_name">{{item.name}}</div>
            </div>
          </div>
          <div class="pi_gongs_li pi_gongs_li_w" v-for='item in gongData_weitian'>
            <div class="pi_gongs_li_img"  @click="gongDianFn(item.enterprise_id,item.industry_id)"><img :src="img_url+item.logo_path" :onerror="defaultImg"></div>
            <div class="pi_gongs_li_cen"  @click="gongDianFn(item.enterprise_id,item.industry_id)">
               <div>{{item.enterprise_name}}</div>
              <div class="pi_gongs_li_name">{{item.name}}</div>
            </div>
          </div>
        </div>
        <div class="zanwu" v-if='zanwu_f'>暂无公司..</div>
        <router-link :to="{name:'UserAddGongSi'}" class='JBtn addbtn'>添加公司</router-link>
      </div>
      </div>
</template>

<script>
  export default{
    data(){
      return{
        tanData:{
          hangye:''
        },
        gongData_yitian:null,
        gongData_weitian:null,
        img_url:null,
        defaultImg:'this.src="' + require('../../assets/img/gongsimo.png') + '"',
        zanwu_f:false
      }
    },
    created(){
      let that=this;
      this.img_url=this.gongCan.imgUrl;
      this.Com.request({
              page:1,
              sum:999999
            },'enterprise/listArray',function(res){
        if(res.error_code==0)
        {
          // that.gongData_weitian=res.uncertifiedData;
          // that.gongData_yitian=res.authenticationData;
                let data_=res.data.list;
          that.zanwu_f=false;
          let gongsi_=[];
          let gongsi_b_=[];
          for(let i=0;i<data_.length;i++)
                {
                  if(data_[i].attributes_value)
                  {
                    let len_=gongsi_.length;
                    gongsi_[len_]=data_[i]
                  }
                  else{
                    let len_=gongsi_b_.length;
                    gongsi_b_[len_]=data_[i]
                  }
                  if(i==data_.length-1){
                    that.gongData_yitian=gongsi_;
                    that.gongData_weitian=gongsi_b_;
                  }
                }
        }
        else{
          that.zanwu_f=true;
        }
      })
    },
    methods:{
      // 公司点击
      gongDianFn(c_id,h_id)
      {
this.$router.push({name:'UserZiLiaoRenTian',query:{'c_id':c_id,'h_id':h_id}})
      }
    },
    components:{

    }
  }
</script>

<style scoped>
.zanwu{
  text-align: center;
  color: #999999;
}
.addbtn{
  position:absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
}
.zhuli{
  display: flex;
  align-items: flex-end;
  color: #888888;
  font-size: 12px;
  font-weight: normal !important;
  margin-left: 25px;
}
.zhuli i{
  width: 15px;
  height: 15px;
  margin-right: 10px;
  display: block;
  background-color: #ffe5e5;
}
.zhuli_on i
{
  background-color: #e5f5ff !important;
}
.YeCen{
  padding:15px 10px;
  position: relative;
  height: 615px;
  box-sizing: border-box;
}
.YeDaLi{
  display:flex;
  color: #333333;
  font-size: 15px;
  font-weight: bold;
  align-items: center;
  padding: 0 10px;
  box-sizing:border-box;
}
.YeDaLi span{
  width: 3px;
  height: 15px;
  background-color: #333333;
  margin-right:10px;
}
.pi_gongs{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-height: 370px;
  overflow-y: scroll;
  margin-top: 20px;
}
.pi_gongs_li{
  display: flex;
  align-items:flex-end;
  background-color: #e5f5ff;
  width:260px;
  flex-wrap: nowrap;
  margin:0 10px;
  margin-bottom: 20px;
  cursor: pointer;
}
.pi_gongs_li:hover
{
  background-color: #b2e0ff !important;
}
.pi_gongs_li_w{
  background-color: #ffe5e5 !important;
}
.pi_gongs_li_w:hover{
  background-color: #ffc0c0 !important;
}
.pi_gongs_li_img{
  width:55px;
  height: 55px;
  margin-right: 10px;
}
.pi_gongs_li_img img{
  width: 100%;
  height: 100%;
}
.pi_gongs_li_name{
  color:#666666;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space:nowrap;
  padding-bottom: 5px;
  box-sizing: border-box;
  margin-top: 10px;
}
.pi_gongs_li_cen{
  flex: 1;
  height: 55px;
  display: flex;
  flex-direction:column;
  justify-content:flex-end;
}
::-webkit-scrollbar  
{  
    width:10px;  
    height:10px;  
    background-color: #F5F5F5;  
}  
</style>