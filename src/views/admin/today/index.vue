<template>
  <div class="app-container">
    
    <el-date-picker
      v-model="date"
      type="daterange"
      range-separator="至"
      start-placeholder="開始月份"
      end-placeholder="結束月份"
      value-format="yyyy-MM-dd">
    </el-date-picker>

    <el-button type="primary" @click="search">搜尋</el-button>
    <el-row></el-row>
    <div class ="el-col-24">
      <div class="sub_title">當日業績</div>
      <el-row></el-row>
      <el-row>
      <span class="font el-col-4 el-col-sm-12 el-col-xs-12 el-col-xl-4 el-col-lg-4"><font color="black">人數：{{amountTotal}}</font></span>
      <span class="font el-col-4 el-col-sm-12 el-col-xs-12 el-col-xl-4 el-col-lg-4"><font color="black">營業額：{{priceTotal}}</font></span>
      <span class="font el-col-4 el-col-sm-12 el-col-xs-12 el-col-xl-4 el-col-lg-4"><font color="black">利潤：{{profitTotal}}</font></span>
      </el-row>
      <el-table v-loading="listLoading" :data="itemData" style="width: 100%" :default-sort = "{prop: 'number',order: 'ascending'}" :row-class-name="tableRowClassName" empty-text="沒有資料">
        <el-table-column type="index" label="筆數" width='75%' fixed></el-table-column>
        <el-table-column prop="number" label="團號" width='140%' sortable :sort-method = "(a,b)=>a.number.localeCompare(b.number)"></el-table-column>
        <el-table-column prop="group" label="團體" width='90%' :formatter="group" sortable :sort-method = "(a,b)=>{return a.group - b.group}"></el-table-column>
        <el-table-column prop="cs" label="客服" width='75%'></el-table-column>
        <el-table-column prop="depDate" label="出發日期" width='120%' sortable :sort-method = "(a,b) =>a.depDate.localeCompare(b.depDate)"></el-table-column>
        <el-table-column prop="endDate" label="結束日期" width='120%' sortable :sort-method = "(a,b) =>a.endDate.localeCompare(b.endDate)"></el-table-column>
        <el-table-column prop="name" label="團名"  sortable :sort-method = "(a,b)=>a.name.localeCompare(b.name)"></el-table-column>
        <el-table-column prop="people" label="代表人" width='175%' sortable :sort-method = "(a,b)=>a.people.localeCompare(b.people)"></el-table-column>
        <el-table-column prop="amount" label="人數" width='90%' sortable :sort-method = "(a,b)=>a.amount.localeCompare(b.amount)"></el-table-column>
        <el-table-column prop="createDate" label="報帳日期" sortable :sort-method = "(a,b) =>a.createDate.localeCompare(b.createDate)" width='120%'></el-table-column>
        <el-table-column prop="profit" label="利潤" width='100%' :formatter="profitCheck"></el-table-column>
        <el-table-column prop="priceDetailAdminCheck" label="主管核實" width='100%' :formatter="adminCheck"></el-table-column>
        <el-table-column prop="incomeDetailOpCheck[0]" label="OP核實" width='100%' :formatter="opCheck"></el-table-column>
        <el-table-column prop="" label="編輯" width='60%'>
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" >編輯</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-row></el-row>

      <div class="sub_title">退業績</div>
      <el-table v-loading="listLoading" :data="itemDataCancel" style="width: 100%" :default-sort = "{prop: 'number',order: 'ascending'}" :row-class-name="tableRowClassName" empty-text="沒有資料">
        <el-table-column type="index" label="筆數" width='75%' fixed></el-table-column>
        <el-table-column prop="number" label="團號" width='140%' sortable :sort-method = "(a,b)=>a.number.localeCompare(b.number)"></el-table-column>
        <el-table-column prop="group" label="團體" width='90%' :formatter="group" sortable :sort-method = "(a,b)=>{return a.group - b.group}"></el-table-column>
        <el-table-column prop="cs" label="客服" width='75%'></el-table-column>
        <el-table-column prop="depDate" label="出發日期" width='120%' sortable :sort-method = "(a,b) =>a.depDate.localeCompare(b.depDate)"></el-table-column>
        <el-table-column prop="endDate" label="結束日期" width='120%' sortable :sort-method = "(a,b) =>a.endDate.localeCompare(b.endDate)"></el-table-column>
        <el-table-column prop="name" label="團名"  sortable :sort-method = "(a,b)=>a.name.localeCompare(b.name)"></el-table-column>
        <el-table-column prop="people" label="代表人" width='175%' sortable :sort-method = "(a,b)=>a.people.localeCompare(b.people)"></el-table-column>
        <el-table-column prop="amount" label="人數" width='90%' sortable :sort-method = "(a,b)=>a.amount.localeCompare(b.amount)"></el-table-column>
        <el-table-column prop="createDate" label="報帳日期" width='120%'></el-table-column>
        <el-table-column prop="priceDetailAdminCheck" label="主管核實" width='100%' :formatter="adminCheck"></el-table-column>
        <el-table-column prop="incomeDetailIncome[0]" label="收入" width='100%'></el-table-column>
        <el-table-column prop="incomeDetailOpCheck[0]" label="OP核實" width='100%' :formatter="opCheck"></el-table-column>
        <el-table-column prop="" label="編輯" width='60%'>
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
      amountTotal:'',
      profitTotal:'',
      priceTotal:''
    }
  },
  created() {
    
  },
  methods: {
    profitCheck(row){
      if(row.location != '跨年'&&row.location != '團體報帳'&&row.location != 'JOIN報帳'){
        return row.profit
      }else{
        return '0'
      }
    },
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
      if(row.tax > 0 && (row.location != '跨年'&&row.location != '團體報帳'&&row.location != 'JOIN報帳')){
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
      let month = moment(this.date[0]).subtract(12, 'months').format('YYYY-MM')
      this.itemData.length = 0
      this.itemDataCancel.length = 0
      this.amountTotal = 0
      this.profitTotal = 0
      this.priceTotal = 0

      let startDate = moment(this.date[0]);
      let endDate = moment(this.date[1]);
      let dateLength = endDate.diff(startDate, 'days')+1;  

      
      let startDateCancel = this.date[0]

      for(let j=0;j<24;j++){
        ref = db.collection(month);
        console.log(month)
        startDate = this.date[0]

        for(let i=0;i<dateLength;i++){
         
          ref.where('createDate','==',startDate).get().then(querySnapshot => { //資料編排改變後 客服需改變
          
            querySnapshot.forEach(doc => {  
              priceInsufficient = parseInt(doc.data().price) - parseInt(doc.data().income)
              this.itemData.push({...doc.data(),'priceInsufficient':priceInsufficient})
              if(isNaN(parseFloat(doc.data().amount))){
              }else{
                this.amountTotal = parseFloat(this.amountTotal) + parseFloat(doc.data().amount)
              }
              if(isNaN(parseFloat(doc.data().price))){
              }else{
                this.priceTotal = parseFloat(this.priceTotal) + parseFloat(doc.data().price)
              }
              if(doc.data().location != '跨年'&&doc.data().location != '團體報帳'&&doc.data().location != 'JOIN報帳'){
                if(isNaN(parseFloat(doc.data().profit))){
                }else{
                  this.profitTotal = parseFloat(this.profitTotal) + parseFloat(doc.data().profit)
                }
              }
            }); 
            this.listLoading = false
          });
          
          ref.where('cancelDate','==',startDate).get().then(querySnapshot => { //資料編排改變後 客服需改變
            
            querySnapshot.forEach(doc => {  
              priceInsufficient = parseInt(doc.data().price) - parseInt(doc.data().income)
              this.itemDataCancel.push({...doc.data(),'priceInsufficient':priceInsufficient})
            }); 
            startDateCancel = moment(startDateCancel).add(1,'days').format('YYYY-MM-DD')
            this.listLoading = false
          });

          startDate = moment(startDate).add(1,'days').format('YYYY-MM-DD')
          console.log(startDate)
        }
        month = moment(month).add(1,'months').format('YYYY-MM')
        
      }

      
    },
    edit(row){
      console.log(row)
      
      let route = this.$router.resolve({
        path: '/admin/edit/fit',
        query: { number:row.number,depDate:moment(row.depDate).format('YYYY-MM-DD')}
      })
      window.open(route.href, '_blank');
    }
  },
  mounted(){
    
  }
}
</script>



