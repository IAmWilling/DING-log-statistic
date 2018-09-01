<template>
  <div class="hello">
    <div class="date">
      <span class="date_time" @click="ddClickChangeDate">{{ date }} <span class="iconfont">&#xe87e;</span> </span>
      <span class="date_direction" @click="ddClickChangeDirection">{{ direction }} <span class="iconfont">&#xe87e;</span></span>
    </div>
    <p style="position:relative;height: 16px;"><v-checkbox ref="checkbox" style="position:absolute;right:32px;" name="class" :active="checked" @click.native="changeDefaultValue">设为默认</v-checkbox></p>
    <Schart v-if="isShow" class="wrapper" :canvasId="statisticalStruct.canvasId" :type="statisticalStruct.type" :width="statisticalStruct.width" :height="statisticalStruct.height" :data="statisticalStruct.data" :options="statisticalStruct.options"></Schart>
    <p @click="handleAddedShow" class="added">已交&nbsp;&nbsp;<span> {{added_number}} </span></p>
    <div style="background-color:#fff;">
    <div  v-if="item.length!=0" v-show="showadded" @click="itemDetail(item)" style="border-bottom:solid 1px #e5e5e5;min-height:50px;width:80%;margin:0 auto;" class="added_detail dd-border-bottom" v-for="(item,index) in giveLog" :key="index">
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
      <span class="iconfont1" style="float:right;margin-top:5px;">&#xe606;</span>
    </div>
     </div>
    <p @click="handleUnaddedShow" class="added" style="margin-top:10px;">未交&nbsp;&nbsp;<span> {{unadded_number}} </span></p>
    <div style="background-color:#fff;">
    <div v-show="showunadded" class="added_detail" v-for="(item,index) in ungiveLog" :key="index" style="border-bottom:solid 1px #e5e5e5;min-height:50px;width:80%;margin:0 auto;">
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
     <transition name="fade">



       <!-- Login加载 -->
    <div class="zhezhao" v-show="isZhezhao" >
        <div class="path">
          <div class="path1"></div>
          <div style="display:flex; justify-content:space-between;margin-top:5px;">
            <div class="path2"></div>
            <div class="path3"></div>
          </div>
        <div class="path4" style=""></div>
        </div>
      </div>
    </transition>




    <!-- 详细 -->
     <transition name="side-column">
      <div class="item-detail" v-show="isDetailData">
       
        <div class="item">
           <div style="text-align:center;color:#03a9f4;font-size:17px;">{{cursor}}</div>
          <div v-for="(item,index) in detailData" :key="index">
            <p>{{item.key}} <span style="color:red;">*</span></p>
            <div class="item-class-op">
              {{item.value}}
            </div>
          </div>
           <div style="text-align:center;">
            <span class="iconfont3" @click="closeItemDetail">&#xe625;</span>
           </div>
          </div>
         
        </div>
      </transition>
    </div>

</template>

