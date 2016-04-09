<template>
  <div class="container">
    <h1>This is the TodoManager page.</h1>
    <div class="col-md-6">
      <div class="clearfix">

        <input class="toggle-all" type="checkbox" :checked="allDone" @change="toggleAllTodo(!allDone)">
        <div class="col-md-5">
          <form class="form" @submit="onSubmit">
            <input type="text" v-model="newTodoText" placeholder="Input your new todo" class="form-control">
          </form>
        </div>
      </div>

      <ul>
        <todo-item v-for="todo in filteredTodoList" :todo="todo" :del="del" transition="slide"></todo-item>
      </ul>
      <p class="help-block" v-show="!filteredTodoList.length" transition="expand">There is no item to show</p>
      <footer v-show="todoList.length">
        <div class="pull-left"><span class="badge">{{leftCount}}</span> item{{leftCount > 1 ? 's' : ''}} left</div>
        <button class="pull-right btn btn-warning btn-xs" style="margin-left: 20px;" @click="onClearCompleted">Clear
          Completed
        </button>
        <div class="pull-right">
          <input type="radio" name="filterType" v-model="filterType" value="SHOW_ALL"> All
          <input type="radio" name="filterType" v-model="filterType" value="SHOW_ACTIVE"> Active
          <input type="radio" name="filterType" v-model="filterType" value="SHOW_COMPLETED"> Completed
        </div>
      </footer>
    </div>
  </div>
  <Modal :is-show.sync="isShowModal" :action="doClearCompleted">
    <div class="header" slot="header">{{confirmTitle}}</div>
    <div class="body" slot="body">{{confirmContent}}</div>
  </Modal>
</template>

<script type="text/babel">
  import TodoItem from './TodoItem.vue'
  import Modal from './Modal.vue'
  import {addTodo, toggleAllTodo, clearCompleted} from 'store/actions'

  export default {
    data () {
      return {
        filterType: 'SHOW_ALL',
        newTodoText: '',
        isShowModal: false,
        confirmTitle: '提示',
        confirmContent: '确认清空已完成的任务吗'
      }
    },
    vuex: {
      getters: {
        todoList: state => {
          return state.todos.all
        }
      },
      actions: {
        addTodo,
        toggleAllTodo,
        clearCompleted
      }
    },
    components: {
      TodoItem,
      Modal
    },
    computed: {
      allDone () {
        return this.leftCount === 0
      },
      leftCount () {
        return this.todoList.filter(todo => !todo.isCompleted).length
      },
      filteredTodoList () {
        let ret
        switch (this.filterType) {
          case 'SHOW_ALL':
            ret = this.todoList
            break
          case 'SHOW_COMPLETED':
            ret = this.todoList.filter(t => t.isCompleted)
            break
          case 'SHOW_ACTIVE':
            ret = this.todoList.filter(t => !t.isCompleted)
            break
          default:
            ret = this.todoList
        }
        return ret
      }
    },
    methods: {
      onSubmit () {
        this.addTodo(this.newTodoText).then((data) => {
          console.log(data)
          console.log('addTodo succeed')
        })
        this.newTodoText = ''
      },
      onClearCompleted () {
        this.isShowModal = true
      },
      doClearCompleted () {
        this.clearCompleted()
      }
    }
  }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  .toggle-all {
    position: absolute;
    top: 8px;
    z-index:10;
  }

  ul {
    padding: 0;
  }

  footer {
    border-top: 1px solid green;
    padding-top: 10px
  }

  .btn-group {
    margin: 0;
  }
  /* 必需 */
  .expand-transition {
    transition: all .3s ease;
    height: 30px;
    overflow: hidden;
  }

  /* .expand-enter 定义进入的开始状态 */
  /* .expand-leave 定义离开的结束状态 */
  .expand-enter, .expand-leave {
    height: 0;
    opacity: 0;
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
