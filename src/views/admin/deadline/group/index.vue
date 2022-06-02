<template>
  <DeadlineGroup @editChildEvent="edit" ref="child"></DeadlineGroup>
</template>

<script>

import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'
import '@/styles/common.css'
import * as moment from "moment/moment";
import DeadlineGroup from '@/components/DeadlineGroup.vue'

export default {
  components: {
    DeadlineGroup
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
        path: '/admin/edit/group',
        query: { number:row.number,depDate:moment(row.depDate).format('YYYY-MM') }
      })
      window.open(route.href, '_blank');
    }
  },
  mounted(){
    
  }
}
</script>



