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
        <el-table-column prop="createDate" label="報帳日期" width='100%' sortable :sort-method = "(a,b) =>a.createDate.localeCompare(b.createDate)"></el-table-column>
        <el-table-column prop="depDate" label="出發日期" width='100%' sortable :sort-method = "(a,b) =>a.depDate.localeCompare(b.depDate)"></el-table-column>
        <el-table-column prop="endDate" label="結束日期" width='100%' sortable :sort-method = "(a,b) =>a.endDate.localeCompare(b.endDate)"></el-table-column>
        <el-table-column prop="name" label="團名"  sortable :sort-method = "(a,b)=>a.name.localeCompare(b.name)"></el-table-column>
        <el-table-column prop="people" label="代表人" width='100%' sortable :sort-method = "(a,b)=>a.people.localeCompare(b.people)"></el-table-column>
        <el-table-column prop="amount" label="人數" width='75%'></el-table-column>
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
    async search() {
      this.listLoading = true
      let i = 0
      let ref = db.collection(this.month);
      let priceInsufficient = 0
      let itemData = []
      let length = 0
      let fee1Length = 0
      let fee2Length = 0

      await ref.get().then((querySnapshot => { //資料編排改變後 客服需改變
        this.itemData.length = 0
        querySnapshot.forEach(doc => {  

          itemData.push({...doc.data()})

          length = doc.data().payDetailCompany.length
          fee1Length = doc.data().payDetailFee1.length
          fee2Length = doc.data().payDetailFee2.length

          for(let j=0;j<length-fee1Length;j++){
            itemData[i].payDetailFee1.push(false)
          }
          for(let j=0;j<length-fee2Length;j++){
            itemData[i].payDetailFee2.push(false)
          }
          console.log(itemData[i])
          i=i+1
        }); 
  
      }));

      for(let j=0;j<itemData.length;j++){
        ref = db.collection(this.month).doc(itemData[j].number);
        ref.update(itemData[j]).then(() => {
          console.log('set data successful');
        });
      }
      this.listLoading = false
    },
    edit(row){
      console.log(row)

      let route = this.$router.resolve({
        path: '/admin/edit/fit',
        query: { number:row.number,depDate:this.month }
      })
      window.open(route.href, '_blank');
    }
  },
  mounted(){
    
  }
}
</script>



