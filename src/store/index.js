import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
  state:{
    userID:'',
    defaultClass:null, //默认班级
    stuRiBo:null,   //学生详细信息
    scrollY:0,    //记录主页位置
    startTime: 0, //起始时间
    endTime: 0, //终止时间
    giveLog:null, //已交人数信息
    ungiveLog:null,   //未交人数信息
    classDetail:null,   //班级全体信息
    givePerson:0,   //已交人数
    ungivePerson:0,   //未交人数
    ribaoName:null,
    showTJ:true,
    statisticalStruct: {
      //统计图表数据结构
      canvasId: "myCanvas",
      type: "ring",
      width: 100,
      height: 90,
      data: [{ name: "已交", value: 0 }, { name: "未交", value: 0 }],
      options: {
        padding: 1, // canvas 内边距
        bgColor: "#fafafa", // 默认背景颜色
        title: "班级日报提交情况", // 图表标题
        titleColor: "#000000", // 图表标题颜色
        titlePosition: "top", // 图表标题位置: top / bottom
        legendColor: "#000000", // 图例文本颜色
        legendTop: 30, // 图例距离顶部的长度
        colorList: ["#3296FA", "#000"], // 环形图颜色列表
        radius: 70, // 环形图外圆半径
        innerRadius: 50 // 环形图内圆半径
      }
    },
  },
  mutations:{
    changeDefaultClass (store,data) {   //设置默认班级
      store.defaultClass = data;
    },
    getUserId (store,data) {    //获取UserId
      store.userID = data;
    },
    getStuRiBoDetail (store,data){
      store.stuRiBo = data;
    },
    setScrollY (store,data) {
      store.scrollY = data;
    },
    getDateStartAndEndTime (store,data){
      store.startTime = data.start;
      store.endTime = data.end;
    },
    getClassTmData (store,data){
      store.giveLog = [];
      store.ungiveLog = [];
      store.classDetail = [];
      
      store.giveLog = data.givelog;
      store.ungiveLog = data.ungiveLog;
      store.classDetail = data.classDetail;

      store.givePerson = data.givelog.length;
      store.ungivePerson = data.ungiveLog.length;
      Vue.set( store.statisticalStruct.data[0],"value",store.givePerson);
      Vue.set( store.statisticalStruct.data[1],"value",store.ungivePerson);
      
    },
    changeTJ (store,data){
      store.showTJ = data;
    },
    changeRBname(store,data){
      store.ribaoName = data;
    }
  }
})