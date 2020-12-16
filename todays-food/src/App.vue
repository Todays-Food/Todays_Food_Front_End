<template>
  <div id="app">
<<<<<<< HEAD
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1>test</h1>
=======
    <div>
      <router-link to="/signup">Sign-up</router-link> |
      <router-link to="/login">Log-in</router-link> |
      <router-link to="#">Log-out</router-link>
    </div>
    <router-view @login="login = true"/>
>>>>>>> features/account
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      login: false
    }
  },
  components: {

  },
  methods: {
    logout() {
      this.login = false
      localStorage.removeItem('jwt')
      this.$router.push({ name: 'Login' })
    }
  },
  created() {
    const token = localStorage.getItem('jwt')
 
    if (token) {
      this.login = true
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
