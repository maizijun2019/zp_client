<template>
  <div class="guanyuwomen">
    <div class="cen-width pu-kong qitaye">
      <div class="cenbox">
        <div class="cen_left pu-ying">
          <div class="cen_left_tit"><img src="@/assets/img/left-bg.png"><span></span>新闻资讯</div>
          <div v-for='(item,index) in types'>
            <div class="cen_left_li" @click="liFn(index)" :class="li_index==index?'cen_left_li_on':''">{{item.type_name}}
            </div>
              <div class="cen_left_li_" @click="liFn(index,indexb)" :class="li_index==index && li_index_b==indexb?'cen_left_li_on_':''" v-if='item.sub' v-for="(itemb,indexb) in item.sub">{{itemb.type_name}}</div>
          </div>
          <div class="cen_left_li cen_left_li_on" v-if='!types'>所有新闻</div>
        </div>
        <div class="cen_right">
          <div class='cen_right_li pu-ying cen_right_li_on'>
            <div class='SearBox'>
              <div class="SearBox_in"><img src="@/assets/img/7.png"><input type="text" v-model="title" placeholder="输入关键字"></div>
              <div class="SearBox_btn" @click="sousuoFn">搜索</div>
            </div>
            <div class="xin_cen" v-loading="jiazai_f">
              <!-- <div class="jiazaibox" v-if='jiazai_f'><img src="@/assets/img/load.gif">获取中..</div> -->
              <div class="xin_li" v-if='liDatas' v-for='item in liDatas' @click="wenDianFn(item.news_id)">
                <div class="xin_li_top">
                  <div class='xin_li_top_name'><span></span>{{item.title}}</div>
                  <div class='xin_li_top_data'>{{item.create_time_text}}</div>
                </div>
                <div class='xin_li_cen'>{{item.content}}</div>
              </div>
              <div class="zanwu" v-if='(!liDatas || liDatas.length==0) && !jiazai_f'>暂无新闻，待添加..</div>
              <div class="PageBox" v-if="total>0">
                <el-pagination
                  layout="prev, pager, next"
                  :total="total" :current-page="page" :page-size='pageSize' @size-change="fanyeFn"
                    @current-change="fanyeFn" >
                </el-pagination>
              </div>
            </div>
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
        li_index_b:-1,
        types:null,
        page:1,
        title:null,
        type:0,
        total:0,
        pageSize:10,
        liDatas:null,
        jiazai_f:false
      }
    },
    created(){
      let that=this;
      // 热门项目
        that.jiazai_f=true;
      this.Com.request('','news/typeList',function(res){
        that.types=res.data;
        that.getXinFn();
      })
    },
    methods:{
      liFn(index,indexb)
      {
        let that=this;
        let types_=this.types;
        this.li_index=index;
        if(indexb || indexb==0)
        {
          that.li_index_b=indexb;
          that.type=types_[index]['sub'][indexb].news_type_id;
        }
        else{
          that.li_index_b=-1;
          that.type=types_[index].news_type_id;
        }
        this.page=1;
        this.title='';
        this.getXinFn();
      },
      sousuoFn(){
        this.page=1;
        this.getXinFn();
      },
      // 翻页
      fanyeFn(e){
        this.page=e;
        this.getXinFn();
      },
      //新闻搜索
      getXinFn()
      {
        let that=this;
        this.Com.request({
          sum:that.pageSize,
          page:parseInt(that.page),
          news_type_id:that.type,
          keyword:that.title,
        },'news/newsList',function(res){
          that.jiazai_f=false;
          that.liDatas=res.data;
          that.total=res.totalNum;
        })
      },
      // 新闻点击
      wenDianFn(id)
      {
        this.$router.push({name:'XinWenXiang',query:{'id':id}})
      }
    },
    components:{

    }
  }
</script>

<style scoped>
.jiazaibox img{
  width:20px;
  margin-right: 20px;
}
.jiazaibox{
  text-align:center;
  line-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.PageBox{
  margin-top: 30px;
}
.cen_right_li{
  min-height: 600px;
}
.SearBox{
  justify-content:flex-end;
}
.xin_cen{
  margin-top: 20px;
  min-height:500px;
  text-align: center;
}
.xin_li{
  border-bottom: 1px dashed #ddd;
  padding:15px 0;
  cursor: pointer;
}
.xin_li_top{
  display: flex;
  align-items: center;
  justify-content:space-between;
}
.xin_li_top_name{
  display: flex;
    align-items: center;
    color: #333333;
    font-size: 16px;
}
.xin_li_top_name span
{
  display:block;
  width: 8px;
  height: 8px;
  background-color: #333333;
  border-radius: 50%;
  margin-right: 10px;
}
.xin_li_top_data{
  color: #999999;
}
.xin_li_cen{
    padding-left: 18px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
    color: #777777;
    margin-top: 10px;
    text-align: left;
}
.cen_left_li{
  background: none !important;
}
.cen_left_li::before{
  top: 0 !important;
}
.qitaye .cen_left_li{
  padding-left: 20px !important;
}
.cen_left_li_{
  padding-left: 15px;
  padding:9px 0;
  padding-left:30px;
  cursor: pointer;
}
.cen_left_li_on_{
  color: #5c9eff !important;
}
.cen_left_li:hover
{
  background: none !important;
}
.cen_left_li_:hover{
  color:#5c9eff;
}
</style>