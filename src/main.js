import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/app.vue'
import Home from './components/Home.vue'
import TodoManager from './components/TodoManager.vue'

Vue.use(VueRouter)

const router = new VueRouter()
// let rr = 1
// rr++

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
