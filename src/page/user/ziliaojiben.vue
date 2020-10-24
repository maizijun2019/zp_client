<template>
  <div class="ziliaojiben">
    <div class="tabcen">
      <div class='tabcen_li'>
        <div class="tabcen_li_name">联系人：</div><input type="text" v-model="formData.nickname"><span class='tabcen_li_cuo'></span>
      </div>
      <!-- <div class='tabcen_li'>
        <div class="tabcen_li_name">手机：</div><input type="text" @blur="phoneFn" v-model="formData.phone"><span class='tabcen_li_cuo' v-if="cuoData.name=='phone'">{{cuoData.tishi}}</span>
      </div> -->
      <!-- <div class='tabcen_li'>
        <div class="tabcen_li_name">个人固话：</div><input type="text" v-model="formData.telephone"><span class='tabcen_li_cuo'></span>
      </div> -->
      <div class='tabcen_li'>
        <div class="tabcen_li_name">邮箱：</div>
        <el-autocomplete
      class="inline-input"
      v-model="formData.email_account"
      :fetch-suggestions="querySearch"
      placeholder="请输入邮箱"
      @select="handleSelect" 
    ></el-autocomplete>
    <span class='tabcen_li_cuo'></span>
      </div>
      <div class='tabcen_li'>
        <div class="tabcen_li_name">微信：</div><input placeholder="请输入微信号" type="text" v-model="formData.wechat_account"><span class='tabcen_li_cuo'></span>
      </div>
      <div class='tabcen_li tabcen_li_gong'>
        <div class="tabcen_li_name">公司：</div>
        <div class='gongsibox'>
          <div class='gongsiboxs'>
            <div class="gongsili" v-for='item in gongsi'>
              <div class="gongsili_cen">
                <div class="gongsili_cen_top">
                  <div class="gongsili_centop_img"><img :src="img_url+item.logo_image_path" :onerror="defaultImg"></div>
                  <div class='gongsili_centop_cen'>
                    <div class="gongsili_centop_cen_name">{{item.enterprise_name}}</div>
                    <div class="gongsili_centop_cen_tel">电话：{{item.fixed_telephone}}</div>
                  </div>
                </div>
                <div class='gongsili_cen_bot' v-for='itemb in hangYeAll' v-if="itemb.industry_id==item.industry_id">所属行业：{{itemb.industry_name}}</div>
              </div>
              <div class="gongsili_cao">
                <div class='gongsili_cao_'>
                  <div class='gongsili_cao_li gongsili_cao_li_ gongsili_cao_li_b' @click="shanFn(item.enterprise_id)">删除</div>
                </div>
                <div class='gongsili_cao_'>
                  <router-link :to="{name:'UserEditGongSi',query:{'id':item.enterprise_id}}" class='gongsili_cao_li gongsili_cao_li_ gongsili_cao_li_c'>编辑</router-link>
                </div>
                <div class='gongsili_cao_' v-if="item.attributes_value==false">
                  <!-- <router-link :to="{name:'UserEditGongSi',query:{'id':item.id}}" class='gongsili_cao_li gongsili_cao_li_ gongsili_cao_li_d'>认证</router-link> -->
                  <div class='gongsili_cao_li gongsili_cao_li_ gongsili_cao_li_d' @click="gongDianFn(item.enterprise_id,item.industry_id)">认证</div>
                </div>
              </div>
            </div>

            <!-- <div class="gongsili" v-for='item in gongsi_b'>
              <div class="gongsili_cen">
                <div class="gongsili_cen_top">
                  <div class="gongsili_centop_img"><img :src="img_url+item.logo_image_path" :onerror="defaultImg"></div>
                  <div class='gongsili_centop_cen'>
                    <div class="gongsili_centop_cen_name">{{item.enterprise_name}}</div>
                    <div class="gongsili_centop_cen_tel">电话：{{item.fixed_telephone}}</div>
                  </div>
                </div>
                    <div class='gongsili_cen_bot' v-for='itemb in hangYeAll' v-if="itemb.industry_id==item.industry_id">所属行业：{{itemb.industry_name}}</div>
              </div>
              <div class="gongsili_cao">
                <div class='gongsili_cao_'>
                  <div class='gongsili_cao_li gongsili_cao_li_ gongsili_cao_li_b' @click="shanFn(item.id)">删除</div>
                </div>
                <div class='gongsili_cao_'>
                  <router-link :to="{name:'UserEditGongSi',query:{'id':item.id}}" class='gongsili_cao_li gongsili_cao_li_ gongsili_cao_li_c'>编辑</router-link>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
        <div class="addbox">
          <router-link :to="{name:'UserAddGongSi'}" class='gongsibox_btn' :class="!gongsi && !gongsi?'gongsibox_btn_b':''">添加公司</router-link>
        </div>
      <div class='JBtn tibtn' @click="tiFn">确定提交</div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        youxiangs:['@qq.com','@sina.com','@gmail.com','@yahoo.com','@msn.com','@hotmail.com','@aol.com','@ask.com','@live.com','@0355.net','@163.com','@163.net','@3721.net'],
        formData:{
          email_account:null,
          phone:null,
          nickname:null,
          telephone:null,
          wechat_account:null,
          enterprises:null
        },
        cuoData:{
          name:null,
          tishi:null
        },
        gongsi:null,
        gongsi_b:null,
        defaultImg:'this.src="' + require('../../assets/img/gongsimo.png') + '"',
        gong_f:true,
        ziliao:null,
        hangYeAll:null
      }
    },
    created(){
      let that=this;
      this.img_url=this.gongCan.imgUrl;
      this.getGongSis();
      this.getZiLiaoFn();
    },
    methods:{
      gongDianFn(c_id,h_id)
      {
        this.$router.push({name:'UserZiLiaoRenTian',query:{'c_id':c_id,'h_id':h_id}})
      },
      // 手机验证
      phoneFn(){
        let that=this;
        let phone_=this.formData.phone
        if((!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone_)) || phone_.length!=11) && phone_){ 
          that.cuoData.name='phone';
          that.cuoData.tishi='*请输入正确的手机号';
        } 
        else{
          that.cuoData.name='';
        }
      },
      // 提交
      tiFn(){
        let that=this;
        if(!that.cuoData.name)
        {
          that.Com.request(that.formData,'consumer/editInfo',function(res){
              if(res.error_code==0)
              {
                that.$message({
                  message: '修改成功',
                  type: 'success',
                  duration:1500,
                });
                that.getZiLiaoFn();
              }
              else{
                that.$message({
                  message:res.error_message,
                  duration:1500,
                  type: 'error',
                });
              }
            })
        }
      },
      caoFn(num)
      {
        this.cao_index=num;
      },
      querySearch(queryString, cb) {
        var that=this;
        var restaurants = this.youxiangs
        let yous=this.youxiangs
        var data=[];

        if(that.formData.email_account){
          for(let i=0;i<yous.length;i++)
          {
            data[i]={"value":that.formData.email_account+yous[i]}
          }
        }
        cb(data);
      },
      handleSelect(res)
      {
      },
      // 删除公司
          shanFn(id){
            let that=this;

             that.$confirm('确定删除该公司？', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
              }).then(() => {
                  that.Com.request({
                    enterprise_id:id,
                    rm_state:1
                  },'customers/index/editEnterpriseInfo',function(res){
                    if(res.error_code==0)
                    {
                      that.$message({
                        message: '删除成功',
                        type: 'success',
                        duration:1500,
                        onClose:function(){
                          that.getGongSis()
                        }
                      });
                    }
                  })
              }).catch(() => {
              });
          },
          // 获取公司数据
          getGongSis(){
            let that=this;
            let gongsi_b_=[];//未认证
            let gongsi_=[];//认证
            this.Com.request({}, "industry/listArray", function(res) {
              if (res.error_code == 0) {
                that.hangYeAll = res.data;
              }
            });
            this.Com.request({
              page:1,
              sum:999999
            },'enterprise/listArray',function(res){
              if(res.error_code==0)
              {
                let data_=res.data.list;
                     that.gongsi=data_;
                // for(let i=0;i<data_.length;i++)
                // {
                //   if(data_[i].attribute_value)
                //   {
                //     let len_=gongsi_.length;
                //     gongsi_[len_]=data_[i]
                //   }
                //   else{
                //     let len_=gongsi_b_.length;
                //     gongsi_b_[len_]=data_[i]
                //   }
                //   if(i==data_.length-1){
                //     that.gongsi=gongsi_;
                //     that.gongsi_b=gongsi_b_;
                //   }
                // }
              }
            })
          },
          // 获取以前填的资料
          getZiLiaoFn(){
            let that=this;
            this.Com.request('','consumer/info',function(res){
              if(res.error_code==0)
              {
                that.formData=res.data;
              }
            })
          }
    },
    components:{

    },
    watch: {
      //获取公司
      
    },
  }
