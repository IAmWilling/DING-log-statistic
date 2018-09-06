<template>
  <div id="app" >
     <transition :name="transitionName">
    <keep-alive>
       
    <router-view class="child-view"/>
     
    </keep-alive>
        </transition> 
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-left',
      yo:false,
    }
  },
  mounted () {
  },
  //监听路由的路径，可以通过不同的路径去选择不同的切换效果
  watch: {
    '$route' (to, from) {
      if(to.path == '/'){
        this.transitionName = 'slide-right';
      }else if(to.path=="/RBTongJi"){
        if(this.yo){
          this.transitionName = 'slide-right';
          this.yo = false;
        }else{
          this.transitionName = 'slide-left';
        }
      }else if(to.path == "/RBdetail"){
        
        if(this.yo==false){
          this.transitionName = 'slide-left';
          this.yo = true;
        }else{
         
        }
       
      }
    }
  },
  
}
</script>

<style>
#app{
  user-select: none;
}

.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.6s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(25rem, 0);
  transform: translate(25rem, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-25rem, 0);
  transform: translate(-25rem, 0);
}
</style>
