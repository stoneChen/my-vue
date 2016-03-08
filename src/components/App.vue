<template>
  <div>
    <div class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand">Stone's Vue</a>
        </div>
        <div class="navbar-collapse collapse navbar-responsive-collapse">
          <ul class="nav navbar-nav">
            <li :class="{ 'active': $route.name === 'home' }"><a v-link="{ name: 'home'}">Home</a></li>
            <li :class="{ 'active': $route.name === 'todo' }"><a v-link="{ name: 'todo' }">Todo</a></li>
          </ul>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import store from 'store'
  // import 'bootstrap-material-design/dist/css/bootstrap-material-design.css'
  console.log(store)
  export default {
    store,
    components: {}
  }
</script>

<style>
</style>
