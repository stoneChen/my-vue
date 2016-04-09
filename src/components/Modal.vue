<template>
  <div>
    <div class="modal-wrapper" v-if="isShow" transition="modal">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">Default Header</slot>
        </div>
        <div class="modal-body">
          <slot name="body">Default Body</slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button class="btn btn-primary pull-right" @click="ok()">确定</button>
            <button class="btn btn-default pull-right" @click="cancel()">取消</button>
          </slot>
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
      },
      title: {
        type: String
      },
      content: {
        type: String
      },
      action: {
        type: Function,
        required: true
      }
    },
    data () {
      return {

      }
    },
    ready () {
//      debugger
      document.body.appendChild(this.$el)
    },
    methods: {
      ok () {
        console.log('ok')
        this.action()
        this.isShow = false
      },
      cancel () {
        console.log('cancel')
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
      padding: 20px 30px;
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
    &-enter, &-leave {
      opacity: 0;
      .modal-container {
        transform: translateY(-100px);
      }
    }
  }
  .btn + .btn {
    margin-right: 10px;
  }
</style>
