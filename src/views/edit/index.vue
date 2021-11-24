<template>
  <div class="dashboard-container">
    <div class="dashboard-text">帳號: {{ email }}</div>
  </div>
</template>

<script>
import { email } from '@/db.js'
import { mapGetters } from 'vuex'
import '@/db.js'


export default {
  name: 'Dashboard',
  data() {
    return {
      email:'',
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },mounted(){
    console.log(email)
    this.email = email
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
