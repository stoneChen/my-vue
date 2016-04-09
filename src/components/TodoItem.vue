<template>
  <li transition="slide">
    <p :class="{ 'editing': isEditing }">
      <button class="pull-right btn btn-danger btn-xs btn-raised" @click="onDel">&times;</button>
			<span class="todo-text" :class="{'completed': todo.isCompleted}">
				<input type="checkbox" v-model="todo.isCompleted" @click="toggleCompleted">
				<span @dblclick="startEditing">{{todo.text}}</span>
			</span>
      <input class="edit-input" type="text" v-model="editingText" v-todo-focus="editingText" @blur="completeEdit">
    </p>
    <Confirm :is-show.sync="isShowConfirm" :content="confirmContent" :action="doDel"></Confirm>
  </li>
</template>
<script type="text/babel">
  import Vue from 'vue'
  import Confirm from './Confirm.vue'
  import {deleteTodo, toggleTodo, editTodo} from 'store/actions'

  export default {
    props: [ 'todo' ],
    data () {
      return {
        isEditing: false,
        editingText: '',
        isShowConfirm: false,
        confirmContent: `确认删除[${this.todo.text}]吗?`
      }
    },
    vuex: {
      actions: {
        deleteTodo,
        toggleTodo,
        editTodo
      }
    },
    components: {
      Confirm
    },
    methods: {
      onDel () {
        this.isShowConfirm = true
      },
      doDel () {
        this.deleteTodo(this.todo)
      },
      toggleCompleted () {
        this.toggleTodo(this.todo)
      },
      startEditing () {
        this.isEditing = true
        this.editingText = this.todo.text
      },
      completeEdit () {
        this.editTodo(this.todo, this.editingText)
        this.editingText = ''
      }
    },
    directives: {
      'todo-focus': function (value) {
        if (!value) {
          return
        }
        Vue.nextTick(() => {
          this.el.focus()
        })
      }
    }
  }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  li {

    background-color: #fff;
    list-style: none;
    & + & {
      border-top: 1px solid #eee;
    }
    p {
      /*padding-top: 10px;*/
      margin: 10px 0;
    }
  }

  .todo-text {
    display: inline-block;
    height: 22px;
    line-height: 22px;
    &.completed {
      text-decoration: line-through;
    }
  }

  .edit-input {
    display: none;
  }

  .editing {
    .todo-text {
      display: none;
    }
    .edit-input {
      display: inline;
    }
  }

  /*.slide-transition {
    transition: all .3s;
    !*transform: none;*!
    height: 33px;
  }

  .slide-enter, .slide-leave {
    transform: translateX(-100%);
    height: 0;
  }*/
  .slide-transition {
    /*transition: all .6s;*/
    overflow: hidden;
  }

  .slide-enter {
    animation: slide-in .6s;
  }

  .slide-leave {
    animation: slide-out .6s;
  }

  @keyframes slide-out {
    0% {
      transform: translateX(0);
      height: 42px;
    }

    50% {
      transform: translateX(-150%);
      height: 42px;
    }

    100% {
      transform: translateX(-150%);
      height: 0;
    }
  }

  @keyframes slide-in {
    0% {
      transform: translateX(-150%);
      height: 0;
    }

    50% {
      transform: translateX(-150%);
      height: 42px;
    }

    100% {
      transform: translateX(0%);
      height: 42px;
    }
  }
</style>
