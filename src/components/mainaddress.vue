<template>
  <div style="background-color:#fff;">
    <div class="top-title">选择需要查看的模板</div>
    <div class="body">
      <div class="group-div" 
      v-for="(item,index) in templateData" 
      :key="index"
      @click="handleClickGoToRB(item)"
      >{{item.name}}</div>
    </div>
    <login v-show="isZhezhao"></login>
  </div>
</template>
<script>
import login from './login'
import Axios from "axios";
import {toDateA, disposeGiveLogData,getUnGiveDetailInfo} from "../jsAPI/index"; //getDate
export default {
  name: "ZheTMShiZhuWenJian",
  components:{
    login
  },
  data() {
    return {
      templateData: null, //模板数据
      isZhezhao:false,
    };
  },
  methods: {
    _getTime() {
      //发送Vuex
      this.$store.commit("getDateStartAndEndTime", {
        start: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
        end: new Date(new Date().setHours(23, 59, 59, 0)).getTime()
      });
    },
    _onceGetData() {
      this.isZhezhao = true;
      //首次获取模板数据
      this._getTime(); //获取时间
      Axios.post(`${this._api}template`)
        .then(res => {
          if (res.data.length != 0) {
            this.templateData = res.data;
            this.isZhezhao = false;
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    handleClickGoToRB (item) {
      
      if(item.name==="拜访记录" || item.name==="特训营日报"){
        return;
      }
      this.isZhezhao = true;
      this.$store.commit("changeTJ",false);
       let className = item.name;
      if(item.name=="助教日报") {
        className = "tutor";
        this.$store.commit("changeRBname",item.name);
        this.$store.commit("changeDefaultClass", className);
      }else{
        this.$store.commit("changeRBname",className);
        className = className.replace("班学习日报","");
        this.$store.commit("changeDefaultClass", className);
      }
      
      
      
      Axios.post(`${this._api}default`,{
         ribao_name: item.name,
         class_name: className,
         start_time: this.$store.state.startTime,
         end_time: this.$store.state.endTime
      }).then((res)=>{
        if(res.data.ok)
        {
          let givelog = disposeGiveLogData(res.data.member[0],res.data.report); //获取已缴人数信息加入头像
          let classDetail = res.data.member[0];
          let ungiveLog = getUnGiveDetailInfo(classDetail,givelog);    //获取未交人数信息
          this.$store.commit("getClassTmData",{givelog,ungiveLog,classDetail});
          this.$store.commit("changeTJ",true);
          
        this.$router.push("/RBTongJi");
        this.isZhezhao = false;
        }

      }).catch((err)=>{alert(err)})
     
    }
  },
  created() {
    //生命周期
    this._onceGetData();
  }
};
</script>
<style scoped>
.top-title{
  text-align:center;
}
.body{
  margin:0 auto;
  width:calc(100% - 100px);
  height:calc(100% - 100px);
  /* border:solid 5px; */
  padding:30px;
  overflow-y:auto; 
}
.group-div{
  
  width:150px;
  height:40px;
  margin:0 auto;
  margin-bottom:30px;
  text-align: center;
  line-height:40px;
  font-size:14px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
}
</style>
