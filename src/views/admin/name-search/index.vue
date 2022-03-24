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
      <el-table v-loading="listLoading" show-summary :summary-method="getSummaries" :data="itemData" style="width: 100%" :row-class-name="tableRowClassName" empty-text="沒有資料">

        <el-table-column type="index" label="筆數" width='75%' fixed></el-table-column>
        <el-table-column prop="number" label="團號" width='140%' sortable :sort-method = "(a,b)=>a.number.localeCompare(b.number)"></el-table-column>
        <el-table-column prop="cs" label="客服" width='80%'></el-table-column>
        <el-table-column prop="depDate" label="出發日期" width='120%' sortable :sort-method = "(a,b) =>a.depDate.localeCompare(b.depDate)"></el-table-column>
        <el-table-column prop="endDate" label="結束日期" width='120%' sortable :sort-method = "(a,b) =>a.endDate.localeCompare(b.endDate)"></el-table-column>
        <el-table-column prop="name" label="團名"  sortable :sort-method = "(a,b)=>a.name.localeCompare(b.name)"></el-table-column>
        <el-table-column prop="people" label="代表人" width='125%' sortable :sort-method = "(a,b)=>a.people.localeCompare(b.people)"></el-table-column>
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

      <el-table v-loading="listLoading" show-summary :summary-method="getSummaries" :data="itemDataRefund" style="width: 100%" :row-class-name="tableRowClassName" empty-text="沒有資料">

        <el-table-column type="index" label="筆數" width='75%' fixed></el-table-column>
        <el-table-column prop="number" label="團號" width='140%' sortable :sort-method = "(a,b)=>a.number.localeCompare(b.number)"></el-table-column>
        <el-table-column prop="cs" label="客服" width='80%'></el-table-column>
        <el-table-column prop="depDate" label="出發日期" width='120%' sortable :sort-method = "(a,b) =>a.depDate.localeCompare(b.depDate)"></el-table-column>
        <el-table-column prop="endDate" label="結束日期" width='120%' sortable :sort-method = "(a,b) =>a.endDate.localeCompare(b.endDate)"></el-table-column>
        <el-table-column prop="name" label="團名"  sortable :sort-method = "(a,b)=>a.name.localeCompare(b.name)"></el-table-column>
        <el-table-column prop="people" label="代表人" width='125%' sortable :sort-method = "(a,b)=>a.people.localeCompare(b.people)"></el-table-column>
        <el-table-column prop="amount" label="人數" width='90%' sortable :sort-method = "(a,b)=>a.amount.localeCompare(b.amount)"></el-table-column>
        <el-table-column prop="phone" label="聯絡電話" width='125%' sortable :sort-method = "(a,b)=>{return a.phone - b.phone}"></el-table-column>
        <el-table-column prop="income" label="總收入" width='90%'></el-table-column>
        <el-table-column prop="refundDetailRefund" label="退款" width='90%'></el-table-column>
        <el-table-column prop="refundDetailType" label="退款方式" width='100%'></el-table-column>
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
      <span style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">總退款：{{refundTotal}}</span>
      <span style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;">總人數：{{amountTotal}}</span>
    </div>
    <div class ="el-col-24">
      <el-row></el-row>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">收入 匯款：{{transfer}}</el-col>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">現金：{{cash}}</el-col>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">刷卡：{{card}}</el-col>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">支票：{{check}}</el-col>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">其他：{{other}}</el-col>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">五倍券：{{coupon}}</el-col>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">LINEPAY：{{linepay}}</el-col>
    </div>  
    <div class ="el-col-24">
      <el-row></el-row>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">退款 轉帳/匯款：{{refundTransfer}}</el-col>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">郵局：{{refundPost}}</el-col>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">刷卡：{{refundCard}}</el-col>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">現金：{{refundCash}}</el-col>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">支票：{{refundCheck}}</el-col>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">LINEPAY：{{refundLinepay}}</el-col>
      <el-col class="el-col-xl-3 el-col-lg-3 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">其他：{{refundOther}}</el-col>
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
      itemDataRefund:[],
      date:'',
      name:'',
      incomeTotal:0,
      refundTotal:0,
      amountTotal:0,
      transfer:0,
      cash:0,
      card:0,
      check:0,
      other:0,
      coupon:0,
      linepay:0,

      refundTransfer:0,
      refundPost:0,
      refundCard:0,
      refundCash:0,
      refundCheck:0,
      refundLinepay:0,
      refundOther:0,
    }
  },
  created() {
    
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '總共';
          return;
        }
        if(column.label == '人數'||column.label == '收入'||column.label == '退款'){
          const values = data.map(item => parseInt(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = parseInt(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            
          }
        }else{
          sums[index] = '';
        }
        
      });

      return sums;
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
      let ref = db.collection(moment(this.date).format('YYYY-MM'));
      let priceInsufficient = 0
      this.incomeTotal = 0
      this.refundTotal = 0
      this.amountTotal = 0
      this.itemData.splice(0,this.itemData.length) //用splice清空 就無須reverse刷新dom
      this.itemDataRefund.splice(0,this.itemDataRefund.length) //用splice清空 就無須reverse刷新dom

      this.transfer = 0
      this.card = 0
      this.cash = 0
      this.check = 0
      this.other = 0
      this.coupon = 0
      this.linepay = 0

      this.refundTransfer = 0
      this.refundPost = 0
      this.refundCard = 0
      this.refundCash = 0
      this.refundCheck = 0
      this.refundOther = 0
      this.refundLinepay = 0

      ref.where('depDate','==',this.date).get().then(querySnapshot => { //資料編排改變後 客服需改變
        querySnapshot.forEach(doc => {  
          console.log(doc.data())
          if(doc.data().name == this.name){
            this.incomeTotal = this.incomeTotal + parseInt(doc.data().income)
            this.amountTotal = this.amountTotal + parseInt(doc.data().amount)
            priceInsufficient = parseInt(doc.data().price) - parseInt(doc.data().income)
            //收入
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
              }else if(doc.data().incomeDetailType[i] == '五倍券'){
                this.coupon = this.coupon + parseInt(doc.data().incomeDetailIncome[i])
              }else if(doc.data().incomeDetailType[i] == 'LINEPAY'){
                this.linepay = this.linepay + parseInt(doc.data().incomeDetailIncome[i])
              }
            }
            //退款
            for(let i=0;i<doc.data().refundDetailRefund.length;i++){
              this.refundTotal = this.refundTotal + parseInt(doc.data().refundDetailRefund[i])
              this.itemDataRefund.push({
                ...doc.data(),
                'priceInsufficient':priceInsufficient,
                'refundDetailRefund':doc.data().refundDetailRefund[i],
                'refundDetailType':doc.data().refundDetailType[i],
              })
              if(doc.data().refundDetailType[i] == '轉帳'||doc.data().refundDetailType[i] == '匯款'){
                this.refundTransfer = this.refundTransfer + parseInt(doc.data().refundDetailRefund[i])
              }else if(doc.data().refundDetailType[i] == '郵局'){
                this.refundPost = this.refundPost + parseInt(doc.data().refundDetailRefund[i])
              }else if(doc.data().refundDetailType[i] == '刷卡'){
                this.refundCard = this.refundCard + parseInt(doc.data().refundDetailRefund[i])
              }else if(doc.data().refundDetailType[i] == '現金'){
                this.refundCash = this.refundCash + parseInt(doc.data().refundDetailRefund[i])
              }else if(doc.data().refundDetailType[i] == '支票'){
                this.refundCheck = this.refundCheck + parseInt(doc.data().refundDetailRefund[i])
              }else if(doc.data().refundDetailType[i] == 'LINEPAY'){
                this.refundLinepay = this.refundLinepay + parseInt(doc.data().refundDetailRefund[i])
              }else if(doc.data().refundDetailType[i] == '其他'){
                this.refundOther = this.refundOther + parseInt(doc.data().refundDetailRefund[i])
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
        path: '/admin/edit/fit',
        query: { number:row.number,depDate:moment(this.date).format('YYYY-MM') }
      })
      window.open(route.href, '_blank');
    }
  },
  mounted(){
    
  }
}
</script>



