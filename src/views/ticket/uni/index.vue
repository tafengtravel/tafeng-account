<template>
  <div class="dashboard-container">
    
  </div>
</template>

<script>
import axios from 'axios'
import * as moment from "moment/moment";
import '@/styles/common.css'

export default {
  name: 'Dashboard',
  data() {
    return {
     
    }
  },
  computed: {
    
  },
  methods: {
    
  },
  async mounted(){

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
.sub_title{
  color: black;
  // font-family: Microsoft YaHei;
  // font-weight: 500;
}
.app-container {
  padding: 7px;
}
.form-font-md{
  font-family: 'Microsoft JhengHei';
}
</style>
<style>
@media (min-width: 768px){
  .el-message-box {
    width: 20%;
  }
}
@media (max-width: 768px) {
  .el-message-box {
    width: 90%;
  }
}
</style>
