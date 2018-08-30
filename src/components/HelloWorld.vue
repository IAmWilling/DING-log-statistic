<template>
  <div class="hello">
    <div class="date">
      <span class="date_time">{{ date }}</span>
      <span class="date_direction">{{ direction }}</span>
    </div>
    <p style="margin-left: 76%; color: #03a9f4; margin-bottom: 16px;">设为默认</p>
    <p @click="handleAddedShow" class="added">已交&nbsp;&nbsp;<span> {{added_number}} </span></p>
    <div v-show="showadded" class="added_detail">
      <div>
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
          v-bind:src="avatar"
          alt="avatar"
        >
      </div>
      <span class="added_detail_name">&nbsp;&nbsp;&nbsp;&nbsp;{{name}}</span>
    </div>
    <p @click="handleUnaddedShow" class="added">未交&nbsp;&nbsp;<span> {{added_number}} </span></p>
    <div v-show="showunadded" class="added_detail">
      <div>
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
          v-bind:src="avatar"
          alt="avatar"
        >
      </div>
      <span class="added_detail_name">&nbsp;&nbsp;&nbsp;&nbsp;{{name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      date: '2018 / 07 /09',
      direction: 'Mad',
      name: 'dizzy',
      added_number: '40',
      avatar: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=123308412,2828093194&fm=58',
      showadded: true,
      showunadded: true,
    }
  },
  methods: {
    handleAddedShow () {
      this.showadded  = !this.showadded
    },
    handleUnaddedShow () {
      this.showunadded = !this.showunadded
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background: #fafafa;
  font-family: PingFangSC-Semibold;
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
    width: 100%;
    height: 59px;
    padding-top: 37px;
    padding-left: 32px;
    background: #fff;
  }
  .added_detail_name {
    font-size: 16px;
    color: #212121;
  }
</style>
