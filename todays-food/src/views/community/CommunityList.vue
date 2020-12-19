<template>
  <div>
    <ul>
      <li v-for="(communityList, idx) in communityLists" :key="idx">
        <b>제목: </b>{{ communityList.title }} <br>
        <b>내용: </b>{{ communityList.content }}
        <button @click="deleteCommunity(communityList)">X</button>
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
      // axios.get(`http://127.0.0.1:8000/community/`, config)
        .then((res) => {
          this.communityLists = res.data
        })
        .catch((err) => {
          console.log(err)
        })
      },
      deleteCommunity: function (communityList) {
        const config = this.setToken()
        axios.delete(`${SERVER_URL}/community/${communityList.id}/`, config)
          .then((res) => {
            console.log(res)
            const targetCommunityIdx = this.communityLists.findIndex((communityList) => {
              return communityList.id === res.data.id
            })
            this.communityLists.splice(targetCommunityIdx, 1)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      // updateCommunity: function (communityList) {

      // }


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