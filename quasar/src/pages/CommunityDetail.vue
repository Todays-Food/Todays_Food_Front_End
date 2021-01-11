<template>
  <div class="total column items-center">
    <div>
      <h5>게시글 상세보기</h5>
    </div>
    <div>
      <b><label for="user">작성자: </label></b>
      {{ this.$route.query.user }}<br>
      <b><label for="title">제목: </label></b>
      {{ this.$route.query.title }}<br>
      <b><label for="content">내용: </label></b>
      {{ this.$route.query.content }}<br>
      <br>
      <q-btn-group push>
      <q-btn push label="목록" icon="assignment" @click="returnCommunityList" />
      <q-btn push label="삭제" icon="highlight_off" @click="deletePost" />
      <q-btn push label="수정" icon="create" @click="updatePost" />
    </q-btn-group>
      <!-- <button><a href="javascript:;" @click="returnCommunityList">목록</a></button>
      <button><a href="javascript:;" @click="deletePost">삭제</a></button>
      <button><a href="javascript:;" @click="updatePost">수정</a></button> -->
    </div>
    <br>
    <br>
    <div>
      <h6>댓글보기 [{{comments.length}}]</h6>
    </div>
    <div>
      <div v-for="(comment, idx) in comments" :key="idx">
        <q-icon name="face" /> {{ comment.user }} |
        No. {{ comment.id }} |
        <b>{{ comment.content }}</b>
        <q-btn class="delete_button" round color="primary" icon="delete_forever"  @click="deleteComment(comment)" />
        <!-- <button @click="deleteComment(comment)">댓글 삭제</button> -->
      </div>
    </div>
    <div>
      <!-- <input type="text" v-model.trim="content" @keypress.enter="createComment"> -->
      <!-- <button @click="createComment">댓글작성</button> -->
      <q-input v-model.trim="content" @keypress.enter="createComment" :dense="dense">
        <!-- <template v-slot:prepend> -->
          <!-- <q-icon name="event" /> -->
          <!-- <q-btn round color="primary" icon="forum" @click="createComment" /> -->
          <template v-slot:append>
            <q-icon name="forum" color="primary" @click="createComment"/>
          </template>
        <!-- </template> -->
        <!-- <q-btn round color="primary" icon="forum" @click="createComment" /> -->
      </q-input>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'
// const SERVER_URL = process.env.VUE_APP_SERVER_URL

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
      dense: false,
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
      this.$router.push({path: '/list', query:this.body});
    },
    deletePost() {
      const config = this.setToken()
      axios.delete(`http://127.0.0.1:8000/community/${this.$route.query.id}/`, config)
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
      axios.put(`http://127.0.0.1:8000/community/${this.$route.query.id}/`, postContent, config)
        .then(() => {
          console.log(postContent)
          // this.$router.push({path:`/community/create/${this.$route.query.id}/`,query:postContent, params:postContent.id});
          this.$router.push({path:'/create', query:postContent, params:postContent.id});
          console.log(postContent.content)
        })
        .catch((err) => {
          console.log(err)
          // console.log(user)
          alert('작성자 본인만 수정 가능합니다.')
        })
    },
    createComment: function () {
      const config = this.setToken()
      const commentItem = {
        content: this.content,
      }
      if (commentItem.content) {
        axios.post(`http://127.0.0.1:8000/community/${this.id}/comments/`, commentItem, config)
          .then((res) => {
            console.log(res)
            this.content = ''
            console.log('댓글 작성 중..?')
            this.getComment()
          })
          .catch((err) => {
            console.log(err)
          })
        }
    },
    getComment: function() {
      const config = this.setToken()
      axios.get(`http://127.0.0.1:8000/community/${this.id}/comments/`, config)
        .then((res) => {
          console.log(res)
          console.log('댓글 출력성공??')
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

      axios.delete(`http://127.0.0.1:8000/community/${reviewId}/comments/${commentId}/`, config)
        .then(() => {
          alert('댓글이 삭제되었습니다😉')
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

<style scoped>
  .delete_button {
    margin-left: 10px;
  }
</style>