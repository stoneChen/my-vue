<template>
  <div class="container">
    <h1>This is the TodoManager page.</h1>
    <div class="col-md-6">
      <div class="clearfix">
        <input class="pull-left" type="checkbox" v-model="allDone">
        <div class="col-md-5">
          <form class="form" @submit="onSubmit">
            <input type="text" v-model="newTodoText" placeholder="Input your new todo" class="form-control">
          </form>
        </div>
      </div>
      
      <ul>
        <todo-item  v-for="todo in filteredTodoList" :todo="todo" :del="del"></todo-item>
      </ul>
      <p class="help-block" v-show="!filteredTodoList.length">There is no item to show</p>
      <footer v-show="todoList.length">
        <div class="pull-left"><span class="badge">{{leftCount}}</span> item{{leftCount > 1 ? 's' : ''}} left</div>
        <button class="pull-right btn btn-warning btn-xs" style="margin-left: 20px;" @click="clearCompleted">Clear Completed</button>
        <div class="pull-right">
          <input type="radio" name="filterType" v-model="filterType" value="SHOW_ALL"> All
          <input type="radio" name="filterType" v-model="filterType" value="SHOW_ACTIVE"> Active
          <input type="radio" name="filterType" v-model="filterType" value="SHOW_COMPLETED"> Completed
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
  import TodoItem from './TodoItem.vue'

  const TODO_LIST_KEY = 'TODO_LIST'

  export default {
    components: {
      TodoItem
    },
    data () {
      return {
        isEditing: false,
        editingTodo: null,
        filterType: 'SHOW_ALL',
        newTodoText: '',
        todoList: JSON.parse(window.localStorage.getItem(TODO_LIST_KEY) || '[]')
      }
    },
    watch: {
      todoList: {
        deep: true,
        handler: (todoList) => {
          // let todoList = this.todoList//不知为何，这句报错。。。
          window.localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList))
          console.log('saved')
        }
      }
    },
    computed: {
      allDone: {
        get: function () {
          return this.leftCount === 0
        },
        set: function (value) {
          this.todoList.forEach(function (todo) {
            todo.isCompleted = value
          })
        }
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
        // window.localStorage.setItem(TODO_LIST_KEY, JSON.stringify(ret))
        return ret
      }
    },
    methods: {
      onSubmit () {
        this.todoList.unshift({
          id: Date.now(),
          text: this.newTodoText,
          isCompleted: false
        })
        this.newTodoText = ''
      },
      del (todo) {
        this.filteredTodoList.$remove(todo)
      },
      clearCompleted () {
        this.todoList = this.todoList.filter(t => !t.isCompleted)
      }
    }
  }
</script>
<style lang="sass?outputStyle=expanded" scoped>
  input {
  //padding: 7px 12px;
  // &:f    ocus {
      //     box-shadow: none;
      // }
  }

  ul {
    padding: 0;
  }

  

  footer {
    border-top: 1px solid green;
    padding-top: 10px
  }

  // .checkbox-material {
     //     display: inline-block;
     //     cursor: pointer;
     // }
  .btn-group {
    margin: 0;
  }

</style>