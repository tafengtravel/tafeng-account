<template>
  <div class="app-container">
    
    <el-date-picker
      v-model="date"
      type="date"
      placeholder="選擇日期"
      style="width:160px"
      value-format="yyyy-MM-dd">
    </el-date-picker>
    <el-input v-model="name" style="width:250px" placeholder="請輸入團名"></el-input>
    <el-button type="primary" @click="search">搜尋</el-button>

    <div class ="el-col-24">
      <el-table v-loading="listLoading" :data="itemData" style="width: 100%" :row-class-name="tableRowClassName" empty-text="沒有資料">

        <el-table-column type="index" label="筆數" width='75%' fixed></el-table-column>
        <el-table-column prop="number" label="團號" width='140%' sortable :sort-method = "(a,b)=>a.number.localeCompare(b.number)"></el-table-column>
        <el-table-column prop="cs" label="客服" width='75%'></el-table-column>
        <el-table-column prop="depDate" label="出發日期" width='120%' sortable :sort-method = "(a,b) =>a.depDate.localeCompare(b.depDate)"></el-table-column>
        <el-table-column prop="endDate" label="結束日期" width='120%' sortable :sort-method = "(a,b) =>a.endDate.localeCompare(b.endDate)"></el-table-column>
        <el-table-column prop="name" label="團名"  sortable :sort-method = "(a,b)=>a.name.localeCompare(b.name)"></el-table-column>
        <el-table-column prop="people" label="代表人" width='175%' sortable :sort-method = "(a,b)=>a.people.localeCompare(b.people)"></el-table-column>
        <el-table-column prop="amount" label="人數" width='90%' sortable :sort-method = "(a,b)=>a.amount.localeCompare(b.amount)"></el-table-column>
        <el-table-column prop="phone" label="聯絡電話" width='125%' sortable :sort-method = "(a,b)=>{return a.phone - b.phone}"></el-table-column>
        <el-table-column prop="income" label="總收入" width='90%'></el-table-column>
        <el-table-column prop="incomeDetailIncome" label="收入" width='90%'></el-table-column>
        <el-table-column prop="incomeDetailType" label="收款方式" width='100%'></el-table-column>
        <el-table-column prop="priceInsufficient" label="未收尾款" width='110%' ></el-table-column>
        <el-table-column prop="other" label="備註" ></el-table-column>
        <el-table-column prop="" label="編輯" width='60%'>
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
    <div class ="el-col-24">
      <el-row></el-row>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">匯款：{{transfer}}</el-col>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">現金：{{cash}}</el-col>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">刷卡：{{card}}</el-col>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">支票：{{check}}</el-col>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">其他：{{other}}</el-col>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">三倍券：{{coupon}}</el-col>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">LINEPAY：{{linepay}}</el-col>
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
      transfer:0,
      cash:0,
      card:0,
      check:0,
      other:0,
      coupon:0,
      linepay:0,
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
      this.itemData.splice(0,this.itemData.length) //用splice清空 就無須reverse刷新dom

      this.transfer = 0
      this.card = 0
      this.cash = 0
      this.check = 0
      this.other = 0
      this.coupon = 0
      this.linepay = 0

      ref.where('depDate','==',this.date).get().then(querySnapshot => { //資料編排改變後 客服需改變
        querySnapshot.forEach(doc => {  
          console.log(doc.data())
          if(doc.data().name == this.name){
            this.incomeTotal = this.incomeTotal + parseInt(doc.data().income)
            this.amountTotal = this.amountTotal + parseInt(doc.data().amount)
            priceInsufficient = parseInt(doc.data().price) - parseInt(doc.data().income)
            for(let i=0;i<doc.data().incomeDetailIncome.length;i++){
              this.itemData.push({
                ...doc.data(),
                'priceInsufficient':priceInsufficient,
                'incomeDetailIncome':doc.data().incomeDetailIncome[i],
                'incomeDetailType':doc.data().incomeDetailType[i],
              })
              if(doc.data().incomeDetailType[i] == '匯款'){
                this.transfer = this.transfer + parseInt(doc.data().incomeDetailIncome[i])
              }else if(doc.data().incomeDetailType[i] == '刷卡'){
                this.card = this.card + parseInt(doc.data().incomeDetailIncome[i])
              }else if(doc.data().incomeDetailType[i] == '現金'){
                this.cash = this.cash + parseInt(doc.data().incomeDetailIncome[i])
              }else if(doc.data().incomeDetailType[i] == '支票'){
                this.check = this.check + parseInt(doc.data().incomeDetailIncome[i])
              }else if(doc.data().incomeDetailType[i] == '其他'){
                this.other = this.other + parseInt(doc.data().incomeDetailIncome[i])
              }else if(doc.data().incomeDetailType[i] == '三倍券'){
                this.coupon = this.coupon + parseInt(doc.data().incomeDetailIncome[i])
              }else if(doc.data().incomeDetailType[i] == 'LINEPAY'){
                this.linepay = this.transfer + parseInt(doc.data().incomeDetailIncome[i])
              }
            }
          }
        }); 
      });
      this.listLoading = false
    },
    edit(row){
      console.log(row)

      let route = this.$router.resolve({
        path: '/op/edit',
        query: { number:row.number,depDate:moment(this.date).format('YYYY-MM') }
      })
      window.open(route.href, '_blank');
    }
  },
  mounted(){
    
  }
}
</script>



