import {
  TODO_ADD,
  TODO_DELETE,
  TODO_EDIT,
  TODO_TOGGLE,
  TODO_TOGGLE_ALL,
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

export const deleteTodo = makeAction(TODO_DELETE)

export const editTodo = makeAction(TODO_EDIT)

export const toggleTodo = makeAction(TODO_TOGGLE)

export const toggleAllTodo = makeAction(TODO_TOGGLE_ALL)

export const clearCompleted = makeAction(TODO_CLEAR_COMPLETED)

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
