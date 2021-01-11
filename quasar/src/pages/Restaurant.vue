<template>
  <q-page class="flex flex-center">
    <!-- {{ message }} -->
    <q-input color="orange" standout bottom-slots v-model="text" label="지역" counter clearable>
        <template v-slot:prepend>
          <q-icon name="place" />
        </template>
        <!-- <template v-slot:append>
          <q-icon name="favorite" />
        </template> -->

        <template v-slot:hint>
          지역을 입력해주세요!
        </template>
      </q-input>
  </q-page>
</template>

<script>
import axios from 'axios'
// import GetInfo from '@/components/GetInfo'

export default {
  name: 'Restaurant',
  data() {
    return {
      message: '레스토랑 검색??!!'
    }
  }
}
</script>