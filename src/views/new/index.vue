<template>
  <div class="app-container">
    <Input></Input>
  </div>
</template>

<script>
import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'
import '@/styles/common.css'
import * as moment from "moment/moment";
import Input from '@/components/Input.vue'


export default {
  name: 'new',
  components: {
    Input
  },
  data() {
    return {

    }
  },
  computed: {
    
  },mounted(){

    // this.email = firebaseApp.auth().currentUser.email
  }
  
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
