<template>
  <div class="app-container">
    
    <el-date-picker
      v-model="date"
      type="date"
      placeholder="選擇日期"
      style="width:150px"
      value-format="yyyy-MM-dd">
    </el-date-picker>
    <el-input v-model="name" style="width:250px" placeholder="請輸入團名"></el-input>
    <el-button type="primary" @click="search">搜尋</el-button>

    <div class ="el-col-24">
      <el-table v-loading="listLoading" :data="itemData" style="width: 100%" :row-class-name="tableRowClassName" empty-text="沒有資料">

        <el-table-column type="index" label="筆數" width='50%' fixed></el-table-column>
        <el-table-column prop="number" label="團號" width='125%' sortable :sort-method = "(a,b)=>{return a.number - b.number}"></el-table-column>
        <el-table-column prop="cs" label="客服" width='50%'></el-table-column>
        <el-table-column prop="depDate" label="出發日期" width='100%' sortable :sort-method = "(a,b) =>a.depDate.localeCompare(b.depDate)"></el-table-column>
        <el-table-column prop="endDate" label="結束日期" width='100%' sortable :sort-method = "(a,b) =>a.endDate.localeCompare(b.endDate)"></el-table-column>
        <el-table-column prop="name" label="團名"  sortable :sort-method = "(a,b)=>a.name.localeCompare(b.name)"></el-table-column>
        <el-table-column prop="people" label="代表人" width='100%' sortable :sort-method = "(a,b)=>a.people.localeCompare(b.people)"></el-table-column>
        <el-table-column prop="amount" label="人數" width='75%'></el-table-column>
        <el-table-column prop="phone" label="聯絡電話" width='125%' sortable :sort-method = "(a,b)=>{return a.phone - b.phone}"></el-table-column>
        <el-table-column prop="income" label="總收入" width='80%'></el-table-column>
        <el-table-column prop="priceInsufficient" label="未收尾款" width='100%' ></el-table-column>
        <el-table-column prop="other" label="備註" width='100%' ></el-table-column>
        <el-table-column prop="" label="編輯" width='50%'>
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" >編輯</el-button>
          </template>
        </el-table-column>
        
      </el-table>
    </div>
    <div class ="el-col-24">
      <el-row></el-row>
      <span style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">總收入：{{incomeTotal}}</span>
      <span style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;">總人數：{{amountTotal}}</span>
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
      date:'',
      name:'',
      incomeTotal:0,
      amountTotal:0,
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
      let ref = db.collection(moment(this.date).format('YYYY-MM'));
      let priceInsufficient = 0
      this.incomeTotal = 0
      this.amountTotal = 0

      ref.where('depDate','==',this.date).onSnapshot((querySnapshot => { //資料編排改變後 客服需改變
        this.itemData.length = 0
        querySnapshot.forEach(doc => {  
          console.log(doc.data())
          if(doc.data().name == this.name){
            console.log('有的'+doc.data())
            this.incomeTotal = this.incomeTotal + parseInt(doc.data().income)
            this.amountTotal = this.amountTotal + parseInt(doc.data().amount)
            priceInsufficient = parseInt(doc.data().price) - parseInt(doc.data().income)
            this.itemData[i] = {...doc.data(),'priceInsufficient':priceInsufficient}
            i=i+1
          }
        }); 
        this.itemData.reverse()
        this.itemData.reverse() 
      }));
      this.listLoading = false
    },
    edit(row){
      console.log(row)

      let route = this.$router.resolve({
        path: '/op/edit',
        query: { number:row.number,depDate:this.month }
      })
      window.open(route.href, '_blank');
    }
  },
  mounted(){
    
  }
}
</script>



