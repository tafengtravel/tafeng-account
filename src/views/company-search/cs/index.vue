<template>
  <div class="app-container">
    
    <el-date-picker
      v-model="month"
      type="month"
      placeholder="選擇月份"
      style="width:120px"
      value-format="yyyy-MM">
    </el-date-picker>
    <el-input v-model="company" style="width:250px" placeholder="請輸入廠商"></el-input>
    <el-button type="primary" @click="search">搜尋</el-button>

    <div class ="el-col-24">
      <el-table v-loading="listLoading" :data="itemData" style="width: 100%" :row-class-name="tableRowClassName" empty-text="沒有資料">

        <el-table-column type="index" label="筆數" width='50%' fixed></el-table-column>
        <el-table-column prop="number" label="團號" width='125%' sortable :sort-method = "(a,b)=>{return a.number - b.number}"></el-table-column>
        <el-table-column prop="cs" label="客服" width='50%'></el-table-column>
        <el-table-column prop="depDate" label="出發日期" width='100%' sortable :sort-method = "(a,b) =>a.depDate.localeCompare(b.depDate)"></el-table-column>
        <el-table-column prop="endDate" label="結束日期" width='100%' sortable :sort-method = "(a,b) =>a.endDate.localeCompare(b.endDate)"></el-table-column>
        <el-table-column prop="name" label="團名"  sortable :sort-method = "(a,b)=>a.name.localeCompare(b.name)"></el-table-column>
        <el-table-column prop="people" label="代表人" width='150%' sortable :sort-method = "(a,b)=>a.people.localeCompare(b.people)"></el-table-column>
        <el-table-column prop="company" label="廠商" width='75%'></el-table-column>
        <el-table-column prop="item" label="品項" width='125%' sortable :sort-method = "(a,b)=>{return a.phone - b.phone}"></el-table-column>
        <el-table-column prop="pay" label="支出" width='80%'></el-table-column>
        <el-table-column prop="dl1" label="第一筆DL" width='100%' ></el-table-column>
        <el-table-column prop="dlpay1" label="第一筆金額" width='100%' ></el-table-column>
        <el-table-column prop="dl2" label="第二筆DL" width='100%' ></el-table-column>
        <el-table-column prop="dlpay2" label="第二筆金額" width='100%' ></el-table-column>
        <el-table-column prop="" label="編輯" width='50%'>
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" >編輯</el-button>
          </template>
        </el-table-column>
        
      </el-table>
    </div>
  </div>
</template>

<script>

import { db } from '@/db.js'
import { firebaseApp } from '@/db.js'
import '@/styles/common.css'
import * as moment from "moment/moment";


export default {
  components: {
    
  },
  
  data() {
    return {
      listLoading: false,
      itemData:[],
      month:'',
      company:'',
      
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
      let ref = db.collection(this.month);
      let priceInsufficient = 0
      // payDetailCompany

      ref.where('payDetailCompany','array-contains',this.company).onSnapshot((querySnapshot => { //資料編排改變後 客服需改變
        this.itemData.length = 0
        querySnapshot.forEach(doc => {  

          for(let j=0;j<doc.data().payDetailCompany.length;j++){
            if(doc.data().payDetailCompany[j] == this.company){
              this.itemData[i] = {
                ...doc.data(),
                'count':i+1,
                'company':doc.data().payDetailCompany[j],
                'item':doc.data().payDetailItem[j],
                'pay':doc.data().payDetailPay[j],
                'dl1':doc.data().payDetailDl1[j],
                'dlpay1':doc.data().payDetailDlPay1[j],
                'dl2':doc.data().payDetailDl2[j],
                'dlpay2':doc.data().payDetailDlPay2[j],
              }
              console.log(this.itemData[i].number,this.itemData[i].pay)
              i=i+1
            }
          }
          // console.log(doc.data().number)
        }); 
        this.itemData.reverse()
        this.itemData.reverse() 
      }));
      
      
      this.listLoading = false
    },
    edit(row){
      console.log(row)

      let route = this.$router.resolve({
        path: '/cs/edit',
        query: { number:row.number,depDate:this.month }
      })
      window.open(route.href, '_blank');
    }
  },
  mounted(){
    
  }
}
</script>



