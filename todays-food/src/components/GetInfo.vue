<template>
  <div>
    <h3>GetInfo</h3>
      {{ weatherLists.location }} |
      {{ weatherLists.weather_summary }} |
      {{ weatherLists.now_temp }} |
      {{ weatherLists.dust }} |
      {{ weatherLists.little_dust }}<br>
      <br>

    <b>날씨에 따른 추천음식: {{ recommend }}</b><br>
    <br>
    <div v-for="(restaurant, idx) in restaurantsData" :key="idx">
      <li>가게 이름: {{ restaurant.title }}</li>
      <li>주소: {{ restaurant.address }}</li>
      <br>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GetInfo',
  props: {
    weatherLists: [Array, Object],
    restaurantsData: [Array, Object],
    recommend: String,
  },
}
</script>

<style>

</style>