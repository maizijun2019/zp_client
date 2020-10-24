<template>
  <div>
    <!-- --最外层 -->
    <heard :userinfo_data="userinfo_data"></heard>
    <router-view v-on:userinfoFn="userinfoFn"/>
  </div>
</template>

<script>
import heard from '../components/heard.vue'
import foot from '../components/foot.vue'
  export default{
    data(){
      return{
        userinfo_data:''
      }
    },
    created(){
      },
    methods:{
      userinfoFn: function (res) {
        this.userinfo_data=res;
      }
    },
    components:{
      
      },
      components:{heard,foot},
  }
</script>

<style>
</style>