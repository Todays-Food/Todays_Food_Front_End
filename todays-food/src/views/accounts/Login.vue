<template>
  <div>
    <div>
      <h1>Login</h1>
    </div>
    <div>
      <div>
        <label for="username">아이디 : </label>
        <input type="text" id="username" v-model="credentials.username">
      </div>
      <div>
        <label for="user-password">비밀번호 : </label>
        <input type="password" id="user-password" v-model="credentials.password">
      </div>
      <button @click="login(credentials)">로그인하기</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name:'Login',
  data() {
    return {
      credentials: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    login({username, password}) {
      axios.post('http://127.0.0.1:8000/accounts/api-token-auth/', {username, password})
        .then(res => {
          localStorage.setItem('jwt', res.data.token)
          this.$emit('login')
          this.$router.push({ name: 'Home' })
        })
    }
  }
}
</script>

<style>

</style>