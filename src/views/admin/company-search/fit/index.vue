<template>
  <CompanySearchFit @editChildEvent="edit" ref="child"></CompanySearchFit>
</template>

<script>

import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'
import '@/styles/common.css'
import * as moment from "moment/moment";
import CompanySearchFit from '@/components/CompanySearchFit.vue'

export default {
  components: {
    CompanySearchFit
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
        path: '/admin/edit/fit',
        query: { number:row.number,depDate:moment(row.depDate).format('YYYY-MM') }
      })
      window.open(route.href, '_blank');
    }
  },
  mounted(){
    
  }
}
</script>



