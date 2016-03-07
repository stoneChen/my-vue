<template>
	<li >
		<p :class="{ 'editing': isEditing }">
			<button class="pull-right btn btn-danger btn-xs btn-raised" @click="delTodo()">&times;</button>
			<span class="todo-text" :class="{'completed': todo.isCompleted}" >
				<input type="checkbox" v-model="todo.isCompleted" @click= "toggleCompleted()" >
				<span @dblclick="startEditing()">{{todo.text}}</span>
			</span>
			<input class="edit-input" type="text"  v-model="editingText" v-todo-focus="editingText" @blur="completeEdit()">
		</p>
	</li>
</template>
<script type="text/babel">
  import store from 'store'
  import Vue from 'vue'

  export default {
    props: ['todo'],
    data () {
      return {
        isEditing: false,
        editingText: ''
      }
    },
    methods: {
      delTodo () {
        // this.del(this.todo)
        store.actions.deleteTodo(this.todo)
      },
      toggleCompleted () {
        // this.todo.isCompleted = !this.todo.isCompleted
        store.actions.toggleTodo(this.todo)
      },
      startEditing () {
        console.log('startEditing')
        this.isEditing = true
        this.editingText = this.todo.text
      },
      completeEdit () {
        console.log('completeEdit ')
        // this.todo.text = this.editingText
        // this.isEditing = false
        store.actions.editTodo(this.todo, this.editingText)
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
<style lang="sass" rel="stylesheet/scss">
  li {
    padding-top: 10px;
    margin: 10px 0;
    background-color: #fff;
    list-style: none;
    & + & {
      border-top: 1px solid #eee;
    }
  p {
    margin: 0;
  }
  }

  .todo-text {
    display: inline-block;
    height: 22px;
    line-height: 22px;
    // margin: 10px 1px;
    // cursor: pointer;
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
</style>
