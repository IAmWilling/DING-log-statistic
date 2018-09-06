<template>
<div>
  <div class="hello" ref="hel">
    <div class="date">
      <span class="iconfont" style="font-size:24px;" @click="GOTObb">&#xe60a;返回</span>
      <span class="date_time" @click="ddClickChangeDate">{{ date }} <span class="iconfont">&#xe87e;</span> </span>
      <span class="date_direction">{{ this.$store.state.defaultClass }}</span>
    </div>
    <Schart v-if="this.$store.state.showTJ" class="wrapper" :canvasId="this.$store.state.statisticalStruct.canvasId" :type="this.$store.state.statisticalStruct.type" :width="this.$store.state.statisticalStruct.width" :height="this.$store.state.statisticalStruct.height" :data="this.$store.state.statisticalStruct.data" :options="this.$store.state.statisticalStruct.options"></Schart>
    <p @click="handleAddedShow" class="added">已交&nbsp;&nbsp;<span> {{this.$store.state.givePerson}} </span></p>
    <div style="background-color:#fff;" v-show="showadded">
    <div @click="itemDetail(item)" style="border-bottom:solid 1px #e5e5e5;min-height:50px;width:80%;margin:0 auto;" class="added_detail dd-border-bottom" v-for="(item,index) in this.$store.state.giveLog" :key="index">
      <div class="">
            <div v-show="item.avatar.length==0" style="display:inline-block;
        width: 48px;
        height: 48px;
        position: relative;
        top: -13px;
        float: left;
        background-color:#3296FA;
        border-radius:50%;
        ">
          <div style="margin:0 auto;text-align:center;
          font-size:16px;
          line-height:48px;
          color:#fff;
          ">{{item.creator_name[item.creator_name.length-2] + item.creator_name[item.creator_name.length-1]}}</div>
        </div>
        <img style="
          position: relative;
          top: -13px;
          float: left;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          -moz-border-radius: 50%;
          -webkit-border-radius: 50%;
        " 
          v-bind:src="item.avatar"
           v-show="item.avatar.length!=0"
        >
      </div>
      <span class="added_detail_name">&nbsp;&nbsp;&nbsp;&nbsp;{{item.creator_name}}</span>
      <span class="iconfont1" style="float:right;margin-right: 35px;">&#xe606;</span>
    </div>
     </div>
    <p @click="handleUnaddedShow" class="added" style="margin-top:10px;">未交&nbsp;&nbsp;<span> {{this.$store.state.ungivePerson}} </span></p>
    <div style="background-color:#fff;" v-show="showunadded">
    <div  class="added_detail" v-for="(item,index) in this.$store.state.ungiveLog" :key="index" style="border-bottom:solid 1px #e5e5e5;min-height:50px;width:80%;margin:0 auto;">
      <div class="">
        <div v-show="item.avatar.length==0" style="display:inline-block;
        width: 48px;
        height: 48px;
        position: relative;
        top: -13px;
        float: left;
        background-color:#3296FA;
        border-radius:50%;

        ">
          <div style="margin:0 auto;text-align:center;
          font-size:16px;
          line-height:48px;
          color:#fff;
          ">{{item.name[item.name.length-2] + item.name[item.name.length-1]}}</div>
        </div>
        <img style="
          position: relative;
          top: -13px;
          float: left;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          -moz-border-radius: 50%;
          -webkit-border-radius: 50%;
        " 
          v-bind:src="item.avatar"
          v-show="item.avatar.length!=0"
        >
      </div>
      <span class="added_detail_name">&nbsp;&nbsp;&nbsp;&nbsp;{{item.name}}</span>
    </div>
    </div>

   
    <login v-show="isZhezhao"></login>

    </div>

     <transition name="topD">
      <div class="goTop" v-show="isGoToTop" ref="topDiv" @click="clickGoToTop">
        <span class="iconfont4" style="line-height:55px;">&#xe614;</span>
      </div>
    </transition>

    </div>
</template>

