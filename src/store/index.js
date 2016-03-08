import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'
import todos, { TODO_LIST_KEY } from './modules/todo'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

Vue.config.debug = debug

const persistMiddleware = {
  onInit (state) {
    console.log('persistMiddleware', state)
  },
  onMutation (mutation, state) {
    window.localStorage.setItem(TODO_LIST_KEY, JSON.stringify(state.todos.all))
  }
}

const middlewares = [ persistMiddleware ]
debug && middlewares.push(createLogger)
console.log(todos)

export default new Vuex.Store({
  strict: debug,
  modules: {
    todos
  },
  middlewares: middlewares
})
