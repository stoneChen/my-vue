import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import { todosInitialState, todoMutations, TODO_LIST_KEY } from './modules/todo'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

Vue.config.debug = debug

const persistMiddleware = {
  onInit (state) {
    console.log('persistMiddleware', state)
  },
  onMutation (mutation, state) {
    window.localStorage.setItem(TODO_LIST_KEY, JSON.stringify(state.todos))
  }
}

const middlewares = [persistMiddleware]
debug && middlewares.push(Vuex.createLogger())

export default new Vuex.Store({
  state: {
    todos: todosInitialState
  },
  actions,
  mutations: [ todoMutations ],
  strict: debug,
  middlewares: middlewares
})
