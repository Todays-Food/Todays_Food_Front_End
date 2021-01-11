<template>
  <div>
    <!-- <div>
      <h6>오늘의 날씨</h6>
        {{ weatherLists.location }} |
        {{ weatherLists.weather_summary }} |
        {{ weatherLists.now_temp }} |
        {{ weatherLists.dust }} |
        {{ weatherLists.little_dust }}<br>
        <br>
      <br>
    </div> -->
    <div class="q-pa-md">
    <div class="bg-orange-7 text-white">
      <q-toolbar>
        <q-btn flat round dense icon="light_mode" />

        <q-toolbar-title>오늘의 날씨</q-toolbar-title>

        <q-btn flat round dense icon="sim_card" class="q-mr-xs" />
        <q-btn flat round dense icon="gamepad" />
      </q-toolbar>
      <q-toolbar inset>
        <q-breadcrumbs active-color="white" style="font-size: 16px">
          {{ weatherLists.location }} |
          {{ weatherLists.weather_summary }} |
          {{ weatherLists.now_temp }} |
          {{ weatherLists.dust }} |
          {{ weatherLists.little_dust }}
          <!-- <q-breadcrumbs-el label="Home" icon="home" /> {{ weatherLists.location }} |
          <q-breadcrumbs-el label="Home" icon="home" /> {{ weatherLists.weather_summary }} |
          <q-breadcrumbs-el label="Home" icon="home" /> {{ weatherLists.now_temp }} |
          <q-breadcrumbs-el label="Home" icon="home" /> {{ weatherLists.dust }} |
          <q-breadcrumbs-el label="Home" icon="home" /> {{ weatherLists.little_dust }} -->
        </q-breadcrumbs>
      </q-toolbar>
    </div>
  </div>
    <!-- <b>날씨에 따른 추천음식: {{ recommend }}</b><br> -->
    <!-- <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card col" v-for="(restaurant, idx) in restaurantsData" :key="idx">
        <img src="https://cdn.quasar.dev/img/mountains.jpg">

        <q-card-section>
          <div class="text-h6">{{ restaurant.title }}</div>
          <div class="text-subtitle2">{{ restaurant.address }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        {{ lorem }}
      </q-card-section>
    </q-card> -->
      <!-- <div class="col" v-for="(restaurant, idx) in restaurantsData" :key="idx">
        <div>{{ restaurant.title }}</div>
        <div>{{ restaurant.address }}</div>
        <br>
      </div> -->
    <!-- </div> -->
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card col" v-for="(restaurant, idx) in restaurantsData" :key="idx">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
          <q-btn
            fab
            color="indigo-14"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ restaurant.title }}
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <!-- <q-icon name="place" /> -->
              <!-- 250 ft -->
            </div>
          </div>

          <q-rating v-model="stars" :max="5" size="32px" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            {{ restaurant.category }}
          </div>
          <div class="text-caption text-grey">
            {{ restaurant.address }}
          </div>
        </q-card-section>

        <!-- <q-separator />

        <q-card-actions>
          <q-btn flat round icon="event" />
          <q-btn flat color="primary">
            Reserve
          </q-btn>
        </q-card-actions> -->
      </q-card>
    </div>
    <!-- <div class="row">
      <div class="col" v-for="(restaurant, idx) in restaurantsData" :key="idx">
        <div>{{ restaurant.title }}</div>
        <div>{{ restaurant.address }}</div>
        <br>
      </div>
    </div> -->
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
  data () {
    return {
      stars: 4,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  }
}
</script>

<style>

</style>