<script>
var scrollTop_x = 0;
var count = 0;
import {
  toDateA,
  disposeGiveLogData,
  getUnGiveDetailInfo
} from "../jsAPI/index"; //getDate
import Schart from "vue-schart";
import Axios from "axios";
import login from './login'
export default {
  name: "HelloWorld",
  components: {
    Schart,
    login
  },
  data() {
    return {
      date: toDateA(new Date()),
      startTime: 0, //起始时间
      endTime: 0, //终止时间
      direction: "PHP01",
      name: "",
      added_number: 0,
      unadded_number: 0,
      avatar:
        "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=123308412,2828093194&fm=58",
      showadded: true,
      showunadded: true,
      checked: false,
      isShow: true,
      statisticalStruct: {
        //统计图表数据结构
        canvasId: "myCanvas",
        type: "ring",
        width: 100,
        height: 90,
        data: [{ name: "已交", value:  0}, { name: "未交", value: 90 }],
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
      classDetails: null, //班级详细信息结构
      giveLog: null, //已交日志信息结构
      ungiveLog: null, //未交日志的信息结构
      isZhezhao: false, //login加载
      isDetailData: false, //详情块
      detailData: null, //详情数据块
      cursor: "", //点击后某人的名字存储
      isGoToTop: false //显示返回顶部按钮
    };
  },
  mounted() {
    this._goToTop();
  },
  methods: {
    //dd改变日期
    ddClickChangeDate() {
      let _that = this;
      dd.ready(function() {
        dd.biz.calendar.chooseOneDay({
          default: new Date().getTime(), //这里用getTime获取当前时间戳
          onSuccess: function(result) {
           
            _that.$store.commit("changeTJ",false);
            let un = new Date(result.chosen);
            _that.date =
              un.getFullYear() +
              " / " +
              (un.getMonth() + 1) +
              " / " +
              un.getDate();
            _that.isZhezhao = true;
            Axios.post(`${_that._api}default`, {
              ribao_name: _that.$store.state.ribaoName,
              class_name: _that.$store.state.defaultClass,
              start_time: new Date(new Date(result.chosen).setHours(0, 0, 0, 0)).getTime(), //开始时间
              end_time:  new Date(new Date(result.chosen).setHours(23, 59, 59, 0)).getTime()
            })
              .then(res => {
                if (res.data.ok) {
                   let givelog = disposeGiveLogData(res.data.member[0],res.data.report); //获取已缴人数信息加入头像
                  let classDetail = res.data.member[0];
                  let ungiveLog = getUnGiveDetailInfo(classDetail,givelog);    //获取未交人数信息
                  _that.$store.commit("getClassTmData",{givelog,ungiveLog,classDetail});
                  _that.$store.commit("changeTJ",true);
                  _that.isZhezhao = false;
            
                } else {
                  alert("数据获取失败!");
                }
              })
              .catch(err => {
                alert(err);
              });
          },
          onFail: function(err) {}
        });
      });
    },
    // 设置默认班级API
    changeDefaultValue() {
      this.checked = !this.checked;
      if (this.checked) {
        Axios.post(`${this._api}changeDefault`, {
          userid: this.$store.state.userID,
          class_name: this.direction
        }).then(res => {
          if (res.data.ok) {
            this.$store.commit("changeDefaultClass", this.direction);
            this.youth.toast(`将${this.direction}设置为默认显示班级`);
          }
        });
      } else {
        Axios.post(`${this._api}changeDefault`, {
          userid: this.$store.state.userID,
          class_name: "PHP01"
        }).then(res => {
          if (res.data.ok) {
            this.youth.toast(`将${this.direction}取消默认显示班级`);
          }
        });
      }
    },
    handleAddedShow() {
      this.showadded = !this.showadded;
    },
    handleUnaddedShow() {
      this.showunadded = !this.showunadded;
    },
    itemDetail(item) {
      var t = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动距离
      this.$store.commit("setScrollY", t);
      // this.isDetailData = true;
      this.$router.push("/RBdetail");
      // this.detailData = [];
      // this.detailData = item.contents;
      // this.cursor = item.creator_name;
      this.$store.commit("getStuRiBoDetail", {
        detail: item.contents,
        cursor: item.creator_name
      });
    },
    closeItemDetail() {
      this.isDetailData = false;
    },
    _goToTop() {
      this.$nextTick(() => {
        window.onscroll = () => {
          var x = 0;
          var t = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动距离
          // this.$store.commit("setScrollY",t);
          if (count == 0) {
            scrollTop_x = t; //记录第一次位置
            count += 1;
          } else {
            if (scrollTop_x > t) {
              this.isGoToTop = true;
            } else {
              this.isGoToTop = false;
            }
            count = 0;
          }
          if (t == 0) {
            this.isGoToTop = false;
          }
        };
      });
    },
    clickGoToTop() {
      //获取当前
      var t = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动距离

      window.scrollBy(0, -200);
      var f = setTimeout(this.clickGoToTop, 1);
      if (t == 0) {
        clearTimeout(f);
      }
    },
     GOTObb(){
     
      this.$router.push("/");
    }
  },
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background: #fafafa;
  font-family: PingFangSC-Semibold;
  position: relative;
  z-index: 1;
}
.date {
  width: 100%;
  height: 60px;
  background: #fafafa;
  font-size: 24px;
  color: #03a9f4;
  padding-top: 32px;
}
.date_time {
  margin-left: 32px;
}
.date_direction {
  float: right;
  margin-right: 32px;
}
.added {
  height: 32px;
  font-size: 16px;
  color: #9e9e9e;
  line-height: 16px;
  margin-left: 32px;
}
.added_detail {
  width: calc(100% - 32px);
  height: 59px;
  padding-top: 37px;
  padding-left: 32px;
  background: #fff;
}
.added_detail_name {
  font-size: 16px;
  color: #212121;
}
.wrapper {
  margin: 0 auto;
  width: 300px;
  height: 230px;
}
.zhezhao {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  bottom: 0;
}
.path {
  width: 33px;
  height: 33px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  /* border:solid 1px; */
  animation: login infinite 0.8s linear;
}
.path1 {
  width: 9px;
  height: 9px;
  background-color: #3296fa;
  border-radius: 50%;
  margin: 0 auto;
}
.path2 {
  width: 9px;
  height: 9px;
  background-color: #15bc83;
  border-radius: 50%;
}
.path3 {
  width: 9px;
  height: 9px;
  background-color: #ff943e;
  border-radius: 50%;
}
.path4 {
  width: 9px;
  height: 9px;
  background-color: #f25643;
  border-radius: 50%;

  position: relative;
  bottom: -4px;
  margin: 0 auto;
}
.plp-yh {
  transform: scale(0.9);
}
@keyframes login {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@font-face {
  font-family: "iconfont"; /* project id 818416 */
  src: url("//at.alicdn.com/t/font_818416_c7kcqenrwzr.eot");
  src: url("//at.alicdn.com/t/font_818416_c7kcqenrwzr.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_818416_c7kcqenrwzr.woff") format("woff"),
    url("//at.alicdn.com/t/font_818416_c7kcqenrwzr.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_818416_c7kcqenrwzr.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.iconfont1 {
  font-family: "iconfont" !important;
  font-size: 25px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  color: #9e9e9e;
}
.iconfont3 {
  font-family: "iconfont" !important;
  font-size: 40px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.1px;
  -moz-osx-font-smoothing: grayscale;
  color: #9e9e9e;
}
.iconfont4 {
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 2px;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}
.dd-border-bottom {
  border-bottom: 0.1rem solid #e5e5e5;
}

@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .dd-border-bottom {
    border-bottom: 0.05rem solid #e5e5e5;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .dd-border-bottom {
    border-bottom: 0.0333333rem solid #e5e5e5;
  }
}
.item-detail {
  position: fixed;
  z-index: 99999;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  bottom: 0;
  transition-duration: 0.5s;
}
.item {
  padding: 20px;
  width: 95%;
  max-height: 100%;
  overflow: auto;
  position: absolute;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
}
.item p {
  font-size: 14px;
  color: #9e9e9e;
}
.item-class-op {
  padding-top: 5px;
  padding-bottom: 5px;
  max-width: 96%;
  min-height: 70px;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  font-size: 14px;
}
/*go-away*/

.side-column-enter-active {
  /* opacity: 1; */
  transform: translate3d(0, 0, 0);
}
.side-column-leave-active {
  /* opacity: 0;
  transition-duration:0.3s; */
  transform: translate3d(0, 0, 0);
}
.side-column-leave-to {
  transform: translate3d(0, -80rem, 0);
}
.side-column-enter/* .fade-leave-active below version 2.1.8 */ {
  transform: translate3d(0, -80rem, 0);
}
.goTop {
  z-index: 100;

  position: fixed;
  bottom: 40px;
  right: 20px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  text-align: center;
  background-color: #3296fa;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 20px,
    rgba(0, 0, 0, 0.07) 0px 20px 40px;

  transition-duration: 0.3s;
}
/* topD */
.topD-enter-active {
  /* transform: translateX(0rem); */
  transform: scale(1);
}
.topD-leave-active {
  transform: scale(1);
}
.topD-leave-to {
  transform: scale(0);
}
.topD-enter/* .fade-leave-active below version 2.1.8 */ {
  /* transform: translateX(10rem); */
  transform: scale(0);
}
</style>
