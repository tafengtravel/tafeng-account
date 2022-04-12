<template>
  <div class="app-container">
    
    <el-date-picker
      v-model="date"
      type="date"
      placeholder="選擇DL日期"
      style="width:160px"
      value-format="yyyy-MM-dd"
      >
    </el-date-picker>
    <el-button type="primary" @click="search">搜尋</el-button>
    <el-row></el-row>
    <div class ="el-col-24">
      <el-table v-loading="listLoading" :data="itemData" style="width: 100%" :default-sort = "{prop: 'number',order: 'ascending'}" :row-class-name="tableRowClassName" empty-text="沒有資料">
        <el-table-column type="index" label="筆數" width='75%' fixed></el-table-column>
        <el-table-column prop="number" label="團號" width='140%' sortable :sort-method = "(a,b)=>{return a.number - b.number}"></el-table-column>
        <el-table-column prop="cs" label="客服" width='75%'></el-table-column>
        <el-table-column prop="depDate" label="出發日期" width='120%' sortable :sort-method = "(a,b) =>a.depDate.localeCompare(b.depDate)"></el-table-column>
        <el-table-column prop="endDate" label="結束日期" width='120%' sortable :sort-method = "(a,b) =>a.endDate.localeCompare(b.endDate)"></el-table-column>
        <el-table-column prop="name" label="團名"  sortable :sort-method = "(a,b)=>a.name.localeCompare(b.name)"></el-table-column>
        <el-table-column prop="people" label="代表人" sortable :sort-method = "(a,b)=>a.people.localeCompare(b.people)"></el-table-column>
        <el-table-column prop="company" label="廠商"></el-table-column>
        <el-table-column prop="item" label="品項" sortable :sort-method = "(a,b)=>{return a.phone - b.phone}"></el-table-column>
        <el-table-column prop="pay" label="支出" width='80%'></el-table-column>
        <el-table-column prop="dl1" label="第一筆DL" width='120%' ></el-table-column>
        <el-table-column prop="dlpay1" label="第一筆金額" width='120%' ></el-table-column>
        <el-table-column prop="dlpaydate1" label="付款日期" width='120%' ></el-table-column>
        <el-table-column prop="dl2" label="第二筆DL" width='120%' ></el-table-column>
        <el-table-column prop="dlpay2" label="第二筆金額" width='120%' ></el-table-column>
        <el-table-column prop="dlpaydate2" label="付款日期" width='120%' ></el-table-column>
        <el-table-column prop="" label="編輯" width='60%'>
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" >編輯</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row></el-row>
    </div>
  </div>
</template>

<script>

import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'
import '@/styles/common.css'
import * as moment from "moment/moment";
import { formatTime } from '@/utils';



export default {
  components: {

  },
  
  data() {
    return {
      listLoading: false,
      itemData:[],
      itemDataCancel:[],
      date:'',
    }
  },
  created() {
    
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex%2 === 1) {
        return 'color-row';
      }
      return '';
    },
    search() {
      this.listLoading = true
      let i = 0
      let ref 
      let priceInsufficient = 0
      let month = moment(this.date).subtract(12, 'months').format('YYYY-MM')
      this.itemData.splice(0,this.itemData.length) //用splice清空 就無須reverse刷新dom

      for(let k=0;k<24;k++){
        ref = db.collection(month);
        console.log(month)

        ref.where('payDetailDl1','array-contains',this.date).get().then(querySnapshot => { //資料編排改變後 客服需改變
          querySnapshot.forEach(doc => {  

            for(let j=0;j<doc.data().payDetailDl1.length;j++){
              if(doc.data().payDetailDl1[j] == this.date){
                this.itemData.push({
                  ...doc.data(),
                  'company':doc.data().payDetailCompany[j],
                  'item':doc.data().payDetailItem[j],
                  'pay':doc.data().payDetailPay[j],
                  'dl1':doc.data().payDetailDl1[j],
                  'dlpay1':doc.data().payDetailDlPay1[j],
                  'dlpaydate1':doc.data().payDetailDlPayDate1[j],
                  'dl2':doc.data().payDetailDl2[j],
                  'dlpay2':doc.data().payDetailDlPay2[j],
                  'dlpaydate2':doc.data().payDetailDlPayDate2[j],
                })
              }
            }
            // console.log(doc.data().number)
          }); 
        });

        ref.where('payDetailDl2','array-contains',this.date).get().then(querySnapshot => { //資料編排改變後 客服需改變
          querySnapshot.forEach(doc => {  

            for(let j=0;j<doc.data().payDetailDl2.length;j++){
              if(doc.data().payDetailDl2[j] == this.date){
                this.itemData.push({
                  ...doc.data(),
                  'company':doc.data().payDetailCompany[j],
                  'item':doc.data().payDetailItem[j],
                  'pay':doc.data().payDetailPay[j],
                  'dl1':doc.data().payDetailDl1[j],
                  'dlpay1':doc.data().payDetailDlPay1[j],
                  'dlpaydate1':doc.data().payDetailDlPayDate1[j],
                  'dl2':doc.data().payDetailDl2[j],
                  'dlpay2':doc.data().payDetailDlPay2[j],
                  'dlpaydate2':doc.data().payDetailDlPayDate2[j],
                })
              }
            }
            // console.log(doc.data().number)
          }); 
        });

        month = moment(month).add(1,'months').format('YYYY-MM')
      }
      this.listLoading = false
    },
    edit(row){
      console.log(row)
      
      let route = this.$router.resolve({
        path: '/cs/edit',
        query: { number:row.number,depDate:moment(row.depDate).format('YYYY-MM-DD')}
      })
      window.open(route.href, '_blank');
    }
  },
  mounted(){
    
  }
}
</script>



