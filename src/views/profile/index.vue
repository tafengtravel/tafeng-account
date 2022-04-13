<template>
  <div class="dashboard-container">
    <div class="dashboard-text"></div>
    <el-form :model="form" :inline="true" label-position="left" label-width="70px" class="demo-ruleForm">
      <el-row :gutter="20">
        <div class="sub_title">帳號: {{email}}</div>
      </el-row>
      <el-row :gutter="20">
        <div class="sub_title">簽到</div>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { email } from '@/db.js'
import { mapGetters } from 'vuex'
import '@/db.js'
import { firebaseApp } from '@/db.js'
import axios from 'axios'
import '@/styles/common.css'

export default {
  name: 'Dashboard',
  data() {
    return {
      email:'',
      form:{},
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },async mounted(){
    firebaseApp.auth().onAuthStateChanged(user=>{
      if (user) {
        this.email = user.email
      }else{
        
      }
    });

    const userIP = await axios.request('https://api.ipify.org?format=json').then(response => {
      return response.data.ip
    }).catch(function (error) {
      console.error(error);
    });

    console.log(userIP)


    

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
}
.app-container {
  padding: 7px;
}
</style>
