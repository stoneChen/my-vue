import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import Home from './components/Home.vue'
import TodoManager from './components/TodoManager.vue'

Vue.use(VueRouter)

if (process.env.NODE_ENV !== 'prodction') {
  Vue.config.debug = true
}

const router = new VueRouter()

router.map({
  '/home': {
    name: 'home',
    component: Home
  },
  'todo': {
    name: 'todo',
    component: TodoManager
  }
})
.redirect({
  '*': '/home'
})
.start(App, '#app')
