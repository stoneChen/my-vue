<template>
  <div>
    <div class="modal-wrapper" v-if="isShow" transition="modal" @click="close">
      <div class="modal-container" @click="stopEvent">
        <div class="modal-header">
          <slot name="header">Default Header</slot>
        </div>
        <div class="modal-body">
          <slot name="body">Default Body</slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">Default Footer</slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        required: true,
        twoWay: true
      }
    },
    data () {
      return {

      }
    },
    ready () {
      document.body.appendChild(this.$el)
    },
    beforeDestroy () {//
      document.body.removeChild(this.$el)
    },
    methods: {
      stopEvent (e) {
        e.stopPropagation()
      },
      close () {
        this.isShow = false
      }
    }
  }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .modal {
    &-wrapper{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, .65);
      transition: all .4s;
    }
    &-container {
      width: 400px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .4s;
    }
    &-header {
      /*padding: 20px 0;*/
      font-size: 18px;
      color: #286090;
    }
  }
  /*transition*/
  .modal{
    &-enter, &-leave {// 这两有两种方式实现动画
      /*opacity: 0;*/
      background-color: rgba(0, 0, 0, 0);
      .modal-container {
        transform: translateY(-50px);
        opacity: 0;
      }
    }
  }
</style>