<script>
import { toDateA, disposeGiveLogData , getUnGiveDetailInfo } from "../jsAPI/index"; //getDate
import Schart from "vue-schart";
import Axios from "axios";
export default {
  name: "HelloWorld",
  components: {
    Schart
  },
  data() {
    return {
      date: toDateA(new Date()),
      startTime:0,     //起始时间
      endTime:0,     //终止时间
      direction: "PHP01",
      name: "",
      added_number: 0,
      unadded_number: 0,
      avatar:
        "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=123308412,2828093194&fm=58",
      showadded: true,
      showunadded: true,
      checked: false,
      isShow:false,
      statisticalStruct: {
        //统计图表数据结构
        canvasId: "myCanvas",
        type: "ring",
        width: 100,
        height: 90,
        data: [
          { name: "已交", value: 0},
          { name: "未交", value: 0}
        ],
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
      isZhezhao:false,    //login加载
      isDetailData:false,     //详情块
      detailData:null,      //详情数据块
      cursor:'',  //点击后某人的名字存储
    };
  },
  created() {
    this.isZhezhao = true;
    this.$nextTick(() => {
      this._getUserId();
      if (this.direction === this.$store.state.defaultClass) {
        this.checked = true;
      }

    });

    // this.$set(this.statisticalStruct.dataBase[0],'value',50);
  },
  methods: {
    //获取UserID:
    _getUserId() {
      let _that = this;
      this.startTime = new Date(new Date().getHours(0,0,0,0)).getTime();
      this.endTime = new Date(new Date().getHours(23,59,59,0)).getTime();
      dd.ready(function() {
        dd.runtime.permission.requestAuthCode({
          corpId: "dingf5bdfda1379fc0f135c2f4657eb6378f",
          onSuccess: function(result) {
            Axios.post(`${_that._api}default`, {
              code: result.code,
              ribao_name: "PHP01班学习日报",
              class_name: _that.direction,
              start_time: _that.startTime,
              end_time: _that.endTime
            })
              .then(res => {
                if (res.data.ok) {
                  
                   _that.$store.commit("getUserId", res.data.userid);
                   
                  _that.giveLog = disposeGiveLogData(
                    res.data.member[0],
                    res.data.report
                  ); //获取已交信息
                  _that.classDetails = res.data.member[0]; //获取班级所有信息
                  _that.ungiveLog = getUnGiveDetailInfo(_that.classDetails,_that.giveLog);
                   
                  _that.added_number = _that.giveLog.length;//已交人数
                  _that.unadded_number = _that.ungiveLog.length;//未交人数
                 _that.$set(_that.statisticalStruct.data[0],"value",_that.added_number);
                 _that.$set(_that.statisticalStruct.data[1],"value",_that.unadded_number);
                // if(res.data.first) {   //true表示第一次进入
                //   _that.$store.commit("changeDefaultClass","");//返回默认班级
                // }else {
                  _that.$store.commit("changeDefaultClass", res.data.class_name);//返回默认班级
                  if(_that.direction!=null || _that.direction!="") {
                    _that.checked = true;
                  }
                //   }
                // }
                _that.isZhezhao = false;
                _that.direction = res.data.class_name;
                 _that.isShow = true;    //v-if强制刷新组件 
                 //我就震动一下
                 dd.device.notification.vibrate({
                    duration: 100, //震动时间，android可配置 iOS忽略
                    onSuccess : function(result) {
                      
                    },
                    onFail : function(err) {}
                })
                } else {
                  _that.isZhezhao = false;
                  alert("数据获取失败!");
                }
              })
              .catch(err => {
                alert(err);
              });
            /*{
        code: 'hYLK98jkf0m' //string authCode
    }*/
          },
          onFail: function(err) {}
        });
      });
    },
    //更换班级
    ddClickChangeDirection() {
      let _that = this;
       
      dd.ready(function() {
        dd.biz.util.chosen({
          source: [
            {
              key: "PHP01", //显示文本
              value: "PHP01班学习日报" //值，
            },
            {
              key: "PHP02",
              value: "PHP02班学习日报"
            },
            {
              key: "PHP03",
              value: "PHP03班学习日报"
            },
            {
              key: "PHP04",
              value: "PHP04班学习日报"
            },
            {
              key: "PHP05",
              value: "PHP05班学习日报"
            },
            {
              key: "MAD",
              value: "MAD班学习日报"
            },
            {
              key: "NET",
              value: "NET班学习日报"
            },
            {
              key: "UED",
              value: "UED班学习日报"
            },
            {
              key: "Java01",
              value: "Java01班学习日报"
            },
            {
              key: "Java02",
              value: "Java02班学习日报"
            },
            {
              key: "Java03",
              value: "Java03班学习日报"
            },
            {
              key: "Java04",
              value: "Java04班学习日报"
            }
          ],
          selectedKey: _that.direction, // 默认选中的key
          onSuccess: function(result) {
            _that.isShow = false;
            _that.isZhezhao = true;
            _that.giveLog = [];
            _that.classDetails = [];
            _that.ungiveLog = [];
            _that.direction = result.key;
            // alert(new Date(new Date().setHours(0, 0, 0, 0)).getTime());
            // new Date(new Date().setHours(0, 0, 0, 0)).getTime()// 获取当前时间戳
            Axios.post(`${_that._api}search`,{
              class_name: _that.direction,
              start_time: _that.startTime,
              end_time: _that.endTime
            }).then((res)=>{
              if(res.data.ok){
                  _that.giveLog = disposeGiveLogData(
                    res.data.member[0],
                    res.data.report
                  ); //获取已交信息
                  _that.classDetails = res.data.member[0]; //获取班级所有信息
                  _that.ungiveLog = getUnGiveDetailInfo(_that.classDetails,_that.giveLog);
                  _that.added_number = _that.giveLog.length;//已交人数
                  _that.unadded_number = _that.ungiveLog.length;//未交人数
                 _that.$set(_that.statisticalStruct.data[0],"value",_that.added_number);
                 _that.$set(_that.statisticalStruct.data[1],"value",_that.unadded_number);

                  _that.isShow = true;    //v-if强制刷新组件 
                  _that.isZhezhao = false;
                //  alert(_that.isZhezhao)
                    //我就震动一下
                 dd.device.notification.vibrate({
                    duration: 100, //震动时间，android可配置 iOS忽略
                    onSuccess : function(result) {
                      
                    },
                    onFail : function(err) {}
                })
                } else {
                  alert("数据获取失败!");
                }
            }).catch((err)=>{
              alert(err);
            })
            if (_that.$store.state.defaultClass === _that.direction) {
              
              _that.checked = true;
            } else {
              _that.checked = false;
            }
          },
          onFail: function(err) {}
        });
      });
    },
    //dd改变日期
    ddClickChangeDate() {
      let _that = this;
      dd.ready(function() {
        dd.biz.calendar.chooseOneDay({
          default: new Date().getTime(), //这里用getTime获取当前时间戳
          onSuccess: function(result) {
            let un = new Date(result.chosen);
            _that.date =
              un.getFullYear() +
              " / " +
              (un.getMonth() + 1) +
              " / " +
              un.getDate();
              // alert(new Date(new Date(result.chosen).setHours(0,0,0,0)).getTime());
               _that.isShow = false;
            _that.isZhezhao = true;
            // alert(new Date(new Date().setHours(0, 0, 0, 0)).getTime());
            // new Date(new Date().setHours(0, 0, 0, 0)).getTime()// 获取当前时间戳
              _that.giveLog = [];
            _that.classDetails = [];
            _that.ungiveLog = [];
            _that.startTime = new Date(new Date(result.chosen).setHours(0,0,0,0)).getTime();
            _that.endTime = new Date(new Date(result.chosen).setHours(23,59,59,0)).getTime();
            Axios.post(`${_that._api}search`,{
              class_name: _that.direction,
              start_time: _that.startTime,    //开始时间
              end_time: _that.endTime
            }).then((res)=>{
              if(res.data.ok){
                  _that.giveLog = disposeGiveLogData(
                    res.data.member[0],
                    res.data.report
                  ); //获取已交信息
                  _that.classDetails = res.data.member[0]; //获取班级所有信息
                  _that.ungiveLog = getUnGiveDetailInfo(_that.classDetails,_that.giveLog);
                  _that.added_number = _that.giveLog.length;//已交人数
                  _that.unadded_number = _that.ungiveLog.length;//未交人数
                 _that.$set(_that.statisticalStruct.data[0],"value",_that.added_number);
                 _that.$set(_that.statisticalStruct.data[1],"value",_that.unadded_number);
                  _that.isShow = true;    //v-if强制刷新组件 
                  _that.isZhezhao = false;
                      //我就震动一下
                 dd.device.notification.vibrate({
                    duration: 100, //震动时间，android可配置 iOS忽略
                    onSuccess : function(result) {
                      
                    },
                    onFail : function(err) {}
                })
                //  alert(_that.isZhezhao)
                } else {
                  alert("数据获取失败!");
                }
            }).catch((err)=>{
              alert(err);
            })
            //onSuccess将在点击确定之后回调
            /*{
            chosen:1494345600000,
            timezone:8
            }
            */
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
        }).then((res)=>{
          if(res.data.ok){
            this.$store.commit("changeDefaultClass", this.direction);
            this.youth.toast(`将${this.direction}设置为默认显示班级`);
          }
        });
      } else {
         Axios.post(`${this._api}changeDefault`, {
          userid: this.$store.state.userID,
          class_name: "PHP01"
        }).then((res)=>{
          if(res.data.ok){
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
    itemDetail (item) {
      
      this.isDetailData = true;
       this.detailData = [];
      this.detailData = item.contents;
      this.cursor = item.creator_name;
    },
    closeItemDetail () {
      this.isDetailData = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background: #fafafa;
  font-family: PingFangSC-Semibold;
  position:relative;
  z-index:1;
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
  position:fixed;
  top:0;
  width:100%;
  height:100%;
  background-color:rgba(255,255,255,1);
  bottom:0;
}
.path{
  width: 50px;
  height:50px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  animation: login infinite 1s linear;
}
.path1{
  width:13px;
  height:13px;
  background-color:red;
  border-radius:50%;
  margin:0 auto;
}
.path2{
  width:13px;
  height:13px;
  background-color:green;
  border-radius:50%;
}
.path3{
  width:13px;
  height:13px;
  background-color:blue;
  border-radius:50%;
 
}
.path4{
  width:13px;
  height:13px;
  background-color:orange;
  border-radius:50%;
 
  position:relative;
  bottom:-6px;
  margin:0 auto;
}
@keyframes login{
  0%{
    transform: rotate(0deg) scale(1);
  }
  25%{
    transform: rotate(90deg)scale(0.75);
  }
  50%{
    transform: rotate(180deg)scale(0.5);
  }
  75%{
    transform:rotate(270deg) scale(0.75);
  }
  100%{
    transform: rotate(360deg) scale(1);
   
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@font-face {
  font-family: 'iconfont';  /* project id 818416 */
  src: url('//at.alicdn.com/t/font_818416_9md6kki6y8.eot');
  src: url('//at.alicdn.com/t/font_818416_9md6kki6y8.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_818416_9md6kki6y8.woff') format('woff'),
  url('//at.alicdn.com/t/font_818416_9md6kki6y8.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_818416_9md6kki6y8.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.iconfont1{
    font-family:"iconfont" !important;
    font-size:25px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    color:#9e9e9e;
}
.iconfont3{
    font-family:"iconfont" !important;
    font-size:40px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.1px;
    -moz-osx-font-smoothing: grayscale;
  color:#9e9e9e;
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
.item-detail{
  position:fixed;
  z-index:99999;
  top:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.4);
  bottom:0;
  transition-duration: 0.5s;
}
.item{
  padding:20px;
  width: 95%;
  max-height:100%;
  overflow: auto;
  position: absolute;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color:#fff;
 
}
.item p{
  font-size:14px;
  color:#9e9e9e;
}
.item-class-op{
  padding-top:5px;
  padding-bottom:5px;
  max-width:200px;
  min-height:70px;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  font-size:14px;
}
/*go-away*/
.go-away-enter, /* .fade-leave-active below version 2.1.8 */ {
 transform: translate3d(0,0,0);

}
.go-away-enter-active, {
   transform: translate3d(150px,0,0);

}
.go-away-leave-active {
  opacity: 1;
}
.go-away-leave-to {
 opacity: 0;
  transition-duration:0.3s;
}
.side-column-enter-active {
    opacity: 1;
}
.side-column-leave-active {
 
  opacity: 0;
  transition-duration:0.3s;
}
.side-column-leave-to {
  transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0); /* Firefox 4 */
  -webkit-transform: translate3d(0, 0, 0); /* Safari 和 Chrome */
  -o-transform: translate3d(0, 0, 0); /* Opera */
}
.side-column-enter/* .fade-leave-active below version 2.1.8 */ {
 transform: translate3d(0, -80rem, 0);
  -moz-transform: translate3d(0, -80rem, 0); /* Firefox 4 */
  -webkit-transform: translate3d(0, -80rem, 0); /* Safari 和 Chrome */
  -o-transform: translate3d(0, -80rem, 0); /* Opera */
}
</style>
