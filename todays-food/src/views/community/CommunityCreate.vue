<template>
  <div>
    <h1>Community Create</h1>
    <input type="text" v-model.trim="title" @keypress.enter="communityCreate">
    <!-- <input type="text" v-model.trim="content" @keypress.enter="communityCreate"> -->
    <button @click="communityCreate">+</button>
  </div>
</template>

<script>
import axios from 'axios'

// const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'CommunityCreate',
  data: function () {
    return {
      title: '',
      content: '',
      created_at: '',
      updated_at: ''
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        headers: {
          Authorization: `JWT ${token}`
        }
      }
      return config
    },
    communityCreate: function () {
      const config = this.setToken()
      const communityData = {
        title: this.title,
        content: this.content,
        created_at: this.created_at,
        updated_at: this.updated_at,
      }
      if (communityData.title) {
        // axios.post(`${SERVER_URL}/community/`, communityData, config)
        axios.post(`http://127.0.0.1:8000/community/`, communityData, config)
          .then(() => {
            this.$router.push({ name: 'CommunityList' })
            console.log(11111)
          })
          .catch((err) => {
            console.log(err)
            console.log(2222)
          })
      }
    },
  }
}
</script>

<style>

</style>