<template>
  <div class="app-container">
    
    <el-date-picker
      v-model="date"
      type="date"
      placeholder="選擇報帳日期"
      style="width:150px"
      value-format="yyyy-MM-dd"
      >
    </el-date-picker>
    <el-button type="primary" @click="search">搜尋</el-button>
    <el-row></el-row>
    <div class ="el-col-24">
      <div style="font-size: 20px;color:black;">當日業績</div>
      <el-table v-loading="listLoading" :data="itemData" style="width: 100%" :default-sort = "{prop: 'number',order: 'ascending'}" :row-class-name="tableRowClassName" empty-text="沒有資料">
        <el-table-column type="index" label="筆數" width='50%' fixed></el-table-column>
        <el-table-column prop="number" label="團號" width='125%' sortable :sort-method = "(a,b)=>a.number.localeCompare(b.number)"></el-table-column>
        <el-table-column prop="group" :formatter="group" label="團體" width='50%'></el-table-column>
        <el-table-column prop="cs" label="客服" width='50%'></el-table-column>
        <el-table-column prop="depDate" label="出發日期" width='100%' sortable :sort-method = "(a,b) =>a.depDate.localeCompare(b.depDate)"></el-table-column>
        <el-table-column prop="endDate" label="結束日期" width='100%' sortable :sort-method = "(a,b) =>a.endDate.localeCompare(b.endDate)"></el-table-column>
        <el-table-column prop="name" label="團名"  sortable :sort-method = "(a,b)=>a.name.localeCompare(b.name)"></el-table-column>
        <el-table-column prop="people" label="代表人" width='150%' sortable :sort-method = "(a,b)=>a.people.localeCompare(b.people)"></el-table-column>
        <el-table-column prop="amount" label="人數" width='75%' sortable :sort-method = "(a,b)=>a.amount.localeCompare(b.amount)"></el-table-column>
        <el-table-column prop="createDate" label="報帳日期" width='100%'></el-table-column>
        <el-table-column prop="priceDetailAdminCheck" label="主管核實" :formatter="adminCheck" width='80%' ></el-table-column>
        <el-table-column prop="incomeDetailIncome[0]" label="收入" width='100%'></el-table-column>
        <el-table-column prop="incomeDetailOpCheck[0]" label="OP核實" :formatter="opCheck" width='80%' ></el-table-column>
        <el-table-column prop="" label="編輯" width='50%'>
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" >編輯</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-row></el-row>

      <div style="font-size: 20px;color:black;">退業績</div>
      <el-table v-loading="listLoading" :data="itemDataCancel" style="width: 100%" :default-sort = "{prop: 'number',order: 'ascending'}" :row-class-name="tableRowClassName" empty-text="沒有資料">
        <el-table-column type="index" label="筆數" width='50%' fixed></el-table-column>
        <el-table-column prop="number" label="團號" width='125%' sortable :sort-method = "(a,b)=>a.number.localeCompare(b.number)"></el-table-column>
        <el-table-column prop="group" :formatter="group" label="團體" width='50%'></el-table-column>
        <el-table-column prop="cs" label="客服" width='50%'></el-table-column>
        <el-table-column prop="depDate" label="出發日期" width='100%' sortable :sort-method = "(a,b) =>a.depDate.localeCompare(b.depDate)"></el-table-column>
        <el-table-column prop="endDate" label="結束日期" width='100%' sortable :sort-method = "(a,b) =>a.endDate.localeCompare(b.endDate)"></el-table-column>
        <el-table-column prop="name" label="團名"  sortable :sort-method = "(a,b)=>a.name.localeCompare(b.name)"></el-table-column>
        <el-table-column prop="people" label="代表人" width='150%' sortable :sort-method = "(a,b)=>a.people.localeCompare(b.people)"></el-table-column>
        <el-table-column prop="amount" label="人數" width='75%' sortable :sort-method = "(a,b)=>a.amount.localeCompare(b.amount)"></el-table-column>
        <el-table-column prop="createDate" label="報帳日期" width='100%'></el-table-column>
        <el-table-column prop="priceDetailAdminCheck" label="主管核實" :formatter="adminCheck" width='80%' ></el-table-column>
        <el-table-column prop="incomeDetailIncome[0]" label="收入" width='100%'></el-table-column>
        <el-table-column prop="incomeDetailOpCheck[0]" label="OP核實" :formatter="opCheck" width='80%' ></el-table-column>
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
    adminCheck(row, column){
      if(row.priceDetailAdminCheck){
        return '✔️'
      }else{
        return '❌'
      }
    },
    opCheck(row, column){
      if(row.incomeDetailOpCheck[0]){
        return '✔️'
      }else{
        return '❌'
      }
    },
    group(row, column){
      if(row.tax > 0){
        return '✔️'
      }else{
        return ''
      }
    },
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
      let month = moment(this.month).subtract(6, 'months').format('YYYY-MM')
      

      this.itemData.length = 0

      for(let j=0;j<18;j++){
        ref = db.collection(month);
        console.log(ref)

        ref.where('createDate','==',this.date).onSnapshot((querySnapshot => { //資料編排改變後 客服需改變
          
          querySnapshot.forEach(doc => {  
            priceInsufficient = parseInt(doc.data().price) - parseInt(doc.data().income)
            this.itemData[i] = {...doc.data(),'priceInsufficient':priceInsufficient}
            i=i+1
          }); 
          this.itemData.reverse()
          this.itemData.reverse() 
        }));

        ref.where('cancelDate','==',this.date).onSnapshot((querySnapshot => { //資料編排改變後 客服需改變
          
          querySnapshot.forEach(doc => {  
            priceInsufficient = parseInt(doc.data().price) - parseInt(doc.data().income)
            this.itemDataCancel[i] = {...doc.data(),'priceInsufficient':priceInsufficient}
            i=i+1
          }); 
          this.itemDataCancel.reverse()
          this.itemDataCancel.reverse() 
        }));
        month = moment(month).add(1,'months').format('YYYY-MM')
      }

      this.listLoading = false
    },
    edit(row){
      console.log(row)
      
      let route = this.$router.resolve({
        path: '/op/edit',
        query: { number:row.number,depDate:moment(row.depDate).format('YYYY-MM-DD')}
      })
      window.open(route.href, '_blank');
    }
  },
  mounted(){
    
  }
}
</script>



