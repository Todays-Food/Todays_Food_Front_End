<template>
  <q-page class="total column items-center">
  <!-- <q-page class="flex flex-center"> -->
    <div class="sub-title text-orange">
      당신을 위한 음식 추천 서비스
    </div>
    <div class="main-title text-h1 text-weight-bold text-white">
      Today's FOOD
    </div>
    <div class="text-body2 text-grey">
      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, <br> by injected humour, or randomised words which don't look even slightly believable. 
    </div>
    <q-input bg-color="white" class="search" color="orange" filled bottom-slots v-model="text" label="지역" v-model.trim="search" @keypress.enter="createList" counter clearable>
      <template v-slot:prepend>
        <q-icon name="place" />
      </template>
      <template v-slot:append>
        <q-icon name="search" />
      </template>
      <template v-slot:hint>
        <div class="text-white">지역을 입력해주세요!</div>
      </template>
    </q-input>
    <br>
    <div class="info" v-if="recommend">
      <GetInfo 
        :weatherLists="weatherLists"
        :restaurantsData="restaurantsData"
        :recommend="recommend"
        />
    </div>
      
  </q-page>
</template>

<script>
import axios from 'axios'
import GetInfo from 'components/GetInfo.vue'

export default {
  name: 'PageIndex',
  components: {
      GetInfo
  },
  data: function () {
    return {
      weatherLists: [],
      restaurantsData: [],
      search: '',
      recommend: '',
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
    createList: function () {
      const weatherItem = {
        search: this.search,
      }

      if (weatherItem.search) {
        axios.post(`http://127.0.0.1:8000/restaurants/search/`, weatherItem)
          .then((res) => {
            this.weatherLists = res.data[0].fields
            const location_data = res.data[0].fields.location
            console.log(location_data)
            const weather_summary_data = res.data[0].fields.weather_summary

            let food = ''
            if (weather_summary_data === '맑음') {
              food = '치킨'
            } else if (weather_summary_data === '눈') {
              food = '파스타'
            } else if (weather_summary_data === '비') {
              food = '파전'
            } else if (weather_summary_data === '구름많음') {
              food = '전골'
            } else if (weather_summary_data === '흐림') {
              food = '국밥'
            } else {
              food = '설렁탕'
            }
            this.recommend = food

            const allItem = {
              keyword: location_data + ' ' + food
            }
            console.log(allItem)
            if (allItem) {
              axios.post(`http://127.0.0.1:8000/restaurants/`, allItem)
                .then((response) => {
                  this.restaurantsData = response.data
                  console.log(response.data)

                })
                .catch((err) => {
                  console.log(err)
                })
            }
          })
          .catch((err) => {
            console.log(err)
            alert('지역 이름을 다시 입력해주세요.')
          })

      }
    },
  },
  created() {
    const search = this.search
    if (search) {
      this.region = true
    }
  }
}
</script>

<style scoped>
  .total {
    background-image: url(https://format-com-cld-res.cloudinary.com/image/private/s--yU5hjwQS--/c_limit,g_center,h_1200,w_65535/fl_keep_iptc.progressive,q_95/v1/1a734fc5206bed55cf9be93c30ed8e52/RamenFeatured-1.jpg);
  }
  .sub-title {
    margin-top: 230px;
    margin-bottom: 30px;
  }
  .main-title {
    margin-bottom: 40px;
    font-family: sans-serif;
  }

  .text-body2 {
    text-align: center;
    margin-bottom: 100px;
  }

  .search {
    width: 50%;
  }
  .title {
    margin-top: 200px;
    font-size: 100px;
  }
  .search-bar {
    width: 500px;
    height: 40px;
    border-radius: 30px;
    border-color: blue;
    /* margin-top: 300px; */
  }

  .search-bar-label {
    font-size: 12px;
    margin-bottom: 30px;
    /* margin-top: */
  }

  input:focus {
    outline: none;
  }

  .info {
    margin-top: 130px;
    margin-bottom: 200px;
  }
</style>

