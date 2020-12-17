<template>
  <div id="app">
    <div>
      <router-link to="/signup">Sign-up</router-link> |
      <router-link to="/login">Log-in</router-link> |
      <router-link to="#">Log-out</router-link> |
      
      <router-link to="/community">CommunityList</router-link> |
      <router-link to="/create">CommunityCreate</router-link>
    </div>
    <router-view @login="login = true"/>
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
