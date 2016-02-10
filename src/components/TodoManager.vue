<template>
  <div class="container">
    <h1>This is the TodoManager page.</h1>
    <div class="col-md-6">
      <form class="form" @submit="onSubmit">
        <input type="text" v-model="newTodoText" placeholder="Input your new todo" class="form-control">
      </form>
      <ul>
        <li v-for="todo in filteredTodoList">
          <p>
            <button class="pull-right btn btn-danger btn-xs btn-raised" @click="del($index)">&times;</button>
            <span class="todo-text" :class="{'completed': todo.isCompleted}" @click="toggleCompleted(todo)">
            <input type="checkbox" v-model="todo.isCompleted"> {{todo.text}}</span>
          </p>
        </li>
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
  const TODO_LIST_KEY = 'TODO_LIST'

  export default {
    data () {
      return {
        filterType: 'SHOW_ALL',
        newTodoText: '',
        todoList: JSON.parse(window.localStorage.getItem(TODO_LIST_KEY))
      }
    },
    computed: {
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
        window.localStorage.setItem(TODO_LIST_KEY, JSON.stringify(ret))
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
      toggleCompleted (todo) {
        // debugger
        todo.isCompleted = !todo.isCompleted
      },
      del (index) {
        this.todoList.splice(index, 1)
      },
      clearCompleted () {
        this.todoList = this.todoList.filter(t => !t.isCompleted)
      }
    }
  }
</script>
<style lang="sass?outputStyle=expanded" scoped src="./todo-manager.scss">

</style>