<template>
  <div>
    <div class="item-detail" >
        <div class="item">
           <div style="text-align:center;color:#03a9f4;font-size:17px;">{{this.$store.state.stuRiBo.cursor}}</div>
          <div v-for="(item,index) in this.$store.state.stuRiBo.detail" :key="index">
            <p style="padding-left:20px;">{{item.key}} <span style="color:red;">*</span></p>
            <div class="item-class-op">
              {{item.value}}
            </div>
          </div>
           <div style="text-align:center;width:100%;" >
              <div class="goTop" @click="goHomeBlack">
                  <span class="iconfont" style="line-height:55px;">&#xe60a;</span>
              </div>
           </div>
          </div>
         
        </div>
  </div>
</template>
<script>
export default {
  data(){
    return {

    }
  },
  methods:{
    goHomeBlack () {
      this.$router.back(-1);
    }
  }
}
</script>
<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 818416 */
  src: url('//at.alicdn.com/t/font_818416_n7sfte09z1h.eot');
  src: url('//at.alicdn.com/t/font_818416_n7sfte09z1h.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_818416_n7sfte09z1h.woff') format('woff'),
  url('//at.alicdn.com/t/font_818416_n7sfte09z1h.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_818416_n7sfte09z1h.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:17px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    color:rgba(255,255,255,1);
}
.item-detail{
  position:fixed;
  z-index:99999;

  top:0;
  min-width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.4);
  bottom:0;
  transition-duration: 0.5s;
}
.item{


    margin:0 auto;
  width: 100%;
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
  padding-left:20px;
  padding-bottom:5px;
  padding-right:20px;
  max-width:96%;
  min-height:70px;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  font-size:14px;
}
/*go-away*/
.goTop{
    z-index: 100;
  margin:0 auto;
    width: 55px;
    height: 55px;
    border-radius:50%;
    text-align: center;
    background-color:#3296FA;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 20px, rgba(0, 0, 0, 0.07) 0px 20px 40px;
 
    transition-duration: .3s;
}
</style>
