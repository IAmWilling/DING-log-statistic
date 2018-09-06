<template>
   <div class="zhezhao" v-show="isZhezhao" >
        <div class="path">
          <div class="path1 plp-yh"></div>
          <div style="display:flex; justify-content:space-between;margin-top:3px;">
            <div class="path2 plp-yh"></div>
            <div class="path3 plp-yh"></div>
          </div>
        <div class="path4 plp-yh" style=""></div>
        </div>
      </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
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
</style>
