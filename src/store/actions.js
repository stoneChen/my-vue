import {
  TODO_ADD,
  TODO_DELETE,
  TODO_EDIT,
  TODO_TOGGLE,
  TODO_TOGGLE_ALL,
  TODO_CLEAR_ALL,
  TODO_CLEAR_COMPLETED
} from './mutation-types'

export const addTodo = ({ dispatch }, text) => {
  dispatch(TODO_ADD, text)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('dddd')
    }, 500)
  })
}

export const deleteTodo = ({ dispatch }, todo) => {
  dispatch(TODO_DELETE, todo)
}

export const editTodo = ({ dispatch }, todo, text) => {
  dispatch(TODO_EDIT, todo, text)
}

export const toggleTodo = ({ dispatch }, todo) => {
  dispatch(TODO_TOGGLE, todo)
}

export const toggleAllTodo = ({ dispatch }, isCompleted) => {
  dispatch(TODO_TOGGLE_ALL, isCompleted)
}

export const clearAllTodo = ({ dispatch }) => {
  dispatch(TODO_CLEAR_ALL)
}

export const clearCompleted = ({ dispatch }) => {
  dispatch(TODO_CLEAR_COMPLETED)
}
