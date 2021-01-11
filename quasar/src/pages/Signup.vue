<template>
<div>
  <q-page class="flex flex-center">
    <div class="signup-title">
      <h5>Sign-up</h5>
    </div>
    <div>
      <div>
        <!-- <label for="username"> 아이디 : </label> -->
        <!-- <input type="text" id="username" v-model="credentials.username"> -->
        <q-input v-model="credentials.username" label="아이디" :dense="dense" />
      </div>
      <div>
        <!-- <label for="password"> 비밀번호 : </label> -->
        <!-- <input type="password" id="password" v-model="credentials.password"> -->
        <q-input type="password" v-model="credentials.password" label="비밀번호" :dense="dense" />
      </div>
      <div>
        <!-- <label for="passwordConfirmation"> 비밀번호 확인 : </label> -->
        <!-- <input type="password" id="passwordConfirmation" v-model="credentials.passwordConfirmation"> -->
        <q-input type="password" v-model="credentials.passwordConfirmation" label="비밀번호 확인" :dense="dense" />
      </div>
      <br>
      <!-- <button @click="signup(credentials)">가입하기</button> -->
      <q-btn @click="signup(credentials)" push color="primary" label="가입하기" />
    </div>
  </q-page>
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
      },
       dense: false
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
            this.$router.push({ path: '/login' })
          })
      } else {
        alert('작성된 비밀번호가 일치하지 않습니다.')
      }
    }
  }
}
</script>

<style scoped>
  .signup-title {
    margin-right: 30px;
  }
</style>