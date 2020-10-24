<template>
   <div class="ziliaotab">
     <div class="topbox">
       <div @click="fanFn()"><span class="el-icon-arrow-left"></span><i>返回上级</i></div>
      <!-- <router-link :to="{name:'UserZiLiaoRen'}"><span class="el-icon-arrow-left"></span><i>返回上级</i></router-link> -->
     </div>
    <div class='tancen' :class="tancen_b_f?'tancen_b':''">
        <!-- <div class="TanBox_li TanBox_li_fen TanBox_li_hang">
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
                </div> -->

        <div class="TanBox_li" v-if='inData' v-for='(item,index) in inData'>
          <div class="TanBox_li_lef">{{item.attribute_name}}：</div>
          <label class="TanBox_li_rig TanBox_li_rig_se">
              <input type="text" v-model="formData.inputIds[item.project_attribute_id]" class="in_in">
            <div class="TanBox_li_rig_rig">{{item.company}}</div>
          </label>
        </div>
    </div>
    <div class="JBtn addbtn" @click="addFn">确认</div>
  </div>
</template>
 
<script>
import Vue from 'vue'
  export default{
    data(){
      return{
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
        fromlu:''
      }
    },
    created(){
      let h_id=this.$route.query.h_id;
      this.formData.c_id=this.$route.query.c_id;
      this.formData.h_id=h_id;
      this.h_id_yi.id=h_id;
      let that=this;
      this.getHang();
      this.getTian(this.$route.query.c_id);
    },
     beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.fromlu = from.name;
      })
    },
    methods:{
      fanFn(){
        console.log(this.$route);
        if(this.fromlu)
        {
          this.$router.go(-1);
        }
        else{
          this.$router.push({ name: "UserZiLiaoRen" });
        }
      },
       querySearch(queryString, cb) {
        cb(data);
      },
      handleSelect(res)
      {
      },
      // 确定添加
      addFn(){  
        let that=this;
        // let h_id_=that.formData.h_id;
        // if(h_id_==that.$route.query.h_id)
        // {
        //   h_id_=0;
        // }
        this.Com.request({
          // industry:h_id_,
          attribute:that.formData.inputIds,
          enterprise_id:this.formData.c_id
          },'enterprise/editAttribute',function(res){
          if(res.error_code==0)
          {
            that.$message({
                message: '填写成功',
                type: 'success',
                duration:1500,
                onClose:function(){
                  that.$router.push({name:'UserZiLiaoRen'})
                }
            });
          }
          else{
                      that.$message({
                  message:res.error_message,
                  duration:1500,
                  type: 'error',
                });
          }
        })
      },
      // 获取行业
      getHang(){
        let that=this;
        this.Com.request({
          },'industry/listArray',function(res){
          if(res.error_code==0)
          {
            that.hangYeAll=res.data;
          }
        })
      },
      //获取填写资料
      getTian(hid){
        let that=this;
        let hid_=hid;
        $("input").val('')
        this.Com.request({enterprise_id:parseInt(hid)},'enterprise/attribute',function(res){
          if(res.error_code==0)
          {
            let data_=res.data;
            // that.formData.h_id=res.industry_id;
            // that.h_id_yi.name=res.industry;
            that.inData=res.data;
            if(data_>5)
            {
              that.tancen_b_f=true;
            }
            let inputIds_={};
            for(let i=0;i<data_.length;i++)
            {
              inputIds_[data_[i].project_attribute_id]=data_[i].value;
              if(i==data_.length-1)
              {
                that.formData.inputIds=inputIds_;
                // that.Com.request({
                //     id:that.formData.c_id
                //     },'customers/index/getCompanyInfo',function(res){
                //     if(res.error_code==0)
                //     {
                //       let data_=res.data;
                //       for(let i=0;i<data_.length;i++)
                //       {
                //         Vue.set(that.formData.inputIds,data_[i].id, data_[i].value);
                //         $(".in_in").eq(i).val(data_[i].value);
                //         // that.formData.inputIds[data_[i].id]=data_[i].value;
                //       }
                //     }
                // })
              }
            }
          }
        });
      }
    },
    components:{

    }
  }
</script>

<style scoped>
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
.addbtn{
}
</style>