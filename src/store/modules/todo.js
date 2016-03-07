import {
  TODO_ADD,
  TODO_DELETE,
  TODO_EDIT,
  TODO_TOGGLE,
  TODO_TOGGLE_ALL,
  TODO_CLEAR_ALL
} from '../mutation-types'

export const TODO_LIST_KEY = 'TODO_LIST'

export const todosInitialState = JSON.parse(window.localStorage.getItem(TODO_LIST_KEY) || '[]')

export const todoMutations = {
  [TODO_ADD] (state, text) {
    state.todos.unshift({
      id: Date.now(),
      text: text,
      isCompleted: false
    })
  },
  [TODO_DELETE] (state, todo) {
    state.todos.$remove(todo)
  },
  [TODO_EDIT] (state, todo, text) {
    todo.text = text
  },
  [TODO_TOGGLE] (state, todo) {
    todo.isCompleted = !todo.isCompleted
  },
  [TODO_TOGGLE_ALL] (state, isCompleted) {
    state.todos.forEach(todo => {
      todo.isCompleted = isCompleted
    })
  },
  [TODO_CLEAR_ALL] (state) {
    state.todos.fliter(todo => !todo.isCompleted)
  }
}
