<template>
  <q-page class="flex flex-center">
    <div class="login-title">
      <h5>Login</h5>
    </div>
    <div>
      <div>
        <!-- <label for="username">아이디 : </label> -->
        <!-- <q-input standout v-model="credentials.username" label="아이디를 입력해주세요" /> -->
        <q-input v-model="credentials.username" label="아이디" :dense="dense" />
        <!-- <input type="text" id="username" v-model="credentials.username"> -->
      </div>
      <div>
        <!-- <label for="user-password">비밀번호 : </label> -->
        <!-- <input type="password" id="user-password" v-model="credentials.password"> -->
        <!-- <q-input standout v-model="credentials.password" label="비밀번호를 입력해주세요" /> -->
        <q-input type="password" v-model="credentials.password" label="비밀번호" :dense="dense" />
      </div>
      <br>
      <!-- <button @click="login(credentials)">로그인하기</button> -->
      <q-btn @click="login(credentials)" push color="primary" label="로그인" />
    </div>
  </q-page>
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
      },
      dense: false
    }
  },
  methods: {
    login({username, password}) {
      axios.post('http://127.0.0.1:8000/accounts/api-token-auth/', {username, password})
        .then(res => {
          localStorage.setItem('jwt', res.data.token)
          this.$emit('login')
          console.log(username)
          this.$router.push({ path: '/' })
        })
    }
  }
}
</script>

<style scoped>
  .login-title {
    margin-right: 30px;
  }
</style>