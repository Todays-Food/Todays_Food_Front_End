<template>
  <div>
    <ul>
      <li v-for="(communityList, idx) in communityLists" :key="idx">
        
      </li>

    </ul>
  </div>
</template>

<script>
import axios from 'axios'

const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'CommunityList',
  data: function () {
    return {
      communityLists: [],
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
    getCommunityList: function () {
      const config = this.setToken()
      axios.get(`${SERVER_URL}/community/`, config)
    }
  },
  created: function () {
    if (localStorage.getItem('jwt')) {
      this.getCommunityList()
    } else {
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style>

</style>