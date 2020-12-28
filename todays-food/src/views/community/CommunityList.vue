<template>
  <div>
    <ul>
      <li v-for="(communityList, idx) in communityLists" :key="idx">
        <b>제목: </b><a href="javascript:;" @click="goToDetail(communityList)">{{ communityList.title }}</a><br>
        <b>내용: </b>{{ communityList.content }}
        <hr>
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
        .then((res) => {
          this.communityLists = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    goToDetail(communityList) {
      this.$router.push({path:`/community/detail/${communityList.id}/`, query:communityList})
      console.log(communityList)
    },

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