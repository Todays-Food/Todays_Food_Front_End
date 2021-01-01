<template>
  <div>
    <div>
      <h1>Search</h1>
      <!-- {{ weatherLists.location }} |
      {{ weatherLists.weather_summary }} |
      {{ weatherLists.now_temp }} |
      {{ weatherLists.dust }} |
      {{ weatherLists.little_dust }}<br>

      <div v-for="(restaurant, idx) in restaurantsData" :key="idx">
      <li>가게 이름: {{ restaurant.title }}</li>
      <li>주소: {{ restaurant.address }}</li>
      </div> -->
      <div>
        <label for="weather-info">지역을 입력하세요 : </label>
        <input type="text" id="weather-info" v-model.trim="search" @keypress.enter="createList">
        <GetInfo 
        :weatherLists="weatherLists"
        :restaurantsData="restaurantsData"
        :recommend="recommend"
        />
      </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import GetInfo from '@/components/GetInfo'

export default {
  name: 'Search',
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
  }
}
</script>

<style>

</style>