</script>

<style scoped>
.gongsibox_btn_b{
  margin-top: -20px !important;
}
.addbox{
  margin-left: 80px;
}
.tibtn{
  margin: auto;
  margin-top:60px;
}
.gongsili_on{
  background-color: red !important;
}
.tabcen{
  padding: 20px;
  box-sizing: border-box;
}
.tabcen_li{
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.tabcen_li:nth-child(1)
{
  margin-top: 0 !important;
}
.tabcen_li_name{
  width: 80px;
  font-size: 13px;
  color: #888888;
  text-align: right;
}
.tabcen_li input
{
  border: none;
  border: 1px solid #ddd;
  width: 250px;
  line-height: 30px;
  padding: 0 5px;
  box-sizing: border-box;
  font-size: 13px;
}
.el-input{
  height: 30px;
}
.inline-input{
  width: 250px;
  height: 30px;
}
.tabcen_li .el-input__inner{
  border: none;
  border: 1px solid #ddd;
  width: 250px;
  line-height: 30px  !important;
  padding: 0 5px;
  box-sizing: border-box;
  font-size: 13px;
  background-color: red !important;
}
.tabcen_li_cuo{
  color: #ff3333;
  margin-left: 10px;
  font-size: 13px;
}
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
.gongsili_cao{
  display: flex;
  align-items:center;
}
.gongsili_cao_{
  display: flex;
  width: 60px;
  align-items:center;
}
.gongsili_cao_li{
  border-radius: 50%;
  width: 23px;
  height: 23px;
  cursor: pointer;
  color: white;
  text-align: center;
  margin-left: 20px;
  line-height: 23px;
  margin-top: 10px;
  border: 1px solid white;
}
.gongsili_cao_li:nth-child(1)
{
  margin-left: 0 !important;
}
/* .gongsili_cao_li:hover
{
  box-shadow: 0 0 2px #ffffff inset, 0 0 2px 0 #cccccc;
  border: 1px solid #ddd;
} */
.gongsili_cao_li_b{
  font-weight: bold;
  background-color: #ff9999;
}

.gongsili_cao_li_c{
  background-color: #7f80fe;
}
.gongsili_cao_li_d{
  background-color: #50a8ff;
}
.tabcen_li_gong{
  align-items: flex-start !important;
}
.gongsili_cao_li_b:hover{
  box-shadow: 1px 2px 3px -1px #ddd, 0 0 10px 1px #f56464 inset;
}
.gongsili_cao_li_c:hover{
  box-shadow: 1px 2px 3px -1px #ddd, 0 0 10px 1px #3335f5 inset;
}
.gongsili_cao_li_d:hover{
  box-shadow: 1px 2px 3px -1px #ddd, 0 0 10px 1px #4a4df8 inset;
}
.tabcen_li_gong .tabcen_li_name{
  padding-top: 4px;
  box-sizing: border-box;
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
  display:block;
}
.gongsibox_btn:hover
{
  box-shadow: 0 0 20px -5px #2eaefd inset, 0 0 3px #ddd;
}
.gongsili_cao_li_{
  width: auto !important;
  border-radius: 20px !important;
  height: 23px;
  line-height: 23px;
  width: 50px !important;
  font-weight: normal !important;
}
</style>