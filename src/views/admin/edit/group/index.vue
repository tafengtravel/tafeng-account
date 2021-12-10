<template>
  <div class="app-container">
    upload test
    <Upload ref="child"></Upload>
  </div>
</template>

<script>
import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'
import '@/styles/common.css'
import * as moment from "moment/moment";
import Upload from '@/components/Upload.vue'


export default {
  name: 'new',
  components: {
    Upload
  },
  data() {
    return {

    }
  },
  methods:{

  },
  computed: {
    
  },mounted(){

    
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
