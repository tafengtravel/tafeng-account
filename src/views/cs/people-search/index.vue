<template>
  <div class="app-container">
    
    <el-date-picker
      v-model="month"
      type="monthrange"
      range-separator="至"
      start-placeholder="開始月份"
      end-placeholder="結束月份"
      value-format="yyyy-MM">
    </el-date-picker>
    <el-input v-model="people" style="width:250px" placeholder="請輸入代表人"></el-input>
    <el-button type="primary" @click="search">搜尋</el-button>

    <div class ="el-col-24">
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
        <el-table-column prop="phone" label="聯絡電話" width='125%' sortable :sort-method = "(a,b)=>{return a.phone - b.phone}"></el-table-column>
        <el-table-column prop="priceInsufficient" label="未收尾款" width='125%' sortable  :sort-method = "(a,b)=>{return a.priceInsufficient - b.priceInsufficient}"></el-table-column>
        <el-table-column prop="insurance1" label="旅責險" width='100%' :formatter="insurance" sortable :sort-method = "(a,b)=>{return a.insurance1 - b.insurance1}"></el-table-column>
        <el-table-column prop="other" label="備註" sortable :sort-method = "(a,b)=>a.other.localeCompare(b.other)"></el-table-column>
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

export default {
  components: {
    
  },
  
  data() {
    return {
      listLoading: false,
      itemData:[],
      month:'',
      people:'',
    }
  },
  created() {
    
  },
  methods: {
    insurance(row, column){
      if(row.insurance1){
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
      // this.listLoading = true
      let i = 0
      this.itemData.splice(0,this.itemData.length) //用splice清空 就無須reverse刷新dom
      
      let startMonth = moment(this.month[0]);
      let endMonth = moment(this.month[1]);
      let monthLength = endMonth.diff(startMonth, 'month')+1;  
      let ref
      let priceInsufficient = 0
      startMonth = this.month[0];
      
      for(let j=0;j<monthLength;j++){
        console.log(startMonth)
        ref = db.collection(startMonth);
        ref.where('people','==',this.people).get().then(querySnapshot => { //資料編排改變後 客服需改變

          querySnapshot.forEach(doc => {  
            priceInsufficient = parseInt(doc.data().price) - parseInt(doc.data().income)
            this.itemData.push({...doc.data(),'priceInsufficient':priceInsufficient})
          }); 
        });
        startMonth = moment(startMonth).add(1,'months').format('YYYY-MM')
      }
      this.listLoading = false
    },
    edit(row){
      console.log(row)

      let route = this.$router.resolve({
        path: '/cs/edit',
        query: { number:row.number,depDate:moment(row.depDate).format('YYYY-MM') }
      })
      window.open(route.href, '_blank');
    }
  },
  mounted(){
    
  }
}
</script>
<style >

@media (max-width: 768px) {
  .el-date-range-picker {
    width: 258px;
  }
  .el-date-range-picker__content {
    float: none;
  }
}
</style>



