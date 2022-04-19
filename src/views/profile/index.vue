<template>
  <div class="dashboard-container">
    <div class="dashboard-text"></div>
    <el-form :model="form" :inline="true" label-position="left" label-width="70px" class="demo-ruleForm">
      <el-row :gutter="30">
        <div class="sub_title">基本資料</div>
      </el-row>
      <el-row :gutter="16">
        <el-form-item label="姓名">
          <el-skeleton style="width: 240px" :loading="listLoading" animated>
            <template slot="template">
              <el-skeleton-item variant="text" style="width: 40%;"/>
            </template>
            <template>
              <span class="form-font-md font">{{form.name}}</span>
            </template>
          </el-skeleton>
        </el-form-item>
        <el-form-item label="代號">
          <el-skeleton style="width: 240px" :loading="listLoading" animated>
            <template slot="template">
              <el-skeleton-item variant="text" style="width: 60%;"/>
            </template>
            <template>
              <span class="form-font-md font">{{form.cs}}</span>
            </template>
          </el-skeleton>
        </el-form-item>
        <el-form-item label="信箱">
          <el-skeleton style="width: 240px" :loading="listLoading" animated>
            <template slot="template">
              <el-skeleton-item variant="text" style="width: 80%;"/>
            </template>
            <template>
              <span class="form-font-md font">{{form.mail}}</span>
            </template>
          </el-skeleton>
        </el-form-item>
      </el-row>
      <el-row :gutter="16">
        <el-form-item label="日期">
          <el-skeleton style="width: 240px" :loading="listLoading" animated>
            <template slot="template">
              <el-skeleton-item variant="text" style="width: 80%;"/>
            </template>
            <template>
              <span class="form-font-md font">{{date}}</span>
            </template>
          </el-skeleton>
        </el-form-item>
        <el-form-item label="上班簽到" label-width="110px">
          <el-skeleton style="width: 200px" :loading="listLoading" animated>
            <template slot="template">
              <el-skeleton-item variant="text" style="width: 80%;"/>
            </template>
            <template>
              <span class="form-font-md font" v-if="formRecord.entryTimeDisable || listLoading">{{formRecord.entryTime}}</span>
              <el-button v-else @click="submitCheck('entry')" type="success">簽到</el-button>
            </template>
          </el-skeleton>
        </el-form-item>
        <el-form-item label="下班簽到" label-width="110px">
          <el-skeleton style="width: 200px" :loading="listLoading" animated>
            <template slot="template">
              <el-skeleton-item variant="text" style="width: 80%;"/>
            </template>
            <template>
              <span class="form-font-md font" v-if="formRecord.quitTimeDisable || listLoading" >{{formRecord.quitTime}}</span>
              <el-button v-else @click="submitCheck('quit')" type="success">簽到</el-button>
            </template>
          </el-skeleton>
        </el-form-item>
      </el-row>
      <el-row :gutter="30">
        <div class="sub_title">出缺勤紀錄</div>
      </el-row>
      <el-row :gutter="16">
        <el-form-item label="月份" label-width="70px">
          <el-date-picker type="month" value-format="yyyy-MM" placeholder="選擇日期" v-model="monthSearch" style="width: 160px;"></el-date-picker>
        </el-form-item>
          <el-button @click="searchRecord()" type="primary" :loading="listLoading">搜尋</el-button>
      </el-row>
    </el-form>
    <el-table v-loading="listLoading" :data="itemData" :default-sort = "{prop: 'date',order: 'ascending'}" :row-class-name="tableRowClassName" empty-text="沒有資料">
      <el-table-column type="index" label="筆數" width='75%' fixed></el-table-column>
      <el-table-column prop="date" label="日期" width='140%' sortable :sort-method = "(a,b)=>{return a.date - b.date}"></el-table-column>
      <el-table-column prop="week" label="星期" width='140%' sortable :sort-method = "(a,b)=>{return a.date - b.date}"></el-table-column>
      <el-table-column prop="name" label="姓名" sortable :sort-method = "(a,b)=>a.name.localeCompare(b.name)"></el-table-column>
      <el-table-column prop="entryTime" label="上班時間" width='140%' sortable :sort-method = "(a,b)=>{return a.entryTime - b.entryTime}"></el-table-column>
      <el-table-column prop="quitTime" label="下班時間" width='140%' sortable :sort-method = "(a,b)=>{return a.quitTime - b.quitTime}"></el-table-column>
    </el-table>
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
import DeviceDetector from "device-detector-js";


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
        entryDevice:{},
        quitDevice:{},
      },
      listLoading:true,
      date:moment(new Date()).format('YYYY-MM-DD'),
      itemData:[],
      monthSearch:moment(new Date()).format('YYYY-MM'),
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    searchRecord(){
      let ref = db.collection('human-resources').doc(this.form.number).collection('record')
      ref.where('month','==',this.monthSearch).onSnapshot(querySnapshot => { 
        this.itemData.splice(0,this.itemData.length)//資料編排改變後 客服需改變
        querySnapshot.forEach(doc => {  
          this.itemData.push({...doc.data(),'week':moment(doc.data().date).locale('zh-TW').format('dddd')})
        }); 
      });
    },
    async readRecord(){
      let ref = db.collection('human-resources').doc(this.form.number).collection('record').doc(moment(new Date()).format('YYYY-MM-DD'))
      await ref.onSnapshot(doc => {
        this.formRecord = {...this.formRecord,...doc.data()}
        this.listLoading = false
      })
    },
    submitCheck(type){
      this.$confirm('是否進行打卡簽到', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.submit(type)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消簽到'
        });          
      });
    },
    async submit(type){
      const userIP = await axios.request('https://api.ipify.org?format=json').then(response => {
        return response.data.ip
      }).catch(function (error) {
        console.error(error);
      });
      if(userIP == '1.173.121.137'){
        if(type == 'entry'){
          this.formRecord = {...this.formRecord,
            entryTimeDisable:true,
            entryTime:moment(new Date()).format('HH:mm:ss'),
            entryDevice:new DeviceDetector().parse(window.navigator.userAgent).device,
          }
        }else if(type == 'quit'){
          this.formRecord = {...this.formRecord,
            quitTimeDisable:true,
            quitTime:moment(new Date()).format('HH:mm:ss'),
            quitDevice:new DeviceDetector().parse(window.navigator.userAgent).device,
          }
        }
        this.formRecord = {...this.formRecord,
          date:moment(new Date()).format('YYYY-MM-DD'),
          name:this.form.name,
          month:moment(new Date()).format('YYYY-MM'),
        }

        let ref = db.collection('human-resources').doc(this.form.number).collection('record').doc(moment(new Date()).format('YYYY-MM-DD'))
        ref.set(this.formRecord).then(() => {
          console.log('set data successful');
          this.$message.success('打卡成功');
          this.$router.push({ path: '/profile'})
        });
      }else{
        this.$message.error('IP錯誤！請使用公司WIFI或電腦進行打卡！')
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
      }
    });

    let ref = db.collection('human-resources')
    await ref.where('mail','==',this.email).where('active','==',true).get().then(querySnapshot => { //資料編排改變後 客服需改變
      querySnapshot.forEach(doc => {  
        this.form = doc.data()
      }); 
      this.readRecord()
      this.searchRecord()
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
