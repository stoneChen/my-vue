import {
  TODO_ADD,
  TODO_DELETE,
  TODO_EDIT,
  TODO_TOGGLE,
  TODO_TOGGLE_ALL,
  TODO_CLEAR_COMPLETED
} from '../mutation-types'

export const TODO_LIST_KEY = 'TODO_LIST'

const initialState = {
  all: JSON.parse(window.localStorage.getItem(TODO_LIST_KEY) || '[]')
}

const mutations = {
  [TODO_ADD] (state, text) {
    state.all.unshift({
      id: Date.now(),
      text: text,
      isCompleted: false
    })
  },
  [TODO_DELETE] (state, todo) {
    state.all.$remove(todo)
  },
  [TODO_EDIT] (state, todo, text) {
    todo.text = text
  },
  [TODO_TOGGLE] (state, todo) {
    todo.isCompleted = !todo.isCompleted
  },
  [TODO_TOGGLE_ALL] (state, isCompleted) {
    state.all.forEach(todo => {
      todo.isCompleted = isCompleted
    })
  },
  [TODO_CLEAR_COMPLETED] (state) {
    state.all = state.all.filter(todo => !todo.isCompleted)
  }
}

export default {
  state: initialState,
  mutations
}
