<template>
  <div class="app-container">
    
    <el-date-picker
      v-model="date"
      type="date"
      placeholder="選擇收入日期"
      style="width:160px"
      value-format="yyyy-MM-dd"
      >
    </el-date-picker>
    <el-button type="primary" @click="search">搜尋</el-button>
    <el-row></el-row>
    <div class ="el-col-24">
       <el-table v-loading="listLoading" :data="itemData" style="width: 100%" :default-sort = "{prop: 'number',order: 'ascending'}" :row-class-name="tableRowClassName" empty-text="沒有資料">
        <el-table-column type="index" label="筆數" width='75%' fixed></el-table-column>
        <el-table-column prop="number" label="團號" width='140%' sortable :sort-method = "(a,b)=>a.number.localeCompare(b.number)"></el-table-column>
        <el-table-column prop="cs" label="客服" width='75%'></el-table-column>
        <el-table-column prop="depDate" label="出發日期" width='120%' sortable :sort-method = "(a,b) =>a.depDate.localeCompare(b.depDate)"></el-table-column>
        <el-table-column prop="endDate" label="結束日期" width='120%' sortable :sort-method = "(a,b) =>a.endDate.localeCompare(b.endDate)"></el-table-column>
        <el-table-column prop="name" label="團名"  sortable :sort-method = "(a,b)=>a.name.localeCompare(b.name)"></el-table-column>
        <el-table-column prop="people" label="代表人" sortable :sort-method = "(a,b)=>a.people.localeCompare(b.people)"></el-table-column>
        <el-table-column prop="item" label="品項"></el-table-column>
        <el-table-column prop="income" label="收入" width='90%' sortable :sort-method = "(a,b)=>{return a.phone - b.phone}"></el-table-column>
        <el-table-column prop="incomeType" label="收款方式" width='100%'></el-table-column>
        <el-table-column prop="opCheck" :formatter="OpCheck" label="OP核實" width='100%' ></el-table-column>
        <el-table-column prop="adminCheck" label="財務核實" :formatter="AdminCheck" width='100%' ></el-table-column>
        <el-table-column prop="" label="編輯" width='60%'>
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" >編輯</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="dl2" label="客服簽名" width='100%' ></el-table-column>
      </el-table>
      <el-row></el-row>
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
      <el-col class="el-col-xl-4 el-col-lg-4 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">OP核實：</el-col>
      <el-col class="el-col-xl-4 el-col-lg-4 el-col-md-8 el-col-sm-8 el-col-xs-12" style="font-size: 15px;font-family: Microsoft JhengHei;font-weight: bold;padding-right:30px;">主管核實：</el-col>
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
    OpCheck(row, column){
      if(row.opCheck){
        return '✔️'
      }else{
        return '❌'
      }
    },
    AdminCheck(row, column){
      if(row.adminCheck){
        return '✔️'
      }else{
        return '❌'
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
      let ref 
      let priceInsufficient = 0
      let month = moment(this.date).subtract(12, 'months').format('YYYY-MM')
      this.itemData.length = 0

      for(let k=0;k<24;k++){
        ref = db.collection(month);
        console.log(month)

        ref.where('incomeDetailDate','array-contains',this.date).get().then(querySnapshot => { //資料編排改變後 客服需改變
          querySnapshot.forEach(doc => {  

            for(let j=0;j<doc.data().incomeDetailDate.length;j++){
              if(doc.data().incomeDetailDate[j] == this.date){
                this.itemData.push({
                  ...doc.data(),
                  'item':doc.data().incomeDetailItem[j],
                  'income':doc.data().incomeDetailIncome[j],
                  'incomeType':doc.data().incomeDetailType[j],
                  'opCheck':doc.data().incomeDetailOpCheck[j],
                  'adminCheck':doc.data().incomeDetailAdminCheck[j],
                })
                if(doc.data().incomeDetailType[j] == '匯款'){
                  this.transfer = this.transfer + parseInt(doc.data().incomeDetailIncome[j])
                }else if(doc.data().incomeDetailType[j] == '刷卡'){
                  this.card = this.card + parseInt(doc.data().incomeDetailIncome[j])
                }else if(doc.data().incomeDetailType[j] == '現金'){
                  this.cash = this.cash + parseInt(doc.data().incomeDetailIncome[j])
                }else if(doc.data().incomeDetailType[j] == '支票'){
                  this.check = this.check + parseInt(doc.data().incomeDetailIncome[j])
                }else if(doc.data().incomeDetailType[j] == '其他'){
                  this.other = this.other + parseInt(doc.data().incomeDetailIncome[j])
                }else if(doc.data().incomeDetailType[j] == '三倍券'){
                  this.coupon = this.coupon + parseInt(doc.data().incomeDetailIncome[j])
                }else if(doc.data().incomeDetailType[j] == 'LINEPAY'){
                  this.linepay = this.transfer + parseInt(doc.data().linepay[j])
                }
                
              }
            }
            // console.log(doc.data().number)
          }); 
          this.itemData.reverse()
          this.itemData.reverse() 
        });
        month = moment(month).add(1,'months').format('YYYY-MM')
      }
      this.listLoading = false
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



