<template>
	<li >
		<p :class="{ 'editing': isEditing }">
			<button class="pull-right btn btn-danger btn-xs btn-raised" @click="delTodo()">&times;</button>
			<span class="todo-text" :class="{'completed': todo.isCompleted}" >
				<input type="checkbox" v-model="todo.isCompleted" @click= "toggleCompleted(todo)" >
				<span @dblclick="startEditing(todo, $index)">{{todo.text}}</span>
			</span>
			<input class="edit-input" type="text" v-if="editingTodo" v-model="editingTodo.text" v-todo-focus="todo == editingTodo" @blur="completeEdit(todo, $index)">
		</p>
	</li>
</template>
<script>
  import Vue from 'vue'

  export default {
    props: ['todo', 'del'],
    data () {
      return {
        isEditing: false,
        editingText: ''
      }
    },
    methods: {
      delTodo () {
        this.del(this.todo)
      },
      toggleCompleted (todo) {
        todo.isCompleted = !todo.isCompleted
      },
      startEditing (todo, index) {
        console.log('startEditing')
        this.isEditing = true
        this.editingText = todo.text
      },
      completeEdit (todo, index) {
        console.log('completeEdit ', index)
        this.filteredTodoList.$set(index, Object.assign({}, todo, { isEditing: false, text: this.editingTodo.text }))
        this.isEditing = false
        this.editingText = ''
      }
    },
    directives: {
      'todo-focus': function (value) {
        if (!value) {
          return
        }
        var el = this.el
        Vue.nextTick(function () {
          el.focus()
        })
      }
    }
  }
</script>
<style lang="sass" scoped>
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
