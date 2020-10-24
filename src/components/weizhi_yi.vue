<template>
  <div>
    <div class="WeiZhiBox">
      <div class="WeiZhiBox_zi">{{xuan.city}}-{{xuan.district}}</div>
      <span @click="dialogVisible = true">修改</span>
      <!-- <span @click="xiuFn">修改</span> -->
      
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="40%" :modal-append-to-body='false' :append-to-body='false'
          >
          <div class="tanxuanbox_cen">
            <el-select v-model="prov" placeholder="请选择" @change="gaiFn">
              <el-option v-for="item in arr" :key="item.name " :label="item.name " :value="item.name "></el-option>
            </el-select>
            <el-select v-model="city" placeholder="请选择">
              <el-option v-for="item in cityArr" :key="item.name " :label="item.name " :value="item.name "></el-option>
            </el-select>
            <el-select v-model="district" placeholder="请选择">
              <el-option
                v-for="item in districtArr"
                :key="item.name "
                :label="item.name "
                :value="item.name "
              ></el-option>
            </el-select>
          </div>
          <!-- <div v-for="item in arr">{{item.name}}</div> -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="difn">确 定</el-button>
          </span>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import options from "../../static/js/country-data.js";
// import options from "../../static/js/didata.js";
// import options from "../../static/js/2.js";

// import '../../static/js/api.js'
//  var map_u=require('../../static/js/map.json');
export default {
  data() {
    return {
      // mapJson:'../../static/js/map.json',
      arr: null,
      prov: "北京",
      city: "北京",
      district: "东城区",
      cityArr: [],
      districtArr: [],
      dialogVisible:false,//弹窗显示
      xuan:{
        prov:'浙江省',
        city:'温州市',
        district:'瓯海区',
      }
    };
  },
  created() {
    this.arr =JSON.parse(JSON.stringify(options));
  },
  methods: {
    gaiFn(e)
    {
    },
    difn:function(){
      let that=this;
       if(this.city=='请选择')
      {
        that.xuan.city='';
      }
      else{
        that.xuan.city=this.city;
      }
      this.dialogVisible=false;
      this.xuan.prov=this.prov;
      this.xuan.district=this.district;
      this.$emit('adressdata',this.xuan);
    },
    updateCity: function() {
      for (var i in this.arr) {
        var obj = this.arr[i];
        if (obj.name == this.prov) {
          this.cityArr = obj.sub;
          break;
        }
      }
      this.city = this.cityArr[1].name;
    },
    updateDistrict: function() {
      for (var i in this.cityArr) {
        var obj = this.cityArr[i];
        if (obj.name == this.city) {
          this.districtArr = obj.sub;
          break;
        }
      }
      if (
        this.districtArr &&
        this.districtArr.length > 0 &&
        this.districtArr[1].name
      ) {
        this.district = this.districtArr[1].name;
      } else {
        this.district = "";
      }
    }
  },
  beforeMount: function() {
    this.updateCity();
    this.updateDistrict();
  },
  watch: {
    prov: function() {
      this.updateCity();
      this.updateDistrict();
    },
    city: function() {
      this.updateDistrict();
    }
  }
};
</script>

<style scoped>
.xiugaibtn{
  padding: 0 !important;
  border: none !important;
  font-size: 12px !important;
      color: #5c9eff !important;
    font-size: 12px !important;
}
.xiugaibtn span{
    color: #5c9eff !important;
    font-size: 12px !important;

}
.tanxuanbox_cen{
  display: flex;
  align-items:center;
  justify-content: space-around;
}
.tanxuanbox_btn{
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content:center;
}
.tanxuanbox_btn{
  
}
.tanxuanbox_cen .el-select{
  margin:0 5px;
}
.WeiZhiBox {
  display: flex;
  align-items: center;
  color: #333333;
  font-size: 12px;
}
.WeiZhiBox_zi{
  background-color: #f3f3f3;
  color: #333333;
  font-size: 12px;
  margin: 0 15px;
  padding: 3px 10px;
  box-sizing: border-box;
  border-radius: 20px;
}
.WeiZhiBox span {
  cursor: pointer;
  color: #5c9eff;
  font-size: 12px;
}
</style>