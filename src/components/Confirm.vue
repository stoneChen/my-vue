<template>
  <Modal :is-show.sync="isShow">
    <div class="header" slot="header">{{title || '提示'}}</div>
    <div class="body" slot="body">{{content || '确认吗?'}}</div>
    <div class="footer" slot="footer">
      <button class="btn btn-primary pull-right" @click="ok">确定</button>
      <button class="btn btn-default pull-right" @click="cancel">取消</button>
    </div>
  </Modal>
</template>
<script>
  import Modal from './Modal.vue'

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
    components: {
      Modal
    },
    methods: {
      ok () {
        this.action()
        this.close()
      },
      cancel () {
        this.close()
      },
      close () {
        this.isShow = false
      }
    }
  }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .btn + .btn {
    margin-right: 10px;
  }
</style>
