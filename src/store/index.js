import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
  state:{
    userID:'',
    defaultClass:null, //默认班级
  },
  mutations:{
    changeDefaultClass (store,data) {   //设置默认班级
      store.defaultClass = data;
    },
    getUserId (store,data) {    //获取UserId
      store.userID = data;
    },
  }//search
})