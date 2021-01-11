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
      좋아요: {{ this.like_users.msg }}<br>
      <button @click="likeCommunity">post</button>
      <button @click="likeStatus">get</button>
    </div>

    <!-- <div>
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
    </div> -->

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
    const user = this.$route.query.user
    // const userId = this.$route.query.user_id
    return {
      user_id: '',
      user: user,
      id: index,
      posts: posts,
      content: '',
      // comments: '',
      // commentId: Number,
      like_users: Boolean,
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
    // createComment: function () {
    //   const config = this.setToken()
    //   const commentItem = {
    //     content: this.content,
    //   }
    //   if (commentItem.content) {
    //     axios.post(`${SERVER_URL}/community/${this.id}/comments/`, commentItem, config)
    //       .then((res) => {
    //         console.log(res)
    //         this.content = ''
    //         this.getComment()
    //       })
    //       .catch((err) => {
    //         console.log(err)
    //       })
    //     }
    // },
    // getComment: function() {
    //   const config = this.setToken()
    //   axios.get(`${SERVER_URL}/community/${this.id}/comments/`, config)
    //     .then((res) => {
    //       console.log(res)
    //       this.comments = res.data
    //       console.log(this.id)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    // deleteComment: function (comment) {
    //   const config = this.setToken()
    //   const commentId = comment.id
    //   const reviewId = Number(this.id)
    //   console.log(reviewId)
    //   console.log(commentId)

    //   axios.delete(`${SERVER_URL}/community/${commentId}/comments/${reviewId}/`, config)
    //     .then(() => {
    //       this.getComment()
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       alert('본인 글이 아닙니다.')
    //     })
    // },
    likeCommunity() {
      const config = this.setToken()
      const postContent = this.$route.query
      // const postContent = this.$route.query.user
      // axios.post(`${SERVER_URL}/community/${this.$route.query.id}/like/`, config)
      axios.post(`${SERVER_URL}/community/${this.$route.query.id}/like/`, postContent, config)
        .then((res) => {
          if (this.like_users.msg === 'false') {
            res.data.msg = 'true'
          } else {
            res.data.msg = 'false'
          }
          this.like_users = res.data
          // console.log(res)
          console.log(postContent)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    likeStatus() {
      const config = this.setToken()
      // const postContent = this.$route.query
      axios.get(`${SERVER_URL}/community/${this.$route.query.id}/like/`, config)
        .then((res) => {
          const like = res.data
          this.like_users = like.msg
          console.log(this.like_users)
        })
        .catch((err) => {
          console.log(err)
          console.log('222')
        })
    },
  },
  created() {
    this.getComment()
    this.likeStatus()
  }
}


</script>

<style>

</style>