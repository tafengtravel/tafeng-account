<template>
  <div class="app-container">
    
    <TableOption @searchChildEvent="search" ref="child"></TableOption>
    <el-row></el-row>
    <el-row>
      <span class="font el-col-4 el-col-sm-12 el-col-xs-12 el-col-xl-4 el-col-lg-4"><font color="black">人數：{{amountTotal}}</font></span>
      <span class="font el-col-4 el-col-sm-12 el-col-xs-12 el-col-xl-4 el-col-lg-4"><font color="black">營業額：{{priceTotal}}</font></span>
      <span class="font el-col-4 el-col-sm-12 el-col-xs-12 el-col-xl-4 el-col-lg-4"><font color="black">利潤：{{profitTotal}}</font></span>
      <span class="font el-col-4 el-col-sm-12 el-col-xs-12 el-col-xl-4 el-col-lg-4"><font color="black">稅金：{{taxTotal}}</font></span>
    </el-row>
    <div class ="el-col-24">
      <el-table v-loading="listLoading" show-summary :summary-method="getSummaries" :data="itemData.filter(data => !$refs.child.name || data.name.toLowerCase().includes($refs.child.name.toLowerCase()))" style="width: 100%" :default-sort = "{prop: 'number',order: 'ascending'}" :row-class-name="tableRowClassName" empty-text="沒有資料">

        <el-table-column type="index" label="筆數" width='75%' fixed></el-table-column>
        <el-table-column prop="number" label="團號" width='140%' sortable :sort-method = "(a,b)=>a.number.localeCompare(b.number)"></el-table-column>
        <el-table-column prop="group" label="團體" width='90%' :formatter="group" sortable :sort-method = "(a,b)=>{return a.group - b.group}"></el-table-column>
        <el-table-column prop="cs" label="客服" width='75%'></el-table-column>
        <el-table-column prop="depDate" label="出發日期" width='120%' sortable :sort-method = "(a,b) =>a.depDate.localeCompare(b.depDate)"></el-table-column>
        <el-table-column prop="endDate" label="結束日期" width='120%' sortable :sort-method = "(a,b) =>a.endDate.localeCompare(b.endDate)"></el-table-column>
        <el-table-column prop="name" label="團名"  sortable :sort-method = "(a,b)=>a.name.localeCompare(b.name)"></el-table-column>
        <el-table-column prop="people" label="代表人" width='120%' sortable :sort-method = "(a,b)=>a.people.localeCompare(b.people)"></el-table-column>
        <el-table-column prop="amount" label="人數" width='90%' sortable :sort-method = "(a,b)=>a.amount.localeCompare(b.amount)"></el-table-column>
        <el-table-column prop="phone" label="聯絡電話" width='125%' sortable :sort-method = "(a,b)=>{return a.phone - b.phone}"></el-table-column>
        <el-table-column prop="priceInsufficient" label="未收尾款" width='125%' sortable  :sort-method = "(a,b)=>{return a.priceInsufficient - b.priceInsufficient}"></el-table-column>
        <el-table-column prop="profit" label="利潤" width='100%' :formatter="profit" sortable :sort-method = "(a,b)=>{return a.profit - b.profit}"></el-table-column>
        <el-table-column prop="insurance1" label="旅責險" width='100%' :formatter="insurance" sortable :sort-method = "(a,b)=>{return a.insurance1 - b.insurance1}"></el-table-column>
        <el-table-column prop="other" label="備註"  width='120%' sortable :sort-method = "(a,b)=>a.other.localeCompare(b.other)"></el-table-column>
        <el-table-column prop="location" label="地點" width='100%' sortable :sort-method = "(a,b)=>a.location.localeCompare(b.location)"></el-table-column>
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
import TableOption from '@/components/TableOption.vue'


export default {
  components: {
    TableOption
  },
  
  data() {
    return {
      listLoading: false,
      itemData:[],
      month:'',
      amountTotal:'',
      profitTotal:'',
      priceTotal:'',
      taxTotal:'',
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
        if(column.label == '人數'||column.label == '利潤'){
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
    insurance(row, column){
      if(row.insurance1){
        return '✔️'
      }else{
        return '❌'
      }
    },
    profit(row, column){
      if(row.location == '團體報帳' || row.location == 'JOIN報帳' || row.location == '跨年'){
        return row.profit = 0
      }else{
        return row.profit
      }
    },
    group(row, column){
      if(row.tax > 0&& row.location != '團體報帳' && row.location != 'JOIN報帳' && row.location != '跨年'){
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
    search(e) {
      this.listLoading = true
      let i = 0
      let ref = db.collection(e.month.toString());
      let priceInsufficient = 0
      

      if (e.cs == 'all'){
        ref.onSnapshot((querySnapshot => {
          this.itemData.splice(0,this.itemData.length) //用splice清空 就無須reverse刷新dom 由於onSnapshot 須放在裡面清空
          this.amountTotal = 0
          this.profitTotal = 0
          this.priceTotal = 0
          this.taxTotal = 0
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
              if(isNaN(parseFloat(doc.data().tax))){
              }else{
                this.taxTotal = parseFloat(this.taxTotal) + parseFloat(doc.data().tax)
              }
            }
          }); 
          this.listLoading = false
        }));
      }else{
        ref.where('cs','==',e.cs).onSnapshot((querySnapshot => { //資料編排改變後 客服需改變
          this.itemData.splice(0,this.itemData.length) //用splice清空 就無須reverse刷新dom 由於onSnapshot 須放在裡面清空
          this.amountTotal = 0
          this.profitTotal = 0
          this.priceTotal = 0
          this.taxTotal = 0
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
              if(isNaN(parseFloat(doc.data().tax))){
              }else{
                this.taxTotal = parseFloat(this.taxTotal) + parseFloat(doc.data().tax)
              }
            }
          }); 
          this.listLoading = false
        }));
      }
    },
    edit(row){
      console.log(row)

      let route = this.$router.resolve({
        path: '/admin/edit/fit',
        query: { number:row.number,depDate:this.$refs.child.month }
      })
      window.open(route.href, '_blank');
    }
  },
  mounted(){
    
  }
}
</script>



