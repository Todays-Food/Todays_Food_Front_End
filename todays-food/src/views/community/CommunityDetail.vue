<template>
  <div>
    <h1>Get info</h1>
    <div>
      <b><label for="user">작성자: </label></b>
      {{ this.$route.query.user }}<br>
      <b><label for="title">제목: </label></b>
      {{ this.$route.query.title }}<br>
      <b><label for="content">내용: </label></b>
      {{ this.$route.query.content }}<br>
      <br>
      <button><a href="javascript:;" @click="returnCommunityList">목록</a></button>
      <button><a href="javascript:;" @click="deletePost">삭제</a></button>
      <button><a href="javascript:;" @click="updatePost">수정</a></button>
    </div>
    <div>
      <li v-for="(comment, idx) in comments" :key="idx">
        작성자: {{ comment.user }}
        댓글 번호: {{ comment.id }}
        댓글: {{ comment.content }}
        <br>
        <button @click="deleteComment(comment)">댓글 삭제</button>
      </li>
    </div>
    <div>
      <input type="text" v-model.trim="content" @keypress.enter="createComment">
      <button @click="createComment">댓글작성</button>

    </div>
  </div>
  
</template>

<script>
import axios from 'axios'
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'CommunityDetail',
  data() {
    const index = this.$route.query.id
    const posts = this.$route.query
    return {
      id: index,
      posts: posts,
      content: '',
      comments: '',
      commentId: Number,
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
      this.$router.push({path:'/community/', query:this.body});
    },
    deletePost() {
      const config = this.setToken()
      axios.delete(`${SERVER_URL}/community/${this.$route.query.id}/`, config)
        .then((res) => {
          console.log(res)
          this.returnCommunityList();
          alert("삭제되었습니다.")
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updatePost: function () {
      const config = this.setToken()
      const postContent = this.$route.query
      axios.put(`${SERVER_URL}/community/${this.$route.query.id}/`, postContent, config)
        .then(() => {
          console.log(postContent)
          this.$router.push({path:`/community/create/${this.$route.query.id}/`,query:postContent, params:postContent.id});
        })
        .catch((err) => {
          console.log(err)
          alert('작성자 본인만 수정 가능합니다.')
        })
    },
    createComment: function () {
      const config = this.setToken()
      const commentItem = {
        content: this.content,
      }
      if (commentItem.content) {
        axios.post(`${SERVER_URL}/community/${this.id}/comments/`, commentItem, config)
          .then((res) => {
            console.log(res)
            this.content = ''
            this.getComment()
          })
          .catch((err) => {
            console.log(err)
          })
        }
    },
    getComment: function() {
      const config = this.setToken()
      axios.get(`${SERVER_URL}/community/comments/`, config)
        .then((res) => {
          console.log(res)
          this.comments = res.data
          console.log(this.id)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteComment: function (comment) {
      const config = this.setToken()
      const commentId = comment.id
      const reviewId = Number(this.id)
      console.log(reviewId)
      console.log(commentId)

      axios.delete(`${SERVER_URL}/community/comments/${reviewId}/`, config)
        .then(() => {
          this.getComment()
        })
        .catch((err) => {
          console.log(err)
          alert('본인 글이 아닙니다.')
        })

    }

  },
  created() {
    this.getComment()
  }
}


</script>

<style>

</style>