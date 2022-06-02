<template>
  <DeadlineFit @editChildEvent="edit" ref="child"></DeadlineFit>
</template>

<script>

import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'
import '@/styles/common.css'
import * as moment from "moment/moment";
import DeadlineFit from '@/components/DeadlineFit.vue'

export default {
  components: {
    DeadlineFit
  },
  
  data() {
    return {
    }
  },
  created() {
    
  },
  methods: {
    edit(row){
      console.log(row)
      let route = this.$router.resolve({
        path: '/cs/edit',
        query: { number:row.number,depDate:moment(row.depDate).format('YYYY-MM') }
      })
      window.open(route.href, '_blank');
    }
  },
  mounted(){
    
  }
}
</script>



