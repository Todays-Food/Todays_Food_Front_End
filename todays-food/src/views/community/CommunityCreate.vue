<template>
  <div>
    <h1>Community Create</h1>
    <h1 class="main-title">게시글 {{index !== undefined ? '수정' : '쓰기'}}</h1>
    <ul>
      <label class="title-label" for="title">제목 : </label>
      <input type="text" v-model.trim="title" @keypress.enter="communityCreate"><br/>
      <label class="content-label" for="content">내용 : </label>
      <input type="text" v-model.trim="content" @keypress.enter="communityCreate">
      <button @click="communityCreate">+</button><br/>
      <button><a href="javascript:;" @click="index !== undefined ? updatePost() : communityCreate()" class="btn">{{index !== undefined ? '수정' : '작성'}}</a></button>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'CommunityCreate',
  data() {
    const index = this.$route.params.id;
    return {
      index: index,
      title: index !== undefined ? this.$route.query.title : '',
      content: index !== undefined ? this.$route.query.content : '',
      // user_id: '',
      created_at: '',
      updated_at: '',
      // id: this.$route.query.id,
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
    returnCommunityList(){
      this.$router.push({path:'/CommunityList/', query:this.body});
    },
    communityCreate: function () {
      const config = this.setToken()
      const communityData = {
        // content_id: this.id,
        title: this.title,
        content: this.content,
        created_at: this.created_at,
        updated_at: this.updated_at,
        // user_id: this.user_id,
      }
      if (communityData.title) {
        axios.post(`${SERVER_URL}/community/`, communityData, config)
          .then((res) => {
            console.log(res)
            this.$router.push({ name: 'CommunityList' })
          })
          .catch((err) => {
            console.log(err)
            console.log('222')
            console.log(communityData)
            console.log(this.index)
          })
      }
    },
    updatePost() {
      const index = this.$route.params.id;
      const config = this.setToken()
      console.log(index)
      console.log(this.$route.query)
     
      this.$route.query.title = this.title
      this.$route.query.content = this.content
      const postContent = this.$route.query

      axios.put(`${SERVER_URL}/community/${this.$route.query.id}/`, postContent, config)
        .then(() => {
          console.log(postContent)
          this.$router.push({path:`/community/create/${this.$route.query.id}/`,query:postContent, params:postContent.id});
          alert('게시글 수정이 완료되었습니다.')
          this.$router.push({name: 'CommunityList'})
        })
        .catch((err) => {
          console.log(err)
        })
      console.log(this.$route.query)
    }
  }
}
</script>

<style>

</style>