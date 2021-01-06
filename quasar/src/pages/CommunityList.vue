<template>
  <div>
    <div class="total column items-center">
      <div>
        <h5>자유게시판</h5>
      </div>
      <!-- <div v-for="(communityList, idx) in communityLists" :key="idx">
        <b>제목: </b><a href="javascript:;" @click="goToDetail(communityList)">{{ communityList.title }}</a><br>
        <b>내용: </b>{{ communityList.content }}
        <hr>
      </div> -->
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="cards my-card bg-blue-1" v-for="(communityList, idx) in communityLists" :key="idx">
          <q-card-section>
            <!-- <div class="text-h6"><a href="javascript:;" @click="goToDetail(communityList)">{{ communityList.title }}</a></div> -->
            <div class="text-h6 text-blue-9">{{ communityList.title }}</div>

            <div class="text-subtitle2">{{ communityList.content }}</div>
          </q-card-section>
          <q-separator />
          <q-card-actions vertical>
            <q-btn flat @click="goToDetail(communityList)">글 보러가기</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

// const SERVER_URL = process.env.VUE_APP_SERVER_URL

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
      axios.get('http://127.0.0.1:8000/community/', config)
        .then((res) => {
          this.communityLists = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    goToDetail(communityList) {
      // this.$router.push({path: `/detail/${communityList.id}/`, query:communityList})
      console.log('여기들어왔나요?')
      // this.$router.push({path: `/detail/${communityList.id}/`, query:communityList})
      this.$router.push({path: '/detail', query:communityList})

      console.log('여기에는..?')
      console.log(communityList)
    },

  },
  created: function () {
    if (localStorage.getItem('jwt')) {
      this.getCommunityList()
    } else {
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style scoped>
  .cards {
    width: 200px;
    /* height: 100px; */
  }

  .total {
    margin-top: 80px;
  }
</style>