<template>
  <div class="wufuadd pu-kong">
    <div class="HuiGe"></div>
    <div class="cen-width">
      <div class="YeLi">
        <router-link :to="{name:'FuWu'}" class="YeLi_li">服务项目</router-link>
        <i class="el-icon-arrow-left"></i>
        <router-link :to="{name:'PiPei'}" class="YeLi_li">精准匹配</router-link>
        <i class="el-icon-arrow-left YeLi_i_on"></i>
        <router-link :to="{name:'PiPeiAddGong'}" class="YeLi_li YeLi_i_on">添加公司</router-link>
      </div>
      <div class="YeCen ziliaotab tancen gongsiadd">
    <div class="tancen">
      <div class="tabcen_li">
        <div class="tabcen_li_name">公司名：</div>
        <input type="text" v-model="fromData.enterprise_name" />
      </div>
      <div class="tabcen_li">
        <div class="tabcen_li_name">公司logo：</div>
        <div class="upbox">
          <img src="@/assets/img/12.png" />
          <input type="file" @change="upImg" accept="image/*" />
          <img :src="img_url" v-if="img_url" class="imgup" />
        </div>
      </div>
      <div class="tabcen_li">
        <div class="tabcen_li_name">所属行业：</div>
        <el-select v-model="fromData.industry" filterable placeholder="请选择">
          <el-option v-for="item in hangYeAll" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="tabcen_li" v-if="userinfo && userinfo.is_operators==1 && fuwuData">
        <div class="tabcen_li_name">服务类型：</div>
        <el-cascader
          v-model="fromData.fuwu"
          :options="fuwuData"
          :props="props"
          filterable
        ></el-cascader>
      </div>
      <div class="tabcen_li">
        <div class="tabcen_li_name">公司电话：</div>
        <input type="text" v-model="fromData.telephone" />
      </div>
      <div class="tabcen_li tabcen_li_d">
        <div class="tabcen_li_name">公司地址：</div>
        <div class="tabcen_li_d_">
          <el-select v-model="prov" placeholder="请选择" @change="shenFn">
            <el-option v-for="item in arr" :key="item.id " :label="item.name " :value="item.id"></el-option>
          </el-select>
          <el-select v-model="city" placeholder="请选择" @change="shiFn">
            <el-option v-for="item in cityArr" :key="item.name " :label="item.name " :value="item.id"></el-option>
          </el-select>
          <el-select v-model="district" placeholder="请选择">
            <el-option
              v-for="item in districtArr"
              :key="item.name "
              :label="item.name "
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="tabcen_li">
        <div class="tabcen_li_name">具体地址：</div>
        <input type="text" v-model="fromData.address" />
      </div>
      <div class="JBtn addbtn" @click="addFn">确认添加</div>
    </div>
  </div>
      <!-- <div class="YeCen ziliaotab tancen gongsiadd">
        <div class='tabcen_li'>
        <div class="tabcen_li_name">公司名：</div><input type="text" v-model="fromData.enterprise_name">
      </div>
      <div class='tabcen_li'>
        <div class="tabcen_li_name">公司logo：</div>
        <div class='upbox'>
          <img src="@/assets/img/12.png">
          <input type="file" @change="upImg" accept="image/*">
          <img :src="img_url" v-if='img_url' class="imgup">
        </div>
      </div>
      <div class='tabcen_li'>
        <div class="tabcen_li_name">所属行业：</div>
                      <el-select v-model="fromData.industry" filterable placeholder="请选择">
                        <el-option
                          v-for="item in hangYeAll"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
      </div>
      <div class='tabcen_li'>
        <div class="tabcen_li_name">公司电话：</div><input type="text" v-model="fromData.telephone">
      </div>

      <div class='tabcen_li'>
        <div class="tabcen_li_name">公司地址：</div><input type="text" v-model="fromData.address">
      </div>
      <div class="JBtn addbtn" @click="addFn">确认添加</div>
      </div> -->
    </div>
    <div class="HuiGe"></div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
      props: { multiple: true, checkStrictly: true },
        fromData:{
          enterprise_name:null,
          file:null,
          address:null,
          telephone:null,
          industry:null,
          fuwu: null
        },
        img_url:null,
        hangYeAll:[],
              fuwuData: null,
      arr: null,
      prov: "",
      city: "",
      district: "",
      cityArr: [],
      districtArr: [],
      }
    },
    created(){
      let that = this;
      this.getHang();
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
    this.Com.request(
      {
        level: 1,
        region_id: ""
      },
      "/index/index/getRegionsBy",
      function(res) {
        that.arr = res.data;
        let arr_ = {};
        for (let i = 0; i < res.data.length; i++) {
          arr_[res.data[i]["id"]] = res.data[i]["name"];
        }
        that.chuData.arr = arr_;
      }
    );
    },
    methods:{
       // 地址选择------------------
    shenFn(e) {
      let that = this;
      that.cityArr = "";
      that.districtArr = "";
      that.city = "";
      that.district = "";
      this.Com.request(
        {
          level: 2,
          region_id: e
        },
        "/index/index/getRegionsBy",
        function(res) {
          that.cityArr = res.data;
        }
      );
    },
    shiFn(e) {
      let that = this;
      that.districtArr = "";
      that.district = "";
      this.Com.request(
        {
          level: 3,
          region_id: e
        },
        "/index/index/getRegionsBy",
        function(res) {
          that.districtArr = res.data;
        }
      );
    },
    // -------------------
      // 返回上一页
      fanFn(){
      this.$router.go(-1);
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
        // 获取服务
      this.Com.request({}, "industryclass/index/treeList2017", function(res) {
        let fuduData_ = [];
        for (let i = 0; i < res.length; i++) {
          fuduData_[i] = {};
          fuduData_[i].value = res[i].code;
          fuduData_[i].label = res[i].name;
          if(res[i].children && res[i].children.length>0)
          {
          fuduData_[i].children = [];
            for (let j = 0; j < res[i].children.length; j++)
            {
              fuduData_[i].children[j] = {};
              fuduData_[i].children[j].value = res[i].children[j].code;
              fuduData_[i].children[j].label = res[i].children[j].name;
              if(res[i].children[j].children && res[i].children[j].children.length>0)
              {
              fuduData_[i].children[j].children = [];
                for (let k = 0; k < res[i].children[j].children.length; k++)
                {
                  fuduData_[i].children[j].children[k] = {};
                  fuduData_[i].children[j].children[k].value = res[i].children[j].children[k].code;
                  fuduData_[i].children[j].children[k].label = res[i].children[j].children[k].name;
                  if(res[i].children[j].children[k].children && res[i].children[j].children[k].children.length>0){
                  fuduData_[i].children[j].children[k].children = [];
                    for (let m = 0; m < res[i].children[j].children[k].children.length; m++)
                    {
                      fuduData_[i].children[j].children[k].children[m] = {};
                      fuduData_[i].children[j].children[k].children[m].value = res[i].children[j].children[k].children[m].code;
                      fuduData_[i].children[j].children[k].children[m].label = res[i].children[j].children[k].children[m].name;
                    }
                  }
                }
              }
            }
          }
        }
        that.fuwuData = fuduData_;
      });
      },
       // 上传图片
      upImg(e){
        var that=this;
        if(e)
        {
          var name_=e.target.dataset.name;
          let file_=e.target.files[0];
          that.fromData.file=file_;
        var reader = new FileReader();
          reader.readAsDataURL(file_);
          reader.onload = function(e){
            that.img_url=e.target.result;
          }
        }
      },
      // 添加公司
      addFn(){
        let that = this;
      if (!that.fromData.enterprise_name) {
        that.$message({
          message: "请填写公司名称",
          type: "error",
          duration: 1500
        });
      } else if (!that.fromData.telephone) {
        that.$message({
          message: "请填写公司电话",
          type: "error",
          duration: 1500
        });
      } else if (!that.fromData.address) {
        that.$message({
          message: "请选择公司地址",
          type: "error",
          duration: 1500
        });
      } else if (!that.fromData.industry) {
        that.$message({
          message: "请选择行业",
          type: "error",
          duration: 1500
        });
      } 
      else if(!that.prov || !that.city || !that.district){
        that.$message({
          message: "请选择省市区",
          type: "error",
          duration: 1500
        });
      }
       else if((!that.fromData.fuwu || !that.fromData.fuwu.length>0) && that.$store.state.info.is_operators==1){
       that.$message({
          message: "请选择服务类型",
          type: "error",
          duration: 1500
        });
      }
      else {
        that.Com.loginFNPan(function(res) {
          if (res.error_code == 0) {
            let param = new FormData();
            if(that.$store.state.info.is_operators==1)
            {
              let fuwu_ = that.fromData.fuwu;
              let fuwuData = [];
              for (let i = 0; i < fuwu_.length; i++) {
                let len_ = fuwu_[i].length - 1;
                fuwuData[i] = fuwu_[i][len_];
              }
              for (let j = 0; j < fuwuData.length; j++) {
                param.append("code[]", fuwuData[j]);
              }
            }
            param.append("file", that.fromData.file);
            param.append("enterprise_name", that.fromData.enterprise_name);
            param.append("address", that.fromData.address);
            param.append("telephone", that.fromData.telephone);
            param.append("industry", that.fromData.industry);
            param.append("province", that.prov);
            param.append("city", that.city);
            param.append("region", that.district);
            let config = {
              headers: { "Content-Type": "multipart/form-data" }
            };
            // that.$http.post("http://172.16.3.97/mySite/manage_client/public/customers/index/addEnterprise",
            // that.$http.post("http://zp.damaike.com/manage_client/public/index.php/customers/index/addEnterprise",
            that.$http
              .post(
                "http://zp.damaike.com/manage_client/public/index.php/customers/index/addEnterprise",
                // "/api/manage_client/public/customers/index/addEnterprise",
                param,
                config
              )
              .then(response => {
                if (response.data.result == "success") {
                  that.$message({
                    message: "公司添加成功",
                    type: "success",
                    duration: 1500,
                    onClose: function() {
                      that.$router.push({ name: "UserZiLiaoJiben" });
                    }
                  });
                }
              });
          }
        });
      }
      }
    },
    computed: {
    userinfo() {
      return this.$store.state.info;
    }
  },
    components:{

    }
  }
</script>

<style scoped>
.wufuadd{
  background-color: #f3f3f3;
}
.cen-width{
  background-color: white;
  padding-bottom: 50px;
}
.imgup{
  width: 100%;
  height: 100%;
  position:absolute;
  left: 0;
  top: 0;
  background-color: white;
}
.upbox{
  position: relative;
}
.upbox img{
  width: 90px;
  cursor: pointer;
}
.upbox input{
  position:absolute;
  left: 0;
  top: 0;
  width: 90px !important;
  height: 90px !important;
  opacity: 0;
  z-index: 99;
  cursor: pointer;
}
.tancen{
  box-sizing: border-box;
  margin-top: 90px;
}
</style>