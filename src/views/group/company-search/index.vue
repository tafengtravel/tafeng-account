<template>
  <CompanySuggestGroup @editChildEvent="edit" ref="child"></CompanySuggestGroup>
</template>

<script>

import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'
import '@/styles/common.css'
import * as moment from "moment/moment";
import CompanySuggestGroup from '@/components/CompanySuggestGroup.vue'

export default {
  components: {
    CompanySuggestGroup
  },
  
  data() {
    return {
      listLoading: false,
      itemData:[],
      company:'',
      payTotal:0,
    }
  },
  created() {
    
  },
  methods: {
    edit(row){
      console.log(row)
      let route = this.$router.resolve({
        path: '/group/edit',
        query: { number:row.number,depDate:moment(row.depDate).format('YYYY-MM') }
      })
      window.open(route.href, '_blank');
    }
  },
  mounted(){
    
  }
}
</script>



