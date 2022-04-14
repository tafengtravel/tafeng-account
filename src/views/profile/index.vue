<template>
  <div class="dashboard-container">
    <div class="dashboard-text"></div>
    <el-form :model="form" :inline="true" label-position="left" label-width="70px" class="demo-ruleForm">
      <el-row :gutter="30">
        <div class="sub_title">基本資料</div>
      </el-row>
      <el-row :gutter="16">
        <el-form-item label="姓名">
          <span class="form-font-md font">{{form.name}}</span>
        </el-form-item>
        <el-form-item label="代號">
          <span class="form-font-md font">{{form.cs}}</span>
        </el-form-item>
        <el-form-item label="信箱">
          <span class="form-font-md font">{{form.mail}}</span>
        </el-form-item>
      </el-row>
      <el-row :gutter="30">
        <div class="sub_title">出缺勤紀錄</div>
      </el-row>
      <el-row :gutter="16">
        <el-form-item label="上班簽到" label-width="110px">
          <span class="form-font-md font" v-if="formRecord.entryTimeDisable || listLoading">已簽到</span>
          <el-button v-else @click="submit('entry')" type="primary">簽到</el-button>
        </el-form-item>
        <el-form-item label="下班簽到" label-width="110px">
          <span class="form-font-md font" v-if="formRecord.quitTimeDisable || listLoading" >已簽到</span>
          <el-button v-else @click="submit('quit')" type="success">簽到</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { email } from '@/db.js'
import { mapGetters } from 'vuex'
import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'
import axios from 'axios'
import * as moment from "moment/moment";
import '@/styles/common.css'


export default {
  name: 'Dashboard',
  data() {
    return {
      email:'',
      form:{},
      formRecord:{
        date:'',
        month:'',
        entryTime:'',
        quitTime:'',
        name:'',
        entryTimeDisable:'',
        quitTimeDisable:'',
      },
      listLoading:true,
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    async submit(type){
      const userIP = await axios.request('https://api.ipify.org?format=json').then(response => {
        return response.data.ip
      }).catch(function (error) {
        console.error(error);
      });
      if(userIP == '218.161.104.58'){
        if(type == 'entry'){
          this.formRecord = {...this.formRecord,
            entryTimeDisable:true,
            entryTime:moment(new Date()).format('HH:mm:ss'),
          }
        }else if(type == 'quit'){
          this.formRecord = {...this.formRecord,
            quitTimeDisable:true,
            quitTime:moment(new Date()).format('HH:mm:ss'),
          }
        }
        this.formRecord = {...this.formRecord,
          date:moment(new Date()).format('YYYY-MM-DD'),
          name:this.form.name,
          month:moment(new Date()).format('YYYY-MM'),
        }
        console.log(this.formRecord)

        let ref = db.collection('human-resources').doc(this.form.number).collection('record').doc(moment(new Date()).format('YYYY-MM-DD'))
        await ref.get().then(doc => { 
          ref.set(this.formRecord).then(() => {
            console.log('set data successful');
            this.$message.success('打卡成功');
            this.$router.push({ path: '/profile'})
          });
        })
      }else{
        this.$message.error('錯誤IP！請使用公司網路或電腦進行打卡！')
      }
      
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex%2 === 1) {
        return 'color-row';
      }
      return '';
    },
  },
  async mounted(){
    await firebaseApp.auth().onAuthStateChanged(user=>{
      if (user) {
        this.email = user.email
      }else{
        
      }
    });



    let ref = db.collection('human-resources')

    await ref.where('mail','==',this.email).where('active','==',true).get().then(querySnapshot => { //資料編排改變後 客服需改變
      querySnapshot.forEach(doc => {  
        this.form = doc.data()
        console.log(doc.data())
      }); 
      ref = db.collection('human-resources').doc(this.form.number).collection('record').doc(moment(new Date()).format('YYYY-MM-DD'))
      ref.get().then(doc => {
        this.formRecord = doc.data()  
        this.listLoading = false
      })
      
    });


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
