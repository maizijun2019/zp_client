import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state:{
    info:null,
    adress:[{
      name:'浙江省',
      id:'933'
    },{
      name:'温州市',
      id:'960'
    },{
      name:'瓯海区',
      id:'963'
    }],
  },
  mutations: {
    Info (state,infos) {
      state.info =infos;
    },
    Adress (state,Adress) { 
      state.adress =Adress;
   },
  }
})
 
export default store;