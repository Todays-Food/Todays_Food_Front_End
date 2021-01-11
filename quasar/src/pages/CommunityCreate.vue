<template>
  <div>
    <div class="total column items-center">
    <!-- <div class="fit row wrap justify-center items-start content-start"> -->
      <div class="img"></div>
      <div>
        <h5 class="main-title text-h3 text-weight-bolder">게시글 {{id !== undefined ? '수정' : '쓰기'}}</h5>
      </div>
      <div class="title">
        <!-- <label class="title-label" for="title">제목 : </label>
        <input type="text" v-model.trim="title" @keypress.enter="communityCreate"><br/> -->
        <q-input v-model.trim="title" @keypress.enter="communityCreate" label="제목" :dense="dense" />
        <!-- <label class="content-label" for="content">내용 : </label>
        <input type="text" v-model.trim="content" @keypress.enter="communityCreate"> -->
        <q-input v-model.trim="content" @keypress.enter="communityCreate" label="내용" :dense="dense" />
        <!-- <button @click="communityCreate">+</button><br/> -->
        <!-- <button><a href="javascript:;" @click="index !== undefined ? updatePost() : communityCreate()" class="btn">{{index !== undefined ? '수정' : '작성'}}</a></button> -->
        <!-- <q-btn @click="index !== undefined ? updatePost() : communityCreate()"> label=""/> {{index !== undefined ? '수정' : '작성'}} -->
        <br>
        <q-btn @click="id !== undefined ? updatePost() : communityCreate()" push color="primary" label="작성하기" />
      </div>
    </div>           
  </div>
</template>

<script>
import axios from 'axios'

// const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'CommunityCreate',
  data() {
    const index = this.$route.params.id;
    const id = this.$route.query.id;
    return {
      index: index,
      // title: index !== undefined ? this.$route.query.title : '',
      // title: this.$route.query.id !== undefined ? title : '',
      title: id !== undefined ? this.$route.query.title : '',
      content: id !== undefined ? this.$route.query.content : '',
      user_id: '',
      created_at: '',
      updated_at: '',
      id: this.$route.query.id,
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
      this.$router.push({ path: '/list', query:this.body });
    },
    communityCreate: function () {
      const config = this.setToken()
      const communityData = {
        content_id: this.id,
        title: this.title,
        content: this.content,
        created_at: this.created_at,
        updated_at: this.updated_at,
        user_id: this.user_id,
      }
      if (communityData.title) {
        axios.post('http://127.0.0.1:8000/community/', communityData, config)
          .then((res) => {
            console.log(res)
            this.$router.push({ path: '/list' })
            console.log('리스트로 이동해야해!')
          })
          .catch((err) => {
            console.log(err)
            console.log('222')
            console.log('에러발생!!')
            console.log(communityData)
            console.log(this.index)
          })
      }
    },
    updatePost() {
      const index = this.$route.params.id;
      const config = this.setToken()
      // console.log(index)
      console.log(this.$route.query)
     
      this.$route.query.title = this.title
      this.$route.query.content = this.content
      const postContent = this.$route.query

      axios.put(`http://127.0.0.1:8000/community/${this.$route.query.id}/`, postContent, config)
        .then(() => {
          console.log(postContent)
          // this.$router.push({path:`/community/create/${this.$route.query.id}/`,query:postContent, params:postContent.id});
          this.$router.push({path: '/create', query:postContent, params:postContent.id});
          // TODO: 수정하기 오류 NavigationDuplicated
          alert('게시글 수정이 완료되었습니다.')
          // this.$router.push({path: '/list'})
        })
        .catch(() => {
          // console.log(err)
        })
      console.log(this.$route.query)
    }
  },
  created() {
    // console.log(index)
  }
}
</script>

<style scoped>
  .img {
    width: 100%;
    height: 200px;
    background-image: url(https://format-com-cld-res.cloudinary.com/image/private/s--yU5hjwQS--/c_limit,g_center,h_1200,w_65535/fl_keep_iptc.progressive,q_95/v1/1a734fc5206bed55cf9be93c30ed8e52/RamenFeatured-1.jpg);
    margin-bottom: 20px;
    background-size: cover;
  }
  .title {
    width: 500px;
  }

  .total {
    /* margin-top: 70px; */
  }

  .main-title {
    margin-top: 100px;
  }
</style>