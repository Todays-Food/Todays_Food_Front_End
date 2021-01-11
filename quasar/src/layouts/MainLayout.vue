<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-primary">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title @click="gotoSearch" style="cursor:pointer">
          Today's Food
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu😎
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: '회원가입',
    caption: '회원가입하기',
    icon: 'school',
    link: '/#/signup'
  },
  {
    title: '로그인',
    caption: '로그인하기',
    icon: 'code',
    link: '/#/login'
  },
  {
    title: '게시글 작성',
    caption: '게시글 쓰기',
    icon: 'chat',
    link: '/#/create'
  },
  // {
  //   title: '게시글 상세',
  //   caption: '게시글 상세보기',
  //   icon: 'record_voice_over',
  //   link: '/#/detail'
  // },
  {
    title: '게시판',
    caption: '게시글 리스트보기',
    icon: 'rss_feed',
    link: '/#/list'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Restaurant',
    caption: '레스토랑 추천 리스트',
    icon: 'favorite',
    link: '/#/restaurant'
  }
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  methods: {
    gotoSearch() {
      this.$router.push({path: '/'})
    }
  }
}
</script>
