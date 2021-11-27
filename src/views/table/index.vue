<template>
  <div class="app-container">
    
    <TableOption @searchChildEvent="search"></TableOption>
    <div class ="el-col-24">
      <el-table v-loading="listLoading" :data="itemData" style="width: 100%" :row-class-name="tableRowClassName" empty-text="沒有資料">

        <el-table-column prop="count" label="筆數" width='75%' fixed sortable :sort-method = "(a,b)=>{return a.id - b.id}"></el-table-column>
        <el-table-column prop="團號" label="團號" width='125%' sortable :sort-method = "(a,b)=>{return a.id - b.id}"></el-table-column>
        <el-table-column prop="author" label="團體" width='75%' sortable :sort-method = "(a,b)=>{return a.id - b.id}"></el-table-column>
        <el-table-column prop="客服" label="客服" width='75%' sortable :sort-method = "(a,b)=>{return a.id - b.id}"></el-table-column>
        <el-table-column prop="出發日期" label="出發日期" width='125%' sortable :sort-method = "(a,b) => a.出發日期.localeCompare(b.出發日期)"></el-table-column>
        <el-table-column prop="結束日期" label="結束日期" width='125%' sortable :sort-method = "(a,b) => a.結束日期.localeCompare(b.結束日期)"></el-table-column>
        <el-table-column prop="團名" label="團名"  sortable :sort-method = "(a,b)=>{return a.id - b.id}"></el-table-column>
        <el-table-column prop="代表人" label="代表人" width='100%' sortable :sort-method = "(a,b)=>{return a.id - b.id}"></el-table-column>
        <el-table-column prop="人數" label="人數" width='75%' sortable :sort-method = "(a,b)=>{return a.id - b.id}"></el-table-column>
        <el-table-column prop="聯絡電話" label="聯絡電話" width='125%' sortable :sort-method = "(a,b)=>{return a.id - b.id}"></el-table-column>
        <el-table-column prop="未收尾款" label="未收尾款" width='125%' sortable :sort-method = "(a,b)=>{return a.id - b.id}"></el-table-column>
        <el-table-column prop="其他項目備註" label="編輯" width='125%' sortable :sort-method = "(a,b)=>{return a.id - b.id}"></el-table-column>
        <el-table-column prop="其他項目備註" label="備註" width='125%' sortable :sort-method = "(a,b)=>{return a.id - b.id}">
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
    search(e) {
      
      this.listLoading = true
      let i = 0
      let ref = db.collection((moment(e.month).format('YYYY-MM')).toString());

      if (e.cs == 'all'){
        ref.onSnapshot((querySnapshot => {
          this.itemData.length = 0
          querySnapshot.forEach(doc => {  

            this.itemData[i] = {...doc.data(),'count':i+1}
            i=i+1
          }); 
          this.itemData.reverse()
          this.itemData.reverse() 
          console.log(this.itemData)
        }));
      }else{
        ref.where('客服','==',e.cs).onSnapshot((querySnapshot => { //資料編排改變後 客服需改變
          this.itemData.length = 0
          querySnapshot.forEach(doc => {  

            this.itemData[i] = {...doc.data(),'count':i+1}
            i=i+1
          }); 
          this.itemData.reverse()
          this.itemData.reverse() 
          console.log(this.itemData)
        }));
      }
      
      this.listLoading = false
    },
    edit(row){
      console.log(row)
    }
  },
  mounted(){
    
  }
}
</script>



