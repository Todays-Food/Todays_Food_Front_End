<template>
  <div>
    <div>
      <h1>Sign-up</h1>
    </div>
    <div>
      <div>
        <label for="username"> 아이디 : </label>
        <input type="text" id="username" v-model="credentials.username">
      </div>
      <div>
        <label for="password"> 비밀번호 : </label>
        <input type="password" id="password" v-model="credentials.password">
      </div>
      <div>
        <label for="passwordConfirmation"> 비밀번호 확인 : </label>
        <input type="password" id="passwordConfirmation" v-model="credentials.passwordConfirmation">
      </div>
      <button @click="signup(credentials)">가입하기</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',
  data() {
    return {
      credentials: {
        username: '',
        password: '',
        passwordConfirmation: ''
      }
    }
  },
  methods: {
    signup({ username, password, passwordConfirmation }) {
      const userData = {
        username,
        password,
        passwordConfirmation,
      }

      if (password === passwordConfirmation) {
        axios.post('http://127.0.0.1:8000/accounts/signup/', userData)
          .then(() => {
            this.$router.push({ name: 'Login' })
          })
      } else {
        alert('작성된 비밀번호가 일치하지 않습니다.')
      }
    }
  }
}
</script>

<style>

</style>